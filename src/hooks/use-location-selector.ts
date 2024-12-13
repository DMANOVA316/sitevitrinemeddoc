import { useState, useEffect, useMemo } from 'react';
import { locationService } from '@/services/locationService';

interface LocationSelectorState {
  provinces: Province[];
  regions: Region[];
  districts: District[];
  communes: Commune[];
  selectedProvince: string;
  selectedRegion: string;
  selectedDistrict: string;
  selectedCommune: string;
}

interface LocationSelectorInitialValues {
  province?: string;
  region?: string;
  district?: string;
  commune?: string;
}

export const useLocationSelector = (initialValues?: LocationSelectorInitialValues) => {
  const [data, setData] = useState<LocationSelectorState>({
    provinces: [],
    regions: [],
    districts: [],
    communes: [],
    selectedProvince: initialValues?.province || '',
    selectedRegion: initialValues?.region || '',
    selectedDistrict: initialValues?.district || '',
    selectedCommune: initialValues?.commune || '',
  });

  // Charger les données initiales
  useEffect(() => {
    const loadData = async () => {
      const [provinces, regions, districts, communes] = await Promise.all([
        locationService.fetchProvinces(),
        locationService.fetchRegions(),
        locationService.fetchDistricts(),
        locationService.fetchCommunes(),
      ]);

      setData(prev => ({
        ...prev,
        provinces,
        regions,
        districts,
        communes,
      }));
    };

    loadData();
  }, []);

  // Filtrer les régions en fonction de la province sélectionnée
  const filteredRegions = useMemo(() => {
    return data.regions.filter(
      (region) => region.province['@id'] === data.selectedProvince
    );
  }, [data.regions, data.selectedProvince]);

  // Filtrer les districts en fonction de la région sélectionnée
  const filteredDistricts = useMemo(() => {
    return data.districts.filter(
      (district) => district.region['@id'] === data.selectedRegion
    );
  }, [data.districts, data.selectedRegion]);

  // Filtrer les communes en fonction du district sélectionné
  const filteredCommunes = useMemo(() => {
    return data.communes.filter(
      (commune) => commune.district['@id'] === data.selectedDistrict
    );
  }, [data.communes, data.selectedDistrict]);

  const setSelectedProvince = (provinceId: string) => {
    setData(prev => ({
      ...prev,
      selectedProvince: provinceId,
      selectedRegion: '',
      selectedDistrict: '',
      selectedCommune: '',
    }));
  };

  const setSelectedRegion = (regionId: string) => {
    setData(prev => ({
      ...prev,
      selectedRegion: regionId,
      selectedDistrict: '',
      selectedCommune: '',
    }));
  };

  const setSelectedDistrict = (districtId: string) => {
    setData(prev => ({
      ...prev,
      selectedDistrict: districtId,
      selectedCommune: '',
    }));
  };

  const setSelectedCommune = (communeId: string) => {
    setData(prev => ({
      ...prev,
      selectedCommune: communeId,
    }));
  };

  // Obtenir les noms au lieu des IDs
  const getLocationNames = () => {
    const province = data.provinces.find(p => p['@id'] === data.selectedProvince)?.name || '';
    const region = data.regions.find(r => r['@id'] === data.selectedRegion)?.name || '';
    const district = data.districts.find(d => d['@id'] === data.selectedDistrict)?.name || '';
    const commune = data.communes.find(c => c['@id'] === data.selectedCommune)?.name || '';

    return {
      province,
      region,
      district,
      commune,
    };
  };

  return {
    provinces: data.provinces,
    filteredRegions,
    filteredDistricts,
    filteredCommunes,
    selectedProvince: data.selectedProvince,
    selectedRegion: data.selectedRegion,
    selectedDistrict: data.selectedDistrict,
    selectedCommune: data.selectedCommune,
    setSelectedProvince,
    setSelectedRegion,
    setSelectedDistrict,
    setSelectedCommune,
    getLocationNames,
  };
};
