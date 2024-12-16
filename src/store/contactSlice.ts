import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { contactService } from "@/services/contactService";

interface ContactState {
  contacts: contactez_nous[];
  filter: "all" | "viewed" | "unviewed";
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ContactState = {
  contacts: [],
  filter: "all",
  status: "idle",
  error: null,
};

export const fetchContacts = createAsyncThunk(
  "contact/fetchContacts",
  async (_, { rejectWithValue }) => {
    try {
      return await contactService.getAllContacts();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createContact = createAsyncThunk(
  "contact/createContact",
  async (
    contact: Omit<contactez_nous, "id" | "date_envoye" | "vue">,
    { rejectWithValue }
  ) => {
    try {
      return await contactService.createContact(contact);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  "contact/deleteContact",
  async (id: number, { rejectWithValue }) => {
    try {
      await contactService.deleteContact(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

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

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
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
      // Create Contact
      .addCase(createContact.fulfilled, (state, action) => {
        state.contacts.unshift(action.payload);
      })
      // Delete Contact
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.contacts = state.contacts.filter(
          (contact) => contact.id !== action.payload
        );
      })
      // Mark as Viewed
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
