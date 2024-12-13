import { Label } from "../ui/label";
import { useLocationSelector } from "@/hooks/use-location-selector";
import SelectProvince from "./SelectProvince";
import SelectRegion from "./SelectRegion";
import SelectDistrict from "./SelectDistrict";
import SelectCommune from "./SelectCommune";
import { useEffect } from "react";

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
  const {
    provinces,
    filteredRegions,
    filteredDistricts,
    filteredCommunes,
    selectedProvince,
    selectedRegion,
    selectedDistrict,
    selectedCommune,
    setSelectedProvince,
    setSelectedRegion,
    setSelectedDistrict,
    setSelectedCommune,
    getLocationNames,
  } = useLocationSelector(initialValues);

  useEffect(() => {
    if (selectedProvince && selectedCommune) {
      const locationNames = getLocationNames();
      onLocationChange(locationNames);
    }
  }, [
    selectedProvince,
    selectedRegion,
    selectedDistrict,
    selectedCommune,
    onLocationChange,
  ]);

  return (
    <div className="space-y-4">
      <Label className="text-sm font-medium text-gray-700">
        Situation Géographique
      </Label>
      <div className="grid grid-cols-2 gap-4 mt-2">
        <SelectProvince
          provinces={provinces}
          value={selectedProvince}
          onChange={setSelectedProvince}
        />
        <SelectRegion
          regions={filteredRegions}
          value={selectedRegion}
          onChange={setSelectedRegion}
          disabled={!selectedProvince}
        />
        <SelectDistrict
          districts={filteredDistricts}
          value={selectedDistrict}
          onChange={setSelectedDistrict}
          disabled={!selectedRegion}
        />
        <SelectCommune
          communes={filteredCommunes}
          value={selectedCommune}
          onChange={setSelectedCommune}
          disabled={!selectedDistrict}
        />
      </div>
    </div>
  );
};

export default LocationSelector;
