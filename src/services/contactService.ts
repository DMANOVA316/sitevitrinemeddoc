import supabase from "@/utils/supabase";

export const contactService = {
  getContacts: async (): Promise<contactez_nous[]> => {
    const { data, error } = await supabase
      .from("contactez_nous")
      .select("*")
      .order("id", { ascending: false });

    if (error) throw new Error(error.message);
    return data;
  },

  getUnviewedContacts: async (): Promise<contactez_nous[]> => {
    const { data, error } = await supabase
      .from("contactez_nous")
      .select("*")
      .eq("vue", false)
      .order("id", { ascending: false });

    if (error) throw new Error(error.message);
    return data;
  },

  getViewedContacts: async (): Promise<contactez_nous[]> => {
    const { data, error } = await supabase
      .from("contactez_nous")
      .select("*")
      .eq("vue", true)
      .order("id", { ascending: false });

    if (error) throw new Error(error.message);
    return data;
  },

  addContact: async (
    contactData: Omit<contactez_nous, "id" | "date_envoye">
  ): Promise<void> => {
    const { error } = await supabase
      .from("contactez_nous")
      .insert([contactData]);

    if (error) throw new Error(error.message);
  },

  deleteContact: async (id: number): Promise<void> => {
    const { error } = await supabase
      .from("contactez_nous")
      .delete()
      .eq("id", id);

    if (error) throw new Error(error.message);
  },

  markAsViewed: async (id: number): Promise<void> => {
    const { error } = await supabase
      .from("contactez_nous")
      .update({ vue: true })
      .eq("id", id);

    if (error) throw new Error(error.message);
  },
};
