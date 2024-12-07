import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useNumberContext } from "@/contexts/NumberContext";

export default function RemoveNumber() {
  const {
    isRemoveNumberOpen,
    setIsRemoveNumberOpen,
    handleDeleteNumber,
    currentNumber,
    isLoading,
    error,
  } = useNumberContext();

  const handleRemove = async () => {
    if (currentNumber) {
      await handleDeleteNumber(currentNumber.id);
    }
  };

  return (
    <Dialog open={isRemoveNumberOpen} onOpenChange={setIsRemoveNumberOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Supprimer le numéro</DialogTitle>
          <DialogDescription>
            Êtes-vous sûr de vouloir supprimer ce numéro ? Cette action est
            irréversible.
          </DialogDescription>
        </DialogHeader>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <DialogFooter>
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsRemoveNumberOpen(false)}
            >
              Annuler
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleRemove}
              disabled={isLoading}
            >
              {isLoading ? "Suppression..." : "Supprimer"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
