declare global {
  export type Province = {
    "@id": string;
    "@type": string;
    name: string;
  };

  export type Region = {
    "@id": string;
    "@type": string;
    name: string;
    province: Province;
  };

  export type District = {
    "@id": string;
    "@type": string;
    id: string;
    name: string;
    region: Region;
  };

  export type Commune = {
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

  export interface Numero_meddoc {
    id: number;
    numero: string;
  }

  export interface SocialMedia {
    id: number;
    nom: string;
    lien: string;
  }
  export interface LocationSelectorProps {
    /**
     * Callback pour notifier un changement de localisation.
     * Fournit un objet décrivant la localisation sélectionnée.
     */
    onLocationChange: (location: {
      province: string;
      region?: string;
      district?: string;
      commune: string;
    }) => void;

    /**
     * Valeurs initiales pour chaque sélection. Ces valeurs sont facultatives
     * pour permettre l'utilisation sans préconfiguration.
     */
    initialValues?: {
      province?: string;
      region?: string;
      district?: string;
      commune?: string;
    };
  }
  export interface locationData {
    provinces: Province[];
    regions: Region[];
    districts: District[];
    communes: Commune[];
  }

  export interface contactez_nous {
    id: number;
    nom: string;
    email: string;
    contact: string;
    vous_ete: string;
    service: string;
    message: string;
    date_envoye: string;
    vue: boolean;
  }

  export interface Couverture {
    id: number;
    photo: string;
    titre: string;
    description: string;
  }
}

export interface PartnerType {
  id: number;
  nom_partenaire: string;
  lien: string;
  logo: string;
}

export interface ServiceType {
  id: number;
  nom: string;
  description: string;
  lien: string;
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
  handleAddPartner: (
    partner: Omit<PartnerType, "id">,
    file?: File,
  ) => Promise<void>;
  handleEditPartner: (
    partner: PartnerType,
    file?: File | null,
  ) => Promise<void>;
  handleRemovePartner: (id: number) => Promise<void>;
  handleSelectPartner: (partner: PartnerType) => void;
  setCurrentPartner: (partner: PartnerType | null) => void;
}

export interface useSocialMediaProps {
  socialMedias: SocialMedia[];
  isAddSocialMediaOpen: boolean;
  isEditSocialMediaOpen: boolean;
  isRemoveSocialMediaOpen: boolean;
  isLoading: boolean;
  error: string | null;
  setIsAddSocialMediaOpen: (isOpen: boolean) => void;
  setIsEditSocialMediaOpen: (isOpen: boolean) => void;
  setIsRemoveSocialMediaOpen: (isOpen: boolean) => void;
  handleAddSocialMedia: (socialMedia: Omit<SocialMedia, "id">) => void;
  handleEditSocialMedia: (socialMedia: SocialMedia) => void;
  handleRemoveSocialMedia: (id: number) => void;
  currentSocialMedia: SocialMedia | null;
  setCurrentSocialMedia: (socialMedia: SocialMedia | null) => void;
  handleSelectSocialMedia: (socialMedia: SocialMedia) => void;
}

export interface Info_page_meddoc {
  id: number;
  titre_site: string;
  favicon: string;
  logo: string;
  email: string;
  addresse: string;
  copyrigth: string;
}

export {};
