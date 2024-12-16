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
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";

export default function AddService() {
  const { isAddServiceOpen, setIsAddServiceOpen, addService, isLoading } =
    useServiceContext();

  const [formData, setFormData] = useState<Omit<ServiceType, "id">>({
    nom: "",
    description: "",
    lien: "",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await addService(formData);
      toast.success("Service ajouté avec succès");
      setFormData({ nom: "", description: "", lien: "" });
    } catch (error) {
      toast.error("Erreur lors de l'ajout du service");
    }
  };

  return (
    <Dialog open={isAddServiceOpen} onOpenChange={setIsAddServiceOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ajouter un service</DialogTitle>
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
              onClick={() => setIsAddServiceOpen(false)}
              disabled={isLoading}
            >
              Annuler
            </Button>
            <Button
              type="submit"
              className="bg-green-500 hover:bg-green-600"
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
