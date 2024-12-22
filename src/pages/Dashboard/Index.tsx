// src/pages/Dashboard/Index.tsx
import React from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Navbar from "@/components/dashboard/Navbar";
import DashboardStats from "@/components/dashboard/DashboardStats";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <main className="p-6">
        <h1 className="text-2xl font-bold">Tableau de bord</h1>
        {/* Statistiques */}
        <div className="mt-6">
          <DashboardStats />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
