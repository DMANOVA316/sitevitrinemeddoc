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
      setLocalError(null); // Réinitialise les erreurs locales
      await createNumber({ numero: formattedNumber }).then(() => {
        if (!localError) toast.success("Ajout réussi");
      });
      setFormData({ numero: "" });
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Une erreur s'est produite lors de l'ajout du numéro."
      );
      setLocalError(
        error || "Une erreur s'est produite lors de l'ajout du numéro."
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
              placeholder="Entrez le numéro (ex: 032 65 031 58)"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Format accepté: 032 65 031 58, 0326503158, +261 32 65 031 58, etc. Le numéro sera automatiquement formaté au format international (+261).
            </p>
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
