import { AppDispatch, RootState } from "@/store";
import {
  setIsEditInfoModal,
  fetchInformations,
  updateInfos,
} from "@/store/infoMeddocSlice";
import { Info_page_meddoc } from "@/types";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function useInfoMeddocRedux() {
  const dispatch = useDispatch<AppDispatch>();
  const { infoMeddoc, isLoading, error, isEditInformationOpen } = useSelector(
    (state: RootState) => state.infoMedoc,
  );

  const getInformations = () => {
    dispatch(fetchInformations());
  };

  const showEditInformationModal = (open: boolean) => {
    dispatch(setIsEditInfoModal(open));
  };

  const updateInformations = (
    newInfos: Partial<Info_page_meddoc>,
    files?: { logo: File; favicon: File },
  ) => {
    dispatch(
      updateInfos({
        id: infoMeddoc.id,
        data: newInfos,
        files: files ? files : null,
      }),
    );
  };

  useEffect(() => {
    getInformations();
  }, []);

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
