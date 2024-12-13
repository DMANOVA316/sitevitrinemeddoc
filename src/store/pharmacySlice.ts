import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { pharmacyService } from "@/services/pharmacyService";

interface PharmacyState {
  pharmacies: Pharmacy[];
  currentPharmacy: Pharmacy | null;
  isLoading: boolean;
  error: string | null;
  isAddPharmacyOpen: boolean;
  isEditPharmacyOpen: boolean;
  isRemovePharmacyOpen: boolean;
}

const initialState: PharmacyState = {
  pharmacies: [],
  currentPharmacy: null,
  isLoading: false,
  error: null,
  isAddPharmacyOpen: false,
  isEditPharmacyOpen: false,
  isRemovePharmacyOpen: false,
};

export const fetchPharmacies = createAsyncThunk(
  "pharmacy/fetchPharmacies",
  async () => {
    const response = await pharmacyService.getPharmacies();
    return response;
  },
);

export const addPharmacy = createAsyncThunk(
  "pharmacy/addPharmacy",
  async ({
    pharmacyData,
    contacts,
    horaires,
  }: {
    pharmacyData: Omit<Pharmacy, "id" | "contacts" | "horaires">;
    contacts: Omit<PharmacyContact, "id" | "id_pharmacie">[];
    horaires: Omit<PharmacySchedule, "id" | "id_pharmacie">[];
  }) => {
    const response = await pharmacyService.addPharmacy(
      pharmacyData,
      contacts,
      horaires,
    );
    return response;
  },
);

export const updatePharmacy = createAsyncThunk(
  "pharmacy/updatePharmacy",
  async ({
    id,
    pharmacyData,
    contacts,
    horaires,
  }: {
    id: number;
    pharmacyData: Partial<Pharmacy>;
    contacts?: Omit<PharmacyContact, "id" | "id_pharmacie">[];
    horaires?: Omit<PharmacySchedule, "id" | "id_pharmacie">[];
  }) => {
    const response = await pharmacyService.updatePharmacy(
      id,
      pharmacyData,
      contacts,
      horaires,
    );
    return response;
  },
);

export const deletePharmacy = createAsyncThunk(
  "pharmacy/deletePharmacy",
  async (id: number) => {
    await pharmacyService.deletePharmacy(id);
    return id;
  },
);

const pharmacySlice = createSlice({
  name: "pharmacy",
  initialState,
  reducers: {
    setCurrentPharmacy: (state, action) => {
      state.currentPharmacy = action.payload;
    },
    setModalState: (
      state,
      action: PayloadAction<{
        modalType: "add" | "edit" | "remove";
        isOpen: boolean;
      }>,
    ) => {
      const { modalType, isOpen } = action.payload;
      if (modalType == "add") {
        state.isAddPharmacyOpen = isOpen;
      }
      if (modalType == "edit") {
        state.isEditPharmacyOpen = isOpen;
      }
      if (modalType == "remove") {
        state.isRemovePharmacyOpen = isOpen;
      }
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch pharmacies
      .addCase(fetchPharmacies.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPharmacies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.pharmacies = action.payload;
      })
      .addCase(fetchPharmacies.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Une erreur s'est produite";
      })
      // Add pharmacy
      .addCase(addPharmacy.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addPharmacy.fulfilled, (state, action) => {
        state.pharmacies.push(action.payload);
        state.isAddPharmacyOpen = false;
        state.isLoading = false;
      })
      .addCase(addPharmacy.rejected, (state, action) => {
        state.isAddPharmacyOpen = false;
        state.error =
          action.error.message ||
          "Une erreur s'est produite lors de l'ajout du pharmacie";
      })
      // Update pharmacy
      .addCase(updatePharmacy.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updatePharmacy.fulfilled, (state, action) => {
        const index = state.pharmacies.findIndex(
          (num) => num.id === action.payload.id,
        );
        if (index !== -1)
          state.pharmacies[index] = {
            ...state.pharmacies[index],
            ...action.payload,
          };
        state.isEditPharmacyOpen = false;
        state.isLoading = false;
      })
      .addCase(updatePharmacy.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error.message || "Erreur lors de l'edition de la pharmacie";
      })
      // Delete pharmacy
      .addCase(deletePharmacy.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deletePharmacy.fulfilled, (state, action) => {
        state.pharmacies = state.pharmacies.filter(
          (num) => num.id !== action.payload,
        );
        state.currentPharmacy = null;
        state.isRemovePharmacyOpen = false;
        state.isLoading = false;
      })
      .addCase(deletePharmacy.rejected, (state, action) => {
        state.isLoading = true;
        state.error =
          action.error.message ||
          "Une erreur s'est produite lors de la suppression de la pharmacie";
      });
  },
});

export const { setCurrentPharmacy, setModalState } = pharmacySlice.actions;

export default pharmacySlice.reducer;
