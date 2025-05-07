import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import documentService from "@/services/documentService";
import { Document, CreateDocumentDTO, UpdateDocumentDTO, AccessStat } from "@/types/document";
import { RootState } from "./index";

// Structure de l'état pour les documents
interface DocumentState {
  documents: Document[];
  currentDocument: Document | null;
  accessStats: AccessStat[];
  isLoading: boolean;
  error: string | null;
  isAddDocumentOpen: boolean;
  isEditDocumentOpen: boolean;
  isRemoveDocumentOpen: boolean;
  isViewStatsOpen: boolean;
  filter: {
    category: string | null;
    fileType: string | null;
    isPublicOnly: boolean;
  };
}

// État initial
const initialState: DocumentState = {
  documents: [],
  currentDocument: null,
  accessStats: [],
  isLoading: false,
  error: null,
  isAddDocumentOpen: false,
  isEditDocumentOpen: false,
  isRemoveDocumentOpen: false,
  isViewStatsOpen: false,
  filter: {
    category: null,
    fileType: null,
    isPublicOnly: false,
  },
};

// Thunks pour les opérations asynchrones
export const fetchDocuments = createAsyncThunk(
  "document/fetchDocuments",
  async (isPublicOnly: boolean = false, { rejectWithValue }) => {
    try {
      return await documentService.getAllDocuments(isPublicOnly);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchDocumentById = createAsyncThunk(
  "document/fetchDocumentById",
  async (id: number, { rejectWithValue }) => {
    try {
      return await documentService.getDocumentById(id);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addDocument = createAsyncThunk(
  "document/addDocument",
  async ({ document, file }: { document: CreateDocumentDTO; file: File }, { rejectWithValue }) => {
    try {
      return await documentService.createDocument(document, file);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateDocument = createAsyncThunk(
  "document/updateDocument",
  async (
    { id, document, file }: { id: number; document: UpdateDocumentDTO; file?: File },
    { rejectWithValue }
  ) => {
    try {
      return await documentService.updateDocument(id, document, file);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteDocument = createAsyncThunk(
  "document/deleteDocument",
  async (id: number, { rejectWithValue }) => {
    try {
      await documentService.deleteDocument(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const recordAccessStat = createAsyncThunk(
  "document/recordAccessStat",
  async (
    { documentId, action }: { documentId: number; action: "view" | "download" },
    { rejectWithValue }
  ) => {
    try {
      return await documentService.recordAccessStat({
        document_id: documentId,
        action,
      });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchDocumentAccessStats = createAsyncThunk(
  "document/fetchDocumentAccessStats",
  async (documentId: number, { rejectWithValue }) => {
    try {
      return await documentService.getDocumentAccessStats(documentId);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Slice Redux pour la gestion des documents
const documentSlice = createSlice({
  name: "document",
  initialState,
  reducers: {
    // Définir le document courant
    setCurrentDocument: (state, action: PayloadAction<Document | null>) => {
      state.currentDocument = action.payload;
    },
    // Contrôler l'état des modales
    setModalState: (
      state,
      action: PayloadAction<{
        modalType: "add" | "edit" | "remove" | "stats";
        isOpen: boolean;
      }>
    ) => {
      const { modalType, isOpen } = action.payload;
      if (modalType === "add") {
        state.isAddDocumentOpen = isOpen;
      } else if (modalType === "edit") {
        state.isEditDocumentOpen = isOpen;
      } else if (modalType === "remove") {
        state.isRemoveDocumentOpen = isOpen;
      } else if (modalType === "stats") {
        state.isViewStatsOpen = isOpen;
      }
    },
    // Définir les filtres
    setFilter: (
      state,
      action: PayloadAction<{
        category?: string | null;
        fileType?: string | null;
        isPublicOnly?: boolean;
      }>
    ) => {
      state.filter = {
        ...state.filter,
        ...action.payload,
      };
    },
    // Réinitialiser les filtres
    resetFilter: (state) => {
      state.filter = {
        category: null,
        fileType: null,
        isPublicOnly: false,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // Récupération des documents
      .addCase(fetchDocuments.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDocuments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.documents = action.payload;
      })
      .addCase(fetchDocuments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Récupération d'un document par ID
      .addCase(fetchDocumentById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDocumentById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentDocument = action.payload;
      })
      .addCase(fetchDocumentById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Ajout d'un document
      .addCase(addDocument.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addDocument.fulfilled, (state, action) => {
        state.isLoading = false;
        state.documents.unshift(action.payload);
        state.isAddDocumentOpen = false;
      })
      .addCase(addDocument.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Mise à jour d'un document
      .addCase(updateDocument.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateDocument.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.documents.findIndex((doc) => doc.id === action.payload.id);
        if (index !== -1) {
          state.documents[index] = action.payload;
        }
        state.currentDocument = action.payload;
        state.isEditDocumentOpen = false;
      })
      .addCase(updateDocument.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Suppression d'un document
      .addCase(deleteDocument.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteDocument.fulfilled, (state, action) => {
        state.isLoading = false;
        state.documents = state.documents.filter((doc) => doc.id !== action.payload);
        state.currentDocument = null;
        state.isRemoveDocumentOpen = false;
      })
      .addCase(deleteDocument.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Enregistrement d'une statistique d'accès
      .addCase(recordAccessStat.fulfilled, (state, action) => {
        state.accessStats.unshift(action.payload);
      })
      // Récupération des statistiques d'accès
      .addCase(fetchDocumentAccessStats.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDocumentAccessStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.accessStats = action.payload;
      })
      .addCase(fetchDocumentAccessStats.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

// Exportation des actions et du reducer
export const { setCurrentDocument, setModalState, setFilter, resetFilter } = documentSlice.actions;

// Sélecteurs
export const selectDocuments = (state: RootState) => state.document.documents;
export const selectCurrentDocument = (state: RootState) => state.document.currentDocument;
export const selectAccessStats = (state: RootState) => state.document.accessStats;
export const selectIsLoading = (state: RootState) => state.document.isLoading;
export const selectError = (state: RootState) => state.document.error;
export const selectFilter = (state: RootState) => state.document.filter;
export const selectFilteredDocuments = (state: RootState) => {
  const { documents, filter } = state.document;
  return documents.filter((doc) => {
    // Filtrer par catégorie
    if (filter.category && doc.category !== filter.category) {
      return false;
    }
    // Filtrer par type de fichier
    if (filter.fileType && doc.file_type !== filter.fileType) {
      return false;
    }
    // Filtrer par visibilité
    if (filter.isPublicOnly && !doc.is_public) {
      return false;
    }
    return true;
  });
};

export default documentSlice.reducer;
