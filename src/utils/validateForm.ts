import { toast } from "sonner";

// Fonction pour valider le formulaire
export const validateForm = (
    formData: Pharmacy, 
    contacts: PharmacyContact[], 
    horaires: PharmacySchedule[],
    setErrors
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
  
    // Validation de la localisation
    if (!formData.province || !formData.commune) {
      newErrors.location = "La province et la commune sont obligatoires";
      toast.error(newErrors.location);
    }
  
    // Validation des contacts
    if (
      contacts.length === 0 ||
      contacts.some((contact) => !contact.numero.trim())
    ) {
      newErrors.contacts = "Au moins un numéro de contact valide est requis";
      toast.error(newErrors.contacts);
    } else {
      const phoneRegex = /^(\+261|0)(32|33|34|38|39)[0-9]{7}$/;
      const invalidContacts = contacts.filter(
        (contact) => !phoneRegex.test(contact.numero.trim())
      );
      if (invalidContacts.length > 0) {
        newErrors.contacts =
          "Format de numéro invalide. Ex: +261XXXXXXXXX ou 03XXXXXXXX";
        toast.error(newErrors.contacts);
      }
    }
  
    // Validation des horaires
    if (
      horaires.length === 0 ||
      horaires.some((h) => !h.heure_debut || !h.heure_fin)
    ) {
      newErrors.horaires = "Les horaires d'ouverture sont requis";
      toast.error(newErrors.horaires);
    } else {
      for (let { heure_debut, heure_fin } of horaires) {
        if (heure_debut >= heure_fin) {
          newErrors.horaires =
            "L'heure de fin doit être après l'heure de début";
          toast.error(newErrors.horaires);
          break;
        }
      }
    }
  
    // Mise à jour des erreurs et retour du statut de validation
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
};