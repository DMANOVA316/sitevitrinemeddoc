import { usePharmacyRedux } from "@/hooks/use-pharmacy-redux";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const RemovePharmacy = () => {
  const {
    currentPharmacy,
    isRemovePharmacyOpen,
    handleDeletePharmacy,
    setRemovePharmacyOpen,
  } = usePharmacyRedux();

  const handleConfirmDelete = async () => {
    if (currentPharmacy) {
      try {
        await handleDeletePharmacy(currentPharmacy.id);
        setRemovePharmacyOpen(false);
      } catch (error) {
        console.error("Erreur lors de la suppression de la pharmacie:", error);
      }
    }
  };

  return (
    <AlertDialog open={isRemovePharmacyOpen} onOpenChange={setRemovePharmacyOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Supprimer la pharmacie</AlertDialogTitle>
          <AlertDialogDescription>
            Êtes-vous sûr de vouloir supprimer la pharmacie "
            {currentPharmacy?.nom_pharmacie}" ? Cette action est irréversible.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirmDelete}>
            Supprimer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default RemovePharmacy;
