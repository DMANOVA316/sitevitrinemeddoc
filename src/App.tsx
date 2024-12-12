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
import DashboardPharmacies from "./pages/Dashboard/PharmacyList";
import Pharmacies from "./pages/Pharmacies";
import Community from "./pages/services/Community";
import Consulting from "./pages/services/Consulting";
import Digital from "./pages/services/Digital";
import EditHeader from "./pages/Dashboard/EditPages/EditHeader";
import EditLandingPage from "./pages/Dashboard/EditPages/EditLandingPage";
import EditPageIndex from "./pages/Dashboard/EditPages/EditPageIndex";
import PartnerIndex from "./pages/Dashboard/Partners/PartnerIndex";
import PartnerList from "./pages/Dashboard/Partners/PartnerList";
import Services from "./pages/Dashboard/Services";
import NumberList from "./pages/Dashboard/Numbers/NumberList";
import { EditPagesProvider } from "./contexts/EditPagesContext";
import { ServiceProvider } from "./contexts/ServiceContext";
import { NumberProvider } from "./contexts/NumberContext";
import { InfoMeddocProvider } from "./contexts/InfoMeddocContext";
import SocialMediaIndex from "./pages/Dashboard/SocialMedia/SocialMediaIndex";
import { SocialMediaProvider } from "./contexts/SocialMediaContext";
import AmbulanceList from "./pages/Dashboard/AmbulanceList";
import { Provider } from 'react-redux';
import { store } from './redux/store';
import ContactUs from "./pages/ContactUs";

const queryClient = new QueryClient();

const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <InfoMeddocProvider>
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
                    <Route
                      path="/contact"
                      element={
                        <PublicLayout>
                          <ContactUs />
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
                        <Route
                          path="/dashboard/ambulances"
                          element={<AmbulanceList />}
                        />
                        {/* Edition de page */}
                        <Route
                          path="/dashboard/page-meddoc/"
                          element={<EditPageIndex />}
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
                          path="/dashboard/reseaux-sociaux"
                          element={
                            <SocialMediaProvider>
                              <SocialMediaIndex />
                            </SocialMediaProvider>
                          }
                        />
                        <Route
                          path="/dashboard/services"
                          element={<Services />}
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
        </InfoMeddocProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </Provider>
);

export default App;
