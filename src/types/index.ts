declare global {
  type Province = {
    "@id": string;
    "@type": string;
    name: string;
  };

  type Region = {
    "@id": string;
    "@type": string;
    name: string;
    province: Province;
  };

  type District = {
    "@id": string;
    "@type": string;
    id: string;
    name: string;
    region: Region;
  };

  type Commune = {
    "@id": string;
    "@type": string;
    id: string;
    name: string;
    region: Region;
    district: District;
  };

  type SelectCommuneProps = {
    communes: Commune[];
    disabled: boolean;
  };

  type SelectDistrictProps = {
    districts: District[];
    selectedDistrict: string;
    onSelectDistrict: (districtId: string) => void;
    disabled: boolean;
  };

  type SelectRegionProps = {
    regions: Region[];
    selectedRegion: string;
    onSelectRegion: (regionId: string) => void;
    disabled: boolean;
  };

  type SelectProvinceProps = {
    provinces: Province[];
    selectedProvince: string;
    onSelectProvince: (provinceId: string) => void;
  };

  type Pharmacy = {
    id: number;
    name: string;
    profile: string;
    horaire: string;
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
  };
}

export interface PartnerType {
  id: number;
  nom_partenaire: string;
  lien: string;
  logo: string;
}

export interface usePartnerProps {
  partners: PartnerType[];
  currentPartner: PartnerType | null;
  isAddPartnerOpen: boolean;
  isEditPartnerOpen: boolean;
  isRemovePartnerOpen: boolean;
  isLoading: boolean;
  error: string | null;
  setIsAddPartnerOpen: (isOpen: boolean) => void;
  setIsEditPartnerOpen: (isOpen: boolean) => void;
  setIsRemovePartnerOpen: (isOpen: boolean) => void;
  handleAddPartner: (partner: Omit<PartnerType, "id">, file?: File) => Promise<void>;
  handleEditPartner: (partner: PartnerType, file?: File | null) => Promise<void>;
  handleRemovePartner: (id: number) => Promise<void>;
  handleSelectPartner: (partner: PartnerType) => void;
  setCurrentPartner: (partner: PartnerType | null) => void;
}

export {};
