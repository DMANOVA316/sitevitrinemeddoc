import PharmacyCard from "@/components/dashboard/Pharmacy/PharmacyCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ScrollToTopButton from "@/components/ui/scroll-to-top-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePharmacyRedux } from "@/hooks/use-pharmacy-redux";
import useScrollToTop from "@/hooks/useScrollToTop";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import {
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Clock,
  MoreHorizontal,
  Search,
} from "lucide-react";
import { useEffect, useState } from "react";
import "../styles/pharmacy.css";

const Pharmacy: React.FC = () => {
  // Défilement automatique vers le haut lors du chargement de la page
  useScrollToTop();

  // État local pour gérer le terme de recherche, les filtres et la pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [filters, setFilters] = useState({
    province: "",
  });
  const [showFilters, setShowFilters] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);

  // Récupération des données depuis le store Redux
  const { getPharmacies, pharmacies, isLoading } = usePharmacyRedux();

  // Charger les pharmacies au premier rendu du composant
  useEffect(() => {
    getPharmacies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Réinitialiser la page courante lors d'une recherche ou changement de filtre
  useEffect(() => {
    console.log(
      "Search term, active tab or filters changed - resetting to page 1",
    );
    setCurrentPage(1);
  }, [searchTerm, activeTab, filters]);

  // Effet pour surveiller les changements de filtres
  useEffect(() => {
    console.log("Current filters:", filters);

    // Vérifier si les filtres sont appliqués correctement
    const checkFilters = () => {
      const filteredCount = pharmacies.filter((pharmacy) => {
        // Filtrage par province
        const matchesProvince =
          filters.province === "" ||
          (pharmacy.province && pharmacy.province === filters.province);

        return matchesProvince;
      }).length;

      console.log(
        `Filtered pharmacies count: ${filteredCount} out of ${pharmacies.length}`,
      );
    };

    if (pharmacies.length > 0) {
      checkFilters();
    }
  }, [filters, pharmacies]);

  // Mettre à jour le terme de recherche
  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  // Mettre à jour les filtres
  const handleFilterChange = (
    filterName: keyof typeof filters,
    value: string,
  ) => {
    console.log(`Changing filter ${filterName} to "${value}"`);
    setFilters((prev) => {
      const newFilters = {
        ...prev,
        [filterName]: value,
      };
      console.log("New filters:", newFilters);
      return newFilters;
    });
  };

  // Réinitialiser tous les filtres
  const resetFilters = () => {
    console.log("Resetting all filters");
    setFilters({
      province: "",
    });
    setSearchTerm("");
    console.log("Filters reset complete");
  };

  // Extraire les options uniques pour chaque filtre
  const getUniqueFilterOptions = () => {
    const provinces = new Set<string>();

    // Parcourir toutes les pharmacies pour extraire les valeurs uniques
    pharmacies.forEach((pharmacy) => {
      // Vérifier que la pharmacie et ses propriétés existent
      if (pharmacy) {
        // Ajouter seulement les valeurs non vides
        if (pharmacy.province && pharmacy.province.trim() !== "") {
          provinces.add(pharmacy.province.trim());
        }
      }
    });

    // Convertir les ensembles en tableaux triés
    return {
      provinces: Array.from(provinces).sort((a, b) => a.localeCompare(b)),
    };
  };

  const filterOptions = getUniqueFilterOptions();

  // Filtrer les pharmacies en fonction du terme de recherche et des filtres
  const filteredPharmacies = pharmacies.filter((pharmacy) => {
    // Vérifier si la pharmacie a toutes les propriétés nécessaires
    if (!pharmacy) return false;

    // Filtrage par terme de recherche
    const matchesSearchTerm =
      searchTerm === "" ||
      (pharmacy.nom_pharmacie &&
        pharmacy.nom_pharmacie
          .toLowerCase()
          .includes(searchTerm.toLowerCase())) ||
      (pharmacy.address &&
        pharmacy.address.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (pharmacy.province &&
        pharmacy.province.toLowerCase().includes(searchTerm.toLowerCase()));

    // Filtrage par province
    const matchesProvince =
      filters.province === "" ||
      (pharmacy.province && pharmacy.province === filters.province);

    // Retourner true seulement si tous les critères sont satisfaits
    return matchesSearchTerm && matchesProvince;
  });

  // Date actuelle pour vérifier si une pharmacie est de garde
  const now = new Date().toISOString();

  // Pharmacies de garde (uniquement celles qui sont actuellement de garde selon les dates)
  const dutyPharmacies = filteredPharmacies.filter(
    (pharmacy) =>
      pharmacy.garde &&
      new Date(pharmacy.garde.date_debut) <= new Date(now) &&
      new Date(pharmacy.garde.date_fin) >= new Date(now),
  );

  // Déterminer le tableau de pharmacies à utiliser en fonction de l'onglet actif
  const currentPharmacies =
    activeTab === "all" ? filteredPharmacies : dutyPharmacies;

  // Calculer le nombre total de pages
  const totalPages = Math.ceil(currentPharmacies.length / itemsPerPage);

  // Calculer les indices de début et de fin pour la pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Obtenir les pharmacies pour la page courante
  const currentItems = currentPharmacies.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  // Fonction pour changer de page
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Défilement vers le haut de la section des résultats
    document
      .getElementById("pharmacy-results")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
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
        <div
          className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-48 -mb-48 animate-float"
          style={{ animationDelay: "2s" }}
        ></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
              Trouvez votre pharmacie
            </h1>
            <p className="text-lg sm:text-xl text-white/90 mb-8 sm:mb-10 max-w-2xl mx-auto">
              Localisez facilement les pharmacies à Madagascar et accédez aux
              informations sur les pharmacies de garde
            </p>

            <div className="max-w-4xl mx-auto">
              {/* Barre de recherche avec bouton de filtre */}
              <div className="relative bg-white/10 backdrop-blur-sm p-1 rounded-xl search-bar-container mb-4">
                <div className="flex">
                  <div className="relative flex-grow">
                    <Input
                      type="text"
                      placeholder="Rechercher par nom, adresse..."
                      value={searchTerm}
                      onChange={(e) => handleSearch(e.target.value)}
                      className="pl-12 py-6 text-base bg-white border-0 shadow-lg rounded-l-lg focus:ring-2 focus:ring-white/50 text-gray-800 pr-4"
                    />
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                  </div>
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className={`px-4 py-2 bg-white text-gray-700 font-medium rounded-r-lg border-l border-gray-100 hover:bg-gray-50 transition-colors flex items-center ${
                      showFilters ? "bg-blue-50 text-meddoc-primary" : ""
                    } ${
                      filters.province ? "ring-2 ring-meddoc-primary/20" : ""
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                      />
                    </svg>
                    Filtres
                    {filters.province && (
                      <span className="ml-2 bg-meddoc-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {Object.values(filters).filter(Boolean).length}
                      </span>
                    )}
                    {isFiltering && (
                      <svg
                        className="animate-spin ml-2 h-4 w-4 text-meddoc-primary"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Panneau de filtres */}
              {showFilters && (
                <div className="bg-white rounded-xl shadow-lg p-6 mb-6 animate-fade-in max-w-2xl mx-auto">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
                    <div className="text-center sm:text-left">
                      <h3 className="text-lg font-semibold text-gray-800 mb-1">
                        Filtrer par ville
                      </h3>
                      <p className="text-sm text-gray-500">
                        Sélectionnez une ville pour affiner votre recherche
                      </p>
                    </div>
                    <button
                      onClick={resetFilters}
                      className="text-sm text-meddoc-primary hover:text-meddoc-primary/80 hover:underline flex items-center justify-center sm:justify-start transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                      </svg>
                      Réinitialiser
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div className="max-w-md mx-auto">
                      <label className="block text-sm font-medium text-gray-700 mb-2 text-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 inline-block mr-2 text-meddoc-primary"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        Choisir une ville
                      </label>
                      <select
                        value={filters.province}
                        onChange={(e) => {
                          const value = e.target.value;
                          console.log("Province select changed to:", value);
                          handleFilterChange("province", value);
                        }}
                        className="w-full rounded-lg border border-gray-200 shadow-sm focus:border-meddoc-primary focus:ring-2 focus:ring-meddoc-primary/20 text-base py-3 px-4 text-meddoc-fonce bg-white transition-all duration-200 hover:border-gray-300"
                      >
                        <option value="" className="text-meddoc-fonce">
                          🌍 Toutes les villes
                        </option>
                        {filterOptions.provinces.map((province) => (
                          <option
                            key={province}
                            value={province}
                            className="text-meddoc-fonce"
                          >
                            📍 {province}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Action Buttons - Simplified */}
                    <div className="flex justify-center gap-3 pt-2">
                      <button
                        onClick={() => {
                          setIsFiltering(true);
                          resetFilters();
                          setTimeout(() => {
                            setIsFiltering(false);
                          }, 500);
                        }}
                        className="px-6 py-2.5 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                        disabled={isFiltering}
                      >
                        Effacer
                      </button>
                      <button
                        onClick={() => {
                          console.log("Applying filters:", filters);
                          setIsFiltering(true);
                          setFilters({ ...filters });
                          setTimeout(() => {
                            setIsFiltering(false);
                          }, 500);
                        }}
                        className="px-6 py-2.5 text-white bg-meddoc-primary hover:bg-meddoc-primary/90 rounded-lg text-sm font-medium transition-colors flex items-center disabled:opacity-50"
                        disabled={isFiltering}
                      >
                        {isFiltering ? (
                          <>
                            <svg
                              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Filtrage...
                          </>
                        ) : (
                          <>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 mr-2"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                              />
                            </svg>
                            Appliquer
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Active Filter Display */}
                  {filters.province && (
                    <div className="mt-6 pt-4 border-t border-gray-100">
                      <div className="text-center">
                        <div className="text-sm text-gray-500 mb-3">
                          Filtre actif:
                        </div>
                        <div className="inline-flex items-center bg-gradient-to-r from-blue-50 to-indigo-50 text-meddoc-primary px-4 py-2 rounded-full text-sm font-medium border border-blue-100">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          Ville: {filters.province}
                          <button
                            onClick={() => handleFilterChange("province", "")}
                            className="ml-3 text-meddoc-primary/70 hover:text-meddoc-primary transition-colors"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
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
                  <p className="text-gray-500 mt-4">
                    Chargement des pharmacies...
                  </p>
                </div>
              ) : (
                <>
                  {/* Shared Content for Both Tabs */}
                  <TabsContent
                    value="all"
                    className="mt-6 animate-fade-in"
                    id="pharmacy-results"
                  >
                    <div className="flex flex-col items-center">
                      {filteredPharmacies.length > 0 ? (
                        <>
                          {/* Results Summary */}
                          <div className="w-full mb-6">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                              <p className="text-gray-600">
                                Affichage de{" "}
                                <span className="font-medium text-gray-800">
                                  {indexOfFirstItem + 1}-
                                  {Math.min(
                                    indexOfLastItem,
                                    filteredPharmacies.length,
                                  )}
                                </span>{" "}
                                sur{" "}
                                <span className="font-medium text-gray-800">
                                  {filteredPharmacies.length}
                                </span>{" "}
                                pharmacies
                              </p>
                              <div className="flex items-center space-x-2">
                                <span className="text-sm text-gray-600">
                                  Pharmacies par page:
                                </span>
                                <select
                                  className="bg-white border border-gray-200 rounded-md text-sm px-2 py-1 text-meddoc-fonce"
                                  value={itemsPerPage}
                                  onChange={(e) => {
                                    setItemsPerPage(Number(e.target.value));
                                    setCurrentPage(1);
                                  }}
                                >
                                  <option
                                    value={12}
                                    className="text-meddoc-fonce"
                                  >
                                    12
                                  </option>
                                  <option
                                    value={24}
                                    className="text-meddoc-fonce"
                                  >
                                    24
                                  </option>
                                  <option
                                    value={36}
                                    className="text-meddoc-fonce"
                                  >
                                    36
                                  </option>
                                </select>
                              </div>
                            </div>

                            {/* Filtres actifs */}
                            {filters.province && (
                              <div className="mt-4 pt-4 border-t border-gray-100">
                                <div className="flex flex-wrap items-center gap-2">
                                  <span className="text-sm text-gray-500">
                                    Filtres actifs:
                                  </span>
                                  {filters.province && (
                                    <div className="bg-blue-50 text-meddoc-primary px-3 py-1 rounded-full text-sm flex items-center">
                                      Ville: {filters.province}
                                      <button
                                        onClick={() =>
                                          handleFilterChange("province", "")
                                        }
                                        className="ml-2 text-meddoc-primary/70 hover:text-meddoc-primary"
                                      >
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          className="h-4 w-4"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          stroke="currentColor"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                          />
                                        </svg>
                                      </button>
                                    </div>
                                  )}

                                  <button
                                    onClick={resetFilters}
                                    className="text-sm text-meddoc-primary hover:underline flex items-center"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-4 w-4 mr-1"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                      />
                                    </svg>
                                    Réinitialiser
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Pharmacy Grid */}
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                            {currentItems.map((pharmacy, index) => (
                              <div
                                key={pharmacy.id}
                                className="w-full pharmacy-card animate-fade-in"
                                style={{
                                  animationDelay: `${0.05 * (index % 6)}s`,
                                }}
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
                                  {getPageNumbers().map((number, index) =>
                                    number === "ellipsis" ? (
                                      <div
                                        key={`ellipsis-${index}`}
                                        className="h-10 w-10 flex items-center justify-center text-gray-500"
                                      >
                                        <MoreHorizontal className="h-5 w-5" />
                                      </div>
                                    ) : (
                                      <Button
                                        key={`page-${number}`}
                                        variant={
                                          currentPage === number
                                            ? "default"
                                            : "outline"
                                        }
                                        onClick={() =>
                                          paginate(number as number)
                                        }
                                        className={`h-10 w-10 rounded-lg ${
                                          currentPage === number
                                            ? "bg-meddoc-primary text-white hover:bg-meddoc-primary/90"
                                            : "border-gray-200 text-gray-700 hover:border-meddoc-primary hover:text-meddoc-primary"
                                        }`}
                                      >
                                        {number}
                                      </Button>
                                    ),
                                  )}
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
                          <h3 className="text-xl font-semibold text-gray-800 mb-2">
                            Aucune pharmacie trouvée
                          </h3>
                          <p className="text-gray-500 max-w-md mx-auto">
                            Nous n'avons trouvé aucune pharmacie correspondant à
                            votre recherche. Veuillez essayer avec d'autres
                            termes.
                          </p>
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  {/* Duty Pharmacies Tab */}
                  <TabsContent
                    value="duty"
                    className="mt-6 animate-fade-in"
                    id="pharmacy-results"
                  >
                    <div className="flex flex-col items-center">
                      {dutyPharmacies.length > 0 ? (
                        <>
                          {/* Grand titre avec les dates de garde */}
                          {dutyPharmacies.length > 0 &&
                            dutyPharmacies[0].garde && (
                              <div className="w-full mb-8 text-center">
                                <h1 className="text-2xl md:text-3xl font-bold text-meddoc-primary mb-2">
                                  Pharmacies de garde
                                </h1>
                                <p className="text-lg text-gray-600">
                                  Du{" "}
                                  {format(
                                    new Date(
                                      dutyPharmacies[0].garde.date_debut,
                                    ),
                                    "d MMMM yyyy",
                                    { locale: fr },
                                  )}{" "}
                                  au{" "}
                                  {format(
                                    new Date(dutyPharmacies[0].garde.date_fin),
                                    "d MMMM yyyy",
                                    { locale: fr },
                                  )}
                                </p>
                              </div>
                            )}

                          {/* Results Summary */}
                          <div className="w-full mb-6">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                              <p className="text-gray-600">
                                Affichage de{" "}
                                <span className="font-medium text-gray-800">
                                  {indexOfFirstItem + 1}-
                                  {Math.min(
                                    indexOfLastItem,
                                    dutyPharmacies.length,
                                  )}
                                </span>{" "}
                                sur{" "}
                                <span className="font-medium text-gray-800">
                                  {dutyPharmacies.length}
                                </span>{" "}
                                pharmacies de garde
                              </p>
                              <div className="flex items-center space-x-2">
                                <span className="text-sm text-gray-600">
                                  Pharmacies par page:
                                </span>
                                <select
                                  className="bg-white border border-gray-200 rounded-md text-sm px-2 py-1 text-meddoc-fonce"
                                  value={itemsPerPage}
                                  onChange={(e) => {
                                    setItemsPerPage(Number(e.target.value));
                                    setCurrentPage(1);
                                  }}
                                >
                                  <option
                                    value={12}
                                    className="text-meddoc-fonce"
                                  >
                                    12
                                  </option>
                                  <option
                                    value={24}
                                    className="text-meddoc-fonce"
                                  >
                                    24
                                  </option>
                                  <option
                                    value={36}
                                    className="text-meddoc-fonce"
                                  >
                                    36
                                  </option>
                                </select>
                              </div>
                            </div>

                            {/* Filtres actifs */}
                            {filters.province && (
                              <div className="mt-4 pt-4 border-t border-gray-100">
                                <div className="flex flex-wrap items-center gap-2">
                                  <span className="text-sm text-gray-500">
                                    Filtres actifs:
                                  </span>
                                  {filters.province && (
                                    <div className="bg-blue-50 text-meddoc-primary px-3 py-1 rounded-full text-sm flex items-center">
                                      Ville: {filters.province}
                                      <button
                                        onClick={() =>
                                          handleFilterChange("province", "")
                                        }
                                        className="ml-2 text-meddoc-primary/70 hover:text-meddoc-primary"
                                      >
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          className="h-4 w-4"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          stroke="currentColor"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                          />
                                        </svg>
                                      </button>
                                    </div>
                                  )}

                                  <button
                                    onClick={resetFilters}
                                    className="text-sm text-meddoc-primary hover:underline flex items-center"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-4 w-4 mr-1"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                      />
                                    </svg>
                                    Réinitialiser
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Pharmacy Grid */}
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                            {currentItems.map((pharmacy, index) => (
                              <div
                                key={pharmacy.id}
                                className="w-full pharmacy-card animate-fade-in"
                                style={{
                                  animationDelay: `${0.05 * (index % 6)}s`,
                                }}
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
                                  {getPageNumbers().map((number, index) =>
                                    number === "ellipsis" ? (
                                      <div
                                        key={`ellipsis-${index}`}
                                        className="h-10 w-10 flex items-center justify-center text-gray-500"
                                      >
                                        <MoreHorizontal className="h-5 w-5" />
                                      </div>
                                    ) : (
                                      <Button
                                        key={`page-${number}`}
                                        variant={
                                          currentPage === number
                                            ? "default"
                                            : "outline"
                                        }
                                        onClick={() =>
                                          paginate(number as number)
                                        }
                                        className={`h-10 w-10 rounded-lg ${
                                          currentPage === number
                                            ? "bg-meddoc-primary text-white hover:bg-meddoc-primary/90"
                                            : "border-gray-200 text-gray-700 hover:border-meddoc-primary hover:text-meddoc-primary"
                                        }`}
                                      >
                                        {number}
                                      </Button>
                                    ),
                                  )}
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
                          <h3 className="text-xl font-semibold text-gray-800 mb-2">
                            Aucune pharmacie de garde trouvée
                          </h3>
                          <p className="text-gray-500 max-w-md mx-auto">
                            Nous n'avons trouvé aucune pharmacie de garde
                            correspondant à votre recherche. Veuillez essayer
                            avec d'autres termes.
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
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
              Informations importantes
            </h2>
            <p className="text-gray-600 mb-8">
              {activeTab === "all" ? (
                <>
                  La liste des pharmacies que nous diffusons est fournie directement par les autorités compétentes. Elle est relayée uniquement à titre informatif et de service public.
                  <br /><br />
                  Nous vous recommandons de contacter la pharmacie avant de vous y rendre pour confirmer ses horaires d'ouverture.
                </>
              ) : (
                <>
                  La liste des pharmacies de garde que nous diffusons est fournie directement par les autorités compétentes. Elle est relayée uniquement à titre informatif et de service public.
                  <br /><br />
                  Nous vous recommandons de contacter la pharmacie avant de vous y rendre pour confirmer ses horaires d'ouverture.
                </>
              )}
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
