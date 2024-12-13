import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import useSocialMediaRedux from "@/hooks/use-social-media-redux";

export default function RemoveSocialMedia() {
  const {
    currentSocialMedia,
    isRemoveSocialMediaOpen,
    showRemoveSocialMediaModal,
    deleteSocialMedia,
    isLoading,
  } = useSocialMediaRedux();

  const handleRemove = async () => {
    if (currentSocialMedia) {
      await deleteSocialMedia();
    }
  };

  return (
    <Dialog
      open={isRemoveSocialMediaOpen}
      onOpenChange={showRemoveSocialMediaModal}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Supprimer le reseau social</DialogTitle>
          <DialogDescription>
            Êtes-vous sûr de vouloir supprimer ce reseau social ? Cette action
            est irréversible.
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-end gap-3 mt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => showRemoveSocialMediaModal(false)}
          >
            Annuler
          </Button>
          <Button
            type="button"
            variant="destructive"
            disabled={isLoading}
            onClick={handleRemove}
          >
            {isLoading ? "Suppression..." : "Supprimer"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
