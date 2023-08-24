import { ListChecks, Github } from "lucide-react";
import { Button } from "./ui/button";
import BrandLogo from "../assets/images/logo/brand";

const Header = () => {
  return (
    <header className="sticky z-50 top-0 backdrop-blur bg-white/60 p-4">
      <nav className="flex justify-between items-center container ">
        <span className="font-black text-2xl flex items-center gap-[2px] uppercase">
          {/* <ListChecks className="w-8 h-8 mr-2 stroke-primary bg-white shadow-xl p-[2px] rounded border-2 border-primary" /> */}
          <BrandLogo className="w-5 h-5" />
          oLoader
        </span>
        <div className="flex items-center gap-5">
          <a
            href="https://github.com/musiur/vanilla-dnd-in-react"
            target="_blank"
            rel="noreferrer"
          >
            <Github className="hover:stroke-primary" />
          </a>
          <Button>Login</Button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
