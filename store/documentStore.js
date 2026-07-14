import { create } from "zustand";
import { uploadDocument, getUserDocuments, deleteUserDocument } from "../services/document";

export const useDocumentStore = create((set, get) => ({
  documents: [],
  uploading: false,
  error: null,

  loadDocuments: async (userId) => {
    if (!userId) return;
    try {
      const data = await getUserDocuments(userId);
      set({ documents: data, error: null });
    } catch (err) {
      set({ error: err?.message || "Failed to load documents" });
    }
  },

  uploadDocument: async (userId, docType, name, uri) => {
    if (!userId) {
      set({ error: "You must be signed in to upload documents" });
      return;
    }
    set({ uploading: true, error: null });
    const tempId = `temp_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    const tempDoc = { id: tempId, docType, name, url: uri, publicId: null, fileType: null, uploading: true };
    set((state) => ({ documents: [...state.documents, tempDoc] }));

    try {
      const saved = await uploadDocument(userId, docType, name, uri);
      const finalDoc = { id: saved.id, docType: saved.docType, name: saved.name, url: saved.url, publicId: saved.publicId, fileType: saved.fileType, status: saved.status, uploading: false };
      set((state) => ({
        documents: state.documents.map((d) => (d.id === tempId ? finalDoc : d)),
        uploading: false,
      }));
    } catch (err) {
      set((state) => ({
        documents: state.documents.filter((d) => d.id !== tempId),
        uploading: false,
        error: err?.message || "Failed to upload document",
      }));
      throw err;
    }
  },

  removeDocument: async (documentId) => {
    const doc = get().documents.find((d) => d.id === documentId);
    if (!doc) return;

    set((state) => ({
      documents: state.documents.filter((d) => d.id !== documentId),
      error: null,
    }));

    if (doc.publicId) {
      try {
        await deleteUserDocument(documentId);
      } catch (err) {
        set({ error: err?.message || "Failed to delete document" });
      }
    }
  },

  clearDocuments: () => set({ documents: [], error: null }),
}));
