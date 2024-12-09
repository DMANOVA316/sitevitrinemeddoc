import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { usePartnerContext } from "@/contexts/PartnerContext";
import { useSocialMediaContext } from "@/contexts/SocialMediaContext";

export default function RemoveSocialMedia() {
  const {
    currentSocialMedia,
    isRemoveSocialMediaOpen,
    setIsRemoveSocialMediaOpen,
    handleRemoveSocialMedia,
  } = useSocialMediaContext();

  const handleRemove = async () => {
    if (currentSocialMedia) {
      await handleRemoveSocialMedia(currentSocialMedia.id);
      setIsRemoveSocialMediaOpen(false);
    }
  };

  return (
    <Dialog
      open={isRemoveSocialMediaOpen}
      onOpenChange={() => setIsRemoveSocialMediaOpen(false)}
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
            onClick={() => setIsRemoveSocialMediaOpen(false)}
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
