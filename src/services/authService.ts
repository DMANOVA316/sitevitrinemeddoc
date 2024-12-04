import supabase from "@/utils/supabase";

export const authService = {
  login: async (credentials: { email: string, password: string }) => {
    const { data, error } = await supabase.auth.signInWithPassword(credentials);
    if (error) throw new Error(error.message);
    return data;
  },

  logout: async () => {
    await supabase.auth.signOut();
  },

  getUser: async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error) throw new Error(error.message);
    return data;
  }
};
