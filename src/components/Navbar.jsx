import { useState, useEffect } from "react";
import { Menu, X, ArrowLeftRight, LogIn, UserPlus, Bell, ChevronDown, Settings, User, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import LoginModal from "./LoginModal";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [notifications, setNotifications] = useState(3); 

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isUserDropdownOpen && !event.target.closest('.user-dropdown-container')) {
        setIsUserDropdownOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isUserDropdownOpen]);

  return (
    <header 
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-sm shadow-md" : "bg-white"
      }`}
    >
      <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between w-full">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-sky-600 hover:text-sky-700 transition-all duration-300 transform hover:scale-105">
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
                  className="text-sm font-medium text-gray-700 hover:text-sky-600 transition-all duration-300 relative group"
                >
                  {item}
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-sky-600 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
                </Link>
              ))}
            </div>
          </nav>

          {/* Auth Buttons & Mobile Menu */}
          <div className="flex items-center gap-4">
            {/* Auth Buttons or User Profile - Desktop */}
            {isLoggedIn ? (
              <div className="hidden md:flex items-center gap-4">

                  {/* User Dropdown */}
                  <div className="relative user-dropdown-container">
                  <button 
                    onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                    className="flex items-center gap-2 cursor-pointer focus:outline-none"
                  >
                    <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-sky-300 flex-shrink-0">
                      <img 
                        src="https://loremflickr.com/1280/720" 
                        alt="User profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform duration-300 ${isUserDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {/* Dropdown Menu */}
                  {isUserDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg py-2 z-50 border border-gray-100">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium">Sarah Johnson</p>
                        <p className="text-xs text-gray-500">sarah.j@example.com</p>
                      </div>
                      <ul>
                        <li>
                          <Link to="/profile" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-sky-50">
                            <User className="h-4 w-4" />
                            <span>Profile</span>
                          </Link>
                        </li>
                        <li>
                          <Link to="/settings" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-sky-50">
                            <Settings className="h-4 w-4" />
                            <span>Settings</span>
                          </Link>
                        </li>
                        <li className="border-t border-gray-100 mt-2 pt-2">
                          <button 
                            onClick={() => setIsLoggedIn(false)}
                            className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
                          >
                            <LogOut className="h-4 w-4" />
                            <span>Logout</span>
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>

                {/* Notifications */}
                <div className="relative">
                  <button className="p-1 rounded-full hover:bg-sky-50 transition-all duration-300">
                    <Bell className="h-5 w-5 text-gray-600" />
                    {notifications > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {notifications}
                      </span>
                    )}
                  </button>
                </div>
                
        
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-3">
                <Link
                  onClick={() => setIsLoginModalOpen(true)}
                  className="flex items-center gap-2 text-gray-700 hover:text-sky-600 transition-all duration-300"
                >
                  <LogIn className="h-4 w-4" />
                  <span className="text-sm font-medium">Login</span>
                </Link>
                <Link
                  to="/register"
                  className="flex items-center gap-2 rounded-full bg-sky-600 px-6 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-sky-700 hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  <UserPlus className="h-4 w-4" />
                  <span>Register</span>
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="block md:hidden rounded-lg bg-gray-100 p-2.5 text-gray-600 transition-all duration-300 hover:bg-sky-50"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            
            {/* Mobile User Profile Icon (when logged in) */}
            {isLoggedIn && (
              <div className="flex md:hidden items-center gap-2">
                {/* Mobile Notifications */}
                <div className="relative">
                  <Bell className="h-5 w-5 text-gray-600" />
                  {notifications > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                      {notifications}
                    </span>
                  )}
                </div>
                
                {/* Mobile Profile Image */}
                <div className="w-7 h-7 rounded-full overflow-hidden border-2 border-sky-300">
                  <img 
                    src="/api/placeholder/28/28" 
                    alt="User profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden w-full bg-white border-b border-sky-100 shadow-lg">
            <nav className="flex flex-col space-y-4 px-4 py-6">
              {["Items", "About Us", "Contact"].map((item) => (
                <Link
                  key={item}
                  to={`/${item.toLowerCase().replace(" ", "-")}`}
                  className="text-sm font-medium text-gray-700 hover:text-sky-600 transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </Link>
              ))}
              
              {/* Mobile User Profile Options */}
              {isLoggedIn ? (
                <div className="border-t border-gray-100 pt-4 mt-2">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-sky-300">
                      <img 
                        src="/api/placeholder/40/40" 
                        alt="User profile" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Sarah Johnson</p>
                      <p className="text-xs text-gray-500">sarah.j@example.com</p>
                    </div>
                  </div>
                  
                  <ul className="space-y-3">
                    <li>
                      <Link 
                        to="/profile" 
                        className="flex items-center gap-2 text-sm text-gray-700"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <User className="h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/settings" 
                        className="flex items-center gap-2 text-sm text-gray-700"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Settings className="h-4 w-4" />
                        <span>Settings</span>
                      </Link>
                    </li>
                    <li>
                      <button 
                        onClick={() => {
                          setIsLoggedIn(false);
                          setIsMenuOpen(false);
                        }}
                        className="flex items-center gap-2 text-sm text-red-600 w-full text-left"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Logout</span>
                      </button>
                    </li>
                  </ul>
                </div>
              ) : (
                <div className="flex flex-col gap-3 pt-2">
                  <button
                    onClick={() => {
                      setIsLoginModalOpen(true);
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center justify-center gap-2 text-gray-700 hover:text-sky-600 transition-all duration-300"
                  >
                    <LogIn className="h-4 w-4" />
                    <span className="text-sm font-medium">Login</span>
                  </button>
                  <Link
                    to="/register"
                    className="flex items-center justify-center gap-2 rounded-full bg-sky-600 px-5 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-sky-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <UserPlus className="h-4 w-4" />
                    <span>Register</span>
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
      
      {/* Login Modal */}
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
        onLoginSuccess={() => setIsLoggedIn(true)}
      />
    </header>
  );
};

export default Navbar;