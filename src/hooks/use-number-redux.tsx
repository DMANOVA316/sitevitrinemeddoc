import { AppDispatch, RootState } from "@/store";
import {
  addNumber,
  updateNumber as updateNumberAction,
  deleteNumber as deleteNumberAction,
  setModalState,
  setCurrentNumber,
  fetchNumbers,
  setError,
} from "@/store/numberSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function useNumberRedux() {
  const dispatch = useDispatch<AppDispatch>();

  // Sélecteurs pour accéder à l'état
  const {
    numeros,
    isLoading,
    error,
    currentNumber,
    isAddNumberOpen,
    isEditNumberOpen,
    isRemoveNumberOpen,
  } = useSelector((state: RootState) => state.number);

  // Gestion de l'ouverture/fermeture des modales
  const showAddNumberModal = (open: boolean) => {
    dispatch(setModalState({ modalType: "add", isOpen: open }));
  };

  const showEditNumberModal = (open: boolean) => {
    dispatch(setModalState({ modalType: "edit", isOpen: open }));
  };

  const showRemoveNumberModal = (open: boolean) => {
    dispatch(setModalState({ modalType: "remove", isOpen: open }));
  };

  const setErrorMessage = (value: string) => {
    dispatch(setError(value));
  };

  // Action : Ajouter un numéro
  const createNumber = async (newNumber: Omit<Numero_meddoc, "id">) => {
    try {
      await dispatch(addNumber(newNumber)).unwrap();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Erreur lors de l'ajout de contact",
      );
    }
  };

  // Action : Mettre à jour un numéro
  const updateNumber = async (data: Partial<Numero_meddoc>) => {
    try {
      if (currentNumber) {
        await dispatch(
          updateNumberAction({ id: currentNumber.id, data: data }),
        );
      }
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Erreur lors de la modification du contact",
      );
    } finally {
      selectCurrentNumber(null);
    }
  };

  const getNumbers = async () => {
    await dispatch(fetchNumbers());
  };

  // Action : Supprimer un numéro
  const deleteNumber = async () => {
    try {
      if (currentNumber) {
        await dispatch(deleteNumberAction(currentNumber));
      }
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Erreur lors de la suppression du contact",
      );
    } finally {
      selectCurrentNumber(null);
    }
  };

  // Action : Sélectionner un numéro actuel
  const selectCurrentNumber = (number: Numero_meddoc | null) => {
    dispatch(setCurrentNumber(number));
  };

  // Retourne les états et actions pour utilisation dans les composants
  return {
    numeros,
    isLoading,
    error,
    currentNumber,
    isAddNumberOpen,
    isEditNumberOpen,
    isRemoveNumberOpen,
    showAddNumberModal,
    showEditNumberModal,
    showRemoveNumberModal,
    createNumber,
    updateNumber,
    deleteNumber,
    selectCurrentNumber,
    getNumbers,
  };
}
