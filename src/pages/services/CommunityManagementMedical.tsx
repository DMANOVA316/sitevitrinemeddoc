import { ArrowRight, BarChart4, Building2, CheckCircle2, FileText, MessageCircle, PenTool, Share2, Target, TrendingUp, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import communityImage from "../../assets/serivces-images/community.jpg";
import useScrollToTop from "../../hooks/useScrollToTop";
import communityImage2 from "../../assets/serivces-images/community-2.jpg";
import { scrollToElement } from "@/utils/scrollUtils";
import { motion } from "framer-motion";
const Community = () => {
  // Défilement automatique vers le haut lors du chargement de la page
  useScrollToTop();

  return (
    <div className="min-h-screen">
      {/* Hero Section avec effet parallaxe */}
      <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden bg-gradient-to-br from-meddoc-fonce to-meddoc-fonce">
        {/* Background Image with Animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${communityImage})`,
          }}
        ></motion.div>

        {/* Decorative Elements with Animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 bg-grid-white/[0.05] bg-[size:30px_30px] sm:bg-[size:40px_40px]"
        ></motion.div>
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
              COMMUNITY MANAGEMENT MÉDICAL <span className="text-meddoc-secondary">.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              className="text-xl sm:text-2xl font-semibold text-white mb-4 sm:mb-6"
            >
              Boostez votre visibilité, affirmez votre présence en ligne
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
              className="text-base sm:text-lg text-white/90 mb-6 sm:mb-8 max-w-3xl mx-auto"
            >
              Aujourd'hui, la présence digitale est un atout incontournable pour les structures de santé. MEDDoC accompagne les professionnels du secteur dans la gestion stratégique et créative de leurs réseaux sociaux.
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
                  Découvrir nos services
                  <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5 animate-bounce-right" />
                </Button>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section Pour qui */}
      <section className="py-8 sm:py-10 md:py-12 bg-white" id="services">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl sm:max-w-2xl md:max-w-3xl lg:max-w-5xl mx-auto">
            <div className="text-center mb-8 sm:mb-10 md:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-3 sm:mb-4">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-meddoc-fonce to-meddoc-fonce">Pour qui ?</span>
              </h2>
              <p className="text-base sm:text-lg text-center text-gray-600 mb-8 sm:mb-12 md:mb-16 max-w-xl sm:max-w-2xl md:max-w-3xl mx-auto">
                Nos services de community management sont spécialement conçus pour les acteurs du secteur de la santé à Madagascar
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {/* Client 1 */}
              <div className="group relative bg-white rounded-lg sm:rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-meddoc-primary to-meddoc-secondary transform origin-left transition-all duration-300 group-hover:h-2"></div>
                <div className="p-4 sm:p-5 md:p-6">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-meddoc-primary/10 flex items-center justify-center mb-3 sm:mb-4 md:mb-5 group-hover:bg-meddoc-primary/20 transition-all duration-300">
                    <Building2 className="h-6 w-6 sm:h-7 sm:w-7 text-meddoc-primary" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-3">Cliniques & Cabinets</h3>
                  <p className="text-sm sm:text-base text-gray-600">
                    Valorisez votre expertise et vos services auprès de vos patients actuels et potentiels.
                  </p>
                </div>
              </div>

              {/* Client 2 */}
              <div className="group relative bg-white rounded-lg sm:rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-meddoc-primary to-meddoc-secondary transform origin-left transition-all duration-300 group-hover:h-2"></div>
                <div className="p-4 sm:p-5 md:p-6">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-meddoc-primary/10 flex items-center justify-center mb-3 sm:mb-4 md:mb-5 group-hover:bg-meddoc-primary/20 transition-all duration-300">
                    <FileText className="h-6 w-6 sm:h-7 sm:w-7 text-meddoc-primary" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-3">Pharmacies & Laboratoires</h3>
                  <p className="text-sm sm:text-base text-gray-600">
                    Communiquez sur vos produits, services et horaires pour améliorer votre visibilité locale.
                  </p>
                </div>
              </div>

              {/* Client 3 */}
              <div className="group relative bg-white rounded-lg sm:rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-meddoc-primary to-meddoc-secondary transform origin-left transition-all duration-300 group-hover:h-2"></div>
                <div className="p-4 sm:p-5 md:p-6">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-meddoc-primary/10 flex items-center justify-center mb-3 sm:mb-4 md:mb-5 group-hover:bg-meddoc-primary/20 transition-all duration-300">
                    <Users className="h-6 w-6 sm:h-7 sm:w-7 text-meddoc-primary" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-3">ONG & Associations</h3>
                  <p className="text-sm sm:text-base text-gray-600">
                    Amplifiez l'impact de vos actions et mobilisez votre communauté autour de vos causes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Services avec design moderne */}
      <section className="py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-meddoc-fonce to-meddoc-fonce">CE QUE NOUS PROPOSONS</span>
            </h2>
            <p className="text-lg text-center text-gray-600 mb-16 max-w-3xl mx-auto">
              Une approche complète pour développer et gérer votre présence en ligne de manière professionnelle
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Service 1 */}
              <div className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-meddoc-primary to-meddoc-secondary transform origin-left transition-all duration-300 group-hover:h-2"></div>
                <div className="p-6">
                  <div className="w-14 h-14 rounded-lg bg-meddoc-primary/10 flex items-center justify-center mb-5 group-hover:bg-meddoc-primary/20 transition-all duration-300">
                    <Target className="h-7 w-7 text-meddoc-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Audit digital</h3>
                  <p className="text-gray-600">
                    Analyse complète de votre présence en ligne actuelle, de votre audience et de vos concurrents pour identifier les opportunités.
                  </p>
                </div>
              </div>

              {/* Service 2 */}
              <div className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-meddoc-primary to-meddoc-secondary transform origin-left transition-all duration-300 group-hover:h-2"></div>
                <div className="p-6">
                  <div className="w-14 h-14 rounded-lg bg-meddoc-primary/10 flex items-center justify-center mb-5 group-hover:bg-meddoc-primary/20 transition-all duration-300">
                    <BarChart4 className="h-7 w-7 text-meddoc-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Stratégie de communication</h3>
                  <p className="text-gray-600">
                    Élaboration d'un plan d'action personnalisé pour votre communication santé sur les réseaux sociaux.
                  </p>
                </div>
              </div>

              {/* Service 3 */}
              <div className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-meddoc-primary to-meddoc-secondary transform origin-left transition-all duration-300 group-hover:h-2"></div>
                <div className="p-6">
                  <div className="w-14 h-14 rounded-lg bg-meddoc-primary/10 flex items-center justify-center mb-5 group-hover:bg-meddoc-primary/20 transition-all duration-300">
                    <PenTool className="h-7 w-7 text-meddoc-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Création de contenus</h3>
                  <p className="text-gray-600">
                    Conception et production de visuels, vidéos et textes adaptés à votre identité et à votre audience cible.
                  </p>
                </div>
              </div>

              {/* Service 4 */}
              <div className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-meddoc-primary to-meddoc-secondary transform origin-left transition-all duration-300 group-hover:h-2"></div>
                <div className="p-6">
                  <div className="w-14 h-14 rounded-lg bg-meddoc-primary/10 flex items-center justify-center mb-5 group-hover:bg-meddoc-primary/20 transition-all duration-300">
                    <MessageCircle className="h-7 w-7 text-meddoc-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Gestion des réseaux sociaux</h3>
                  <p className="text-gray-600">
                    Animation quotidienne de vos comptes Facebook, Instagram, LinkedIn et TikTok avec un calendrier éditorial cohérent.
                  </p>
                </div>
              </div>

              {/* Service 5 */}
              <div className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-meddoc-primary to-meddoc-secondary transform origin-left transition-all duration-300 group-hover:h-2"></div>
                <div className="p-6">
                  <div className="w-14 h-14 rounded-lg bg-meddoc-primary/10 flex items-center justify-center mb-5 group-hover:bg-meddoc-primary/20 transition-all duration-300">
                    <Share2 className="h-7 w-7 text-meddoc-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Campagnes sponsorisées</h3>
                  <p className="text-gray-600">
                    Mise en place et optimisation de campagnes publicitaires ciblées pour élargir votre audience et générer des leads.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Résultats attendus */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold mb-6">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-meddoc-fonce to-meddoc-fonce">RESULTATS ATTENDUS</span>
                </h2>
                <p className="text-gray-600 mb-8">
                  Notre approche stratégique et créative vous permet d'obtenir des résultats concrets et mesurables pour votre structure de santé.
                </p>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-meddoc-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-gray-800">Plus de visibilité</h3>
                      <p className="text-gray-600">Augmentez votre notoriété et atteignez une audience plus large</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-meddoc-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-gray-800">Plus de confiance et d'interactions</h3>
                      <p className="text-gray-600">Développez une relation de confiance avec votre communauté</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-meddoc-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-gray-800">Plus de prises de rendez-vous ou de demandes</h3>
                      <p className="text-gray-600">Transformez votre audience en clients avec plus de conversions</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:w-1/2 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-meddoc-primary to-meddoc-secondary rounded-2xl transform rotate-3 opacity-20"></div>
                <img
                  src= {communityImage}
                  alt="Community Management Médical"
                  className="relative rounded-2xl shadow-xl w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section avec design moderne */}
      <section className="py-10 sm:py-14 md:py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto bg-gradient-to-br from-meddoc-primary to-meddoc-secondary rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl overflow-hidden">
            <div className="relative p-6 sm:p-8 md:p-10 lg:p-12">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 -mt-8 -mr-8 sm:-mt-12 sm:-mr-12 w-32 h-32 sm:w-40 sm:h-40 bg-white/10 rounded-full blur-2xl sm:blur-3xl"></div>
              <div className="absolute bottom-0 left-0 -mb-8 -ml-8 sm:-mb-12 sm:-ml-12 w-32 h-32 sm:w-40 sm:h-40 bg-white/10 rounded-full blur-2xl sm:blur-3xl"></div>

              <div className="relative z-10 text-white text-center sm:text-left">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">Prêt à transformer votre présence en ligne ?</h2>
                <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8 max-w-2xl">
                  Contactez-nous pour mettre en place une communication professionnelle et efficace adaptée à votre structure de santé.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center sm:justify-start">
                  <Button className="w-full sm:w-auto bg-white text-meddoc-primary hover:bg-white/90 px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-6 text-sm sm:text-base md:text-lg font-semibold">
                    Demander un audit gratuit
                    <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                  </Button>
                  <Button className="w-full sm:w-auto bg-transparent border-2 border-white text-white hover:bg-white/10 px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-6 text-sm sm:text-base md:text-lg font-semibold">
                    <MessageCircle className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                    Nous contacter
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

export default Community;
