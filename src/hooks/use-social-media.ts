import { useEffect, useState } from "react";
import { SocialMedia } from "../types/index";
import { socialMediaService } from "@/services/socialMediaService";

export default function useSocialMedia() {
  const [socialMedias, setSocialMedias] = useState<SocialMedia[]>([]);
  const [currentSocialMedia, setCurrentSocialMedia] =
    useState<SocialMedia | null>(null);
  const [isAddSocialMediaOpen, setIsAddSocialMediaOpen] = useState(false);
  const [isEditSocialMediaOpen, setIsEditSocialMediaOpen] = useState(false);
  const [isRemoveSocialMediaOpen, setIsRemoveSocialMediaOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getSocialMedias = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await socialMediaService.getAllSocialMedia();
      setSocialMedias(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Une erreur s'est produite"
      );
      console.error("Error fetching social medias:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const addSocialMedia = async (
    newSocialMedia: Omit<SocialMedia, "id">
  ): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);

      await socialMediaService.createSocialMedia(newSocialMedia);
      await getSocialMedias();
      setCurrentSocialMedia(null);
      setIsAddSocialMediaOpen(false);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Erreur lors de l'ajout du social media"
      );
      console.error("Error adding social media:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const editSocialMedia = async (socialMedia: SocialMedia) => {
    try {
      setIsLoading(true);
      setError(null);

      const updatedSocialMedia = { ...socialMedia };

      await socialMediaService.updateSocialMedia(
        socialMedia.id,
        updatedSocialMedia
      );
      await getSocialMedias();
      setCurrentSocialMedia(null);
      setIsEditSocialMediaOpen(false);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Erreur lors de la modification du social media"
      );
      console.error("Error updating social media:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const removeSocialMedia = async (id: number): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      await socialMediaService.deleteSocialMedia(id);
      await getSocialMedias();
      setCurrentSocialMedia(null);
      setIsRemoveSocialMediaOpen(false);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Erreur lors de la suppression du social media"
      );
      console.error("Error removing social media:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddSocialMedia = async (socialMedia: Omit<SocialMedia, "id">) => {
    await addSocialMedia(socialMedia);
  };

  const handleEditSocialMedia = async (
    socialMedia: SocialMedia,
    file?: File | null
  ) => {
    await editSocialMedia(socialMedia);
  };

  const handleRemoveSocialMedia = async (id: number) => {
    await removeSocialMedia(id);
  };

  const handleSelectSocialMedia = (socialMedia: SocialMedia) => {
    setCurrentSocialMedia(socialMedia);
  };

  useEffect(() => {
    getSocialMedias();
  }, []);

  return {
    socialMedias,
    currentSocialMedia,
    isAddSocialMediaOpen,
    isEditSocialMediaOpen,
    isRemoveSocialMediaOpen,
    isLoading,
    error,
    setIsAddSocialMediaOpen,
    setIsEditSocialMediaOpen,
    setIsRemoveSocialMediaOpen,
    handleAddSocialMedia,
    handleEditSocialMedia,
    handleRemoveSocialMedia,
    handleSelectSocialMedia,
    setCurrentSocialMedia,
  };
}
