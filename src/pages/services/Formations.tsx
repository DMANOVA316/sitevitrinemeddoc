import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import formationsImage from "../../assets/serivces-images/formations.jpg";
import useScrollToTop from "../../hooks/useScrollToTop";
import { Link } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import { scrollToElement } from "@/utils/scrollUtils";
import { motion } from "framer-motion";
const Formations = () => {
  // Défilement automatique vers le haut lors du chargement de la page
  useScrollToTop();

  return (
    <div className="min-h-screen">
      {/* Hero Section avec image de fond et dégradé */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-br from-meddoc-fonce to-meddoc-fonce">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${formationsImage})`,
          }}
        ></motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 bg-grid-white/[0.05] bg-[size:40px_40px]"
        ></motion.div>
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: "3rem" }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="absolute -bottom-6 left-0 right-0 h-12 bg-white transform skew-y-1"
        ></motion.div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight tracking-tight"
            >
              FORMATIONS<span className="text-meddoc-secondary">.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              className="text-2xl font-semibold text-white mb-6"
            >
              Renforcez les compétences de vos équipes sur le terrain
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
              className="text-lg text-white mb-8"
            >
              Les formations MEDDoC sont conçues pour répondre aux besoins réels des professionnels et structures du secteur santé. Courtes, pratiques et adaptées, elles permettent d'améliorer immédiatement la qualité des services rendus.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
            >
              <motion.button
                onClick={() => scrollToElement('domaines', 80, 100)}
                className="inline-block"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="bg-gradient-to-r from-meddoc-primary to-meddoc-secondary hover:from-meddoc-primary/90 hover:to-meddoc-secondary/90 text-white px-6 py-4 text-lg font-semibold transition-all duration-300">
                  Découvrir nos domaines de formation
                  <ArrowRight className="ml-2 h-5 w-5 animate-bounce-right" />
                </Button>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Domaines de formation avec design moderne */}
      <section className="py-10 bg-white transition-all duration-700" id="domaines">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-16 relative">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-meddoc-fonce to-meddoc-fonce">NOS DOMAINES DE FORMATIONS</span>
              <div className="absolute w-32 h-1 bg-gradient-to-r from-meddoc-primary to-meddoc-secondary bottom-0 left-1/2 transform -translate-x-1/2 -mb-2 rounded-full"></div>
            </h2>


            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-5 border-l-4 border-meddoc-primary">
                <h3 className="font-bold text-lg text-gray-800 mb-2">Marketing digital santé</h3>
                <p className="text-gray-600">Stratégies de communication adaptées au secteur médical</p>
              </div>

              <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-5 border-l-4 border-meddoc-primary">
                <h3 className="font-bold text-lg text-gray-800 mb-2">Management hospitalier</h3>
                <p className="text-gray-600">Gestion efficace des établissements de santé</p>
              </div>

              <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-5 border-l-4 border-meddoc-primary">
                <h3 className="font-bold text-lg text-gray-800 mb-2">Techniques d'accueil</h3>
                <p className="text-gray-600">Amélioration de l'expérience patient</p>
              </div>

              <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-5 border-l-4 border-meddoc-primary">
                <h3 className="font-bold text-lg text-gray-800 mb-2">Finance</h3>
                <p className="text-gray-600">Gestion financière adaptée aux structures médicales</p>
              </div>

              <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-5 border-l-4 border-meddoc-primary">
                <h3 className="font-bold text-lg text-gray-800 mb-2">Santé communautaire</h3>
                <p className="text-gray-600">Hygiène, nutrition et interventions locales</p>
              </div>

              <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-5 border-l-4 border-meddoc-primary">
                <h3 className="font-bold text-lg text-gray-800 mb-2">Outils numériques</h3>
                <p className="text-gray-600">Excel, Power BI, KoboCollect, SPSS, STATA, etc.</p>
              </div>

              <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-5 border-l-4 border-meddoc-primary">
                <h3 className="font-bold text-lg text-gray-800 mb-2">Suivi et évaluation</h3>
                <p className="text-gray-600">Méthodologies de suivi et évaluation de projets</p>
              </div>

              <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-5 border-l-4 border-meddoc-primary">
                <h3 className="font-bold text-lg text-gray-800 mb-2">Leadership</h3>
                <p className="text-gray-600">Management d'équipe et développement du leadership</p>
              </div>

              <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-5 border-l-4 border-meddoc-secondary">
                <h3 className="font-bold text-lg text-gray-800 mb-2">Et plus encore...</h3>
                <p className="text-gray-600">Formations sur mesure selon vos besoins spécifiques</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nos atouts avec design amélioré */}
      <section className="py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-16 relative">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-meddoc-fonce to-meddoc-fonce">NOS ATOUTS</span>
              <div className="absolute w-32 h-1 bg-gradient-to-r from-meddoc-primary to-meddoc-secondary bottom-0 left-1/2 transform -translate-x-1/2 -mb-2 rounded-full"></div>
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 text-center transform hover:-translate-y-1">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-meddoc-primary to-meddoc-secondary mb-4 text-white text-2xl">
                  🎓
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Formateurs expérimentés</h3>
                <p className="text-gray-600">Des experts du secteur avec une solide expérience terrain</p>
              </div>

              <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 text-center transform hover:-translate-y-1">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-meddoc-primary to-meddoc-secondary mb-4 text-white text-2xl">
                  📍
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Flexibilité de format</h3>
                <p className="text-gray-600">Formations disponibles en présentiel ou en ligne</p>
              </div>

              <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 text-center transform hover:-translate-y-1">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-meddoc-primary to-meddoc-secondary mb-4 text-white text-2xl">
                  📅️
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Modules adaptables</h3>
                <p className="text-gray-600">Sessions de 1 à 5 jours selon vos besoins spécifiques</p>
              </div>

              <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 text-center transform hover:-translate-y-1">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-meddoc-primary to-meddoc-secondary mb-4 text-white text-2xl">
                  📄
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Certification</h3>
                <p className="text-gray-600">Attestation de participation pour tous les participants</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section améliorée */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:40px_40px]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Prêt à renforcer les compétences de votre équipe ?</h2>
              <p className="text-xl text-gray-600 mb-8">
                📥 Demandez notre catalogue de formations ou planifiez une session personnalisée adaptée à vos besoins spécifiques.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-gradient-to-r from-meddoc-primary to-meddoc-secondary hover:from-meddoc-primary/90 hover:to-meddoc-secondary/90 text-white px-8 py-6 text-lg">
                  Demander un catalogue
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Link to="/contact">
                      <Button className="bg-gradient-to-r from-meddoc-primary to-meddoc-secondary hover:from-meddoc-primary/90 hover:to-meddoc-secondary/90 text-white px-8 py-6 text-lg">
                      <MessageCircle className="mr-2 h-5 w-5" />
                      Nous contacter
                    </Button>
                  </Link>



              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Formations;