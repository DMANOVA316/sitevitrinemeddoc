import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { usePartnerRedux } from "@/hooks/use-partner-redux";
import { toast } from "sonner";

export default function RemovePartner() {
  const {
    isLoading,
    currentPartner,
    isRemovePartnerOpen,
    showRemovePartnerModal,
    handleDeletePartner,
  } = usePartnerRedux();

  const handleRemove = async () => {
    try {
      if (currentPartner) {
        await handleDeletePartner(currentPartner.id);
        toast.success("Suppression reussi");
      }
    } catch (error) {
      console.error("Error encotered: ", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Erreur lors de la suppression du partenaire",
      );
    }
  };

  return (
    <Dialog open={isRemovePartnerOpen} onOpenChange={showRemovePartnerModal}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Supprimer le partenaire</DialogTitle>
          <DialogDescription>
            Êtes-vous sûr de vouloir supprimer ce partenaire ? Cette action est
            irréversible.
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-end gap-3 mt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => showRemovePartnerModal(false)}
          >
            Annuler
          </Button>
          <Button
            type="button"
            variant="destructive"
            disabled={isLoading}
            onClick={handleRemove}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                Suppression en cours...
              </div>
            ) : (
              "Supprimer"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
