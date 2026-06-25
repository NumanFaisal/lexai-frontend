'use client';

import { useEffect, useRef, useState, useCallback, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Plus,
  FileText,
  Download,
  Clock,
  Sparkles,
  Check,
  Loader2,
  Trash2,
  Bold,
  Italic,
  Underline,
  List,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useAppSelector, useAppDispatch } from '@/store';
import {
  setDocuments,
  setActiveDocument,
  updateDocumentContent,
  setSaveStatus,
  addDocument,
  deleteDocument,
} from '@/store/slices/documentsSlice';
import { MOCK_DOCUMENTS, MODE_DATA } from '@/lib/mock-data';
import { listItemStagger } from '@/lib/animations';
import type { Document as DocType } from '@/lib/types';

function DocumentsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const { documents, activeDocumentId, saveStatus } = useAppSelector(
    (s) => s.documents
  );
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [showNewForm, setShowNewForm] = useState(false);
  const [newDocDescription, setNewDocDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [exportingId, setExportingId] = useState<string | null>(null);
  const [revisionQuery, setRevisionQuery] = useState('');
  const [isRevising, setIsRevising] = useState(false);

  const getDocumentTags = (doc: DocType) => {
    const titleLower = doc.title.toLowerCase();
    if (titleLower.includes('nda') || titleLower.includes('disclosure')) {
      return { category: 'NDA', tags: ['NDA', 'Indian Contract Act 1872', 'Delhi Jurisdiction', 'v2'] };
    }
    if (titleLower.includes('employment') || titleLower.includes('services') || titleLower.includes('contract')) {
      return { category: 'Contract', tags: ['Employment', 'Companies Act 2013', 'New Delhi', 'v1'] };
    }
    if (titleLower.includes('gst') || titleLower.includes('compliance')) {
      return { category: 'Compliance', tags: ['GST', 'Finance Act 2025', 'All India', 'v1'] };
    }
    return { category: 'Legal', tags: ['Legal', 'Indian Law', 'v1'] };
  };

  const handleAIRevision = async () => {
    if (!activeDocumentId || !revisionQuery.trim()) return;
    setIsRevising(true);
    dispatch(setSaveStatus('saving'));

    // Simulate AI thinking and applying changes
    await new Promise((r) => setTimeout(r, 1800));

    const currentDoc = documents.find((d) => d.id === activeDocumentId);
    if (currentDoc) {
      const addedText = `\n\n## AI REVISION: ${revisionQuery}\n\n[LexAI has automatically revised this section based on your prompt: "${revisionQuery}". Under the applicable Indian legal regulations, these terms have been adapted to protect the parties' interests and ensure full compliance.]\n\n1. The parties agree that this clause shall be binding under the local jurisdiction of India.\n2. Both parties represent that they have full authority to execute these amendments.`;
      dispatch(updateDocumentContent({
        id: activeDocumentId,
        content: currentDoc.content + addedText
      }));
      dispatch(setSaveStatus('saved'));
      toast.success('Document revised by LexAI');
      setRevisionQuery('');
      setTimeout(() => dispatch(setSaveStatus('idle')), 2000);
    }
    setIsRevising(false);
  };

  // Initialize documents
  useEffect(() => {
    if (documents.length === 0) {
      dispatch(setDocuments(MOCK_DOCUMENTS));
    }
  }, [dispatch, documents.length]);

  // Handle URL deep-link
  useEffect(() => {
    const docId = searchParams.get('doc');
    if (docId && documents.some((d) => d.id === docId)) {
      dispatch(setActiveDocument(docId));
    } else if (!activeDocumentId && documents.length > 0) {
      dispatch(setActiveDocument(documents[0].id));
    }
  }, [searchParams, documents, activeDocumentId, dispatch]);

  const activeDoc = documents.find((d) => d.id === activeDocumentId);

  // Auto-save with debounce
  const handleContentChange = useCallback(
    (content: string) => {
      if (!activeDocumentId) return;
      dispatch(updateDocumentContent({ id: activeDocumentId, content }));
      dispatch(setSaveStatus('saving'));

      clearTimeout(saveTimerRef.current);
      saveTimerRef.current = setTimeout(() => {
        dispatch(setSaveStatus('saved'));
        setTimeout(() => dispatch(setSaveStatus('idle')), 2000);
      }, 1500);
    },
    [activeDocumentId, dispatch]
  );

  const selectDocument = (id: string) => {
    dispatch(setActiveDocument(id));
    router.replace(`/documents?doc=${id}`, { scroll: false });
  };

  const handleNewDocument = async () => {
    if (!newDocDescription.trim()) return;
    setIsGenerating(true);

    // Simulate generation
    await new Promise((r) => setTimeout(r, 1500));

    const newDoc: DocType = {
      id: `doc_${Date.now()}`,
      title: newDocDescription.slice(0, 60),
      description: newDocDescription,
      content: `# ${newDocDescription}\n\n[Document content will be generated here based on your description...]\n\nThis is a draft generated by LexAI. Review and edit as needed.`,
      status: 'draft',
      mode: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    dispatch(addDocument(newDoc));
    dispatch(setActiveDocument(newDoc.id));
    setShowNewForm(false);
    setNewDocDescription('');
    setIsGenerating(false);
  };

  const handleExport = async (format: 'pdf' | 'word') => {
    setExportingId(format);
    await new Promise((r) => setTimeout(r, 1200));
    // In a real app, this would trigger a download
    setExportingId(null);
  };

  const handleDelete = (id: string) => {
    dispatch(deleteDocument(id));
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className="flex h-full">
      {/* Left: Document list */}
      <div className="w-[300px] flex-shrink-0 border-r border-border-default bg-bg-secondary overflow-y-auto hidden md:block">
        <div className="p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-[14px] font-semibold text-text-primary">
              Documents
            </h2>
            <button
              onClick={() => setShowNewForm(!showNewForm)}
              className="flex items-center gap-1 rounded-md border border-border-default px-2 py-1 text-[11px] text-text-muted transition-colors hover:border-gold-border hover:text-gold"
            >
              <Plus size={14} strokeWidth={1.5} />
              New
            </button>
          </div>

          {/* New document form */}
          {showNewForm && (
            <div className="mt-3 rounded-xl border border-gold-border bg-bg-primary p-3">
              <textarea
                value={newDocDescription}
                onChange={(e) => setNewDocDescription(e.target.value)}
                placeholder="Describe the document you need..."
                rows={3}
                className="w-full resize-none rounded-lg bg-transparent text-[12px] text-text-primary placeholder:text-text-disabled outline-none"
              />
              <button
                onClick={handleNewDocument}
                disabled={!newDocDescription.trim() || isGenerating}
                className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-lg bg-gold px-3 py-1.5 text-[12px] font-medium text-bg-primary disabled:opacity-40"
              >
                {isGenerating ? (
                  <>
                    <Loader2
                      size={14}
                      strokeWidth={1.5}
                      className="animate-spin"
                    />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles size={14} strokeWidth={1.5} />
                    Generate
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Document items */}
        <motion.div
          className="flex flex-col"
          variants={listItemStagger.container}
          initial="initial"
          animate="animate"
        >
          {documents.map((doc) => {
            const isActive = doc.id === activeDocumentId;
            const modeData = MODE_DATA[doc.mode];
            const { category } = getDocumentTags(doc);
            
            // Format status name nicely
            const statusLabel = doc.status.charAt(0).toUpperCase() + doc.status.slice(1);
            const isDraftStatus = doc.status === 'draft';
            
            return (
              <motion.div
                key={doc.id}
                variants={listItemStagger.item}
                onClick={() => selectDocument(doc.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    selectDocument(doc.id);
                  }
                }}
                role="button"
                tabIndex={0}
                className={`p-4 border-b border-border-default/50 cursor-pointer transition-colors outline-none focus-visible:bg-hover-bg relative group ${
                  isActive
                    ? 'bg-[#C9A84C]/5 border-l-2 border-gold'
                    : 'hover:bg-hover-bg border-l-2 border-l-transparent'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className={`font-medium text-[14px] leading-tight line-clamp-2 pr-4 transition-colors ${
                    isActive ? 'text-text-primary' : 'text-text-secondary group-hover:text-text-primary'
                  }`}>
                    {doc.title}
                  </h3>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(doc.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 focus:opacity-100 rounded p-1 text-text-muted hover:text-error transition-all"
                  >
                    <Trash2 size={14} strokeWidth={1.5} />
                  </button>
                </div>
                
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-0.5 rounded-[4px] bg-[#1A1A1D] border border-border-default text-text-secondary text-[11px] font-medium">
                    {category}
                  </span>
                  <span className={`px-2 py-0.5 rounded-[4px] text-[11px] font-medium ${
                    isDraftStatus
                      ? 'bg-warning-amber/10 border border-warning-amber/20 text-[#E8C96A]'
                      : 'bg-success-sage/10 border border-success-sage/20 text-[#7B9E87]'
                  }`}>
                    {statusLabel}
                  </span>
                </div>
                <p className="text-[11px] text-text-muted font-normal">Updated {formatDate(doc.updatedAt)}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Right: Document editor */}
      <div className="flex min-w-0 flex-1 flex-col bg-[#FAFAF8] text-[#1A1A1A] relative h-full overflow-hidden">
        {activeDoc ? (
          <>
            {/* Editor header */}
            <header className="h-[72px] bg-[#0D0D0F] border-b border-border-default flex items-center justify-between px-8 shrink-0">
              <div className="flex items-center gap-4">
                <h1 className="text-[15px] font-semibold text-text-primary">
                  {activeDoc.title}
                </h1>
                <div className="flex items-center gap-1.5 bg-[#1A1A1D] px-2.5 py-1 rounded-full border border-border-default">
                  {saveStatus === 'saving' || isRevising ? (
                    <>
                      <Loader2 size={12} strokeWidth={1.5} className="animate-spin text-gold" />
                      <span className="text-[11px] text-text-secondary">Saving...</span>
                    </>
                  ) : (
                    <>
                      <div className="w-1.5 h-1.5 rounded-full bg-success-sage"></div>
                      <span className="text-[11px] text-text-secondary">Saved</span>
                    </>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleExport('word')}
                  disabled={exportingId === 'word'}
                  className="px-4 py-2 border border-border-default text-[#E8E0D0] rounded-[9px] text-[13px] hover:bg-hover-bg transition-colors font-medium disabled:opacity-50"
                >
                  {exportingId === 'word' ? 'Exporting...' : 'Export Word'}
                </button>
                <button
                  onClick={() => handleExport('pdf')}
                  disabled={exportingId === 'pdf'}
                  className="px-4 py-2 bg-gold text-bg-primary rounded-[9px] text-[13px] hover:bg-gold-hover transition-colors font-medium disabled:opacity-50"
                >
                  {exportingId === 'pdf' ? 'Exporting...' : 'Export PDF'}
                </button>
              </div>
            </header>

            {/* METADATA STRIP */}
            <div className="bg-[#0D0D0F] border-b border-border-default py-2.5 px-8 flex gap-3 shrink-0">
              {getDocumentTags(activeDoc).tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="font-mono text-[11px] text-text-secondary bg-[#111113] border border-border-default px-2 py-0.5 rounded-[4px]"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* DOCUMENT SURFACE & TOOLBAR */}
            <div className="flex-1 flex flex-col relative overflow-hidden bg-[#FAFAF8]">
              {/* Formatting Toolbar */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white border border-gray-200 shadow-[0_2px_8px_rgba(0,0,0,0.05)] rounded-lg px-2 py-1.5 flex items-center gap-1 z-10">
                <button className="p-1.5 rounded hover:bg-gray-100 text-gray-700 transition-colors" title="Bold">
                  <Bold size={15} strokeWidth={2.5} />
                </button>
                <button className="p-1.5 rounded hover:bg-gray-100 text-gray-700 transition-colors" title="Italic">
                  <Italic size={15} strokeWidth={2.5} />
                </button>
                <button className="p-1.5 rounded hover:bg-gray-100 text-gray-700 transition-colors" title="Underline">
                  <Underline size={15} strokeWidth={2.5} />
                </button>
                <div className="w-px h-4 bg-gray-300 mx-1"></div>
                <button className="p-1.5 rounded hover:bg-gray-100 text-gray-700 font-serif font-bold text-[13px] leading-none" title="Heading 1">
                  H1
                </button>
                <button className="p-1.5 rounded hover:bg-gray-100 text-gray-700 transition-colors" title="Bulleted List">
                  <List size={15} strokeWidth={2.5} />
                </button>
              </div>

              {/* Editor Content Area */}
              <div className="flex-1 overflow-y-auto w-full pt-20 pb-32">
                <div className="max-w-[580px] mx-auto px-6">
                  <textarea
                    value={activeDoc.content}
                    onChange={(e) => handleContentChange(e.target.value)}
                    className="w-full min-h-[700px] resize-none bg-transparent font-serif text-[14px] leading-[1.8] text-[#1A1A1A] outline-none placeholder:text-gray-400 animate-fadeIn"
                    spellCheck={false}
                    placeholder="Start typing your document..."
                  />
                </div>
              </div>
            </div>

            {/* BOTTOM AI BAR */}
            <div className="h-[80px] bg-[#0D0D0F] border-t border-border-default shrink-0 flex items-center px-8">
              <div className="w-full max-w-[800px] mx-auto flex items-center gap-3">
                <div className="flex-1 relative">
                  <Sparkles
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gold"
                  />
                  <input
                    value={revisionQuery}
                    onChange={(e) => setRevisionQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAIRevision();
                      }
                    }}
                    disabled={isRevising}
                    className="w-full bg-[#111113] border border-border-default rounded-lg py-3 pl-11 pr-4 text-text-primary text-[13px] placeholder:text-text-muted focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-all disabled:opacity-50"
                    placeholder="Ask AI to revise this document..."
                    type="text"
                  />
                </div>
                <button
                  onClick={handleAIRevision}
                  disabled={!revisionQuery.trim() || isRevising}
                  className="px-6 py-3 bg-gold text-[#0A0A0B] rounded-lg text-[13px] font-medium hover:bg-gold-hover active:scale-[0.98] transition-colors whitespace-nowrap disabled:opacity-40 animate-fadeIn"
                >
                  {isRevising ? 'Generating...' : 'Generate'}
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <FileText
                size={48}
                strokeWidth={1}
                className="mx-auto text-text-disabled"
              />
              <p className="mt-4 text-[14px] text-text-muted">
                Select a document or create a new one
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function DocumentsPage() {
  return (
    <Suspense fallback={<div className="h-full flex items-center justify-center text-text-muted text-[13px]">Loading...</div>}>
      <DocumentsContent />
    </Suspense>
  );
}
