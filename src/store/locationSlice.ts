import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getLocationDataFromLocalStorage,
  saveLocationDataToLocalStorage,
  removeLocationDataFromLocalStorage,
} from "@/utils/localStorage";

interface LocationState {
  data: locationData | null; // Données de localisation
  isLoading: boolean;
  error: string | null;
}

const initialState: LocationState = {
  data: getLocationDataFromLocalStorage() || null, // Initialisation avec les données du localStorage
  isLoading: false,
  error: null,
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setLocationData: (state, action: PayloadAction<locationData>) => {
      state.data = action.payload;
      saveLocationDataToLocalStorage(action.payload); // Sauvegarde dans le localStorage
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    removeLocationData: (state) => {
      state.data = null;
      removeLocationDataFromLocalStorage(); // Retirer des données du localStorage
    },
  },
});

export const { setLocationData, setError, setLoading, removeLocationData } =
  locationSlice.actions;

export default locationSlice.reducer;
