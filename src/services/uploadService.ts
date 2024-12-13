import supabase from "@/utils/supabase";
import { v4 as uuidv4 } from "uuid";

const STORAGE_BUCKET = "images";
const PARTNERS_FOLDER = "partners";
const PHARMACIES_FOLDER = "pharmacies";
const MEDDOC_FOLDER = "meddoc";

type ImageType = "partner" | "pharmacy" | "meddoc";

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
      let folder;
      switch (type) {
        case "partner":
          folder = PARTNERS_FOLDER;
          break;
        case "pharmacy":
          folder = PHARMACIES_FOLDER;
          break;
        case "meddoc":
          folder = MEDDOC_FOLDER;
          break;
        default:
          folder = MEDDOC_FOLDER;
      }

      // Créer un nom de fichier unique avec le chemin du dossier
      const fileExt = file.name.split(".").pop()?.toLowerCase() || "jpg";
      const fileName = `${folder}/${uuidv4()}.${fileExt}`;

      console.log("Attempting to upload file:", fileName);
      console.log("To bucket:", STORAGE_BUCKET);

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
        throw new Error("Erreur lors de l'upload de l'image");
      }

      // Récupérer l'URL publique du fichier
      const { data: publicUrl } = supabase.storage
        .from(STORAGE_BUCKET)
        .getPublicUrl(fileName);

      console.log("Upload successful. Public URL:", publicUrl.publicUrl);

      return publicUrl.publicUrl;
    } catch (error) {
      console.error("Upload error:", error);
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

      const { error } = await supabase.storage
        .from(STORAGE_BUCKET)
        .remove([fileName]);

      if (error) {
        console.error("Delete error:", error.message);
        throw error;
      }

      console.log("File deleted successfully");
    } catch (error) {
      console.error("Delete error:", error);
      throw error;
    }
  },
};
