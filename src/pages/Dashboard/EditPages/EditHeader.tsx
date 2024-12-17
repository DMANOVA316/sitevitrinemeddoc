import { FormEvent, useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import useInfoMeddocRedux from "@/hooks/use-info-meddoc-redux";

const EditHeader = () => {
  const {
    isEditInformationOpen,
    showEditInformationModal,
    updateInformations,
    infoMeddoc,
  } = useInfoMeddocRedux();
  const [formData, setFormData] = useState<Info_page_meddoc>({
    id: null,
    titre_site: "",
    email: "",
    addresse: "",
    copyrigth: "",
    favicon: null,
    logo: null,
  });
  const [currentFavIcon, setCurrentFavIcon] = useState<File | null>();
  const [currentLogo, setCurrentLogo] = useState<File | null>();

  useEffect(() => {
    setFormData(infoMeddoc);
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      updateInformations(
        { ...formData },
        { favicon: currentFavIcon, logo: currentLogo },
      );
      toast.success("Header modifié avec succès");
    } catch (error) {
      console.error("Error uploading images:", error);
      toast.error("Erreur lors de la modification du header");
    }
  };

  return (
    <Dialog
      open={isEditInformationOpen}
      onOpenChange={showEditInformationModal}
    >
      <DialogContent className="max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Modifier le Header</DialogTitle>
        </DialogHeader>

        <form className="p-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-6">
            {/* Colonne de gauche */}
            <div className="space-y-6">
              <div>
                <Label className="block text-sm font-medium text-gray-700">
                  FavIcon
                </Label>
                <Input
                  type="file"
                  onChange={(e) =>
                    setCurrentFavIcon(e.target.files?.[0] || null)
                  }
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <Label className="block text-sm font-medium text-gray-700">
                  Logo du site
                </Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setCurrentLogo(e.target.files?.[0] || null)}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Colonne de droite - Aperçu */}
            <div className="space-y-6">
              <div>
                <Label className="block text-sm font-medium text-gray-700">
                  Aperçu FavIcon
                </Label>
                {formData && currentFavIcon && formData.favicon && (
                  <img
                    src={URL.createObjectURL(currentFavIcon)}
                    alt="Aperçu favicon"
                    className="mt-2 w-16 h-16 object-contain border rounded"
                  />
                )}
              </div>

              <div>
                <Label className="block text-sm font-medium text-gray-700">
                  Aperçu Logo
                </Label>
                {formData && currentLogo && formData.logo && (
                  <img
                    src={URL.createObjectURL(currentLogo)}
                    alt="Aperçu logo"
                    className="mt-2 w-32 h-32 object-contain border rounded"
                  />
                )}
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => showEditInformationModal(false)}
            >
              Annuler
            </Button>
            <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
              Enregistrer
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditHeader;