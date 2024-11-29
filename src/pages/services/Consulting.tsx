import { ArrowRight, LineChart, Target, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Consulting = () => {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Services de Conseil</h1>
        <p className="text-xl text-center text-gray-600 mb-16 max-w-3xl mx-auto">
          Expertise et accompagnement pour optimiser vos services de santé.
        </p>
        
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="p-6">
            <Target className="h-12 w-12 text-meddoc-primary mb-4" />
            <h3 className="text-xl font-semibold mb-3">Stratégie</h3>
            <p className="text-gray-600 mb-4">
              Définition et mise en œuvre de stratégies de développement.
            </p>
          </Card>
          
          <Card className="p-6">
            <LineChart className="h-12 w-12 text-meddoc-primary mb-4" />
            <h3 className="text-xl font-semibold mb-3">Optimisation</h3>
            <p className="text-gray-600 mb-4">
              Amélioration des processus et de la performance.
            </p>
          </Card>
          
          <Card className="p-6">
            <Lightbulb className="h-12 w-12 text-meddoc-primary mb-4" />
            <h3 className="text-xl font-semibold mb-3">Innovation</h3>
            <p className="text-gray-600 mb-4">
              Accompagnement dans la transformation digitale.
            </p>
          </Card>
        </div>

        <div className="text-center">
          <Button className="bg-meddoc-primary hover:bg-meddoc-secondary">
            En savoir plus
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Consulting;