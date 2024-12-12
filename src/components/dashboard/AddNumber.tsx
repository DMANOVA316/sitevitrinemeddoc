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
import useNumberRedux from "@/hooks/use-number-redux";
import { toast } from "sonner";

type NewNumberData = Omit<Numero_meddoc, "id">;

export default function AddNumber() {
  const {
    isAddNumberOpen,
    showAddNumberModal,
    isLoading,
    error,
    createNumber,
  } = useNumberRedux();
  const [formData, setFormData] = useState<NewNumberData>({
    numero: "",
  });
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.numero.match(/^\d+$/)) {
      setLocalError("Le numéro doit contenir uniquement des chiffres.");
      return;
    }
    try {
      setLocalError(null); // Réinitialise les erreurs locales
      await createNumber(formData).then(() => {
        if (!localError) toast.success("Ajout reussi");
      });
      setFormData({ numero: "" });
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Une erreur s'est produite lors de l'ajout du numéro.",
      );
      setLocalError(
        error || "Une erreur s'est produite lors de l'ajout du numéro.",
      );
    }
  };

  return (
    <Dialog open={isAddNumberOpen} onOpenChange={showAddNumberModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ajouter un numéro</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="numero">Numéro</Label>
            <Input
              id="numero"
              value={formData.numero}
              onChange={(e) =>
                setFormData({ ...formData, numero: e.target.value })
              }
              placeholder="Entrez le numéro"
              required
            />
          </div>
          {/* Gestion des erreurs */}
          {(error || localError) && (
            <p className="text-red-500 text-sm">{localError || error}</p>
          )}
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => showAddNumberModal(false)}
            >
              Annuler
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Ajout en cours..." : "Ajouter"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
