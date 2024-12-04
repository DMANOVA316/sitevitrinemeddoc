// src/components/dashboard/Sidebar.tsx
import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white p-6 flex flex-col">
      <h2 className="text-xl font-bold mb-6">Tableau de Bord</h2>
      <ul className="space-y-4">
        <li>
          <Link to="/dashboard" className="hover:bg-gray-700 p-2 rounded">
            Accueil
          </Link>
        </li>
        <li>
          <Link to="/dashboard/profile" className="hover:bg-gray-700 p-2 rounded">
            Profil
          </Link>
        </li>
        <li>
          <Link to="/dashboard/settings" className="hover:bg-gray-700 p-2 rounded">
            Paramètres
          </Link>
        </li>
        <li>
          <Link to="/dashboard/analytics" className="hover:bg-gray-700 p-2 rounded">
            Analytique
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
