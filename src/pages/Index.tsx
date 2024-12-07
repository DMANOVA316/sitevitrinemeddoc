import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ArrowRight,
  Stethoscope,
  Code,
  Users,
  Phone,
  Building2,
  ArrowUpRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  couvertureService,
  CouvertureType,
} from "@/services/couvertureService";
import { partnerService } from "@/services/partnerService";
import { toast } from "sonner";
import { PartnerType } from "@/types";
import PartnerCard from "@/components/PartnerCard";

const Index = () => {
  const [couverture, setCouverture] = useState<CouvertureType | null>(null);
  const [isLoadingCouverture, setIsLoadingCouverture] = useState(true);

  const [partners, setPartners] = useState<PartnerType[] | null>(null);
  const [isLoadingPartner, setIsLoadingPartner] = useState(true);

  useEffect(() => {
    const fetchCouverture = async () => {
      try {
        setIsLoadingCouverture(true);
        let data = await couvertureService.getCouverture();

        // Si aucune donnée n'existe, créer une entrée par défaut
        if (!data) {
          data = await couvertureService.createCouverture();
        }

        setCouverture(data);
      } catch (error) {
        console.error("Error fetching couverture:", error);
      } finally {
        setIsLoadingCouverture(false);
      }
    };

    const fetchPartner = async () => {
      try {
        setIsLoadingPartner(true);
        const data = await partnerService.getAllPartners();
        setPartners(data);
      } catch (error) {
        console.error("Error fetching partners:", error);
      } finally {
        setIsLoadingPartner(false);
      }
    };

    fetchCouverture();
    fetchPartner();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-meddoc-primary via-sky-500 to-meddoc-secondary py-32 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{
            backgroundImage: `url(${
              couverture?.photo ||
              "https://images.unsplash.com/photo-1649972904349-6e44c42644a7"
            })`,
          }}
        ></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl animate-fade-up">
            <span className="inline-block bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm mb-6">
              La première entreprise 360° santé à Madagascar
            </span>
            <h1 className="mb-6 text-6xl font-bold leading-tight text-white">
              {isLoadingCouverture
                ? "Chargement..."
                : couverture?.titre || "Des Solutions Innovantes pour la Santé"}
            </h1>
            <p className="mb-8 text-xl text-white/90 leading-relaxed">
              {isLoadingCouverture
                ? "Chargement..."
                : couverture?.description ||
                  "Nous développons des solutions et des services innovants dédiés à la promotion de la santé et à l'amélioration de l'accès aux soins."}
            </p>
            <div className="flex gap-4">
              <Button
                size="lg"
                className="bg-white text-meddoc-primary hover:bg-white/90"
              >
                Découvrir nos services
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white/10"
              >
                Nous contacter
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-32 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Nos Services
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Des solutions complètes pour répondre aux besoins du secteur de la
              santé
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <Link to="/services/digital" className="group">
              <Card className="p-8 h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <Code className="mb-6 h-12 w-12 text-meddoc-primary" />
                <h3 className="text-2xl font-semibold mb-4 text-slate-900 group-hover:text-meddoc-primary transition-colors">
                  Solutions Numériques
                </h3>
                <p className="text-slate-600 mb-6">
                  Développement d'outils innovants pour optimiser la gestion des
                  services de santé.
                </p>
                <div className="flex items-center text-meddoc-primary">
                  En savoir plus <ArrowUpRight className="ml-2 h-4 w-4" />
                </div>
              </Card>
            </Link>

            <Link to="/services/community" className="group">
              <Card className="p-8 h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <Users className="mb-6 h-12 w-12 text-meddoc-primary" />
                <h3 className="text-2xl font-semibold mb-4 text-slate-900 group-hover:text-meddoc-primary transition-colors">
                  Community Management
                </h3>
                <p className="text-slate-600 mb-6">
                  Gestion professionnelle de votre présence en ligne dans le
                  secteur médical.
                </p>
                <div className="flex items-center text-meddoc-primary">
                  En savoir plus <ArrowUpRight className="ml-2 h-4 w-4" />
                </div>
              </Card>
            </Link>

            <Link to="/services/consulting" className="group">
              <Card className="p-8 h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <Stethoscope className="mb-6 h-12 w-12 text-meddoc-primary" />
                <h3 className="text-2xl font-semibold mb-4 text-slate-900 group-hover:text-meddoc-primary transition-colors">
                  Services de Conseil
                </h3>
                <p className="text-slate-600 mb-6">
                  Expertise et accompagnement pour optimiser vos services de
                  santé.
                </p>
                <div className="flex items-center text-meddoc-primary">
                  En savoir plus <ArrowUpRight className="ml-2 h-4 w-4" />
                </div>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-meddoc-primary to-meddoc-secondary rounded-2xl transform rotate-3"></div>
              <img
                src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
                alt="Medical Professional"
                className="relative rounded-2xl shadow-xl w-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                Notre Mission
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                MEDDoC s'engage à faciliter l'accès aux soins de santé pour la
                population malagasy tout en améliorant la qualité des services
                offerts aux professionnels de la santé.
              </p>
              <Button
                size="lg"
                className="bg-meddoc-primary hover:bg-meddoc-secondary"
              >
                En savoir plus
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-32 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Nos Partenaires
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Ils nous font confiance pour améliorer leurs services de santé
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 items-center">
            {isLoadingPartner
              ? "Chargement..."
              : partners.map((partner) => (
                  <PartnerCard key={partner.id} partner={partner} />
                ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gradient-to-br from-meddoc-primary to-meddoc-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8">
            Prêt à améliorer vos services de santé ?
          </h2>
          <p className="text-xl mb-12 text-white/90 max-w-2xl mx-auto">
            Contactez-nous dès aujourd'hui pour découvrir comment nous pouvons
            vous aider à optimiser vos services.
          </p>
          <Button
            size="lg"
            className="bg-white text-meddoc-primary hover:bg-white/90"
          >
            <Phone className="mr-2 h-4 w-4" />
            Prendre rendez-vous
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
