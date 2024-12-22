import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import PharmacyForm from "./PharmacyForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { usePharmacyRedux } from "@/hooks/use-pharmacy-redux";
import { validateForm } from "@/utils/validateForm";

type NewPharmacyData = Omit<Pharmacy, "id">;

interface AddPharmacyProps {
  onSubmit: (data: Pharmacy, file?: File) => void; // Fonction de soumission
  pharmacy?: Pharmacy; // Données de la pharmacie (en cas d'édition)
  isEdit?: boolean; // Indique si c'est une édition ou une création
  isAddDialogOpen: boolean;
  setIsAddDialogOpen: (value: boolean) => void;
}

export default function AddPharmacy({
  onSubmit,
  pharmacy,
  isEdit = false,
  isAddDialogOpen,
  setIsAddDialogOpen,
}: AddPharmacyProps) {
  const {
    isAddPharmacyOpen,
    showAddPharmacyModal,
    handleAddPharmacy,
    isLoading,
    error,
  } = usePharmacyRedux();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [formData, setFormData] = useState<Pharmacy>({
    id: pharmacy?.id,
    nom_pharmacie: pharmacy?.nom_pharmacie || "",
    photo_profil: pharmacy?.photo_profil || "",
    address: pharmacy?.address || "",
    province: pharmacy?.province || "",
    region: pharmacy?.region || "",
    district: pharmacy?.district || "",
    commune: pharmacy?.commune || "",
    service: pharmacy?.service || "",
    de_garde: pharmacy?.de_garde || false,
    contacts: pharmacy?.contacts || [{ numero: "" }],
    horaires: pharmacy?.horaires || [{ heure_debut: "", heure_fin: "" }],
  });
  // États pour les contacts, horaires et erreurs
  const [contacts, setContacts] = useState<PharmacyContact[]>(
    formData.contacts
  );
  const [horaires, setHoraires] = useState<PharmacySchedule[]>(
    formData.horaires
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Références pour le champ de fichier et le sélecteur de localisation
  const fileInputRef = useRef<HTMLInputElement>(null);
  const locationSelectorRef = useRef<LocationSelectorRef>(null);

  // Gestion des changements de localisation
  const handleLocationChange = (location: {
    province: string;
    region?: string;
    district?: string;
    commune: string;
  }) => {
    setFormData((prev) => ({
      ...prev,
      province: location.province,
      region: location.region || "",
      district: location.district || "",
      commune: location.commune,
    }));
  };

  // Gestion des changements des services
  const handleServiceChange = (val: string) => {
    setFormData((prev) => ({
      ...prev,
      service: val,
    }));
  };

  // Soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm(formData, contacts, horaires, setErrors)) {
      onSubmit(
        {
          ...formData,
          contacts: contacts.map(({ numero }) => ({ numero })),
          horaires: horaires.map(({ heure_debut, heure_fin }) => ({
            heure_debut,
            heure_fin,
          })),
        },
        selectedFile || undefined
      );
    }
  };

  // Gestion des changements du fichier photo
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setFormData((prev) => ({
        ...prev,
        photo_profil: URL.createObjectURL(file),
      }));
    }
  };

  // Gestion des contacts (ajout, suppression, mise à jour)
  const addContact = () => setContacts([...contacts, { numero: "" }]);
  const removeContact = (index: number) =>
    setContacts(contacts.filter((_, i) => i !== index));
  const updateContact = (index: number, numero: string) => {
    const newContacts = [...contacts];
    newContacts[index] = { numero };
    setContacts(newContacts);
  };

  // Gestion des horaires (ajout, suppression, mise à jour)
  const addHoraire = () =>
    setHoraires([...horaires, { heure_debut: "", heure_fin: "" }]);
  const removeHoraire = (index: number) =>
    setHoraires(horaires.filter((_, i) => i !== index));
  const updateHoraire = (
    index: number,
    field: keyof PharmacySchedule,
    value: string
  ) => {
    const newHoraires = [...horaires];
    newHoraires[index] = { ...newHoraires[index], [field]: value };
    setHoraires(newHoraires);
  };
  return (
    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
      {!isEdit && (
        <DialogTrigger asChild>
          <Button className="w-full md:w-auto">Ajouter une pharmacie</Button>
        </DialogTrigger>
      )}
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Ajouter une nouvelle pharmacie</DialogTitle>
        </DialogHeader>
        <PharmacyForm
          handleSubmit={handleSubmit}
          formData={formData}
          setFormData={setFormData}
          errors={errors}
          fileInputRef={fileInputRef}
          handleFileChange={handleFileChange}
          locationSelectorRef={locationSelectorRef}
          handleLocationChange={handleLocationChange}
          handleServiceChange={handleServiceChange}
          contacts={contacts}
          updateContact={updateContact}
          removeContact={removeContact}
          addContact={addContact}
          horaires={horaires}
          updateHoraire={updateHoraire}
          removeHoraire={removeHoraire}
          addHoraire={addHoraire}
          pharmacy={pharmacy}
          isEdit={isEdit}
        />
      </DialogContent>
    </Dialog>
  );
}
