'use client';

import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default function CompactHeader({ showBack = false, backLink = '/personal' }) {
  return (
    <div className="sticky top-0 z-40 w-full">
      <div className="hidden md:flex bg-gradient-to-r from-[#ffa71f] to-[#ffed51] h-20 items-center px-4 md:px-20">
        <p className="font-mono text-lg md:text-2xl text-white font-bold">
          Vageesh Jayaraman
        </p>
      </div>

      {showBack && (
        <div className="md:hidden bg-gradient-to-r from-[#ffa71f] to-[#ffed51] px-4 py-3 flex items-center gap-3">
          <Link href={backLink} className="text-white hover:opacity-80 transition-opacity">
            <ChevronLeft size={24} />
          </Link>
          <p className="font-mono text-sm font-bold text-white truncate">
            Vageesh
          </p>
        </div>
      )}
    </div>
  );
}
