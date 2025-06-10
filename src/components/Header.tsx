import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { infoMeddocService } from "@/services/infoMeddocService";
import { Skeleton } from "@/components/ui/skeleton";
import { SiteLogo } from "@/components/ui/site-logo";
import { X, Menu, ChevronDown } from "lucide-react";

const Header = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close menu when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

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
    <header ref={headerRef} className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          {isLoading ? (
            <Skeleton className="h-6 w-24 sm:h-8 sm:w-32" />
          ) : (
            <SiteLogo className="h-8 sm:h-10" to="/" />
          )}
        </div>

        {/* Desktop Navigation Menu */}
        <div className="hidden md:flex items-center">
          <NavigationMenu>
            <NavigationMenuList className="space-x-1 lg:space-x-2">
              <NavigationMenuItem>
                <Link
                  to="/app-meddoc"
                  className="text-base lg:text-lg font-semibold text-meddoc-fonce hover:text-meddoc-primary px-2 lg:px-4 py-2 rounded-md hover:bg-gray-50 transition"
                >
                  APP MEDDoC
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-base lg:text-lg font-semibold text-meddoc-fonce hover:text-meddoc-primary px-2 lg:px-4 py-2 transition">
                  Nos services
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-2 p-4 md:p-6 w-[300px] md:w-[400px] bg-white shadow-lg rounded-md">
                    <Link
                      to="/services/solutions-digitales-sante"
                      className="block p-3 hover:bg-blue-50 rounded-lg transition"
                    >
                      <div className="text-base lg:text-lg font-semibold text-gray-800">
                        Solutions digitales santé
                      </div>
                      <p className="text-xs lg:text-sm text-gray-500">
                        Développement d'outils innovants
                      </p>
                    </Link>
                    <Link
                      to="/services/community-management-medical"
                      className="block p-3 hover:bg-blue-50 rounded-lg transition"
                    >
                      <div className="text-base lg:text-lg font-semibold text-gray-800">
                        Community management médical
                      </div>
                      <p className="text-xs lg:text-sm text-gray-500">
                        Gestion de votre présence en ligne
                      </p>
                    </Link>
                    <Link
                      to="/services/formations-sante"
                      className="block p-3 hover:bg-blue-50 rounded-lg transition"
                    >
                      <div className="text-base lg:text-lg font-semibold text-gray-800">
                        Formations santé
                      </div>
                      <p className="text-xs lg:text-sm text-gray-500">
                        Expertise et accompagnement
                      </p>
                    </Link>
                    <Link
                      to="/services/consulting-sante-strategie"
                      className="block p-3 hover:bg-blue-50 rounded-lg transition"
                    >
                      <div className="text-base lg:text-lg font-semibold text-gray-800">
                        Consulting santé et stratégie
                      </div>
                      <p className="text-xs lg:text-sm text-gray-500">
                        Expertise sectorielle pour structurer et innover
                      </p>
                    </Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link
                  to="/pharmacies"
                  className="text-base lg:text-lg font-semibold text-meddoc-fonce hover:text-meddoc-primary px-2 lg:px-4 py-2 rounded-md hover:bg-gray-50 transition"
                >
                  Pharmacies
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link
                  to="/bibliotheque-numerique-sante"
                  className="text-base lg:text-lg font-semibold text-meddoc-fonce hover:text-meddoc-primary px-2 lg:px-4 py-2 rounded-md hover:bg-gray-50 transition"
                >
                  Bibliothèque
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link
                  to="/qui-sommes-nous"
                  className="text-base lg:text-lg font-semibold text-meddoc-fonce hover:text-meddoc-primary px-2 lg:px-4 py-2 rounded-md hover:bg-gray-50 transition"
                >
                  Qui sommes-nous ?
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link
                  to="/contact"
                  className="text-base lg:text-lg font-semibold text-meddoc-fonce hover:text-meddoc-primary px-2 lg:px-4 py-2 rounded-md hover:bg-gray-50 transition"
                >
                  Contacts
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            className="p-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={() => setMenuOpen(false)}>
          <div
            className="absolute right-0 top-0 h-full w-4/5 max-w-sm bg-white shadow-xl transform transition-transform duration-300 ease-in-out"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b">
                <SiteLogo className="h-8" to="/" />
                <button
                  className="p-2 text-gray-700 hover:bg-gray-100 rounded-md"
                  onClick={() => setMenuOpen(false)}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="overflow-y-auto flex-grow">
                <div className="p-4 space-y-1">
                  <Link
                    to="/app-meddoc"
                    className="flex items-center w-full p-3 text-base font-medium text-gray-800 hover:bg-blue-50 rounded-lg transition"
                    onClick={() => setMenuOpen(false)}
                  >
                    APP MEDDoC
                  </Link>

                  {/* Services Dropdown */}
                  <div className="relative">
                    <div
                      className="flex items-center justify-between w-full p-3 text-base font-medium text-gray-800 hover:bg-blue-50 rounded-lg transition cursor-pointer"
                      onClick={() => setServicesOpen(!servicesOpen)}
                    >
                      <span>Nos Services</span>
                      <ChevronDown className={`h-4 w-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
                    </div>

                    {servicesOpen && (
                      <div className="pl-4 mt-1 space-y-1 border-l-2 border-blue-100 ml-3">
                        <Link
                          to="/services/solutions-digitales-sante"
                          className="flex items-center w-full p-3 text-sm font-medium text-gray-700 hover:bg-blue-50 rounded-lg transition"
                          onClick={() => setMenuOpen(false)}
                        >
                          Solutions digitales santé
                        </Link>
                        <Link
                          to="/services/community-management-medical"
                          className="flex items-center w-full p-3 text-sm font-medium text-gray-700 hover:bg-blue-50 rounded-lg transition"
                          onClick={() => setMenuOpen(false)}
                        >
                          Community management médical
                        </Link>
                        <Link
                          to="/services/formations-sante"
                          className="flex items-center w-full p-3 text-sm font-medium text-gray-700 hover:bg-blue-50 rounded-lg transition"
                          onClick={() => setMenuOpen(false)}
                        >
                          Formations santé
                        </Link>
                        <Link
                          to="/services/consulting-sante-strategie"
                          className="flex items-center w-full p-3 text-sm font-medium text-gray-700 hover:bg-blue-50 rounded-lg transition"
                          onClick={() => setMenuOpen(false)}
                        >
                          Consulting santé et stratégie
                        </Link>
                      </div>
                    )}
                  </div>

                  <Link
                    to="/pharmacies"
                    className="flex items-center w-full p-3 text-base font-medium text-gray-800 hover:bg-blue-50 rounded-lg transition"
                    onClick={() => setMenuOpen(false)}
                  >
                    Pharmacies
                  </Link>

                  <Link
                    to="/bibliotheque-numerique-sante"
                    className="flex items-center w-full p-3 text-base font-medium text-gray-800 hover:bg-blue-50 rounded-lg transition"
                    onClick={() => setMenuOpen(false)}
                  >
                    Bibliothèque
                  </Link>

                  <Link
                    to="/qui-sommes-nous"
                    className="flex items-center w-full p-3 text-base font-medium text-gray-800 hover:bg-blue-50 rounded-lg transition"
                    onClick={() => setMenuOpen(false)}
                  >
                    Qui sommes-nous 
                  </Link>

                  <Link
                    to="/contact"
                    className="flex items-center w-full p-3 text-base font-medium text-gray-800 hover:bg-blue-50 rounded-lg transition"
                    onClick={() => setMenuOpen(false)}
                  >
                    Contacts
                  </Link>
                </div>
              </div>

              <div className="p-4 border-t">
                <Link
                  to="/contact"
                  className="flex items-center justify-center w-full p-3 text-base font-medium text-white bg-gradient-to-r from-meddoc-primary to-meddoc-secondary hover:opacity-90 rounded-lg transition"
                  onClick={() => setMenuOpen(false)}
                >
                  Nous contacter
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
