import Box from "./box";

const languages = [
    ["Python", "text-blue-400", "python", "30"],
    ["C/C++", "text-blue-500", "c++", "30"],
    ["Java", "text-red-500", "java", "30"],
    ["Dart", "text-blue-400", "dart", "30"],
    ["Flutter", "text-blue-400", "flutter", "30"],
    ["JavaScript", "text-yellow-400", "js", "30"],
    ["HTML", "text-orange-500", "html5", "30"],
    ["CSS", "text-blue-600", "css3", "30"],
    ["Tailwind", "text-blue-400", "tailwindcss", "30"],
    ["TensorFlow", "text-orange-400", "tensorflow.png", "30"],
    ["Pytorch", "text-red-400", "pytorch", "30"],
    ["Node.js", "text-green-500", "nodejs", "30"],
    ["Express.js", "text-gray-300", "express.png", "30"],
    ["Next.js", "text-white", "nextjs2", "30"],
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

const Section = ({ title, items }) => (
    <div>
        <h2 className="text-base font-mono font-semibold mb-2 text-white">{title}</h2>
        <div className="flex flex-wrap gap-4">{items}</div>
    </div>
);

export default function TechStack() {
    const languagesDiv = languages.map(([text, color, logo, size], i) => (
        <Box key={i} text={text} text_color={color} logo={logo} logo_size={size} />
    ));
    const databasesDiv = databases.map(([text, color, logo, size], i) => (
        <Box key={i} text={text} text_color={color} logo={logo} logo_size={size} />
    ));
    const toolsDiv = tools.map(([text, color, logo, size], i) => (
        <Box key={i} text={text} text_color={color} logo={logo} logo_size={size} />
    ));

    return (
        <div className="w-full border-2 border-gray-500 p-4 font-mono text-sm mb-32">
            <Section title="Programming Languages / Frameworks" items={languagesDiv} />
            <div className="mt-6">
                <Section title="Databases" items={databasesDiv} />
            </div>
            <div className="mt-6">
                <Section title="Tools" items={toolsDiv} />
            </div>
        </div>
    );
}
