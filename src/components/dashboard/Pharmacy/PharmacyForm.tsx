import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Plus, Trash2, X } from "lucide-react";
import ServicesList from "./ServicesList";

interface PharmacyFormProps {
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  formData: Pharmacy;
  setFormData: React.Dispatch<React.SetStateAction<Pharmacy>>;
  errors: Record<string, string>;
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleServiceChange: (val: string) => void;
  contacts: PharmacyContact[];
  updateContact: (index: number, numero: string) => void;
  removeContact: (index: number) => void;
  addContact: () => void;
  isLoading?: boolean;
}

const PharmacyForm: React.FC<PharmacyFormProps> = ({
  handleSubmit,
  formData,
  setFormData,
  errors,
  fileInputRef,
  handleFileChange,
  handleServiceChange,
  contacts,
  updateContact,
  removeContact,
  addContact,
  isLoading = false,
}) => {
  // Function to handle photo removal
  const handleRemovePhoto = () => {
    setFormData({ ...formData, photo_profil: "" });
    // Clear the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 p-4 relative flex flex-col h-[calc(100vh-8rem)]"
    >
      <div className="flex-1 pr-2">
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
                  errors.nom_pharmacie
                    ? "border-red-500 focus:ring-red-500"
                    : ""
                }`}
                disabled={isLoading}
              />
              {errors.nom_pharmacie && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.nom_pharmacie}
                </p>
              )}
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700">
                Photo de profil
              </Label>
              <div className="mt-1 space-y-3">
                {formData.photo_profil && (
                  <div className="flex items-center gap-3">
                    <img
                      src={formData.photo_profil}
                      alt="Preview"
                      className="h-16 w-16 rounded-full object-cover border-2 border-gray-200"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleRemovePhoto}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      disabled={isLoading}
                    >
                      <X className="h-4 w-4 mr-1" />
                      Supprimer
                    </Button>
                  </div>
                )}
                <Input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full"
                  disabled={isLoading}
                />
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700">
                Adresse *
              </Label>
              <Input
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                className="w-full"
                required
                placeholder="Entrez l'adresse"
                disabled={isLoading}
              />
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">{errors.address}</p>
              )}
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">
                Province *
              </Label>
              <Input
                value={formData.province || ""}
                onChange={(e) =>
                  setFormData({ ...formData, province: e.target.value })
                }
                className="w-full"
                required
                placeholder="Entrez la province"
                disabled={isLoading}
              />
              {errors.province && (
                <p className="text-red-500 text-sm mt-1">{errors.province}</p>
              )}
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">
                Lien vers site
              </Label>
              <Input
                value={formData.lien_site || ""}
                onChange={(e) =>
                  setFormData({ ...formData, lien_site: e.target.value })
                }
                className={`w-full ${
                  errors.lien_site ? "border-red-500 focus:ring-red-500" : ""
                }`}
                placeholder="https://exemple.com"
                type="url"
                disabled={isLoading}
              />
              {errors.lien_site && (
                <p className="text-red-500 text-sm mt-1">{errors.lien_site}</p>
              )}
            </div>

            <div>
              <ServicesList
                value={formData.service}
                onChange={handleServiceChange}
              />
              {errors.service && (
                <p className="text-red-500 text-sm mt-1">{errors.service}</p>
              )}
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
                      disabled={isLoading}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeContact(index)}
                      className="flex-shrink-0"
                      disabled={isLoading}
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
                  disabled={isLoading}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter un contact
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end pt-4 mt-auto border-t">
        <Button type="submit" className="w-full md:w-auto" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Enregistrement...
            </>
          ) : (
            "Enregistrer"
          )}
        </Button>
      </div>
    </form>
  );
};

export default PharmacyForm;
