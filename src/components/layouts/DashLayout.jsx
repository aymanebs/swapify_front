import { Outlet } from "react-router-dom";
import DashNav from "../DashNav";
import DashFooter from "../DashFooter";
import Sidebar from "../Sidebar";

const DashLayout = () => {
  return (
    <div className="h-screen flex overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashNav />
        <main className="flex-1 bg-gray-50 p-6 overflow-y-auto">
          <Outlet />
        </main>
        <DashFooter />
      </div>
    </div>
  );
};

export default DashLayout;
