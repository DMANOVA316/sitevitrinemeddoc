// src/pages/Dashboard/Index.tsx
import React from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Navbar from "@/components/dashboard/Navbar";

const Dashboard = () => {
  return (
    <div className="">

        <main className="p-6">
          <h1 className="text-2xl font-bold">Tableau de bord</h1>
          <div className="mt-6 space-x-4">
            <button className="py-2 px-4 bg-blue-500 text-white rounded-md">Gerer les pharmacies</button>
            <button className="py-2 px-4 bg-green-500 text-white rounded-md">Paramètres</button>
            <button className="py-2 px-4 bg-yellow-500 text-white rounded-md">Analytique</button>
          </div>
        </main>
      </div>
    
  );
};

export default Dashboard;
