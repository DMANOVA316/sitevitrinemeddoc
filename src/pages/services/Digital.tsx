import { ArrowRight, Code, Database, Globe, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Digital = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl animate-fade-up">
            <h1 className="text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
              Solutions Numériques
              <span className="text-sky-400">.</span>
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed mb-8">
              Nous développons des solutions innovantes pour optimiser la gestion des services de santé et améliorer l'expérience patient.
            </p>
            <Button size="lg" variant="default" className="bg-sky-500 hover:bg-sky-600">
              Découvrir nos solutions
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl font-bold text-slate-900">
                Des solutions sur mesure pour votre établissement
                <span className="text-sky-500">.</span>
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                Notre équipe d'experts développe des applications web et mobiles adaptées aux besoins spécifiques de votre établissement de santé.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-sky-100">
                    <Code className="h-5 w-5 text-sky-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">Applications Web</h3>
                    <p className="text-slate-600">Interfaces intuitives et performantes</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-sky-100">
                    <Database className="h-5 w-5 text-sky-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">Gestion des Données</h3>
                    <p className="text-slate-600">Solutions sécurisées et conformes RGPD</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-sky-100">
                    <Globe className="h-5 w-5 text-sky-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">Intégration API</h3>
                    <p className="text-slate-600">Connexion avec vos systèmes existants</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-sky-500 to-sky-600 rounded-2xl transform rotate-3 opacity-10"></div>
              <Card className="relative p-8 border-0 shadow-xl bg-white">
                <div className="space-y-6">
                  <Shield className="h-12 w-12 text-sky-500" />
                  <h3 className="text-2xl font-bold text-slate-900">Sécurité & Conformité</h3>
                  <p className="text-slate-600">
                    Nos solutions respectent les plus hauts standards de sécurité et de protection des données de santé.
                  </p>
                  <ul className="space-y-3">
                    {["Chiffrement des données", "Authentification sécurisée", "Sauvegarde automatique", "Conformité RGPD"].map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-sky-500" />
                        <span className="text-slate-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-slate-50">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">
              Prêt à digitaliser vos services
              <span className="text-sky-500">?</span>
            </h2>
            <p className="text-lg text-slate-600 mb-8">
              Contactez-nous pour découvrir comment nos solutions numériques peuvent transformer votre établissement de santé.
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" className="bg-sky-500 hover:bg-sky-600">
                Demander une démo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                En savoir plus
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Digital;