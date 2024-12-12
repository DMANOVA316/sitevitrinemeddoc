import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import useInfoMeddocRedux from "@/hooks/use-info-meddoc-redux";
import useNumberRedux from "@/hooks/use-number-redux";
import { Skeleton } from "./ui/skeleton";
import { info } from "console";

const Footer = () => {
  const { infoMeddoc, isLoading: isLoadingInfos } = useInfoMeddocRedux();
  const { numeros, isLoading: isLoadingNumbers } = useNumberRedux();
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">MEDDoC</h3>
            <p className="text-gray-400">
              La première entreprise 360° santé à Madagascar.
            </p>

            <br />
            <Link to="/login">
              <Button
                size="lg"
                className="bg-meddoc-primary hover:bg-meddoc-secondary"
              >
                Se Connecter
              </Button>
            </Link>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Nos Services</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/services/digital"
                  className="text-gray-400 hover:text-white"
                >
                  Solutions Numériques
                </Link>
              </li>
              <li>
                <Link
                  to="/services/community"
                  className="text-gray-400 hover:text-white"
                >
                  Community Management
                </Link>
              </li>
              <li>
                <Link
                  to="/services/consulting"
                  className="text-gray-400 hover:text-white"
                >
                  Services de Conseil
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <div className="text-gray-400">
              Email: {infoMeddoc?.email}
              <p>
                Tél:
                {!isLoadingNumbers &&
                  (numeros.length > 0 ? (
                    numeros.map((num, index) => {
                      return (
                        <span key={num.id}>
                          {num.numero}
                          {numeros.length - 1 >= index ? " / " : ""}
                        </span>
                      );
                    })
                  ) : (
                    <span>Aucun numero disponible pour le moment</span>
                  ))}
              </p>
              {infoMeddoc?.addresse}
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">© 2024 MEDDoC. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
