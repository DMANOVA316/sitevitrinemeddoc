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
import { useServiceContext } from "@/contexts/ServiceContext";
import { toast } from "sonner";

export default function RemoveService() {
  const {
    currentService,
    isRemoveServiceOpen,
    setIsRemoveServiceOpen,
    removeService,
    isLoading,
  } = useServiceContext();

  const handleRemove = async () => {
    if (!currentService) return;

    try {
      await removeService(currentService.id);
      toast.success("Service supprimé avec succès");
    } catch (error) {
      toast.error("Erreur lors de la suppression du service");
    }
  };

  return (
    <AlertDialog open={isRemoveServiceOpen} onOpenChange={setIsRemoveServiceOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
          <AlertDialogDescription>
            Cette action est irréversible. Cela supprimera définitivement le
            service {currentService?.nom} et toutes ses données associées.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Annuler</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleRemove}
            className="bg-red-500 hover:bg-red-600"
            disabled={isLoading}
          >
            {isLoading ? "Suppression..." : "Supprimer"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
