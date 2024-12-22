import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import {
  fetchAmbulances,
  addAmbulance,
  updateAmbulance,
  deleteAmbulance,
  setCurrentAmbulance,
  setAddAmbulanceOpen,
  setEditAmbulanceOpen,
  setRemoveAmbulanceOpen,
  setIsLoading,
  setError,
  //   Ambulance,
} from "@/store/ambulanceSlice";

export const useAmbulanceRedux = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    ambulances,
    currentAmbulance,
    loading,
    error,
    isAddAmbulanceOpen,
    isEditAmbulanceOpen,
    isRemoveAmbulanceOpen,
  } = useSelector((state: RootState) => state.ambulance);

  const getAmbulances = () => {
    dispatch(fetchAmbulances());
  };

  const setIsLoadingData = (val: boolean) => {
    dispatch(setIsLoading(val));
  };

  const selectCurrentAmbulance = (newCurrent: Ambulance) => {
    dispatch(setCurrentAmbulance(newCurrent));
  };

  const showAddAmbulanceModal = (value: boolean) => {
    dispatch(setAddAmbulanceOpen(value));
  };

  const showEditAmbulanceModal = (value: boolean) => {
    dispatch(setEditAmbulanceOpen(value));
  };

  const showRemoveAmbulanceModal = (value: boolean) => {
    dispatch(setRemoveAmbulanceOpen(value));
  };

  const setErrorMessage = (value: string) => {
    dispatch(setError(value));
  };

  const handleAddAmbulance = async (
    newAmbulance: Partial<Omit<Ambulance, "id">>
  ) => {
    try {
      setIsLoadingData(true);
      await dispatch(addAmbulance(newAmbulance)).unwrap();
      dispatch(fetchAmbulances());
    } catch (error) {
      console.error("Error adding ambulance:", error);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Erreur lors de l'ajout du partenaire."
      );
      throw error;
    } finally {
      setIsLoadingData(false);
      showAddAmbulanceModal(false);
    }
  };

  const handleUpdateAmbulance = async (
    id: number,
    ambulance: Partial<Omit<Ambulance, "id">>
  ) => {
    try {
      setIsLoadingData(true);

      const updatedAmbulance = {
        ...ambulance,
        province: ambulance.province || "", // add default value if province is optional
        region: ambulance.region || "", // add default value if region is optional
        district: ambulance.district || "", // add default value if district is optional
        address: ambulance.address || "", // add default value if address is optional
        commune: ambulance.commune || "", // add default value if commune is optional
        contacts: ambulance.contacts || [], // add default value if contacts is optional
        nom: ambulance.nom || "", // add default value if nom is optional
      };

      await dispatch(
        updateAmbulance({ id, ambulance: updatedAmbulance })
      ).unwrap();
      dispatch(fetchAmbulances());
    } catch (error) {
      console.error("Error updating ambulance:", error);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Erreur lors de mise a jours du partenaire."
      );
    } finally {
      setIsLoadingData(false);
      showEditAmbulanceModal(false);
    }
  };

  const handleDeleteAmbulance = async (id: number) => {
    try {
      setIsLoadingData(true);
      await dispatch(deleteAmbulance(id)).unwrap();
      getAmbulances();
      selectCurrentAmbulance(null);
    } catch (error) {
      console.error("Error deleting ambulance:", error);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Erreur lors de la suppression du partenaire."
      );
    } finally {
      setIsLoadingData(false);
      showRemoveAmbulanceModal(false);
    }
  };

  return {
    ambulances,
    currentAmbulance,
    selectCurrentAmbulance,
    loading,
    error,
    isAddAmbulanceOpen,
    isEditAmbulanceOpen,
    isRemoveAmbulanceOpen,
    getAmbulances,
    handleAddAmbulance,
    handleUpdateAmbulance,
    handleDeleteAmbulance,
    showAddAmbulanceModal,
    showEditAmbulanceModal,
    showRemoveAmbulanceModal,
  };
};
