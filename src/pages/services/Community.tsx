import { ArrowRight, MessageSquare, TrendingUp, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Community = () => {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Community Management Médical</h1>
        <p className="text-xl text-center text-gray-600 mb-16 max-w-3xl mx-auto">
          Gestion professionnelle de votre présence en ligne dans le secteur médical.
        </p>
        
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="p-6">
            <MessageSquare className="h-12 w-12 text-meddoc-primary mb-4" />
            <h3 className="text-xl font-semibold mb-3">Gestion des Réseaux Sociaux</h3>
            <p className="text-gray-600 mb-4">
              Animation et modération de vos comptes professionnels.
            </p>
          </Card>
          
          <Card className="p-6">
            <TrendingUp className="h-12 w-12 text-meddoc-primary mb-4" />
            <h3 className="text-xl font-semibold mb-3">Stratégie Digitale</h3>
            <p className="text-gray-600 mb-4">
              Développement de votre visibilité en ligne.
            </p>
          </Card>
          
          <Card className="p-6">
            <Users className="h-12 w-12 text-meddoc-primary mb-4" />
            <h3 className="text-xl font-semibold mb-3">Engagement Patient</h3>
            <p className="text-gray-600 mb-4">
              Création de contenu médical adapté à votre audience.
            </p>
          </Card>
        </div>

        <div className="text-center">
          <Button className="bg-meddoc-primary hover:bg-meddoc-secondary">
            Nous contacter
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Community;