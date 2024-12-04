import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import Digital from "./pages/services/Digital";
import Community from "./pages/services/Community";
import Consulting from "./pages/services/Consulting";
import Pharmacies from "./pages/Pharmacies";
import Login from "./pages/Login";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Index />} />

              <Route path="/services/digital" element={<Digital />} />
              <Route path="/services/community" element={<Community />} />
              <Route path="/services/consulting" element={<Consulting />} />
              <Route path="/pharmacies" element={<Pharmacies />} />
              <Route path="/login" element={ <Login />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;