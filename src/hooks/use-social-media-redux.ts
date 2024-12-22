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

/**
 * Hook Redux pour la gestion des réseaux sociaux
 * Fournit des actions CRUD et la gestion des états modaux
 */
export default function useSocialMediaRedux() {
  // Sélection de l'état global des réseaux sociaux
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

  // Gestion des modales (ouverture/fermeture)
  const showRemoveSocialMediaModal = (open: boolean) => {
    dispatch(setModalState({ modalType: "remove", isOpen: open }));
  };

  const showEditSocialMediaModal = (open: boolean) => {
    dispatch(setModalState({ modalType: "edit", isOpen: open }));
  };

  const showAddSocialMediaModal = (open: boolean) => {
    dispatch(setModalState({ modalType: "add", isOpen: open }));
  };

  // Créer un nouveau réseau social
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

  // Récupérer la liste des réseaux sociaux
  const getSocialMedias = () => {
    dispatch(fetchSocialMedias());
  };

  // Mettre à jour un réseau social existant
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

  // Supprimer le réseau social courant
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

  // Sélectionner un réseau social courant
  const selectCurrentSocialMedia = (socialMedia: SocialMedia) => {
    dispatch(setCurrentSocialMedia(socialMedia));
  };

  // Retourne les états et actions liés aux réseaux sociaux
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
