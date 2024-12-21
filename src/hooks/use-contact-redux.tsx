import { useCallback, useMemo } from "react";
import { AppDispatch, RootState } from "@/store";
import {
  fetchContacts,
  markContactAsViewed,
  setFilter,
  deleteContact,
  createContact,
} from "@/store/contactSlice";
import { useDispatch, useSelector } from "react-redux";

/**
 * Hook personnalisé pour gérer l'état des contacts via Redux
 * Fournit des méthodes pour charger, filtrer, ajouter et manipuler les contacts
 * 
 * @returns {Object} Un ensemble de méthodes et de données liées aux contacts
 */
export default function useContactRedux() {
  // Obtenir la fonction dispatch de Redux pour déclencher des actions
  const dispatch = useDispatch<AppDispatch>();

  // Récupérer l'état des contacts depuis le store Redux
  const { contacts, filter, status, error } = useSelector(
    (state: RootState) => state.contact,
  );

  // Mémoïser les contacts filtrés pour optimiser les performances
  // Filtre dynamique basé sur le type de filtre sélectionné
  const filteredContacts = useMemo(() => {
    if (filter === "all") return contacts;
    return contacts.filter((contact) =>
      filter === "unviewed" ? contact.vue : !contact.vue,
    );
  }, [contacts, filter]);

  // Charger tous les contacts depuis l'API ou la source de données
  const loadContacts = useCallback(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  // Définir le type de filtre pour afficher les contacts
  const setFilterType = useCallback(
    (filterType: "all" | "unviewed" | "viewed") => {
      dispatch(setFilter(filterType));
    },
    [dispatch],
  );

  // Marquer un contact spécifique comme "vu"
  const markAsViewed = useCallback(
    async (id: number) => {
      await dispatch(markContactAsViewed(id)).unwrap();
    },
    [dispatch],
  );

  // Supprimer un contact par son identifiant
  const removeContact = useCallback(
    async (id: number) => {
      await dispatch(deleteContact(id)).unwrap();
    },
    [dispatch],
  );

  // Ajouter un nouveau contact 
  // Exclut automatiquement les champs id, date_envoye et vue
  const addContact = useCallback(
    async (contact: Omit<contactez_nous, "id" | "date_envoye" | "vue">) => {
      await dispatch(createContact(contact)).unwrap();
    },
    [dispatch],
  );

  // Retourner un ensemble de données et de méthodes utilisables par les composants
  return {
    contacts: filteredContacts,
    filter,
    isLoading: status === "loading",
    error,
    setFilterType,
    markAsViewed,
    loadContacts,
    removeContact,
    addContact,
  };
}
