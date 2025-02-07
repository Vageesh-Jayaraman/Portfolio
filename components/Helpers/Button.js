export default function ClickableImage({ link, path }) {
    return (
        <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
        >
            <img
                src={path}
                alt="icon"
                className="flex w-10 h-10 hover:opacity-80 transition-opacity"
            />
        </a>
    );
}
