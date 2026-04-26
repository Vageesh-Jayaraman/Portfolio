import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { getPost, getCategories, getPostsByCategory } from '@/lib/blogs';

export const dynamic = 'force-dynamic';

const COLORS = [
  { name: 'blue', bg: 'rgba(59, 130, 246, 0.2)', text: '#60a5fa', border: 'rgba(59, 130, 246, 0.3)' },
  { name: 'amber', bg: 'rgba(245, 158, 11, 0.2)', text: '#fbbf24', border: 'rgba(245, 158, 11, 0.3)' },
  { name: 'cyan', bg: 'rgba(6, 182, 212, 0.2)', text: '#22d3ee', border: 'rgba(6, 182, 212, 0.3)' },
  { name: 'emerald', bg: 'rgba(16, 185, 129, 0.2)', text: '#34d399', border: 'rgba(16, 185, 129, 0.3)' },
  { name: 'rose', bg: 'rgba(244, 63, 94, 0.2)', text: '#fb7185', border: 'rgba(244, 63, 94, 0.3)' },
  { name: 'violet', bg: 'rgba(139, 92, 246, 0.2)', text: '#a78bfa', border: 'rgba(139, 92, 246, 0.3)' },
  { name: 'orange', bg: 'rgba(249, 115, 22, 0.2)', text: '#fb923c', border: 'rgba(249, 115, 22, 0.3)' },
  { name: 'sky', bg: 'rgba(14, 165, 233, 0.2)', text: '#38bdf8', border: 'rgba(14, 165, 233, 0.3)' },
  { name: 'lime', bg: 'rgba(132, 204, 22, 0.2)', text: '#a3e635', border: 'rgba(132, 204, 22, 0.3)' },
  { name: 'fuchsia', bg: 'rgba(232, 121, 249, 0.2)', text: '#e879f9', border: 'rgba(232, 121, 249, 0.3)' },
];

function getCatColor(cat) {
  const hash = cat.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return COLORS[hash % COLORS.length];
}

export async function generateMetadata({ params }) {
  const { category, slug } = await params;
  const post = await getPost(category, slug);
  
  if (!post) {
    return { title: 'Post Not Found' };
  }
  
  return {
    title: `${post.title} | Write`,
    description: post.description,
  };
}

export default async function BlogPost({ params }) {
  const { category, slug } = await params;
  const post = await getPost(category, slug);
  
  if (!post) {
    return (
      <div className="min-h-screen px-4 md:px-20 py-8">
        <p className="text-zinc-500 font-mono">Post not found</p>
      </div>
    );
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  const style = getCatColor(category);

  const imageBaseUrl = `/api/blog-image/${category}/${slug}`;

  const transformImageUrl = (src) => {
    if (!src) return src;
    if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('/')) {
      return src;
    }
    return `${imageBaseUrl}/${src}`;
  };

  const ImageComponent = ({ src, alt, ...props }) => (
    <img src={transformImageUrl(src)} alt={alt} {...props} />
  );

  return (
    <div className="min-h-screen px-4 md:px-20 py-8 max-w-4xl mx-auto">
      <Link
        href="/personal"
        className="inline-flex items-center gap-2 mb-8 text-zinc-500 hover:text-white font-mono text-sm transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        <span>Back</span>
      </Link>
      
      <div className="flex items-center gap-3 mb-4">
        <span style={{ backgroundColor: style.bg, color: style.text }} className="text-xs font-mono px-2 py-1 rounded">
          {category}
        </span>
        <span className="w-1 h-1 rounded-full bg-zinc-700" />
        <span className="text-xs font-mono text-zinc-500">
          {formatDate(post.date)}
        </span>
      </div>
      
      <h1 className="text-3xl md:text-4xl font-mono text-zinc-100 mb-6 tracking-tight leading-tight">
        {post.title}
      </h1>
      <p className="text-zinc-400 font-mono text-lg mb-12 leading-relaxed">
        {post.description}
      </p>
      
      <article className="prose prose-invert prose-lg max-w-none prose-headings:font-mono prose-p:font-mono prose-a:text-zinc-300 prose-a:no-underline hover:prose-a:text-white prose-code:text-zinc-300 prose-code:bg-zinc-800 prose-code:px-1 prose-code:rounded prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-zinc-800">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
          components={{ img: ImageComponent }}
        >
          {post.content}
        </ReactMarkdown>
      </article>
    </div>
  );
}