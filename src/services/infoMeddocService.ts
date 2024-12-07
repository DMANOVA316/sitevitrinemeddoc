import supabase from "@/utils/supabase";
import { Info_page_meddoc } from "@/types";

const INFO_TABLE = "Info_page_meddoc";

export const infoMeddocService = {
  getInfo: async (): Promise<Info_page_meddoc | null> => {
    const { data, error } = await supabase
      .from(INFO_TABLE)
      .select("*")
      .single();

    if (error) throw new Error(error.message);
    return data;
  },

  updateInfo: async (
    id: number,
    info: Partial<Omit<Info_page_meddoc, "id">>
  ): Promise<Info_page_meddoc> => {
    const { data, error } = await supabase
      .from(INFO_TABLE)
      .update(info)
      .eq("id", id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  },

  createInfo: async (
    info: Omit<Info_page_meddoc, "id">
  ): Promise<Info_page_meddoc> => {
    const { data, error } = await supabase
      .from(INFO_TABLE)
      .insert([info])
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  },
};

export default infoMeddocService;
