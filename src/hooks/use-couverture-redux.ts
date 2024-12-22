import { AppDispatch, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import {
  showEditModal,
  setIsLoading,
  setError,
  editCouvertureData,
  getCouvertureData,
} from "@/store/couvertureSlice";
import { useCallback } from "react";

/**
 * Hook Redux pour la gestion des données de couverture
 * Fournit des actions de modification et de récupération
 */
export default function useCouvertureRedux() {
  const dispatch = useDispatch<AppDispatch>();

  // Sélection de l'état global de couverture
  const { couverture, error, isLoading, isEditModalOpen } = useSelector(
    (state: RootState) => state.couverture
  );

  // Récupérer les données de couverture
  const getCurrentCouvertureData = useCallback(async () => {
    await dispatch(getCouvertureData());
  }, [dispatch]);

  // Contrôler la modale d'édition
  const showEditCouvertureModal = useCallback((open: boolean) => {
    dispatch(showEditModal(open));
  }, [dispatch]);

  // Définir un message d'erreur
  const setErrorMessage = useCallback((value: string) => {
    dispatch(setError(value));
  }, [dispatch]);

  // Modifier les données du landing page
  const editLandingPage = useCallback(async (data: Partial<Couverture>) => {
    try {
      await dispatch(editCouvertureData({ data }));
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Erreur lors de la modification du landing page"
      );
    }
  }, [dispatch, setErrorMessage]);

  // Retourne les états et actions liés à la couverture
  return {
    couverture,
    error,
    isLoading,
    isEditModalOpen,
    showEditCouvertureModal,
    setErrorMessage,
    editLandingPage,
    getCurrentCouvertureData,
  };
}
