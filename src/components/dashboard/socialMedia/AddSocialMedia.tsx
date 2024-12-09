import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { usePartnerContext } from "@/contexts/PartnerContext";
import { SocialMedia } from "@/types";
import useSocialMedia from "@/hooks/use-social-media";
import { useSocialMediaContext } from "@/contexts/SocialMediaContext";

type NewPartnerData = Omit<SocialMedia, "id">;

export default function AddSocialMedia() {
  const {
    isAddSocialMediaOpen,
    setIsAddSocialMediaOpen,
    handleAddSocialMedia,
    isLoading,
    error,
  } = useSocialMediaContext();

  const [formData, setFormData] = useState<NewPartnerData>({
    nom: "",
    lien: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Créer le partenaire avec l'URL de l'image
      await handleAddSocialMedia({
        ...formData,
      });

      // Réinitialiser le formulaire et fermer la modale
      setFormData({ nom: "", lien: "" });
      setIsAddSocialMediaOpen(false);
    } catch (err) {
      console.error("Error adding Social Media:", err);
    }
  };

  return (
    <Dialog
      open={isAddSocialMediaOpen}
      onOpenChange={() => setIsAddSocialMediaOpen(false)}
    >
      <DialogContent className="max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Nouveau reseau social</DialogTitle>
        </DialogHeader>

        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <span className="block sm:inline">{error}</span>
          </div>
        )}

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

          <div className="flex gap-2 justify-end pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsAddSocialMediaOpen(false)}
              disabled={isLoading}
            >
              Annuler
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-500"
              disabled={isLoading}
            >
              {isLoading ? "Ajout en cours..." : "Ajouter"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
