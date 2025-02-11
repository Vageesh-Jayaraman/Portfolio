import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";

export function MyImage({ text }) {
    return (
        <HoverCard>
            <HoverCardTrigger asChild>
                <span className="hover:underline hover:decoration-yellow-400 hover:bg-yellow-400/50 px-1 transition">
                    {text}
                </span>
            </HoverCardTrigger>
            <HoverCardContent className="w-64"> 
                <img
                    src="/about_me/me.jpeg"
                    alt="Placeholder Image"
                    height="10px"
                    className="rounded-lg w-fit h-auto"
                />
            </HoverCardContent>
        </HoverCard>
    );
}
