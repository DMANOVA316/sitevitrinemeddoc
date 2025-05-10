import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Document } from "@/types/document";
import { Button } from "@/components/ui/button";
import { Download, ExternalLink } from "lucide-react";

interface DocumentViewerDialogProps {
  isOpen: boolean;
  onClose: () => void;
  document: Document;
}

/**
 * Composant pour visualiser un document
 */
const DocumentViewerDialog: React.FC<DocumentViewerDialogProps> = ({
  isOpen,
  onClose,
  document,
}) => {
  // Gérer le téléchargement du document
  const handleDownload = () => {
    const link = window.document.createElement("a");
    link.href = document.file_url;
    link.download = document.title;
    window.document.body.appendChild(link);
    link.click();
    window.document.body.removeChild(link);
  };

  // Gérer l'ouverture du document dans un nouvel onglet
  const handleOpenInNewTab = () => {
    window.open(document.file_url, "_blank");
  };

  // Déterminer le type de contenu à afficher
  const renderContent = () => {
    switch (document.file_type) {
      case "pdf":
        return (
          <iframe
            src={document.file_url}
            className="w-full h-[70vh] border rounded-md"
            title={document.title}
          />
        );
      case "image":
        return (
          <div className="flex items-center justify-center h-[70vh]">
            <img
              src={document.file_url}
              alt={document.title}
              className="max-w-full max-h-full object-contain"
            />
          </div>
        );
      case "audio":
        return (
          <div className="flex flex-col items-center justify-center py-8">
            <audio controls className="w-full max-w-md">
              <source src={document.file_url} />
              Votre navigateur ne supporte pas la lecture audio.
            </audio>
          </div>
        );
      case "video":
        return (
          <div className="flex items-center justify-center">
            <video controls className="w-full max-h-[70vh]">
              <source src={document.file_url} />
              Votre navigateur ne supporte pas la lecture vidéo.
            </video>
          </div>
        );
      default:
        return (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-muted-foreground mb-4">
              L'aperçu n'est pas disponible pour ce type de fichier.
            </p>
            <div className="flex gap-2">
              <Button onClick={handleDownload}>
                <Download className="mr-2 h-4 w-4" />
                Télécharger
              </Button>
              <Button variant="outline" onClick={handleOpenInNewTab}>
                <ExternalLink className="mr-2 h-4 w-4" />
                Ouvrir dans un nouvel onglet
              </Button>
            </div>
          </div>
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[90vw] max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle>{document.title}</DialogTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleOpenInNewTab}>
              <ExternalLink className="mr-2 h-4 w-4" />
              Ouvrir
            </Button>
            <Button variant="outline" size="sm" onClick={handleDownload}>
              <Download className="mr-2 h-4 w-4" />
              Télécharger
            </Button>
          </div>
        </DialogHeader>
        <div className="flex-grow overflow-auto">{renderContent()}</div>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentViewerDialog;
