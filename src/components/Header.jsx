const Header = () => {
  return (
    <header className="stikcy z-50 top-0 backdrop-blur bg-white/30 p-4">
      <nav className="flex justify-between items-center container">
        <span className="font-black text-2xl">DND</span>
        <a href="https://github.com/musiur/vanilla-dnd-in-react" className="hover:underline">SourceCode</a>
      </nav>
    </header>
  );
};

export default Header;
