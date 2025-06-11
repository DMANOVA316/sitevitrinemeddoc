import { ArrowRight, Code, Database, Globe, MapPin, Shield, Smartphone, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import digitaleImage from "../../assets/serivces-images/digitale.jpg";
import useScrollToTop from "../../hooks/useScrollToTop";
import { scrollToElement } from "@/utils/scrollUtils";
import { motion } from "framer-motion";

const Digital = () => {
  // Défilement automatique vers le haut lors du chargement de la page
  useScrollToTop();

  return (
    <div className="min-h-screen">
      {/* Hero Section avec image de fond et dégradé */}
      <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden bg-gradient-to-br from-meddoc-fonce to-meddoc-fonce">
        {/* Background Image with Animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${digitaleImage})`,
          }}
        ></motion.div>

        {/* Decorative Elements with Animation */}
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:30px_30px] sm:bg-[size:40px_40px]"></div>
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: "2rem" }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="absolute -bottom-6 left-0 right-0 h-8 sm:h-10 md:h-12 bg-white transform -skew-y-1"
        ></motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: -50 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute top-0 left-0 w-64 h-64 md:w-96 md:h-96 bg-meddoc-primary/10 rounded-full blur-3xl -ml-32 -mt-32"
        ></motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: 50 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
          className="absolute bottom-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-meddoc-secondary/10 rounded-full blur-3xl -mr-32 -mb-32"
        ></motion.div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-xl sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight tracking-tight"
            >
              SOLUTIONS DIGITALES SANTÉ<span className="text-meddoc-secondary">.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              className="text-xl sm:text-2xl font-semibold text-white mb-4 sm:mb-6"
            >
              Des outils numériques au service de la santé à Madagascar
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
              className="text-base sm:text-lg text-white/90 mb-6 sm:mb-8 max-w-3xl mx-auto"
            >
              Chez MEDDoC, nous croyons que la technologie peut révolutionner l'accès aux soins. Nos solutions digitales sont conçues pour simplifier le quotidien des professionnels de santé et améliorer la qualité des services offerts à la population.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
            >
              <motion.button
                onClick={() => scrollToElement('services', 80, 100)}
                className="block w-full sm:w-auto sm:inline-block"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="w-full sm:w-auto bg-gradient-to-r from-meddoc-primary to-meddoc-secondary hover:from-meddoc-primary/90 hover:to-meddoc-secondary/90 text-white px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-6 text-sm sm:text-base md:text-lg font-semibold transition-all duration-300">
                  Découvrir nos solutions
                  <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5 animate-bounce-right" />
                </Button>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-8 sm:py-10 md:py-12 bg-white" id="services">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto">
            <div className="text-center mb-8 sm:mb-10 md:mb-12" id="services">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-meddoc-fonce mb-3 sm:mb-4">
                Nos services <span className="text-sky-500">digitaux</span>
              </h2>
              <p className="text-base sm:text-lg text-slate-600 max-w-xl sm:max-w-2xl mx-auto">
                Des solutions technologiques adaptées aux besoins spécifiques du secteur de la santé à Madagascar
              </p>
            </div>

            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
              {/* Service 1 */}
              <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group">
                <div className="h-2 sm:h-3 bg-gradient-to-r from-meddoc-primary to-meddoc-secondary"></div>
                <div className="p-4 sm:p-5 md:p-6">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="bg-sky-100 p-2 sm:p-3 rounded-lg group-hover:bg-sky-200 transition-colors flex-shrink-0">
                      <Smartphone className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-sky-600" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-meddoc-fonce mb-1 sm:mb-2">Applications mobiles santé</h3>
                      <p className="text-sm sm:text-base text-slate-600">Pour le suivi patient, l'éducation sanitaire ou la collecte de données sur le terrain.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Service 2 */}
              <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group">
                <div className="h-2 sm:h-3 bg-gradient-to-r from-meddoc-primary to-meddoc-secondary"></div>
                <div className="p-4 sm:p-5 md:p-6">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="bg-sky-100 p-2 sm:p-3 rounded-lg group-hover:bg-sky-200 transition-colors flex-shrink-0">
                      <Globe className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-sky-600" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-meddoc-fonce mb-1 sm:mb-2">Sites vitrines professionnels</h3>
                      <p className="text-sm sm:text-base text-slate-600">Présentez votre établissement et vos services avec un site web moderne et responsive.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Service 3 */}
              <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group">
                <div className="h-2 sm:h-3 bg-gradient-to-r from-meddoc-primary to-meddoc-secondary"></div>
                <div className="p-4 sm:p-5 md:p-6">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="bg-sky-100 p-2 sm:p-3 rounded-lg group-hover:bg-sky-200 transition-colors flex-shrink-0">
                      <Database className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-sky-600" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-meddoc-fonce mb-1 sm:mb-2">Plateformes web médicales</h3>
                      <p className="text-sm sm:text-base text-slate-600">Pour la gestion des rendez-vous, dossiers patients, ou le pilotage d'activités.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Service 4 */}
              <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group">
                <div className="h-2 sm:h-3 bg-gradient-to-r from-meddoc-primary to-meddoc-secondary"></div>
                <div className="p-4 sm:p-5 md:p-6">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="bg-sky-100 p-2 sm:p-3 rounded-lg group-hover:bg-sky-200 transition-colors flex-shrink-0">
                      <Code className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-sky-600" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-meddoc-fonce mb-1 sm:mb-2">Logiciels sur mesure</h3>
                      <p className="text-sm sm:text-base text-slate-600">Adaptés à vos besoins spécifiques (gestion de cabinet, stock de médicaments, RH…).</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Avantages Section */}
      <section className="py-10 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold mb-6 inline-block relative">
                <span className="text-meddoc-fonce">POURQUOI CHOISIR NOS SOLUTIONS</span>
                <div className="absolute w-32 h-1 bg-gradient-to-r from-meddoc-primary to-meddoc-secondary bottom-0 left-1/2 transform -translate-x-1/2 -mb-2 rounded-full"></div>
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto mt-4">
                Des outils conçus par des Malgaches pour des Malgaches, avec une attention particulière à vos besoins spécifiques.
              </p>
            </div>

            <div className="overflow-hidden rounded-xl shadow-lg">
              {/* Premier bloc - Adaptées au terrain malgache */}
              <div className="flex flex-col md:flex-row bg-meddoc-fonce text-white">
                <div className="md:w-1/3 p-6 sm:p-8 md:p-10 flex flex-col justify-center">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 md:mb-4 text-center md:text-left">ADAPTÉES AU TERRAIN</h3>
                </div>
                <div className="md:w-2/3 p-6 sm:p-8 md:p-10 flex items-center">
                  <div className="w-full">
                    <ul className="space-y-2 md:space-y-4">
                      <li className="flex items-start">
                        <div className="flex-shrink-0 mr-2 md:mr-3 mt-1">
                          <MapPin className="h-4 w-4 md:h-5 md:w-5 text-sky-400" />
                        </div>
                        <p className="text-white/90 text-sm sm:text-base">
                          Nos solutions sont conçues spécifiquement pour répondre aux défis uniques du secteur de la santé à Madagascar.
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Deuxième bloc - Sécurisées et intuitives */}
              <div className="flex flex-col md:flex-row bg-sky-500 text-white">
                <div className="md:w-1/3 p-6 sm:p-8 md:p-10 flex flex-col justify-center">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 md:mb-4 text-center md:text-left">SÉCURISÉES ET INTUITIVES</h3>
                </div>
                <div className="md:w-2/3 p-6 sm:p-8 md:p-10 flex items-center">
                  <div className="w-full">
                    <ul className="space-y-2 md:space-y-4">
                      <li className="flex items-start">
                        <div className="flex-shrink-0 mr-2 md:mr-3 mt-1">
                          <Shield className="h-4 w-4 md:h-5 md:w-5 text-white" />
                        </div>
                        <p className="text-white/90 text-sm sm:text-base">
                          Protection des données garantie et interfaces simples qui ne nécessitent pas de compétences techniques avancées.
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Troisième bloc - Équipe locale réactive */}
              <div className="flex flex-col md:flex-row bg-blue-100 text-meddoc-fonce">
                <div className="md:w-1/3 p-6 sm:p-8 md:p-10 flex flex-col justify-center">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 md:mb-4 text-center md:text-left">ÉQUIPE LOCALE RÉACTIVE</h3>
                </div>
                <div className="md:w-2/3 p-6 sm:p-8 md:p-10 flex items-center">
                  <div className="w-full">
                    <ul className="space-y-2 md:space-y-4">
                      <li className="flex items-start">
                        <div className="flex-shrink-0 mr-2 md:mr-3 mt-1">
                          <Users className="h-4 w-4 md:h-5 md:w-5 text-meddoc-primary" />
                        </div>
                        <p className="text-meddoc-fonce/90 text-sm sm:text-base">
                          Développées à Madagascar par une équipe disponible pour vous accompagner et répondre rapidement à vos besoins.
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Quatrième bloc - Multi-plateformes */}
              <div className="flex flex-col md:flex-row bg-slate-50 text-meddoc-fonce">
                <div className="md:w-1/3 p-6 sm:p-8 md:p-10 flex flex-col justify-center">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 md:mb-4 text-center md:text-left">MULTI-PLATEFORMES</h3>
                </div>
                <div className="md:w-2/3 p-6 sm:p-8 md:p-10 flex items-center">
                  <div className="w-full">
                    <ul className="space-y-2 md:space-y-4">
                      <li className="flex items-start">
                        <div className="flex-shrink-0 mr-2 md:mr-3 mt-1">
                          <Smartphone className="h-4 w-4 md:h-5 md:w-5 text-meddoc-primary" />
                        </div>
                        <p className="text-meddoc-fonce/90 text-sm sm:text-base">
                          Accessibles sur tous vos appareils, que ce soit sur ordinateur, tablette ou smartphone, pour une flexibilité maximale.
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-10 sm:py-14 md:py-16 lg:py-20 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto bg-gradient-to-br from-meddoc-primary to-meddoc-secondary rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl overflow-hidden">
            <div className="relative p-6 sm:p-8 md:p-10 lg:p-12">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 -mt-8 -mr-8 sm:-mt-12 sm:-mr-12 w-32 h-32 sm:w-40 sm:h-40 bg-white/10 rounded-full blur-2xl sm:blur-3xl"></div>
              <div className="absolute bottom-0 left-0 -mb-8 -ml-8 sm:-mb-12 sm:-ml-12 w-32 h-32 sm:w-40 sm:h-40 bg-white/10 rounded-full blur-2xl sm:blur-3xl"></div>

              <div className="relative z-10 text-white text-center">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">Prêt à digitaliser vos services ?</h2>
                <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8 max-w-2xl mx-auto">
                  Un projet en tête ? Parlons-en et trouvons ensemble la solution digitale qui vous correspond.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                  <Button className="w-full sm:w-auto bg-white text-meddoc-primary hover:bg-white/90 px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-6 text-sm sm:text-base md:text-lg font-semibold">
                    Demander une démo
                    <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                  </Button>
                  <Button className="w-full sm:w-auto bg-transparent border-2 border-white text-white hover:bg-white/10 px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-6 text-sm sm:text-base md:text-lg font-semibold">
                    En savoir plus
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Digital;
