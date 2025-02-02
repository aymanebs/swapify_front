import { useState, useEffect } from "react";
import { Menu, X, ArrowLeftRight, LogIn, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${
      scrolled ? "bg-white/95 backdrop-blur-sm shadow-md" : "bg-white"
    }`}>
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-all duration-300 transform hover:scale-105">
            <ArrowLeftRight className="h-8 w-8" />
            <span className="text-xl font-bold">Swapify</span>
          </Link>

          {/* Desktop Navigation - Centered */}
          <nav className="hidden md:flex items-center justify-center flex-1">
            <div className="flex items-center gap-12">
              {["Items", "About Us", "Contact"].map((item) => (
                <Link
                  key={item}
                  href={`${item.toLowerCase().replace(" ", "-")}`}
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
                href="/login"
                className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-all duration-300"
              >
                <LogIn className="h-4 w-4" />
                <span className="text-sm font-medium">Login</span>
              </Link>
              <Link
                href="/register"
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
        <div className={`md:hidden absolute left-0 right-0 bg-white border-b border-blue-100 transition-all duration-300 ${
          isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
        }`}>
          <nav className="flex flex-col space-y-4 px-4 py-6">
            {["Products", "About Us", "Contact"].map((item) => (
              <Link
                key={item}
                href={`${item.toLowerCase().replace(" ", "-")}`}
                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </Link>
            ))}
            {/* Auth Buttons - Mobile */}
            <div className="flex flex-col gap-3 pt-2">
              <Link
                href="/login"
                className="flex items-center justify-center gap-2 text-gray-700 hover:text-blue-600 transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                <LogIn className="h-4 w-4" />
                <span className="text-sm font-medium">Login</span>
              </Link>
              <Link
                href="/register"
                className="flex items-center justify-center gap-2 rounded-full bg-blue-600 px-5 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-blue-700"
                onClick={() => setIsMenuOpen(false)}
              >
                <UserPlus className="h-4 w-4" />
                <span>Register</span>
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;