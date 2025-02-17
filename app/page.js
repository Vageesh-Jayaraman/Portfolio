'use client';

import { useState } from 'react';
import About from '@/components/About /about';
import Header from '@/components/header';
import NavBar from '@/components/navbar';
import TechStack from '@/components/Tech_Stack/techStack';
import Project from '@/components/Projects/project';
import Clap from '@/components/likeButton';

export default function Home() {
  const [selectedComponent, setSelectedComponent] = useState('Project');

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'About Me':
        return <About />;
      case "Tools I've Used":
        return <TechStack />;
      case 'Projects':
        return <Project />;
      default:
        return <About />;
    }
  };

  return (
    <div>
      <div>
      <Header/>
      <Clap/>
      </div>
      
      <div className="flex flex-row space-x-10">
        <NavBar setSelectedComponent={setSelectedComponent} />
        {renderComponent()}
      </div>
    </div>
  );
}
