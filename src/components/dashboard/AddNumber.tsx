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
import { useNumberContext } from "@/contexts/NumberContext";
import { Numero_meddoc } from "@/types";

type NewNumberData = Omit<Numero_meddoc, "id">;

export default function AddNumber() {
  const {
    isAddNumberOpen,
    setIsAddNumberOpen,
    handleAddNumber,
    isLoading,
    error,
  } = useNumberContext();

  const [formData, setFormData] = useState<NewNumberData>({
    numero: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleAddNumber(formData);
    setFormData({ numero: "" });
  };

  return (
    <Dialog open={isAddNumberOpen} onOpenChange={setIsAddNumberOpen}>
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
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsAddNumberOpen(false)}
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
