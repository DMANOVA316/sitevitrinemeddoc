import { AppDispatch, RootState } from "@/store";
import {
  setIsEditInfoModal,
  fetchInformations,
  updateInfos,
} from "@/store/infoMeddocSlice";
import { Info_page_meddoc } from "@/types";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

export default function useInfoMeddocRedux() {
  const dispatch = useDispatch<AppDispatch>();
  const { infoMeddoc, isLoading, error, isEditInformationOpen } = useSelector(
    (state: RootState) => state.infoMedoc
  );

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

  const showEditInformationModal = useCallback(
    (open: boolean) => {
      dispatch(setIsEditInfoModal(open));
    },
    [dispatch]
  );

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
            : "Erreur lors de la mise à jour des informations"
        );
      }
    },
    [dispatch, infoMeddoc]
  );

  useEffect(() => {
    getInformations();
    console.log("RENDER");
  }, [getInformations]);

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
