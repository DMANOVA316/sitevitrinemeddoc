import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicLayout from "@/components/PublicLayout";
import Index from "./pages/Index";
import Login from "./pages/Login";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import PrivateRoute from "@/components/PrivateRoute";
import DashboardIndex from "./pages/Dashboard/Index";
import DashboardPharmacies from "./pages/Dashboard/Pharmacies";
import Pharmacies from "./pages/Pharmacies";
import Community from "./pages/services/Community";
import Consulting from "./pages/services/Consulting";
import Digital from "./pages/services/Digital";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster richColors />
      <BrowserRouter>
        <Routes>
          {/* Routes publiques */}
          <Route
            path="/"
            element={
              <PublicLayout>
                <Index />
              </PublicLayout>
            }
          />
          <Route
            path="/login"
            element={
              <PublicLayout>
                <Login />
              </PublicLayout>
            }
          />
          <Route
            path="/pharmacies"
            element={
              <PublicLayout>
                <Pharmacies />
              </PublicLayout>
            }
          />

          {/* Routes des services */}
          <Route
            path="/services/community"
            element={
              <PublicLayout>
                <Community />
              </PublicLayout>
            }
          />
          <Route
            path="/services/consulting"
            element={
              <PublicLayout>
                <Consulting />
              </PublicLayout>
            }
          />
          <Route
            path="/services/digital"
            element={
              <PublicLayout>
                <Digital />
              </PublicLayout>
            }
          />

          {/* Routes protégées pour le tableau de bord */}
          <Route element={<PrivateRoute />}>
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<DashboardIndex />} />
              <Route path="/dashboard/pharmacies" element={<DashboardPharmacies />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;