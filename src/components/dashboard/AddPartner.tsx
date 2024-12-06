import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { usePartnerContext } from "@/contexts/PartnerContext";
import { PartnerType } from "@/types";
import { uploadService } from "@/services/uploadService";

type NewPartnerData = Omit<PartnerType, "id">;

export default function AddPartner() {
  const {
    isAddPartnerOpen,
    setIsAddPartnerOpen,
    handleAddPartner,
    isLoading,
    error,
  } = usePartnerContext();

  const [formData, setFormData] = useState<NewPartnerData>({
    nom_partenaire: "",
    lien: "",
    logo: "",
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Vérifier la taille du fichier (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setUploadError("L'image ne doit pas dépasser 10MB");
        return;
      }

      // Vérifier le type de fichier
      if (!file.type.startsWith("image/")) {
        setUploadError("Le fichier doit être une image");
        return;
      }

      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
      setUploadError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let logoUrl = formData.logo;

      if (selectedFile) {
        // Upload de l'image si une nouvelle image est sélectionnée
        logoUrl = await uploadService.uploadImage(selectedFile);
      }

      // Créer le partenaire avec l'URL de l'image
      await handleAddPartner({
        ...formData,
        logo: logoUrl,
      });

      // Réinitialiser le formulaire et fermer la modale
      setFormData({ nom_partenaire: "", lien: "", logo: "" });
      setSelectedFile(null);
      setImagePreview(null);
      setIsAddPartnerOpen(false);
    } catch (err) {
      console.error("Error adding partner:", err);
      setUploadError(
        err instanceof Error ? err.message : "Une erreur s'est produite"
      );
    }
  };

  return (
    <Dialog
      open={isAddPartnerOpen}
      onOpenChange={() => setIsAddPartnerOpen(false)}
    >
      <DialogContent className="max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Nouveau partenaire</DialogTitle>
        </DialogHeader>

        {(error || uploadError) && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <span className="block sm:inline">{error || uploadError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 p-4">
          <div className="space-y-2">
            <Label>Nom</Label>
            <Input
              type="text"
              value={formData.nom_partenaire}
              onChange={(e) =>
                setFormData({ ...formData, nom_partenaire: e.target.value })
              }
              placeholder="Nom du partenaire"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Site web</Label>
            <Input
              type="url"
              value={formData.lien}
              onChange={(e) =>
                setFormData({ ...formData, lien: e.target.value })
              }
              placeholder="https://example.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Logo du partenaire</Label>
            <Input
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              required
            />
            {selectedFile && (
              <p className="text-sm text-gray-500">
                Fichier sélectionné: {selectedFile.name}
              </p>
            )}
            {imagePreview && (
              <div className="flex items-center space-x-4 mt-4">
                <img
                  src={imagePreview}
                  alt="Aperçu du logo"
                  className="h-20 w-50 object-contain rounded-lg border p-2"
                />
                <span className="text-sm text-gray-500">Aperçu du logo</span>
              </div>
            )}
          </div>

          <div className="flex gap-2 justify-end pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsAddPartnerOpen(false)}
              disabled={isLoading}
            >
              Annuler
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-500"
              disabled={isLoading}
            >
              {isLoading ? <Skeleton className="h-6 w-24" /> : "Ajouter"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
