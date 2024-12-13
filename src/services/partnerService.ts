import supabase from "@/utils/supabase";
import { PartnerType } from "@/types";
import { uploadService } from "./uploadService";

const PARTNERS_TABLE = "partenaire";

export const partnerService = {
  // Get all partners
  getAllPartners: async (): Promise<PartnerType[]> => {
    const { data, error } = await supabase.from(PARTNERS_TABLE).select("*");

    if (error) throw new Error(error.message);
    return data || [];
  },

  // Get a single partner by ID
  getPartnerById: async (id: number): Promise<PartnerType | null> => {
    const { data, error } = await supabase
      .from(PARTNERS_TABLE)
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw new Error(error.message);
    return data;
  },

  // Create a new partner
  createPartner: async (
    partner: Omit<PartnerType, "id">
  ): Promise<PartnerType> => {
    const { data, error } = await supabase
      .from(PARTNERS_TABLE)
      .insert([
        {
          logo: partner.logo,
          nom_partenaire: partner.nom_partenaire,
          lien: partner.lien,
        },
      ])
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  },

  // Update an existing partner
  updatePartner: async (
    id: number,
    partner: Partial<Omit<PartnerType, "id">>
  ): Promise<PartnerType> => {
    // Si le logo est modifié, supprimer l'ancien logo
    if (partner.logo) {
      const { data: oldPartner } = await supabase
        .from(PARTNERS_TABLE)
        .select("logo")
        .eq("id", id)
        .single();

      if (oldPartner?.logo && oldPartner.logo !== partner.logo) {
        try {
          await uploadService.deleteImage(oldPartner.logo);
        } catch (error) {
          console.error(
            "Erreur lors de la suppression de l'ancien logo:",
            error
          );
        }
      }
    }

    const { data, error } = await supabase
      .from(PARTNERS_TABLE)
      .update({
        logo: partner.logo,
        nom_partenaire: partner.nom_partenaire,
        lien: partner.lien,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  },

  // Delete a partner
  deletePartner: async (id: number): Promise<void> => {
    // Récupérer d'abord le partenaire pour obtenir l'URL du logo
    const { data: partner } = await supabase
      .from(PARTNERS_TABLE)
      .select("logo")
      .eq("id", id)
      .single();

    // Supprimer le partenaire de la base de données
    const { error } = await supabase.from(PARTNERS_TABLE).delete().eq("id", id);

    if (error) throw new Error(error.message);

    // Si le partenaire avait un logo, le supprimer du storage
    if (partner?.logo) {
      try {
        await uploadService.deleteImage(partner.logo);
      } catch (error) {
        console.error("Erreur lors de la suppression du logo:", error);
        // On ne relance pas l'erreur car le partenaire a déjà été supprimé
      }
    }
  },
};
