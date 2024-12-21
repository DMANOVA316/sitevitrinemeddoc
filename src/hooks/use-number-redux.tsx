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

/**
 * Hook personnalisé pour gérer l'état des numéros via Redux
 * 
 * @returns {Object} Un ensemble de méthodes et de données liées aux numéros
 * @description Fournit des fonctionnalités complètes de gestion des numéros :
 * - Chargement et récupération des numéros
 * - Gestion des modales (ajout, modification, suppression)
 * - Gestion des erreurs
 * - Sélection et manipulation des numéros
 */
export default function useNumberRedux() {
  // Obtenir la fonction dispatch de Redux pour déclencher des actions
  const dispatch = useDispatch<AppDispatch>();

  // Sélecteurs pour accéder à l'état global des numéros
  const {
    numeros,           // Liste des numéros
    isLoading,         // État de chargement
    error,             // Messages d'erreur
    currentNumber,     // Numéro actuellement sélectionné
    isAddNumberOpen,   // État de la modale d'ajout
    isEditNumberOpen,  // État de la modale d'édition
    isRemoveNumberOpen // État de la modale de suppression
  } = useSelector((state: RootState) => state.number);

  // Méthodes de gestion des états des modales
  // Contrôle l'ouverture et la fermeture des différentes modales
  const showAddNumberModal = (open: boolean) => {
    dispatch(setModalState({ modalType: "add", isOpen: open }));
  };

  const showEditNumberModal = (open: boolean) => {
    dispatch(setModalState({ modalType: "edit", isOpen: open }));
  };

  const showRemoveNumberModal = (open: boolean) => {
    dispatch(setModalState({ modalType: "remove", isOpen: open }));
  };

  // Méthode utilitaire pour définir des messages d'erreur
  const setErrorMessage = (value: string) => {
    dispatch(setError(value));
  };

  // Action : Ajouter un nouveau numéro
  // Gère la création avec une gestion d'erreur intégrée
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

  // Action : Mettre à jour un numéro existant
  // Permet des mises à jour partielles avec gestion d'erreur
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

  // Action : Récupérer tous les numéros
  const getNumbers = async () => {
    await dispatch(fetchNumbers());
  };

  // Action : Supprimer le numéro actuellement sélectionné
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

  // Action : Sélectionner un numéro comme numéro actuel
  const selectCurrentNumber = (number: Numero_meddoc | null) => {
    dispatch(setCurrentNumber(number));
  };

  // Retourne un ensemble complet de données et méthodes
  // Permet aux composants d'interagir avec l'état des numéros
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
