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
  const { documents, activeDocumentId, saveStatus } = useAppSelector((s) => s.documents);
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
      return {
        category: 'NDA',
        tags: ['NDA', 'Indian Contract Act 1872', 'Delhi Jurisdiction', 'v2'],
      };
    }
    if (
      titleLower.includes('employment') ||
      titleLower.includes('services') ||
      titleLower.includes('contract')
    ) {
      return {
        category: 'Contract',
        tags: ['Employment', 'Companies Act 2013', 'New Delhi', 'v1'],
      };
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
      dispatch(
        updateDocumentContent({
          id: activeDocumentId,
          content: currentDoc.content + addedText,
        })
      );
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
      <div className="border-border-default bg-bg-secondary hidden w-[300px] flex-shrink-0 overflow-y-auto border-r md:block">
        <div className="p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-text-primary text-[14px] font-semibold">Documents</h2>
            <button
              onClick={() => setShowNewForm(!showNewForm)}
              className="border-border-default text-text-muted hover:border-gold-border hover:text-gold flex items-center gap-1 rounded-md border px-2 py-1 text-[11px] transition-colors"
            >
              <Plus size={14} strokeWidth={1.5} />
              New
            </button>
          </div>

          {/* New document form */}
          {showNewForm && (
            <div className="border-gold-border bg-bg-primary mt-3 rounded-xl border p-3">
              <textarea
                value={newDocDescription}
                onChange={(e) => setNewDocDescription(e.target.value)}
                placeholder="Describe the document you need..."
                rows={3}
                className="text-text-primary placeholder:text-text-disabled w-full resize-none rounded-lg bg-transparent text-[12px] outline-none"
              />
              <button
                onClick={handleNewDocument}
                disabled={!newDocDescription.trim() || isGenerating}
                className="bg-gold text-bg-primary mt-2 flex w-full items-center justify-center gap-1.5 rounded-lg px-3 py-1.5 text-[12px] font-medium disabled:opacity-40"
              >
                {isGenerating ? (
                  <>
                    <Loader2 size={14} strokeWidth={1.5} className="animate-spin" />
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
                className={`border-border-default/50 focus-visible:bg-hover-bg group relative cursor-pointer border-b p-4 transition-colors outline-none ${
                  isActive
                    ? 'border-gold border-l-2 bg-[#C9A84C]/5'
                    : 'hover:bg-hover-bg border-l-2 border-l-transparent'
                }`}
              >
                <div className="mb-2 flex items-start justify-between">
                  <h3
                    className={`line-clamp-2 pr-4 text-[14px] leading-tight font-medium transition-colors ${
                      isActive
                        ? 'text-text-primary'
                        : 'text-text-secondary group-hover:text-text-primary'
                    }`}
                  >
                    {doc.title}
                  </h3>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(doc.id);
                    }}
                    className="text-text-muted hover:text-error rounded p-1 opacity-0 transition-all group-hover:opacity-100 focus:opacity-100"
                  >
                    <Trash2 size={14} strokeWidth={1.5} />
                  </button>
                </div>

                <div className="mb-3 flex items-center gap-2">
                  <span className="border-border-default text-text-secondary rounded-[4px] border bg-[#1A1A1D] px-2 py-0.5 text-[11px] font-medium">
                    {category}
                  </span>
                  <span
                    className={`rounded-[4px] px-2 py-0.5 text-[11px] font-medium ${
                      isDraftStatus
                        ? 'bg-warning-amber/10 border-warning-amber/20 border text-[#E8C96A]'
                        : 'bg-success-sage/10 border-success-sage/20 border text-[#7B9E87]'
                    }`}
                  >
                    {statusLabel}
                  </span>
                </div>
                <p className="text-text-muted text-[11px] font-normal">
                  Updated {formatDate(doc.updatedAt)}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Right: Document editor */}
      <div className="relative flex h-full min-w-0 flex-1 flex-col overflow-hidden bg-[#FAFAF8] text-[#1A1A1A]">
        {activeDoc ? (
          <>
            {/* Editor header */}
            <header className="border-border-default flex h-[72px] shrink-0 items-center justify-between border-b bg-[#0D0D0F] px-8">
              <div className="flex items-center gap-4">
                <h1 className="text-text-primary text-[15px] font-semibold">{activeDoc.title}</h1>
                <div className="border-border-default flex items-center gap-1.5 rounded-full border bg-[#1A1A1D] px-2.5 py-1">
                  {saveStatus === 'saving' || isRevising ? (
                    <>
                      <Loader2 size={12} strokeWidth={1.5} className="text-gold animate-spin" />
                      <span className="text-text-secondary text-[11px]">Saving...</span>
                    </>
                  ) : (
                    <>
                      <div className="bg-success-sage h-1.5 w-1.5 rounded-full"></div>
                      <span className="text-text-secondary text-[11px]">Saved</span>
                    </>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleExport('word')}
                  disabled={exportingId === 'word'}
                  className="border-border-default hover:bg-hover-bg rounded-[9px] border px-4 py-2 text-[13px] font-medium text-[#E8E0D0] transition-colors disabled:opacity-50"
                >
                  {exportingId === 'word' ? 'Exporting...' : 'Export Word'}
                </button>
                <button
                  onClick={() => handleExport('pdf')}
                  disabled={exportingId === 'pdf'}
                  className="bg-gold text-bg-primary hover:bg-gold-hover rounded-[9px] px-4 py-2 text-[13px] font-medium transition-colors disabled:opacity-50"
                >
                  {exportingId === 'pdf' ? 'Exporting...' : 'Export PDF'}
                </button>
              </div>
            </header>

            {/* METADATA STRIP */}
            <div className="border-border-default flex shrink-0 gap-3 border-b bg-[#0D0D0F] px-8 py-2.5">
              {getDocumentTags(activeDoc).tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-text-secondary border-border-default rounded-[4px] border bg-[#111113] px-2 py-0.5 font-mono text-[11px]"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* DOCUMENT SURFACE & TOOLBAR */}
            <div className="relative flex flex-1 flex-col overflow-hidden bg-[#FAFAF8]">
              {/* Formatting Toolbar */}
              <div className="absolute top-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1 rounded-lg border border-gray-200 bg-white px-2 py-1.5 shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
                <button
                  className="rounded p-1.5 text-gray-700 transition-colors hover:bg-gray-100"
                  title="Bold"
                >
                  <Bold size={15} strokeWidth={2.5} />
                </button>
                <button
                  className="rounded p-1.5 text-gray-700 transition-colors hover:bg-gray-100"
                  title="Italic"
                >
                  <Italic size={15} strokeWidth={2.5} />
                </button>
                <button
                  className="rounded p-1.5 text-gray-700 transition-colors hover:bg-gray-100"
                  title="Underline"
                >
                  <Underline size={15} strokeWidth={2.5} />
                </button>
                <div className="mx-1 h-4 w-px bg-gray-300"></div>
                <button
                  className="rounded p-1.5 font-serif text-[13px] leading-none font-bold text-gray-700 hover:bg-gray-100"
                  title="Heading 1"
                >
                  H1
                </button>
                <button
                  className="rounded p-1.5 text-gray-700 transition-colors hover:bg-gray-100"
                  title="Bulleted List"
                >
                  <List size={15} strokeWidth={2.5} />
                </button>
              </div>

              {/* Editor Content Area */}
              <div className="w-full flex-1 overflow-y-auto pt-20 pb-32">
                <div className="mx-auto max-w-[580px] px-6">
                  <textarea
                    value={activeDoc.content}
                    onChange={(e) => handleContentChange(e.target.value)}
                    className="animate-fadeIn min-h-[700px] w-full resize-none bg-transparent font-serif text-[14px] leading-[1.8] text-[#1A1A1A] outline-none placeholder:text-gray-400"
                    spellCheck={false}
                    placeholder="Start typing your document..."
                  />
                </div>
              </div>
            </div>

            {/* BOTTOM AI BAR */}
            <div className="border-border-default flex h-[80px] shrink-0 items-center border-t bg-[#0D0D0F] px-8">
              <div className="mx-auto flex w-full max-w-[800px] items-center gap-3">
                <div className="relative flex-1">
                  <Sparkles
                    size={16}
                    className="text-gold absolute top-1/2 left-4 -translate-y-1/2"
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
                    className="border-border-default text-text-primary placeholder:text-text-muted focus:border-gold focus:ring-gold/30 w-full rounded-lg border bg-[#111113] py-3 pr-4 pl-11 text-[13px] transition-all focus:ring-1 focus:outline-none disabled:opacity-50"
                    placeholder="Ask AI to revise this document..."
                    type="text"
                  />
                </div>
                <button
                  onClick={handleAIRevision}
                  disabled={!revisionQuery.trim() || isRevising}
                  className="bg-gold hover:bg-gold-hover animate-fadeIn rounded-lg px-6 py-3 text-[13px] font-medium whitespace-nowrap text-[#0A0A0B] transition-colors active:scale-[0.98] disabled:opacity-40"
                >
                  {isRevising ? 'Generating...' : 'Generate'}
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <FileText size={48} strokeWidth={1} className="text-text-disabled mx-auto" />
              <p className="text-text-muted mt-4 text-[14px]">
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
    <Suspense
      fallback={
        <div className="text-text-muted flex h-full items-center justify-center text-[13px]">
          Loading...
        </div>
      }
    >
      <DocumentsContent />
    </Suspense>
  );
}
