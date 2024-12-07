import supabase from "@/utils/supabase";
import { Numero_meddoc } from "@/types";

const NUMBER_TABLE = "Numero_meddoc";

export const numberService = {
  getAllNumber: async (): Promise<Numero_meddoc[] | null> => {
    const { data, error } = await supabase.from(NUMBER_TABLE).select("*");

    if (error) throw new Error(error.message);
    return data;
  },

  createNumber: async (
    number: Omit<Numero_meddoc, "id">
  ): Promise<Numero_meddoc> => {
    const { data, error } = await supabase
      .from(NUMBER_TABLE)
      .insert([number])
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  },

  deleteNumber: async (id: number): Promise<void> => {
    const { error } = await supabase.from(NUMBER_TABLE).delete().eq("id", id);

    if (error) throw new Error(error.message);
  },

  updateNumber: async (
    id: number,
    number: Partial<Omit<Numero_meddoc, "id">>
  ): Promise<Numero_meddoc> => {
    const { data, error } = await supabase
      .from(NUMBER_TABLE)
      .update(number)
      .eq("id", id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  },
};

export default numberService;
