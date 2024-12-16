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

export default function useCouvertureRedux() {
  const dispatch = useDispatch<AppDispatch>();

  const { couverture, error, isLoading, isEditModalOpen } = useSelector(
    (state: RootState) => state.couverture
  );

  const getCurrentCouvertureData = useCallback(async () => {
    await dispatch(getCouvertureData());
  }, [dispatch]);

  const showEditCouvertureModal = useCallback((open: boolean) => {
    dispatch(showEditModal(open));
  }, [dispatch]);

  const setErrorMessage = useCallback((value: string) => {
    dispatch(setError(value));
  }, [dispatch]);

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
