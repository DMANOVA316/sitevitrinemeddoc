import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import {
  fetchLocations,
  setSelectedLocation,
  clearSelectedLocation,
} from "@/store/locationSlice";

export default function useLocationRedux() {
  const dispatch = useDispatch<AppDispatch>();

  const {
    provinces,
    regions,
    districts,
    communes,
    selectedLocation,
    isLoading,
    error,
  } = useSelector((state: RootState) => state.location);

  const loadLocations = async () => {
    await dispatch(fetchLocations());
  };

  const selectLocation = (location: {
    province?: string;
    region?: string;
    district?: string;
    commune?: string;
  }) => {
    dispatch(setSelectedLocation(location));
  };

  const resetLocation = () => {
    dispatch(clearSelectedLocation());
  };

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
