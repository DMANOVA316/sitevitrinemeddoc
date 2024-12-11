import { useState, useEffect, useCallback, useMemo } from "react";
import {
  fetchProvinces,
  fetchRegions,
  fetchDistricts,
  fetchCommunes,
} from "../../services/api";
import SelectRegion from "./SelectRegion";
import SelectDistrict from "./SelectDistrict";
import SelectCommune from "./SelectCommune";
import SelectProvince from "./SelectProvince";
import { Label } from "../ui/label";

interface LocationSelectorProps {
  onLocationChange: (
    location: {
      province: string;
      region?: string;
      district?: string;
      commune: string;
    }
  ) => void;
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
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [regions, setRegions] = useState<Region[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [communes, setCommunes] = useState<Commune[]>([]);
  const [selectedProvince, setSelectedProvince] = useState(
    initialValues?.province || ""
  );
  const [selectedRegion, setSelectedRegion] = useState(
    initialValues?.region || ""
  );
  const [selectedDistrict, setSelectedDistrict] = useState(
    initialValues?.district || ""
  );
  const [selectedCommune, setSelectedCommune] = useState(
    initialValues?.commune || ""
  );

  useEffect(() => {
    fetchProvinces().then(setProvinces);
    fetchRegions().then(setRegions);
    fetchDistricts().then(setDistricts);
    fetchCommunes().then(setCommunes);
  }, []);

  const handleLocationChange = useCallback(() => {
    onLocationChange({
      province: selectedProvince,
      region: selectedRegion,
      district: selectedDistrict,
      commune: selectedCommune,
    });
  }, [
    onLocationChange,
    selectedProvince,
    selectedRegion,
    selectedDistrict,
    selectedCommune,
  ]);

  useEffect(() => {
    handleLocationChange();
  }, [handleLocationChange]);

  const filteredRegions = useMemo(() => {
    return regions.filter((region) => region.province["@id"] === selectedProvince);
  }, [regions, selectedProvince]);

  const filteredDistricts = useMemo(() => {
    return districts.filter((district) => district.region["@id"] === selectedRegion);
  }, [districts, selectedRegion]);

  const filteredCommunes = useMemo(() => {
    return communes.filter((commune) => commune.district["@id"] === selectedDistrict);
  }, [communes, selectedDistrict]);

  return (
    <div className="space-y-4">
      <div>
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
    </div>
  );
};

export default LocationSelector;
