import { NextResponse } from 'next/server';
import { invalidateCache } from '@/lib/blogs';

export async function POST(request: Request) {
  const authHeader = request.headers.get('authorization');
  const expectedToken = process.env.CACHE_INVALIDATE_TOKEN;

  if (!expectedToken || authHeader !== `Bearer ${expectedToken}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json().catch(() => ({}));
    const { category } = body;

    invalidateCache(category);
    
    return NextResponse.json({ 
      success: true, 
      message: category ? `Cache invalidated for ${category}` : 'Full cache invalidated' 
    });
  } catch {
    return NextResponse.json({ error: 'Failed to invalidate cache' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: 'Cache invalidation endpoint. Use POST with Bearer token.' 
  });
}