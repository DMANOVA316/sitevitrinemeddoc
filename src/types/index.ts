declare global {
  type Province = {
    "@id": string;
    "@type": string;
    "name": string;
  }

  type Region = {
    "@id": string;
    "@type": string;
    "name": string;
    "province": Province;
  }

  type District = {
    "@id": string;
    "@type": string;
    "id": string;
    "name": string;
    "region": Region
  }

  type Commune = {
    "@id": string;
    "@type": string;
    "id": string;
    "name": string;
    "region": Region,
    "district": District,
  }

  type SelectCommuneProps = {
    communes: Commune[];
    disabled: boolean;
  }

  type SelectDistrictProps = {
    districts: District[];
    selectedDistrict: string;
    onSelectDistrict: (districtId: string) => void;
    disabled: boolean;
  }

  type SelectRegionProps = {
    regions: Region[];
    selectedRegion: string;
    onSelectRegion: (regionId: string) => void;
    disabled: boolean;
  }

  type SelectProvinceProps = {
    provinces: Province[];
    selectedProvince: string;
    onSelectProvince: (provinceId: string) => void;
  }

  export interface PharmacyContact {
    id?: number;
    id_pharmacie?: number;
    numero: string;
  }

  export interface PharmacySchedule {
    id?: number;
    id_pharmacie?: number;
    heure_debut: string;
    heure_fin: string;
  }

  export interface Pharmacy {
    id?: number;
    nom_pharmacie: string;
    photo_profil?: string;
    address: string;
    province: string;
    region?: string;
    district?: string;
    commune: string;
    service: string;
    de_garde: boolean;
    // localisation?: { x: number; y: number };
    contacts?: PharmacyContact[];
    horaires?: PharmacySchedule[];
  }
}

export {}