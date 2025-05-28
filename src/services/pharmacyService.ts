import type { PharmacyGarde } from "@/types";
import supabase from "@/utils/supabase";

export const pharmacyService = {
  // Récupérer toutes les pharmacies avec leurs contacts, horaires et périodes de garde
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

    // Récupérer toutes les informations de garde
    const { data: gardes, error: gardesError } = await supabase
      .from("pharmacies_garde")
      .select("*");

    if (gardesError) throw new Error(gardesError.message);

    // Date actuelle pour vérifier si une pharmacie est de garde
    const now = new Date().toISOString();

    // Associer les contacts, horaires et périodes de garde à chaque pharmacie
    return pharmacies.map((pharmacy) => {
      // Trouver toutes les périodes de garde pour cette pharmacie
      const pharmacyGardes =
        gardes?.filter((g) => g.id_pharmacies === pharmacy.id) || [];

      // Vérifier si la pharmacie est actuellement de garde
      const gardeEnCours = pharmacyGardes.find(
        (g) =>
          new Date(g.date_debut) <= new Date(now) &&
          new Date(g.date_fin) >= new Date(now)
      );

      // Trier les périodes de garde par date de début (la plus récente d'abord)
      const gardesTriees = [...pharmacyGardes].sort(
        (a, b) =>
          new Date(b.date_debut).getTime() - new Date(a.date_debut).getTime()
      );

      return {
        ...pharmacy,
        contacts: contacts.filter(
          (contact) => contact.id_pharmacie === pharmacy.id
        ),
        horaires: horaires.filter(
          (horaire) => horaire.id_pharmacie === pharmacy.id
        ),
        // Ajouter une propriété calculée pour indiquer si la pharmacie est de garde
        de_garde: !!gardeEnCours,
        // Ajouter les informations de garde en cours si disponibles
        garde: gardeEnCours,
        // Ajouter toutes les périodes de garde
        gardes: gardesTriees,
      };
    });
  },

  // Ajouter une nouvelle pharmacie avec ses contacts et période de garde
  addPharmacy: async (
    pharmacyData: Partial<
      Omit<Pharmacy, "id" | "contacts" | "de_garde" | "garde" | "gardes">
    >,
    contacts: Omit<PharmacyContact, "id" | "id_pharmacie">[],
    gardeData?: { date_debut: string; date_fin: string }
  ) => {
    try {
      // Vérifier les données requises (uniquement nom et adresse)
      if (!pharmacyData.nom_pharmacie || !pharmacyData.address) {
        throw new Error("Données manquantes: nom et adresse sont requis");
      }

      // Supprimer les champs qui ne sont pas dans la base de données
      const { assurance_sante, mutuelle_sante, ...cleanData } =
        pharmacyData as any;

      // Insérer la pharmacie
      const { data: pharmacy, error: pharmacyError } = await supabase
        .from("pharmacies")
        .insert([cleanData])
        .select()
        .single();

      if (pharmacyError) {
        console.error(
          "Erreur lors de l'insertion de la pharmacie:",
          pharmacyError
        );
        throw new Error(
          `Erreur lors de l'insertion de la pharmacie: ${pharmacyError.message}`
        );
      }

      if (!pharmacy) {
        throw new Error("Aucune pharmacie n'a été créée");
      }

      // Insérer les contacts
      if (contacts.length > 0) {
        try {
          console.log(
            `Insertion de ${contacts.length} contacts pour la nouvelle pharmacie ID ${pharmacy.id}...`
          );

          // Insérer les contacts un par un avec un délai entre chaque
          for (let i = 0; i < contacts.length; i++) {
            const contact = contacts[i];
            console.log(
              `Insertion du contact ${i + 1}/${contacts.length}: ${
                contact.numero
              }`
            );

            // Créer un nouvel objet de contact sans ID
            const contactToInsert = {
              numero: contact.numero,
              id_pharmacie: pharmacy.id,
            };

            // Insérer un seul contact
            const { error: insertError } = await supabase
              .from("contact_pharmacies")
              .insert([contactToInsert]);

            if (insertError) {
              console.error(
                `Erreur lors de l'insertion du contact ${i + 1}:`,
                insertError
              );
              throw new Error(
                `Erreur lors de l'insertion du contact: ${insertError.message}`
              );
            }

            // Attendre entre chaque insertion
            await new Promise((resolve) => setTimeout(resolve, 500));
          }

          console.log("Tous les contacts ont été insérés avec succès");
        } catch (error) {
          console.error(
            "Erreur complète lors de l'insertion des contacts:",
            error
          );
          throw error;
        }
      }

      // Insérer la période de garde si fournie
      let garde: PharmacyGarde | undefined;
      if (gardeData) {
        const { data: gardeResult, error: gardeError } = await supabase
          .from("pharmacies_garde")
          .insert({
            id_pharmacies: pharmacy.id,
            date_debut: gardeData.date_debut,
            date_fin: gardeData.date_fin,
          })
          .select()
          .single();

        if (gardeError) {
          console.error(
            "Erreur lors de l'insertion de la période de garde:",
            gardeError
          );
          throw new Error(
            `Erreur lors de l'insertion de la période de garde: ${gardeError.message}`
          );
        }

        garde = gardeResult;
      }

      return {
        ...pharmacy,
        de_garde: !!garde,
        garde: garde,
      };
    } catch (error) {
      console.error("Erreur complète lors de l'ajout de la pharmacie:", error);
      throw error;
    }
  },

  // Mettre à jour une pharmacie
  updatePharmacy: async (
    id: number,
    pharmacyData: Partial<
      Omit<Pharmacy, "id" | "contacts" | "de_garde" | "garde" | "gardes">
    >,
    contacts?: Omit<PharmacyContact, "id" | "id_pharmacie">[],
    gardeData?: { date_debut: string; date_fin: string } | null // null pour supprimer la garde
  ) => {
    console.log("updatePharmacy appelé avec:", {
      id,
      pharmacyData,
      contacts,
      gardeData,
    });

    try {
      // Supprimer les propriétés calculées qui ne sont pas dans la table
      const { de_garde, garde, gardes, ...dataToUpdate } = pharmacyData as any;
      console.log(
        "Données après suppression des propriétés calculées:",
        dataToUpdate
      );

      // S'assurer que les champs optionnels ont des valeurs par défaut
      // Supprimer les champs qui ne sont pas dans la base de données
      const { assurance_sante, mutuelle_sante, ...cleanData } = dataToUpdate;
      console.log("Données après nettoyage:", cleanData);

      // Préparer les données à envoyer
      const dataToSend = {
        ...cleanData,
        province: cleanData.province || null,
        service: cleanData.service || null,
      };
      console.log("Données à envoyer:", dataToSend);

      // Mettre à jour la pharmacie
      const { error: pharmacyError } = await supabase
        .from("pharmacies")
        .update(dataToSend)
        .eq("id", id);

      if (pharmacyError) {
        console.error(
          "Erreur lors de la mise à jour des données de la pharmacie:",
          pharmacyError
        );
        throw new Error(
          `Erreur lors de la mise à jour des données de la pharmacie: ${pharmacyError.message}`
        );
      }

      console.log("Données de la pharmacie mises à jour avec succès");
    } catch (error) {
      console.error(
        "Erreur complète lors de la mise à jour des données de la pharmacie:",
        error
      );
      throw error;
    }

    // Mettre à jour les contacts si fournis
    if (contacts) {
      try {
        console.log(
          "Début de la mise à jour des contacts pour la pharmacie ID:",
          id
        );
        console.log("Contacts à insérer:", contacts);

        // Vérifier si les contacts ont des IDs
        const contactsHaveIds = contacts.some((contact) => "id" in contact);
        if (contactsHaveIds) {
          console.warn(
            "ATTENTION: Certains contacts ont des IDs, ce qui peut causer des conflits"
          );
        }

        // 1. Récupérer les contacts existants pour vérification
        const { data: existingContacts, error: getContactsError } =
          await supabase
            .from("contact_pharmacies")
            .select("*")
            .eq("id_pharmacie", id);

        if (getContactsError) {
          console.error(
            "Erreur lors de la récupération des contacts existants:",
            getContactsError
          );
          throw new Error(
            `Erreur lors de la récupération des contacts existants: ${getContactsError.message}`
          );
        }

        console.log("Contacts existants:", existingContacts);

        // 2. Supprimer TOUS les contacts existants pour cette pharmacie
        console.log("Suppression des contacts existants...");

        // Utiliser une requête SQL brute pour supprimer tous les contacts
        const { error: deleteError } = await supabase
          .from("contact_pharmacies")
          .delete()
          .eq("id_pharmacie", id);

        if (deleteError) {
          console.error(
            "Erreur lors de la suppression des contacts:",
            deleteError
          );
          throw new Error(
            `Erreur lors de la suppression des contacts: ${deleteError.message}`
          );
        }

        console.log("Contacts supprimés avec succès");

        // Attendre que la suppression soit complète (délai plus long)
        await new Promise((resolve) => setTimeout(resolve, 5000));

        // 3. Vérifier que les contacts ont bien été supprimés
        const { data: checkContacts, error: checkError } = await supabase
          .from("contact_pharmacies")
          .select("*")
          .eq("id_pharmacie", id);

        if (checkError) {
          console.error(
            "Erreur lors de la vérification de la suppression des contacts:",
            checkError
          );
        } else {
          console.log("Vérification après suppression:", checkContacts);
          if (checkContacts && checkContacts.length > 0) {
            console.warn(
              "ATTENTION: Des contacts existent toujours après la suppression!"
            );
          }
        }

        // 4. Insérer les nouveaux contacts un par un avec un délai entre chaque
        if (contacts.length > 0) {
          console.log(`Insertion de ${contacts.length} nouveaux contacts...`);

          for (let i = 0; i < contacts.length; i++) {
            const contact = contacts[i];
            console.log(
              `Insertion du contact ${i + 1}/${contacts.length}: ${
                contact.numero
              }`
            );

            // Créer un nouvel objet de contact sans ID
            const contactToInsert = {
              numero: contact.numero,
              id_pharmacie: id,
            };

            // Insérer un seul contact
            const { data: insertedContact, error: insertError } = await supabase
              .from("contact_pharmacies")
              .insert([contactToInsert])
              .select();

            if (insertError) {
              console.error(
                `Erreur lors de l'insertion du contact ${i + 1}:`,
                insertError
              );
              throw new Error(
                `Erreur lors de l'insertion du contact: ${insertError.message}`
              );
            } else {
              console.log(
                `Contact ${i + 1} inséré avec succès:`,
                insertedContact
              );
            }

            // Attendre entre chaque insertion
            await new Promise((resolve) => setTimeout(resolve, 1000));
          }

          console.log("Tous les contacts ont été insérés avec succès");
        } else {
          console.log("Aucun nouveau contact à insérer");
        }
      } catch (error) {
        console.error("Erreur lors de la mise à jour des contacts:", error);
        throw error;
      }
    }

    // Gérer les informations de garde si fournies
    if (gardeData !== undefined) {
      if (gardeData === null) {
        // Si gardeData est null, supprimer toutes les périodes de garde
        const { error: deleteGardeError } = await supabase
          .from("pharmacies_garde")
          .delete()
          .eq("id_pharmacies", id);

        if (deleteGardeError) throw new Error(deleteGardeError.message);
      } else {
        // Sinon, ajouter une nouvelle période de garde
        const { error: gardeError } = await supabase
          .from("pharmacies_garde")
          .insert({
            id_pharmacies: id,
            date_debut: gardeData.date_debut,
            date_fin: gardeData.date_fin,
          });

        if (gardeError) throw new Error(gardeError.message);
      }
    }

    // Récupérer les données mises à jour
    const { data: updatedPharmacy, error: getPharmacyError } = await supabase
      .from("pharmacies")
      .select("*")
      .eq("id", id)
      .single();

    if (getPharmacyError) throw new Error(getPharmacyError.message);

    // Récupérer les contacts mis à jour
    const { data: updatedContacts, error: getContactsError } = await supabase
      .from("contact_pharmacies")
      .select("*")
      .eq("id_pharmacie", id);

    if (getContactsError) throw new Error(getContactsError.message);

    // Récupérer toutes les périodes de garde
    const { data: updatedGardes, error: getGardesError } = await supabase
      .from("pharmacies_garde")
      .select("*")
      .eq("id_pharmacies", id)
      .order("date_debut", { ascending: false });

    if (getGardesError) throw new Error(getGardesError.message);

    // Vérifier si la pharmacie est actuellement de garde
    const now = new Date().toISOString();
    const gardeEnCours = updatedGardes?.find(
      (g) =>
        new Date(g.date_debut) <= new Date(now) &&
        new Date(g.date_fin) >= new Date(now)
    );

    // Retourner la pharmacie avec toutes les données associées
    return {
      ...updatedPharmacy,
      contacts: updatedContacts || [],
      de_garde: !!gardeEnCours,
      garde: gardeEnCours || undefined,
      gardes: updatedGardes || [],
    };
  },

  // Supprimer une pharmacie et toutes ses données associées
  deletePharmacy: async (id: number) => {
    // Supprimer les contacts
    const { error: contactsError } = await supabase
      .from("contact_pharmacies")
      .delete()
      .eq("id_pharmacie", id);

    if (contactsError) throw new Error(contactsError.message);

    // Supprimer la pharmacie
    const { error: pharmacyError } = await supabase
      .from("pharmacies")
      .delete()
      .eq("id", id);

    if (pharmacyError) throw new Error(pharmacyError.message);

    return { id };
  },

  // Récupérer toutes les périodes de garde d'une pharmacie
  getPharmacyGardePeriods: async (id: number) => {
    const { data, error } = await supabase
      .from("pharmacies_garde")
      .select("*")
      .eq("id_pharmacies", id)
      .order("date_debut", { ascending: false });

    if (error) throw new Error(error.message);
    return data || [];
  },

  // Ajouter une période de garde pour une pharmacie
  addPharmacyGardePeriod: async (
    id: number,
    dateDebut: string,
    dateFin: string
  ) => {
    try {
      // Vérifier si la pharmacie existe
      const { data: pharmacy, error: pharmacyError } = await supabase
        .from("pharmacies")
        .select("id")
        .eq("id", id)
        .single();

      if (pharmacyError) throw new Error(pharmacyError.message);
      if (!pharmacy) throw new Error("Pharmacie non trouvée");

      // Ajouter l'entrée de garde
      const { data, error: gardeError } = await supabase
        .from("pharmacies_garde")
        .insert({
          id_pharmacies: id,
          date_debut: dateDebut,
          date_fin: dateFin,
        })
        .select()
        .single();

      if (gardeError) {
        console.error(
          "Erreur lors de l'ajout de la période de garde:",
          gardeError
        );
        throw new Error(
          `Erreur lors de l'ajout de la période de garde: ${gardeError.message}`
        );
      }

      return data;
    } catch (error) {
      console.error(
        "Erreur complète lors de l'ajout de la période de garde:",
        error
      );
      throw error;
    }
  },

  // Supprimer une période de garde
  deletePharmacyGardePeriod: async (id: number) => {
    const { error } = await supabase
      .from("pharmacies_garde")
      .delete()
      .eq("id", id);

    if (error) throw new Error(error.message);
    return { id };
  },

  // Mettre à jour une période de garde
  updatePharmacyGardePeriod: async (
    id: number,
    dateDebut: string,
    dateFin: string
  ) => {
    const { data, error } = await supabase
      .from("pharmacies_garde")
      .update({ date_debut: dateDebut, date_fin: dateFin })
      .eq("id", id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  },

  // Vérifier si une pharmacie est actuellement de garde
  isPharmacyOnDuty: async (id: number) => {
    const now = new Date().toISOString();
    const { data, error } = await supabase
      .from("pharmacies_garde")
      .select("*")
      .eq("id_pharmacies", id)
      .lte("date_debut", now)
      .gte("date_fin", now);

    if (error) throw new Error(error.message);
    return data && data.length > 0;
  },
};
