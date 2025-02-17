import { AppDispatch, RootState } from "@/store";
import {
  fetchInformations,
  setIsEditInfoModal,
  updateInfos,
} from "@/store/infoMeddocSlice";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

/**
 * Hook Redux pour la gestion des informations MeDDoc
 * Fournit des actions de récupération et de mise à jour
 */
export default function useInfoMeddocRedux() {
  const dispatch = useDispatch<AppDispatch>();

  // Sélection de l'état global des informations
  const { infoMeddoc, isLoading, error, isEditInformationOpen } = useSelector(
    (state: RootState) => state.infoMedoc
  );

  // Récupérer les informations
  const getInformations = useCallback(async () => {
    try {
      await dispatch(fetchInformations()).unwrap();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Erreur lors du chargement des informations"
      );
    }
  }, [dispatch]);

  // Contrôler la modale d'édition
  const showEditInformationModal = useCallback(
    (open: boolean) => {
      dispatch(setIsEditInfoModal(open));
    },
    [dispatch]
  );

  // Mettre à jour les informations
  const updateInformations = useCallback(
    async (
      newInfos: Partial<Info_page_meddoc>,
      files?: { logo: File; favicon: File }
    ) => {
      if (!infoMeddoc) {
        toast.error("Aucune information n'est disponible");
        return;
      }

      try {
        await dispatch(
          updateInfos({
            id: infoMeddoc.id,
            data: newInfos,
            files: files || null,
          })
        ).unwrap();
        toast.success("Informations mises à jour avec succès");
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Erreur lors de la mise à jour des informations dans hooks"
        );
      }
    },
    [dispatch, infoMeddoc]
  );

  // Charger les informations au montage du composant
  useEffect(() => {
    getInformations();
    console.log("RENDER");
  }, [getInformations]);

  // Retourne les états et actions liés aux informations
  return {
    infoMeddoc,
    isLoading,
    error,
    isEditInformationOpen,
    showEditInformationModal,
    updateInformations,
    getInformations,
  };
}
