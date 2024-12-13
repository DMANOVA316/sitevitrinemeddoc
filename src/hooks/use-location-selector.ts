import { useState, useEffect, useMemo } from "react";
import { locationService } from "@/services/locationService";

export const useLocationSelector = (initialValues?: {
  province?: string;
  region?: string;
  district?: string;
  commune?: string;
}) => {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [regions, setRegions] = useState<Region[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [communes, setCommunes] = useState<Commune[]>([]);

  const [selectedProvince, setSelectedProvince] = useState(
    initialValues?.province || "",
  );
  const [selectedRegion, setSelectedRegion] = useState(
    initialValues?.region || "",
  );
  const [selectedDistrict, setSelectedDistrict] = useState(
    initialValues?.district || "",
  );
  const [selectedCommune, setSelectedCommune] = useState(
    initialValues?.commune || "",
  );

  useEffect(() => {
    locationService.fetchProvinces().then(setProvinces);
    locationService.fetchRegions().then(setRegions);
    locationService.fetchDistricts().then(setDistricts);
    locationService.fetchCommunes().then(setCommunes);
  }, []);

  const filteredRegions = useMemo(() => {
    return regions.filter(
      (region) => region.province["@id"] === selectedProvince,
    );
  }, [regions, selectedProvince]);

  const filteredDistricts = useMemo(() => {
    return districts.filter(
      (district) => district.region["@id"] === selectedRegion,
    );
  }, [districts, selectedRegion]);

  const filteredCommunes = useMemo(() => {
    return communes.filter(
      (commune) => commune.district["@id"] === selectedDistrict,
    );
  }, [communes, selectedDistrict]);

  return {
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
  };
};
