'use client';

import { useState } from 'react';
import Link from 'next/link';
import About from '@/components/About/about';
import Header from '@/components/header';
import NavBar from '@/components/navbar';
import TechStack from '@/components/Tech_Stack/techStack';
import Project from '@/components/Projects/project';

export default function Home() {
  const [selectedComponent, setSelectedComponent] = useState("Projects");

  const renderComponent = () => {
    switch (selectedComponent) {
      case "About Me":
        return <About />;
      case "Tools I've Used":
        return <TechStack />;
      case "Projects":
        return <Project />;
      default:
        return <About />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Link
        href="/personal"
        className="fixed left-1/2 -translate-x-1/2 bottom-8 w-14 h-14 rounded-full flex items-center justify-center z-50 gradient-border"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
        </svg>
      </Link>
      <div className="flex-1 overflow-y-auto px-4 md:px-20">
        <div className="flex flex-col md:flex-row md:space-x-10 space-y-6 md:space-y-6 pb-20">
          <NavBar setSelectedComponent={setSelectedComponent} />
          <div className="flex-1">{renderComponent()}</div>
        </div>
      </div>
    </div>
  );
}
