import Sidebar from "@/components/dashboard/Sidebar";
import Navbar from "@/components/dashboard/Navbar";
import { Outlet } from "react-router-dom";
import PageTitle from "../PageTitle";

const DashboardLayout = () => {
  return (
    <div className="flex h-screen bg-background">
      <PageTitle isDashboard={true} />
      <Sidebar className="w-64 border-r" />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
