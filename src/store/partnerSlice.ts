// Gestion des partenaires de l'application
import { partnerService } from "@/services/partnerService";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

// Structure de l'état pour les partenaires
interface PartnerState {
  partners: PartnerType[];
  currentPartner: PartnerType | null; // Utiles pour les operations d'edition et de suppression
  isLoading: boolean; // Utile pour la gestion des chargements
  error: string | null; // Utile pour la gestion des erreurs
  isAddPartnerOpen: boolean; // Afficher la modale d'ajout ou non
  isEditPartnerOpen: boolean; // Afficher la modale d'edition ou non
  isRemovePartnerOpen: boolean; // Afficher la modale de suppression ou non
}

// Valeur initiale
const initialState: PartnerState = {
  partners: [],
  currentPartner: null,
  isLoading: false,
  error: null,
  isAddPartnerOpen: false,
  isEditPartnerOpen: false,
  isRemovePartnerOpen: false,
};

// Fonctions utiles pour la gestion des partenaires
/**
 * Recupere la liste des partenaires
 * @returns La liste des partenaires
 */
export const fetchPartners = createAsyncThunk(
  "partner/fetchPartners",
  async () => {
    const response = await partnerService.getAllPartners();
    return response;
  }
);

/**
 * Ajoute un nouveau partenaire
 * A noter qu'une partenaire a une logo a uploader au serveur
 * @param partner Les informations du nouveau partenaire
 * @returns Le nouveau partenaire
 */
export const addPartner = createAsyncThunk(
  "partner/addPartner",
  async (partner: Omit<PartnerType, "id">) => {
    const response = await partnerService.createPartner(partner);
    return response;
  }
);

/**
 * Met à jour un partenaire existant
 * @param id L'identifiant du partenaire à mettre à jour
 * @param partner Les informations du partenaire à mettre à jour
 * @returns Le partenaire mis à jour
 */
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
  }
);

/**
 * Supprime un partenaire
 * Il faut aussi supprimer le logo du serveur
 * @param id L'identifiant du partenaire à supprimer
 */
export const deletePartner = createAsyncThunk(
  "partner/deletePartner",
  async (id: number) => {
    await partnerService.deletePartner(id);
    return id;
  }
);

// Slice Redux pour la gestion des partenaires
const partnerSlice = createSlice({
  name: "partner",
  initialState,
  reducers: {
    // Partenaire actuellement selectionné pour les operations d'edition et de suppression
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
