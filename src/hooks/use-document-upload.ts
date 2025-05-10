import { useState } from "react";
import documentUploadService from "@/services/documentUploadService";

/**
 * Hook personnalisé pour gérer l'upload de fichiers pour la bibliothèque numérique
 */
export const useDocumentUpload = () => {
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadedFileUrl, setUploadedFileUrl] = useState<string | null>(null);
  const [fileType, setFileType] = useState<string | null>(null);

  /**
   * Réinitialiser l'état de l'upload
   */
  const resetUpload = () => {
    setIsUploading(false);
    setUploadProgress(0);
    setUploadError(null);
    setUploadedFileUrl(null);
    setFileType(null);
  };

  /**
   * Valider un fichier avant l'upload
   * @param file Fichier à valider
   * @returns Message d'erreur ou null si le fichier est valide
   */
  const validateFile = (file: File): string | null => {
    // Vérifier la taille du fichier (max 100MB)
    const maxSize = 100 * 1024 * 1024; // 100MB
    if (file.size > maxSize) {
      return `Le fichier est trop volumineux. La taille maximale est de ${maxSize / (1024 * 1024)}MB.`;
    }

    // Détecter le type de fichier
    const detectedType = documentUploadService.getFileType(file.name);
    setFileType(detectedType);

    return null;
  };

  /**
   * Uploader un fichier avec suivi de progression
   * @param file Fichier à uploader
   * @returns URL du fichier uploadé
   */
  const uploadFile = async (file: File): Promise<string> => {
    try {
      // Valider le fichier
      const validationError = validateFile(file);
      if (validationError) {
        setUploadError(validationError);
        return "";
      }

      setIsUploading(true);
      setUploadProgress(0);
      setUploadError(null);

      // Simuler la progression de l'upload (car Supabase ne fournit pas de progression)
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          const newProgress = prev + Math.random() * 10;
          return newProgress > 90 ? 90 : newProgress;
        });
      }, 300);

      // Uploader le fichier
      const fileUrl = await documentUploadService.uploadFile(file);

      // Arrêter la simulation et définir la progression à 100%
      clearInterval(progressInterval);
      setUploadProgress(100);
      setUploadedFileUrl(fileUrl);

      return fileUrl;
    } catch (error) {
      setUploadError(error.message || "Erreur lors de l'upload du fichier");
      return "";
    } finally {
      setIsUploading(false);
    }
  };

  return {
    isUploading,
    uploadProgress,
    uploadError,
    uploadedFileUrl,
    fileType,
    uploadFile,
    validateFile,
    resetUpload,
  };
};

export default useDocumentUpload;
