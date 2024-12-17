import React, { useState, useEffect } from "react";
import AddPharmacy from "@/components/Pharmacie/AddPharmacy";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { pharmacyService } from "@/services/pharmacyService";
import { uploadService } from "@/services/uploadService";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, Phone, Search, Wrench } from "lucide-react";
import { Table, TableBody, TableHead, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { usePharmacyRedux } from "@/hooks/use-pharmacy-redux";
import TableRowPharmacy from "@/components/Pharmacie/TableRowPharmacy";

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

  const toggleDeGarde = (id: number) => {
    setData(
      data.map((item) =>
        item.id === id ? { ...item, de_garde: !item.de_garde } : item
      )
    );
  };

  const filteredData = data.filter((item) => {
    const matchesSearch =
      item.nom_pharmacie.toLowerCase().includes(search.toLowerCase()) ||
      item.address.toLowerCase().includes(search.toLowerCase());

    if (filterDeGarde === null) return matchesSearch;
    return matchesSearch && item.de_garde === filterDeGarde;
  });

  return (
    <div className="p-6">
      <div className="container max-w-screen-lg mx-auto py-4 px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <div className="relative md:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Rechercher une pharmacie..."
              className="md:w-auto pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-meddoc-primary/20 focus:border-meddoc-primary"
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
          </div>
        
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full md:w-auto">Ajouter une pharmacie</Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Ajouter une nouvelle pharmacie</DialogTitle>
              </DialogHeader>
              <AddPharmacy onSubmit={handleAddPharmacy} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="relative">
        <div className="border rounded-lg overflow-x-auto">
          <Table className="w-full min-w-[600px]">
            <TableRow>
              <TableHead
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Profile
              </TableHead>
              <TableHead
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Nom
              </TableHead>
              <TableHead
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                <div className="flex items-center gap-3">
                  <Wrench className="w-5 h-5 text-gray-500" />
                  <div className="flex-1 space-y-1">Service</div>
                </div>
              </TableHead>
              <TableHead
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-gray-500" />
                  <div className="flex-1 space-y-1">Horaire</div>
                </div>
              </TableHead>
              <TableHead
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gray-500 mt-1" />
                  <div className="flex-1 space-y-1">Contact</div>
                </div>
              </TableHead>
              <TableHead
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-gray-500 mt-1" />
                  <div className="flex-1 space-y-1">Adresse</div>
                </div>
              </TableHead>
              <TableHead
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              ></TableHead>
            </TableRow>
            <TableBody className="bg-white divide-y divide-gray-200">
              {filteredData.map((item) => (
                <TableRowPharmacy
                  key={item.id}
                  pharmacy={item}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                  toggleDeGarde={toggleDeGarde}
                />
              ))}
            </TableBody>
          </Table>
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Modifier la pharmacie</DialogTitle>
              </DialogHeader>
              {editingPharmacy && (
                <AddPharmacy
                  pharmacy={editingPharmacy}
                  onSubmit={handleUpdatePharmacy}
                />
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default PharmacyList;
