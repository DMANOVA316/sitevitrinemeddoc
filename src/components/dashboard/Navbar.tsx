// src/components/dashboard/Navbar.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import supabase from "@/utils/supabase";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login"); // Rediriger vers la page de connexion après déconnexion
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-lg font-bold">Tableau de Bord</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
      >
        Se déconnecter
      </button>
    </nav>
  );
};

export default Navbar;
