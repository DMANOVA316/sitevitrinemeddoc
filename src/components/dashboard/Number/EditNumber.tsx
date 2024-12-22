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
import useNumberRedux from "@/hooks/use-number-redux";
import { toast } from "sonner";

export default function EditNumber() {
  const {
    isEditNumberOpen,
    showEditNumberModal,
    updateNumber,
    currentNumber,
    isLoading,
    error,
  } = useNumberRedux();

  const [formData, setFormData] = useState<Omit<Numero_meddoc, "id">>({
    numero: "",
  });
  const [localError, setLocalError] = useState("");

  useEffect(() => {
    if (currentNumber) {
      setFormData({
        numero: currentNumber.numero,
      });
    }
  }, [currentNumber]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.numero.match(/^\d+$/)) {
      setLocalError("Le numéro doit contenir uniquement des chiffres.");
      return;
    }
    try {
      if (currentNumber) {
        await updateNumber(formData).then(() => {
          if (!localError) toast.success("Mise a jours reussi");
        });
      }
    } catch (error) {
      if (!localError) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Erreur lors de la mise a jours du contact",
        );
      }
    }
  };

  return (
    <Dialog open={isEditNumberOpen} onOpenChange={showEditNumberModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Modifier le numéro</DialogTitle>
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
          {(error || localError) && (
            <p className="text-red-500 text-sm">{localError || error}</p>
          )}
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => showEditNumberModal(false)}
            >
              Annuler
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Modification..." : "Modifier"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
