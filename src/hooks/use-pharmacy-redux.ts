import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import {
  fetchPharmacies,
  addPharmacy,
  updatePharmacy,
  deletePharmacy,
  setCurrentPharmacy,
  setModalState,
} from "@/store/pharmacySlice";
import {
  setAddPartnerOpen,
  setEditPartnerOpen,
  setRemovePartnerOpen,
} from "@/store/partnerSlice";

/**
 * Hook Redux pour la gestion complète des pharmacies
 * Fournit des actions CRUD et la gestion des états modaux
 */
export const usePharmacyRedux = () => {
  const dispatch = useDispatch<AppDispatch>();
  
  // Sélection de l'état global des pharmacies
  const {
    pharmacies,
    currentPharmacy,
    isLoading,
    error,
    isAddPharmacyOpen,
    isEditPharmacyOpen,
    isRemovePharmacyOpen,
  } = useSelector((state: RootState) => state.pharmacy);

  // Récupérer la liste des pharmacies
  const getPharmacies = () => {
    dispatch(fetchPharmacies());
  };

  // Gestion des modales (ouverture/fermeture)
  const showAddPharmacyModal = (open: boolean) => {
    dispatch(setModalState({ modalType: "add", isOpen: open }));
  };

  const showEditPharmacyModal = (open: boolean) => {
    dispatch(setModalState({ modalType: "edit", isOpen: open }));
  };

  const showRemovePharmacyModal = (open: boolean) => {
    dispatch(setModalState({ modalType: "remove", isOpen: open }));
  };

  // Sélectionner une pharmacie courante
  const selectCurrentPharmacy = (pharmacy: Pharmacy) => {
    dispatch(setCurrentPharmacy(pharmacy));
  };

  // Ajouter une nouvelle pharmacie avec ses contacts et horaires
  const handleAddPharmacy = async (
    pharmacyData: Omit<Pharmacy, "id" | "contacts" | "horaires">,
    contacts: Omit<PharmacyContact, "id" | "id_pharmacie">[],
    horaires: Omit<PharmacySchedule, "id" | "id_pharmacie">[],
  ) => {
    try {
      await dispatch(
        addPharmacy({ pharmacyData, contacts, horaires }),
      ).unwrap();
      dispatch(fetchPharmacies());
    } catch (error) {
      console.error("Error adding pharmacy:", error);
      throw error;
    }
  };

  // Mettre à jour une pharmacie existante
  const handleUpdatePharmacy = async (
    id: number,
    pharmacyData: Partial<Omit<Pharmacy, "id" | "contacts" | "horaires">>,
    contacts?: Omit<PharmacyContact, "id" | "id_pharmacie">[],
    horaires?: Omit<PharmacySchedule, "id" | "id_pharmacie">[],
  ) => {
    try {
      await dispatch(
        updatePharmacy({ id, pharmacyData, contacts, horaires }),
      ).unwrap();
      dispatch(fetchPharmacies());
    } catch (error) {
      console.error("Error updating pharmacy:", error);
      throw error;
    }
  };

  // Supprimer une pharmacie
  const handleDeletePharmacy = async (id: number) => {
    try {
      await dispatch(deletePharmacy(id)).unwrap();
      dispatch(fetchPharmacies());
    } catch (error) {
      console.error("Error deleting pharmacy:", error);
      throw error;
    }
  };

  // Retourne les états et actions liés aux pharmacies
  return {
    pharmacies,
    currentPharmacy,
    isLoading,
    error,
    isAddPharmacyOpen,
    isEditPharmacyOpen,
    isRemovePharmacyOpen,
    getPharmacies,
    handleAddPharmacy,
    handleUpdatePharmacy,
    handleDeletePharmacy,
    selectCurrentPharmacy,
    showAddPharmacyModal,
    showEditPharmacyModal,
    showRemovePharmacyModal,
  };
};
