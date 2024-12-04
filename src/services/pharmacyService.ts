import supabase from "@/utils/supabase";

export const pharmacyService = {
  getPharmacies: async () => {
    const { data, error } = await supabase.from('pharmacies').select('*');
    if (error) throw new Error(error.message);
    return data;
  },

  addPharmacy: async (pharmacy: { name: string, address: string, province: string }) => {
    const { data, error } = await supabase.from('pharmacies').insert([pharmacy]);
    if (error) throw new Error(error.message);
    return data;
  },

  updatePharmacy: async (id: string, pharmacy: { name: string, address: string, province: string }) => {
    const { data, error } = await supabase.from('pharmacies').update(pharmacy).eq('id', id);
    if (error) throw new Error(error.message);
    return data;
  },

  deletePharmacy: async (id: string) => {
    const { data, error } = await supabase.from('pharmacies').delete().eq('id', id);
    if (error) throw new Error(error.message);
    return data;
  }
};
