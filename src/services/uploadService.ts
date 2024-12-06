import supabase from "@/utils/supabase";
import { v4 as uuidv4 } from "uuid";

const STORAGE_BUCKET = "images";
const PARTNERS_FOLDER = "partners"; // Sous-dossier pour les images des partenaires

export const uploadService = {
  uploadImage: async (file: File): Promise<string> => {
    try {
      // Vérifier si l'utilisateur est authentifié
      const {
        data: { session },
      } = await supabase.auth.getSession();

      console.log(
        "Session status:",
        session ? "Authenticated" : "Not authenticated"
      );

      if (!session) {
        throw new Error("Vous devez être connecté pour uploader une image");
      }

      // Log user info
      console.log("User ID:", session.user.id);
      console.log("User role:", session.user.role);

      // Vérifier si le fichier est une image
      if (!file.type.startsWith("image/")) {
        throw new Error("Le fichier doit être une image");
      }

      // Vérifier la taille du fichier (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        throw new Error("L'image ne doit pas dépasser 10MB");
      }

      // Créer un nom de fichier unique avec le chemin du dossier
      const fileExt = file.name.split(".").pop()?.toLowerCase() || "jpg";
      const fileName = `${PARTNERS_FOLDER}/${uuidv4()}.${fileExt}`;

      console.log("Attempting to upload file:", fileName);
      console.log("To bucket:", STORAGE_BUCKET);

      // Upload du fichier
      const { error: uploadError, data } = await supabase.storage
        .from(STORAGE_BUCKET)
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: true, // Permettre le remplacement si le fichier existe
        });

      if (uploadError) {
        console.error("Upload error details:", {
          message: uploadError.message,
          statusCode: uploadError.statusCode,
          name: uploadError.name,
          details: uploadError.details,
        });
        throw new Error(
          `Erreur lors de l'upload de l'image: ${uploadError.message}`
        );
      }

      if (!data?.path) {
        throw new Error("Chemin de l'image non disponible");
      }

      console.log("Upload successful. File path:", data.path);

      // Obtenir l'URL publique
      const { data: publicUrlData } = supabase.storage
        .from(STORAGE_BUCKET)
        .getPublicUrl(data.path);

      console.log("Public URL generated:", publicUrlData.publicUrl);

      return publicUrlData.publicUrl;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  },

  deleteImage: async (imageUrl: string): Promise<void> => {
    try {
      // Vérifier si l'utilisateur est authentifié
      const {
        data: { session },
      } = await supabase.auth.getSession();

      console.log(
        "Session status for delete:",
        session ? "Authenticated" : "Not authenticated"
      );

      if (!session) {
        throw new Error("Vous devez être connecté pour supprimer une image");
      }

      // Extraire le chemin du fichier de l'URL
      const urlParts = imageUrl.split("/");
      const bucketIndex = urlParts.indexOf(STORAGE_BUCKET);
      if (bucketIndex === -1) {
        throw new Error("URL d'image invalide");
      }

      // Reconstruire le chemin relatif
      const filePath = urlParts.slice(bucketIndex + 1).join("/");

      console.log("Attempting to delete file:", filePath);

      const { error } = await supabase.storage
        .from(STORAGE_BUCKET)
        .remove([filePath]);

      if (error) {
        console.error("Delete error details:", {
          message: error.message,
          statusCode: error.statusCode,
          name: error.name,
          details: error.details,
        });
        throw new Error(
          `Erreur lors de la suppression de l'image: ${error.message}`
        );
      }

      console.log("File successfully deleted");
    } catch (error) {
      console.error("Error deleting image:", error);
      throw error;
    }
  },
};
