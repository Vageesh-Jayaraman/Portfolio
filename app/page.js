'use client';

import { useState } from 'react';
import About from '@/components/About /about';
import Header from '@/components/header';
import NavBar from '@/components/navbar';
import TechStack from '@/components/Tech_Stack/techStack';
import Project from '@/components/Projects/project';

export default function Home() {
  const [selectedComponent, setSelectedComponent] = useState("Project");

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
      <div className="flex-1 overflow-y-auto px-4 md:px-20">
        <div className="flex flex-col md:flex-row md:space-x-10 space-y-6 md:space-y-6 pb-20">
          {/* Add padding-bottom here too */}
          <NavBar setSelectedComponent={setSelectedComponent} />
          <div className="flex-1">{renderComponent()}</div>
        </div>
      </div>
    </div>
  );
}
