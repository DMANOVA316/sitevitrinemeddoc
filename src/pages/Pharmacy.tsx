import { useState, useEffect } from "react"; // Gestion de l'état local et des effets secondaires
import { Input } from "@/components/ui/input"; // Composant d'entrée utilisateur
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; // Composants pour créer des onglets
import PharmacyCard from "@/components/dashboard/Pharmacy/PharmacyCard"; // Carte pour afficher les informations sur une pharmacie
import { Building2, Search } from "lucide-react"; // Icônes pour l'interface utilisateur
import { usePharmacyRedux } from "@/hooks/use-pharmacy-redux"; // Hook personnalisé pour gérer les données de pharmacies via Redux

/*************  ✨ Codeium Command 🌟  *************/
/**
 * Composant principal pour afficher la liste des pharmacies
 *
 * Utilise le hook usePharmacyRedux pour charger les pharmacies à partir du store Redux
 * Utilise l'effet secondaire pour charger les pharmacies au premier rendu du composant
 */

const Pharmacy: React.FC = () => {
  // État local pour gérer le terme de recherche et le nombre de pharmacies affichées
  const [searchTerm, setSearchTerm] = useState("");
  const [displayCount, setDisplayCount] = useState(10);

  // Récupération des données depuis le store Redux
  const { getPharmacies, pharmacies, isLoading } = usePharmacyRedux();

  // Charger les pharmacies au premier rendu du composant
  useEffect(() => {
    getPharmacies();
  }, []);

  /**
   * Mettre à jour le terme de recherche
   * @param term Le terme de recherche à mettre à jour
   */
  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  /**
   * Filtrer les pharmacies en fonction du terme de recherche
   */
  const filteredPharmacies = pharmacies.filter(
    (pharmacy) =>
      pharmacy.nom_pharmacie.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pharmacy.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pharmacy.province.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pharmacy.commune.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pharmacy.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pharmacy.district.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /**
   * Sélectionner les pharmacies à afficher
   */
  const displayedPharmacies = filteredPharmacies.slice(0, displayCount);

  /**
   * Déterminer s'il y a d'autres pharmacies à afficher
   */
  const hasMore = displayedPharmacies.length < filteredPharmacies.length;

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* En-tête avec champ de recherche */}
      <div className="max-w-2xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold text-meddoc-primary mb-4">
          Recherche de Pharmacies
        </h1>
        <p className="text-gray-600 mb-8">
          Trouvez facilement les pharmacies près de chez vous
        </p>
        <div className="relative max-w-xl mx-auto">
          {/* Champ de recherche */}
          <Input
            type="text"
            placeholder="Rechercher une pharmacie par nom ou par province, région ou district"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-12"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>
      </div>

      {/* Contenu principal avec onglets */}
      <div className="max-w-6xl mx-auto">
        <Tabs defaultValue="all" className="w-full">
          {/* Liste des onglets */}
          <div className="flex justify-center mb-8">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="all" className="px-8">
                Toutes les pharmacies
              </TabsTrigger>
              <TabsTrigger value="duty" className="px-8">
                Pharmacies de garde
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Affichage du contenu en fonction de l'état du chargement */}
          {isLoading ? (
            <div className="mt-12 text-center">
              {/* Indicateur de chargement */}
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-meddoc-primary mx-auto"></div>
              <p className="text-gray-500 mt-4">Chargement des pharmacies...</p>
            </div>
          ) : (
            <>
              {/* Onglet pour toutes les pharmacies */}
              <TabsContent value="all" className="mt-6">
                <div className="flex flex-col items-center">
                  {/* Grille des pharmacies */}
                  <div
                    className="grid gap-6 w-full justify-items-center"
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(min(100%, 384px), 1fr))",
                      maxWidth: "1280px",
                      margin: "0 auto",
                    }}
                  >
                    {filteredPharmacies.length > 0 ? (
                      <>
                        {displayedPharmacies.map((pharmacy) => (
                          <div
                            key={pharmacy.id}
                            className="w-full flex justify-center"
                          >
                            <PharmacyCard pharmacy={pharmacy} />
                          </div>
                        ))}
                        {/* Bouton pour charger plus de pharmacies */}
                        {hasMore && (
                          <div className="col-span-full flex justify-center mt-8">
                            <button
                              onClick={() =>
                                setDisplayCount((prev) => prev + 10)
                              }
                              className="px-6 py-2 bg-meddoc-primary text-white rounded-md hover:bg-meddoc-primary/90 transition-colors"
                            >
                              Voir plus
                            </button>
                          </div>
                        )}
                      </>
                    ) : (
                      // Message si aucune pharmacie trouvée
                      <div className="col-span-full text-center py-12">
                        <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500 text-lg">
                          Aucune pharmacie trouvée.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>

              {/* Onglet pour les pharmacies de garde */}
              <TabsContent value="duty" className="mt-6">
                <div className="flex flex-col items-center">
                  <div
                    className="grid gap-6 w-full justify-items-center"
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(min(100%, 384px), 1fr))",
                      maxWidth: "1280px",
                      margin: "0 auto",
                    }}
                  >
                    {filteredPharmacies
                      .filter((pharmacy) => pharmacy.de_garde)
                      .map((pharmacy) => (
                        <div
                          key={pharmacy.id}
                          className="w-full flex justify-center"
                        >
                          <PharmacyCard pharmacy={pharmacy} />
                        </div>
                      ))}
                  </div>
                </div>
              </TabsContent>
            </>
          )}
        </Tabs>
      </div>
    </div>
  );
};

export default Pharmacy;
