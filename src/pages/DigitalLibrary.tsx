import React, { useEffect, useState } from "react";
import useDocumentRedux from "@/hooks/use-document-redux";
import { Document, DocumentCategory, DocumentFileType } from "@/types/document";
import DocumentGrid from "@/components/document/DocumentGrid";
import DocumentFilters from "@/components/document/DocumentFilters";
import DocumentViewer from "@/components/document/DocumentViewer";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import useScrollToTop from "@/hooks/useScrollToTop";
import useAuth from "@/hooks/useAuth";

const DigitalLibrary: React.FC = () => {
  useScrollToTop();
  const { isAuthenticated } = useAuth();
  const {
    filteredDocuments,
    isLoading,
    error,
    loadDocuments,
    handleRecordAccess,
    handleSelectDocument,
    applyFilter,
    clearFilters,
  } = useDocumentRedux();

  const [activeTab, setActiveTab] = useState<"all" | "public" | "private">("all");
  const [viewerOpen, setViewerOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);

  // Charger les documents au montage du composant
  useEffect(() => {
    // Charger tous les documents (sans filtre)
    loadDocuments(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Gérer les erreurs
  useEffect(() => {
    if (error) {
      toast.error("Erreur", {
        description: error,
      });
    }
  }, [error]);

  // Filtrer les documents en fonction de l'onglet actif
  useEffect(() => {
    // Utiliser un setTimeout pour éviter les mises à jour en boucle
    const timer = setTimeout(() => {
      if (activeTab === "public") {
        // Pour les documents publics, on définit isPublicOnly à true
        applyFilter({ isPublicOnly: true });
      } else if (activeTab === "private") {
        // Si l'utilisateur n'est pas authentifié et essaie d'accéder aux documents privés,
        // le rediriger vers l'onglet "all"
        if (!isAuthenticated) {
          setActiveTab("all");
          clearFilters();
          return;
        }
        // Pour les documents privés, on définit isPublicOnly à false
        // Cela filtrera pour ne montrer que les documents privés
        applyFilter({ isPublicOnly: false });
      } else {
        // Pour tous les documents, on réinitialise les filtres
        clearFilters();
      }
    }, 0);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, isAuthenticated]);

  // Gérer la visualisation d'un document
  const handleViewDocument = (document: Document) => {
    handleSelectDocument(document);
    handleRecordAccess(document.id, "view");
    setSelectedDocument(document);
    setViewerOpen(true);
  };

  // Fermer la prévisualisation
  const handleCloseViewer = () => {
    setViewerOpen(false);
  };

  // Gérer le téléchargement d'un document
  const handleDownloadDocument = (document: Document) => {
    handleRecordAccess(document.id, "download");
    // Créer un lien temporaire pour télécharger le fichier
    const link = window.document.createElement("a");
    link.href = document.file_url;
    link.download = document.title;
    window.document.body.appendChild(link);
    link.click();
    window.document.body.removeChild(link);
  };

  // Gérer le filtrage par catégorie
  const handleCategoryFilter = (category: DocumentCategory | null) => {
    applyFilter({ category });
  };

  // Gérer le filtrage par type de fichier
  const handleFileTypeFilter = (fileType: DocumentFileType | null) => {
    applyFilter({ fileType });
  };

  // Gérer la réinitialisation des filtres
  const handleResetFilters = () => {
    clearFilters();
    setActiveTab("all");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Prévisualiseur de document */}
      <DocumentViewer
        document={selectedDocument}
        isOpen={viewerOpen}
        onClose={handleCloseViewer}
        onDownload={handleDownloadDocument}
      />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2 bg-gradient-to-r from-meddoc-primary to-meddoc-secondary bg-clip-text text-transparent">
            Bibliothèque Numérique
          </h1>
          <p className="text-gray-600 max-w-2xl">
            Accédez à notre collection de documents, ressources et matériels de formation
          </p>
        </div>
        <div className="flex gap-2 mt-2 md:mt-0">
          <Button
            variant="outline"
            onClick={() => loadDocuments(null)}
            disabled={isLoading}
            className="w-full md:w-auto"
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            Actualiser
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 mb-8">
        <div className="md:col-span-1 order-2 md:order-1">
          <div className="sticky top-4">
            <DocumentFilters
              onCategoryChange={handleCategoryFilter}
              onFileTypeChange={handleFileTypeFilter}
              onReset={handleResetFilters}
            />
          </div>
        </div>
        <div className="md:col-span-2 lg:col-span-3 xl:col-span-4 order-1 md:order-2">
          <Tabs
            defaultValue="all"
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as "all" | "public" | "private")}
            className="w-full"
          >
            <TabsList className={`grid w-full ${isAuthenticated ? 'grid-cols-3' : 'grid-cols-2'} mb-6`}>
              <TabsTrigger value="all">Tous les documents</TabsTrigger>
              <TabsTrigger value="public">Documents publics</TabsTrigger>
              {isAuthenticated && (
                <TabsTrigger value="private">Documents privés</TabsTrigger>
              )}
            </TabsList>
            <TabsContent value="all" className="mt-0">
              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-2 sm:gap-3 md:gap-4">
                  {Array(10)
                    .fill(0)
                    .map((_, index) => (
                      <Skeleton key={index} className="h-[280px] w-full rounded-lg" />
                    ))}
                </div>
              ) : filteredDocuments.length > 0 ? (
                <DocumentGrid
                  documents={filteredDocuments}
                  onView={handleViewDocument}
                  onDownload={handleDownloadDocument}
                  isAdmin={false}
                />
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun document trouvé</h3>
                  <p className="text-gray-600 mb-4">
                    Aucun document ne correspond à vos critères de recherche.
                  </p>
                  <Button variant="outline" onClick={handleResetFilters}>
                    Réinitialiser les filtres
                  </Button>
                </div>
              )}
            </TabsContent>
            <TabsContent value="public" className="mt-0">
              {/* Contenu identique, géré par le filtrage */}
              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-5 md:gap-6">
                  {Array(10)
                    .fill(0)
                    .map((_, index) => (
                      <Skeleton key={index} className="h-[280px] w-full rounded-lg" />
                    ))}
                </div>
              ) : filteredDocuments.length > 0 ? (
                <DocumentGrid
                  documents={filteredDocuments}
                  onView={handleViewDocument}
                  onDownload={handleDownloadDocument}
                  isAdmin={false}
                />
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun document public</h3>
                  <p className="text-gray-600 mb-4">
                    Aucun document public ne correspond à vos critères de recherche.
                  </p>
                  <Button variant="outline" onClick={handleResetFilters}>
                    Réinitialiser les filtres
                  </Button>
                </div>
              )}
            </TabsContent>
            {isAuthenticated && (
              <TabsContent value="private" className="mt-0">
                {/* Contenu identique, géré par le filtrage */}
                {isLoading ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-5 md:gap-6">
                    {Array(10)
                      .fill(0)
                      .map((_, index) => (
                        <Skeleton key={index} className="h-[280px] w-full rounded-lg" />
                      ))}
                  </div>
                ) : filteredDocuments.length > 0 ? (
                  <DocumentGrid
                    documents={filteredDocuments}
                    onView={handleViewDocument}
                    onDownload={handleDownloadDocument}
                    isAdmin={false}
                  />
                ) : (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun document privé</h3>
                    <p className="text-gray-600 mb-4">
                      Aucun document privé ne correspond à vos critères de recherche.
                    </p>
                    <Button variant="outline" onClick={handleResetFilters}>
                      Réinitialiser les filtres
                    </Button>
                  </div>
                )}
              </TabsContent>
            )}
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default DigitalLibrary;
