import { couvertureService } from "@/services/couvertureService";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

// Structure de l'état pour la couverture
interface CouvertureState {
  couverture: Couverture | null;
  isLoading: boolean;
  error: string | null;
  isEditModalOpen: boolean;
}

// Valeur initiale
const initialState: CouvertureState = {
  couverture: null,
  isLoading: false,
  error: null,
  isEditModalOpen: false,
};

// Fonctions utiles pour la gestion de la couverture (landing page)
/**
 * Recupere les données de la couverture (landing page)
 * @returns Les données de la couverture
 */
export const getCouvertureData = createAsyncThunk(
  "couverture/getCouverture",
  async () => {
    const response = await couvertureService.getCouverture();
    return response;
  }
);

/**
 * Met à jour les données de la couverture (landing page)
 * @param data Les nouvelles données de la couverture
 * @returns Les nouvelles données de la couverture
 */
export const editCouvertureData = createAsyncThunk(
  "couverture/editCouverture",
  async ({ data }: { data: Partial<Couverture> }) => {
    const response = await couvertureService.updateCouverture({ ...data });
    return response;
  }
);

/**
 * Slice Redux pour la gestion de la couverture (landing page)
 * Gère les états et actions liés à la couverture
 */
const couvertureSlice = createSlice({
  name: "couverture",
  initialState,
  reducers: {
    // Gestion des chargements
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    // Gestion des erreurs
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    // Gestion de l'affichage des modals
    showEditModal: (state, action: PayloadAction<boolean>) => {
      state.isEditModalOpen = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Gestion des actions asynchrones
      .addCase(editCouvertureData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(editCouvertureData.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(editCouvertureData.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error.message ||
          "Une erreur s'est produite lors de la mise a jour du landing page";
      })
      .addCase(getCouvertureData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCouvertureData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.couverture = action.payload;
      })
      .addCase(getCouvertureData.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error.message ||
          "Une erreur s'est produite lors de la mise a jour du landing page";
      });
  },
});

export const { setError, setIsLoading, showEditModal } =
  couvertureSlice.actions;
export default couvertureSlice.reducer;
