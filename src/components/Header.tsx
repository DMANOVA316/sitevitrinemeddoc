import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-meddoc-primary">
            MEDDoC
          </Link>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Nos Services</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-6 w-[400px]">
                    <Link to="/services/digital" className="block p-3 hover:bg-meddoc-light rounded-lg">
                      <div className="text-lg font-semibold">Solutions Numériques</div>
                      <p className="text-sm text-gray-500">Développement d'outils innovants</p>
                    </Link>
                    <Link to="/services/community" className="block p-3 hover:bg-meddoc-light rounded-lg">
                      <div className="text-lg font-semibold">Community Management</div>
                      <p className="text-sm text-gray-500">Gestion de votre présence en ligne</p>
                    </Link>
                    <Link to="/services/consulting" className="block p-3 hover:bg-meddoc-light rounded-lg">
                      <div className="text-lg font-semibold">Services de Conseil</div>
                      <p className="text-sm text-gray-500">Expertise et accompagnement</p>
                    </Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/contact" className="px-4 py-2">Contact</Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;