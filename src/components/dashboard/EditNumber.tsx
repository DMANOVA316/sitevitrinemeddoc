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
import { useNumberContext } from "@/contexts/NumberContext";
import { Numero_meddoc } from "@/types";

export default function EditNumber() {
  const {
    isEditNumberOpen,
    setIsEditNumberOpen,
    handleUpdateNumber,
    currentNumber,
    isLoading,
    error,
  } = useNumberContext();

  const [formData, setFormData] = useState<Partial<Omit<Numero_meddoc, "id">>>({
    numero: "",
  });

  useEffect(() => {
    if (currentNumber) {
      setFormData({
        numero: currentNumber.numero,
      });
    }
  }, [currentNumber]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentNumber) {
      await handleUpdateNumber(currentNumber.id, formData);
    }
  };

  return (
    <Dialog open={isEditNumberOpen} onOpenChange={setIsEditNumberOpen}>
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
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsEditNumberOpen(false)}
            >
              Annuler
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Modification en cours..." : "Modifier"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
