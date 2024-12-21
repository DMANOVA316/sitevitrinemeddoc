import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Structure de l'état pour les ambulances
export interface Contact {
  id?: number;
  id_ambulance?: number;
  numero: string;
}

export interface Ambulance {
  id?: number;
  nom: string;
  contact?: string;
  address: string;
  province: string;
  region?: string;
  district?: string;
  commune: string;
  localisation?: { x: number; y: number };
  contacts?: Contact[];
}

// Etat initial
interface AmbulanceState {
  ambulances: Ambulance[];
  loading: boolean;
  error: string | null;
}

const initialState: AmbulanceState = {
  ambulances: [],
  loading: false,
  error: null,
};

/**
 * Slice de gestion des ambulances
 * Gère les états et actions liés aux ambulances
 */
const ambulanceSlice = createSlice({
  name: "ambulance",
  initialState,
  reducers: {
    // Actions
    setAmbulances: (state, action: PayloadAction<Ambulance[]>) => {
      state.ambulances = action.payload;
      state.loading = false;
      state.error = null;
    },
    // CRUD ambulances pour nos etats redux
    addAmbulance: (state, action: PayloadAction<Ambulance>) => {
      state.ambulances.push(action.payload);
    },
    updateAmbulance: (state, action: PayloadAction<Ambulance>) => {
      const index = state.ambulances.findIndex(
        (amb) => amb.id === action.payload.id
      );
      if (index !== -1) {
        state.ambulances[index] = action.payload;
      }
    },
    deleteAmbulance: (state, action: PayloadAction<number>) => {
      state.ambulances = state.ambulances.filter(
        (amb) => amb.id !== action.payload
      );
    },
    // Gestion des chargements
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    // Gestion des erreurs
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  setAmbulances,
  addAmbulance,
  updateAmbulance,
  deleteAmbulance,
  setLoading,
  setError,
} = ambulanceSlice.actions;

export default ambulanceSlice.reducer;
