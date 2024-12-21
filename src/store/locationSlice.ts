import { locationService } from "@/services/locationService";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./index";

// Structure de l'état pour la couverture (landing page)
interface LocationState {
  provinces: Province[];
  regions: Region[];
  districts: District[];
  communes: Commune[];
  selectedProvince: string;
  selectedRegion: string;
  selectedDistrict: string;
  selectedCommune: string;
  isLoading: boolean;
  error: string | null;
}

// Etat initial
const initialState: LocationState = {
  provinces: [],
  regions: [],
  districts: [],
  communes: [],
  selectedProvince: "",
  selectedRegion: "",
  selectedDistrict: "",
  selectedCommune: "",
  isLoading: false,
  error: null,
};

// Gestion des actions asynchrones
/**
 * Recupere les données de localisation
 * @returns Les données de localisation
 */
export const fetchLocations = createAsyncThunk(
  "location/fetchLocations",
  async (_, { rejectWithValue }) => {
    try {
      const [provinces, regions, districts, communes] = await Promise.all([
        locationService.fetchProvinces(),
        locationService.fetchRegions(),
        locationService.fetchDistricts(),
        locationService.fetchCommunes(),
      ]);
      return { provinces, regions, districts, communes };
    } catch (error) {
      return rejectWithValue(
        "Erreur lors du chargement des données de localisation"
      );
    }
  }
);

/**
 * Initialise les données de localisation à partir des noms des éléments
 * @param locations Les noms des éléments de localisation
 * @returns Les données de localisation initialisées
 */
export const initializeFromNames = createAsyncThunk(
  "location/initializeFromNames",
  async (
    locations: {
      province?: string;
      region?: string;
      district?: string;
      commune?: string;
    },
    { getState }
  ) => {
    const state = getState() as RootState;
    const { provinces, regions, districts, communes } = state.location;

    // Rechercher les IDs des éléments de localisation par leurs noms
    return {
      provinceId:
        provinces.find((p) => p.name === locations.province)?.["@id"] || "",
      regionId: regions.find((r) => r.name === locations.region)?.["@id"] || "",
      districtId:
        districts.find((d) => d.name === locations.district)?.["@id"] || "",
      communeId:
        communes.find((c) => c.name === locations.commune)?.["@id"] || "",
    };
  }
);

/**
 * Gestion des actions de modification de localisation
 */
const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    // Actions de modification
    // Mettre à jour les informations de province, region, district et commune selectionnées
    setSelectedProvince: (state, action: PayloadAction<string>) => {
      state.selectedProvince = action.payload;
      state.selectedRegion = "";
      state.selectedDistrict = "";
      state.selectedCommune = "";
    },
    setSelectedRegion: (state, action: PayloadAction<string>) => {
      state.selectedRegion = action.payload;
      state.selectedDistrict = "";
      state.selectedCommune = "";
    },
    setSelectedDistrict: (state, action: PayloadAction<string>) => {
      state.selectedDistrict = action.payload;
      state.selectedCommune = "";
    },
    setSelectedCommune: (state, action: PayloadAction<string>) => {
      state.selectedCommune = action.payload;
    },
    resetLocations: (state) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      // Gestion des actions asynchrones
      .addCase(fetchLocations.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchLocations.fulfilled, (state, action) => {
        state.isLoading = false;
        state.provinces = action.payload.provinces;
        state.regions = action.payload.regions;
        state.districts = action.payload.districts;
        state.communes = action.payload.communes;
      })
      .addCase(fetchLocations.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(initializeFromNames.fulfilled, (state, action) => {
        state.selectedProvince = action.payload.provinceId;
        state.selectedRegion = action.payload.regionId;
        state.selectedDistrict = action.payload.districtId;
        state.selectedCommune = action.payload.communeId;
      });
  },
});

// Operations de filtres pour avoir la bonne information
export const selectLocationState = (state: RootState) => state.location;

export const selectFilteredRegions = (state: RootState) =>
  state.location.regions.filter(
    (region) => region.province["@id"] === state.location.selectedProvince
  );

export const selectFilteredDistricts = (state: RootState) =>
  state.location.districts.filter(
    (district) => district.region["@id"] === state.location.selectedRegion
  );

export const selectFilteredCommunes = (state: RootState) =>
  state.location.communes.filter(
    (commune) => commune.district["@id"] === state.location.selectedDistrict
  );

export const selectLocationNames = (state: RootState) => {
  const {
    provinces,
    regions,
    districts,
    communes,
    selectedProvince,
    selectedRegion,
    selectedDistrict,
    selectedCommune,
  } = state.location;

  // Rechercher les noms des éléments de localisation par leurs IDs
  return {
    province: provinces.find((p) => p["@id"] === selectedProvince)?.name || "",
    region: regions.find((r) => r["@id"] === selectedRegion)?.name || "",
    district: districts.find((d) => d["@id"] === selectedDistrict)?.name || "",
    commune: communes.find((c) => c["@id"] === selectedCommune)?.name || "",
  };
};

export const {
  setSelectedProvince,
  setSelectedRegion,
  setSelectedDistrict,
  setSelectedCommune,
  resetLocations,
} = locationSlice.actions;

export default locationSlice.reducer;
