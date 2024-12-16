import supabase from "@/utils/supabase";

const COUVERTURE_TABLE = "couverture";

export const couvertureService = {
  // Get couverture data
  getCouverture: async (): Promise<Couverture | null> => {
    const { data, error } = await supabase
      .from(COUVERTURE_TABLE)
      .select("*")
      .single();

    if (error) throw new Error(error.message);
    return data;
  },

  // Create couverture
  createCouverture: async (): Promise<Couverture> => {
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
    couverture: Partial<Couverture>,
  ): Promise<Couverture> => {
    // Récupérer d'abord les données existantes
    const { data: existingData } = await supabase
      .from(COUVERTURE_TABLE)
      .select("*")
      .single();

    if (!existingData) {
      throw new Error("Aucune donnée de couverture trouvée");
    }

    // Mettre à jour avec les nouvelles données
    const { data, error } = await supabase
      .from(COUVERTURE_TABLE)
      .update({
        photo: couverture.photo || existingData.photo,
        titre: couverture.titre || existingData.titre,
        description: couverture.description || existingData.description,
      })
      .eq("id", existingData.id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  },
};
