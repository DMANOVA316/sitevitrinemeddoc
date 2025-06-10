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
    <footer className="bg-meddoc-fonce text-white py-6">
      <div className="container mx-auto px-4 mt-2">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link to={"/app-meddoc"}>
              <h3 className="text-xl font-bold mb-4">APP MEDDoC</h3>
            </Link>
            <div className="space-y-2 mb-4">
              <p className="text-gray-400">
                Vous voulez rejoindre la santé de demain ?
              </p>
              <p className="text-gray-400">
                Rejoignez notre communauté d'utilisateurs et de professionnels de santé.
              </p>
            </div>

            <div className="mt-6">
              <Link to={"/app-meddoc"}>
                <Button
                  size="lg"
                  className="bg-meddoc-primary hover:bg-meddoc-secondary"
                >
                  Inscrivez-vous maintenant
                </Button>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Nos Services</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/services/solutions-digitales-sante"
                  className="text-gray-400 hover:text-white"
                >
                  Solutions digitales santé
                </Link>
              </li>
              <li>
                <Link
                  to="/services/community-management-medical"
                  className="text-gray-400 hover:text-white"
                >
                  Community management médical
                </Link>
              </li>
              <li>
                <Link
                  to="/services/formations-sante"
                  className="text-gray-400 hover:text-white"
                >
                  Formations santé
                </Link>
              </li>
              <li>
                <Link
                  to="/services/consulting-sante-strategie"
                  className="text-gray-400 hover:text-white"
                >
                  Consulting santé et stratégie
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Contacts</h3>
            <div className="text-gray-400 space-y-2">
              <p>Email: {infoMeddoc?.email}</p>
              <p>
                Tél: {!isLoadingNumbers &&
                  (numeros.length > 0 ? (
                    numeros.map((num, index) => (
                      <span key={num.id}>
                        {num.numero && num.numero.startsWith('0')
                          ? `+(261)${num.numero.substring(1)}`
                          : num.numero.startsWith('+(261)')
                            ? num.numero
                            : `+(261)${num.numero}`}
                        {index < numeros.length - 1 ? " | " : ""}
                      </span>
                    ))
                  ) : (
                    <span>Aucun numéro disponible pour le moment</span>
                  ))}
              </p>
              <p>{infoMeddoc?.addresse}</p>

              <div className="mt-6">
                <Link to="/login">
                  <Button
                    size="lg"
                    className="bg-meddoc-primary hover:bg-meddoc-secondary"
                  >
                    Se Connecter
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-4 text-center">
          <p className="text-gray-400">
            © {date} {infoMeddoc?.copyrigth}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
