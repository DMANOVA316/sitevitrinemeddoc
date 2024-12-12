import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { usePartnerRedux } from "@/hooks/use-partner-redux";
import { PartnerType } from "@/types";

type NewPartnerData = Omit<PartnerType, "id">;

export default function AddPartner() {
  const {
    isAddPartnerOpen,
    showAddPartnerModal,
    handleAddPartner,
    isLoading,
    error,
  } = usePartnerRedux();

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
      if (file.size > 10 * 1024 * 1024) {
        setUploadError("L'image ne doit pas dépasser 10MB");
        return;
      }

      if (!file.type.startsWith("image/")) {
        setUploadError("Le fichier doit être une image");
        return;
      }

      setSelectedFile(file);
      setUploadError(null);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploadError(null);

    try {
      await handleAddPartner(formData, selectedFile);
      setFormData({
        nom_partenaire: "",
        lien: "",
        logo: "",
      });
      setSelectedFile(null);
      setImagePreview(null);
      showAddPartnerModal(false);
      toast.success("Ajout reussi.");
    } catch (err) {
      console.error("Error adding partner:", err);
      toast.error(
        err instanceof Error ? err.message : "Erreur lors de l'ajout",
      );
    }
  };

  return (
    <Dialog open={isAddPartnerOpen} onOpenChange={showAddPartnerModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ajouter un partenaire</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="nom_partenaire">Nom du partenaire</Label>
            <Input
              id="nom_partenaire"
              value={formData.nom_partenaire}
              onChange={(e) =>
                setFormData({ ...formData, nom_partenaire: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lien">Lien du site web</Label>
            <Input
              id="lien"
              type="url"
              value={formData.lien}
              onChange={(e) =>
                setFormData({ ...formData, lien: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="logo">Logo</Label>
            <Input
              id="logo"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="cursor-pointer"
            />
            {uploadError && (
              <p className="text-sm text-red-500 mt-1">{uploadError}</p>
            )}
            {imagePreview && (
              <div className="mt-2">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="h-20 w-20 object-contain"
                />
              </div>
            )}
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => showAddPartnerModal(false)}
            >
              Annuler
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-500"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">Ajout en cours...</div>
              ) : (
                "Ajouter"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
