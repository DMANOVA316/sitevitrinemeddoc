import { FormEvent, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEditPagesContext } from "@/contexts/EditPagesContext";
import { uploadService } from "@/services/uploadService"; 
import { toast } from "sonner"; 

interface Header {
  favicon: globalThis.File | null;
  logo: globalThis.File | null;
}

const EditHeader = () => {
  const { isHeaderModalOpen, setIsHeaderModalOpen } = useEditPagesContext();
  const [formData, setFormData] = useState<Header>({
    favicon: null,
    logo: null,
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const uploadPromises = [];
      let faviconUrl = "";
      let logoUrl = "";

      if (formData.favicon) {
        uploadPromises.push(
          uploadService.uploadImage(formData.favicon, "meddoc").then((url) => {
            faviconUrl = url;
          })
        );
      }

      if (formData.logo) {
        uploadPromises.push(
          uploadService.uploadImage(formData.logo, "meddoc").then((url) => {
            logoUrl = url;
          })
        );
      }

      await Promise.all(uploadPromises);

      // TODO: Ajouter l'appel API pour sauvegarder les URLs dans la base de données
      console.log("Images uploaded successfully:", {
        favicon: faviconUrl,
        logo: logoUrl,
      });

      setIsHeaderModalOpen(false);
      toast.success("Header modifié avec succès");
    } catch (error) {
      console.error("Error uploading images:", error);
      toast.error("Erreur lors de la modification du header");
    }
  };

  return (
    <Dialog open={isHeaderModalOpen} onOpenChange={setIsHeaderModalOpen}>
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
                    setFormData({
                      ...formData,
                      favicon: e.target.files?.[0] || null,
                    })
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
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      logo: e.target.files?.[0] || null,
                    })
                  }
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
                {formData.favicon && (
                  <img
                    src={URL.createObjectURL(formData.favicon)}
                    alt="Aperçu favicon"
                    className="mt-2 w-16 h-16 object-contain border rounded"
                  />
                )}
              </div>

              <div>
                <Label className="block text-sm font-medium text-gray-700">
                  Aperçu Logo
                </Label>
                {formData.logo && (
                  <img
                    src={URL.createObjectURL(formData.logo)}
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
              onClick={() => setIsHeaderModalOpen(false)}
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
