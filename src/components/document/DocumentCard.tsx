import React from "react";
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
  Unlock
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { motion } from "framer-motion";

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
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Card className="w-full h-full flex flex-col overflow-hidden border-t-4 border-t-meddoc-primary shadow-sm hover:shadow-md">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2">
              {getFileTypeIcon()}
              <CardTitle className="text-lg line-clamp-1">{document.title}</CardTitle>
            </div>
            <Badge variant="outline" className={getFileTypeBadgeColor()}>
              {document.file_type}
            </Badge>
          </div>
          <CardDescription className="flex justify-between items-center">
            <span>Ajouté {formattedDate}</span>
            <Badge variant="outline" className={getCategoryBadgeColor()}>
              {document.category}
            </Badge>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
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
        <CardFooter className="flex flex-col pt-2 gap-2 bg-gray-50">
          <div className="flex justify-between w-full gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onView(document)}
              title="Voir le document"
              className="bg-white hover:bg-meddoc-primary hover:text-white transition-colors"
            >
              <Eye className="h-4 w-4 mr-1" />
              Voir
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDownload(document)}
              title="Télécharger le document"
              className="bg-white hover:bg-meddoc-secondary hover:text-white transition-colors"
            >
              <Download className="h-4 w-4 mr-1" />
              Télécharger
            </Button>
          </div>

          {isAdmin && (
            <>
              <div className="flex justify-between w-full gap-2 mt-2 pt-2 border-t border-gray-200">
                {onViewStats && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onViewStats(document)}
                    title="Voir les statistiques"
                    className="bg-white hover:bg-blue-100"
                  >
                    <BarChart className="h-4 w-4 mr-1 text-blue-500" />
                    Stats
                  </Button>
                )}
                <div className="flex gap-2">
                  {onEdit && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(document)}
                      title="Modifier le document"
                      className="bg-white hover:bg-green-100"
                    >
                      <Pencil className="h-4 w-4 mr-1 text-green-500" />
                      
                    </Button>
                  )}
                  {onDelete && (
                    <Button
                      variant="destructive"
                      size="sm"
                      className="bg-red-500 text-white hover:bg-red-600"
                      onClick={() => onDelete(document)}
                      title="Supprimer le document"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                     
                    </Button>
                  )}
                </div>
              </div>

              {/* Bouton de suppression supplémentaire, plus visible */}
            
            </>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default DocumentCard;
