export const dynamic = 'force-dynamic';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ category: string; slug: string; file: string }> }
) {
  const { category, slug, file } = await params;
  const token = process.env.BLOGS_TOKEN;
  const repo = process.env.BLOGS_REPO;
  const branch = process.env.BLOGS_BRANCH || 'main';

  if (!token || !repo) {
    return new Response('Missing BLOGS_TOKEN or BLOGS_REPO', { status: 500 });
  }

  const url = `https://api.github.com/repos/${repo}/contents/${category}/${slug}/${file}?ref=${branch}`;

  try {
    const res = await fetch(url, {
      headers: {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    });

    if (!res.ok) {
      return new Response('GitHub API error: ' + res.status, { status: 404 });
    }

    const data = await res.json() as { download_url?: string; content?: string; name?: string };

    let buffer: ArrayBuffer;
    
    if (data.download_url) {
      const downloadRes = await fetch(data.download_url, {
        headers: {
          'Authorization': `token ${token}`,
          'Accept': 'application/vnd.github.v3.raw',
        },
      });
      if (!downloadRes.ok) {
        return new Response('Failed to download: ' + downloadRes.status, { status: 404 });
      }
      buffer = await downloadRes.arrayBuffer();
    } else if (data.content) {
      buffer = Uint8Array.from(atob(data.content), c => c.charCodeAt(0)).buffer;
    } else {
      return new Response('No content', { status: 404 });
    }
    const ext = data.name?.split('.').pop()?.toLowerCase() || 'png';
    
    const contentType = ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' : 
                      ext === 'png' ? 'image/png' : 
                      ext === 'gif' ? 'image/gif' : 
                      ext === 'webp' ? 'image/webp' : 'image/png';

    return new Response(buffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400',
      },
    });
  } catch (e) {
    return new Response('Error: ' + String(e), { status: 500 });
  }
}