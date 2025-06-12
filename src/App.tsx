import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import PublicLayout from "@/components/PublicLayout";
import Index from "./pages/Index";
import Login from "./pages/Login";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import PrivateRoute from "@/components/PrivateRoute";
import DashboardIndex from "./pages/Dashboard/Index";
import DashboardPharmacies from "./pages/Dashboard/Pharmacy/PharmacyList";
import Pharmacy from "./pages/Pharmacy";
import Community from "./pages/services/CommunityManagementMedical";
import Consulting from "./pages/services/ConsultingSanteStrategie";
import Digital from "./pages/services/SolutionsDigitalesSante";
import DigitalLibrary from "./pages/DigitalLibrary";
import LibraryDashboard from "./pages/Dashboard/Library/LibraryDashboard";
import EditPageIndex from "./pages/Dashboard/EditPages/EditPageIndex";
import PartnerIndex from "./pages/Dashboard/Partners/PartnerIndex";
import PartnerList from "./pages/Dashboard/Partners/PartnerList";
import Services from "./pages/Dashboard/Services";
import NumberList from "./pages/Dashboard/Numbers/NumberList";
import { ServiceProvider } from "./contexts/ServiceContext";
import SocialMediaIndex from "./pages/Dashboard/SocialMedia/SocialMediaIndex";
import About from "./pages/About";
import { useEffect } from "react";
import AmbulanceList from "./pages/Dashboard/Ambulance/AmbulanceList";
import { Provider } from "react-redux";
import { store } from "./store";
import ContactUs from "./pages/ContactUs";
import ContactsUs from "./components/dashboard/contactUs/ContactsUs";
import Formations from "./pages/services/FormationsSante";
import AppMeddoc from "./pages/AppMeddoc";
import RouteTracker from './components/RouteTracker';

const queryClient = new QueryClient();

// Composant pour gérer le défilement vers les ancres
const ScrollToAnchor = () => {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    // Si un hash est présent dans l'URL
    if (hash) {
      // Attendre que le DOM soit complètement chargé
      setTimeout(() => {
        const id = hash.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          const offset = 80; // Offset pour tenir compte du header fixe
          const elementPosition =
            element.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({
            top: elementPosition - offset,
            behavior: "smooth",
          });

          // Ajouter un effet de surbrillance
          element.classList.add("highlight-section");
          setTimeout(() => {
            element.classList.remove("highlight-section");
          }, 1500);
        }
      }, 100);
    } else {
      // Défiler vers le haut lors d'un changement de page sans hash
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]); // Réagir aux changements de pathname et hash

  return null;
};

// Wrapper pour utiliser le hook useLocation
const AppContent = () => {
  return (
    <>
      {/* google analytics */}
      <RouteTracker /> 
      {/* fin google analytics */}

      <ScrollToAnchor />
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
          path="/app-meddoc"
          element={
            <PublicLayout>
              <AppMeddoc />
            </PublicLayout>
          }
        />
        <Route
          path="/pharmacies-et-pharmacies-de-garde"
          element={
            <PublicLayout>
              <Pharmacy />
            </PublicLayout>
          }
        />
        <Route
          path="/contacts"
          element={
            <PublicLayout>
              <ContactUs />
            </PublicLayout>
          }
        />
        <Route
          path="/qui-sommes-nous"
          element={
            <PublicLayout>
              <About />
            </PublicLayout>
          }
        />
        <Route
          path="/bibliotheque-numerique-sante"
          element={
            <PublicLayout>
              <DigitalLibrary />
            </PublicLayout>
          }
        />
        {/* Routes des services */}
        <Route
          path="/services/community-management-medical"
          element={
            <PublicLayout>
              <Community />
            </PublicLayout>
          }
        />
        <Route
          path="/services/consulting-sante-strategie"
          element={
            <PublicLayout>
              <Consulting />
            </PublicLayout>
          }
        />
        <Route
          path="/services/solutions-digitales-sante"
          element={
            <PublicLayout>
              <Digital />
            </PublicLayout>
          }
        />
        <Route
          path="/services/formations-sante"
          element={
            <PublicLayout>
              <Formations />
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
            <Route path="/dashboard/page-meddoc/" element={<EditPageIndex />} />
            <Route path="/dashboard/partenaires" element={<PartnerIndex />}>
              <Route
                path="/dashboard/partenaires/list"
                element={<PartnerList />}
              />
            </Route>
            <Route
              path="/dashboard/reseaux-sociaux"
              element={<SocialMediaIndex />}
            />
            <Route path="/dashboard/services" element={<Services />} />
            <Route path="/dashboard/contact-meddoc" element={<ContactsUs />} />
            <Route path="/dashboard/contacts" element={<NumberList />} />
            <Route path="/dashboard/ambulances" element={<AmbulanceList />} />
            <Route
              path="/dashboard/bibliotheque-numerique-sante"
              element={<LibraryDashboard />}
            />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

// Composant principal de l'application
const App = () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <TooltipProvider>
            <ServiceProvider>
              <Toaster richColors />
              <BrowserRouter>
                <AppContent />
              </BrowserRouter>
            </ServiceProvider>
          </TooltipProvider>
        </Provider>
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
