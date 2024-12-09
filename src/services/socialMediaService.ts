import supabase from "@/utils/supabase";
import { SocialMedia } from "@/types";

const SOCIAL_MEDIA_TABLE = "reseaux_sociaux_meddoc";

export const socialMediaService = {
  // Get all social media
  getAllSocialMedia: async (): Promise<SocialMedia[]> => {
    const { data, error } = await supabase.from(SOCIAL_MEDIA_TABLE).select("*");

    if (error) throw new Error(error.message);
    return data || [];
  },

  // Get a single social media by ID
  getSocialMediaById: async (id: number): Promise<SocialMedia | null> => {
    const { data, error } = await supabase
      .from(SOCIAL_MEDIA_TABLE)
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw new Error(error.message);
    return data;
  },

  // Create a new social media
  createSocialMedia: async (
    socialMedia: Omit<SocialMedia, "id">
  ): Promise<SocialMedia> => {
    const { data, error } = await supabase
      .from(SOCIAL_MEDIA_TABLE)
      .insert([
        {
          nom: socialMedia.nom,
          lien: socialMedia.lien,
        },
      ])
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  },

  // Update an existing social media
  updateSocialMedia: async (
    id: number,
    socialMedia: Partial<Omit<SocialMedia, "id">>
  ): Promise<SocialMedia> => {
    const { data, error } = await supabase
      .from(SOCIAL_MEDIA_TABLE)
      .update({
        nom: socialMedia.nom,
        lien: socialMedia.lien,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  },

  // Delete a social media
  deleteSocialMedia: async (id: number): Promise<void> => {
    const { error } = await supabase
      .from(SOCIAL_MEDIA_TABLE)
      .delete()
      .eq("id", id);

    if (error) throw new Error(error.message);
  },
};
