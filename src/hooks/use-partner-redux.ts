import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import {
  fetchPartners,
  addPartner,
  updatePartner,
  deletePartner,
  setCurrentPartner,
  setAddPartnerOpen,
  setEditPartnerOpen,
  setRemovePartnerOpen,
  setIsLoading,
  setError,
} from "@/store/partnerSlice";
import { PartnerType } from "@/types";
import { uploadService } from "@/services/uploadService";
import { getFileSize } from "@/utils/fileUtils";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export const usePartnerRedux = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    partners,
    currentPartner,
    isLoading,
    error,
    isAddPartnerOpen,
    isEditPartnerOpen,
    isRemovePartnerOpen,
  } = useSelector((state: RootState) => state.partner);

  const getPartners = () => {
    dispatch(fetchPartners());
  };

  const setIsLoadingData = (val: boolean) => {
    dispatch(setIsLoading(val));
  };

  const selectCurrentPartner = (newCurrent: PartnerType) => {
    dispatch(setCurrentPartner(newCurrent));
  };

  const showAddPartnerModal = (value: boolean) => {
    dispatch(setAddPartnerOpen(value));
  };

  const showEditPartnerModal = (value: boolean) => {
    dispatch(setEditPartnerOpen(value));
  };

  const showRemovePartnerModal = (value: boolean) => {
    dispatch(setRemovePartnerOpen(value));
  };

  const setErrorMessage = (value: string) => {
    dispatch(setError(value));
  };

  const handleAddPartner = async (
    newPartner: Omit<PartnerType, "id">,
    file?: File,
  ) => {
    try {
      setIsLoadingData(true);
      if (file) {
        if (getFileSize(file) < MAX_FILE_SIZE) {
          const imageUrl = await uploadService.uploadImage(file, "partner");
          newPartner.logo = imageUrl;
        } else {
          setErrorMessage(
            `Le logo ne doit pas depasser la taille de ${MAX_FILE_SIZE / (1024 * 1024)}MB`,
          );
        }
      }
      await dispatch(addPartner(newPartner)).unwrap();
      dispatch(fetchPartners());
    } catch (error) {
      console.error("Error adding partner:", error);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Erreur lors de l'ajout du partenaire.",
      );
      throw error;
    } finally {
      setIsLoadingData(false);
      showAddPartnerModal(false);
    }
  };

  const handleUpdatePartner = async (
    id: number,
    partner: Partial<Omit<PartnerType, "id">>,
    file?: File,
  ) => {
    try {
      setIsLoadingData(true);

      let updatedPartner = { ...partner };
      if (file) {
        if (getFileSize(file) < MAX_FILE_SIZE) {
          const imageUrl = await uploadService.uploadImage(file, "partner");
          updatedPartner = { ...updatedPartner, logo: imageUrl };
        } else {
          setErrorMessage(
            `Le logo ne doit pas depasser la taille de ${MAX_FILE_SIZE / (1024 * 1024)}MB`,
          );
        }
      }

      await dispatch(updatePartner({ id, partner: updatedPartner })).unwrap();
      dispatch(fetchPartners());
    } catch (error) {
      console.error("Error updating partner:", error);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Erreur lors de mise a jours du partenaire.",
      );
    } finally {
      setIsLoadingData(false);
      showEditPartnerModal(false);
    }
  };

  const handleDeletePartner = async (id: number) => {
    try {
      setIsLoadingData(true);
      await uploadService.deleteImage(currentPartner.logo);
      await dispatch(deletePartner(id)).unwrap();
      getPartners();
      selectCurrentPartner(null);
    } catch (error) {
      console.error("Error deleting partner:", error);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Erreur lors de la suppression du partenaire.",
      );
    } finally {
      setIsLoadingData(false);
      showRemovePartnerModal(false);
    }
  };

  return {
    partners,
    currentPartner,
    selectCurrentPartner,
    isLoading,
    // setIsLoadingData,
    error,
    isAddPartnerOpen,
    isEditPartnerOpen,
    isRemovePartnerOpen,
    getPartners,
    handleAddPartner,
    handleUpdatePartner,
    handleDeletePartner,
    showAddPartnerModal,
    showEditPartnerModal,
    showRemovePartnerModal,
  };
};
