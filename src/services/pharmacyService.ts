import supabase from "@/utils/supabase";

export const pharmacyService = {
  // Récupérer toutes les pharmacies avec leurs contacts et horaires
  getPharmacies: async () => {
    const { data: pharmacies, error: pharmaciesError } = await supabase
      .from("pharmacies")
      .select("*");

    if (pharmaciesError) throw new Error(pharmaciesError.message);

    // Récupérer les contacts pour toutes les pharmacies
    const { data: contacts, error: contactsError } = await supabase
      .from("contact_pharmacies")
      .select("*");

    if (contactsError) throw new Error(contactsError.message);

    // Récupérer les horaires pour toutes les pharmacies
    const { data: horaires, error: horairesError } = await supabase
      .from("horaire_ouverture")
      .select("*");

    if (horairesError) throw new Error(horairesError.message);

    // Associer les contacts et horaires à chaque pharmacie
    return pharmacies.map((pharmacy) => ({
      ...pharmacy,
      contacts: contacts.filter(
        (contact) => contact.id_pharmacie === pharmacy.id,
      ),
      horaires: horaires.filter(
        (horaire) => horaire.id_pharmacie === pharmacy.id,
      ),
    }));
  },

  // Ajouter une nouvelle pharmacie avec ses contacts et horaires
  addPharmacy: async (
    pharmacyData: Omit<Pharmacy, "id" | "contacts" | "horaires">,
    contacts: Omit<PharmacyContact, "id" | "id_pharmacie">[],
    horaires: Omit<PharmacySchedule, "id" | "id_pharmacie">[],
  ) => {
    // Insérer la pharmacie
    const { data: pharmacy, error: pharmacyError } = await supabase
      .from("pharmacies")
      .insert([pharmacyData])
      .select()
      .single();

    if (pharmacyError) throw new Error(pharmacyError.message);

    // Insérer les contacts
    if (contacts.length > 0) {
      const { error: contactsError } = await supabase
        .from("contact_pharmacies")
        .insert(
          contacts.map((contact) => ({
            ...contact,
            id_pharmacie: pharmacy.id,
          })),
        );

      if (contactsError) throw new Error(contactsError.message);
    }

    // Insérer les horaires
    if (horaires.length > 0) {
      const { error: horairesError } = await supabase
        .from("horaire_ouverture")
        .insert(
          horaires.map((horaire) => ({
            ...horaire,
            id_pharmacie: pharmacy.id,
          })),
        );

      if (horairesError) throw new Error(horairesError.message);
    }

    return pharmacy;
  },

  // Mettre à jour une pharmacie
  updatePharmacy: async (
    id: number,
    pharmacyData: Partial<Omit<Pharmacy, "id" | "contacts" | "horaires">>,
    contacts?: Omit<PharmacyContact, "id" | "id_pharmacie">[],
    horaires?: Omit<PharmacySchedule, "id" | "id_pharmacie">[],
  ) => {
    // Mettre à jour la pharmacie
    const { error: pharmacyError } = await supabase
      .from("pharmacies")
      .update(pharmacyData)
      .eq("id", id);

    if (pharmacyError) throw new Error(pharmacyError.message);

    // Mettre à jour les contacts si fournis
    if (contacts) {
      // Supprimer les anciens contacts
      const { error: deleteContactsError } = await supabase
        .from("contact_pharmacies")
        .delete()
        .eq("id_pharmacie", id);

      if (deleteContactsError) throw new Error(deleteContactsError.message);

      // Ajouter les nouveaux contacts
      if (contacts.length > 0) {
        const { error: contactsError } = await supabase
          .from("contact_pharmacies")
          .insert(
            contacts.map((contact) => ({
              ...contact,
              id_pharmacie: id,
            })),
          );

        if (contactsError) throw new Error(contactsError.message);
      }
    }

    // Mettre à jour les horaires si fournis
    if (horaires) {
      // Supprimer les anciens horaires
      const { error: deleteHorairesError } = await supabase
        .from("horaire_ouverture")
        .delete()
        .eq("id_pharmacie", id);

      if (deleteHorairesError) throw new Error(deleteHorairesError.message);

      // Ajouter les nouveaux horaires
      if (horaires.length > 0) {
        const { error: horairesError } = await supabase
          .from("horaire_ouverture")
          .insert(
            horaires.map((horaire) => ({
              ...horaire,
              id_pharmacie: id,
            })),
          );

        if (horairesError) throw new Error(horairesError.message);
      }
    }

    return { id, ...pharmacyData };
  },

  // Supprimer une pharmacie et toutes ses données associées
  deletePharmacy: async (id: number) => {
    // Supprimer les contacts
    const { error: contactsError } = await supabase
      .from("contact_pharmacies")
      .delete()
      .eq("id_pharmacie", id);

    if (contactsError) throw new Error(contactsError.message);

    // Supprimer les horaires
    const { error: horairesError } = await supabase
      .from("horaire_ouverture")
      .delete()
      .eq("id_pharmacie", id);

    if (horairesError) throw new Error(horairesError.message);

    // Supprimer la pharmacie
    const { error: pharmacyError } = await supabase
      .from("pharmacies")
      .delete()
      .eq("id", id);

    if (pharmacyError) throw new Error(pharmacyError.message);

    return { id };
  },
};
