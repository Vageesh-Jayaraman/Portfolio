import Box from "./box";

const languages = [
    ["Python", "text-blue-400", "python", "30"],
    ["C/C++", "text-blue-500", "c++", "30"],
    ["Java", "text-red-500", "java", "30"],
    ["Dart", "text-blue-400", "dart", "30"],
    ["JavaScript", "text-yellow-400", "js", "30"],
    ["HTML", "text-orange-500", "html5", "30"],
    ["CSS", "text-blue-600", "css3", "30"],
    ["TensorFlow", "text-orange-400", "tensorflow.png", "30"],
    ["Pytorch", "text-red-400", "pytorch", "30"],
    ["Node.js", "text-green-500", "nodejs", "30"],
    ["Express.js", "text-gray-300", "express.png", "30"],
    ["Next.js", "text-white", "nextjs2", "30"],
    ["Three.js", "text-white", "threejs.png", "30"]
];

const databases = [
    ["MySQL", "text-blue-300", "mysql", "30"],
    ["MongoDB", "text-green-600", "mongodb", "30"]
];

const tools = [
    ["VS Code", "text-blue-400", "vscode", "30"],
    ["Android Studio", "text-green-500", "android", "30"],
    ["GitHub", "text-white", "github.png", "30"],
    ["Jupyter", "text-orange-500", "jupyter.png", "30"],
    ["AWS", "text-orange-400", "aws", "30"],
    ["Postman", "text-orange-500", "postman", "30"],
    ["Streamlit", "text-red-500", "streamlit", "30"],
    ["Canva", "text-blue-400", "canva", "30"]
];

const languagesDiv = languages.map(([text, color, logo, size], index) => (
    <Box key={index} text={text} text_color={color} logo={logo} logo_size={size} />
)); 

const databasesDiv = databases.map(([text, color, logo, size], index) => (
    <Box key={index} text={text} text_color={color} logo={logo} logo_size={size} />
)); 

const toolsDiv = tools.map(([text, color, logo, size], index) => (
    <Box key={index} text={text} text_color={color} logo={logo} logo_size={size} />
)); 

export default function TechStack() {
    return (
        <div className="flex flex-col gap-6 border-2 border-gray-500 p-2 w-3/4 m-10">
            <div>
                <h2 className="text-l font-mono font-semibold mb-2 text-white">Programming Languages/Frameworks</h2>
                <div className="flex flex-wrap gap-4">{languagesDiv}</div>
            </div>

            <div>
                <h2 className="text-l font-mono font-semibold mb-2 text-white">Databases</h2>
                <div className="flex flex-wrap gap-4">{databasesDiv}</div>
            </div>

            <div>
                <h2 className="text-l font-mono font-semibold mb-2 text-white">Tools</h2>
                <div className="flex flex-wrap gap-4">{toolsDiv}</div>
            </div>
        </div>
    );
}
