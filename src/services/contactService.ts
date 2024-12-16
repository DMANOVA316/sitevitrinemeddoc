import supabase from "@/utils/supabase";

const CONTACT_TABLE = "contactez_nous";

export const contactService = {
  getAllContacts: async (): Promise<contactez_nous[]> => {
    const { data, error } = await supabase
      .from(CONTACT_TABLE)
      .select("*")
      .order("date_envoye", { ascending: false });

    if (error) throw new Error(error.message);
    return data;
  },

  createContact: async (
    contact: Omit<contactez_nous, "id" | "date_envoye" | "vue">
  ): Promise<contactez_nous> => {
    const { data, error } = await supabase
      .from(CONTACT_TABLE)
      .insert([{ ...contact, vue: false }])
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  },

  deleteContact: async (id: number): Promise<void> => {
    const { error } = await supabase.from(CONTACT_TABLE).delete().eq("id", id);

    if (error) throw new Error(error.message);
  },

  markAsViewed: async (id: number): Promise<contactez_nous> => {
    const { data, error } = await supabase
      .from(CONTACT_TABLE)
      .update({ vue: true })
      .eq("id", id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  },
};

export default contactService;
