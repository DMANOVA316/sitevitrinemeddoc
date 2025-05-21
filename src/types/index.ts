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

  type PharmacyContact = {
    id?: number;
    id_pharmacie?: number;
    numero: string;
  };

  type PharmacySchedule = {
    id?: number;
    id_pharmacie?: number;
    jour?: string;
    heure_debut: string;
    heure_fin: string;
  };

  type PharmacyGarde = {
    id?: number;
    id_pharmacies: number;
    date_debut: string;
    date_fin: string;
  };

  type AssuranceSante = 'aucune' | 'bscs' | 'allianz' | 'saham' | 'autre';

  type MutuelleSante = 'aucune' | 'ostie' | 'amit' | 'afafi' | 'autre';

  type Pharmacy = {
    id?: number;
    nom_pharmacie: string;
    photo_profil?: string;
    address: string;
    province?: string;
    region?: string;
    district?: string;
    commune?: string; // Optionnel dans le code, mais une valeur par défaut sera fournie
    service?: string;
    assurance_sante?: AssuranceSante;
    mutuelle_sante?: MutuelleSante;
    localisation?: { x: number; y: number };
    contacts?: PharmacyContact[];
    horaires?: PharmacySchedule[];
    de_garde?: boolean; // Propriété calculée, pas stockée en base
    garde?: PharmacyGarde; // Informations sur la garde en cours
    gardes?: PharmacyGarde[]; // Toutes les périodes de garde
  };

  type ContactAmbulance = {
    id?: number;
    id_ambulance?: number;
    numero: string;
  }

  type Ambulance = {
    id?: number;
    nom: string;
    contact?: string;
    address: string;
    province: string;
    region?: string;
    district?: string;
    commune: string;
    // localisation?: { x: number; y: number };
    contacts?: ContactAmbulance[];
  }

  type Numero_meddoc = {
    id: number;
    numero: string;
  };

  type SocialMedia = {
    id: number;
    nom: string;
    lien: string;
  };
  type LocationSelectorProps = {
    /**
     * Callback pour notifier un changement de localisation.
     * Fournit un objet décrivant la localisation sélectionnée.
     */
    onLocationChange: (location: {
      province?: string;
      region?: string;
      district?: string;
      commune?: string;
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
  };
  type locationData = {
    provinces: Province[];
    regions: Region[];
    districts: District[];
    communes: Commune[];
  };

  type contactez_nous = {
    id: number;
    nom: string;
    email: string;
    contact: string;
    vous_ete: string;
    service: string;
    message: string;
    date_envoye: string;
    vue: boolean;
  };
  type Couverture = {
    id: number;
    photo: string;
    titre: string;
    description: string;
  };
  type PartnerType = {
    id: number;
    nom_partenaire: string;
    lien: string;
    logo: string;
  };

  type ServiceType = {
    id: number;
    nom: string;
    description: string;
    lien: string;
  };

  type usePartnerProps = {
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
  };

  type useSocialMediaProps = {
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
  };

  type Info_page_meddoc = {
    id: number;
    titre_site: string;
    favicon: string;
    logo: string;
    email: string;
    addresse: string;
    copyrigth: string;
  }

  interface LocationSelectorRef {
    reset: () => void; // Fonction de réinitialisation
  }
}

export {};
