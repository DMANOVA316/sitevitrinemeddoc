import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Document } from "@/types/document";
import useDocumentRedux from "@/hooks/use-document-redux";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDistanceToNow, format } from "date-fns";
import { fr } from "date-fns/locale";
import { BarChart, Download, Eye } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface DocumentStatsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  document: Document;
}

/**
 * Composant pour afficher les statistiques d'accès d'un document
 */
const DocumentStatsDialog: React.FC<DocumentStatsDialogProps> = ({
  isOpen,
  onClose,
  document,
}) => {
  const { accessStats, isLoading } = useDocumentRedux();

  // Calculer les statistiques
  const totalViews = accessStats.filter((stat) => stat.action === "view").length;
  const totalDownloads = accessStats.filter((stat) => stat.action === "download").length;
  const totalAccesses = accessStats.length;

  // Formater la date de création
  const formattedCreationDate = document.created_at
    ? format(new Date(document.created_at), "dd MMMM yyyy à HH:mm", { locale: fr })
    : "Date inconnue";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Statistiques du document</DialogTitle>
          <DialogDescription>
            Statistiques d'accès pour le document "{document.title}"
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Informations générales */}
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Informations générales</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Titre</p>
                <p className="font-medium">{document.title}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Catégorie</p>
                <p className="font-medium">{document.category}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Type de fichier</p>
                <p className="font-medium">{document.file_type}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Visibilité</p>
                <p className="font-medium">{document.is_public ? "Public" : "Privé"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Date de création</p>
                <p className="font-medium">{formattedCreationDate}</p>
              </div>
            </div>
          </div>

          {/* Résumé des statistiques */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  <Eye className="h-4 w-4 mr-2 text-blue-500" />
                  Consultations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {isLoading ? <Skeleton className="h-8 w-16" /> : totalViews}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  <Download className="h-4 w-4 mr-2 text-green-500" />
                  Téléchargements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {isLoading ? <Skeleton className="h-8 w-16" /> : totalDownloads}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  <BarChart className="h-4 w-4 mr-2 text-purple-500" />
                  Total des accès
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {isLoading ? <Skeleton className="h-8 w-16" /> : totalAccesses}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Historique des accès */}
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Historique des accès</h3>
            {isLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            ) : accessStats.length > 0 ? (
              <div className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {accessStats.map((stat) => (
                      <TableRow key={stat.id}>
                        <TableCell>
                          <div className="font-medium">
                            {format(new Date(stat.accessed_at), "dd/MM/yyyy HH:mm")}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {formatDistanceToNow(new Date(stat.accessed_at), {
                              addSuffix: true,
                              locale: fr,
                            })}
                          </div>
                        </TableCell>
                        <TableCell>
                          {stat.action === "view" ? (
                            <div className="flex items-center">
                              <Eye className="h-4 w-4 mr-2 text-blue-500" />
                              Consultation
                            </div>
                          ) : (
                            <div className="flex items-center">
                              <Download className="h-4 w-4 mr-2 text-green-500" />
                              Téléchargement
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-6 bg-gray-50 rounded-md">
                <p className="text-muted-foreground">Aucun accès enregistré pour ce document</p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentStatsDialog;
