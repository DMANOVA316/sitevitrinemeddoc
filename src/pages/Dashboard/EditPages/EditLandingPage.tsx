import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FormEvent, useState, useEffect, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { uploadService } from "@/services/uploadService";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import useCouvertureRedux from "@/hooks/use-couverture-redux";

export default function EditLandingPage() {
  const {
    couverture,
    editLandingPage,
    isLoading,
    error,
    isEditModalOpen,
    showEditCouvertureModal,
    getCurrentCouvertureData,
  } = useCouvertureRedux();

  const [photo, setPhoto] = useState<File | null>();
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Couverture, "id">>({
    photo: "",
    titre: "",
    description: "",
  });

  useEffect(() => {
    getCurrentCouvertureData();
  }, []);

  useEffect(() => {
    if (couverture) {
      setFormData(couverture);
      setPhotoPreview(couverture.photo);
    }
  }, [couverture]);

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        const updatedData = { ...formData };

        if (photo) {
          const uploadResponse = await uploadService.uploadImage(photo, "couverture");
          if (uploadResponse) {
            updatedData.photo = uploadResponse;
          }
        }
        await editLandingPage(updatedData);
        toast.success("Landing page modifié avec succès");
        showEditCouvertureModal(false);
      } catch (error) {
        console.error("Error updating landing page:", error);
        toast.error("Erreur lors de la modification du landing page");
      }
    },
    [formData, photo, editLandingPage, showEditCouvertureModal]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    []
  );

  const handlePhotoChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        setPhoto(file);
        setPhotoPreview(URL.createObjectURL(file));
      }
    },
    []
  );

  return (
    <Dialog open={isEditModalOpen} onOpenChange={showEditCouvertureModal}>
      <DialogContent className="max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Modifier la page de couverture</DialogTitle>
        </DialogHeader>

        <form
          encType="multipart/form-data"
          className="space-y-4 p-4"
          onSubmit={handleSubmit}
        >
          <div className="space-y-4">
            <div>
              <Label>Photo de couverture</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="mt-2"
                disabled={isLoading}
              />
              {photoPreview && (
                <div className="mt-2 border rounded-lg p-2">
                  <img
                    src={photoPreview}
                    alt="Aperçu de la photo de couverture"
                    className="max-h-48 object-contain mx-auto"
                  />
                </div>
              )}
            </div>

            <div>
              <Label>Titre</Label>
              <Input
                type="text"
                name="titre"
                value={formData.titre}
                onChange={handleInputChange}
                className="mt-2"
                placeholder="Entrez le titre de la page de couverture"
                disabled={isLoading}
              />
            </div>

            <div>
              <Label>Description</Label>
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="mt-2"
                placeholder="Entrez la description de la page de couverture"
                rows={4}
                disabled={isLoading}
              />
            </div>
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}
          <div className="flex justify-end space-x-3 mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => showEditCouvertureModal(false)}
              disabled={isLoading}
            >
              Annuler
            </Button>
            <Button
              type="submit"
              className="bg-green-500 hover:bg-green-600"
              disabled={isLoading}
            >
              {isLoading ? "Enregistrement..." : "Enregistrer"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
