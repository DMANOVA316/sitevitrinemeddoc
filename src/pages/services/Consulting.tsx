import { ArrowRight, BarChart4, Building, CheckCircle2, HandshakeIcon, HeartPulse, MessageCircle, PieChart, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import useScrollToTop from "../../hooks/useScrollToTop";
import { Link } from "react-router-dom";

const Consulting = () => {
  // Défilement automatique vers le haut lors du chargement de la page
  useScrollToTop();

  return (
    <div className="min-h-screen">
      {/* Hero Section avec effet parallaxe */}
      <section className="relative py-28 overflow-hidden bg-gradient-to-br from-meddoc-primary/90 to-meddoc-secondary/90 bg-fixed bg-cover"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
          backgroundBlendMode: "overlay"
        }}>
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:40px_40px]"></div>
        <div className="absolute -bottom-6 left-0 right-0 h-12 bg-white transform -skew-y-1"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center animate-fade-up">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
              CONSULTING SANTÉ<span className="text-meddoc-secondary">.</span>
            </h1>
            <p className="text-2xl font-semibold text-white mb-6">
              Un accompagnement sur mesure pour vos projets de santé
            </p>
            <p className="text-lg text-white mb-8">
              Vous développez une initiative, gérez une structure médicale ou lancez un nouveau service ? MEDDoC vous accompagne de manière stratégique et opérationnelle pour maximiser votre impact.
            </p>
            <Button className="bg-gradient-to-r from-meddoc-primary to-meddoc-secondary hover:from-meddoc-primary/90 hover:to-meddoc-secondary/90 text-white px-8 py-6 font-semibold">
              Découvrir nos services
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Section Prestations avec design moderne */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-meddoc-fonce to-meddoc-fonce">NOS PRESTATIONS</span>
            </h2>
            <p className="text-lg text-center text-gray-600 mb-16 max-w-3xl mx-auto">
              Des services de conseil adaptés aux besoins spécifiques du secteur de la santé à Madagascar
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Prestation 1 */}
              <div className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-meddoc-primary to-meddoc-secondary transform origin-left transition-all duration-300 group-hover:h-2"></div>
                <div className="p-6">
                  <div className="w-14 h-14 rounded-lg bg-meddoc-primary/10 flex items-center justify-center mb-5 group-hover:bg-meddoc-primary/20 transition-all duration-300">
                    <Building className="h-7 w-7 text-meddoc-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Diagnostic organisationnel</h3>
                  <p className="text-gray-600">
                    Évaluation complète de votre structure et identification des axes d'amélioration pour optimiser votre fonctionnement.
                  </p>
                </div>
              </div>

              {/* Prestation 2 */}
              <div className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-meddoc-primary to-meddoc-secondary transform origin-left transition-all duration-300 group-hover:h-2"></div>
                <div className="p-6">
                  <div className="w-14 h-14 rounded-lg bg-meddoc-primary/10 flex items-center justify-center mb-5 group-hover:bg-meddoc-primary/20 transition-all duration-300">
                    <PieChart className="h-7 w-7 text-meddoc-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Études de marché</h3>
                  <p className="text-gray-600">
                    Analyse approfondie pour l'implantation ou le développement d'établissements hospitaliers et structures de santé.
                  </p>
                </div>
              </div>

              {/* Prestation 3 */}
              <div className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-meddoc-primary to-meddoc-secondary transform origin-left transition-all duration-300 group-hover:h-2"></div>
                <div className="p-6">
                  <div className="w-14 h-14 rounded-lg bg-meddoc-primary/10 flex items-center justify-center mb-5 group-hover:bg-meddoc-primary/20 transition-all duration-300">
                    <Target className="h-7 w-7 text-meddoc-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Plans stratégiques</h3>
                  <p className="text-gray-600">
                    Élaboration de stratégies de développement et de communication adaptées à vos objectifs et votre contexte.
                  </p>
                </div>
              </div>

              {/* Prestation 4 */}
              <div className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-meddoc-primary to-meddoc-secondary transform origin-left transition-all duration-300 group-hover:h-2"></div>
                <div className="p-6">
                  <div className="w-14 h-14 rounded-lg bg-meddoc-primary/10 flex items-center justify-center mb-5 group-hover:bg-meddoc-primary/20 transition-all duration-300">
                    <HeartPulse className="h-7 w-7 text-meddoc-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Conception de projets santé</h3>
                  <p className="text-gray-600">
                    Développement de programmes, campagnes et outils adaptés aux besoins spécifiques de votre public cible.
                  </p>
                </div>
              </div>

              {/* Prestation 5 */}
              <div className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-meddoc-primary to-meddoc-secondary transform origin-left transition-all duration-300 group-hover:h-2"></div>
                <div className="p-6">
                  <div className="w-14 h-14 rounded-lg bg-meddoc-primary/10 flex items-center justify-center mb-5 group-hover:bg-meddoc-primary/20 transition-all duration-300">
                    <BarChart4 className="h-7 w-7 text-meddoc-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Suivi-évaluation</h3>
                  <p className="text-gray-600">
                    Mise en place d'indicateurs et de systèmes de suivi pour mesurer et améliorer les performances de vos services.
                  </p>
                </div>
              </div>

              {/* Prestation 6 */}
              <div className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-meddoc-primary to-meddoc-secondary transform origin-left transition-all duration-300 group-hover:h-2"></div>
                <div className="p-6">
                  <div className="w-14 h-14 rounded-lg bg-meddoc-primary/10 flex items-center justify-center mb-5 group-hover:bg-meddoc-primary/20 transition-all duration-300">
                    <HandshakeIcon className="h-7 w-7 text-meddoc-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Mobilisation de ressources</h3>
                  <p className="text-gray-600">
                    Identification et développement de partenariats stratégiques pour soutenir et pérenniser vos initiatives.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Pourquoi nous choisir avec design moderne */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold mb-6">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-meddoc-fonce to-meddoc-fonce">POURQUOI NOUS CHOISIR ?</span>
                </h2>
                <p className="text-gray-600 mb-8">
                  MEDDoC se distingue par son approche unique et sa connaissance approfondie du secteur de la santé à Madagascar. Notre équipe d'experts vous accompagne à chaque étape de votre projet.
                </p>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-meddoc-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-gray-800">Expertise locale et internationale</h3>
                      <p className="text-gray-600">Une équipe qui combine expérience locale et standards internationaux</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-meddoc-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-gray-800">Approche participative et terrain</h3>
                      <p className="text-gray-600">Nous travaillons en étroite collaboration avec vous et vos équipes</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-meddoc-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-gray-800">Accompagnement de A à Z, adapté à votre rythme</h3>
                      <p className="text-gray-600">Un suivi personnalisé qui respecte vos contraintes et vos objectifs</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:w-1/2 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-meddoc-primary to-meddoc-secondary rounded-2xl transform rotate-3 opacity-20"></div>
                <img
                  src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Équipe de consultants"
                  className="relative rounded-2xl shadow-xl w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section avec design moderne */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-meddoc-primary to-meddoc-secondary rounded-2xl shadow-xl overflow-hidden">
            <div className="relative p-8 md:p-12">
              <div className="absolute top-0 right-0 -mt-12 -mr-12 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>

              <div className="relative z-10 text-white">
                <h2 className="text-3xl font-bold mb-6">Discutons ensemble de votre projet</h2>
                <p className="text-xl text-white/90 mb-8">
                   MEDDoC est là pour faire grandir votre initiative et maximiser son impact sur la santé à Madagascar.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/contact">
                      <Button className="bg-white text-meddoc-primary hover:bg-white/90 px-8 py-6 text-lg font-semibold">
                      <MessageCircle className="mr-2 h-5 w-5" />
                      Nous contacter
                    </Button>
                  </Link>
               
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Consulting;