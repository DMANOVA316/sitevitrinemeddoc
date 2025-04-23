import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { infoMeddocService } from "@/services/infoMeddocService";
import { Skeleton } from "@/components/ui/skeleton";
import { SiteLogo } from "@/components/ui/site-logo";

const Header = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        setIsLoading(true);
        await infoMeddocService.getInfo();
      } catch (error) {
        console.error("Error fetching site info:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInfo();
  }, []);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          {isLoading ? (
            <Skeleton className="h-8 w-32" />
          ) : (
            <SiteLogo className="h-10" />
          )}
        </div>
        {/* Navigation Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <NavigationMenu>
            <NavigationMenuList>

            <NavigationMenuItem>
                  <a href="https://app-meddoc.vercel.app/" className="text-lg text-gray-700 hover:text-blue-600 px-4 py-2 transition">APP MEDDoC</a>
               
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-lg font-semibold text-gray-700 hover:text-blue-600 transition">
                  Nos Services
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-6 w-[400px] bg-white shadow-lg rounded-md">
                    <Link
                      to="/services/digital"
                      className="block p-4 hover:bg-blue-100 rounded-lg transition"
                    >
                      <div className="text-lg font-semibold text-gray-800">
                      Solutions digitales
                      </div>
                      <p className="text-sm text-gray-500">
                        Développement d'outils innovants
                      </p>
                    </Link>
                    <Link
                      to="/services/community"
                      className="block p-4 hover:bg-blue-100 rounded-lg transition"
                    >
                      <div className="text-lg font-semibold text-gray-800">
                      Community management médical
                      </div>
                      <p className="text-sm text-gray-500">
                        Gestion de votre présence en ligne
                      </p>
                    </Link>
                    <Link
                      to="/services/formations"
                      className="block p-4 hover:bg-blue-100 rounded-lg transition"
                    >
                      <div className="text-lg font-semibold text-gray-800">
                        Formations
                      </div>
                      <p className="text-sm text-gray-500">           
                        Expertise et accompagnement     
                      </p>
                    </Link>
                    <Link
                      to="/services/consulting"
                      className="block p-4 hover:bg-blue-100 rounded-lg transition"
                    >
                      <div className="text-lg font-semibold text-gray-800">
                      Consulting santé
                      </div>
                      <p className="text-sm text-gray-500">
                        Bénéficiez de notre expertise sectorielle pour structurer, améliorer et innover dans vos services.
                      </p>
                    </Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link
                  to="/pharmacies"
                  className="text-lg text-gray-700 hover:text-blue-600 px-4 py-2 transition"
                >
                  Pharmacies
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link
                  to="/apropos"
                  className="text-lg text-gray-700 hover:text-blue-600 px-4 py-2 transition"
                >
                  A propos
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link
                  to="/contact"
                  className="text-lg text-gray-700 hover:text-blue-600 px-4 py-2 transition"
                >
                  Contacter Nous
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            className="block lg:hidden p-2 text-gray-700"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white shadow-md transition-all duration-300 ease-in-out transform">
          <div className="p-4 space-y-4">
            <Link
              to="/services/digital"
              className="pl-4 block text-md text-gray-800 hover:bg-blue-100 py-2 rounded-lg transition"
            >
              Solutions Numériques
            </Link>
            <Link
              to="/services/community"
              className="pl-4 block text-md text-gray-800 hover:bg-blue-100 py-2 rounded-lg transition"
            >
              Community Management
            </Link>
            <Link
              to="/services/consulting"
              className="pl-4 block text-md text-gray-800 hover:bg-blue-100 py-2 rounded-lg transition"
            >
              Services de Conseil
            </Link>
            <Link
              to="/pharmacies"
              className="pl-4 block text-md text-gray-800 hover:bg-blue-100 py-2 rounded-lg transition"
            >
              Pharmacies
            </Link>
            <Link
              to="/apropos"
              className="pl-4 block text-md text-gray-800 hover:bg-blue-100 py-2 rounded-lg transition"
            >
              A propos
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
