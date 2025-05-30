import { pharmacyService } from "@/services/pharmacyService";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

// Structure de l'état pour les pharmacies
interface PharmacyState {
  pharmacies: Pharmacy[]; // Stocker les pharmacies du backend
  currentPharmacy: Pharmacy | null; // Pharmacie courante (utiles pour les operations d'edition et de suppression) dans les modaux
  isLoading: boolean; // Gestion des chargements
  error: string | null; // Gestion des erreurs
  isAddPharmacyOpen: boolean; // Gestion des modales
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

// Fonctions utiles pour la gestion des pharmacies
/**
 * Recupere la liste des pharmacies
 * @returns La liste des pharmacies
 */
export const fetchPharmacies = createAsyncThunk(
  "pharmacy/fetchPharmacies",
  async () => {
    const response = await pharmacyService.getPharmacies();
    return response;
  }
);

/**
 * Ajoute une nouvelle pharmacie
 * A noter qu'une pharmacie a une logo a uploader au serveur
 * Une pharmacie peut avoir plusieurs contacts
 * @param pharmacyData Les données de la pharmacie
 * @param contacts Les contacts de la pharmacie
 * @param horaires Les horaires de la pharmacie
 * @returns La pharmacie ajoutée
 */
export const addPharmacy = createAsyncThunk(
  "pharmacy/addPharmacy",
  async ({
    pharmacyData,
    contacts,
  }: {
    pharmacyData: Omit<Pharmacy, "id" | "contacts">;
    contacts: Omit<PharmacyContact, "id" | "id_pharmacie">[];
  }) => {
    const response = await pharmacyService.addPharmacy(pharmacyData, contacts);
    return response;
  }
);

/**
 * Met a jour une pharmacie
 * @param id L'ID de la pharmacie
 * @param pharmacyData Les données de la pharmacie
 * @param contacts Les contacts de la pharmacie
 * @param horaires Les horaires de la pharmacie
 * @returns La pharmacie mise à jour
 */
export const updatePharmacy = createAsyncThunk(
  "pharmacy/updatePharmacy",
  async ({
    id,
    pharmacyData,
    contacts,
  }: {
    id: number;
    pharmacyData: Partial<Pharmacy>;
    contacts?: Omit<PharmacyContact, "id" | "id_pharmacie">[];
  }) => {
    const response = await pharmacyService.updatePharmacy(
      id,
      pharmacyData,
      contacts
    );
    return response;
  }
);

/**
 * Supprime une pharmacie
 * Il faudra supprimer le logo du serveur et les contacts liés au pharmacien a retirer
 * @param id L'ID de la pharmacie
 * @returns L'ID de la pharmacie supprimée
 */
export const deletePharmacy = createAsyncThunk(
  "pharmacy/deletePharmacy",
  async (id: number) => {
    await pharmacyService.deletePharmacy(id);
    return id;
  }
);

// Slice Redux pour la gestion des pharmacies
const pharmacySlice = createSlice({
  name: "pharmacy",
  initialState,
  reducers: {
    // Actions de mise à jour de l'état
    setCurrentPharmacy: (state, action) => {
      state.currentPharmacy = action.payload;
    },
    // Gestion de l'affichage des modals
    setModalState: (
      state,
      action: PayloadAction<{
        modalType: "add" | "edit" | "remove";
        isOpen: boolean;
      }>
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
    // Gestion des chargements
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    // Gestion des erreurs
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Gestion des actions asynchrones
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
        // Mettre à jour la pharmacie
        const index = state.pharmacies.findIndex(
          (num) => num.id === action.payload.id
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
          (num) => num.id !== action.payload
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
