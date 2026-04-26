'use client';

import { useMemo } from 'react';

const markdownStyles = `
  .markdown-content h1 {
    @apply text-4xl font-mono font-bold mt-8 mb-4 text-foreground;
  }
  .markdown-content h2 {
    @apply text-3xl font-mono font-bold mt-8 mb-4 text-foreground;
  }
  .markdown-content h3 {
    @apply text-2xl font-mono font-bold mt-6 mb-3 text-foreground;
  }
  .markdown-content p {
    @apply my-4 text-foreground leading-relaxed;
  }
  .markdown-content code {
    @apply bg-secondary text-[#ffa71f] px-2 py-1 rounded text-sm font-mono;
  }
  .markdown-content pre {
    @apply bg-secondary border border-border rounded-lg p-4 my-4 overflow-x-auto;
  }
  .markdown-content pre code {
    @apply bg-transparent text-foreground px-0 py-0;
  }
  .markdown-content strong {
    @apply font-bold text-foreground;
  }
  .markdown-content em {
    @apply italic text-foreground;
  }
  .markdown-content ul {
    @apply list-disc list-inside my-4 space-y-2 text-foreground;
  }
  .markdown-content ol {
    @apply list-decimal list-inside my-4 space-y-2 text-foreground;
  }
  .markdown-content li {
    @apply text-foreground;
  }
  .markdown-content blockquote {
    @apply border-l-4 border-[#ffa71f] pl-4 my-4 italic text-muted-foreground;
  }
  .markdown-content table {
    @apply w-full my-4 border-collapse;
  }
  .markdown-content th,
  .markdown-content td {
    @apply border border-border px-4 py-2 text-foreground;
  }
  .markdown-content th {
    @apply bg-secondary font-bold;
  }
  .markdown-content a {
    @apply text-[#ffa71f] hover:underline;
  }
`;

export default function BlogContent({ content }) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: markdownStyles }} />
      <div
        className="markdown-content prose prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </>
  );
}
