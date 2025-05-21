import { useState, useRef, useEffect } from "react";
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
  // Initialiser les états avec des valeurs par défaut
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
    contacts: [],
    horaires: [],
  });

  // États pour les contacts, horaires et erreurs
  const [contacts, setContacts] = useState<PharmacyContact[]>([{ numero: "" }]);
  const [horaires, setHoraires] = useState<PharmacySchedule[]>([{ heure_debut: "", heure_fin: "" }]);

  // Mettre à jour les états lorsque la prop pharmacy change
  useEffect(() => {
    if (pharmacy) {
      console.log("Mise à jour des données avec la pharmacie:", pharmacy);

      // Nettoyer les contacts et horaires
      const cleanContacts = pharmacy.contacts?.map(contact => ({ numero: contact.numero })) || [{ numero: "" }];
      const cleanHoraires = pharmacy.horaires?.map(horaire => ({
        heure_debut: horaire.heure_debut,
        heure_fin: horaire.heure_fin,
        jour: horaire.jour
      })) || [{ heure_debut: "", heure_fin: "" }];

      console.log("Contacts nettoyés:", cleanContacts);

      // Mettre à jour les états
      setFormData({
        id: pharmacy.id,
        nom_pharmacie: pharmacy.nom_pharmacie || "",
        photo_profil: pharmacy.photo_profil || "",
        address: pharmacy.address || "",
        province: pharmacy.province || "",
        region: pharmacy.region || "",
        district: pharmacy.district || "",
        commune: pharmacy.commune || "",
        service: pharmacy.service || "",
        contacts: cleanContacts,
        horaires: cleanHoraires,
      });

      setContacts(cleanContacts);
      setHoraires(cleanHoraires);
    }
  }, [pharmacy]);
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
    console.log("Soumission du formulaire avec les données:", { formData, contacts, horaires });

    if (validateForm(formData, contacts, horaires, setErrors)) {
      console.log("Formulaire validé, préparation des données...");

      // Filtrer les horaires vides
      const filteredHoraires = horaires.filter(
        h => h.heure_debut && h.heure_fin
      );
      console.log("Horaires filtrés:", filteredHoraires);

      // S'assurer que les contacts et horaires n'ont pas d'ID
      console.log("Contacts avant nettoyage:", contacts);
      const cleanContacts = contacts.map(contact => {
        console.log("Nettoyage du contact:", contact);
        return { numero: contact.numero };
      });
      console.log("Contacts après nettoyage:", cleanContacts);

      console.log("Horaires avant nettoyage:", filteredHoraires);
      const cleanHoraires = filteredHoraires.map(horaire => {
        console.log("Nettoyage de l'horaire:", horaire);
        return {
          heure_debut: horaire.heure_debut,
          heure_fin: horaire.heure_fin,
          jour: horaire.jour
        };
      });
      console.log("Horaires après nettoyage:", cleanHoraires);

      // Préparer les données finales
      const finalData = {
        ...formData,
        contacts: cleanContacts,
        horaires: cleanHoraires,
      };
      console.log("Données finales à soumettre:", finalData);

      // Appeler la fonction de soumission
      try {
        onSubmit(
          finalData,
          selectedFile || undefined
        );
      } catch (error) {
        console.error("Erreur lors de la soumission:", error);
      }
    } else {
      console.log("Validation du formulaire échouée, erreurs:", errors);
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
    // S'assurer que le contact n'a pas d'ID
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
  // Gestionnaire d'événements pour l'ouverture/fermeture du modal
  const handleOpenChange = (open: boolean) => {
    setIsAddDialogOpen(open);

    // Si le modal est fermé, réinitialiser les données après un court délai
    if (!open) {
      console.log("Modal fermé, réinitialisation des données...");
      // Attendre que l'animation de fermeture soit terminée
      setTimeout(() => {
        if (pharmacy) {
          console.log("Réinitialisation des données avec la pharmacie:", pharmacy);

          // Nettoyer les contacts et horaires
          const cleanContacts = pharmacy.contacts?.map(contact => ({ numero: contact.numero })) || [{ numero: "" }];
          const cleanHoraires = pharmacy.horaires?.map(horaire => ({
            heure_debut: horaire.heure_debut,
            heure_fin: horaire.heure_fin,
            jour: horaire.jour
          })) || [{ heure_debut: "", heure_fin: "" }];

          // Mettre à jour les états
          setFormData({
            id: pharmacy.id,
            nom_pharmacie: pharmacy.nom_pharmacie || "",
            photo_profil: pharmacy.photo_profil || "",
            address: pharmacy.address || "",
            province: pharmacy.province || "",
            region: pharmacy.region || "",
            district: pharmacy.district || "",
            commune: pharmacy.commune || "",
            service: pharmacy.service || "",
            contacts: cleanContacts,
            horaires: cleanHoraires,
          });

          setContacts(cleanContacts);
          setHoraires(cleanHoraires);
        }
      }, 300);
    }
  };

  return (
    <Dialog open={isAddDialogOpen} onOpenChange={handleOpenChange}>
      {!isEdit && (
        <DialogTrigger asChild>
          <Button className="w-full md:w-auto">Ajouter une pharmacie</Button>
        </DialogTrigger>
      )}
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Modifier la pharmacie" : "Ajouter une nouvelle pharmacie"}</DialogTitle>
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
