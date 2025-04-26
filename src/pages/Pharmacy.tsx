import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PharmacyCard from "@/components/dashboard/Pharmacy/PharmacyCard";
import { Building2, Search, MapPin, Clock, AlertCircle, ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { usePharmacyRedux } from "@/hooks/use-pharmacy-redux";
import useScrollToTop from "@/hooks/useScrollToTop";
import "../styles/pharmacy.css";
import { Button } from "@/components/ui/button";
import ScrollToTopButton from "@/components/ui/scroll-to-top-button";

const Pharmacy: React.FC = () => {
  // Défilement automatique vers le haut lors du chargement de la page
  useScrollToTop();

  // État local pour gérer le terme de recherche et la pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  // Récupération des données depuis le store Redux
  const { getPharmacies, pharmacies, isLoading } = usePharmacyRedux();

  // Charger les pharmacies au premier rendu du composant
  useEffect(() => {
    getPharmacies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Réinitialiser la page courante lors d'une recherche
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, activeTab]);

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

  // Pharmacies de garde
  const dutyPharmacies = filteredPharmacies.filter((pharmacy) => pharmacy.de_garde);

  // Déterminer le tableau de pharmacies à utiliser en fonction de l'onglet actif
  const currentPharmacies = activeTab === "all" ? filteredPharmacies : dutyPharmacies;

  // Calculer le nombre total de pages
  const totalPages = Math.ceil(currentPharmacies.length / itemsPerPage);

  // Calculer les indices de début et de fin pour la pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Obtenir les pharmacies pour la page courante
  const currentItems = currentPharmacies.slice(indexOfFirstItem, indexOfLastItem);

  // Fonction pour changer de page
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Défilement vers le haut de la section des résultats
    document.getElementById("pharmacy-results")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Générer les numéros de page à afficher
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5; // Nombre maximum de pages à afficher

    if (totalPages <= maxPagesToShow) {
      // Si le nombre total de pages est inférieur ou égal au maximum, afficher toutes les pages
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Sinon, afficher un sous-ensemble de pages avec des ellipses
      if (currentPage <= 3) {
        // Si la page courante est proche du début
        for (let i = 1; i <= 4; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push("ellipsis");
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Si la page courante est proche de la fin
        pageNumbers.push(1);
        pageNumbers.push("ellipsis");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        // Si la page courante est au milieu
        pageNumbers.push(1);
        pageNumbers.push("ellipsis");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push("ellipsis");
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50/30 pharmacy-pattern">
      {/* Bouton de retour en haut */}
      <ScrollToTopButton />
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
                // Reset to first page when switching tabs
                setCurrentPage(1);
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
                  {/* Shared Content for Both Tabs */}
                  <TabsContent value="all" className="mt-6 animate-fade-in" id="pharmacy-results">
                    <div className="flex flex-col items-center">
                      {filteredPharmacies.length > 0 ? (
                        <>
                          {/* Results Summary */}
                          <div className="w-full mb-6 flex justify-between items-center">
                            <p className="text-gray-600">
                              Affichage de <span className="font-medium text-gray-800">{indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredPharmacies.length)}</span> sur <span className="font-medium text-gray-800">{filteredPharmacies.length}</span> pharmacies
                            </p>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm text-gray-600">Pharmacies par page:</span>
                              <select
                                className="bg-white border border-gray-200 rounded-md text-sm px-2 py-1"
                                value={itemsPerPage}
                                onChange={(e) => {
                                  setItemsPerPage(Number(e.target.value));
                                  setCurrentPage(1);
                                }}
                              >
                                <option value={12}>12</option>
                                <option value={24}>24</option>
                                <option value={36}>36</option>
                              </select>
                            </div>
                          </div>

                          {/* Pharmacy Grid */}
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                            {currentItems.map((pharmacy, index) => (
                              <div
                                key={pharmacy.id}
                                className="w-full pharmacy-card animate-fade-in"
                                style={{ animationDelay: `${0.05 * (index % 6)}s` }}
                              >
                                <PharmacyCard pharmacy={pharmacy} />
                              </div>
                            ))}
                          </div>

                          {/* Pagination */}
                          {totalPages > 1 && (
                            <div className="mt-12 flex flex-col items-center space-y-4 animate-fade-in">
                              {/* Page Info */}
                              <p className="text-sm text-gray-500">
                                Page {currentPage} sur {totalPages}
                              </p>

                              {/* Pagination Controls */}
                              <div className="flex items-center space-x-2">
                                {/* Previous Page Button */}
                                <Button
                                  variant="outline"
                                  size="icon"
                                  onClick={() => paginate(currentPage - 1)}
                                  disabled={currentPage === 1}
                                  className="h-10 w-10 rounded-lg border-gray-200 text-gray-500 hover:text-meddoc-primary hover:border-meddoc-primary disabled:opacity-50"
                                >
                                  <ChevronLeft className="h-5 w-5" />
                                </Button>

                                {/* Page Numbers */}
                                <div className="flex items-center space-x-1">
                                  {getPageNumbers().map((number, index) => (
                                    number === "ellipsis" ? (
                                      <div key={`ellipsis-${index}`} className="h-10 w-10 flex items-center justify-center text-gray-500">
                                        <MoreHorizontal className="h-5 w-5" />
                                      </div>
                                    ) : (
                                      <Button
                                        key={`page-${number}`}
                                        variant={currentPage === number ? "default" : "outline"}
                                        onClick={() => paginate(number as number)}
                                        className={`h-10 w-10 rounded-lg ${
                                          currentPage === number
                                            ? "bg-meddoc-primary text-white hover:bg-meddoc-primary/90"
                                            : "border-gray-200 text-gray-700 hover:border-meddoc-primary hover:text-meddoc-primary"
                                        }`}
                                      >
                                        {number}
                                      </Button>
                                    )
                                  ))}
                                </div>

                                {/* Next Page Button */}
                                <Button
                                  variant="outline"
                                  size="icon"
                                  onClick={() => paginate(currentPage + 1)}
                                  disabled={currentPage === totalPages}
                                  className="h-10 w-10 rounded-lg border-gray-200 text-gray-500 hover:text-meddoc-primary hover:border-meddoc-primary disabled:opacity-50"
                                >
                                  <ChevronRight className="h-5 w-5" />
                                </Button>
                              </div>
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
                  <TabsContent value="duty" className="mt-6 animate-fade-in" id="pharmacy-results">
                    <div className="flex flex-col items-center">
                      {dutyPharmacies.length > 0 ? (
                        <>
                          {/* Results Summary */}
                          <div className="w-full mb-6 flex justify-between items-center">
                            <p className="text-gray-600">
                              Affichage de <span className="font-medium text-gray-800">{indexOfFirstItem + 1}-{Math.min(indexOfLastItem, dutyPharmacies.length)}</span> sur <span className="font-medium text-gray-800">{dutyPharmacies.length}</span> pharmacies de garde
                            </p>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm text-gray-600">Pharmacies par page:</span>
                              <select
                                className="bg-white border border-gray-200 rounded-md text-sm px-2 py-1"
                                value={itemsPerPage}
                                onChange={(e) => {
                                  setItemsPerPage(Number(e.target.value));
                                  setCurrentPage(1);
                                }}
                              >
                                <option value={12}>12</option>
                                <option value={24}>24</option>
                                <option value={36}>36</option>
                              </select>
                            </div>
                          </div>

                          {/* Pharmacy Grid */}
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                            {currentItems.map((pharmacy, index) => (
                              <div
                                key={pharmacy.id}
                                className="w-full pharmacy-card animate-fade-in"
                                style={{ animationDelay: `${0.05 * (index % 6)}s` }}
                              >
                                <PharmacyCard pharmacy={pharmacy} />
                              </div>
                            ))}
                          </div>

                          {/* Pagination */}
                          {totalPages > 1 && (
                            <div className="mt-12 flex flex-col items-center space-y-4 animate-fade-in">
                              {/* Page Info */}
                              <p className="text-sm text-gray-500">
                                Page {currentPage} sur {totalPages}
                              </p>

                              {/* Pagination Controls */}
                              <div className="flex items-center space-x-2">
                                {/* Previous Page Button */}
                                <Button
                                  variant="outline"
                                  size="icon"
                                  onClick={() => paginate(currentPage - 1)}
                                  disabled={currentPage === 1}
                                  className="h-10 w-10 rounded-lg border-gray-200 text-gray-500 hover:text-meddoc-primary hover:border-meddoc-primary disabled:opacity-50"
                                >
                                  <ChevronLeft className="h-5 w-5" />
                                </Button>

                                {/* Page Numbers */}
                                <div className="flex items-center space-x-1">
                                  {getPageNumbers().map((number, index) => (
                                    number === "ellipsis" ? (
                                      <div key={`ellipsis-${index}`} className="h-10 w-10 flex items-center justify-center text-gray-500">
                                        <MoreHorizontal className="h-5 w-5" />
                                      </div>
                                    ) : (
                                      <Button
                                        key={`page-${number}`}
                                        variant={currentPage === number ? "default" : "outline"}
                                        onClick={() => paginate(number as number)}
                                        className={`h-10 w-10 rounded-lg ${
                                          currentPage === number
                                            ? "bg-meddoc-primary text-white hover:bg-meddoc-primary/90"
                                            : "border-gray-200 text-gray-700 hover:border-meddoc-primary hover:text-meddoc-primary"
                                        }`}
                                      >
                                        {number}
                                      </Button>
                                    )
                                  ))}
                                </div>

                                {/* Next Page Button */}
                                <Button
                                  variant="outline"
                                  size="icon"
                                  onClick={() => paginate(currentPage + 1)}
                                  disabled={currentPage === totalPages}
                                  className="h-10 w-10 rounded-lg border-gray-200 text-gray-500 hover:text-meddoc-primary hover:border-meddoc-primary disabled:opacity-50"
                                >
                                  <ChevronRight className="h-5 w-5" />
                                </Button>
                              </div>
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
