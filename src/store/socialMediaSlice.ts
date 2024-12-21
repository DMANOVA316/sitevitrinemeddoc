import { socialMediaService } from "@/services/socialMediaService";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

// Structure de l'état pour les reseaux sociaux
interface SocialMediaState {
  socialMedias: SocialMedia[]; // Stocker les réseaux sociaux du site
  currentSocialMedia: SocialMedia | null; // Stocker le réseau social courant pour faciliter les actions d'edition et de suppression
  isLoading: boolean; // Gestion des chargements
  error: string | null; // Gestion des erreurs
  isAddSocialMediaOpen: boolean; // Utiles pour la gestion des modales
  isEditSocialMediaOpen: boolean;
  isRemoveSocialMediaOpen: boolean;
}

const initialState: SocialMediaState = {
  socialMedias: [],
  currentSocialMedia: null,
  isLoading: false,
  error: null,
  isAddSocialMediaOpen: false,
  isEditSocialMediaOpen: false,
  isRemoveSocialMediaOpen: false,
};

// Fonctions utiles pour la gestion des reseaux sociaux
/**
 * Recupere la liste des reseaux sociaux
 * @returns La liste des reseaux sociaux
 */
export const fetchSocialMedias = createAsyncThunk(
  "socialMedia/fetchSocialMedias",
  async () => {
    const response = await socialMediaService.getAllSocialMedia();
    return response;
  }
);

/**
 * Ajoute un nouveau reseau social
 * @param newSocialMedia Le nouveau reseau social a ajouter
 * @returns Le reseau social ajoute
 */
export const addSocialMedia = createAsyncThunk(
  "socialMedia/addSocialMedia",
  async (newSocialMedia: Omit<SocialMedia, "id">) => {
    const response = await socialMediaService.createSocialMedia(newSocialMedia);
    return response;
  }
);

/**
 * Met a jour un reseau social existant
 * @param id L'identifiant du reseau social à mettre à jour
 * @param socialMedia Les données mises à jour du reseau social
 * @returns Le reseau social mis à jour
 */
export const updateSocialMedia = createAsyncThunk(
  "socialMedia/updateSocialMedia",
  async ({
    id,
    socialMedia,
  }: {
    id: number;
    socialMedia: Partial<Omit<SocialMedia, "id">>;
  }) => {
    const response = await socialMediaService.updateSocialMedia(
      id,
      socialMedia
    );
    return response;
  }
);

/**
 * Supprime un reseau social
 * @param id L'identifiant du reseau social à supprimer
 * @returns L'identifiant du reseau social supprimé
 */
export const deleteSocialMedia = createAsyncThunk(
  "socialMedia/deleteSocialMedia",
  async ({ id }: { id: number }) => {
    if (!id) {
      throw new Error("aucun réseau social sélectionné pour suppression.");
    }
    await socialMediaService.deleteSocialMedia(id);
    return id;
  }
);

// Slice Redux pour la gestion des reseaux sociaux
const socialMediaSlice = createSlice({
  name: "socialMedia",
  initialState,
  reducers: {
    setCurrentSocialMedia: (
      state,
      action: PayloadAction<SocialMedia | null>
    ) => {
      state.currentSocialMedia = action.payload;
    },
    // Gestion de l'affichage des modals relatives aux composants reseaux sociaux
    setModalState: (
      state,
      action: PayloadAction<{
        modalType: "add" | "edit" | "remove";
        isOpen: boolean;
      }>
    ) => {
      const { modalType, isOpen } = action.payload;
      if (modalType === "add") state.isAddSocialMediaOpen = isOpen;
      if (modalType === "edit") state.isEditSocialMediaOpen = isOpen;
      if (modalType === "remove") state.isRemoveSocialMediaOpen = isOpen;
    },
    setisLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Gestion des actions asynchrones
      // Recuperation des données
      .addCase(fetchSocialMedias.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSocialMedias.fulfilled, (state, action) => {
        state.isLoading = false;
        state.socialMedias = action.payload;
      })
      .addCase(fetchSocialMedias.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Une erreur s'est produite";
      })
      // Ajout
      .addCase(addSocialMedia.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addSocialMedia.fulfilled, (state, action) => {
        state.socialMedias.push(action.payload);
        state.isAddSocialMediaOpen = false;
        state.isLoading = false;
      })
      .addCase(addSocialMedia.rejected, (state, action) => {
        state.error = action.error.message || "Une erreur s'est produite";
        state.isLoading = false;
      })
      // Mise à jour
      .addCase(updateSocialMedia.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateSocialMedia.fulfilled, (state, action) => {
        const index = state.socialMedias.findIndex(
          (num) => num.id === action.payload.id,
          (state.isEditSocialMediaOpen = false)
        );
        if (index !== -1) state.socialMedias[index] = action.payload;
        state.isEditSocialMediaOpen = false;
        state.isLoading = false;
      })
      .addCase(updateSocialMedia.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Une erreur s'est produite";
      })
      // Suppression
      .addCase(deleteSocialMedia.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteSocialMedia.fulfilled, (state, action) => {
        state.socialMedias = state.socialMedias.filter(
          (num) => num.id !== action.payload
        );
        state.currentSocialMedia = null;
        state.isRemoveSocialMediaOpen = false;
        state.isLoading = false;
      })
      .addCase(deleteSocialMedia.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Une erreur s'est produite";
      });
  },
});

export const { setCurrentSocialMedia, setModalState, setisLoading, setError } =
  socialMediaSlice.actions;

export default socialMediaSlice.reducer;
