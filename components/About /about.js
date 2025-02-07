import ClickableImage from '../Helpers/Button';


const links = [
    ["https://www.linkedin.com/in/vageesh-jayaraman/", "/about_me/linkedin.png"],
    ["https://github.com/Vageesh-Jayaraman", "/tech_stack_icons/github.png"],

]

export default function About() {
    const description = "Hey, I'm Vageesh! (Yep, you can see it up there 😃) I'm a third-year Computer Science student at VIT Chennai who loves coding and building cool stuff. Tech moves crazy fast, so I’m always trying to keep up. I learn best by trial and error—if I don’t know something, I’ll figure it out. Spent way too long stuck in tutorial hell, so now I’m all about hands-on projects. I also love using tech for a good cause.";

    return (
        <div className={`m-10  w-3/4 border-2 border-gray-500 font-mono text-sm p-4`}> 
            <p className="p-2 text-base">{description}</p>
            <p className="p-2 mt-10 text-base font-semibold">Wanna know more about me?</p>
            <div className="p-2 flex space-x-4 gap-4">
                {links.map(([link, path], index) => (
                <ClickableImage key={index} link={link} path={path} />
                ))}
            </div>
            <p className="text-yellow-400">(oops! I'm not on insta and X)</p>
        </div>
    );
}

