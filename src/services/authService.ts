import supabase from "../utils/supabase";

export interface LoginData {
  email: string;
  password: string;
}

export const authService = {
  login: async ({ email, password }: LoginData) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  },
};
