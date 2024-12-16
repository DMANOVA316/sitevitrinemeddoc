import { AppDispatch, RootState } from "@/store";
import {
  fetchContacts,
  markContactAsViewed,
  setFilter,
} from "@/store/contactSlice";
import { useDispatch, useSelector } from "react-redux";

export default function useContactRedux() {
  const dispatch = useDispatch<AppDispatch>();

  // Sélecteurs pour accéder à l'état
  const { contacts, filter, status, error } = useSelector(
    (state: RootState) => state.contact
  );

  // Gestion des filtres
  const setFilterType = (filterType: 'all' | 'viewed' | 'unviewed') => {
    dispatch(setFilter(filterType));
  };

  // Marquer comme lu
  const markAsViewed = async (id: number) => {
    try {
      await dispatch(markContactAsViewed(id)).unwrap();
    } catch (error) {
      console.error("Erreur lors du marquage comme lu:", error);
    }
  };

  // Charger les contacts
  const loadContacts = () => {
    dispatch(fetchContacts());
  };

  return {
    // État
    contacts,
    filter,
    status,
    error,
    isLoading: status === 'loading',

    // Actions
    setFilterType,
    markAsViewed,
    loadContacts,
  };
}
