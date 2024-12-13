import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useNumberRedux from "@/hooks/use-number-redux";
import { toast } from "sonner";

export default function RemoveNumber() {
  const {
    isRemoveNumberOpen,
    showRemoveNumberModal,
    selectCurrentNumber,
    deleteNumber,
    error,
    isLoading,
  } = useNumberRedux();

  const handleRemove = async () => {
    try {
      await deleteNumber().then(() => {
        toast.success("Suppression reussi");
      });
      selectCurrentNumber(null);
    } catch (error) {
      console.log("Error encouterred:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Erreur lors de la suppression du contact",
      );
    }
  };

  return (
    <Dialog open={isRemoveNumberOpen} onOpenChange={showRemoveNumberModal}>
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
              onClick={() => showRemoveNumberModal(false)}
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
