import { ArrowRight, Monitor, Server, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Digital = () => {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Solutions Numériques</h1>
        <p className="text-xl text-center text-gray-600 mb-16 max-w-3xl mx-auto">
          Nous développons des outils innovants pour optimiser la gestion des services de santé et améliorer l'expérience patient.
        </p>
        
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="p-6">
            <Monitor className="h-12 w-12 text-meddoc-primary mb-4" />
            <h3 className="text-xl font-semibold mb-3">Applications Web</h3>
            <p className="text-gray-600 mb-4">
              Des solutions sur mesure pour la gestion des établissements de santé.
            </p>
          </Card>
          
          <Card className="p-6">
            <Server className="h-12 w-12 text-meddoc-primary mb-4" />
            <h3 className="text-xl font-semibold mb-3">Systèmes de Gestion</h3>
            <p className="text-gray-600 mb-4">
              Optimisation des processus et de la gestion des données médicales.
            </p>
          </Card>
          
          <Card className="p-6">
            <Shield className="h-12 w-12 text-meddoc-primary mb-4" />
            <h3 className="text-xl font-semibold mb-3">Sécurité des Données</h3>
            <p className="text-gray-600 mb-4">
              Protection des données sensibles selon les normes internationales.
            </p>
          </Card>
        </div>

        <div className="text-center">
          <Button className="bg-meddoc-primary hover:bg-meddoc-secondary">
            Demander un devis
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Digital;