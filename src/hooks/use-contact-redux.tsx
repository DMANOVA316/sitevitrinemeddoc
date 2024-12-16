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

export default function useContactRedux() {
  const dispatch = useDispatch<AppDispatch>();
  const { contacts, filter, status, error } = useSelector(
    (state: RootState) => state.contact
  );

  const filteredContacts = useMemo(() => {
    if (filter === "all") return contacts;
    return contacts.filter((contact) =>
      filter === "read" ? contact.vue : !contact.vue
    );
  }, [contacts, filter]);

  const loadContacts = useCallback(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const setFilterType = useCallback(
    (filterType: "all" | "read" | "unread") => {
      dispatch(setFilter(filterType));
    },
    [dispatch]
  );

  const markAsViewed = useCallback(
    async (id: number) => {
      await dispatch(markContactAsViewed(id)).unwrap();
    },
    [dispatch]
  );

  const removeContact = useCallback(
    async (id: number) => {
      await dispatch(deleteContact(id)).unwrap();
    },
    [dispatch]
  );

  const addContact = useCallback(
    async (contact: Omit<contactez_nous, "id" | "date_envoye" | "vue">) => {
      await dispatch(createContact(contact)).unwrap();
    },
    [dispatch]
  );

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
