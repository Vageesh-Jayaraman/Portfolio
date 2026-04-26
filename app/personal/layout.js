export const metadata = {
  title: 'Write | Vageesh Jayaraman',
  description: 'Personal writings and thoughts',
};

export default function PersonalLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {children}
    </div>
  );
}
