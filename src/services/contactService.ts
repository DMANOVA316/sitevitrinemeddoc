import supabase from "@/utils/supabase";
import { BaseService, handleServiceError } from "./baseService";

const CONTACT_TABLE = "contactez_nous";

export const contactService: BaseService<contactez_nous> & {
  markAsViewed: (id: number) => Promise<contactez_nous>;
  getAllContacts: () => Promise<contactez_nous[]>;
  createContact: (contact: Omit<contactez_nous, "id" | "date_envoye" | "vue">) => Promise<contactez_nous>;
  deleteContact: (id: number) => Promise<void>;
} = {
  getAllContacts: async (): Promise<contactez_nous[]> => {
    try {
      const { data, error } = await supabase
        .from(CONTACT_TABLE)
        .select("*")
        .order("date_envoye", { ascending: false });

      if (error) handleServiceError(error, { method: 'getAllContacts' });
      return data || [];
    } catch (error) {
      handleServiceError(error, { method: 'getAllContacts' });
    }
  },

  getAll: async (): Promise<contactez_nous[]> => {
    return contactService.getAllContacts();
  },

  createContact: async (
    contact: Omit<contactez_nous, "id" | "date_envoye" | "vue">
  ): Promise<contactez_nous> => {
    try {
      const { data, error } = await supabase
        .from(CONTACT_TABLE)
        .insert([{ ...contact, vue: false }])
        .select()
        .single();

      if (error) handleServiceError(error, { method: 'createContact', contact });
      return data;
    } catch (error) {
      handleServiceError(error, { method: 'createContact', contact });
    }
  },

  create: async (
    contact: Omit<contactez_nous, "id" | "date_envoye" | "vue">
  ): Promise<contactez_nous> => {
    return contactService.createContact(contact);
  },

  deleteContact: async (id: number): Promise<void> => {
    try {
      const { error } = await supabase.from(CONTACT_TABLE).delete().eq("id", id);
      if (error) handleServiceError(error, { method: 'deleteContact', id });
    } catch (error) {
      handleServiceError(error, { method: 'deleteContact', id });
    }
  },

  delete: async (id: number): Promise<void> => {
    return contactService.deleteContact(id);
  },

  update: async (
    id: number, 
    contact: Partial<contactez_nous>
  ): Promise<contactez_nous> => {
    try {
      const { data, error } = await supabase
        .from(CONTACT_TABLE)
        .update(contact)
        .eq("id", id)
        .select()
        .single();

      if (error) handleServiceError(error, { method: 'update', id, contact });
      return data;
    } catch (error) {
      handleServiceError(error, { method: 'update', id, contact });
    }
  },

  markAsViewed: async (id: number): Promise<contactez_nous> => {
    try {
      const { data, error } = await supabase
        .from(CONTACT_TABLE)
        .update({ vue: true })
        .eq("id", id)
        .select()
        .single();

      if (error) handleServiceError(error, { method: 'markAsViewed', id });
      return data;
    } catch (error) {
      handleServiceError(error, { method: 'markAsViewed', id });
    }
  },
};
