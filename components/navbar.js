export default function NavBar({ setSelectedComponent }) {
  return (
    <nav className="ml-20 mt-10 h-60 font-bold opacity-90 w-40">
      <ul className="flex flex-col space-y-3 text-sm font-mono">
        {['About Me', 'My Stack', 'Projects'].map((item) => (
          <li
            key={item}
            className="border-2 border-gray-500 p-2 cursor-pointer hover:border-[#ffed51]"
            onClick={() => setSelectedComponent(item)}
          >
            {item}
          </li>
        ))}
      </ul>
    </nav>
  );
}
