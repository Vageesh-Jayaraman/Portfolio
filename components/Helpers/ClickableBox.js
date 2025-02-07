export default function ClickableBox({ name, link }) {
    return (
        <a href={link} target="_blank" rel="noopener noreferrer">
            <div className="border border-yellow-300 hover:cursor-pointer px-1.5 py-0.5 text-xs font-medium font-mono hover:bg-gray-800">
                {name}
            </div>
        </a>
    );
}
