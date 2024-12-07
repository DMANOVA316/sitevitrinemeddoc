import { useState, useEffect } from "react";
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
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [regions, setRegions] = useState<Region[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [communes, setCommunes] = useState<Commune[]>([]);
  const [selectedProvince, setSelectedProvince] = useState(
    initialValues?.province || ""
  );
  const [filteredRegions, setFilteredRegions] = useState<Region[]>([]);
  const [selectedRegion, setSelectedRegion] = useState(
    initialValues?.region || ""
  );
  const [filteredDistricts, setFilteredDistricts] = useState<District[]>([]);
  const [selectedDistrict, setSelectedDistrict] = useState(
    initialValues?.district || ""
  );
  const [filteredCommunes, setFilteredCommunes] = useState<Commune[]>([]);
  const [selectedCommune, setSelectedCommune] = useState(
    initialValues?.commune || ""
  );

  // Charger les données depuis l'API
  useEffect(() => {
    fetchProvinces().then(setProvinces);
    fetchRegions().then(setRegions);
    fetchDistricts().then(setDistricts);
    fetchCommunes().then(setCommunes);
  }, []);

  // Mettre à jour le parent lorsque les sélections changent
  useEffect(() => {
    onLocationChange({
      province: selectedProvince,
      region: selectedRegion,
      district: selectedDistrict,
      commune: selectedCommune,
    });
  }, [selectedProvince, selectedRegion, selectedDistrict, selectedCommune]);

  // Filtrer les régions lorsque la province change
  useEffect(() => {
    const filtered = regions.filter(
      (region) => region.province["@id"] === selectedProvince
    );
    setFilteredRegions(filtered);
    if (!initialValues?.region) {
      setSelectedRegion("");
      setFilteredDistricts([]);
      setSelectedDistrict("");
      setFilteredCommunes([]);
    }
  }, [selectedProvince, regions]);

  // Filtrer les districts lorsque la région change
  useEffect(() => {
    const filtered = districts.filter(
      (district) => district.region["@id"] === selectedRegion
    );
    setFilteredDistricts(filtered);
    if (!initialValues?.district) {
      setSelectedDistrict("");
      setFilteredCommunes([]);
    }
  }, [selectedRegion, districts]);

  // Filtrer les communes lorsque le district change
  useEffect(() => {
    const filtered = communes.filter(
      (commune) => commune.district["@id"] === selectedDistrict
    );
    setFilteredCommunes(filtered);
  }, [selectedDistrict, communes]);

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
          />
          <SelectDistrict
            districts={filteredDistricts}
            value={selectedDistrict}
            onChange={setSelectedDistrict}
          />
          <SelectCommune
            communes={filteredCommunes}
            value={selectedCommune}
            onChange={setSelectedCommune}
          />
        </div>
      </div>
    </div>
  );
};

export default LocationSelector;
