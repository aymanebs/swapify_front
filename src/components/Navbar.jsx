import { useState, useEffect } from "react";
import { Menu, X, ArrowLeftRight, LogIn, UserPlus, Bell, ChevronDown, Settings, User, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import LoginModal from "./LoginModal";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../store/usersSlice";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState(3); 
  const isLoggedIn = useSelector((state)=> state.users.isLoggedIn);
  const dispatch = useDispatch();

  console.log("isLoggedIn", isLoggedIn);

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
        scrolled ? "bg-white/90 backdrop-blur-md shadow-lg" : "bg-white"
      }`}
    >
      <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between w-full">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-sky-600 hover:text-sky-700 transition-all duration-300 transform hover:scale-105">
            <ArrowLeftRight className="h-8 w-8" />
            <span className="text-xl font-bold tracking-tight">Swapify</span>
          </Link>

          {/* Desktop Navigation - Centered */}
          <nav className="hidden md:flex items-center justify-center flex-1">
            <div className="flex items-center gap-12">
              {["Items", "About Us", "Contact"].map((item) => (
                <Link
                  key={item}
                  to={`/${item.toLowerCase().replace(" ", "-")}`}
                  className="text-sm font-medium text-gray-700 hover:text-sky-600 transition-all duration-300 relative group px-2 py-1"
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

                {/* Notifications */}
                <div className="relative">
                  <button className="p-1.5 rounded-full hover:bg-sky-50 transition-all duration-300 relative">
                    <Bell className="h-5 w-5 text-gray-600" />
                    {notifications > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                        {notifications}
                      </span>
                    )}
                  </button>
                </div>

                {/* User Dropdown */}
                <div className="relative user-dropdown-container">
                  <button 
                    onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                    className="flex items-center gap-2 cursor-pointer focus:outline-none hover:bg-sky-50 rounded-full pl-2 pr-3 py-1 transition-all duration-300"
                  >
                    <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-sky-300 flex-shrink-0 ring-2 ring-sky-100">
                      <img 
                        src="https://loremflickr.com/1280/720" 
                        alt="User profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-700">Sarah</span>
                    <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform duration-300 ${isUserDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {/* Dropdown Menu */}
                  {isUserDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl py-2 z-50 border border-gray-100 overflow-hidden transition-all duration-300 animate-fadeIn">
                      <div className="px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-sky-50 to-white">
                        <p className="text-sm font-semibold text-gray-800">Sarah Johnson</p>
                        <p className="text-xs text-gray-500 mt-0.5">sarah.j@example.com</p>
                      </div>
                      <ul className="py-1">
                        <li>
                          <Link to="/profile" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-sky-50 transition-all duration-200">
                            <User className="h-4 w-4 text-sky-500" />
                            <span>Profile</span>
                          </Link>
                        </li>
                        <li>
                          <Link to="/settings" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-sky-50 transition-all duration-200">
                            <Settings className="h-4 w-4 text-sky-500" />
                            <span>Settings</span>
                          </Link>
                        </li>
                        <li className="border-t border-gray-100 mt-1">
                          <button 
                            onClick={()=>dispatch(setLogout())}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 w-full text-left transition-all duration-200"
                          >
                            <LogOut className="h-4 w-4" />
                            <span>Logout</span>
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-4">
                <Link
                  onClick={() => setIsLoginModalOpen(true)}
                  className="flex items-center gap-2 text-gray-700 hover:text-sky-600 transition-all duration-300 px-3 py-1.5 rounded-md hover:bg-sky-50"
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

            {/* Mobile Menu Button and Mobile User Profile */}
            <div className="flex md:hidden items-center gap-3">
              {/* Mobile User Profile Icon (when logged in) */}
              {isLoggedIn && (
                <div className="relative mr-1">
                  <button 
                    onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                    className="relative p-1.5 rounded-full hover:bg-sky-50 transition-all duration-300"
                  >
                    <Bell className="h-5 w-5 text-gray-600" />
                    {notifications > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center animate-pulse">
                        {notifications}
                      </span>
                    )}
                  </button>
                </div>
              )}
              
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="rounded-lg bg-sky-50 p-2.5 text-gray-600 transition-all duration-300 hover:bg-sky-100"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden w-full bg-white border-b border-sky-100 shadow-lg rounded-b-xl overflow-hidden transition-all duration-300 animate-slideDown">
            <nav className="flex flex-col space-y-1 px-4 py-4">
              {["Items", "About Us", "Contact"].map((item) => (
                <Link
                  key={item}
                  to={`/${item.toLowerCase().replace(" ", "-")}`}
                  className="text-sm font-medium text-gray-700 hover:text-sky-600 transition-all duration-300 py-2.5 px-3 rounded-lg hover:bg-sky-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </Link>
              ))}
              
              {/* Mobile User Profile Options */}
              {isLoggedIn ? (
                <div className="border-t border-gray-100 pt-4 mt-2">
                  <div className="flex items-center gap-3 mb-4 bg-gradient-to-r from-sky-50 to-white p-3 rounded-lg">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-sky-300 ring-2 ring-sky-100">
                      <img 
                        src="/api/placeholder/48/48" 
                        alt="User profile" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">Sarah Johnson</p>
                      <p className="text-xs text-gray-500">sarah.j@example.com</p>
                    </div>
                  </div>
                  
                  <ul className="space-y-1">
                    <li>
                      <Link 
                        to="/profile" 
                        className="flex items-center gap-3 text-sm text-gray-700 py-2.5 px-3 rounded-lg hover:bg-sky-50 transition-all duration-200"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <User className="h-4 w-4 text-sky-500" />
                        <span>Profile</span>
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/settings" 
                        className="flex items-center gap-3 text-sm text-gray-700 py-2.5 px-3 rounded-lg hover:bg-sky-50 transition-all duration-200"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Settings className="h-4 w-4 text-sky-500" />
                        <span>Settings</span>
                      </Link>
                    </li>
                    <li className="pt-1">
                      <button 
                        onClick={()=>{
                          dispatch(setLogout())
                          setIsMenuOpen(false)
                        }}
                        className="flex items-center gap-3 text-sm text-red-600 w-full text-left py-2.5 px-3 rounded-lg hover:bg-red-50 transition-all duration-200"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Logout</span>
                      </button>
                    </li>
                  </ul>
                </div>
              ) : (
                <div className="flex flex-col gap-3 pt-3 mt-2 border-t border-gray-100">
                  <button
                    onClick={() => {
                      setIsLoginModalOpen(true);
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center justify-center gap-2 text-gray-700 hover:text-sky-600 transition-all duration-300 py-2.5 px-3 rounded-lg hover:bg-sky-50"
                  >
                    <LogIn className="h-4 w-4" />
                    <span className="text-sm font-medium">Login</span>
                  </button>
                  <Link
                    to="/register"
                    className="flex items-center justify-center gap-2 rounded-lg bg-sky-600 px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:bg-sky-700 shadow-sm"
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
      />
    </header>
  );
};

export default Navbar;