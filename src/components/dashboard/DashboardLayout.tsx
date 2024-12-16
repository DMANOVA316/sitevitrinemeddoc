import Sidebar from "@/components/dashboard/Sidebar";
import Navbar from "@/components/dashboard/Navbar";
import { Outlet } from "react-router-dom";
import PageTitle from "../PageTitle";

const DashboardLayout = () => {
  return (
    <div className="flex h-screen bg-background">
      <PageTitle isDashboard={true} />
      <Sidebar className="w-64 border-r" />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar />
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          <div className="container mx-auto px-2 sm:px-4 md:px-6 py-4 sm:py-6 max-w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
