import { useState, useCallback } from 'react';
import { Pharmacy } from '@/types';
import { pharmacyService } from '@/services/pharmacyService';
import { toast } from '@/components/ui/use-toast';

export const usePharmacies = () => {
  const [data, setData] = useState<Pharmacy[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingPharmacy, setEditingPharmacy] = useState<Pharmacy | null>(null);
  const [search, setSearch] = useState("");
  const [filterDeGarde, setFilterDeGarde] = useState<boolean | null>(null);

  const fetchPharmacies = useCallback(async () => {
    try {
      const pharmacies = await pharmacyService.getPharmacies();
      setData(pharmacies);
    } catch (error) {
      console.error("Error fetching pharmacies:", error);
      toast({
        title: "Erreur",
        description: "Impossible de récupérer les pharmacies",
        duration: 3000,
      });
    }
  }, []);

  const handleDelete = useCallback(async (id: number) => {
    try {
      await pharmacyService.deletePharmacy(id);
      setData(data => data.filter((item) => item.id !== id));
      toast({
        title: "Pharmacie supprimée",
        description: "La pharmacie a été supprimée avec succès",
        duration: 3000,
      });
    } catch (error) {
      console.error("Error deleting pharmacy:", error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer la pharmacie",
        duration: 3000,
      });
    }
  }, []);

  const handleEdit = useCallback((pharmacy: Pharmacy) => {
    setEditingPharmacy(pharmacy);
    setIsEditDialogOpen(true);
  }, []);

  const handleUpdatePharmacy = useCallback(async (updatedData: Pharmacy) => {
    try {
      if (!updatedData.id) {
        throw new Error("ID de la pharmacie manquant");
      }
      
      await pharmacyService.updatePharmacy(
        updatedData.id,
        {
          nom_pharmacie: updatedData.nom_pharmacie,
          photo_profil: updatedData.photo_profil,
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
      
      setData(data => data.map(item => item.id === updatedData.id ? updatedData : item));
      setIsEditDialogOpen(false);
      setEditingPharmacy(null);
      toast({
        title: "Pharmacie modifiée",
        description: "Les modifications ont été enregistrées avec succès",
        duration: 3000,
      });
    } catch (error) {
      console.error("Error updating pharmacy:", error);
      toast({
        title: "Erreur",
        description: "Impossible de modifier la pharmacie",
        duration: 3000,
      });
    }
  }, []);

  const handleAddPharmacy = useCallback(async (newData: Pharmacy) => {
    try {
      const pharmacyData = {
        nom_pharmacie: newData.nom_pharmacie,
        photo_profil: newData.photo_profil,
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
      
      fetchPharmacies();
      setIsAddDialogOpen(false);
      toast({
        title: "Nouvelle pharmacie",
        description: "La pharmacie a été ajoutée avec succès",
        duration: 3000,
      });
    } catch (error) {
      console.error("Error adding pharmacy:", error);
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter la pharmacie",
        duration: 3000,
      });
    }
  }, [fetchPharmacies]);

  const filteredData = data.filter((item) => {
    const matchesSearch = item.nom_pharmacie.toLowerCase().includes(search.toLowerCase()) ||
      item.address.toLowerCase().includes(search.toLowerCase());

    if (filterDeGarde === null) return matchesSearch;
    return matchesSearch && item.de_garde === filterDeGarde;
  });

  return {
    data: filteredData,
    isAddDialogOpen,
    setIsAddDialogOpen,
    isEditDialogOpen,
    setIsEditDialogOpen,
    editingPharmacy,
    search,
    setSearch,
    filterDeGarde,
    setFilterDeGarde,
    handleDelete,
    handleEdit,
    handleUpdatePharmacy,
    handleAddPharmacy,
    fetchPharmacies
  };
};
