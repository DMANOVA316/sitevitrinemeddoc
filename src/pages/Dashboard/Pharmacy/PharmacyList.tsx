import { useState, useEffect } from "react";
import AddPharmacy from "@/components/dashboard/Pharmacy/AddPharmacy";
import { pharmacyService } from "@/services/pharmacyService";
import { uploadService } from "@/services/uploadService";
import { Button } from "@/components/ui/button";
import { Clock, Search, Plus } from "lucide-react";
import { toast } from "sonner";
import PharmacyCardDashboard from "@/components/dashboard/Pharmacy/PharmacyCardDashboard";

const PharmacyList: React.FC = () => {
  const [data, setData] = useState<Pharmacy[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingPharmacy, setEditingPharmacy] = useState<Pharmacy | null>(null);

  const fetchPharmacies = async () => {
    try {
      const pharmacies = await pharmacyService.getPharmacies();
      setData(pharmacies);
    } catch (error) {
      console.error("Error fetching pharmacies:", error);
      toast.error("Erreur", {
        description: "Impossible de récupérer les pharmacies",
        duration: 3000,
      });
    }
  };

  useEffect(() => {
    fetchPharmacies();
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
    setEditingPharmacy(pharmacy);
    setIsEditDialogOpen(true);
  };

  const handleUpdatePharmacy = async (updatedData: Pharmacy, file?: File) => {
    try {
      if (!updatedData.id) {
        throw new Error("ID de la pharmacie manquant");
      }

      let photo_profil = updatedData.photo_profil;

      if (file) {
        try {
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

      await pharmacyService.updatePharmacy(
        updatedData.id,
        {
          nom_pharmacie: updatedData.nom_pharmacie,
          photo_profil,
          address: updatedData.address,
          province: updatedData.province,
          region: updatedData.region,
          district: updatedData.district,
          commune: updatedData.commune,
          service: updatedData.service,
          de_garde: updatedData.de_garde,
        },
        updatedData.contacts,
        updatedData.horaires
      );

      setData(
        data.map((item) =>
          item.id === updatedData.id ? { ...updatedData, photo_profil } : item
        )
      );
      setIsEditDialogOpen(false);
      setEditingPharmacy(null);
      toast.success("Pharmacie modifiée", {
        description: "Les modifications ont été enregistrées avec succès",
        duration: 3000,
      });
    } catch (error) {
      console.error("Error updating pharmacy:", error);
      toast.error("Erreur", {
        description: "Impossible de modifier la pharmacie",
        duration: 3000,
      });
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

      const pharmacyData = {
        nom_pharmacie: newData.nom_pharmacie,
        photo_profil,
        address: newData.address,
        province: newData.province,
        region: newData.region,
        district: newData.district,
        commune: newData.commune,
        service: newData.service,
        de_garde: newData.de_garde,
      };

      await pharmacyService.addPharmacy(
        pharmacyData,
        newData.contacts || [],
        newData.horaires || []
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
  const [filterDeGarde, setFilterDeGarde] = useState<boolean | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);

  const toggleDeGarde = (id: number) => {
    setData(
      data.map((item) =>
        item.id === id ? { ...item, de_garde: !item.de_garde } : item
      )
    );
  };

  // Réinitialiser la page courante lors d'une recherche ou changement de filtre
  useEffect(() => {
    setCurrentPage(1);
  }, [search, filterDeGarde]);

  const filteredData = data.filter((item) => {
    const matchesSearch =
      item.nom_pharmacie.toLowerCase().includes(search.toLowerCase()) ||
      item.address.toLowerCase().includes(search.toLowerCase());

    if (filterDeGarde === null) return matchesSearch;
    return matchesSearch && item.de_garde === filterDeGarde;
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
              variant={filterDeGarde === null ? "default" : "outline"}
              onClick={() => setFilterDeGarde(null)}
              className="flex items-center gap-2"
            >
              Toutes
            </Button>
            <Button
              variant={filterDeGarde === true ? "default" : "outline"}
              onClick={() => setFilterDeGarde(true)}
              className="flex items-center gap-2"
            >
              <Clock className="h-4 w-4" />
              De garde
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
          {filteredData.length === 0 ? (
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
      </div>
    </div>
  );
};

export default PharmacyList;
