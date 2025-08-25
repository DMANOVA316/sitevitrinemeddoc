import { Button } from "@/components/ui/button";
import PageTitle from "@/components/PageTitle";
import {
  Smartphone,
  Rocket,
  Calendar,
  FileText,
  Bell,
  Users,
  UserCheck,
  Shield,
  Download,
  Mail,
  User,
  Clock,
  Activity,
  Lock,
  ChevronRight
} from "lucide-react";
import useScrollToTop from "@/hooks/useScrollToTop";
import { Link } from "react-router-dom";

const AppMeddoc = () => {
  // Défilement automatique vers le haut lors du chargement de la page
  useScrollToTop();

  return (
    <div className="min-h-screen">
      <PageTitle 
        title="MEDDoC - Application web et mobile santé Madagascar | Carnet de santé numérique"
        description="Découvrez l'application MEDDoC : votre carnet de santé numérique à Madagascar. Gérez vos rendez-vous médicaux, suivez votre santé et accédez aux services de santé facilement."
        keywords="app MEDDoC, application santé Madagascar, carnet santé numérique, rendez-vous médical Madagascar, suivi santé mobile"
      />
      {/* Hero Section */}
      <section className="relative py-8 overflow-hidden bg-gradient-to-br from-meddoc-primary to-meddoc-secondary">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{
            backgroundImage: `url('/images/app-background.jpg')`,
          }}
        ></div>
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:40px_40px]"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
              <span className="inline-flex items-center">

              REJOIGNEZ LA SANTÉ DE DEMAIN<span className="text-yellow-300 ml-2">!</span>
              </span>
            </h1>

            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl mb-8">
              <p className="text-xl md:text-2xl font-medium text-white mb-4">
                Vous voulez accéder plus facilement à des soins de qualité, où que vous soyez ?
              </p>
              <p className="text-xl md:text-2xl font-medium text-white mb-6">
                Vous êtes un professionnel de santé souhaitant digitaliser votre pratique ?
              </p>
              <p className="text-xl md:text-2xl font-bold text-yellow-300">
                L'application MEDDoC est faite pour vous.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contacts">
                <Button className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-lg font-semibold">
                  <Mail className="mr-2 h-5 w-5" />
                  Nous contacter
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-10 bg-white" id="services">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-meddoc-fonce mb-4">Pourquoi utiliser <span className="text-sky-500">l'app MEDDoC</span> ?</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">Une solution complète pour améliorer votre expérience de santé</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Fonctionnalité 1 */}
              <div className="group relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-meddoc-primary to-meddoc-secondary transform origin-left transition-all duration-300 group-hover:h-2"></div>
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-sky-100 p-3 rounded-lg group-hover:bg-sky-200 transition-colors">
                      <Calendar className="h-8 w-8 text-sky-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-meddoc-fonce mb-2">Prise de rendez-vous</h3>
                      <p className="text-slate-600">Prenez rendez-vous avec des médecins qualifiés, en ligne ou en présentiel.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Fonctionnalité 2 */}
              <div className="group relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-meddoc-primary to-meddoc-secondary transform origin-left transition-all duration-300 group-hover:h-2"></div>
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-sky-100 p-3 rounded-lg group-hover:bg-sky-200 transition-colors">
                      <FileText className="h-8 w-8 text-sky-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-meddoc-fonce mb-2">Carnet de santé numérique</h3>
                      <p className="text-slate-600">Accédez à votre carnet de santé numérique sécurisé.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Fonctionnalité 3 */}
              <div className="group relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-meddoc-primary to-meddoc-secondary transform origin-left transition-all duration-300 group-hover:h-2"></div>
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-sky-100 p-3 rounded-lg group-hover:bg-sky-200 transition-colors">
                      <Bell className="h-8 w-8 text-sky-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-meddoc-fonce mb-2">Rappels automatiques</h3>
                      <p className="text-slate-600">Recevez des rappels automatiques pour vos consultations ou traitements.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Fonctionnalité 4 */}
              <div className="group relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-meddoc-primary to-meddoc-secondary transform origin-left transition-all duration-300 group-hover:h-2"></div>
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-sky-100 p-3 rounded-lg group-hover:bg-sky-200 transition-colors">
                      <Users className="h-8 w-8 text-sky-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-meddoc-fonce mb-2">Gestion familiale</h3>
                      <p className="text-slate-600">Gérez le suivi médical de toute votre famille.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Fonctionnalité 5 */}
              <div className="group relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 md:col-span-2">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-meddoc-primary to-meddoc-secondary transform origin-left transition-all duration-300 group-hover:h-2"></div>
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-sky-100 p-3 rounded-lg group-hover:bg-sky-200 transition-colors">
                      <UserCheck className="h-8 w-8 text-sky-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-meddoc-fonce mb-2">Espace professionnel</h3>
                      <p className="text-slate-600">Profitez d'un espace dédié aux professionnels de santé pour optimiser leur gestion.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-meddoc-primary/10 mb-5">
                <UserCheck className="h-8 w-8 text-meddoc-primary" />
              </div>
              <h2 className="text-3xl font-bold mb-4 text-meddoc-fonce">Rejoignez notre communauté !</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Professionnels de santé, patients, familles, partenaires…<br />
                MEDDoC crée un écosystème où la santé devient plus simple, plus rapide, plus humaine.
              </p>
            </div>

            <div className="rounded-xl shadow-md p-8 text-center bg-gradient-to-br from-meddoc-primary to-meddoc-secondary mb-4">
              <p className="text-2xl font-semibold text-white italic mb-4">
                « Notre mission : connecter les Malgaches aux soins qu'ils méritent. »
              </p>
              {/* <div className="w-24 h-1 bg-gradient-to-r from-white to-meddoc-secondary mx-auto"></div> */}
            </div>
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-meddoc-primary to-meddoc-secondary rounded-2xl overflow-hidden shadow-xl">
              <div className="md:flex">
                <div className="md:w-1/2 p-8 md:p-12 text-white">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/20 mb-6">
                    <Download className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Téléchargez l'app MEDDoC</h3>
                  <p className="mb-6">L'application sera disponible très bientôt sur Android et iOS.</p>
                  <div className="space-y-6 md:space-y-8">
                    <p className="font-medium text-lg md:text-xl text-center md:text-left">
                      Contactez-nous pour plus d'informations sur le lancement !
                    </p>
                    <div className="px-4 md:px-0">
                      <Link to="/contacts" className="block w-full">
                        <Button className="bg-white text-meddoc-primary hover:bg-white/90 w-full py-6 text-lg font-semibold transition-all duration-300 hover:scale-[1.02]">
                          Nous contacter
                          <ChevronRight className="ml-2 h-5 w-5" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="md:w-1/2 p-8 md:p-12 bg-white">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-meddoc-primary/10 mb-6">
                    <User className="h-6 w-6 text-meddoc-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-meddoc-fonce">Vous êtes un professionnel de santé ?</h3>
                  <p className="text-gray-600 mb-6">Rejoignez MEDDoC pour :</p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-3">
                      <div className="bg-meddoc-primary/10 p-1 rounded-full mt-1">
                        <Activity className="h-4 w-4 text-meddoc-primary" />
                      </div>
                      <p className="text-gray-700">Gagner en visibilité auprès de nouveaux patients</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="bg-meddoc-primary/10 p-1 rounded-full mt-1">
                        <Clock className="h-4 w-4 text-meddoc-primary" />
                      </div>
                      <p className="text-gray-700">Gérer facilement vos rendez-vous et votre agenda</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="bg-meddoc-primary/10 p-1 rounded-full mt-1">
                        <Shield className="h-4 w-4 text-meddoc-primary" />
                      </div>
                      <p className="text-gray-700">Suivre vos patients via un espace sécurisé</p>
                    </li>
                  </ul>
                  <Link to="/contacts">
                    <Button className="bg-meddoc-primary text-white hover:bg-meddoc-primary/90 w-full">
                      Devenir partenaire médical
                      <ChevronRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="py-6 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/3 flex justify-center">
                <div className="w-48 h-48 bg-meddoc-primary/10 rounded-full flex items-center justify-center">
                  <Lock className="h-24 w-24 text-meddoc-primary" />
                </div>
              </div>
              <div className="md:w-2/3">
                <h2 className="text-3xl font-bold mb-4 text-meddoc-fonce">Sécurité & confidentialité garanties</h2>
                <p className="text-lg text-gray-600 mb-4">
                  Toutes vos données sont protégées selon les normes internationales.
                </p>
                <p className="text-lg text-gray-600">
                  Nous mettons un point d'honneur à garantir la confidentialité de vos informations médicales.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8 text-meddoc-fonce">Prêt à rejoindre la révolution de la santé digitale ?</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contacts">
                <Button className="bg-gradient-to-r from-meddoc-primary to-meddoc-secondary hover:from-meddoc-primary/90 hover:to-meddoc-secondary/90 text-white px-8 py-6 text-lg font-semibold">
                  <Mail className="mr-2 h-5 w-5" />
                  Nous contacter
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AppMeddoc;