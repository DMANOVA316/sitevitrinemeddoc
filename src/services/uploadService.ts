import supabase from "@/utils/supabase";
import { v4 as uuidv4 } from "uuid";

const STORAGE_BUCKET = "images";
const PARTNERS_FOLDER = "partners";
const PHARMACIES_FOLDER = "pharmacies";

type ImageType = "partner" | "pharmacy";

export const uploadService = {
  uploadImage: async (file: File, type: ImageType): Promise<string> => {
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

      // Sélectionner le dossier approprié
      const folder = type === "partner" ? PARTNERS_FOLDER : PHARMACIES_FOLDER;

      // Créer un nom de fichier unique avec le chemin du dossier
      const fileExt = file.name.split(".").pop()?.toLowerCase() || "jpg";
      const fileName = `${folder}/${uuidv4()}.${fileExt}`;

      console.log("Attempting to upload file:", fileName);
      console.log("To bucket:", STORAGE_BUCKET);

      // Upload du fichier
      const { error: uploadError, data } = await supabase.storage
        .from(STORAGE_BUCKET)
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: true,
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

      if (!data) {
        throw new Error("Aucune donnée retournée après l'upload");
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(fileName);

      return publicUrl;
    } catch (error) {
      console.error("Error in uploadImage:", error);
      throw error;
    }
  },

  deleteImage: async (imageUrl: string): Promise<void> => {
    try {
      // Vérifier si l'utilisateur est authentifié
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        throw new Error("Vous devez être connecté pour supprimer une image");
      }

      // Extraire le nom du fichier de l'URL
      const urlParts = imageUrl.split("/");
      const fileName = `${urlParts[urlParts.length - 2]}/${
        urlParts[urlParts.length - 1]
      }`;

      console.log("Attempting to delete file:", fileName);

      const { error: deleteError } = await supabase.storage
        .from(STORAGE_BUCKET)
        .remove([fileName]);

      if (deleteError) {
        console.error("Delete error details:", {
          message: deleteError.message,
          statusCode: deleteError.statusCode,
          name: deleteError.name,
          details: deleteError.details,
        });
        throw new Error(
          `Erreur lors de la suppression de l'image: ${deleteError.message}`
        );
      }
    } catch (error) {
      console.error("Error in deleteImage:", error);
      throw error;
    }
  },
};
