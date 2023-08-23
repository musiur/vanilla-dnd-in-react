const Header = () => {
  return (
    <>
      <header className="stikcy z-50 top-0 backdrop-blur p-4 bg-purple-400">
        <nav className="flex justify-between items-center container ">
          <span className="font-black text-2xl">DND@musiur</span>
          <a
            href="https://github.com/musiur/vanilla-dnd-in-react"
            className="hover:underline"
          >
            SourceCode
          </a>
        </nav>
      </header>
      <div className="py-5 bg-gray-50 sticky top-0"></div>
    </>
  );
};

export default Header;
