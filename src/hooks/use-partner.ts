import { useEffect, useState } from "react";
import { PartnerType } from "../types/index";
import { partnerService } from "@/services/partnerService";
import { uploadService } from "@/services/uploadService";

export default function usePartner() {
  const [partners, setPartners] = useState<PartnerType[]>([]);
  const [currentPartner, setCurrentPartner] = useState<PartnerType | null>(
    null
  );
  const [isAddPartnerOpen, setIsAddPartnerOpen] = useState(false);
  const [isEditPartnerOpen, setIsEditPartnerOpen] = useState(false);
  const [isRemovePartnerOpen, setIsRemovePartnerOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getPartners = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await partnerService.getAllPartners();
      setPartners(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Une erreur s'est produite"
      );
      console.error("Error fetching partners:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const addPartner = async (
    newPartner: Omit<PartnerType, "id">,
    file?: File
  ): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);

      // Si un fichier est fourni, uploader l'image d'abord
      if (file) {
        const imageUrl = await uploadService.uploadImage(file);
        newPartner.logo = imageUrl;
      }

      await partnerService.createPartner(newPartner);
      await getPartners();
      setCurrentPartner(null);
      setIsAddPartnerOpen(false);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Erreur lors de l'ajout du partenaire"
      );
      console.error("Error adding partner:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const editPartner = async (partner: PartnerType, file?: File | null) => {
    try {
      setIsLoading(true);
      setError(null);

      const updatedPartner = { ...partner };

      // Si un nouveau fichier est fourni, uploader la nouvelle image
      if (file) {
        const imageUrl = await uploadService.uploadImage(file);
        updatedPartner.logo = imageUrl;
      }

      await partnerService.updatePartner(partner.id, updatedPartner);
      await getPartners();
      setCurrentPartner(null);
      setIsEditPartnerOpen(false);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Erreur lors de la modification du partenaire"
      );
      console.error("Error updating partner:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const removePartner = async (id: number): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      await partnerService.deletePartner(id);
      await getPartners();
      setCurrentPartner(null);
      setIsRemovePartnerOpen(false);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Erreur lors de la suppression du partenaire"
      );
      console.error("Error removing partner:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddPartner = async (
    partner: Omit<PartnerType, "id">,
    file?: File
  ) => {
    await addPartner(partner, file);
  };

  const handleEditPartner = async (
    partner: PartnerType,
    file?: File | null
  ) => {
    await editPartner(partner, file);
  };

  const handleRemovePartner = async (id: number) => {
    await removePartner(id);
  };

  const handleSelectPartner = (partner: PartnerType) => {
    setCurrentPartner(partner);
  };

  useEffect(() => {
    getPartners();
  }, []);

  return {
    partners,
    currentPartner,
    isAddPartnerOpen,
    isEditPartnerOpen,
    isRemovePartnerOpen,
    isLoading,
    error,
    setIsAddPartnerOpen,
    setIsEditPartnerOpen,
    setIsRemovePartnerOpen,
    handleAddPartner,
    handleEditPartner,
    handleRemovePartner,
    handleSelectPartner,
    setCurrentPartner,
  };
}
