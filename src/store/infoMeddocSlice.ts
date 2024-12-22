// Gerer lest informations de MeDDoc
import infoMeddocService from "@/services/infoMeddocService";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

// Structure de l'état
interface InfoMeddocState {
  infoMeddoc: Info_page_meddoc | null;
  isLoading: boolean;
  error: string | null;
  isEditInformationOpen: boolean;
}

// Valeur initiale
const initialState: InfoMeddocState = {
  infoMeddoc: null,
  isLoading: false,
  error: null,
  isEditInformationOpen: false,
};

// Fonctions utiles pour la gestion des informations de MeDDoc
/**
 * Recupere les informations de MeDDoc
 * @returns Les informations de MeDDoc
 */
export const fetchInformations = createAsyncThunk(
  "infoMeddoc/fetchInfos",
  async () => {
    const response = await infoMeddocService.getInfo();
    return response;
  }
);

/**
 * @param id - L'ID de l'information à mettre à jour
 * @param data - Les données à mettre à jour avec les nouvelles valeurs
 * @param files - Les fichiers à ajouter ou à mettre à jour (upload)
 * @returns L'information mise à jour
 */
export const updateInfos = createAsyncThunk(
  "infoMeddoc/updateInfos",
  async ({
    id,
    data,
    files,
  }: {
    id: number;
    data: Partial<Info_page_meddoc>;
    files?: { logo: File; favicon: File };
  }) => {
    const response = await infoMeddocService.updateInfo(
      id,
      data,
      files ? files : null
    );
    return response;
  }
);

/**
 * Slice Redux pour la gestion des informations de MeDDoc
 * Gère les états et actions liés aux informations de MeDDoc
 */
const infoMeddocSlice = createSlice({
  name: "infoMeddoc",
  initialState,
  reducers: {
    // Gestion de l'affichage des modals
    setIsEditInfoModal: (state, action: PayloadAction<boolean>) => {
      state.isEditInformationOpen = action.payload;
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
      // Gestion des actions asynchrones
      .addCase(fetchInformations.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(fetchInformations.fulfilled, (state, action) => {
        state.isLoading = false;
        state.infoMeddoc = action.payload;
      })
      .addCase(fetchInformations.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error.message ||
          "Erreur lors de la recuperation des informations";
      })
      .addCase(updateInfos.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(updateInfos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.infoMeddoc = { ...action.payload };
        state.isEditInformationOpen = false;
      })
      .addCase(updateInfos.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error.message ||
          "Une erreur s'est produite lors de la mise a jours des informations";
      });
  },
});

export const { setIsEditInfoModal, setError, setIsLoading } =
  infoMeddocSlice.actions;
export default infoMeddocSlice.reducer;
