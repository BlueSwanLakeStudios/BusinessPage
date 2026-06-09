import { useState } from "react";
import logo from "../assets/logo.svg";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <div className="flex items-center gap-3">
          <img src={logo} alt="logo" className="w-12 h-12" />
          <h1 className="font-bold text-xl">
            Blue Swan Lake Studios
          </h1>
        </div>

        <ul className="hidden md:flex gap-8">
          <li><a href="#home" className="hover:text-blue-400">Home</a></li>
          <li><a href="#about" className="hover:text-blue-400">About</a></li>
          <li><a href="#services" className="hover:text-blue-400">Services</a></li>
          <li><a href="#contact" className="hover:text-blue-400">Contact</a></li>
        </ul>

        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden px-6 pb-4">
          <ul className="space-y-3">
            <li>Home</li>
            <li>About</li>
            <li>Services</li>
            <li>Contact</li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;