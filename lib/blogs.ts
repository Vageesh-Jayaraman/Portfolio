import matter from 'gray-matter';
import fs from 'fs';
import path from 'path';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import remarkGfm from 'remark-gfm';

const GITHUB_REPO = process.env.BLOGS_REPO;
const GITHUB_TOKEN = process.env.BLOGS_TOKEN;
const GITHUB_BRANCH = process.env.BLOGS_BRANCH || 'main';
const LOCAL_BLOGS_PATH = process.env.LOCAL_BLOGS_PATH;
const USE_LOCAL = process.env.USE_LOCAL_BLOGS;
const CACHE_TTL = parseInt(process.env.BLOG_CACHE_TTL || '60000');

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

async function fetchFromLocal(filePath: string): Promise<string> {
  const fullPath = path.join(LOCAL_BLOGS_PATH, filePath);
  
  console.log(`Fetching from local: ${fullPath}`);
  
  try {
    const content = fs.readFileSync(fullPath, 'utf-8');
    return content;
  } catch (error) {
    throw new Error(`Failed to fetch local file ${fullPath}: ${error}`);
  }
}

async function fetchBlogFile(filePath: string): Promise<string> {
  if (USE_LOCAL) {
    return fetchFromLocal(filePath);
  }
  return fetchFromGitHub(filePath);
}

async function processMarkdownToHtml(markdown: string): Promise<string> {
  const processedContent = await remark()
    .use(remarkGfm)
    .use(remarkHtml)
    .process(markdown);
  
  return processedContent.toString();
}

function rewriteImageUrls(html: string, category: string, slug: string): string {
  return html.replace(
    /<img([^>]*?)src="(?!https?:\/\/)([^"]+)"([^>]*)>/g,
    `<img$1src="/api/blog-image/${category}/${slug}/$2"$3>`
  );
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
  
  if (USE_LOCAL) {
    try {
      const categories = fs.readdirSync(LOCAL_BLOGS_PATH)
        .filter(file => {
          const fullPath = path.join(LOCAL_BLOGS_PATH, file);
          return fs.statSync(fullPath).isDirectory() && !file.startsWith('.');
        })
        .sort();
      
      categoriesCache = categories;
      categoriesCacheTime = Date.now();
      return categories;
    } catch (error) {
      console.error('Error reading local categories:', error);
      return [];
    }
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
  
  if (USE_LOCAL) {
    try {
      const categoryPath = path.join(LOCAL_BLOGS_PATH, category);
      
      if (!fs.existsSync(categoryPath)) {
        return [];
      }
      
      const slugs = fs.readdirSync(categoryPath)
        .filter(file => {
          const fullPath = path.join(categoryPath, file);
          return fs.statSync(fullPath).isDirectory();
        });
      
      const posts = await Promise.all(
        slugs.map(async (slug) => {
          try {
            const content = fs.readFileSync(path.join(categoryPath, slug, 'index.md'), 'utf-8');
            const { data, content: body } = matter(content);
            let htmlContent = await processMarkdownToHtml(body);
            htmlContent = rewriteImageUrls(htmlContent, category, slug);
            
            return {
              slug,
              category,
              title: data.title || 'Untitled',
              description: data.description || '',
              date: formatDate(data.date || data.pubDate),
              content: htmlContent,
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
    } catch (error) {
      console.error(`Error reading local blogs in category ${category}:`, error);
      return [];
    }
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
          let htmlContent = await processMarkdownToHtml(body);
          htmlContent = rewriteImageUrls(htmlContent, category, folder.name);
          
          return {
            slug: folder.name,
            category,
            title: data.title || 'Untitled',
            description: data.description || '',
            date: formatDate(data.date || data.pubDate),
            content: htmlContent,
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
  
  if (USE_LOCAL) {
    try {
      const filePath = path.join(LOCAL_BLOGS_PATH, category, slug, 'index.md');
      
      if (!fs.existsSync(filePath)) {
        return null;
      }
      
      const content = fs.readFileSync(filePath, 'utf-8');
      const { data, content: body } = matter(content);
      let htmlContent = await processMarkdownToHtml(body);
      htmlContent = rewriteImageUrls(htmlContent, category, slug);
      
      const post = {
        slug,
        category,
        title: data.title || 'Untitled',
        description: data.description || '',
        date: formatDate(data.date || data.pubDate),
        content: htmlContent,
      };
      
      postCache.set(cacheKey, post);
      postCacheTime.set(cacheKey, Date.now());
      
      return post;
    } catch (error) {
      console.error(`Error reading local post ${category}/${slug}:`, error);
      return null;
    }
  }
  
  if (!GITHUB_REPO || !GITHUB_TOKEN) {
    return null;
  }
  
  try {
    const content = await fetchFromGitHub(`${category}/${slug}/index.md`);
    const { data, content: body } = matter(content);
    let htmlContent = await processMarkdownToHtml(body);
    htmlContent = rewriteImageUrls(htmlContent, category, slug);
    
    const post = {
      slug,
      category,
      title: data.title || 'Untitled',
      description: data.description || '',
      date: formatDate(data.date || data.pubDate),
      content: htmlContent,
    };
    
    postCache.set(cacheKey, post);
    postCacheTime.set(cacheKey, Date.now());
    
    return post;
  } catch {
    return null;
  }
}