import { useState, useEffect } from "react";
import { Menu, X, ArrowLeftRight, LogIn, UserPlus, Bell, ChevronDown, Settings, User, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import LoginModal from "./LoginModal";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../store/usersSlice";
import socket, { identifyUser, onTradeRequestReceived } from "../services/socketService";


export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState(0); 
  const [notificationsList, setNotificationsList] = useState([]);
  const isLoggedIn = useSelector((state)=> state.users.isLoggedIn);
  const user = useSelector((state)=>state.users.loggedUser);
  const dispatch = useDispatch();


useEffect(()=>{

    if (user?._id) {
      identifyUser(user._id);
    }
    
},[user]);

  useEffect(() => {
    const handleReconnect = () => {
      console.log('🟢 WebSocket reconnected. Re-identifying user...');
      if (user?._id) {
        identifyUser(user._id);
      }
    };

    socket.on('connect', handleReconnect);

    return () => {
      socket.off('connect', handleReconnect);  
    };
  }, [user]);

  // Listen for real-time trade request notifications
  useEffect(() => {
    const handleIncomingRequest = (payload) => {
      setNotificationsList([...notificationsList,{message: payload.message,id: payload.receiverId, isRead: false}]);
      setNotifications((prevState)=>prevState + 1);
      console.log('Received trade request:', payload);
    };

    onTradeRequestReceived(handleIncomingRequest);

    // Cleanup when component unmounts
    return () => {
      socket.off('tradeRequestCreated', handleIncomingRequest);
    };
  }, []);
 

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isUserDropdownOpen && !event.target.closest('.user-dropdown-container')) {
        setIsUserDropdownOpen(false);
      }
      if (isNotificationsOpen && !event.target.closest('.notifications-dropdown-container')) {
        setIsNotificationsOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isUserDropdownOpen, isNotificationsOpen]);

  const markAllAsRead = () => {
    console.log('notifications', notificationsList);
    setNotificationsList(prev => prev.map(notification => ({...notification, isRead: true})));
    setNotifications(0);
  };



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
                <div className="relative notifications-dropdown-container">
                  <button 
                    onClick={
                      () =>{setIsNotificationsOpen(!isNotificationsOpen);
                      markAllAsRead();
                      
                    }} 
                    className="p-1.5 rounded-full hover:bg-sky-50 transition-all duration-300 relative"
                  >
                    <Bell className="h-5 w-5 text-gray-600" />
                    {notifications > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                        {notifications}
                      </span>
                    )}
                  </button>

                  {/* Notifications Dropdown */}
                  {isNotificationsOpen && (
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl py-2 z-50 border border-gray-100 overflow-hidden transition-all duration-300 animate-fadeIn">
                      <div className="px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-sky-50 to-white flex items-center justify-between">
                        <p className="text-sm font-semibold text-gray-800">Notifications</p>
      
                      </div>
                      
                      <div className="max-h-96 overflow-y-auto">
                        {notificationsList.length > 0 ? (
                          <ul className="py-1">
                            {notificationsList.map((notification) => (
                              <li key={notification.id} className={`border-b border-gray-50 last:border-0 ${!notification.isRead ? 'bg-sky-50' : ''}`}>
                                <button 
                                  onClick={''}
                                  className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors duration-200"
                                >
                                  <div className="flex items-start gap-2">
                                    {!notification.isRead && (
                                      <span className="h-2 w-2 rounded-full bg-sky-500 mt-1.5 flex-shrink-0"></span>
                                    )}
                                    <div className={`flex-1 ${!notification.isRead ? '' : 'pl-4'}`}>
                                      <p className="text-sm text-gray-800">{notification.message}</p>
                                      <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                                    </div>
                                  </div>
                                </button>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <div className="py-6 px-4 text-center">
                            <p className="text-sm text-gray-500">No notifications yet</p>
                          </div>
                        )}
                      </div>
                      
                      <div className="px-4 py-2 border-t border-gray-100 bg-gray-50">
                        <Link 
                          to="/notifications"
                          className="block text-center text-xs font-medium text-sky-600 hover:text-sky-700"
                          onClick={() => setIsNotificationsOpen(false)}
                        >
                          View all notifications
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                {/* User Dropdown */}
                <div className="relative user-dropdown-container">
                  <button 
                    onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                    className="flex items-center gap-2 cursor-pointer focus:outline-none hover:bg-sky-50 rounded-full pl-2 pr-3 py-1 transition-all duration-300"
                  >
                    <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-sky-300 flex-shrink-0 ring-2 ring-sky-100">
                      <img 
                        src={`${user.avatar}`}
                        alt="User profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-700">{user?.first_name}</span>
                    <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform duration-300 ${isUserDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {/* Dropdown Menu */}
                  {isUserDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl py-2 z-50 border border-gray-100 overflow-hidden transition-all duration-300 animate-fadeIn">
                      <div className="px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-sky-50 to-white">
                        <p className="text-sm font-semibold text-gray-800">{user?.first_name + ' ' + user?.last_name}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{user?.email}</p>
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
                <div className="relative notifications-dropdown-container">
                  <button 
                    onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                    className="relative p-1.5 rounded-full hover:bg-sky-50 transition-all duration-300"
                  >
                    <Bell className="h-5 w-5 text-gray-600" />
                    {notifications > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center animate-pulse">
                        {notifications}
                      </span>
                    )}
                  </button>
                  
                  {/* Mobile Notifications Dropdown */}
                  {isNotificationsOpen && (
                    <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl py-2 z-50 border border-gray-100 overflow-hidden transition-all duration-300 animate-fadeIn">
                      <div className="px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-sky-50 to-white flex items-center justify-between">
                        <p className="text-sm font-semibold text-gray-800">Notifications</p>
                      </div>
                      
                      <div className="max-h-96 overflow-y-auto">
                        {notificationsList.length > 0 ? (
                          <ul className="py-1">
                            {notificationsList.map((notification) => (
                              <li key={notification.id} className={`border-b border-gray-50 last:border-0 ${!notification.isRead ? 'bg-sky-50' : ''}`}>
                                <button 
                                  onClick={() => markAsRead(notification.id)}
                                  className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors duration-200"
                                >
                                  <div className="flex items-start gap-2">
                                    {!notification.isRead && (
                                      <span className="h-2 w-2 rounded-full bg-sky-500 mt-1.5 flex-shrink-0"></span>
                                    )}
                                    <div className={`flex-1 ${!notification.isRead ? '' : 'pl-4'}`}>
                                      <p className="text-sm text-gray-800">{notification.message}</p>
                                      <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                                    </div>
                                  </div>
                                </button>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <div className="py-6 px-4 text-center">
                            <p className="text-sm text-gray-500">No notifications yet</p>
                          </div>
                        )}
                      </div>
                      
                      <div className="px-4 py-2 border-t border-gray-100 bg-gray-50">
                        <Link 
                          to="/notifications"
                          className="block text-center text-xs font-medium text-sky-600 hover:text-sky-700"
                          onClick={() => setIsNotificationsOpen(false)}
                        >
                          View all notifications
                        </Link>
                      </div>
                    </div>
                  )}
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