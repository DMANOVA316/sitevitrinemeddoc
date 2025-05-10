/**
 * Types pour la bibliothèque numérique
 */

/**
 * Type de document supporté dans la bibliothèque
 */
export type DocumentFileType = 'pdf' | 'audio' | 'video' | 'image' | 'other';

/**
 * Catégories de documents
 */
export type DocumentCategory = 'médecine' | 'pharmacie' | 'santé publique' | 'formation' | 'autre';

/**
 * Type d'action pour les statistiques d'accès
 */
export type AccessAction = 'view' | 'download';

/**
 * Document de la bibliothèque numérique
 */
export interface LibraryDocument {
  id: number;
  title: string;
  file_url: string;
  file_type: DocumentFileType;
  is_public: boolean;
  category: DocumentCategory;
  created_at: string;
  user_id?: string; // ID de l'utilisateur qui a créé le document
}

// Alias pour la rétrocompatibilité
export type Document = LibraryDocument;

/**
 * Statistique d'accès à un document
 */
export interface AccessStat {
  id: number;
  document_id: number;
  action: AccessAction;
  accessed_at: string;
}

/**
 * Type pour la création d'un nouveau document (sans id)
 */
export type CreateDocumentDTO = Omit<LibraryDocument, 'id' | 'created_at'>;

/**
 * Type pour la mise à jour d'un document existant
 */
export type UpdateDocumentDTO = Partial<Omit<LibraryDocument, 'id' | 'created_at'>>;

/**
 * Type pour la création d'une statistique d'accès (sans id)
 */
export type CreateAccessStatDTO = Omit<AccessStat, 'id' | 'accessed_at'>;
