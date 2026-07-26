import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Document } from '@/lib/types';

interface DocumentsState {
  documents: Document[];
  activeDocumentId: string | null;
  saveStatus: 'idle' | 'saving' | 'saved' | 'error';
}

const initialState: DocumentsState = {
  documents: [],
  activeDocumentId: null,
  saveStatus: 'idle',
};

const documentsSlice = createSlice({
  name: 'documents',
  initialState,
  reducers: {
    setDocuments(state, action: PayloadAction<Document[]>) {
      state.documents = action.payload;
    },
    setActiveDocument(state, action: PayloadAction<string | null>) {
      state.activeDocumentId = action.payload;
    },
    addDocument(state, action: PayloadAction<Document>) {
      state.documents.unshift(action.payload);
    },
    updateDocumentContent(
      state,
      action: PayloadAction<{ id: string; content?: string; title?: string }>
    ) {
      const doc = state.documents.find((d) => d.id === action.payload.id);
      if (doc) {
        if (action.payload.content !== undefined) doc.content = action.payload.content;
        if (action.payload.title !== undefined) doc.title = action.payload.title;
        doc.updatedAt = new Date().toISOString();
      }
    },
    deleteDocument(state, action: PayloadAction<string>) {
      state.documents = state.documents.filter((d) => d.id !== action.payload);
      if (state.activeDocumentId === action.payload) {
        state.activeDocumentId = state.documents[0]?.id ?? null;
      }
    },
    setSaveStatus(state, action: PayloadAction<'idle' | 'saving' | 'saved' | 'error'>) {
      state.saveStatus = action.payload;
    },
  },
});

export const {
  setDocuments,
  setActiveDocument,
  addDocument,
  updateDocumentContent,
  deleteDocument,
  setSaveStatus,
} = documentsSlice.actions;

export default documentsSlice.reducer;
