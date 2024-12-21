import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import {
  fetchLocations,
  setSelectedLocation,
  clearSelectedLocation,
} from "@/store/locationSlice";

/**
 * Hook Redux pour la gestion des données de localisation
 * Fournit des actions de chargement et de sélection
 */
export default function useLocationRedux() {
  const dispatch = useDispatch<AppDispatch>();

  // Sélection de l'état global des localisations
  const {
    provinces,
    regions,
    districts,
    communes,
    selectedLocation,
    isLoading,
    error,
  } = useSelector((state: RootState) => state.location);

  // Charger toutes les localisations
  const loadLocations = async () => {
    await dispatch(fetchLocations());
  };

  // Sélectionner une localisation spécifique
  const selectLocation = (location: {
    province?: string;
    region?: string;
    district?: string;
    commune?: string;
  }) => {
    dispatch(setSelectedLocation(location));
  };

  // Réinitialiser la localisation sélectionnée
  const resetLocation = () => {
    dispatch(clearSelectedLocation());
  };

  // Retourne les états et actions liés aux localisations
  return {
    provinces,
    regions,
    districts,
    communes,
    selectedLocation,
    isLoading,
    error,
    loadLocations,
    selectLocation,
    resetLocation,
  };
}
