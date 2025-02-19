import { useState, useEffect } from "react";
import { Menu, X, ArrowLeftRight, LogIn, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import LoginModal from "./LoginModal";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-sm shadow-md" : "bg-white"
      }`}
    >
      <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between w-full">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-all duration-300 transform hover:scale-105">
            <ArrowLeftRight className="h-8 w-8" />
            <span className="text-xl font-bold">Swapify</span>
          </Link>

          {/* Desktop Navigation - Centered */}
          <nav className="hidden md:flex items-center justify-center flex-1">
            <div className="flex items-center gap-12">
              {["Items", "About Us", "Contact"].map((item) => (
                <Link
                  key={item}
                  to={`/${item.toLowerCase().replace(" ", "-")}`}
                  className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-all duration-300 relative group"
                >
                  {item}
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-600 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
                </Link>
              ))}
            </div>
          </nav>

          {/* Auth Buttons & Mobile Menu */}
          <div className="flex items-center gap-4">
            {/* Auth Buttons - Desktop */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                onClick={() => setIsLoginModalOpen(true)}
                className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-all duration-300"
              >
                <LogIn className="h-4 w-4" />
                <span className="text-sm font-medium">Login</span>
              </Link>
              <Link
                to="/register"
                className="flex items-center gap-2 rounded-full bg-blue-600 px-6 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-blue-700 hover:shadow-lg transform hover:-translate-y-0.5"
              >
                <UserPlus className="h-4 w-4" />
                <span>Register</span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="block md:hidden rounded-lg bg-gray-100 p-2.5 text-gray-600 transition-all duration-300 hover:bg-blue-50"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden w-full bg-white border-b border-blue-100 shadow-lg">
            <nav className="flex flex-col space-y-4 px-4 py-6">
              {["Items", "About Us", "Contact"].map((item) => (
                <Link
                  key={item}
                  to={`/${item.toLowerCase().replace(" ", "-")}`}
                  className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </Link>
              ))}
              {/* Auth Buttons - Mobile */}
              <div className="flex flex-col gap-3 pt-2">
                <button
                  onClick={() => {
                    setIsLoginModalOpen(true);
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center justify-center gap-2 text-gray-700 hover:text-blue-600 transition-all duration-300"
                >
                  <LogIn className="h-4 w-4" />
                  <span className="text-sm font-medium">Login</span>
                </button>
                <Link
                  to="/register"
                  className="flex items-center justify-center gap-2 rounded-full bg-blue-600 px-5 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-blue-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <UserPlus className="h-4 w-4" />
                  <span>Register</span>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
      
      {/* Login Modal */}
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
    </header>
  );
};

export default Navbar;