import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { usePartnerContext } from "@/contexts/PartnerContext";
import { PartnerType } from "@/types";

export default function EditPartner() {
  const {
    currentPartner,
    isEditPartnerOpen,
    setIsEditPartnerOpen,
    handleEditPartner,
  } = usePartnerContext();

  const [formData, setFormData] = useState<PartnerType>({
    id: 0,
    nom_partenaire: "",
    lien: "",
    logo: "",
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    if (currentPartner) {
      setFormData(currentPartner);
      setSelectedFile(null); // Réinitialiser le fichier sélectionné
    }
  }, [currentPartner]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleEditPartner(formData, selectedFile);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // Ne pas mettre à jour le logo dans formData ici
      // Il sera géré par handleEditPartner
    }
  };

  return (
    <Dialog
      open={isEditPartnerOpen}
      onOpenChange={() => setIsEditPartnerOpen(false)}
    >
      <DialogContent className="max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Modifier le partenaire</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 p-4"
          encType="multipart/form-data"
        >
          <div className="space-y-2">
            <Label>Nom</Label>
            <Input
              type="text"
              value={formData.nom_partenaire}
              onChange={(e) =>
                setFormData({ ...formData, nom_partenaire: e.target.value })
              }
              placeholder="Nom du partenaire"
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
              placeholder="Url site web du partenaire"
            />
          </div>

          <div className="space-y-2">
            <Label>Logo actuel</Label>
            {formData.logo ? (
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={formData.logo}
                  alt={`Logo ${formData.nom_partenaire}`}
                  className="h-20 w-50 object-contain rounded-lg border p-2"
                />
                <span className="text-sm text-gray-500">
                  Logo actuel du partenaire
                </span>
              </div>
            ) : (
              <p className="text-sm text-gray-500 mb-4">Aucun logo</p>
            )}

            <Label>Nouveau logo</Label>
            <Input
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              className="cursor-pointer"
            />
            {selectedFile && (
              <p className="text-sm text-gray-500 mt-1">
                Nouveau fichier sélectionné : {selectedFile.name}
              </p>
            )}
          </div>

          <div className="flex gap-2 justify-end pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsEditPartnerOpen(false)}
            >
              Annuler
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-500">
              Modifier
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
