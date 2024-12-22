import numberService from "@/services/numberService";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

// Structure de l'état pour les numéros
interface NumberState {
  numeros: Numero_meddoc[];
  currentNumber: Numero_meddoc | null;
  isLoading: boolean;
  error: string | null;
  isAddNumberOpen: boolean;
  isEditNumberOpen: boolean;
  isRemoveNumberOpen: boolean;
}

// État initial des numéros
const initialState: NumberState = {
  numeros: [],
  currentNumber: null,
  isLoading: false,
  error: null,
  isAddNumberOpen: false,
  isEditNumberOpen: false,
  isRemoveNumberOpen: false,
};

// Actions asynchrones pour la gestion des numéros
export const fetchNumbers = createAsyncThunk(
  "number/fetchNumbers",
  async () => {
    const response = await numberService.getAllNumber();
    return response;
  }
);

/**
 * @returns Le numéro ajouté
 */
export const addNumber = createAsyncThunk(
  "number/addNumber",
  async (number: Omit<Numero_meddoc, "id">) => {
    const response = await numberService.createNumber(number);
    return response;
  }
);

/**
 * @param id - L'ID du numéro à mettre à jour
 * @param data - Les données à mettre à jour avec les nouvelles valeurs
 * @returns Le numéro mis à jour
 */
export const updateNumber = createAsyncThunk(
  "number/updateNumber",
  async ({
    id,
    data,
  }: {
    id: number;
    data: Partial<Omit<Numero_meddoc, "id">>;
  }) => {
    const response = await numberService.updateNumber(id, data);
    return response;
  }
);

/*
 * @param id - L'ID du numéro à supprimer
 * @returns L'ID du numéro supprimé
 */
export const deleteNumber = createAsyncThunk(
  "number/deleteNumber",
  async ({ id }: { id: number }) => {
    if (!id) {
      throw new Error("aucun numéro sélectionné pour suppression.");
    }
    await numberService.deleteNumber(id);

    return id; // Retourne l'ID supprimé
  }
);

/**
 * Slice Redux pour la gestion des numéros
 * Gère les états et actions liés aux numéros de contact
 */
const numberSlice = createSlice({
  name: "number",
  initialState,
  reducers: {
    // Définir le numéro courant
    setCurrentNumber: (state, action: PayloadAction<Numero_meddoc | null>) => {
      state.currentNumber = action.payload;
    },
    // Contrôler l'état des modales
    setModalState: (
      state,
      action: PayloadAction<{
        modalType: "add" | "edit" | "remove";
        isOpen: boolean;
      }>
    ) => {
      const { modalType, isOpen } = action.payload;
      if (modalType == "add") {
        state.isAddNumberOpen = isOpen;
      }
      if (modalType == "edit") {
        state.isEditNumberOpen = isOpen;
      }
      if (modalType == "remove") {
        state.isRemoveNumberOpen = isOpen;
      }
    },
    // Définir l'état de chargement
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    // Définir un message d'erreur
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
  // Gestion des actions asynchrones
  extraReducers: (builder) => {
    builder
      // Récupération des numéros
      .addCase(fetchNumbers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchNumbers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.numeros = action.payload;
      })
      .addCase(fetchNumbers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Une erreur s'est produite";
      })
      // Ajout de numéro
      .addCase(addNumber.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addNumber.fulfilled, (state, action) => {
        state.numeros.push(action.payload);
        state.isAddNumberOpen = false;
        state.isLoading = false;
      })
      .addCase(addNumber.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Une erreur s'est produite";
      })
      // Mise à jour de numéro
      .addCase(updateNumber.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateNumber.fulfilled, (state, action) => {
        const index = state.numeros.findIndex(
          (num) => num.id === action.payload.id,
          (state.isEditNumberOpen = false)
        );
        if (index !== -1) state.numeros[index] = action.payload;
        state.isEditNumberOpen = false;
        state.isLoading = false;
      })
      .addCase(updateNumber.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Une erreur s'est produite";
      })
      // Suppression de numéro
      .addCase(deleteNumber.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteNumber.fulfilled, (state, action) => {
        state.numeros = state.numeros.filter(
          (num) => num.id !== action.payload
        );
        state.currentNumber = null;
        state.isRemoveNumberOpen = false;
        state.isLoading = false;
      })
      .addCase(deleteNumber.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Une erreur s'est produite";
      });
  },
});

export const { setCurrentNumber, setModalState, setIsLoading, setError } =
  numberSlice.actions;

export default numberSlice.reducer;
