import { toast } from "sonner";

// Fonction pour valider le formulaire
export const validateForm = (
  formData: Pharmacy,
  contacts: PharmacyContact[],
  setErrors: (errors: Record<string, string>) => void
): boolean => {
  const newErrors: Record<string, string> = {};

  // Validation du nom de la pharmacie
  if (!formData.nom_pharmacie.trim()) {
    newErrors.nom_pharmacie = "Le nom de la pharmacie est obligatoire";
    toast.error(newErrors.nom_pharmacie);
  }

  // Validation de l'adresse
  if (!formData.address.trim()) {
    newErrors.address = "L'adresse est obligatoire";
    toast.error(newErrors.address);
  }

  // Validation de la province
  if (!formData.province || !formData.province.trim()) {
    newErrors.province = "La province est obligatoire";
    toast.error(newErrors.province);
  }

  // Validation des contacts
  if (
    contacts.length === 0 ||
    contacts.some((contact) => !contact.numero.trim())
  ) {
    newErrors.contacts = "Au moins un numéro de contact valide est requis";
    toast.error(newErrors.contacts);
  } else {
    // Vérifier que les numéros ne contiennent que des chiffres
    const digitRegex = /^\d+$/;
    const invalidContacts = contacts.filter(
      (contact) => !digitRegex.test(contact.numero.trim())
    );
    if (invalidContacts.length > 0) {
      newErrors.contacts = "Le numéro doit contenir uniquement des chiffres";
      toast.error(newErrors.contacts);
    }
  }

  // Mise à jour des erreurs et retour du statut de validation
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};
