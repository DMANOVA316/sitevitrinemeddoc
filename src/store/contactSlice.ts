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
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { contact: ContactState };
      let data: contactez_nous[];

      switch (state.contact.filter) {
        case "viewed":
          data = await contactService.getViewedContacts();
          break;
        case "unviewed":
          data = await contactService.getUnviewedContacts();
          break;
        default:
          data = await contactService.getContacts();
      }
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const markContactAsViewed = createAsyncThunk(
  "contact/markAsViewed",
  async (id: number, { dispatch, rejectWithValue }) => {
    try {
      await contactService.markAsViewed(id);
      dispatch(fetchContacts());
      return id;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
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
      });
  },
});

export const { setFilter } = contactSlice.actions;
export default contactSlice.reducer;
