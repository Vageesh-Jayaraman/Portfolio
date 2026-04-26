'use client';

import Link from 'next/link';

export default function CategoryTiles({ categories }) {
  if (!categories || categories.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No categories found yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category) => (
        <Link href={`/personal/category/${category}`} key={category}>
          <div className="group cursor-pointer h-48 flex flex-col items-center justify-center rounded-lg border border-border bg-card hover:bg-secondary transition-all duration-300 hover:shadow-lg hover:scale-105">
            <div className="text-center px-6">
              <h3 className="text-2xl font-mono font-bold text-foreground group-hover:text-[#ffa71f] transition-colors capitalize">
                {category.replace(/_/g, ' ')}
              </h3>
              <p className="text-muted-foreground text-sm mt-2">
                Explore this collection
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
