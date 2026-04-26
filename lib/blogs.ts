import matter from 'gray-matter';

const GITHUB_REPO = process.env.BLOGS_REPO;
const GITHUB_TOKEN = process.env.BLOGS_TOKEN;
const GITHUB_BRANCH = process.env.BLOGS_BRANCH || 'main';
const CACHE_TTL = parseInt(process.env.BLOG_CACHE_TTL || '60000'); // Default: 1 minute (in milliseconds)

async function fetchFromGitHub(path: string): Promise<string> {
  if (!GITHUB_REPO || !GITHUB_TOKEN) {
    throw new Error('BLOGS_REPO or BLOGS_TOKEN not configured');
  }
  
  console.log(`Fetching from GitHub: ${path}`);
  
  const url = `https://api.github.com/repos/${GITHUB_REPO}/contents/${path}?ref=${GITHUB_BRANCH}`;
  
  const res = await fetch(url, {
    headers: {
      'Authorization': `token ${GITHUB_TOKEN}`,
      'Accept': 'application/vnd.github.v3+json',
    },
  });
  
  if (!res.ok) {
    throw new Error(`Failed to fetch ${path}: ${res.statusText}`);
  }
  
  const data = await res.json() as { content?: string; type?: string; sha?: string };
  
  if (data.content) {
    return Buffer.from(data.content, 'base64').toString('utf-8');
  }
  
  return '';
}

export interface BlogPost {
  slug: string;
  category: string;
  title: string;
  description: string;
  date: string;
  content: string;
}

function formatDate(dateInput: string | Date | undefined): string {
  if (!dateInput) return '';
  if (dateInput instanceof Date) {
    return dateInput.toISOString().split('T')[0];
  }
  return String(dateInput);
}

let categoriesCache: string[] | null = null;
let categoriesCacheTime: number = 0;
let postsCache: Map<string, BlogPost[]> = new Map();
let postsCacheTime: Map<string, number> = new Map();
let allPostsCache: BlogPost[] | null = null;
let allPostsCacheTime: number = 0;
let postCache: Map<string, BlogPost> = new Map();
let postCacheTime: Map<string, number> = new Map();

function isCacheExpired(cacheTime: number): boolean {
  const expired = Date.now() - cacheTime > CACHE_TTL;
  console.log(`Cache check: cacheTime=${cacheTime}, now=${Date.now()}, ttl=${CACHE_TTL}, expired=${expired}`);
  return expired;
}

// Manual cache invalidation function (useful for webhooks)
export function invalidateCache(category?: string): void {
  if (category) {
    postsCache.delete(category);
    postsCacheTime.delete(category);
  } else {
    categoriesCache = null;
    categoriesCacheTime = 0;
    postsCache.clear();
    postsCacheTime.clear();
    allPostsCache = null;
    allPostsCacheTime = 0;
    postCache.clear();
    postCacheTime.clear();
  }
}

export async function getCategories(): Promise<string[]> {
  if (categoriesCache && !isCacheExpired(categoriesCacheTime)) {
    return categoriesCache;
  }
  
  if (!GITHUB_REPO || !GITHUB_TOKEN) {
    return ['personal', 'tech'];
  }
  
  try {
    const content = await fetchFromGitHub('');
    const data = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/contents?ref=${GITHUB_BRANCH}`, {
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    }).then(r => r.json()) as { name: string; type: string }[];
    
    categoriesCache = data
      .filter((item: { name: string; type: string }) => item.type === 'dir' && !item.name.startsWith('.'))
      .map((item: { name: string }) => item.name);
    categoriesCacheTime = Date.now();
    
    return categoriesCache;
  } catch {
    return ['personal', 'tech'];
  }
}

export async function getPostsByCategory(category: string): Promise<BlogPost[]> {
  const cacheTime = postsCacheTime.get(category) || 0;
  if (postsCache.has(category) && !isCacheExpired(cacheTime)) {
    return postsCache.get(category)!;
  }
  
  if (!GITHUB_REPO || !GITHUB_TOKEN) {
    return [];
  }
  
  try {
    const url = `https://api.github.com/repos/${GITHUB_REPO}/contents/${category}?ref=${GITHUB_BRANCH}`;
    const res = await fetch(url, {
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    });
    
    const data = await res.json() as { name: string; type: string }[];
    
    const folders = data.filter((item: { name: string; type: string }) => 
      item.type === 'dir' && !item.name.startsWith('.')
    );
    
    const posts = await Promise.all(
      folders.map(async (folder: { name: string }) => {
        try {
          const content = await fetchFromGitHub(`${category}/${folder.name}/index.md`);
          const { data, content: body } = matter(content);
          
          return {
            slug: folder.name,
            category,
            title: data.title || 'Untitled',
            description: data.description || '',
            date: formatDate(data.date || data.pubDate),
            content: body,
          };
        } catch {
          return null;
        }
      })
    );
    
    const result = posts.filter((p): p is BlogPost => p !== null)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    postsCache.set(category, result);
    postsCacheTime.set(category, Date.now());
    return result;
  } catch {
    return [];
  }
}

export async function getAllPosts(): Promise<BlogPost[]> {
  if (allPostsCache && !isCacheExpired(allPostsCacheTime)) {
    return allPostsCache;
  }
  
  const categories = await getCategories();
  const allPosts: BlogPost[] = [];
  
  for (const category of categories) {
    const posts = await getPostsByCategory(category);
    allPosts.push(...posts);
  }
  
  allPostsCache = allPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  allPostsCacheTime = Date.now();
  return allPostsCache;
}

export async function getPost(category: string, slug: string): Promise<BlogPost | null> {
  const cacheKey = `${category}/${slug}`;
  const cacheTime = postCacheTime.get(cacheKey) || 0;
  
  if (postCache.has(cacheKey) && !isCacheExpired(cacheTime)) {
    return postCache.get(cacheKey)!;
  }
  
  if (!GITHUB_REPO || !GITHUB_TOKEN) {
    return null;
  }
  
  try {
    const content = await fetchFromGitHub(`${category}/${slug}/index.md`);
    const { data, content: body } = matter(content);
    
    const post = {
      slug,
      category,
      title: data.title || 'Untitled',
      description: data.description || '',
      date: formatDate(data.date || data.pubDate),
      content: body,
    };
    
    postCache.set(cacheKey, post);
    postCacheTime.set(cacheKey, Date.now());
    
    return post;
  } catch {
    return null;
  }
}