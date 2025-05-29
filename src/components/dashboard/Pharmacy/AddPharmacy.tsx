import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { validateForm } from "@/utils/validateForm";
import { useEffect, useRef, useState } from "react";
import PharmacyForm from "./PharmacyForm";

interface AddPharmacyProps {
  onSubmit: (data: Pharmacy, file?: File) => Promise<void>; // Fonction de soumission
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
  // Initialiser les états avec des valeurs par défaut
  const [formData, setFormData] = useState<Pharmacy>({
    id: pharmacy?.id,
    nom_pharmacie: pharmacy?.nom_pharmacie || "",
    photo_profil: pharmacy?.photo_profil || "",
    address: pharmacy?.address || "",
    province: pharmacy?.province || "",
    service: pharmacy?.service || "",
    lien_site: pharmacy?.lien_site || "",
    contacts: [],
  });

  // États pour les contacts, erreurs et loading
  const [contacts, setContacts] = useState<PharmacyContact[]>([{ numero: "" }]);
  const [isLoading, setIsLoading] = useState(false);

  // Mettre à jour les états lorsque la prop pharmacy change
  useEffect(() => {
    if (pharmacy) {
      console.log("Mise à jour des données avec la pharmacie:", pharmacy);

      // Nettoyer les contacts
      const cleanContacts = pharmacy.contacts?.map((contact) => ({
        numero: contact.numero,
      })) || [{ numero: "" }];

      console.log("Contacts nettoyés:", cleanContacts);

      // Mettre à jour les états
      setFormData({
        id: pharmacy.id,
        nom_pharmacie: pharmacy.nom_pharmacie || "",
        photo_profil: pharmacy.photo_profil || "",
        address: pharmacy.address || "",
        province: pharmacy.province || "",
        service: pharmacy.service || "",
        lien_site: pharmacy.lien_site || "",
        contacts: cleanContacts,
      });

      setContacts(cleanContacts);
    }
  }, [pharmacy]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Références pour le champ de fichier
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    console.log("Soumission du formulaire avec les données:", {
      formData,
      contacts,
    });

    if (validateForm(formData, contacts, setErrors)) {
      console.log("Formulaire validé, préparation des données...");
      setIsLoading(true);

      try {
        // S'assurer que les contacts n'ont pas d'ID
        console.log("Contacts avant nettoyage:", contacts);
        const cleanContacts = contacts.map((contact) => {
          console.log("Nettoyage du contact:", contact);
          return { numero: contact.numero };
        });
        console.log("Contacts après nettoyage:", cleanContacts);

        // Préparer les données finales
        const finalData = {
          ...formData,
          contacts: cleanContacts,
        };
        console.log("Données finales à soumettre:", finalData);

        // Appeler la fonction de soumission
        await onSubmit(finalData, selectedFile || undefined);

        // Close dialog on success
        setIsAddDialogOpen(false);
      } catch (error) {
        console.error("Erreur lors de la soumission:", error);
      } finally {
        setIsLoading(false);
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
  // Gestionnaire d'événements pour l'ouverture/fermeture du modal
  const handleOpenChange = (open: boolean) => {
    setIsAddDialogOpen(open);

    // Si le modal est fermé, réinitialiser les données après un court délai
    if (!open) {
      console.log("Modal fermé, réinitialisation des données...");
      // Attendre que l'animation de fermeture soit terminée
      setTimeout(() => {
        if (pharmacy) {
          console.log(
            "Réinitialisation des données avec la pharmacie:",
            pharmacy
          );

          // Nettoyer les contacts
          const cleanContacts = pharmacy.contacts?.map((contact) => ({
            numero: contact.numero,
          })) || [{ numero: "" }];

          // Mettre à jour les états
          setFormData({
            id: pharmacy.id,
            nom_pharmacie: pharmacy.nom_pharmacie || "",
            photo_profil: pharmacy.photo_profil || "",
            address: pharmacy.address || "",
            province: pharmacy.province || "",
            service: pharmacy.service || "",
            contacts: cleanContacts,
          });

          setContacts(cleanContacts);
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
          <DialogTitle>
            {isEdit
              ? "Modifier la pharmacie"
              : "Ajouter une nouvelle pharmacie"}
          </DialogTitle>
        </DialogHeader>
        <PharmacyForm
          handleSubmit={handleSubmit}
          formData={formData}
          setFormData={setFormData}
          errors={errors}
          fileInputRef={fileInputRef}
          handleFileChange={handleFileChange}
          handleServiceChange={handleServiceChange}
          contacts={contacts}
          updateContact={updateContact}
          removeContact={removeContact}
          addContact={addContact}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  );
}
