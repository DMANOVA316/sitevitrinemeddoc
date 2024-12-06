import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { usePartnerContext } from "@/contexts/PartnerContext";
import { PartnerType } from "@/types";

export default function RemovePartner() {
  const {
    currentPartner,
    isRemovePartnerOpen,
    setIsRemovePartnerOpen,
    handleRemovePartner,
  } = usePartnerContext();

  const handleRemove = async () => {
    if (currentPartner) {
      await handleRemovePartner(currentPartner.id);
      setIsRemovePartnerOpen(false);
    }
  };

  return (
    <Dialog
      open={isRemovePartnerOpen}
      onOpenChange={() => setIsRemovePartnerOpen(false)}
    >
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
            onClick={() => setIsRemovePartnerOpen(false)}
          >
            Annuler
          </Button>
          <Button type="button" variant="destructive" onClick={handleRemove}>
            Supprimer
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
