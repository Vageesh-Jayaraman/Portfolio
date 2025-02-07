import HelperBox from "../Helpers/helperBox";
import ClickableBox from "../Helpers/ClickableBox";

const colors = [
    'border-red-500',
    'border-blue-500',
    'border-green-400',
    'border-pink-500',
    'border-purple-500'
];


export default function ProjectBox({ title, website, github, tech, download, imageSrc, description }) {
    return (
        <div className="flex max-w-[500px] hover:border-[#ffed51] m-5 border-2 border-gray-700 rounded-lg font-mono p-2">
            <div className="w-24 h-24 flex-shrink-0">
                <img
                    src={imageSrc}
                    alt={title}
                    className="h-full object-cover rounded-md"
                />
            </div>

            <div className="ml-4 flex flex-col">
                <h2 className="text-lg font-semibold">{title}</h2>

                <div className="flex gap-2 mt-1 text-yellow-300 ">
                {website && <ClickableBox name={"Website"} link={website} />}
                {download && <ClickableBox name={"Download"}  link={download} />}
                {github && <ClickableBox name={"Github"}  link={github} />}
                </div>

                <div className="flex gap-1 mt-2">
                    {tech.map((item, index) => (
                        <HelperBox key={index} name={item} color={colors[index]}/>
                    ))}
                </div>

                <p className="text-sm text-gray-400 font-sans mt-2">{description}</p>
            </div>
        </div>
    );
}
