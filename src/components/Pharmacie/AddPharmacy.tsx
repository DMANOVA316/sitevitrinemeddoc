import { useState, useRef } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Trash2, Plus } from "lucide-react";
import LocationSelector from "../LocationSelector/LocationSelector";
import ServicesList from "./ServicesList";
import { toast } from "sonner";

interface PharmacyContact {
  numero: string;
}

interface PharmacySchedule {
  heure_debut: string;
  heure_fin: string;
}

interface Pharmacy {
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
  contacts?: PharmacyContact[];
  horaires?: PharmacySchedule[];
}

interface AddPharmacyProps {
  onSubmit: (data: Pharmacy, file?: File) => void;
  pharmacy?: Pharmacy;
  isEdit?: boolean;
}
export interface LocationSelectorRef {
  reset: () => void;
}

export default function AddPharmacy({
  onSubmit,
  pharmacy,
  isEdit = false,
}: AddPharmacyProps) {
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

  const [contacts, setContacts] = useState<PharmacyContact[]>(
    formData.contacts
  );

  const [horaires, setHoraires] = useState<PharmacySchedule[]>(
    formData.horaires
  );

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const locationSelectorRef = useRef<LocationSelectorRef>(null);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.nom_pharmacie.trim()) {
      newErrors.nom_pharmacie = "Le nom de la pharmacie est obligatoire";
      toast.error("Le nom de la pharmacie est obligatoire");
    }

    if (!formData.address.trim()) {
      newErrors.address = "L'adresse est obligatoire";
      toast.error("L'adresse est obligatoire");
    }

    if (!formData.province || !formData.commune) {
      newErrors.location = "La province et la commune sont obligatoires";
      toast.error("La province et la commune sont obligatoires");
    }

    if (contacts.length === 0 || contacts.some(contact => !contact.numero.trim())) {
      newErrors.contacts = "Au moins un numéro de contact valide est requis";
      toast.error("Au moins un numéro de contact valide est requis");
    } else {
      const phoneRegex = /^(\+261|0)(32|33|34|38|39)[0-9]{7}$/;
      const invalidContacts = contacts.filter(contact => !phoneRegex.test(contact.numero.trim()));
      if (invalidContacts.length > 0) {
        newErrors.contacts = "Format de numéro invalide. Ex: +261XXXXXXXXX ou 03XXXXXXXX";
        toast.error("Format de numéro invalide. Ex: +261XXXXXXXXX ou 03XXXXXXXX");
      }
    }

    if (horaires.length === 0 || horaires.some(h => !h.heure_debut || !h.heure_fin)) {
      newErrors.horaires = "Les horaires d'ouverture sont requis";
      toast.error("Les horaires d'ouverture sont requis");
    } else {
      for (let i = 0; i < horaires.length; i++) {
        const { heure_debut, heure_fin } = horaires[i];
        if (heure_debut >= heure_fin) {
          newErrors.horaires = "L'heure de fin doit être après l'heure de début";
          toast.error("L'heure de fin doit être après l'heure de début");
          break;
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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

  const handleServiceChange = (val: string) => {
    setFormData((prev) => ({
      ...prev,
      service: val,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      const formattedContacts = contacts.map(({ numero }) => ({ numero }));
      const formattedHoraires = horaires.map(({ heure_debut, heure_fin }) => ({
        heure_debut,
        heure_fin,
      }));

      onSubmit(
        {
          ...formData,
          contacts: formattedContacts,
          horaires: formattedHoraires,
        },
        selectedFile || undefined
      );
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      // Create a preview URL for the image
      const previewUrl = URL.createObjectURL(e.target.files[0]);
      setFormData((prev) => ({ ...prev, photo_profil: previewUrl }));
    }
  };

  const addContact = () => {
    setContacts([...contacts, { numero: "" }]);
  };

  const removeContact = (index: number) => {
    setContacts(contacts.filter((_, i) => i !== index));
  };

  const updateContact = (index: number, numero: string) => {
    const newContacts = [...contacts];
    newContacts[index] = { numero };
    setContacts(newContacts);
  };

  const addHoraire = () => {
    setHoraires([...horaires, { heure_debut: "", heure_fin: "" }]);
  };

  const removeHoraire = (index: number) => {
    setHoraires(horaires.filter((_, i) => i !== index));
  };

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
    <form
      onSubmit={handleSubmit}
      className="space-y-8 p-4 relative flex flex-col h-[calc(100vh-8rem)]"
    >
      <div className="flex-1 overflow-y-auto pr-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Colonne de gauche */}
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium text-gray-700">
                Nom de la pharmacie
              </Label>
              <Input
                value={formData.nom_pharmacie}
                onChange={(e) =>
                  setFormData({ ...formData, nom_pharmacie: e.target.value })
                }
                className={`w-full ${
                  errors.nom_pharmacie ? "border-red-500 focus:ring-red-500" : ""
                }`}
              />
              {errors.nom_pharmacie && (
                <p className="text-sm text-red-500 mt-1">{errors.nom_pharmacie}</p>
              )}
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">
                Photo de profil
              </Label>
              <div className="mt-1 flex items-center gap-4">
                {formData.photo_profil && (
                  <img
                    src={formData.photo_profil}
                    alt="Preview"
                    className="h-16 w-16 rounded-full object-cover"
                  />
                )}
                <Input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full"
                />
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">
                Adresse
              </Label>
              <Input
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                className="w-full"
              />
            </div>

            <LocationSelector
              ref={locationSelectorRef}
              onLocationChange={handleLocationChange}
              initialValues={
                isEdit
                  ? {
                      province: pharmacy?.province,
                      region: pharmacy?.region,
                      district: pharmacy?.district,
                      commune: pharmacy?.commune,
                    }
                  : undefined
              }
            />

            <div>
              <ServicesList
                value={formData.service}
                onChange={handleServiceChange}
              />
            </div>
          </div>

          {/* Colonne de droite */}
          <div className="space-y-6">
            <div>
              <Label className="text-sm font-medium text-gray-700">
                Contacts
              </Label>
              <div className="space-y-2">
                {contacts.map((contact, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      type="tel"
                      value={contact.numero}
                      onChange={(e) => updateContact(index, e.target.value)}
                      placeholder="Numéro de téléphone"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeContact(index)}
                      className="flex-shrink-0"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Supprimer le contact</span>
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addContact}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter un contact
                </Button>
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">
                Horaires d'ouverture
              </Label>
              <div className="space-y-2">
                {horaires.map((horaire, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="grid grid-cols-2 gap-2 flex-1">
                      <Input
                        type="time"
                        value={horaire.heure_debut}
                        onChange={(e) =>
                          updateHoraire(index, "heure_debut", e.target.value)
                        }
                        required
                      />
                      <Input
                        type="time"
                        value={horaire.heure_fin}
                        onChange={(e) =>
                          updateHoraire(index, "heure_fin", e.target.value)
                        }
                        required
                      />
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeHoraire(index)}
                      className="flex-shrink-0"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Supprimer l'horaire</span>
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addHoraire}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter un horaire
                </Button>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="de_garde"
                checked={formData.de_garde}
                onCheckedChange={(checked: boolean) =>
                  setFormData({ ...formData, de_garde: checked })
                }
              />
              <Label
                htmlFor="de_garde"
                className="text-sm font-medium text-gray-700"
              >
                De garde
              </Label>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4 mt-auto border-t">
        <Button type="submit" className="w-full md:w-auto">
          Enregistrer
        </Button>
      </div>
    </form>
  );
}
