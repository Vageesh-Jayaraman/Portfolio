'use client';

import { useState } from 'react';
import About from '@/components/About /about';
import Header from '@/components/header';
import NavBar from '@/components/navbar';
import TechStack from '@/components/Tech_Stack/techStack';
import Project from '@/components/Projects/project';

export default function Home() {
  const [selectedComponent, setSelectedComponent] = useState('Project');

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'About Me':
        return <About />;
      case 'Tech Stack':
        return <TechStack />;
      case 'Projects':
        return <Project />;
      default:
        return <About />;
    }
  };

  return (
    <div>
      <Header />
      <div className="flex flex-row space-x-10">
        <NavBar setSelectedComponent={setSelectedComponent} />
        {renderComponent()}
      </div>
    </div>
  );
}
