import { useState, useEffect } from "react";
import AddPharmacy from "@/components/dashboard/Pharmacy/AddPharmacy";
import { pharmacyService } from "@/services/pharmacyService";
import { uploadService } from "@/services/uploadService";
import { Button } from "@/components/ui/button";
import { Search, Plus, CalendarRange, Clock } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { toast } from "sonner";
import PharmacyCardDashboard from "@/components/dashboard/Pharmacy/PharmacyCardDashboard";
import PharmacyGardeManager from "@/components/dashboard/Pharmacy/PharmacyGardeManager";
import MultiPharmacyGardeManager from "@/components/dashboard/Pharmacy/MultiPharmacyGardeManager";

const PharmacyList: React.FC = () => {
  const [data, setData] = useState<Pharmacy[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isGardeManagerOpen, setIsGardeManagerOpen] = useState(false);
  const [isMultiGardeManagerOpen, setIsMultiGardeManagerOpen] = useState(false);
  const [editingPharmacy, setEditingPharmacy] = useState<Pharmacy | null>(null);
  const [selectedPharmacy, setSelectedPharmacy] = useState<Pharmacy | null>(null);

  const fetchPharmacies = async () => {
    try {
      setIsLoading(true);
      const pharmacies = await pharmacyService.getPharmacies();
      setData(pharmacies);

      // Réinitialiser la page courante si nécessaire
      if (currentPage > 1 && pharmacies.length <= (currentPage - 1) * itemsPerPage) {
        setCurrentPage(1);
      }
    } catch (error) {
      console.error("Error fetching pharmacies:", error);
      toast.error("Erreur", {
        description: "Impossible de récupérer les pharmacies",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPharmacies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const pharmacy = data.find((p) => p.id === id);
      if (pharmacy?.photo_profil) {
        try {
          await uploadService.deleteImage(pharmacy.photo_profil);
        } catch (error) {
          console.error("Error deleting image:", error);
        }
      }

      await pharmacyService.deletePharmacy(id);
      setData(data.filter((item) => item.id !== id));
      toast.success("Pharmacie supprimée", {
        description: "La pharmacie a été supprimée avec succès",
        duration: 3000,
      });
    } catch (error) {
      console.error("Error deleting pharmacy:", error);
      toast.error("Erreur", {
        description: "Impossible de supprimer la pharmacie",
        duration: 3000,
      });
    }
  };

  const handleEdit = (pharmacy: Pharmacy) => {
    // Nettoyer les contacts et horaires avant de les passer au composant AddPharmacy
    const cleanedPharmacy = {
      ...pharmacy,
      // Créer de nouveaux objets de contact sans ID
      contacts: pharmacy.contacts?.map(contact => ({ numero: contact.numero })) || [],
      // Créer de nouveaux objets d'horaire sans ID
      horaires: pharmacy.horaires?.map(horaire => ({
        heure_debut: horaire.heure_debut,
        heure_fin: horaire.heure_fin,
        jour: horaire.jour
      })) || []
    };

    console.log("Édition de la pharmacie avec contacts nettoyés:", cleanedPharmacy);
    setEditingPharmacy(cleanedPharmacy);
    setIsEditDialogOpen(true);
  };

  const handleUpdatePharmacy = async (updatedData: Pharmacy, file?: File) => {
    console.log("Début de la mise à jour de la pharmacie avec les données:", updatedData);
    try {
      if (!updatedData.id) {
        throw new Error("ID de la pharmacie manquant");
      }

      let photo_profil = updatedData.photo_profil;

      if (file) {
        try {
          console.log("Traitement de l'image...");
          // Delete old image if it exists
          if (editingPharmacy?.photo_profil) {
            await uploadService.deleteImage(editingPharmacy.photo_profil);
          }
          // Upload new image
          photo_profil = await uploadService.uploadImage(file, "pharmacy");
        } catch (error) {
          console.error("Error handling image:", error);
          toast.error("Erreur", {
            description: "Impossible de gérer l'image",
            duration: 3000,
          });
          return;
        }
      }

      // Nous n'utilisons plus le champ de_garde, la gestion des périodes de garde
      // se fait maintenant via le composant PharmacyGardeManager
      const gardeData = undefined;

      // Supprimer les champs qui ne sont pas dans la base de données
      const { assurance_sante, mutuelle_sante, ...cleanData } = updatedData;

      // S'assurer que les contacts et horaires n'ont pas d'ID
      console.log("Contacts avant nettoyage:", updatedData.contacts);
      const cleanContacts = updatedData.contacts?.map(contact => {
        console.log("Nettoyage du contact:", contact);
        return { numero: contact.numero };
      }) || [];
      console.log("Contacts après nettoyage:", cleanContacts);

      console.log("Horaires avant nettoyage:", updatedData.horaires);
      const cleanHoraires = updatedData.horaires?.map(horaire => {
        console.log("Nettoyage de l'horaire:", horaire);
        return {
          heure_debut: horaire.heure_debut,
          heure_fin: horaire.heure_fin,
          jour: horaire.jour
        };
      }) || [];
      console.log("Horaires après nettoyage:", cleanHoraires);

      // Créer un objet avec les données de la pharmacie
      const pharmacyData = {
        nom_pharmacie: cleanData.nom_pharmacie,
        photo_profil,
        address: cleanData.address,
        province: cleanData.province,
        region: cleanData.region,
        district: cleanData.district,
        commune: cleanData.commune,
        service: cleanData.service,
      };

      console.log("Appel de updatePharmacy avec:", {
        id: updatedData.id,
        pharmacyData,
        cleanContacts,
        cleanHoraires,
        gardeData
      });

      try {
        await pharmacyService.updatePharmacy(
          updatedData.id,
          pharmacyData,
          cleanContacts,
          cleanHoraires,
          gardeData
        );

        console.log("Mise à jour réussie, rafraîchissement des données...");
        // Rafraîchir les données pour avoir les informations de garde à jour
        await fetchPharmacies();
        setIsEditDialogOpen(false);
        setEditingPharmacy(null);
        toast.success("Pharmacie modifiée", {
          description: "Les modifications ont été enregistrées avec succès",
          duration: 3000,
        });
      } catch (updateError) {
        console.error("Erreur spécifique lors de la mise à jour:", updateError);
        throw updateError; // Relancer l'erreur pour qu'elle soit traitée par le bloc catch externe
      }
    } catch (error) {
      console.error("Error updating pharmacy:", error);
      if (error instanceof Error) {
        toast.error("Erreur", {
          description: `Impossible de modifier la pharmacie: ${error.message}`,
          duration: 3000,
        });
      } else {
        toast.error("Erreur", {
          description: "Impossible de modifier la pharmacie",
          duration: 3000,
        });
      }
    }
  };

  const handleAddPharmacy = async (newData: Pharmacy, file?: File) => {
    try {
      let photo_profil = newData.photo_profil;

      if (file) {
        try {
          photo_profil = await uploadService.uploadImage(file, "pharmacy");
        } catch (error) {
          console.error("Error uploading image:", error);
          toast.error("Erreur", {
            description: "Impossible d'uploader l'image",
            duration: 3000,
          });
          return;
        }
      }

      // Supprimer les champs qui ne sont pas dans la base de données
      const { assurance_sante, mutuelle_sante, ...cleanData } = newData;

      const pharmacyData = {
        nom_pharmacie: cleanData.nom_pharmacie,
        photo_profil,
        address: cleanData.address,
        province: cleanData.province,
        region: cleanData.region,
        district: cleanData.district,
        commune: cleanData.commune,
        service: cleanData.service,
      };

      // Nous n'utilisons plus le champ de_garde, la gestion des périodes de garde
      // se fait maintenant via le composant PharmacyGardeManager
      const gardeData = undefined;

      // S'assurer que les contacts et horaires n'ont pas d'ID
      const cleanContacts = newData.contacts?.map(contact => ({ numero: contact.numero })) || [];
      const cleanHoraires = newData.horaires?.map(horaire => ({
        heure_debut: horaire.heure_debut,
        heure_fin: horaire.heure_fin,
        jour: horaire.jour
      })) || [];

      await pharmacyService.addPharmacy(
        pharmacyData,
        cleanContacts,
        cleanHoraires,
        gardeData
      );

      await fetchPharmacies();
      setIsAddDialogOpen(false);
      toast.success("Nouvelle pharmacie", {
        description: "La pharmacie a été ajoutée avec succès",
        duration: 3000,
      });
    } catch (error) {
      console.error("Error adding pharmacy:", error);
      if (error instanceof Error) {
        toast.error("Erreur", {
          description: error.message,
          duration: 3000,
        });
      } else {
        toast.error("Erreur", {
          description: "Impossible d'ajouter la pharmacie",
          duration: 3000,
        });
      }
    }
  };

  const [search, setSearch] = useState("");
  const [filterDeGarde, setFilterDeGarde] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);

  const toggleDeGarde = (id: number) => {
    const pharmacy = data.find(p => p.id === id);
    if (!pharmacy) return;

    // Ouvrir le gestionnaire de périodes de garde
    setSelectedPharmacy(pharmacy);
    setIsGardeManagerOpen(true);
  };

  // Réinitialiser la page courante lors d'une recherche ou changement de filtre
  useEffect(() => {
    setCurrentPage(1);
  }, [search, filterDeGarde]);

  // Date actuelle pour vérifier si une pharmacie est de garde
  const now = new Date().toISOString();

  // Calculer le nombre de pharmacies de garde une seule fois
  const pharmaciesDeGarde = data.filter(p => {
    // Vérifier si la pharmacie a une période de garde active
    return p.garde && new Date(p.garde.date_debut) <= new Date(now) && new Date(p.garde.date_fin) >= new Date(now);
  });
  const nombrePharmaciesDeGarde = pharmaciesDeGarde.length;

  const filteredData = data.filter((item) => {
    const matchesSearch =
      item.nom_pharmacie.toLowerCase().includes(search.toLowerCase()) ||
      item.address.toLowerCase().includes(search.toLowerCase());

    // Si le filtre "De garde" est activé, ne montrer que les pharmacies de garde actuelles
    if (filterDeGarde) {
      return matchesSearch && item.garde &&
             new Date(item.garde.date_debut) <= new Date(now) &&
             new Date(item.garde.date_fin) >= new Date(now);
    }

    // Sinon, montrer toutes les pharmacies qui correspondent à la recherche
    return matchesSearch;
  });

  // Calculer le nombre total de pages
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Calculer les indices de début et de fin pour la pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Obtenir les pharmacies pour la page courante
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // Fonction pour changer de page
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="p-6">
      <div className="container mx-auto py-4 px-4 md:px-6">
        {/* Titre principal avec les dates de garde */}
        {filterDeGarde && pharmaciesDeGarde.length > 0 && (
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-center text-meddoc-primary mb-2">
              Pharmacies de garde
            </h1>
            {pharmaciesDeGarde.length > 0 && pharmaciesDeGarde[0].garde && (
              <p className="text-center text-gray-600">
                Du {format(new Date(pharmaciesDeGarde[0].garde.date_debut), "d MMMM yyyy", { locale: fr })} au {format(new Date(pharmaciesDeGarde[0].garde.date_fin), "d MMMM yyyy", { locale: fr })}
              </p>
            )}
          </div>
        )}

        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Rechercher une pharmacie..."
              className="w-full md:w-auto pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-meddoc-primary/20 focus:border-meddoc-primary"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={!filterDeGarde ? "default" : "outline"}
              onClick={() => setFilterDeGarde(false)}
              className="flex items-center gap-2"
            >
              Toutes les pharmacies
            </Button>
            <Button
              variant={filterDeGarde ? "default" : "outline"}
              onClick={() => setFilterDeGarde(true)}
              className="flex items-center gap-2"
            >
              <Clock className="h-4 w-4 mr-2" />
              De garde
              {nombrePharmaciesDeGarde > 0 && (
                <span className={`ml-2 ${filterDeGarde ? 'bg-white text-meddoc-primary' : 'bg-meddoc-primary text-white'} rounded-full px-1.5 py-0.5 text-xs font-semibold`}>
                  {nombrePharmaciesDeGarde}
                </span>
              )}
            </Button>
            <Button
              variant="outline"
              onClick={() => setIsMultiGardeManagerOpen(true)}
              className="flex items-center gap-2"
            >
              <CalendarRange className="h-4 w-4" />
              Gérer les gardes
            </Button>
            <Button
              variant="default"
              onClick={() => setIsAddDialogOpen(true)}
              className="bg-meddoc-primary hover:bg-meddoc-primary/90 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Ajouter
            </Button>
          </div>
        </div>

        {/* Affichage des résultats */}
        <div className="mt-6">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="mx-auto w-16 h-16 flex items-center justify-center mb-4">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-meddoc-primary"></div>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Chargement des pharmacies...</h3>
            </div>
          ) : filteredData.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune pharmacie trouvée</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                Aucune pharmacie ne correspond à votre recherche. Essayez de modifier vos critères de recherche.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentItems.map((pharmacy) => (
                  <PharmacyCardDashboard
                    key={pharmacy.id}
                    pharmacy={pharmacy}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                    toggleDeGarde={toggleDeGarde}
                  />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-8">
                  <nav className="flex items-center space-x-2">
                    <button
                      onClick={() => paginate(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className={`p-2 rounded-md border ${
                        currentPage === 1
                          ? "text-gray-400 border-gray-200 cursor-not-allowed"
                          : "text-gray-700 border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                      .filter(page => {
                        // Afficher les 3 premières pages, les 3 dernières pages, et les pages autour de la page courante
                        return (
                          page <= 3 ||
                          page > totalPages - 3 ||
                          Math.abs(page - currentPage) <= 1
                        );
                      })
                      .map((page, index, array) => {
                        // Ajouter des ellipses si nécessaire
                        if (index > 0 && array[index - 1] !== page - 1) {
                          return (
                            <span key={`ellipsis-${page}`} className="px-3 py-2 text-gray-500">
                              ...
                            </span>
                          );
                        }

                        return (
                          <button
                            key={page}
                            onClick={() => paginate(page)}
                            className={`px-3 py-2 rounded-md ${
                              currentPage === page
                                ? "bg-meddoc-primary text-white font-medium"
                                : "text-gray-700 hover:bg-gray-50"
                            }`}
                          >
                            {page}
                          </button>
                        );
                      })}

                    <button
                      onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className={`p-2 rounded-md border ${
                        currentPage === totalPages
                          ? "text-gray-400 border-gray-200 cursor-not-allowed"
                          : "text-gray-700 border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </nav>
                </div>
              )}

              {/* Résumé des résultats */}
              <div className="mt-4 text-center text-sm text-gray-500">
                Affichage de {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredData.length)} sur {filteredData.length} pharmacies
              </div>
            </>
          )}
        </div>

        {editingPharmacy && (
          <AddPharmacy
            pharmacy={editingPharmacy}
            onSubmit={handleUpdatePharmacy}
            isEdit={true}
            isAddDialogOpen={isEditDialogOpen}
            setIsAddDialogOpen={setIsEditDialogOpen}
          />
        )}

        <AddPharmacy
          onSubmit={handleAddPharmacy}
          isAddDialogOpen={isAddDialogOpen}
          setIsAddDialogOpen={setIsAddDialogOpen}
        />

        {selectedPharmacy && (
          <PharmacyGardeManager
            pharmacy={selectedPharmacy}
            isOpen={isGardeManagerOpen}
            onClose={() => {
              setIsGardeManagerOpen(false);
              setSelectedPharmacy(null);
            }}
            onSuccess={fetchPharmacies}
          />
        )}

        <MultiPharmacyGardeManager
          isOpen={isMultiGardeManagerOpen}
          onClose={() => setIsMultiGardeManagerOpen(false)}
          onSuccess={fetchPharmacies}
        />
      </div>
    </div>
  );
};

export default PharmacyList;
