import supabase from "@/utils/supabase";
import { Ambulance, Contact } from '@/store/ambulanceSlice';

export const ambulanceService = {
  // Récupérer toutes les ambulances avec leurs contacts
  getAmbulances: async (): Promise<Ambulance[]> => {
    const { data: ambulances, error: ambulancesError } = await supabase
      .from('ambulance')
      .select('*');

    if (ambulancesError) throw new Error(ambulancesError.message);

    // Récupérer les contacts pour toutes les ambulances
    const { data: contacts, error: contactsError } = await supabase
      .from('contact_ambulance')
      .select('*');

    if (contactsError) throw new Error(contactsError.message);

    // Associer les contacts à chaque ambulance
    return ambulances.map(ambulance => ({
      ...ambulance,
      contacts: contacts.filter(contact => contact.id_ambulance === ambulance.id)
    }));
  },

  // Ajouter une nouvelle ambulance avec ses contacts
  addAmbulance: async (
    ambulanceData: Omit<Ambulance, "id">
  ): Promise<Ambulance> => {
    // Séparer les contacts des données de l'ambulance
    const { contacts, ...ambulanceDataWithoutContacts } = ambulanceData;

    // Insérer l'ambulance
    const { data: ambulance, error: ambulanceError } = await supabase
      .from('ambulance')
      .insert([ambulanceDataWithoutContacts])
      .select()
      .single();

    if (ambulanceError) throw new Error(ambulanceError.message);

    // Insérer les contacts si présents
    if (contacts && contacts.length > 0) {
      const { error: contactsError } = await supabase
        .from('contact_ambulance')
        .insert(
          contacts.map(contact => ({
            numero: contact.numero,
            id_ambulance: ambulance.id
          }))
        );

      if (contactsError) throw new Error(contactsError.message);
    }

    // Retourner l'ambulance avec ses contacts
    return {
      ...ambulance,
      contacts: contacts || []
    };
  },

  // Mettre à jour une ambulance
  updateAmbulance: async (
    id: number,
    ambulanceData: Ambulance
  ): Promise<Ambulance> => {
    // Séparer les contacts des données de l'ambulance
    const { contacts, id: _, ...ambulanceDataWithoutContacts } = ambulanceData;

    // Mettre à jour l'ambulance
    const { error: ambulanceError } = await supabase
      .from('ambulance')
      .update(ambulanceDataWithoutContacts)
      .eq('id', id);

    if (ambulanceError) throw new Error(ambulanceError.message);

    // Gérer les contacts
    if (contacts) {
      // Supprimer les anciens contacts
      const { error: deleteContactsError } = await supabase
        .from('contact_ambulance')
        .delete()
        .eq('id_ambulance', id);

      if (deleteContactsError) throw new Error(deleteContactsError.message);

      // Ajouter les nouveaux contacts
      if (contacts.length > 0) {
        const { error: insertContactsError } = await supabase
          .from('contact_ambulance')
          .insert(
            contacts.map(contact => ({
              numero: contact.numero,
              id_ambulance: id
            }))
          );

        if (insertContactsError) throw new Error(insertContactsError.message);
      }
    }

    // Récupérer et retourner l'ambulance mise à jour avec ses contacts
    const { data: updatedAmbulance, error: getError } = await supabase
      .from('ambulance')
      .select('*')
      .eq('id', id)
      .single();

    if (getError) throw new Error(getError.message);

    // Récupérer les contacts mis à jour
    const { data: updatedContacts, error: contactsError } = await supabase
      .from('contact_ambulance')
      .select('*')
      .eq('id_ambulance', id);

    if (contactsError) throw new Error(contactsError.message);

    return {
      ...updatedAmbulance,
      contacts: updatedContacts || []
    };
  },

  // Supprimer une ambulance et ses contacts associés
  deleteAmbulance: async (id: number): Promise<void> => {
    // Supprimer d'abord les contacts associés
    const { error: contactsError } = await supabase
      .from('contact_ambulance')
      .delete()
      .eq('id_ambulance', id);

    if (contactsError) throw new Error(contactsError.message);

    // Supprimer l'ambulance
    const { error: ambulanceError } = await supabase
      .from('ambulance')
      .delete()
      .eq('id', id);

    if (ambulanceError) throw new Error(ambulanceError.message);
  },

  // Récupérer une ambulance par son ID
  getAmbulanceById: async (id: number): Promise<Ambulance> => {
    const { data: ambulance, error: ambulanceError } = await supabase
      .from('ambulance')
      .select('*')
      .eq('id', id)
      .single();

    if (ambulanceError) throw new Error(ambulanceError.message);

    // Récupérer les contacts de l'ambulance
    const { data: contacts, error: contactsError } = await supabase
      .from('contact_ambulance')
      .select('*')
      .eq('id_ambulance', id);

    if (contactsError) throw new Error(contactsError.message);

    return {
      ...ambulance,
      contacts
    };
  }
};
