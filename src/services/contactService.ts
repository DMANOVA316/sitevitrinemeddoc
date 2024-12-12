import supabase from '@/utils/supabase';

export const contactService = {
  getContacts: async (): Promise<any[]> => {
    const { data, error } = await supabase
      .from('contactez_nous')
      .select('*');

    if (error) throw new Error(error.message);
    return data;
  },
  
  addContact: async (contactData: {
    nom: string;
    email: string;
    contact?: string;
    vous_ete?: string;
    service?: string;
    message: string;
  }): Promise<void> => {
    const { error } = await supabase
      .from('contactez_nous')
      .insert([contactData]);

    if (error) throw new Error(error.message);
  },

  updateContact: async (id: number, contactData: {
    nom?: string;
    email?: string;
    contact?: string;
    vous_ete?: string;
    service?: string;
    message?: string;
  }): Promise<void> => {
    const { error } = await supabase
      .from('contactez_nous')
      .update(contactData)
      .eq('id', id);

    if (error) throw new Error(error.message);
  },

  deleteContact: async (id: number): Promise<void> => {
    const { error } = await supabase
      .from('contactez_nous')
      .delete()
      .eq('id', id);

    if (error) throw new Error(error.message);
  },
};
