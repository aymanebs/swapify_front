import React, { useState } from "react";
import { Menu, X, Home, Settings, Users, Megaphone, User, Dock, Boxes } from "lucide-react";
import { Link } from "react-router";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const menuItems = [
    { icon: Home, label: "Dashboard", href: "/home" },
    { icon: Users, label: "Users", href: "/dashboard/users" },
    { icon: Dock, label: "Categories", href: "/dashboard/categories" },
    { icon: Boxes, label: "Items", href: "/dashboard/items" },
    { icon: Megaphone, label: "Complaints", href: "/events" },
    
  ];

  return (
    <aside 
    className={`bg-gradient-to-b from-indigo-900 to-blue-800 text-white h-screen flex flex-col transition-all duration-300 ease-in-out shadow-lg ${
      isOpen ? 'w-64' : 'w-20'
    } overflow-hidden`}
  >
    <div className="p-5 flex justify-between items-center border-b border-indigo-700/50">
      {isOpen && <h2 className="text-xl font-bold tracking-tight">Swapify</h2>}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-2 hover:bg-indigo-700 rounded-full transition-colors duration-200 ${!isOpen ? 'mx-auto' : ''}`}
        aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
      >
        {isOpen ? <X size={18} /> : <Menu size={18} />}
      </button>
    </div>

    <nav className="pt-4 flex-1 overflow-y-auto">
      {menuItems.map((item, index) => (
        <Link
          key={index}
          to={item.href}
          className={`flex items-center ${
            isOpen ? "px-5" : "justify-center"
          } py-3.5 hover:bg-indigo-700/50 transition-colors rounded-md mx-2 my-1 group relative`}
          style={{ maxWidth: '100%' }}
        >
          <div className="text-indigo-200 flex-shrink-0">
            <item.icon size={22} />
          </div>
          {isOpen && <span className="ml-4 font-medium text-sm truncate">{item.label}</span>}
          {!isOpen && (
            <span className="absolute left-full ml-2 px-2 py-1 bg-indigo-800 rounded text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none">
              {item.label}
            </span>
          )}
        </Link>
      ))}
    </nav>

    {isOpen && (
      <div className="p-4 mt-auto border-t border-indigo-700/50">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-indigo-700 flex items-center justify-center flex-shrink-0">
            <User size={16} />
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-medium truncate">User Account</p>
            <p className="text-xs text-indigo-200 truncate">
              user@swapify.com
            </p>
          </div>
        </div>
      </div>
    )}
  </aside>
  );
};
export default Sidebar;
