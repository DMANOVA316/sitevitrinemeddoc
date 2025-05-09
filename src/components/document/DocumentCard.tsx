import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Document } from "@/types/document";
import {
  FileIcon,
  Download,
  Eye,
  Pencil,
  Trash2,
  BarChart,
  FileText,
  FileAudio,
  FileVideo,
  FileImage,
  Lock,
  Unlock,
  Maximize2
  // ExternalLink - non utilisé
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

// Import PDF Viewer component
import PDFViewer from "./PDFViewer";

interface DocumentCardProps {
  document: Document;
  onView: (document: Document) => void;
  onDownload: (document: Document) => void;
  onEdit?: (document: Document) => void;
  onDelete?: (document: Document) => void;
  onViewStats?: (document: Document) => void;
  isAdmin?: boolean;
}

/**
 * Composant pour afficher une carte de document
 */
const DocumentCard: React.FC<DocumentCardProps> = ({
  document,
  onView,
  onDownload,
  onEdit,
  onDelete,
  onViewStats,
  isAdmin = false,
}) => {
  const [previewOpen, setPreviewOpen] = useState(false);

  // Fonction pour obtenir l'icône en fonction du type de fichier
  const getFileTypeIcon = () => {
    switch (document.file_type) {
      case "pdf":
        return <FileText className="h-6 w-6 text-red-500" />;
      case "audio":
        return <FileAudio className="h-6 w-6 text-blue-500" />;
      case "video":
        return <FileVideo className="h-6 w-6 text-purple-500" />;
      case "image":
        return <FileImage className="h-6 w-6 text-green-500" />;
      default:
        return <FileIcon className="h-6 w-6 text-gray-500" />;
    }
  };

  // Fonction pour générer une prévisualisation du document
  const renderPreview = () => {
    switch (document.file_type) {
      case "image":
        return (
          <div className="w-full h-full flex items-center justify-center overflow-hidden bg-gray-100 rounded-md">
            <img
              src={document.file_url}
              alt={document.title}
              className="max-h-full max-w-full object-contain"
              onError={(e) => {
                e.currentTarget.src = "https://placehold.co/400x300/e2e8f0/64748b?text=Image+non+disponible";
              }}
            />
          </div>
        );
      case "pdf":
        return (
          <div
            className="w-full h-full relative overflow-hidden rounded-md bg-red-50 cursor-pointer"
            onClick={() => setPreviewOpen(true)}
          >
            {/* Prévisualisation du PDF avec Google Docs Viewer */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              <iframe
                src={`https://docs.google.com/viewer?url=${encodeURIComponent(document.file_url)}&embedded=true`}
                title={document.title}
                className="w-full h-full border-0"
                style={{ opacity: 0.15 }}
              />
            </div>

            {/* Overlay avec icône et texte */}
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-red-50/50">
              <div className="bg-white/90 p-2 rounded-full mb-1 shadow-sm">
                <FileText className="h-8 w-8 text-red-500" />
              </div>
              <span className="text-xs bg-white/90 px-3 py-1 rounded-md text-red-700 font-medium shadow-sm">
                Prévisualiser PDF
              </span>
            </div>
          </div>
        );
      case "video":
        return (
          <div className="w-full h-full flex items-center justify-center bg-purple-50 rounded-md">
            <FileVideo className="h-12 w-12 text-purple-500" />
          </div>
        );
      case "audio":
        return (
          <div className="w-full h-full flex items-center justify-center bg-blue-50 rounded-md">
            <FileAudio className="h-12 w-12 text-blue-500" />
          </div>
        );
      default:
        return (
          <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-md">
            <FileIcon className="h-12 w-12 text-gray-500" />
          </div>
        );
    }
  };

  // Fonction pour obtenir la couleur du badge en fonction du type de fichier
  const getFileTypeBadgeColor = () => {
    switch (document.file_type) {
      case "pdf":
        return "bg-red-100 text-red-800 hover:bg-red-200";
      case "audio":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case "video":
        return "bg-purple-100 text-purple-800 hover:bg-purple-200";
      case "image":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  // Fonction pour obtenir la couleur du badge en fonction de la catégorie
  const getCategoryBadgeColor = () => {
    switch (document.category) {
      case "médecine":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case "pharmacie":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "santé publique":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
      case "formation":
        return "bg-purple-100 text-purple-800 hover:bg-purple-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  // Formater la date de création
  const formattedDate = document.created_at
    ? formatDistanceToNow(new Date(document.created_at), { addSuffix: true, locale: fr })
    : "Date inconnue";

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <Card className="w-full h-full flex flex-col overflow-hidden border-t-4 border-t-meddoc-primary shadow-sm hover:shadow-md " style={{ display: 'flex', flexDirection: 'column' }} >
          {/* Prévisualisation du document */}
          <div
            className="relative cursor-pointer h-32"
            onClick={() => setPreviewOpen(true)}
            title="Cliquez pour prévisualiser"
            style={{ height: '128px' }}
          >
            {renderPreview()}
            <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 flex items-center justify-center transition-all duration-300">
              <Maximize2 className="h-8 w-8 text-white opacity-0 hover:opacity-100 transition-opacity" />
            </div>
          </div>

          <CardHeader className="pb-2 px-3 pt-3 sm:px-6 sm:pt-6">
            <div className="flex flex-col gap-2">
              <div className="flex items-start gap-2">
                <div className="flex-shrink-0 mt-1">
                  {getFileTypeIcon()}
                </div>
                <div className="flex-grow">
                  <CardTitle className="text-base sm:text-lg line-clamp-2 font-semibold text-gray-800 break-words">
                    {document.title}
                  </CardTitle>
                </div>
              </div>
              <div className="flex flex-wrap justify-between items-center gap-2">
                <Badge variant="outline" className={`${getFileTypeBadgeColor()} whitespace-nowrap`}>
                  {document.file_type}
                </Badge>
                <Badge variant="outline" className={`${getCategoryBadgeColor()} whitespace-nowrap`}>
                  {document.category}
                </Badge>
              </div>
            </div>
            <CardDescription className="flex justify-between items-center mt-2">
              <span className="text-xs sm:text-sm">Ajouté {formattedDate}</span>
            </CardDescription>
          </CardHeader>

          <CardContent className="flex-grow px-3 sm:px-6 pb-0">
            <div className="flex items-center justify-between">
              <Badge
                variant={document.is_public ? "default" : "outline"}
                className="flex items-center gap-1"
              >
                {document.is_public ? (
                  <>
                    <Unlock className="h-3 w-3" /> Public
                  </>
                ) : (
                  <>
                    <Lock className="h-3 w-3" /> Privé
                  </>
                )}
              </Badge>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col pt-2 gap-2 bg-gray-50 px-3 sm:px-6">
            <div className="flex flex-col sm:flex-row sm:justify-between w-full gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onView(document)}
                title="Voir le document"
                className="bg-white hover:bg-meddoc-primary hover:text-white transition-colors w-full sm:w-auto"
              >
                <Eye className="h-4 w-4 mr-1" />
                Voir
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDownload(document)}
                title="Télécharger le document"
                className="bg-white hover:bg-meddoc-secondary hover:text-white transition-colors w-full sm:w-auto"
              >
                <Download className="h-4 w-4 mr-1" />
                Télécharger
              </Button>
            </div>

            {isAdmin && (
              <>
                <div className="flex flex-col sm:flex-row sm:justify-between w-full gap-2 mt-2 pt-2 border-t border-gray-200">
                  {onViewStats && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onViewStats(document)}
                      title="Voir les statistiques"
                      className="bg-white hover:bg-blue-100 w-full sm:w-auto"
                    >
                      <BarChart className="h-4 w-4 mr-1 text-blue-500" />
                      Stats
                    </Button>
                  )}
                  <div className="flex gap-2 w-full sm:w-auto justify-between sm:justify-end">
                    {onEdit && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onEdit(document)}
                        title="Modifier le document"
                        className="bg-white hover:bg-green-100 flex-1 sm:flex-none"
                      >
                        <Pencil className="h-4 w-4 mr-1 text-green-500" />

                      </Button>
                    )}
                    {onDelete && (
                      <Button
                        variant="destructive"
                        size="sm"
                        className="bg-red-500 text-white hover:bg-red-600 flex-1 sm:flex-none"
                        onClick={() => onDelete(document)}
                        title="Supprimer le document"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />

                      </Button>
                    )}
                  </div>
                </div>
              </>
            )}
          </CardFooter>
        </Card>
      </motion.div>

      {/* Dialogue de prévisualisation */}
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="sm:max-w-[90vw] max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-lg line-clamp-1">{document.title}</DialogTitle>
          </DialogHeader>
          <div className="flex-grow overflow-auto p-4 flex items-center justify-center">
            {document.file_type === "image" ? (
              <img
                src={document.file_url}
                alt={document.title}
                className="max-w-full max-h-[70vh] object-contain"
                onError={(e) => {
                  e.currentTarget.src = "https://placehold.co/800x600/e2e8f0/64748b?text=Image+non+disponible";
                }}
              />
            ) : document.file_type === "pdf" ? (
              <div className="w-full h-[70vh] flex flex-col">
                <div className="bg-gray-100 p-2 rounded-t-md flex justify-between items-center">
                  <span className="font-medium text-gray-700">Prévisualisation PDF</span>
                  <a
                    href={document.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                  >
                    Ouvrir dans un nouvel onglet
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
                <div className="w-full flex-grow border-0 rounded-b-md overflow-hidden">
                  <PDFViewer
                    fileUrl={document.file_url}
                    showToolbar={true}
                    height="100%"
                    width="100%"
                    title={document.title}
                  />
                </div>
              </div>
            ) : document.file_type === "video" ? (
              <video
                src={document.file_url}
                controls
                className="max-w-full max-h-[70vh]"
              >
                Votre navigateur ne prend pas en charge la lecture vidéo.
              </video>
            ) : document.file_type === "audio" ? (
              <audio
                src={document.file_url}
                controls
                className="w-full max-w-md"
              >
                Votre navigateur ne prend pas en charge la lecture audio.
              </audio>
            ) : (
              <div className="text-center">
                <FileIcon className="h-24 w-24 mx-auto text-gray-400 mb-4" />
                <p>Prévisualisation non disponible pour ce type de fichier.</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => onView(document)}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Ouvrir le document
                </Button>
              </div>
            )}
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button
              variant="outline"
              onClick={() => onDownload(document)}
            >
              <Download className="h-4 w-4 mr-2" />
              Télécharger
            </Button>
            <Button
              onClick={() => onView(document)}
            >
              <Eye className="h-4 w-4 mr-2" />
              Ouvrir
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DocumentCard;
