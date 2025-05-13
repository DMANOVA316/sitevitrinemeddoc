import supabase from "@/utils/supabase";
import documentUploadService from "./documentUploadService";
import {
  Document,
  CreateDocumentDTO,
  UpdateDocumentDTO,
  AccessStat,
  CreateAccessStatDTO
} from "@/types/document";

const DOCUMENTS_TABLE = "documents";
const ACCESS_STATS_TABLE = "access_stats";
const URL_EXPIRATION_TIME = 60 * 60; // 60 minutes en secondes

/**
 * Service pour gérer les documents de la bibliothèque numérique
 */
export const documentService = {
  /**
   * Rafraîchir l'URL signée d'un document
   * @param document Document dont l'URL doit être rafraîchie
   * @returns Document avec une URL signée fraîche
   */
  refreshDocumentUrl: async (document: Document): Promise<Document> => {
    try {
      if (!document.file_url) {
        return document;
      }

      // Générer une nouvelle URL signée
      const signedUrl = await documentUploadService.getSignedUrl(document.file_url, URL_EXPIRATION_TIME);

      return {
        ...document,
        file_url: signedUrl
      };
    } catch (error) {
      console.error("Error refreshing document URL:", error);
      // En cas d'erreur, retourner le document original
      return document;
    }
  },

  /**
   * Rafraîchir les URLs signées d'une liste de documents
   * @param documents Liste de documents dont les URLs doivent être rafraîchies
   * @returns Liste de documents avec des URLs signées fraîches
   */
  refreshDocumentUrls: async (documents: Document[]): Promise<Document[]> => {
    try {
      const refreshedDocuments = await Promise.all(
        documents.map(async (doc) => await documentService.refreshDocumentUrl(doc))
      );

      return refreshedDocuments;
    } catch (error) {
      console.error("Error refreshing document URLs:", error);
      // En cas d'erreur, retourner les documents originaux
      return documents;
    }
  },
  /**
   * Récupérer tous les documents
   * @param isPublicOnly Si true, ne récupère que les documents publics
   * @returns Liste des documents avec des URLs signées fraîches
   */
  getAllDocuments: async (isPublicOnly: boolean = false): Promise<Document[]> => {
    try {
      let query = supabase.from(DOCUMENTS_TABLE).select("*");

      if (isPublicOnly) {
        query = query.eq("is_public", true);
      }

      const { data, error } = await query.order("created_at", { ascending: false });

      if (error) throw new Error(error.message);

      // Rafraîchir les URLs des documents
      const documents = data || [];
      return await documentService.refreshDocumentUrls(documents);
    } catch (error) {
      console.error("Error fetching documents:", error);
      throw error;
    }
  },

  /**
   * Récupérer un document par son ID
   * @param id ID du document
   * @returns Document avec une URL signée fraîche ou null si non trouvé
   */
  getDocumentById: async (id: number): Promise<Document | null> => {
    try {
      const { data, error } = await supabase
        .from(DOCUMENTS_TABLE)
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw new Error(error.message);

      // Si le document existe, rafraîchir son URL
      if (data) {
        return await documentService.refreshDocumentUrl(data);
      }

      return null;
    } catch (error) {
      console.error(`Error fetching document with ID ${id}:`, error);
      throw error;
    }
  },

  /**
   * Créer un nouveau document
   * @param document Données du document
   * @param file Fichier à uploader
   * @returns Document créé
   */
  createDocument: async (document: CreateDocumentDTO, file: File): Promise<Document> => {
    try {
      // Vérifier si l'utilisateur est authentifié
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error("Vous devez être connecté pour ajouter un document");
      }

      // Déterminer le type de fichier si non spécifié
      let documentData = { ...document };
      if (!documentData.file_type) {
        documentData.file_type = documentUploadService.getFileType(file.name);
      }

      // Upload du fichier
      const fileUrl = await documentUploadService.uploadFile(file);

      // Créer le document dans la base de données avec l'ID de l'utilisateur actuel
      const { data, error } = await supabase
        .from(DOCUMENTS_TABLE)
        .insert([{
          ...documentData,
          file_url: fileUrl,
          user_id: session.user.id, // Ajouter l'ID de l'utilisateur actuel
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error creating document:", error);
      throw error;
    }
  },

  /**
   * Mettre à jour un document existant
   * @param id ID du document
   * @param document Données à mettre à jour
   * @param file Nouveau fichier (optionnel)
   * @returns Document mis à jour
   */
  updateDocument: async (id: number, document: UpdateDocumentDTO, file?: File): Promise<Document> => {
    try {
      // Vérifier si l'utilisateur est authentifié
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error("Vous devez être connecté pour modifier un document");
      }

      let updatedDocument = { ...document };

      // Si un nouveau fichier est fourni, le télécharger
      if (file) {
        // Récupérer l'ancien document pour supprimer l'ancien fichier
        const { data: oldDocument } = await supabase
          .from(DOCUMENTS_TABLE)
          .select("file_url")
          .eq("id", id)
          .single();

        // Déterminer le type de fichier si non spécifié
        if (!updatedDocument.file_type) {
          updatedDocument.file_type = documentUploadService.getFileType(file.name);
        }

        // Upload du nouveau fichier
        const fileUrl = await documentUploadService.uploadFile(file);
        updatedDocument.file_url = fileUrl;

        // Supprimer l'ancien fichier si possible
        if (oldDocument?.file_url) {
          try {
            await documentUploadService.deleteFile(oldDocument.file_url);
          } catch (deleteError) {
            console.error("Error deleting old file:", deleteError);
            // Continue même si la suppression échoue
          }
        }
      }

      // Mettre à jour le document dans la base de données
      // Récupérer d'abord le document pour vérifier s'il appartient à l'utilisateur actuel
      const { data: existingDoc, error: fetchError } = await supabase
        .from(DOCUMENTS_TABLE)
        .select("*")
        .eq("id", id)
        .single();

      if (fetchError) {
        throw new Error(`Erreur lors de la récupération du document: ${fetchError.message}`);
      }

      // Si le document n'a pas de user_id, l'ajouter
      if (!existingDoc.user_id) {
        updatedDocument.user_id = session.user.id;
      }

      const { data, error } = await supabase
        .from(DOCUMENTS_TABLE)
        .update(updatedDocument)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error(`Error updating document with ID ${id}:`, error);
      throw error;
    }
  },

  /**
   * Supprimer un document
   * @param id ID du document
   */
  deleteDocument: async (id: number): Promise<void> => {
    try {
      // Vérifier si l'utilisateur est authentifié
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error("Vous devez être connecté pour supprimer un document");
      }

      // Récupérer le document pour obtenir l'URL du fichier et vérifier le propriétaire
      const { data: document, error: fetchError } = await supabase
        .from(DOCUMENTS_TABLE)
        .select("*")
        .eq("id", id)
        .single();

      if (fetchError) {
        throw new Error(`Erreur lors de la récupération du document: ${fetchError.message}`);
      }

      // Si le document n'a pas de user_id, l'ajouter temporairement pour permettre la suppression
      if (!document.user_id) {
        const { error: updateError } = await supabase
          .from(DOCUMENTS_TABLE)
          .update({ user_id: session.user.id })
          .eq("id", id);

        if (updateError) {
          console.error("Erreur lors de la mise à jour du propriétaire:", updateError);
        }
      }

      // Supprimer le document de la base de données
      const { error } = await supabase
        .from(DOCUMENTS_TABLE)
        .delete()
        .eq("id", id);

      if (error) throw error;

      // Supprimer le fichier du stockage
      if (document?.file_url) {
        try {
          await documentUploadService.deleteFile(document.file_url);
        } catch (deleteError) {
          console.error("Error deleting file:", deleteError);
          // Continue même si la suppression échoue
        }
      }
    } catch (error) {
      console.error(`Error deleting document with ID ${id}:`, error);
      throw error;
    }
  },

  /**
   * Enregistrer une statistique d'accès
   * @param stat Données de la statistique
   * @returns Statistique créée
   */
  recordAccessStat: async (stat: CreateAccessStatDTO): Promise<AccessStat> => {
    try {
      const { data, error } = await supabase
        .from(ACCESS_STATS_TABLE)
        .insert([stat])
        .select()
        .single();

      if (error) {
        console.error("Error recording access stat:", error);
        // Si l'erreur est liée à RLS, on continue sans enregistrer la statistique
        // pour ne pas bloquer l'accès au document
        return {
          id: 0,
          document_id: stat.document_id,
          action: stat.action,
          accessed_at: new Date().toISOString(),
        };
      }

      return data;
    } catch (error) {
      console.error("Error recording access stat:", error);
      // Ne pas propager l'erreur pour ne pas bloquer l'accès au document
      return {
        id: 0,
        document_id: stat.document_id,
        action: stat.action,
        accessed_at: new Date().toISOString(),
      };
    }
  },

  /**
   * Récupérer les statistiques d'accès pour un document
   * @param documentId ID du document
   * @returns Liste des statistiques d'accès
   */
  getDocumentAccessStats: async (documentId: number): Promise<AccessStat[]> => {
    try {
      const { data, error } = await supabase
        .from(ACCESS_STATS_TABLE)
        .select("*")
        .eq("document_id", documentId)
        .order("accessed_at", { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error(`Error fetching access stats for document ${documentId}:`, error);
      throw error;
    }
  }
};

export default documentService;
