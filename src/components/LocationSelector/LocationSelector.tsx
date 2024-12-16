import { Label } from "../ui/label";
import SelectProvince from "./SelectProvince";
import SelectRegion from "./SelectRegion";
import SelectDistrict from "./SelectDistrict";
import SelectCommune from "./SelectCommune";
import { useEffect, forwardRef, useImperativeHandle } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLocations,
  initializeFromNames,
  selectLocationState,
  selectFilteredRegions,
  selectFilteredDistricts,
  selectFilteredCommunes,
  selectLocationNames,
  setSelectedProvince,
  setSelectedRegion,
  setSelectedDistrict,
  setSelectedCommune,
  resetLocations,
} from "@/store/locationSlice";
import { AppDispatch } from "@/store";

interface LocationSelectorProps {
  onLocationChange: (location: {
    province: string;
    region?: string;
    district?: string;
    commune: string;
  }) => void;
  initialValues?: {
    province?: string;
    region?: string;
    district?: string;
    commune?: string;
  };
}

export interface LocationSelectorRef {
  reset: () => void;
}

const LocationSelector = forwardRef<LocationSelectorRef, LocationSelectorProps>(({
  onLocationChange,
  initialValues,
}, ref) => {
  const dispatch = useDispatch<AppDispatch>();
  const locationState = useSelector(selectLocationState);
  const { provinces, selectedProvince, selectedRegion, selectedDistrict, selectedCommune } = locationState;
  const filteredRegions = useSelector(selectFilteredRegions);
  const filteredDistricts = useSelector(selectFilteredDistricts);
  const filteredCommunes = useSelector(selectFilteredCommunes);

  // Charger les données au montage du composant
  useEffect(() => {
    dispatch(fetchLocations());
  }, [dispatch]);

  // Initialiser les valeurs si on est en mode édition
  useEffect(() => {
    if (initialValues && provinces.length > 0) {
      dispatch(initializeFromNames(initialValues));
    }
  }, [dispatch, initialValues, provinces]);

  // Mettre à jour le parent quand la sélection change
  useEffect(() => {
    if (selectedProvince && selectedCommune) {
      const locationNames = selectLocationNames({ location: locationState });
      onLocationChange(locationNames);
    }
  }, [selectedProvince, selectedRegion, selectedDistrict, selectedCommune, locationState]);

  useImperativeHandle(ref, () => ({
    reset: () => {
      dispatch(resetLocations());
    }
  }));

  return (
    <div className="space-y-4">
      <Label className="text-sm font-medium text-gray-700">
        Situation Géographique
      </Label>
      <div className="grid grid-cols-2 gap-4 mt-2">
        <SelectProvince
          provinces={provinces}
          value={selectedProvince}
          onChange={(value) => dispatch(setSelectedProvince(value))}
        />
        <SelectRegion
          regions={filteredRegions}
          value={selectedRegion}
          onChange={(value) => dispatch(setSelectedRegion(value))}
          disabled={!selectedProvince}
        />
        <SelectDistrict
          districts={filteredDistricts}
          value={selectedDistrict}
          onChange={(value) => dispatch(setSelectedDistrict(value))}
          disabled={!selectedRegion}
        />
        <SelectCommune
          communes={filteredCommunes}
          value={selectedCommune}
          onChange={(value) => dispatch(setSelectedCommune(value))}
          disabled={!selectedDistrict}
        />
      </div>
    </div>
  );
});

export default LocationSelector;
