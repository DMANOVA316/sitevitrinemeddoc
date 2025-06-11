import React from 'react';
import useScrollToTop from "../hooks/useScrollToTop";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Globe,
  Target,
  Lightbulb,
  Zap,
  Users,
  BookOpen,
  HeartPulse,
  Sparkles,
  CheckCircle2,
  Rocket,
  HandshakeIcon
} from "lucide-react";

const About: React.FC = () => {
  useScrollToTop(); // Défilement automatique vers le haut lors du chargement de la page

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-meddoc-fonce via-sky-500 to-meddoc-fonce overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:40px_40px]"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-meddoc-primary/20 rounded-full blur-3xl -ml-32 -mt-32"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-meddoc-secondary/20 rounded-full blur-3xl -mr-32 -mb-32"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            ACTEUR DE L'INNOVATION SANTÉ

            </h1>
            <div className="text-lg sm:text-xl text-white/90 space-y-4 mb-8 max-w-3xl mx-auto">
              <p>
                Chez MEDDoC, nous croyons qu'une santé moderne, humaine et accessible passe par l'innovation, la formation et l'accompagnement.
              </p>
              <p>
                Nous sommes bien plus qu'une application de prise de rendez-vous médicaux : nous sommes un moteur de transformation de la santé à Madagascar.
              </p>
              <p>
                Notre ambition est claire : connecter, former, accompagner et protéger.
                Pour que chaque patient, chaque professionnel de santé, chaque structure puisse avancer sereinement vers la santé de demain.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/#services">
                <Button className="bg-gradient-to-r from-meddoc-primary to-meddoc-secondary text-white hover:bg-white/90 px-6 py-3 text-lg font-semibold transition-all duration-300 transform hover:scale-105">
                  Découvrir nos services
                  <ArrowRight className="ml-2 h-5 w-5 animate-bounce-right" />
                </Button>
              </Link>
              <Link to="/contacts" className="block w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto bg-transparent border-white text-white hover:bg-white/10 hover:text-white py-2 sm:py-3 md:py-4 px-4 sm:px-6 md:px-8 text-sm sm:text-base md:text-lg"
                >
                  Nous contacter
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-meddoc-primary/10 mb-4">
                <Target className="h-8 w-8 text-meddoc-primary" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-meddoc-fonce">Notre mission</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-meddoc-primary to-meddoc-secondary mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border-t-4 border-meddoc-primary transform hover:-translate-y-1">
                <div className="w-12 h-12 rounded-lg bg-meddoc-primary/10 flex items-center justify-center mb-4">
                  <Globe className="h-6 w-6 text-meddoc-primary" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Simplifier l'accès aux soins</h3>
                <p className="text-gray-600">
                  Grâce à des solutions digitales pratiques et accessibles pour tous les Malgaches.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border-t-4 border-meddoc-primary transform hover:-translate-y-1">
                <div className="w-12 h-12 rounded-lg bg-meddoc-primary/10 flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-meddoc-primary" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Former les professionnels</h3>
                <p className="text-gray-600">
                  Pour renforcer leurs compétences et maximiser leur impact sur le terrain.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border-t-4 border-meddoc-primary transform hover:-translate-y-1">
                <div className="w-12 h-12 rounded-lg bg-meddoc-primary/10 flex items-center justify-center mb-4">
                  <Lightbulb className="h-6 w-6 text-meddoc-primary" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Conseiller les structures</h3>
                <p className="text-gray-600">
                  Pour accompagner leur transition numérique et améliorer leurs services.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border-t-4 border-meddoc-primary transform hover:-translate-y-1">
                <div className="w-12 h-12 rounded-lg bg-meddoc-primary/10 flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-meddoc-primary" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Promouvoir la santé numérique</h3>
                <p className="text-gray-600">
                  Comme un levier de développement accessible à tous les Malgaches.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Piliers d'action Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-meddoc-primary/10 mb-4">
                <Sparkles className="h-8 w-8 text-meddoc-primary" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-meddoc-fonce">Nos piliers d'action</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-meddoc-primary to-meddoc-secondary mx-auto"></div>
            </div>

            <div className="space-y-12">
              {/* Pilier 1 */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="flex flex-col lg:flex-row">
                  <div className="lg:w-1/3 bg-gradient-to-br from-meddoc-primary to-meddoc-secondary p-8 text-white">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-4">
                        <span className="text-xl font-bold">1</span>
                      </div>
                      <h3 className="text-2xl font-bold">Solutions digitales pour la santé</h3>
                    </div>
                    <p className="text-white/90">
                      Nous développons des outils pour faciliter l'accès et la continuité des soins.
                    </p>
                  </div>
                  <div className="lg:w-2/3 p-8">
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <CheckCircle2 className="h-6 w-6 text-meddoc-primary flex-shrink-0 mt-0.5 mr-3" />
                        <p className="text-gray-700">Plateforme de prise de rendez-vous médicaux</p>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-6 w-6 text-meddoc-primary flex-shrink-0 mt-0.5 mr-3" />
                        <p className="text-gray-700">Consultations médicales à distance</p>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-6 w-6 text-meddoc-primary flex-shrink-0 mt-0.5 mr-3" />
                        <p className="text-gray-700">Carnet de santé numérique sécurisé</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Pilier 2 */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="flex flex-col lg:flex-row">
                  <div className="lg:w-1/3 bg-gradient-to-br from-meddoc-primary to-meddoc-secondary p-8 text-white">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-4">
                        <span className="text-xl font-bold">2</span>
                      </div>
                      <h3 className="text-2xl font-bold">Formation et renforcement de capacités</h3>
                    </div>
                    <p className="text-white/90">
                      Parce qu'une santé moderne passe aussi par la montée en compétences.
                    </p>
                  </div>
                  <div className="lg:w-2/3 p-8">
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <CheckCircle2 className="h-6 w-6 text-meddoc-primary flex-shrink-0 mt-0.5 mr-3" />
                        <p className="text-gray-700">Formations aux outils numériques pour les professionnels de santé</p>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-6 w-6 text-meddoc-primary flex-shrink-0 mt-0.5 mr-3" />
                        <p className="text-gray-700">Ateliers de sensibilisation à la santé digitale</p>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-6 w-6 text-meddoc-primary flex-shrink-0 mt-0.5 mr-3" />
                        <p className="text-gray-700">Programmes d'alphabétisation digitale pour les communautés rurales</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Pilier 3 */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="flex flex-col lg:flex-row">
                  <div className="lg:w-1/3 bg-gradient-to-br from-meddoc-primary to-meddoc-secondary p-8 text-white">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-4">
                        <span className="text-xl font-bold">3</span>
                      </div>
                      <h3 className="text-2xl font-bold">Conseil et accompagnement digital santé</h3>
                    </div>
                    <p className="text-white/90">
                      Nous aidons les cabinets, cliniques, hôpitaux et associations.
                    </p>
                  </div>
                  <div className="lg:w-2/3 p-8">
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <CheckCircle2 className="h-6 w-6 text-meddoc-primary flex-shrink-0 mt-0.5 mr-3" />
                        <p className="text-gray-700">Définir leur stratégie numérique</p>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-6 w-6 text-meddoc-primary flex-shrink-0 mt-0.5 mr-3" />
                        <p className="text-gray-700">Mettre en place des outils adaptés (site web, application, CRM santé)</p>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-6 w-6 text-meddoc-primary flex-shrink-0 mt-0.5 mr-3" />
                        <p className="text-gray-700">Développer leur présence en ligne via le marketing digital médical</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Valeurs Section */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-meddoc-primary/10 mb-4">
                <HeartPulse className="h-8 w-8 text-meddoc-primary" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-meddoc-fonce">Nos valeurs</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-meddoc-primary to-meddoc-secondary mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border-l-4 border-meddoc-primary">
                <h3 className="font-bold text-xl text-gray-800 mb-3">Accessibilité</h3>
                <p className="text-gray-600">Faire tomber les barrières géographiques, financières et technologiques.</p>
              </div>

              <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border-l-4 border-meddoc-primary">
                <h3 className="font-bold text-xl text-gray-800 mb-3">Confiance</h3>
                <p className="text-gray-600">Assurer la sécurité et la confidentialité des données médicales.</p>
              </div>

              <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border-l-4 border-meddoc-primary">
                <h3 className="font-bold text-xl text-gray-800 mb-3">Qualité</h3>
                <p className="text-gray-600">S'appuyer sur des professionnels certifiés et des solutions rigoureusement testées.</p>
              </div>

              <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border-l-4 border-meddoc-primary">
                <h3 className="font-bold text-xl text-gray-800 mb-3">Innovation pragmatique</h3>
                <p className="text-gray-600">Créer des outils réellement utiles, adaptés aux besoins réels du terrain.</p>
              </div>

              <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border-l-4 border-meddoc-primary">
                <h3 className="font-bold text-xl text-gray-800 mb-3">Engagement humain</h3>
                <p className="text-gray-600">Placer la relation patient-médecin au cœur de nos actions.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-16 bg-gradient-to-br from-meddoc-fonce to-meddoc-fonce text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:40px_40px]"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-meddoc-primary/10 rounded-full blur-3xl -ml-32 -mt-32"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-meddoc-secondary/10 rounded-full blur-3xl -mr-32 -mb-32"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 mb-6">
              <Rocket className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Notre vision</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-meddoc-primary to-meddoc-secondary mx-auto mb-8"></div>

            <div className="text-lg sm:text-xl text-white/90 space-y-4 mb-8">
              <p>
                Nous rêvons d'un monde où la santé est fluide, continue et équitable, grâce au digital.
              </p>
              <p>
                Un monde où chaque médecin est mieux outillé.
              </p>
              <p>
                Un monde où chaque patient peut accéder à un soin de qualité, quel que soit son lieu de vie.
              </p>
              <p className="font-semibold text-xl sm:text-2xl mt-6">
                Avec MEDDoC, nous posons aujourd'hui les bases de la santé connectée de demain.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pourquoi nous choisir Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-meddoc-primary/10 mb-4">
                <HandshakeIcon className="h-8 w-8 text-meddoc-primary" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-meddoc-fonce">Pourquoi choisir MEDDoC ?</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-meddoc-primary to-meddoc-secondary mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-meddoc-primary/10 flex items-center justify-center flex-shrink-0">
                  <Users className="h-6 w-6 text-meddoc-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Une équipe locale, engagée et à l'écoute</h3>
                  <p className="text-gray-600">Notre équipe malgache comprend les réalités du terrain et s'engage à répondre à vos besoins avec réactivité et professionnalisme.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-meddoc-primary/10 flex items-center justify-center flex-shrink-0">
                  <Globe className="h-6 w-6 text-meddoc-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Des services adaptés aux réalités malgaches</h3>
                  <p className="text-gray-600">Nous développons des solutions qui tiennent compte des spécificités locales, des contraintes et des opportunités propres à Madagascar.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-meddoc-primary/10 flex items-center justify-center flex-shrink-0">
                  <Zap className="h-6 w-6 text-meddoc-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Une approche globale</h3>
                  <p className="text-gray-600">Digitalisation, formation et accompagnement : nous offrons un service complet pour répondre à tous vos besoins.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-meddoc-primary/10 flex items-center justify-center flex-shrink-0">
                  <HeartPulse className="h-6 w-6 text-meddoc-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Un modèle centré sur l'humain</h3>
                  <p className="text-gray-600">Pas seulement sur la technologie, mais sur les personnes qui l'utilisent et en bénéficient.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-meddoc-primary to-meddoc-secondary rounded-2xl p-8 md:p-12 shadow-xl">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                MEDDoC, votre partenaire santé
              </h2>
              <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
                Patients, professionnels de santé, établissements, ONG : Rejoignez le mouvement MEDDoC et ensemble, transformons la santé, pour tous et avec tous.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/#services">
                  <Button className="bg-white text-meddoc-primary hover:bg-white/90 px-6 py-3 text-lg font-semibold transition-all duration-300 transform hover:scale-105">
                    Découvrir nos services
                    <ArrowRight className="ml-2 h-5 w-5 animate-bounce-right" />
                  </Button>
                </Link>
                <Link to="/contacts">
                  <Button className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-6 py-3 text-lg font-semibold">
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

export default About;
