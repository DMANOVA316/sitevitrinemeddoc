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

    // La commune n'est pas obligatoire, une valeur par défaut sera fournie si nécessaire

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

    // Validation des horaires (optionnels)
    // Vérifier uniquement si des horaires sont fournis
    if (horaires.length > 0) {
      // Vérifier que les horaires fournis sont complets
      if (horaires.some((h) => !h.heure_debut || !h.heure_fin)) {
        newErrors.horaires = "Les horaires fournis doivent avoir une heure de début et de fin";
        toast.error(newErrors.horaires);
      } else {
        // Vérifier que les heures de fin sont après les heures de début
        for (let { heure_debut, heure_fin } of horaires) {
          if (heure_debut >= heure_fin) {
            newErrors.horaires = "L'heure de fin doit être après l'heure de début";
            toast.error(newErrors.horaires);
            break;
          }
        }
      }
    }

    // Mise à jour des erreurs et retour du statut de validation
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
};