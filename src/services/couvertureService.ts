import supabase from "@/utils/supabase";

const COUVERTURE_TABLE = "couverture";

export interface CouvertureType {
  id?: number;
  photo: string;
  titre: string;
  description: string;
}

export const couvertureService = {
  // Get couverture data
  getCouverture: async (): Promise<CouvertureType | null> => {
    const { data, error } = await supabase
      .from(COUVERTURE_TABLE)
      .select("*")
      .single();

    if (error) throw new Error(error.message);
    return data;
  },

  // Create couverture
  createCouverture: async (): Promise<CouvertureType> => {
    const { data, error } = await supabase
      .from(COUVERTURE_TABLE)
      .insert([
        {
          photo: "./couverture/couverture.png",
          titre: "Des Solutions Innovantes pour la Santé",
          description:
            "Nous développons des solutions et des services innovants dédiés à la promotion de la santé et à l'amélioration de l'accès aux soins.",
        },
      ])
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  },

  // Update couverture
  updateCouverture: async (
    couverture: Omit<CouvertureType, "id">
  ): Promise<CouvertureType> => {
    // Comme nous n'avons qu'une seule entrée, nous mettons à jour la première
    const { data, error } = await supabase
      .from(COUVERTURE_TABLE)
      .update({
        photo: couverture.photo,
        titre: couverture.titre,
        description: couverture.description,
      })
      .eq("id", 1) // Nous supposons que l'ID est 1 pour la seule entrée
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  },
};
