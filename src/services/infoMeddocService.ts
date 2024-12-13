import supabase from "@/utils/supabase";
import { Info_page_meddoc } from "@/types";
import { uploadService } from "./uploadService";

const INFO_TABLE = "Info_page_meddoc";

export const infoMeddocService = {
  getInfo: async (): Promise<Info_page_meddoc | null> => {
    try {
      const { data, error } = await supabase
        .from(INFO_TABLE)
        .select("*")
        .limit(1);

      if (error) throw error;
      return data?.[0] || null;
    } catch (error) {
      console.error("Error fetching info:", error);
      throw error;
    }
  },

  updateInfo: async (
    id: number,
    info: Partial<Omit<Info_page_meddoc, "id">>,
    files?: { logo: File | null; favicon: File | null }
  ): Promise<Info_page_meddoc> => {
    try {
      let updatedInfo = { ...info };

      // Upload new logo if provided
      if (files?.logo) {
        const logoUrl = await uploadService.uploadImage(files.logo, "meddoc");
        updatedInfo.logo = logoUrl;
      }

      // Upload new favicon if provided
      if (files?.favicon) {
        const faviconUrl = await uploadService.uploadImage(files.favicon, "meddoc");
        updatedInfo.favicon = faviconUrl;
      }

      const { data, error } = await supabase
        .from(INFO_TABLE)
        .update(updatedInfo)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error updating info:", error);
      throw error;
    }
  },

  createInfo: async (
    info: Omit<Info_page_meddoc, "id">,
    files?: { logo: File | null; favicon: File | null }
  ): Promise<Info_page_meddoc> => {
    try {
      let newInfo = { ...info };

      // Upload logo if provided
      if (files?.logo) {
        const logoUrl = await uploadService.uploadImage(files.logo, "meddoc");
        newInfo.logo = logoUrl;
      }

      // Upload favicon if provided
      if (files?.favicon) {
        const faviconUrl = await uploadService.uploadImage(files.favicon, "meddoc");
        newInfo.favicon = faviconUrl;
      }

      const { data, error } = await supabase
        .from(INFO_TABLE)
        .insert(newInfo)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error creating info:", error);
      throw error;
    }
  }
};

export default infoMeddocService;
