import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { usePartnerContext } from "@/contexts/PartnerContext";
import { PartnerType, SocialMedia } from "@/types";
import { useSocialMediaContext } from "@/contexts/SocialMediaContext";

export default function EditSocialMedia() {
  const {
    currentSocialMedia,
    isEditSocialMediaOpen,
    setIsEditSocialMediaOpen,
    handleEditSocialMedia,
  } = useSocialMediaContext();

  const [formData, setFormData] = useState<SocialMedia>({
    id: 0,
    nom: "",
    lien: "",
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (currentSocialMedia) {
      setFormData(currentSocialMedia);
      setSelectedFile(null); // Réinitialiser le fichier sélectionné
    }
  }, [currentSocialMedia]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await handleEditSocialMedia(formData);
    setIsLoading(false);
  };

  return (
    <Dialog
      open={isEditSocialMediaOpen}
      onOpenChange={() => setIsEditSocialMediaOpen(false)}
    >
      <DialogContent className="max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            Modifier le reseau social "
            <span className="text-meddoc-primary">
              {currentSocialMedia?.nom}
            </span>
            "
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 p-4">
          <div className="space-y-2">
            <Label>Nom</Label>
            <Input
              type="text"
              value={formData.nom}
              onChange={(e) =>
                setFormData({ ...formData, nom: e.target.value })
              }
              placeholder="Nom du reseau"
            />
          </div>

          <div className="space-y-2">
            <Label>Site web</Label>
            <Input
              type="text"
              value={formData.lien}
              onChange={(e) =>
                setFormData({ ...formData, lien: e.target.value })
              }
              placeholder="Url site web du reseau"
            />
          </div>

          <div className="flex gap-2 justify-end pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsEditSocialMediaOpen(false)}
            >
              Annuler
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-500"
              disabled={isLoading}
            >
              {isLoading ? "Modification..." : "Modifier"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
