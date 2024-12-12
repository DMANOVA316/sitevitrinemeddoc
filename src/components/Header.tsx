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
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {isLoading ? <Skeleton className="h-8 w-32" /> : <SiteLogo />}
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Nos Services</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-6 w-[400px]">
                    <Link
                      to="/services/digital"
                      className="block p-3 hover:bg-meddoc-light rounded-lg"
                    >
                      <div className="text-lg font-semibold">
                        Solutions Numériques
                      </div>
                      <p className="text-sm text-gray-500">
                        Développement d'outils innovants
                      </p>
                    </Link>
                    <Link
                      to="/services/community"
                      className="block p-3 hover:bg-meddoc-light rounded-lg"
                    >
                      <div className="text-lg font-semibold">
                        Community Management
                      </div>
                      <p className="text-sm text-gray-500">
                        Gestion de votre présence en ligne
                      </p>
                    </Link>
                    <Link
                      to="/services/consulting"
                      className="block p-3 hover:bg-meddoc-light rounded-lg"
                    >
                      <div className="text-lg font-semibold">
                        Services de Conseil
                      </div>
                      <p className="text-sm text-gray-500">
                        Expertise et accompagnement
                      </p>
                    </Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/pharmacies" className="px-4 py-2">
                  Pharmacies
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/apropos" className="px-4 py-2">
                  A propos
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
