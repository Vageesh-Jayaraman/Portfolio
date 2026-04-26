import Link from 'next/link';
import { getCategories, getAllPosts } from '@/lib/blogs';
import BlogList from '@/components/Personal/BlogList';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Write | Vageesh Jayaraman',
  description: 'Personal writings and thoughts',
};

export default async function Personal() {
  const categories = await getCategories();
  const allPosts = await getAllPosts();

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="fixed top-4 left-4 md:top-6 md:left-6 z-50">
        <Link 
          href="/" 
          className="flex items-center gap-2 text-zinc-500 hover:text-white text-sm font-mono transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          <span>Back</span>
        </Link>
      </div>
      <div className="pt-16 md:pt-20 px-4 md:px-20 max-w-4xl mx-auto">
        <BlogList categories={categories} allPosts={allPosts} />
      </div>
    </div>
  );
}
