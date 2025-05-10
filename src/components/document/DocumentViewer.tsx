import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Document } from "@/types/document";
import { Download, ExternalLink, FileAudio, FileIcon } from "lucide-react";
import PDFViewer from './PDFViewer';

interface DocumentViewerProps {
  document: Document | null;
  isOpen: boolean;
  onClose: () => void;
  onDownload: (document: Document) => void;
}

/**
 * Composant pour afficher un document dans une boîte de dialogue
 */
const DocumentViewer: React.FC<DocumentViewerProps> = ({
  document,
  isOpen,
  onClose,
  onDownload,
}) => {
  if (!document) return null;

  const renderContent = () => {
    switch (document.file_type) {
      case "image":
        return (
          <div className="flex items-center justify-center h-full">
            <img
              src={document.file_url}
              alt={document.title}
              className="max-w-full max-h-[50vh] sm:max-h-[60vh] md:max-h-[70vh] object-contain rounded-md shadow-sm"
              onError={(e) => {
                e.currentTarget.src = "https://placehold.co/800x600/e2e8f0/64748b?text=Image+non+disponible";
              }}
            />
          </div>
        );
      case "pdf":
        return (
          <div className="w-full h-[50vh] sm:h-[60vh] md:h-[70vh]">
            <PDFViewer
              fileUrl={document.file_url}
              showToolbar={true}
              height="100%"
              width="100%"
              title={document.title}
            />
          </div>
        );
      case "video":
        return (
          <div className="flex items-center justify-center h-full">
            <div className="w-full max-w-2xl rounded-md overflow-hidden shadow-md">
              <video
                src={document.file_url}
                controls
                className="max-w-full max-h-[50vh] sm:max-h-[60vh] md:max-h-[70vh] bg-black"
              >
                Votre navigateur ne prend pas en charge la lecture vidéo.
              </video>
            </div>
          </div>
        );
      case "audio":
        return (
          <div className="flex flex-col items-center justify-center h-full gap-4">
            <div className="bg-blue-50 p-6 rounded-full">
              <FileAudio className="h-16 w-16 text-blue-500" />
            </div>
            <div className="w-full max-w-md bg-white p-4 rounded-md shadow-md">
              <p className="text-center mb-4 font-medium text-gray-700">{document.title}</p>
              <audio
                src={document.file_url}
                controls
                className="w-full"
              >
                Votre navigateur ne prend pas en charge la lecture audio.
              </audio>
            </div>
          </div>
        );
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full gap-4">
            <div className="bg-gray-100 p-6 rounded-full">
              <FileIcon className="h-16 w-16 text-gray-500" />
            </div>
            <div className="max-w-md text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Prévisualisation non disponible
              </h3>
              <p className="text-gray-600 mb-6">
                La prévisualisation n'est pas disponible pour ce type de fichier.
                Vous pouvez télécharger le fichier ou l'ouvrir dans un nouvel onglet.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <Button
                  variant="outline"
                  onClick={() => window.open(document.file_url, "_blank")}
                  className="w-full sm:w-auto"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Ouvrir dans un nouvel onglet
                </Button>
                <Button
                  variant="default"
                  onClick={() => onDownload(document)}
                  className="w-full sm:w-auto"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Télécharger
                </Button>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[90vw] md:max-w-[80vw] lg:max-w-[70vw] max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-lg md:text-xl line-clamp-1">{document.title}</DialogTitle>
        </DialogHeader>
        <div className="flex-grow overflow-auto p-2 sm:p-4 md:p-6">
          {renderContent()}
        </div>
        <DialogFooter className="flex flex-col sm:flex-row justify-end gap-2 pt-4">
          <Button
            variant="outline"
            onClick={() => window.open(document.file_url, "_blank")}
            className="w-full sm:w-auto"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Ouvrir dans un nouvel onglet
          </Button>
          <Button
            variant="default"
            onClick={() => onDownload(document)}
            className="w-full sm:w-auto"
          >
            <Download className="h-4 w-4 mr-2" />
            Télécharger
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentViewer;
