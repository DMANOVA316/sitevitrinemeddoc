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

    // Nettoyer le numéro (enlever espaces, tirets, etc.)
    let cleanNumber = formData.numero.replace(/\s+|-|\(|\)|\+/g, '');

    // Vérifier que le numéro ne contient que des chiffres
    if (!cleanNumber.match(/^\d+$/)) {
      setLocalError("Le numéro doit contenir uniquement des chiffres.");
      return;
    }

    // Si le numéro commence par 0, le remplacer par +261
    if (cleanNumber.startsWith('0')) {
      cleanNumber = cleanNumber.substring(1);
    }

    // Si le numéro ne commence pas par 261, l'ajouter
    if (!cleanNumber.startsWith('261')) {
      cleanNumber = '261' + cleanNumber;
    }

    // Formater le numéro avec +261
    const formattedNumber = '+' + cleanNumber;

    try {
      if (currentNumber) {
        await updateNumber({ numero: formattedNumber }).then(() => {
          if (!localError) toast.success("Mise à jour réussie");
        });
      }
    } catch (error) {
      if (!localError) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Erreur lors de la mise à jour du contact",
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
              placeholder="Entrez le numéro (ex: 032 65 031 58)"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Format accepté: 032 65 031 58, 0326503158, +261 32 65 031 58, etc. Le numéro sera automatiquement formaté au format international (+261).
            </p>
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
