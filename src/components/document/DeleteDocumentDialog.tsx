import React, { useState } from "react";
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
import { Document } from "@/types/document";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface DeleteDocumentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  document: Document;
  onDelete: () => Promise<void>;
}

/**
 * Composant pour confirmer la suppression d'un document
 */
const DeleteDocumentDialog: React.FC<DeleteDocumentDialogProps> = ({
  isOpen,
  onClose,
  document,
  onDelete,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  // Gérer la suppression du document
  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await onDelete();
      toast.success("Document supprimé avec succès");
      onClose();
    } catch (error) {
      toast.error("Erreur", {
        description: error.message || "Une erreur s'est produite lors de la suppression du document",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Êtes-vous sûr de vouloir supprimer ce document ?</AlertDialogTitle>
          <AlertDialogDescription>
            Vous êtes sur le point de supprimer le document "{document.title}". Cette action est
            irréversible et supprimera définitivement le document et toutes ses statistiques d'accès.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Annuler</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              handleDelete();
            }}
            disabled={isDeleting}
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            {isDeleting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Suppression...
              </>
            ) : (
              "Supprimer"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteDocumentDialog;
