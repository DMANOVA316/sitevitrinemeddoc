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
} from "lucide-react";

import {
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
  MessageCircleIcon,
  LinkedinIcon,
} from "./SocialIcons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { scrollToElement } from "@/utils/scrollUtils";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
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
      <section className="relative bg-gradient-to-br from-meddoc-fonce to-meddoc-fonce py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: `url(${couverture?.photo})`,
          }}
        ></div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-64 h-64 md:w-96 md:h-96 bg-meddoc-primary/20 rounded-full blur-3xl -ml-32 -mt-32"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-meddoc-secondary/20 rounded-full blur-3xl -mr-32 -mb-32"></div>

        {/* Social Media Icons */}
        <div className="absolute top-4 sm:top-6 md:top-8 right-4 sm:right-6 md:right-8 lg:right-10 z-20 flex flex-col gap-2 sm:gap-3 md:gap-4 sm:flex-row md:flex-col">
          {/* Sur mobile (< 640px): vertical à droite */}
          {/* Sur tablette (640px - 768px): horizontal à droite */}
          {/* Sur desktop (> 768px): vertical à droite */}
          <a
            href="https://www.facebook.com/MEDDOCHC"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center hover:opacity-80 transition-all duration-300 hover:scale-110"
            aria-label="Facebook"
          >
            <FacebookIcon />
          </a>
          <a
            href="https://www.instagram.com/meddoc.healthcare/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center hover:opacity-80 transition-all duration-300 hover:scale-110"
            aria-label="Instagram"
          >
            <InstagramIcon />
          </a>
          <a
            href="https://x.com/MEDDoCMG"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center hover:opacity-80 transition-all duration-300 hover:scale-110"
            aria-label="X (Twitter)"
          >
            <TwitterIcon />
          </a>
          <a
            href="https://wa.me/261326503158"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center hover:opacity-80 transition-all duration-300 hover:scale-110"
            aria-label="WhatsApp"
          >
            <MessageCircleIcon />
          </a>
          <a
            href="https://www.linkedin.com/company/meddochealthcare/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center hover:opacity-80 transition-all duration-300 hover:scale-110"
            aria-label="LinkedIn"
          >
            <LinkedinIcon />
          </a>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-xl sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto md:mx-0 animate-fade-up">
            <span className="inline-block bg-white/10 backdrop-blur-sm text-white px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm md:text-base mb-4 sm:mb-6">
              A vos marques, prêt, santé !
            </span>
            <h1 className="mb-4 sm:mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
              {isLoadingCouverture ? (
                <div className="flex flex-col gap-1">
                  <Skeleton className="w-full h-[30px] sm:h-[40px] md:h-[50px]" />
                  <Skeleton className="w-1/2 h-[30px] sm:h-[40px] md:h-[50px]" />
                </div>
              ) : (
                couverture?.titre || "La première entreprise 360° santé à Madagascar"
              )}
            </h1>
            {isLoadingCouverture ? (
              <div className="mb-6 sm:mb-8 flex flex-col gap-1">
                <Skeleton className="w-full h-[24px] sm:h-[30px] md:h-[40px]" />
                <Skeleton className="w-1/2 h-[24px] sm:h-[30px] md:h-[40px]" />
              </div>
            ) : (
              <p className="mb-6 sm:mb-8 text-base sm:text-lg md:text-xl text-white/90 leading-relaxed max-w-3xl">
                {couverture?.description ||
                "Nous développons des solutions et des services innovants dédiés à la promotion de la santé et à l'amélioration de l'accès aux soins."}
              </p>
            )}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <div className="block w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-gradient-to-r from-meddoc-primary to-meddoc-secondary text-white hover:bg-white/90 py-2 sm:py-3 md:py-4 px-4 sm:px-6 md:px-8 text-sm sm:text-base md:text-lg hover:bg-gradient-to-r from-meddoc-primary/90 to-meddoc-secondary/90 transition-all duration-300 transform hover:scale-105"
                  onClick={() => scrollToElement('services', 80, 100)}
                >
                  Découvrir nos services
                  <ArrowRight className="ml-2 h-4 w-4 animate-bounce-right" />
                </Button>
              </div>
              <Link to="/contact" className="block w-full sm:w-auto">
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

      {/* Services Section */}
      <section className="py-10 bg-gradient-to-br from-slate-50 to-white relative overflow-hidden transition-all duration-700" id="services">
        <div className="absolute top-0 right-0 w-96 h-96 bg-meddoc-primary/5 rounded-full -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-meddoc-secondary/5 rounded-full -ml-48 -mb-48"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 inline-block relative">
              <span className="bg-clip-text text-meddoc-fonce">NOS SERVICES</span>
              <div className="absolute w-32 h-1 bg-gradient-to-r from-meddoc-primary to-meddoc-secondary bottom-0 left-1/2 transform -translate-x-1/2 -mb-2 rounded-full"></div>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto mt-2">
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
                  <h3 className="text-2xl font-bold text-meddoc-fonce mb-4 group-hover:text-meddoc-primary transition-colors">
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
                  <h3 className="text-2xl font-bold text-meddoc-fonce mb-4 group-hover:text-meddoc-primary transition-colors">
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
                  <h3 className="text-2xl font-bold text-meddoc-fonce mb-4 group-hover:text-meddoc-primary transition-colors">
                    Formations santé
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
                  <h3 className="text-2xl font-bold text-meddoc-fonce mb-4 group-hover:text-meddoc-primary transition-colors">
                    Consulting santé et stratégie

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
      <section className="py-10 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 inline-block relative">
                <span className="text-meddoc-fonce">NOTRE MISSION</span>
                <div className="absolute w-32 h-1 bg-gradient-to-r from-meddoc-primary to-meddoc-secondary bottom-0 left-1/2 transform -translate-x-1/2 -mb-2 rounded-full"></div>
              </h2>
            </div>

            <div className="overflow-hidden rounded-xl shadow-lg">
              {/* Premier bloc - Objectif */}
              <div className="flex flex-col md:flex-row bg-meddoc-fonce text-white">
                <div className="md:w-1/3 p-6 sm:p-8 md:p-10 flex flex-col justify-center">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 md:mb-4 text-center md:text-left">NOTRE OBJECTIF</h3>
                </div>
                <div className="md:w-2/3 p-6 sm:p-8 md:p-10 flex items-center">
                  <div className="w-full">
                    <ul className="space-y-2 md:space-y-4">
                      <li className="flex items-start">
                        <div className="flex-shrink-0 mr-2 md:mr-3 mt-1">
                          <Target className="h-4 w-4 md:h-5 md:w-5 text-sky-400" />
                        </div>
                        <p className="text-white/90 text-sm sm:text-base">
                          Faciliter l'accès aux soins de santé pour la population malagasy tout en améliorant la qualité des services offerts.
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Deuxième bloc - Vision */}
              <div className="flex flex-col md:flex-row bg-sky-500 text-white">
                <div className="md:w-1/3 p-6 sm:p-8 md:p-10 flex flex-col justify-center">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 md:mb-4 text-center md:text-left">NOTRE VISION</h3>
                </div>
                <div className="md:w-2/3 p-6 sm:p-8 md:p-10 flex items-center">
                  <div className="w-full">
                    <ul className="space-y-2 md:space-y-4">
                      <li className="flex items-start">
                        <div className="flex-shrink-0 mr-2 md:mr-3 mt-1">
                          <Lightbulb className="h-4 w-4 md:h-5 md:w-5 text-white" />
                        </div>
                        <p className="text-white/90 text-sm sm:text-base">
                          Transformer le secteur de la santé à Madagascar grâce à l'innovation, la formation et l'expertise locale.
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Troisième bloc - Valeurs */}
              <div className="flex flex-col md:flex-row bg-meddoc-secondary/25 text-meddoc-fonce">
                <div className="md:w-1/3 p-6 sm:p-8 md:p-10 flex flex-col justify-center">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 md:mb-4 text-center md:text-left">NOS VALEURS</h3>
                </div>
                <div className="md:w-2/3 p-6 sm:p-8 md:p-10 flex items-center">
                  <div className="w-full">
                    <ul className="space-y-2 md:space-y-4">
                      <li className="flex items-start">
                        <div className="flex-shrink-0 mr-2 md:mr-3 mt-1">
                          <Heart className="h-4 w-4 md:h-5 md:w-5 text-meddoc-primary" />
                        </div>
                        <p className="text-meddoc-fonce/90 text-sm sm:text-base">
                          Excellence, innovation, engagement local et accessibilité pour tous les Malgaches, où qu'ils soient.
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
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
      <section className="py-6 bg-gradient-to-br from-slate-50 to-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-meddoc-primary/5 rounded-full -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-meddoc-secondary/5 rounded-full -ml-48 -mb-48"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6 inline-block relative">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-meddoc-fonce to-meddoc-fonce">POURQUOI CHOISIR MEDDoC ?</span>
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
      <section className="py-10 bg-gradient-to-br from-slate-50 to-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-meddoc-primary/5 rounded-full -ml-48 -mt-48 blur-xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-meddoc-secondary/5 rounded-full -mr-48 -mb-48 blur-xl"></div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-blue-100/20 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-4">
            <h2 className="text-4xl font-bold mb-4 inline-block relative">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-meddoc-fonce to-meddoc-fonce">ILS NOUS SOUTIENNENT</span>
              <div className="absolute w-32 h-1 bg-gradient-to-r from-meddoc-primary to-meddoc-secondary bottom-0 left-1/2 transform -translate-x-1/2 -mb-2 rounded-full"></div>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto mt-2">
              Des partenaires de confiance qui nous accompagnent dans notre mission de transformation de la santé à Madagascar
            </p>
          </div>

          {isLoadingPartner ? (
            <div className="flex justify-center py-2">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-meddoc-primary/20 border-t-meddoc-primary"></div>
            </div>
          ) : partners && partners.length > 0 ? (
            <div className="relative">
              {/* Gradient overlay left */}
              <div className="absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r from-slate-50 to-transparent pointer-events-none"></div>

              {/* Gradient overlay right */}
              <div className="absolute right-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l from-slate-50 to-transparent pointer-events-none"></div>

              <Swiper
                modules={[Autoplay, Pagination]}
                spaceBetween={30}
                slidesPerView={1}
                breakpoints={{
                  640: { slidesPerView: 2 },
                  768: { slidesPerView: 3 },
                  1024: { slidesPerView: 4 },
                }}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                pagination={{
                  clickable: true,
                  bulletActiveClass: 'swiper-pagination-bullet-active bg-meddoc-primary',
                  bulletClass: 'swiper-pagination-bullet bg-gray-300 opacity-70'
                }}

                loop={true}
                className="py-14 px-4"
              >
                {partners.map((partner, index) => (
                  <SwiperSlide key={partner.id}>
                    <div
                      className="flex justify-center items-center h-full transform hover:scale-110 transition-all duration-500 px-4 py-1"
                      style={{ transitionDelay: `${index * 50}ms` }}
                    >
                      <div className="rounded-xl w-full h-full flex items-center justify-center">
                        <PartnerCard partner={partner} />
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          ) : (
            <div className="rounded-xl shadow-md p-8 text-center">
              <p className="text-gray-500 italic">
                Aucun partenaire disponible pour le moment
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-10 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-slate-100 rounded-full -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-100 rounded-full -ml-48 -mb-48"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-meddoc-primary to-meddoc-secondary rounded-2xl p-8 md:p-12 shadow-xl">
            <div className="text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                Parlons de votre projet dès maintenant<span className="text-yellow-300"> !</span>
              </h2>
              <p className="text-xl mb-12 text-white/90 max-w-2xl mx-auto leading-relaxed">
                Contactez-nous ou suivez-nous sur les réseaux pour ne rien manquer
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button
                  size="lg"
                  className="bg-white text-meddoc-primary hover:bg-white/90 px-8 py-6 text-lg font-semibold"
                >
                  <Phone className="mr-2 h-5 w-5" />
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
