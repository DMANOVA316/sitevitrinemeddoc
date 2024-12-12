import { AppDispatch, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import {
  addSocialMedia as addSocialMediaAction,
  updateSocialMedia as updateSocialMediaAction,
  deleteSocialMedia as deleteSocialMediaAction,
  setModalState,
  setCurrentSocialMedia,
  fetchSocialMedias,
  setError,
} from "@/store/socialMediaSlice";

export default function useSocialMediaRedux() {
  const {
    socialMedias,
    isLoading,
    error,
    currentSocialMedia,
    isAddSocialMediaOpen,
    isEditSocialMediaOpen,
    isRemoveSocialMediaOpen,
  } = useSelector((state: RootState) => state.socialMedia);
  const dispatch = useDispatch<AppDispatch>();

  // Modals
  const showRemoveSocialMediaModal = (open: boolean) => {
    dispatch(setModalState({ modalType: "remove", isOpen: open }));
  };

  const showEditSocialMediaModal = (open: boolean) => {
    dispatch(setModalState({ modalType: "edit", isOpen: open }));
  };

  const showAddSocialMediaModal = (open: boolean) => {
    dispatch(setModalState({ modalType: "add", isOpen: open }));
  };

  // Actions
  const createSocialMedia = async (newSocialMedia: Omit<SocialMedia, "id">) => {
    try {
      await dispatch(addSocialMediaAction(newSocialMedia)).unwrap();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Erreur lors de l'ajout de reseau social",
      );
    }
  };

  const getSocialMedias = () => {
    dispatch(fetchSocialMedias());
  };

  const updateSocialMedia = async (data: Partial<SocialMedia>) => {
    if (currentSocialMedia) {
      await dispatch(
        updateSocialMediaAction({
          id: currentSocialMedia.id,
          socialMedia: data,
        }),
      );
    }
  };

  const deleteSocialMedia = async () => {
    try {
      if (currentSocialMedia) {
        await dispatch(deleteSocialMediaAction(currentSocialMedia));
      }
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Erreur lors de la suppression du reseau social",
      );
    } finally {
      selectCurrentSocialMedia(null);
    }
  };

  const selectCurrentSocialMedia = (socialMedia: SocialMedia) => {
    dispatch(setCurrentSocialMedia(socialMedia));
  };

  return {
    socialMedias,
    isLoading,
    error,
    currentSocialMedia,
    isAddSocialMediaOpen,
    isEditSocialMediaOpen,
    isRemoveSocialMediaOpen,
    showAddSocialMediaModal,
    showEditSocialMediaModal,
    showRemoveSocialMediaModal,
    createSocialMedia,
    updateSocialMedia,
    deleteSocialMedia,
    selectCurrentSocialMedia,
    getSocialMedias,
  };
}
