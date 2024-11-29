import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">MEDDoC</h3>
            <p className="text-gray-400">
              La première entreprise 360° santé à Madagascar.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Nos Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services/digital" className="text-gray-400 hover:text-white">
                  Solutions Numériques
                </Link>
              </li>
              <li>
                <Link to="/services/community" className="text-gray-400 hover:text-white">
                  Community Management
                </Link>
              </li>
              <li>
                <Link to="/services/consulting" className="text-gray-400 hover:text-white">
                  Services de Conseil
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <p className="text-gray-400">
              Email: contact@meddoc.mg<br />
              Tél: +261 34 00 000 00<br />
              Antananarivo, Madagascar
            </p>
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