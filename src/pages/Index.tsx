import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Stethoscope, Code, Users, Phone } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-meddoc-primary to-meddoc-secondary py-20 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl animate-fade-up">
            <h1 className="mb-6 text-5xl font-bold leading-tight">
              La Première Entreprise 360° Santé à Madagascar
            </h1>
            <p className="mb-8 text-xl">
              Des solutions innovantes pour améliorer l'accès aux soins de santé et la qualité des services médicaux.
            </p>
            <Button className="bg-white text-meddoc-primary hover:bg-meddoc-light">
              Découvrir nos services
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-800">
            Nos Services
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="p-6 transition-transform hover:scale-105">
              <Code className="mb-4 h-12 w-12 text-meddoc-primary" />
              <h3 className="mb-3 text-xl font-semibold">
                Solutions Numériques
              </h3>
              <p className="text-gray-600">
                Développement d'outils innovants pour optimiser la gestion des services de santé.
              </p>
            </Card>
            <Card className="p-6 transition-transform hover:scale-105">
              <Users className="mb-4 h-12 w-12 text-meddoc-primary" />
              <h3 className="mb-3 text-xl font-semibold">
                Community Management Médical
              </h3>
              <p className="text-gray-600">
                Gestion professionnelle de votre présence en ligne dans le secteur médical.
              </p>
            </Card>
            <Card className="p-6 transition-transform hover:scale-105">
              <Stethoscope className="mb-4 h-12 w-12 text-meddoc-primary" />
              <h3 className="mb-3 text-xl font-semibold">
                Services de Conseil
              </h3>
              <p className="text-gray-600">
                Expertise et accompagnement pour optimiser vos services de santé.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-meddoc-light py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold text-gray-800">
              Notre Mission
            </h2>
            <p className="mb-8 text-lg text-gray-600">
              MEDDoC s'engage à faciliter l'accès aux soins de santé pour la population malagasy tout en améliorant la qualité des services offerts aux professionnels de la santé.
            </p>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Nos Partenaires
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            <div className="flex items-center justify-center p-4">
              <img
                src="/placeholder.svg"
                alt="Partner 1"
                className="max-h-16 opacity-70 hover:opacity-100 transition-opacity"
              />
            </div>
            <div className="flex items-center justify-center p-4">
              <img
                src="/placeholder.svg"
                alt="Partner 2"
                className="max-h-16 opacity-70 hover:opacity-100 transition-opacity"
              />
            </div>
            <div className="flex items-center justify-center p-4">
              <img
                src="/placeholder.svg"
                alt="Partner 3"
                className="max-h-16 opacity-70 hover:opacity-100 transition-opacity"
              />
            </div>
            <div className="flex items-center justify-center p-4">
              <img
                src="/placeholder.svg"
                alt="Partner 4"
                className="max-h-16 opacity-70 hover:opacity-100 transition-opacity"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-8 text-3xl font-bold text-gray-800">
            Contactez-nous
          </h2>
          <div className="mx-auto max-w-md">
            <Button className="w-full bg-meddoc-primary hover:bg-meddoc-secondary">
              <Phone className="mr-2 h-4 w-4" />
              Prendre rendez-vous
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 py-8 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="mb-4 text-lg font-semibold">MEDDoC</p>
            <p className="text-sm text-gray-400">
              © 2024 MEDDoC. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
