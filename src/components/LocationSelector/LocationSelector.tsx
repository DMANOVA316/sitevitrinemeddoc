import { Label } from "../ui/label";
import SelectProvince from "./SelectProvince";
import SelectRegion from "./SelectRegion";
import SelectDistrict from "./SelectDistrict";
import SelectCommune from "./SelectCommune";
import { useEffect } from "react";
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

const LocationSelector = ({
  onLocationChange,
  initialValues,
}: LocationSelectorProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { provinces, selectedProvince, selectedRegion, selectedDistrict, selectedCommune } = useSelector(selectLocationState);
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
      onLocationChange({
        province: selectedProvince,
        region: selectedRegion || "",
        district: selectedDistrict || "",
        commune: selectedCommune
      });
    }
  }, [selectedProvince, selectedRegion, selectedDistrict, selectedCommune, onLocationChange]);

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
};

export default LocationSelector;
