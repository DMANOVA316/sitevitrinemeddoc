import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useServiceContext } from "@/contexts/ServiceContext";
import { ServiceType } from "@/types";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";

export default function EditService() {
  const {
    currentService,
    isEditServiceOpen,
    setIsEditServiceOpen,
    updateService,
    isLoading,
  } = useServiceContext();

  const [formData, setFormData] = useState<Omit<ServiceType, "id">>({
    nom: "",
    description: "",
    lien: "",
  });

  useEffect(() => {
    if (currentService) {
      setFormData({
        nom: currentService.nom,
        description: currentService.description,
        lien: currentService.lien,
      });
    }
  }, [currentService]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!currentService) return;

    try {
      await updateService(currentService.id, formData);
      toast.success("Service modifié avec succès");
    } catch (error) {
      toast.error("Erreur lors de la modification du service");
    }
  };

  return (
    <Dialog open={isEditServiceOpen} onOpenChange={setIsEditServiceOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Modifier le service</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="nom">Nom</Label>
            <Input
              id="nom"
              value={formData.nom}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, nom: e.target.value }))
              }
              disabled={isLoading}
              required
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, description: e.target.value }))
              }
              disabled={isLoading}
              required
            />
          </div>
          <div>
            <Label htmlFor="lien">Lien</Label>
            <Input
              id="lien"
              value={formData.lien}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, lien: e.target.value }))
              }
              disabled={isLoading}
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsEditServiceOpen(false)}
              disabled={isLoading}
            >
              Annuler
            </Button>
            <Button
              type="submit"
              className="bg-green-500 hover:bg-green-600"
              disabled={isLoading}
            >
              {isLoading ? "Modification en cours..." : "Modifier"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
