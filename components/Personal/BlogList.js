'use client';

import { useState } from 'react';
import Link from 'next/link';

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

export default function BlogList({ categories: initialCategories, allPosts }) {
  const [selectedCategory, setSelectedCategory] = useState(initialCategories[0] || 'technical');
  const posts = allPosts.filter(post => post.category === selectedCategory);

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getCategoryStyle = (cat) => getCatColor(cat);

  return (
    <div className="min-h-screen px-4 md:px-20 py-8">
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-mono text-white mb-2 tracking-tight">
          Writing
        </h1>
        <p className="text-zinc-500 font-mono text-sm">
          Thoughts, learnings, and explorations
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-10">
        {initialCategories.map((cat) => {
          const style = getCategoryStyle(cat);
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                backgroundColor: isSelected ? style.bg : 'transparent',
                color: isSelected ? style.text : '#71717a',
                borderColor: isSelected ? style.border : '#27272a',
              }}
              className="px-4 py-2 text-sm font-mono rounded-md border transition-all duration-300 hover:border-zinc-600"
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          );
        })}
      </div>

      <div className="space-y-1">
        {posts.length === 0 ? (
          <p className="text-zinc-500 font-mono">No posts yet</p>
        ) : (
          posts.map((post) => {
            const style = getCategoryStyle(post.category);
            return (
              <Link
                key={post.slug}
                href={`/personal/${selectedCategory}/${post.slug}`}
                className="block py-6 group"
              >
                <div className="flex items-baseline gap-3 mb-2">
                  <span style={{ color: style.text }} className="text-xs font-mono">
                    {formatDate(post.date)}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-zinc-700" />
                  <span style={{ backgroundColor: style.bg, color: style.text }} className="text-xs font-mono px-2 py-0.5 rounded">
                    {post.category}
                  </span>
                </div>
                <h2 className="text-xl font-mono text-zinc-100 group-hover:text-white transition-colors duration-300 mb-2">
                  {post.title}
                </h2>
                <p className="text-zinc-500 font-mono text-sm leading-relaxed max-w-2xl">
                  {post.description}
                </p>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}