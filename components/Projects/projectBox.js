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
        <div className="w-full md:w-1/2 px-2 mb-5">
            <div className="flex flex-col sm:flex-row h-full w-full border-2 border-gray-700 hover:border-[#ffed51] rounded-lg font-mono p-2">

                <div className="w-full sm:w-24 h-24 flex-shrink-0 mx-auto sm:mx-0">
                    <img
                        src={imageSrc}
                        alt={title}
                        className="h-full object-cover rounded-md border-2 border-gray-700"
                    />
                </div>

                <div className="sm:ml-4 mt-4 sm:mt-0 flex flex-col flex-1">
                    <h2 className="text-lg font-semibold">{title}</h2>

                    <div className="flex flex-wrap gap-2 mt-1 text-yellow-300">
                        {website && <ClickableBox name={"Website"} link={website} />}
                        {download && <ClickableBox name={"Download"} link={download} />}
                        {github && <ClickableBox name={"Github"} link={github} />}
                    </div>

                    <div className="flex flex-wrap gap-1 mt-2">
                        {tech.map((item, index) => (
                            <HelperBox key={index} name={item} color={colors[index % colors.length]} />
                        ))}
                    </div>

                    <p className="text-sm text-gray-400 font-sans mt-2">{description}</p>
                </div>
            </div>
        </div>
    );
}
