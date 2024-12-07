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
import EditHeader from "./pages/Dashboard/EditPages/EditHeader";
import EditFooter from "./pages/Dashboard/EditPages/EditFooter";
import EditLandingPage from "./pages/Dashboard/EditPages/EditLandingPage";
import EditPageIndex from "./pages/Dashboard/EditPages/EditPageIndex";
import PartnerIndex from "./pages/Dashboard/Partners/PartnerIndex";
import PartnerList from "./pages/Dashboard/Partners/PartnerList";
import Services from "./pages/Dashboard/Services";
import NumberList from "./pages/Dashboard/Numbers/NumberList";
import { EditPagesProvider } from "./contexts/EditPagesContext";
import { ServiceProvider } from "./contexts/ServiceContext";
import { NumberProvider } from "./contexts/NumberContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <EditPagesProvider>
        <ServiceProvider>
          <NumberProvider>
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
                    <Route
                      path="/dashboard/pharmacies"
                      element={<DashboardPharmacies />}
                    />
                    {/* Edition de page */}
                    <Route
                      path="/dashboard/page-meddoc/"
                      element={<EditPageIndex />}
                    />
                    <Route
                      path="/dashboard/page-meddoc/header"
                      element={<EditHeader />}
                    />
                    <Route
                      path="/dashboard/page-meddoc/footer"
                      element={<EditFooter />}
                    />
                    <Route
                      path="/dashboard/page-meddoc/landing-page"
                      element={<EditLandingPage />}
                    />
                    <Route
                      path="/dashboard/partenaires"
                      element={<PartnerIndex />}
                    >
                      <Route
                        path="/dashboard/partenaires/list"
                        element={<PartnerList />}
                      />
                    </Route>
                    <Route
                      path="/dashboard/services"
                      element={
                        <ServiceProvider>
                          <Services />
                        </ServiceProvider>
                      }
                    />
                    <Route
                      path="/dashboard/contact-meddoc"
                      element={<NumberList />}
                    />
                  </Route>
                </Route>
              </Routes>
            </BrowserRouter>
          </NumberProvider>
        </ServiceProvider>
      </EditPagesProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
