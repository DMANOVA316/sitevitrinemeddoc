import { contactService } from "@/services/contactService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface ContactState {
  contacts: contactez_nous[];
  filter: "all" | "viewed" | "unviewed";
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Valeur par defaut
const initialState: ContactState = {
  contacts: [],
  filter: "all",
  status: "idle",
  error: null,
};

// Fonctions utiles pour la gestion des contacts
/**
 * Recupere les contacts
 * @returns Les contacts
 */
export const fetchContacts = createAsyncThunk(
  "contact/fetchContacts",
  async (_, { rejectWithValue }) => {
    try {
      return await contactService.getAll();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/**
 * Cree un nouveau contact
 * A noter que le nombre de contacts est limité dans la fonction de service
 * @param contact Les informations du nouveau contact
 * @returns Le nouveau contact
 */
export const createContact = createAsyncThunk(
  "contact/createContact",
  async (
    contact: Omit<contactez_nous, "id" | "date_envoye" | "vue">,
    { rejectWithValue }
  ) => {
    try {
      return await contactService.create(contact);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/**
 * Supprime un contact
 * @param id L'ID du contact à supprimer
 * @returns L'ID du contact supprimé
 */
export const deleteContact = createAsyncThunk(
  "contact/deleteContact",
  async (id: number, { rejectWithValue }) => {
    try {
      await contactService.delete(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/**
 * Marque un contact comme vu
 * @param id L'ID du contact à marquer comme vu
 * @returns Le contact marqué comme vu
 */
export const markContactAsViewed = createAsyncThunk(
  "contact/markAsViewed",
  async (id: number, { rejectWithValue }) => {
    try {
      return await contactService.markAsViewed(id);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/**
 * Slice Redux pour la gestion des contacts
 * Gère les états et actions liés aux contacts
 */
const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    // Appliquer un filtre
    setFilter(state, action) {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Contacts
      .addCase(fetchContacts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.contacts = action.payload;
        state.error = null;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      // Créer un contact
      .addCase(createContact.fulfilled, (state, action) => {
        state.contacts.unshift(action.payload);
      })
      // Supprimer un contact
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.contacts = state.contacts.filter(
          (contact) => contact.id !== action.payload
        );
      })
      // Marquer comme vu
      .addCase(markContactAsViewed.fulfilled, (state, action) => {
        const index = state.contacts.findIndex(
          (contact) => contact.id === action.payload.id
        );
        if (index !== -1) {
          state.contacts[index] = action.payload;
        }
      });
  },
});

export const { setFilter } = contactSlice.actions;
export default contactSlice.reducer;
