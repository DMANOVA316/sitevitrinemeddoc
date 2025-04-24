import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import useInfoMeddocRedux from "@/hooks/use-info-meddoc-redux";
import useNumberRedux from "@/hooks/use-number-redux";
import { useEffect } from "react";

const Footer = () => {
  const { infoMeddoc, isLoading: isLoadingInfos } = useInfoMeddocRedux();
  const { numeros, isLoading: isLoadingNumbers, getNumbers } = useNumberRedux();
  const date = new Date().getFullYear();

  useEffect(() => {
    getNumbers();
  }, []);

  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
           <a href="https://app-meddoc.vercel.app/"> <h3 className="text-xl font-bold mb-4"> APP MEDDoC</h3></a>
            <p className="text-gray-400">
              Vous voulez rejoindre la santé de demain ?
            </p>
            <p className="text-gray-400 mt-2 mb-6">Rejoignez notre communauté d’utilisateurs et de professionnels de santé.</p>

            <a href="https://app-meddoc.vercel.app">
              <Button
                size="lg"
                className="bg-meddoc-primary hover:bg-meddoc-secondary mr-2"
              >
                Inscrivez-vous maintenant
              </Button>
            </a>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Nos Services</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/services/digital"
                  className="text-gray-400 hover:text-white"
                >
                  Solutions digitales 
                </Link>
              </li>
              <li>
                <Link
                  to="/services/community"
                  className="text-gray-400 hover:text-white"
                >
                  Community management médical
                </Link>
              </li>
              <li>
                <Link
                  to="/services/formations"
                  className="text-gray-400 hover:text-white"
                >
                  Formations santé
                </Link>
              </li>
              <li>
                <Link
                  to="/services/consulting"
                  className="text-gray-400 hover:text-white"
                >
                  Consulting santé et stratégie
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
                          {index < numeros.length - 1 ? " / " : ""}
                        </span>
                      );
                    })
                  ) : (
                    <span>Aucun numero disponible pour le moment</span>
                  ))}
              </p>
              {infoMeddoc?.addresse}
            
            <Link to="/login">
              <Button
                size="lg"
                className="bg-meddoc-primary hover:bg-meddoc-secondary mt-8"
              >
                Se Connecter
              </Button>
            </Link>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © {date} {infoMeddoc?.copyrigth}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
