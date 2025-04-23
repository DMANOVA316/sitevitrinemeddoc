import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ArrowRight,
  Stethoscope,
  Code,
  Users,
  Phone,
  ArrowUpRight,
  MapPin,
  Layers,
  Target,
  GraduationCap,
  Briefcase,
  Lightbulb,
  Heart,
  Facebook,
  Instagram,
  Twitter,
  MessageCircle,
  Linkedin,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { couvertureService } from "@/services/couvertureService";
import { toast } from "sonner";
import PartnerCard from "@/components/PartnerCard";
import { usePartnerRedux } from "@/hooks/use-partner-redux";
import { Skeleton } from "@/components/ui/skeleton";

const Index = () => {
  const [couverture, setCouverture] = useState<Couverture | null>(null);
  const [isLoadingCouverture, setIsLoadingCouverture] = useState(true);
  const {
    partners,
    isLoading: isLoadingPartner,
    getPartners,
  } = usePartnerRedux();

  useEffect(() => {
    const fetchCouverture = async () => {
      try {
        setIsLoadingCouverture(true);
        const data = await couvertureService.getCouverture();
        setCouverture(data);
      } catch (error) {
        console.error("Error fetching couverture:", error);
        toast.error(
          "Une erreur s'est produite lors du chargement de la couverture",
        );
      } finally {
        setIsLoadingCouverture(false);
      }
    };

    fetchCouverture();
    getPartners();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-meddoc-primary via-sky-500 to-meddoc-secondary py-32 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{
            backgroundImage: `url(${couverture?.photo})`,
          }}
        ></div>

        {/* Social Media Icons */}
        <div className="absolute top-57 right-8 z-20 flex flex-col gap-3">
          <a
            href="https://www.facebook.com/meddoc.mg"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300"
            aria-label="Facebook"
          >
            <Facebook className="h-6 w-6 text-white" />
          </a>
          <a
            href="https://www.instagram.com/meddoc.mg"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300"
            aria-label="Instagram"
          >
            <Instagram className="h-6 w-6 text-white" />
          </a>
          <a
            href="https://twitter.com/meddoc_mg"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300"
            aria-label="X (Twitter)"
          >
            <Twitter className="h-6 w-6 text-white" />
          </a>
          <a
            href="https://wa.me/261340000000"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300"
            aria-label="WhatsApp"
          >
            <MessageCircle className="h-6 w-6 text-white" />
          </a>
          <a
            href="https://www.linkedin.com/company/meddoc-mg"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-6 w-6 text-white" />
          </a>
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl animate-fade-up">
            <span className="text-xl inline-block bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm mb-6">
              A vos marques, prêt, santé !
            </span>
            <h1 className="mb-6 text-6xl font-bold leading-tight text-white">
              {isLoadingCouverture ? (
                <div className="flex flex-col gap-1">
                  <Skeleton className="w-full h-[50px]" />
                  <Skeleton className="w-1/2 h-[50px]" />
                </div>
              ) : (
                couverture?.titre || "La première entreprise 360° santé à Madagascar"
              )}
            </h1>
            <p className="mb-8 text-xl text-white/90 leading-relaxed">
              {isLoadingCouverture ? (
                <div className="flex flex-col gap-1">
                  <Skeleton className="w-full h-[40px]" />
                  <Skeleton className="w-1/2 h-[40px]" />
                </div>
              ) : (
                couverture?.description ||
                "Nous développons des solutions et des services innovants dédiés à la promotion de la santé et à l'amélioration de l'accès aux soins."
              )}
            </p>
            <div className="flex gap-4">
              <a href="#services" className="block">
                <Button
                  size="lg"
                  className="bg-white text-meddoc-primary hover:bg-white/90"
                >
                  Découvrir nos services
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
              <Link to="/contact" className="block">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-white text-white hover:bg-white/10"
                >
                  Nous contacter
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-32 bg-gradient-to-br from-slate-50 to-white relative overflow-hidden" id="services">
        <div className="absolute top-0 right-0 w-96 h-96 bg-meddoc-primary/5 rounded-full -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-meddoc-secondary/5 rounded-full -ml-48 -mb-48"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 inline-block relative">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-meddoc-primary to-meddoc-secondary">Nos Services</span>
              <div className="absolute w-32 h-1 bg-gradient-to-r from-meddoc-primary to-meddoc-secondary bottom-0 left-1/2 transform -translate-x-1/2 -mb-2 rounded-full"></div>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto mt-4">
              C'est une vision 360° de la santé : humaine, technologique, accessible.
            </p>
          </div>

          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {/* Service 1 */}
            <Link to="/services/digital" className="group">
              <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden h-full transform hover:-translate-y-2">
                <div className="h-2 bg-gradient-to-r from-meddoc-primary to-meddoc-secondary"></div>
                <div className="p-8">
                  <div className="w-16 h-16 rounded-full bg-meddoc-primary/10 flex items-center justify-center mb-6 group-hover:bg-meddoc-primary/20 transition-all duration-300">
                    <Code className="h-8 w-8 text-meddoc-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-meddoc-primary transition-colors">
                    Solutions digitales santé
                  </h3>
                  <p className="text-slate-600 mb-6">
                    Conception et développement d'applications mobiles, de plateformes web et de logiciels sur mesure pour moderniser la gestion, la communication et le suivi médical.
                  </p>
                  <div className="text-slate-500 mb-6 text-sm">
                    Accessibles, performantes, pensées pour les professionnels de santé à Madagascar.
                  </div>
                  <div className="flex items-center text-meddoc-primary font-semibold">
                    En savoir plus <ArrowUpRight className="ml-2 h-4 w-4" />
                  </div>
                </div>
              </div>
            </Link>

            {/* Service 2 */}
            <Link to="/services/community" className="group">
              <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden h-full transform hover:-translate-y-2">
                <div className="h-2 bg-gradient-to-r from-meddoc-primary to-meddoc-secondary"></div>
                <div className="p-8">
                  <div className="w-16 h-16 rounded-full bg-meddoc-primary/10 flex items-center justify-center mb-6 group-hover:bg-meddoc-primary/20 transition-all duration-300">
                    <Users className="h-8 w-8 text-meddoc-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-meddoc-primary transition-colors">
                    Community management médical
                  </h3>
                  <p className="text-slate-600 mb-6">
                    Valorisez votre image et touchez votre public ! Nous gérons votre présence en ligne (Facebook, Instagram, LinkedIn, TikTok) avec des contenus adaptés à vos services.
                  </p>
                  <div className="text-slate-500 mb-6 text-sm">
                    Stratégie, création de contenus, animation… on s'occupe de tout !
                  </div>
                  <div className="flex items-center text-meddoc-primary font-semibold">
                    En savoir plus <ArrowUpRight className="ml-2 h-4 w-4" />
                  </div>
                </div>
              </div>
            </Link>

            {/* Service 3 */}
            <Link to="/services/formations" className="group">
              <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden h-full transform hover:-translate-y-2">
                <div className="h-2 bg-gradient-to-r from-meddoc-primary to-meddoc-secondary"></div>
                <div className="p-8">
                  <div className="w-16 h-16 rounded-full bg-meddoc-primary/10 flex items-center justify-center mb-6 group-hover:bg-meddoc-primary/20 transition-all duration-300">
                    <GraduationCap className="h-8 w-8 text-meddoc-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-meddoc-primary transition-colors">
                    Formations
                  </h3>
                  <p className="text-slate-600 mb-6">
                    Des formations pratiques et ciblées pour renforcer les compétences de vos équipes sur le terrain : gestion, finance, outils numériques, communication, services de santé.
                  </p>
                  <div className="text-slate-500 mb-6 text-sm">
                    Un vrai levier pour améliorer la qualité et l'impact de vos interventions.
                  </div>
                  <div className="flex items-center text-meddoc-primary font-semibold">
                    En savoir plus <ArrowUpRight className="ml-2 h-4 w-4" />
                  </div>
                </div>
              </div>
            </Link>

            {/* Service 4 */}
            <Link to="/services/consulting" className="group">
              <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden h-full transform hover:-translate-y-2">
                <div className="h-2 bg-gradient-to-r from-meddoc-primary to-meddoc-secondary"></div>
                <div className="p-8">
                  <div className="w-16 h-16 rounded-full bg-meddoc-primary/10 flex items-center justify-center mb-6 group-hover:bg-meddoc-primary/20 transition-all duration-300">
                    <Briefcase className="h-8 w-8 text-meddoc-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-meddoc-primary transition-colors">
                    Consulting santé
                  </h3>
                  <p className="text-slate-600 mb-6">
                    Bénéficiez de notre expertise sectorielle pour structurer, améliorer et innover dans vos services de santé à Madagascar.
                  </p>
                  <div className="text-slate-500 mb-6 text-sm">
                    Diagnostic, stratégie, suivi de projet… MEDDoC est votre partenaire de confiance.
                  </div>
                  <div className="flex items-center text-meddoc-primary font-semibold">
                    En savoir plus <ArrowUpRight className="ml-2 h-4 w-4" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-32 bg-gradient-to-br from-meddoc-primary/5 to-meddoc-secondary/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-5"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-meddoc-primary/10 rounded-full blur-3xl -ml-48 -mt-48"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-meddoc-secondary/10 rounded-full blur-3xl -mr-48 -mb-48"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 inline-block relative">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-meddoc-primary to-meddoc-secondary">Notre Mission</span>
                <div className="absolute w-32 h-1 bg-gradient-to-r from-meddoc-primary to-meddoc-secondary bottom-0 left-1/2 transform -translate-x-1/2 -mb-2 rounded-full"></div>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl shadow-lg p-8 transform hover:-translate-y-2 transition-all duration-300 border-t-4 border-meddoc-primary">
                <div className="w-16 h-16 rounded-full bg-meddoc-primary/10 flex items-center justify-center mb-6 mx-auto">
                  <Target className="h-8 w-8 text-meddoc-primary" />
                </div>
                <h3 className="text-xl font-bold text-center text-slate-900 mb-4">Notre Objectif</h3>
                <p className="text-slate-600 text-center">
                  Faciliter l'accès aux soins de santé pour la population malagasy tout en améliorant la qualité des services offerts.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-8 transform hover:-translate-y-2 transition-all duration-300 border-t-4 border-meddoc-secondary md:mt-8">
                <div className="w-16 h-16 rounded-full bg-meddoc-secondary/10 flex items-center justify-center mb-6 mx-auto">
                  <Lightbulb className="h-8 w-8 text-meddoc-secondary" />
                </div>
                <h3 className="text-xl font-bold text-center text-slate-900 mb-4">Notre Vision</h3>
                <p className="text-slate-600 text-center">
                  Transformer le secteur de la santé à Madagascar grâce à l'innovation, la formation et l'expertise locale.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-8 transform hover:-translate-y-2 transition-all duration-300 border-t-4 border-meddoc-primary">
                <div className="w-16 h-16 rounded-full bg-meddoc-primary/10 flex items-center justify-center mb-6 mx-auto">
                  <Heart className="h-8 w-8 text-meddoc-primary" />
                </div>
                <h3 className="text-xl font-bold text-center text-slate-900 mb-4">Nos Valeurs</h3>
                <p className="text-slate-600 text-center">
                  Excellence, innovation, engagement local et accessibilité pour tous les Malgaches, où qu'ils soient.
                </p>
              </div>
            </div>

            <div className="mt-16 text-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-meddoc-primary to-meddoc-secondary hover:from-meddoc-primary/90 hover:to-meddoc-secondary/90 text-white px-8 py-6 rounded-full"
              >
                En savoir plus sur nous
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 bg-gradient-to-br from-slate-50 to-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-meddoc-primary/5 rounded-full -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-meddoc-secondary/5 rounded-full -ml-48 -mb-48"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6 inline-block relative">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-meddoc-primary to-meddoc-secondary">Pourquoi choisir MEDDoC ?</span>
                <div className="absolute w-32 h-1 bg-gradient-to-r from-meddoc-primary to-meddoc-secondary bottom-0 left-1/2 transform -translate-x-1/2 -mb-2 rounded-full"></div>
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-6">
                Nous combinons expertise locale et vision innovante pour transformer le secteur de la santé à Madagascar
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-x-12 gap-y-16 items-center">
              <div>
                <div className="space-y-8">
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-lg bg-meddoc-primary/10 flex items-center justify-center flex-shrink-0">
                      <Users className="h-6 w-6 text-meddoc-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">Une équipe locale engagée et à l'écoute</h3>
                      <p className="text-gray-600">Notre équipe malgache comprend les réalités du terrain et s'engage à répondre à vos besoins avec réactivité et professionnalisme.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-lg bg-meddoc-primary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-6 w-6 text-meddoc-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">Des solutions concrètes adaptées au contexte malgache</h3>
                      <p className="text-gray-600">Nous développons des solutions qui tiennent compte des spécificités locales, des contraintes et des opportunités propres à Madagascar.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="space-y-8">
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-lg bg-meddoc-primary/10 flex items-center justify-center flex-shrink-0">
                      <Layers className="h-6 w-6 text-meddoc-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">Une approche globale</h3>
                      <p className="text-gray-600">Du digital à la stratégie, en passant par la formation, nous offrons un accompagnement complet pour répondre à tous vos besoins.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-lg bg-meddoc-primary/10 flex items-center justify-center flex-shrink-0">
                      <Target className="h-6 w-6 text-meddoc-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">Un objectif commun</h3>
                      <p className="text-gray-600">Nous partageons avec nos clients et partenaires une vision : transformer la santé à Madagascar pour un avenir meilleur et plus équitable.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-24 bg-gradient-to-br from-slate-50 to-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-meddoc-primary/5 rounded-full -ml-48 -mt-48"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-meddoc-secondary/5 rounded-full -mr-48 -mb-48"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 inline-block relative">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-meddoc-primary to-meddoc-secondary">Ils nous soutiennent</span>
              <div className="absolute w-32 h-1 bg-gradient-to-r from-meddoc-primary to-meddoc-secondary bottom-0 left-1/2 transform -translate-x-1/2 -mb-2 rounded-full"></div>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto mt-4">
              Des partenaires de confiance qui nous accompagnent dans notre mission de transformation de la santé à Madagascar
            </p>
          </div>

          {isLoadingPartner ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-meddoc-primary/20 border-t-meddoc-primary"></div>
            </div>
          ) : partners && partners.length > 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-12">
                {partners.map((partner) => (
                  <div key={partner.id} className="transform hover:scale-105 transition-all duration-300">
                    <PartnerCard partner={partner} />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <p className="text-gray-500 italic">
                Aucun partenaire disponible pour le moment
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-slate-100 rounded-full -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-100 rounded-full -ml-48 -mb-48"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-meddoc-primary to-meddoc-secondary rounded-2xl p-8 md:p-12 shadow-xl">
            <div className="text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                Parlons de votre projet dès maintenant<span className="text-yellow-300"> !</span>
              </h2>
              <p className="text-xl mb-12 text-white/90 max-w-2xl mx-auto leading-relaxed">
                📩 Contactez-nous ou suivez-nous sur les réseaux pour ne rien manquer
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-white text-meddoc-primary hover:bg-white/90 px-8 py-6 text-lg font-semibold"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Prendre rendez-vous
                </Button>
                <Link to="/contact">
                  <Button
                    size="lg"
                    className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-lg font-semibold"
                  >
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

export default Index;
