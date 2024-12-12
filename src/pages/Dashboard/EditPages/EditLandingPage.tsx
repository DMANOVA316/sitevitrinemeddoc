import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FormEvent, useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEditPagesContext } from "@/contexts/EditPagesContext";
import { uploadService } from "@/services/uploadService";
import {
  couvertureService,
  CouvertureType,
} from "@/services/couvertureService";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import useInfoMeddocRedux from "@/hooks/use-info-meddoc-redux";

export default function EditLandingPage() {
  // const { isLandingPageModalOpen, setIsLandingPageModalOpen } =
  //   useEditPagesContext();
  const [photo, setPhoto] = useState<File | null>();
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<CouvertureType, "id">>({
    photo: "",
    titre: "",
    description: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await couvertureService.getCouverture();
        if (data) {
          setFormData({
            photo: data.photo || "",
            titre: data.titre || "",
            description: data.description || "",
          });
          setPhotoPreview(data.photo || null);
        }
      } catch (error) {
        console.error("Error fetching couverture data:", error);
        toast.error("Erreur lors du chargement des données");
      } finally {
        setIsLoading(false);
      }
    };

    if (isLandingPageModalOpen) {
      fetchData();
    }
  }, [isLandingPageModalOpen]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const updatedData = { ...formData };

      if (photo) {
        const photoUrl = await uploadService.uploadImage(photo, "meddoc");
        updatedData.photo = photoUrl;
      }

      await couvertureService.updateCouverture(updatedData);
      setIsLandingPageModalOpen(false);
      toast.success("Page de couverture mise à jour avec succès");
    } catch (error) {
      console.error("Error updating couverture:", error);
      toast.error("Erreur lors de la mise à jour de la page de couverture");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Dialog
      open={isLandingPageModalOpen}
      onOpenChange={setIsLandingPageModalOpen}
    >
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
                onChange={handleFileChange}
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

          <div className="flex justify-end space-x-3 mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsLandingPageModalOpen(false)}
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
