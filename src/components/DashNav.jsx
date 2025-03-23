import { Bell, LogOut, Mail, Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setLogout } from "../store/usersSlice";

const DashNav = () => {
  const dispatch = useDispatch();

  return (
    <nav className="bg-white border-b border-gray-100 px-6 py-4 sticky top-0 z-10 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center flex-1">
          <div className="relative max-w-md w-full">
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-sm"
            />
            <Search
              className="absolute left-3.5 top-2.5 text-gray-400"
              size={18}
            />
          </div>
        </div>

        <div className="flex items-center space-x-5">
          <button className="p-2.5 hover:bg-gray-100 rounded-full relative transition-colors">
            <Bell size={20} className="text-gray-600" />
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-indigo-600 rounded-full ring-2 ring-white"></span>
          </button>
          
          <button className="p-2.5 hover:bg-gray-100 rounded-full relative transition-colors">
            <Mail size={20} className="text-gray-600" />
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-indigo-600 rounded-full ring-2 ring-white"></span>
          </button>
          
          <div className="flex items-center space-x-3 pl-2 border-l border-gray-200">
            <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700">
              <span className="font-medium text-sm">JS</span>
            </div>
            
            <div className="hidden md:block">
              <p className="text-sm font-medium text-gray-500">John Smith</p>
              <p className="text-xs text-gray-500">Admin</p>
            </div>
            
            <button
              className="p-1.5 hover:bg-gray-100 rounded-full text-gray-500 transition-colors"
              title="Logout"
              onClick={()=>dispatch(setLogout())}
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DashNav;
