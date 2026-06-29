import logo from "../assets/logo.svg";

function Navbar() {
  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-gray-900 text-white">
      <div className="flex items-center gap-2">
        <img src={logo} alt="logo" className="w-10" />
        <h1 className="font-bold text-xl">
          Blue Swan Lake Studios
        </h1>
      </div>

      <ul className="flex gap-6">
        <li><a href="#home" className="hover:text-blue-400 transition-colors">Home</a></li>
        <li><a href="#about" className="hover:text-blue-400 transition-colors">About</a></li>
        <li><a href="#contact" className="hover:text-blue-400 transition-colors">Contact</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;