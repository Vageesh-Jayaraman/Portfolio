import { Roboto_Mono } from 'next/font/google'
 
const roboto = Roboto_Mono({
  weight: '400',
  subsets: ['latin'],
})


export default function About() {
    const points = [
        "Third-year Computer Science student (so of course, I love coding).",
        "Loves learning and building stuff.",
        "Trust me, if I don't know, I'll learn it somehow.",
        "Learning web development through the repetitive cycle of failing and succeeding.",
        "Always eager to contribute to a social cause."
    ];

    return (
        <div className={`m-10 w-3/4 border-2 border-gray-500 ${roboto.className} text-sm`}>
            <ul className="p-4 space-y-4 ">
                {points.map((point, index) => (
                    <li 
                        key={index} 
                        className="border-2 border-gray-500 p-2 cursor-pointer 
                                   hover:bg-yellow-300/50 transition-all">
                        {point}
                    </li>
                ))}
            </ul>
        </div>
    );
}
