import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { AppDispatch, RootState } from "@/store";
import {
  fetchDocuments,
  fetchDocumentById,
  addDocument,
  updateDocument,
  deleteDocument,
  recordAccessStat,
  fetchDocumentAccessStats,
  setCurrentDocument,
  setModalState,
  setFilter,
  resetFilter,
  selectDocuments,
  selectCurrentDocument,
  selectAccessStats,
  selectIsLoading,
  selectError,
  selectFilter,
  selectFilteredDocuments,
} from "@/store/documentSlice";
import { Document, CreateDocumentDTO, UpdateDocumentDTO } from "@/types/document";

/**
 * Hook personnalisé pour gérer les documents de la bibliothèque numérique
 */
export const useDocumentRedux = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoadingData, setIsLoadingData] = useState<boolean>(false);

  // Sélecteurs Redux
  const documents = useSelector(selectDocuments);
  const filteredDocuments = useSelector(selectFilteredDocuments);
  const currentDocument = useSelector(selectCurrentDocument);
  const accessStats = useSelector(selectAccessStats);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const filter = useSelector(selectFilter);

  // États des modales depuis Redux
  const isAddDocumentOpen = useSelector((state: RootState) => state.document.isAddDocumentOpen);
  const isEditDocumentOpen = useSelector((state: RootState) => state.document.isEditDocumentOpen);
  const isRemoveDocumentOpen = useSelector((state: RootState) => state.document.isRemoveDocumentOpen);
  const isViewStatsOpen = useSelector((state: RootState) => state.document.isViewStatsOpen);

  // Contrôle des modales
  const showAddDocumentModal = (isOpen: boolean) => {
    dispatch(setModalState({ modalType: "add", isOpen }));
  };

  const showEditDocumentModal = (isOpen: boolean) => {
    dispatch(setModalState({ modalType: "edit", isOpen }));
  };

  const showRemoveDocumentModal = (isOpen: boolean) => {
    dispatch(setModalState({ modalType: "remove", isOpen }));
  };

  const showViewStatsModal = (isOpen: boolean) => {
    dispatch(setModalState({ modalType: "stats", isOpen }));
  };

  // Charger tous les documents
  const loadDocuments = async (isPublicOnly: boolean | null = null) => {
    try {
      setIsLoadingData(true);
      await dispatch(fetchDocuments(isPublicOnly)).unwrap();
    } catch (error) {
      setErrorMessage(error.message || "Erreur lors du chargement des documents");
    } finally {
      setIsLoadingData(false);
    }
  };

  // Charger un document par son ID
  const loadDocumentById = async (id: number) => {
    try {
      setIsLoadingData(true);
      await dispatch(fetchDocumentById(id)).unwrap();
    } catch (error) {
      setErrorMessage(error.message || `Erreur lors du chargement du document ${id}`);
    } finally {
      setIsLoadingData(false);
    }
  };

  // Ajouter un nouveau document
  const handleAddDocument = async (document: CreateDocumentDTO, file: File) => {
    try {
      setIsLoadingData(true);
      await dispatch(addDocument({ document, file })).unwrap();
      return true;
    } catch (error) {
      setErrorMessage(error.message || "Erreur lors de l'ajout du document");
      return false;
    } finally {
      setIsLoadingData(false);
      showAddDocumentModal(false);
    }
  };

  // Mettre à jour un document existant
  const handleUpdateDocument = async (id: number, document: UpdateDocumentDTO, file?: File) => {
    try {
      setIsLoadingData(true);
      await dispatch(updateDocument({ id, document, file })).unwrap();
      return true;
    } catch (error) {
      setErrorMessage(error.message || `Erreur lors de la mise à jour du document ${id}`);
      return false;
    } finally {
      setIsLoadingData(false);
      showEditDocumentModal(false);
    }
  };

  // Supprimer un document
  const handleDeleteDocument = async (id: number) => {
    try {
      setIsLoadingData(true);
      await dispatch(deleteDocument(id)).unwrap();
      return true;
    } catch (error) {
      setErrorMessage(error.message || `Erreur lors de la suppression du document ${id}`);
      return false;
    } finally {
      setIsLoadingData(false);
      showRemoveDocumentModal(false);
    }
  };

  // Enregistrer une statistique d'accès
  const handleRecordAccess = async (documentId: number, action: "view" | "download") => {
    try {
      await dispatch(recordAccessStat({ documentId, action })).unwrap();
    } catch (error) {
      console.error("Erreur lors de l'enregistrement de la statistique:", error);
      // Ne pas afficher d'erreur à l'utilisateur pour cette opération
    }
  };

  // Charger les statistiques d'accès d'un document
  const loadDocumentStats = async (documentId: number) => {
    try {
      setIsLoadingData(true);
      await dispatch(fetchDocumentAccessStats(documentId)).unwrap();
    } catch (error) {
      setErrorMessage(error.message || `Erreur lors du chargement des statistiques du document ${documentId}`);
    } finally {
      setIsLoadingData(false);
    }
  };

  // Sélectionner un document pour les opérations
  const handleSelectDocument = (document: Document) => {
    dispatch(setCurrentDocument(document));
  };

  // Appliquer des filtres
  const applyFilter = (filterOptions: { category?: string | null; fileType?: string | null; isPublicOnly?: boolean | null }) => {
    dispatch(setFilter(filterOptions));
  };

  // Réinitialiser les filtres
  const clearFilters = () => {
    dispatch(resetFilter());
  };

  return {
    // États
    documents,
    filteredDocuments,
    currentDocument,
    accessStats,
    isLoading: isLoading || isLoadingData,
    error: error || errorMessage,
    filter,

    // États des modales
    isAddDocumentOpen,
    isEditDocumentOpen,
    isRemoveDocumentOpen,
    isViewStatsOpen,

    // Contrôle des modales
    showAddDocumentModal,
    showEditDocumentModal,
    showRemoveDocumentModal,
    showViewStatsModal,

    // Actions
    loadDocuments,
    loadDocumentById,
    handleAddDocument,
    handleUpdateDocument,
    handleDeleteDocument,
    handleRecordAccess,
    loadDocumentStats,
    handleSelectDocument,
    setCurrentDocument: (document: Document | null) => dispatch(setCurrentDocument(document)),

    // Filtres
    applyFilter,
    clearFilters,
  };
};

export default useDocumentRedux;
