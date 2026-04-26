import StackIcon from "tech-stack-icons";

export default function Box({ text, text_color, logo, logo_size }) {
    return (
        <div className="pl-2 pr-2 pt-1.5 pb-1.5 border border-gray-400 hover:border-[#ffed51] rounded-lg flex items-center gap-2">
            <p className={`text-sm font-mono font-semibold ${text_color}`}>{text}</p>
            {logo?.endsWith(".png") ? (
                <img 
                    src={`../tech_stack_icons/${logo}`} 
                    alt={text} 
                    style={{ width: `${logo_size}px`, height: `${logo_size}px` }} 
                />
            ) : (
                <StackIcon name={logo} style={{ width: `${logo_size}px` }} />
            )}
        </div>
    );
}
