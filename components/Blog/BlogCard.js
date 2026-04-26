'use client';

import Link from 'next/link';

export default function BlogCard({ blog }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Link href={`/personal/blog/${blog.category}/${blog.slug}`}>
      <div className="group cursor-pointer p-6 rounded-lg border border-border bg-card hover:bg-secondary transition-all duration-300 hover:shadow-md hover:border-[#ffa71f]">
        <div className="space-y-3">
          <h3 className="text-xl font-mono font-bold text-foreground group-hover:text-[#ffa71f] transition-colors line-clamp-2">
            {blog.title}
          </h3>

          {blog.description && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {blog.description}
            </p>
          )}

          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{formatDate(blog.date)}</span>
            <span>{blog.readingTime}</span>
          </div>

          {blog.tags && blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {blog.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 text-xs rounded bg-[#ffa71f]/10 text-[#ffa71f] font-mono"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
