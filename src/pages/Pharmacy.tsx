import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PharmacyCard from "@/components/dashboard/Pharmacy/PharmacyCard";
import { Building2, Search, MapPin, Clock, AlertCircle } from "lucide-react";
import { usePharmacyRedux } from "@/hooks/use-pharmacy-redux";
import useScrollToTop from "@/hooks/useScrollToTop";
import "../styles/pharmacy.css";

const Pharmacy: React.FC = () => {
  // Défilement automatique vers le haut lors du chargement de la page
  useScrollToTop();

  // État local pour gérer le terme de recherche et le nombre de pharmacies affichées
  const [searchTerm, setSearchTerm] = useState("");
  const [displayCount, setDisplayCount] = useState(12);
  const [activeTab, setActiveTab] = useState("all");

  // Récupération des données depuis le store Redux
  const { getPharmacies, pharmacies, isLoading } = usePharmacyRedux();

  // Charger les pharmacies au premier rendu du composant
  useEffect(() => {
    getPharmacies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Mettre à jour le terme de recherche
  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  // Filtrer les pharmacies en fonction du terme de recherche
  const filteredPharmacies = pharmacies.filter(
    (pharmacy) =>
      pharmacy.nom_pharmacie.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pharmacy.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pharmacy.province.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pharmacy.commune.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pharmacy.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pharmacy.district.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sélectionner les pharmacies à afficher
  const displayedPharmacies = filteredPharmacies.slice(0, displayCount);

  // Déterminer s'il y a d'autres pharmacies à afficher
  const hasMore = displayedPharmacies.length < filteredPharmacies.length;

  // Pharmacies de garde
  const dutyPharmacies = filteredPharmacies.filter((pharmacy) => pharmacy.de_garde);
  const displayedDutyPharmacies = dutyPharmacies.slice(0, displayCount);
  const hasMoreDuty = displayedDutyPharmacies.length < dutyPharmacies.length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50/30 pharmacy-pattern">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-r from-meddoc-primary/90 to-meddoc-secondary/90 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pharmacy-pattern.svg')] opacity-10"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -ml-48 -mt-48 animate-float"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-48 -mb-48 animate-float" style={{ animationDelay: '2s' }}></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
              Trouvez votre pharmacie
            </h1>
            <p className="text-lg sm:text-xl text-white/90 mb-8 sm:mb-10 max-w-2xl mx-auto">
              Localisez facilement les pharmacies à Madagascar et accédez aux informations sur les pharmacies de garde
            </p>

            <div className="relative max-w-2xl mx-auto bg-white/10 backdrop-blur-sm p-1 rounded-xl search-bar-container">
              <Input
                type="text"
                placeholder="Rechercher par nom, adresse, province ou région..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-12 py-6 text-base bg-white border-0 shadow-lg rounded-lg focus:ring-2 focus:ring-white/50 text-gray-800"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 bg-white shadow-md relative z-10 -mt-8 rounded-t-3xl">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center stat-card animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-blue-50 text-meddoc-primary animate-pulse-subtle">
                  <Building2 className="h-6 w-6" />
                </div>
                <h3 className="text-3xl font-bold text-gray-800">{pharmacies.length}</h3>
                <p className="text-gray-500">Pharmacies</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center stat-card animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-blue-50 text-meddoc-primary animate-pulse-subtle">
                  <Clock className="h-6 w-6" />
                </div>
                <h3 className="text-3xl font-bold text-gray-800">{dutyPharmacies.length}</h3>
                <p className="text-gray-500">Pharmacies de garde</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center stat-card animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-blue-50 text-meddoc-primary animate-pulse-subtle">
                  <MapPin className="h-6 w-6" />
                </div>
                <h3 className="text-3xl font-bold text-gray-800">
                  {new Set(pharmacies.map(p => p.province)).size}
                </h3>
                <p className="text-gray-500">Provinces</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <Tabs
              defaultValue="all"
              className="w-full custom-tabs"
              onValueChange={(value) => {
                setActiveTab(value);
                // Reset display count when switching tabs
                setDisplayCount(12);
              }}
            >
              {/* Tabs Navigation */}
              <div className="flex justify-center mb-10 animate-fade-in">
                <TabsList className="grid w-full max-w-md grid-cols-2 p-1 bg-blue-50 rounded-xl">
                  <TabsTrigger
                    value="all"
                    className="px-8 py-3 rounded-lg data-[state=active]:bg-white data-[state=active]:text-meddoc-primary data-[state=active]:shadow-sm"
                  >
                    Toutes les pharmacies
                  </TabsTrigger>
                  <TabsTrigger
                    value="duty"
                    className="px-8 py-3 rounded-lg data-[state=active]:bg-white data-[state=active]:text-meddoc-primary data-[state=active]:shadow-sm"
                  >
                    Pharmacies de garde
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* Loading State */}
              {isLoading ? (
                <div className="mt-12 text-center animate-fade-in">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-meddoc-primary mx-auto"></div>
                  <p className="text-gray-500 mt-4">Chargement des pharmacies...</p>
                </div>
              ) : (
                <>
                  {/* All Pharmacies Tab */}
                  <TabsContent value="all" className="mt-6 animate-fade-in">
                    <div className="flex flex-col items-center">
                      {filteredPharmacies.length > 0 ? (
                        <>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                            {displayedPharmacies.map((pharmacy, index) => (
                              <div
                                key={pharmacy.id}
                                className="w-full pharmacy-card animate-fade-in"
                                style={{ animationDelay: `${0.05 * (index % 6)}s` }}
                              >
                                <PharmacyCard pharmacy={pharmacy} />
                              </div>
                            ))}
                          </div>

                          {/* Load More Button */}
                          {hasMore && (
                            <div className="flex justify-center mt-12 animate-fade-in">
                              <button
                                onClick={() => setDisplayCount((prev) => prev + 12)}
                                className="px-8 py-3 bg-white border border-meddoc-primary text-meddoc-primary rounded-lg hover:bg-meddoc-primary hover:text-white transition-colors duration-300 shadow-sm font-medium btn-primary"
                              >
                                Voir plus de pharmacies
                              </button>
                            </div>
                          )}
                        </>
                      ) : (
                        // Empty State
                        <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100 w-full empty-state animate-fade-in">
                          <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                          <h3 className="text-xl font-semibold text-gray-800 mb-2">Aucune pharmacie trouvée</h3>
                          <p className="text-gray-500 max-w-md mx-auto">
                            Nous n'avons trouvé aucune pharmacie correspondant à votre recherche. Veuillez essayer avec d'autres termes.
                          </p>
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  {/* Duty Pharmacies Tab */}
                  <TabsContent value="duty" className="mt-6 animate-fade-in">
                    <div className="flex flex-col items-center">
                      {dutyPharmacies.length > 0 ? (
                        <>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                            {displayedDutyPharmacies.map((pharmacy, index) => (
                              <div
                                key={pharmacy.id}
                                className="w-full pharmacy-card animate-fade-in"
                                style={{ animationDelay: `${0.05 * (index % 6)}s` }}
                              >
                                <PharmacyCard pharmacy={pharmacy} />
                              </div>
                            ))}
                          </div>

                          {/* Load More Button */}
                          {hasMoreDuty && (
                            <div className="flex justify-center mt-12 animate-fade-in">
                              <button
                                onClick={() => setDisplayCount((prev) => prev + 12)}
                                className="px-8 py-3 bg-white border border-meddoc-primary text-meddoc-primary rounded-lg hover:bg-meddoc-primary hover:text-white transition-colors duration-300 shadow-sm font-medium btn-primary"
                              >
                                Voir plus de pharmacies de garde
                              </button>
                            </div>
                          )}
                        </>
                      ) : (
                        // Empty State for Duty Pharmacies
                        <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100 w-full empty-state animate-fade-in">
                          <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                          <h3 className="text-xl font-semibold text-gray-800 mb-2">Aucune pharmacie de garde trouvée</h3>
                          <p className="text-gray-500 max-w-md mx-auto">
                            Nous n'avons trouvé aucune pharmacie de garde correspondant à votre recherche. Veuillez essayer avec d'autres termes.
                          </p>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </>
              )}
            </Tabs>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-12 bg-gradient-to-br from-blue-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">Informations importantes</h2>
            <p className="text-gray-600 mb-8">
              Les informations sur les pharmacies de garde sont mises à jour régulièrement.
              Nous vous recommandons de contacter la pharmacie avant de vous y rendre pour confirmer ses horaires d'ouverture.
            </p>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 inline-block duty-badge">
              <div className="flex items-center justify-center">
                <AlertCircle className="h-5 w-5 text-amber-500 mr-2" />
                <p className="text-gray-700 font-medium">
                  En cas d'urgence, appelez le 18 ou le 17
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pharmacy;
