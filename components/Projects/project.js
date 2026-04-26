import projectList from "./projectsList";
import ProjectBox from "./projectBox";

export default function Project() {
  return (
    <div className="w-full border-2 border-gray-500 p-2 font-mono text-sm mb-20">

      <div className="flex flex-wrap justify-center md:justify-start items-stretch">
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
    </div>
  );
}
