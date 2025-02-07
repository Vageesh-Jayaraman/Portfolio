import projectList from "./projectsList";
import ProjectBox from "./projectBox";

export default function Project() {
  return (
    <div className="m-10 w-3/4 border-2 border-gray-500 flex flex-wrap"> 
      {projectList.map((project, index) => (
        <ProjectBox
          key={index}
          title={project.title}
          description={project.description}
          tech={project.tech}
          imageSrc={project.imageSrc}
          download={project.download} 
          github={project.github}
          website={project.website}
        />
      ))}
    </div>
  );
}
