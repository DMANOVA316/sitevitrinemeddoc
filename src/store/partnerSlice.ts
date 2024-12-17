import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { partnerService } from "@/services/partnerService";

interface PartnerState {
  partners: PartnerType[];
  currentPartner: PartnerType | null;
  isLoading: boolean;
  error: string | null;
  isAddPartnerOpen: boolean;
  isEditPartnerOpen: boolean;
  isRemovePartnerOpen: boolean;
}

const initialState: PartnerState = {
  partners: [],
  currentPartner: null,
  isLoading: false,
  error: null,
  isAddPartnerOpen: false,
  isEditPartnerOpen: false,
  isRemovePartnerOpen: false,
};

export const fetchPartners = createAsyncThunk(
  "partner/fetchPartners",
  async () => {
    const response = await partnerService.getAllPartners();
    return response;
  },
);

export const addPartner = createAsyncThunk(
  "partner/addPartner",
  async (partner: Omit<PartnerType, "id">) => {
    const response = await partnerService.createPartner(partner);
    return response;
  },
);

export const updatePartner = createAsyncThunk(
  "partner/updatePartner",
  async ({
    id,
    partner,
  }: {
    id: number;
    partner: Partial<Omit<PartnerType, "id">>;
  }) => {
    const response = await partnerService.updatePartner(id, partner);
    return response;
  },
);

export const deletePartner = createAsyncThunk(
  "partner/deletePartner",
  async (id: number) => {
    await partnerService.deletePartner(id);
    return id;
  },
);

const partnerSlice = createSlice({
  name: "partner",
  initialState,
  reducers: {
    setCurrentPartner: (state, action: PayloadAction<PartnerType | null>) => {
      state.currentPartner = action.payload;
    },
    setAddPartnerOpen: (state, action: PayloadAction<boolean>) => {
      state.isAddPartnerOpen = action.payload;
    },
    setEditPartnerOpen: (state, action: PayloadAction<boolean>) => {
      state.isEditPartnerOpen = action.payload;
    },
    setRemovePartnerOpen: (state, action: PayloadAction<boolean>) => {
      state.isRemovePartnerOpen = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPartners.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPartners.fulfilled, (state, action) => {
        state.isLoading = false;
        state.partners = action.payload;
      })
      .addCase(fetchPartners.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Une erreur s'est produite";
      })
      .addCase(addPartner.fulfilled, (state) => {
        state.isAddPartnerOpen = false;
      })
      .addCase(updatePartner.fulfilled, (state) => {
        state.isEditPartnerOpen = false;
      })
      .addCase(deletePartner.fulfilled, (state) => {
        state.isRemovePartnerOpen = false;
        state.currentPartner = null;
      });
  },
});

export const {
  setCurrentPartner,
  setAddPartnerOpen,
  setEditPartnerOpen,
  setRemovePartnerOpen,
  setIsLoading,
  setError,
} = partnerSlice.actions;

export default partnerSlice.reducer;
