import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useSocialMediaRedux from "@/hooks/use-social-media-redux";

export default function EditSocialMedia() {
  const {
    currentSocialMedia,
    showEditSocialMediaModal,
    isEditSocialMediaOpen,
    updateSocialMedia,
    isLoading,
  } = useSocialMediaRedux();

  const [formData, setFormData] = useState<SocialMedia>({
    id: 0,
    nom: "",
    lien: "",
  });

  useEffect(() => {
    if (currentSocialMedia) setFormData(currentSocialMedia);
  }, [currentSocialMedia]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateSocialMedia(formData);
  };

  return (
    <Dialog
      open={isEditSocialMediaOpen}
      onOpenChange={showEditSocialMediaModal}
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
              onClick={() => showEditSocialMediaModal(false)}
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
