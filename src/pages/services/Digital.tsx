import { ArrowRight, Code, Database, Globe, MapPin, Shield, Smartphone, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import digitaleImage from "../../assets/serivces-images/digitale.jpg";
import useScrollToTop from "../../hooks/useScrollToTop";

const Digital = () => {
  // Défilement automatique vers le haut lors du chargement de la page
  useScrollToTop();

  return (
    <div className="min-h-screen">
      {/* Hero Section avec image de fond et dégradé */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-br from-meddoc-fonce to-meddoc-fonce">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: `url(${digitaleImage})`,
          }}
        ></div>
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:40px_40px]"></div>
        <div className="absolute -bottom-6 left-0 right-0 h-12 bg-white transform -skew-y-1"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center animate-fade-up">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
              SOLUTIONS DIGITALES SANTE<span className="text-yellow-300">.</span>
            </h1>
            <p className="text-2xl font-semibold text-white mb-6">
              Des outils numériques au service de la santé à Madagascar
            </p>
            <p className="text-lg text-white mb-8">
              Chez MEDDoC, nous croyons que la technologie peut révolutionner l'accès aux soins. Nos solutions digitales sont conçues pour simplifier le quotidien des professionnels de santé et améliorer la qualité des services offerts à la population.
            </p>
            <a href="#services">
              <Button className="bg-white text-meddoc-primary hover:bg-white/90 px-8 py-6 text-lg font-semibold">
                Découvrir nos solutions
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-10 bg-white" id="services">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Nos services <span className="text-sky-500">digitaux</span></h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">Des solutions technologiques adaptées aux besoins spécifiques du secteur de la santé à Madagascar</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Service 1 */}
              <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className="h-3 bg-gradient-to-r from-sky-400 to-sky-600"></div>
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-sky-100 p-3 rounded-lg group-hover:bg-sky-200 transition-colors">
                      <Smartphone className="h-8 w-8 text-sky-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">Applications mobiles santé</h3>
                      <p className="text-slate-600">Pour le suivi patient, l'éducation sanitaire ou la collecte de données sur le terrain.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Service 2 */}
              <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className="h-3 bg-gradient-to-r from-sky-400 to-sky-600"></div>
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-sky-100 p-3 rounded-lg group-hover:bg-sky-200 transition-colors">
                      <Globe className="h-8 w-8 text-sky-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">Sites vitrines professionnels</h3>
                      <p className="text-slate-600">Présentez votre établissement et vos services avec un site web moderne et responsive.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Service 3 */}
              <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className="h-3 bg-gradient-to-r from-sky-400 to-sky-600"></div>
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-sky-100 p-3 rounded-lg group-hover:bg-sky-200 transition-colors">
                      <Database className="h-8 w-8 text-sky-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">Plateformes web médicales</h3>
                      <p className="text-slate-600">Pour la gestion des rendez-vous, dossiers patients, ou le pilotage d'activités.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Service 4 */}
              <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className="h-3 bg-gradient-to-r from-sky-400 to-sky-600"></div>
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-sky-100 p-3 rounded-lg group-hover:bg-sky-200 transition-colors">
                      <Code className="h-8 w-8 text-sky-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">Logiciels sur mesure</h3>
                      <p className="text-slate-600">Adaptés à vos besoins spécifiques (gestion de cabinet, stock de médicaments, RH…).</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Avantages Section */}
      <section className="py-10 bg-gradient-to-br from-sky-50 to-slate-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Pourquoi choisir nos solutions<span className="text-sky-500">?</span></h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">Des outils conçus par des Malgaches pour des Malgaches, avec une attention particulière à vos besoins spécifiques.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Avantage 1 */}
            <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 transform hover:-translate-y-2">
              <div className="h-12 w-12 bg-sky-100 rounded-full flex items-center justify-center mb-6">
                <MapPin className="h-6 w-6 text-sky-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Adaptées au terrain malgache</h3>
              <p className="text-slate-600">Nos solutions sont conçues spécifiquement pour répondre aux défis uniques du secteur de la santé à Madagascar.</p>
            </div>

            {/* Avantage 2 */}
            <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 transform hover:-translate-y-2">
              <div className="h-12 w-12 bg-sky-100 rounded-full flex items-center justify-center mb-6">
                <Shield className="h-6 w-6 text-sky-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Sécurisées et intuitives</h3>
              <p className="text-slate-600">Protection des données garantie et interfaces simples qui ne nécessitent pas de compétences techniques avancées.</p>
            </div>

            {/* Avantage 3 */}
            <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 transform hover:-translate-y-2">
              <div className="h-12 w-12 bg-sky-100 rounded-full flex items-center justify-center mb-6">
                <Users className="h-6 w-6 text-sky-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Équipe locale réactive</h3>
              <p className="text-slate-600">Développées à Madagascar par une équipe disponible pour vous accompagner et répondre rapidement à vos besoins.</p>
            </div>

            {/* Avantage 4 */}
            <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 transform hover:-translate-y-2">
              <div className="h-12 w-12 bg-sky-100 rounded-full flex items-center justify-center mb-6">
                <Smartphone className="h-6 w-6 text-sky-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Multi-plateformes</h3>
              <p className="text-slate-600">Accessibles sur tous vos appareils, que ce soit sur ordinateur, tablette ou smartphone, pour une flexibilité maximale.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-meddoc-primary to-meddoc-secondary rounded-2xl shadow-xl overflow-hidden">
            <div className="relative p-8 md:p-12">
              <div className="absolute top-0 right-0 -mt-12 -mr-12 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>

              <div className="relative z-10 text-white text-center">
                <h2 className="text-3xl font-bold mb-6">Prêt à digitaliser vos services ?</h2>
                <p className="text-xl text-white/90 mb-8">
                  Un projet en tête ? Parlons-en et trouvons ensemble la solution digitale qui vous correspond.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="bg-white text-meddoc-primary hover:bg-white/90 px-8 py-6 text-lg font-semibold">
                    Demander une démo
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-lg font-semibold">
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
