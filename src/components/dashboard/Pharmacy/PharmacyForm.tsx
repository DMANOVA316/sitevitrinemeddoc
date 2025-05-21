import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Trash2, Plus } from "lucide-react";
import LocationSelector from "@/components/LocationSelector/LocationSelector";
import ServicesList from "./ServicesList";

const PharmacyForm = ({
  handleSubmit,
  formData,
  setFormData,
  errors,
  fileInputRef,
  handleFileChange,
  locationSelectorRef,
  handleLocationChange,
  handleServiceChange,
  contacts,
  updateContact,
  removeContact,
  addContact,
  horaires,
  updateHoraire,
  removeHoraire,
  addHoraire,
  pharmacy,
  isEdit,
}) => {
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
                  errors.nom_pharmacie
                    ? "border-red-500 focus:ring-red-500"
                    : ""
                }`}
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
};

export default PharmacyForm;
