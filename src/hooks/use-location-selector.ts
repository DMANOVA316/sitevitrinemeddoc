import { useState, useEffect, useMemo } from 'react';
import { locationService } from '@/services/locationService';

// Interfaces pour la structure des données de localisation
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

/**
 * Hook personnalisé pour la sélection hiérarchique de localités
 * Gère la sélection et le filtrage des provinces, régions, districts et communes
 */
export const useLocationSelector = (initialValues?: LocationSelectorInitialValues) => {
  // État pour stocker les données de localisation
  const [data, setData] = useState<LocationSelectorState>({
    provinces: [],
    regions: [],
    districts: [],
    communes: [],
    selectedProvince: '',
    selectedRegion: '',
    selectedDistrict: '',
    selectedCommune: '',
  });

  // Charger les données initiales de localisation
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

      // Initialiser avec des valeurs prédéfinies si disponibles
      if (initialValues) {
        const provinceId = provinces.find(p => p.name === initialValues.province)?.['@id'] || '';
        const regionId = regions.find(r => r.name === initialValues.region)?.['@id'] || '';
        const districtId = districts.find(d => d.name === initialValues.district)?.['@id'] || '';
        const communeId = communes.find(c => c.name === initialValues.commune)?.['@id'] || '';

        setData(prev => ({
          ...prev,
          selectedProvince: provinceId,
          selectedRegion: regionId,
          selectedDistrict: districtId,
          selectedCommune: communeId,
        }));
      }
    };

    loadData();
  }, [initialValues]);

  // Filtrer les régions par province sélectionnée
  const filteredRegions = useMemo(() => {
    return data.regions.filter(
      (region) => region.province['@id'] === data.selectedProvince
    );
  }, [data.regions, data.selectedProvince]);

  // Filtrer les districts par région sélectionnée
  const filteredDistricts = useMemo(() => {
    return data.districts.filter(
      (district) => district.region['@id'] === data.selectedRegion
    );
  }, [data.districts, data.selectedRegion]);

  // Filtrer les communes par district sélectionné
  const filteredCommunes = useMemo(() => {
    return data.communes.filter(
      (commune) => commune.district['@id'] === data.selectedDistrict
    );
  }, [data.communes, data.selectedDistrict]);

  // Méthodes de sélection pour chaque niveau de localité
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

  // Convertir les IDs sélectionnés en noms de localités
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

  // Retourne les données et méthodes de sélection de localités
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
