import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { authService } from "@/services/authService";

const PrivateRoute: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const session = await authService.getSession();
        setIsAuthenticated(!!session);
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    const subscription = authService.onAuthStateChange((session) => {
      setIsAuthenticated(!!session);
      setIsLoading(false);
    });

    checkSession();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;

