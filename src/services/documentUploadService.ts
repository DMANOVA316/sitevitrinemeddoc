import supabase from "@/utils/supabase";
import { v4 as uuidv4 } from "uuid";

const STORAGE_BUCKET = "documents";
const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB

/**
 * Service pour gérer l'upload et la suppression de fichiers pour la bibliothèque numérique
 */
export const documentUploadService = {
  /**
   * Déterminer le type de fichier à partir de son extension
   * @param fileName Nom du fichier
   * @returns Type de fichier
   */
  getFileType: (fileName: string): "pdf" | "audio" | "video" | "image" | "other" => {
    const extension = fileName.split(".").pop()?.toLowerCase() || "";

    if (["pdf"].includes(extension)) {
      return "pdf";
    } else if (["mp3", "wav", "ogg", "aac"].includes(extension)) {
      return "audio";
    } else if (["mp4", "webm", "avi", "mov", "wmv"].includes(extension)) {
      return "video";
    } else if (["jpg", "jpeg", "png", "gif", "svg", "webp"].includes(extension)) {
      return "image";
    } else {
      return "other";
    }
  },

  /**
   * Uploader un fichier dans le bucket de documents
   * @param file Fichier à uploader
   * @returns URL signée du fichier (expire après 60 minutes)
   */
  uploadFile: async (file: File): Promise<string> => {
    try {
      // Vérifier si l'utilisateur est authentifié
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        throw new Error("Vous devez être connecté pour uploader un fichier");
      }

      // Vérifier la taille du fichier
      if (file.size > MAX_FILE_SIZE) {
        throw new Error(`Le fichier ne doit pas dépasser ${MAX_FILE_SIZE / (1024 * 1024)}MB`);
      }

      // Créer un nom de fichier unique
      const fileExt = file.name.split(".").pop()?.toLowerCase() || "";
      const fileName = `${uuidv4()}.${fileExt}`;

      // Upload du fichier
      const { data, error } = await supabase.storage
        .from(STORAGE_BUCKET)
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) {
        console.error("Upload error:", error.message);
        throw error;
      }

      if (!data) {
        throw new Error("Erreur lors de l'upload du fichier");
      }

      // Créer une URL signée (valide pendant 60 minutes)
      const { data: signedUrl } = await supabase.storage
        .from(STORAGE_BUCKET)
        .createSignedUrl(fileName, 60 * 60); // 60 minutes en secondes

      if (!signedUrl || !signedUrl.signedUrl) {
        throw new Error("Erreur lors de la création de l'URL signée");
      }

      return signedUrl.signedUrl;
    } catch (error) {
      console.error("Upload error:", error);
      throw error;
    }
  },

  /**
   * Supprimer un fichier du bucket de documents
   * @param fileUrl URL du fichier à supprimer ou nom du fichier
   */
  deleteFile: async (fileUrl: string): Promise<void> => {
    try {
      // Vérifier si l'utilisateur est authentifié
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        throw new Error("Vous devez être connecté pour supprimer un fichier");
      }

      // Extraire le nom du fichier de l'URL
      // Pour les URLs signées, le format est différent et contient des paramètres de requête
      let fileName: string | null = null;

      if (fileUrl.includes('?')) {
        // C'est probablement une URL signée, extraire le chemin avant les paramètres
        const urlWithoutParams = fileUrl.split('?')[0];
        fileName = urlWithoutParams.split('/').pop();
      } else {
        // URL normale ou nom de fichier direct
        fileName = fileUrl.split('/').pop();
      }

      if (!fileName) {
        throw new Error("Impossible de déterminer le nom du fichier à partir de l'URL");
      }

      // Supprimer le fichier
      const { error } = await supabase.storage
        .from(STORAGE_BUCKET)
        .remove([fileName]);

      if (error) {
        console.error("Delete error:", error.message);
        throw error;
      }
    } catch (error) {
      console.error("Delete error:", error);
      throw error;
    }
  },

  /**
   * Extraire le nom du fichier à partir d'une URL (publique ou signée)
   * @param fileUrl URL du fichier
   * @returns Nom du fichier
   */
  extractFileName: (fileUrl: string): string => {
    if (!fileUrl) {
      throw new Error("URL du fichier non spécifiée");
    }

    let fileName: string | null = null;

    if (fileUrl.includes('?')) {
      // C'est probablement une URL signée, extraire le chemin avant les paramètres
      const urlWithoutParams = fileUrl.split('?')[0];
      fileName = urlWithoutParams.split('/').pop();
    } else {
      // URL normale ou nom de fichier direct
      fileName = fileUrl.split('/').pop();
    }

    if (!fileName) {
      throw new Error("Impossible de déterminer le nom du fichier à partir de l'URL");
    }

    return fileName;
  },

  /**
   * Obtenir une URL signée pour un fichier existant
   * @param fileUrl URL existante du fichier ou nom du fichier
   * @param expiresIn Durée de validité en secondes (par défaut 60 minutes)
   * @returns URL signée du fichier
   */
  getSignedUrl: async (fileUrl: string, expiresIn: number = 60 * 60): Promise<string> => {
    try {
      // Extraire le nom du fichier de l'URL
      const fileName = documentUploadService.extractFileName(fileUrl);

      // Créer une URL signée
      const { data, error } = await supabase.storage
        .from(STORAGE_BUCKET)
        .createSignedUrl(fileName, expiresIn);

      if (error) {
        console.error("Error creating signed URL:", error.message);
        throw error;
      }

      if (!data || !data.signedUrl) {
        throw new Error("Erreur lors de la création de l'URL signée");
      }

      return data.signedUrl;
    } catch (error) {
      console.error("Error getting signed URL:", error);
      throw error;
    }
  }
};

export default documentUploadService;
