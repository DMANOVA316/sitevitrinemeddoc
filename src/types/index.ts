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

  type Pharmacy = {
    id: number;
    name: string;
    profile: string;
    contact: string;
    address: string;
    province: string;
    region: string;
    district: string;
    commune: string;
    service: string;
    location: string;
    deGarde: boolean;
    heureOuverture: {
      debut: string;
      fin: string;
    };
  }
}

export {}