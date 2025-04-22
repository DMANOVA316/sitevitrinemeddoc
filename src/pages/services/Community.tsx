import { ArrowRight, BarChart4, Building2, CheckCircle2, FileText, MessageCircle, PenTool, Share2, Target, TrendingUp, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const Community = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section avec effet parallaxe */}
      <section className="relative py-28 overflow-hidden bg-gradient-to-br from-meddoc-primary/90 to-meddoc-secondary/90 bg-fixed bg-cover"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
          backgroundBlendMode: "overlay"
        }}>
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:40px_40px]"></div>
        <div className="absolute -bottom-6 left-0 right-0 h-12 bg-white transform -skew-y-1"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center animate-fade-up">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
              Community Management<span className="text-yellow-300">.</span>
            </h1>
            <p className="text-2xl font-semibold text-white/90 mb-6">
              Boostez votre visibilité, affirmez votre présence en ligne
            </p>
            <p className="text-lg text-white/80 mb-8">
              Aujourd'hui, la présence digitale est un atout incontournable pour les structures de santé. MEDDoC accompagne les professionnels du secteur dans la gestion stratégique et créative de leurs réseaux sociaux.
            </p>
            <Button className="bg-white text-meddoc-primary hover:bg-white/90 px-8 py-6 text-lg font-semibold">
              Découvrir nos services
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Section Pour qui */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-meddoc-primary to-meddoc-secondary">Pour qui ?</span>
            </h2>
            <p className="text-lg text-center text-gray-600 mb-16 max-w-3xl mx-auto">
              Nos services de community management sont spécialement conçus pour les acteurs du secteur de la santé à Madagascar
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Client 1 */}
              <div className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-meddoc-primary to-meddoc-secondary transform origin-left transition-all duration-300 group-hover:h-2"></div>
                <div className="p-6">
                  <div className="w-14 h-14 rounded-lg bg-meddoc-primary/10 flex items-center justify-center mb-5 group-hover:bg-meddoc-primary/20 transition-all duration-300">
                    <Building2 className="h-7 w-7 text-meddoc-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Cliniques & Cabinets</h3>
                  <p className="text-gray-600">
                    Valorisez votre expertise et vos services auprès de vos patients actuels et potentiels.
                  </p>
                </div>
              </div>
              
              {/* Client 2 */}
              <div className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-meddoc-primary to-meddoc-secondary transform origin-left transition-all duration-300 group-hover:h-2"></div>
                <div className="p-6">
                  <div className="w-14 h-14 rounded-lg bg-meddoc-primary/10 flex items-center justify-center mb-5 group-hover:bg-meddoc-primary/20 transition-all duration-300">
                    <FileText className="h-7 w-7 text-meddoc-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Pharmacies & Laboratoires</h3>
                  <p className="text-gray-600">
                    Communiquez sur vos produits, services et horaires pour améliorer votre visibilité locale.
                  </p>
                </div>
              </div>
              
              {/* Client 3 */}
              <div className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-meddoc-primary to-meddoc-secondary transform origin-left transition-all duration-300 group-hover:h-2"></div>
                <div className="p-6">
                  <div className="w-14 h-14 rounded-lg bg-meddoc-primary/10 flex items-center justify-center mb-5 group-hover:bg-meddoc-primary/20 transition-all duration-300">
                    <Users className="h-7 w-7 text-meddoc-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">ONG & Associations</h3>
                  <p className="text-gray-600">
                    Amplifiez l'impact de vos actions et mobilisez votre communauté autour de vos causes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Services avec design moderne */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-meddoc-primary to-meddoc-secondary">Ce que nous proposons</span>
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
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-meddoc-primary to-meddoc-secondary">Résultats attendus</span>
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
                  src="https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Community Management Médical"
                  className="relative rounded-2xl shadow-xl w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section avec design moderne */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-meddoc-primary to-meddoc-secondary rounded-2xl shadow-xl overflow-hidden">
            <div className="relative p-8 md:p-12">
              <div className="absolute top-0 right-0 -mt-12 -mr-12 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
              
              <div className="relative z-10 text-white">
                <h2 className="text-3xl font-bold mb-6">Prêt à transformer votre présence en ligne ?</h2>
                <p className="text-xl text-white/90 mb-8">
                  💬 Contactez-nous pour mettre en place une communication professionnelle et efficace adaptée à votre structure de santé.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="bg-white text-meddoc-primary hover:bg-white/90 px-8 py-6 text-lg font-semibold">
                    Demander un audit gratuit
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-lg font-semibold">
                    <MessageCircle className="mr-2 h-5 w-5" />
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
