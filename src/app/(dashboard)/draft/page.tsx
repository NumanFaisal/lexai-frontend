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
  FilePlus,
  Sidebar as SidebarIcon,
  HelpCircle,
  CloudUpload,
  ChevronDown,
  Pencil,
  MoreVertical,
  ArrowLeft,
  Cloud,
  Share2,
  Info,
  Lightbulb,
  Shield,
  ArrowRight,
  Link as LinkIcon,
  Copy,
  X,
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
import GavelLoader from '@/components/ui/GavelLoader';
import TiptapEditor from '@/components/editor/TiptapEditor';
import { parseTemplateToHTML } from '@/lib/editor/parseTemplate';
import api from '@/lib/axios';



function DraftContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const { documents, activeDocumentId, saveStatus } = useAppSelector((s) => s.documents);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const [exportingId, setExportingId] = useState<string | null>(null);
  const [revisionQuery, setRevisionQuery] = useState('');
  const [isRevising, setIsRevising] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<'my_docs' | 'templates'>('my_docs');
  const [dbTemplates, setDbTemplates] = useState<any[]>([]);
  const [shareLink, setShareLink] = useState<string | null>(null);

  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  // AI chat state: each message has a role, content, and optional type for styling
  const [chatMessages, setChatMessages] = useState<{
    role: 'user' | 'ai' | 'system';
    content: string;
    type?: 'info' | 'success' | 'question' | 'error';
  }[]>([
    {
      role: 'ai',
      content: 'Hi! I can answer questions about this document or make changes to it. Just tell me what you need.',
      type: 'info',
    },
  ]);
  // Track whether the AI is in a clarification loop (waiting for more context)
  const [pendingRevisionContext, setPendingRevisionContext] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTemplates() {
      try {
        const res = await api.get('/templates');
        if (res.data?.status === 'success') {
          setDbTemplates(res.data.data.templates);
        }
      } catch (err) {
        console.error('Error fetching templates:', err);
      }
    }
    fetchTemplates();
  }, []);

  const WELCOME_MESSAGE = {
    role: 'ai' as const,
    content: 'Hi! I can answer questions about this document or make changes to it. Just tell me what you need.',
    type: 'info' as const,
  };

  const fetchSuggestions = useCallback(async (docId: string, resetChat = false) => {
    if (!docId) return;
    if (resetChat) {
      setChatMessages([WELCOME_MESSAGE]);
      setPendingRevisionContext(null);
    }
    setIsLoadingSuggestions(true);
    try {
      const res = await api.get(`/drafts/${docId}/suggestions`);
      if (res.data?.success && res.data.data.suggestions) {
        setSuggestions(res.data.data.suggestions);
      }
    } catch (err) {
      console.error('Error fetching suggestions:', err);
    } finally {
      setIsLoadingSuggestions(false);
    }
  }, []);

  useEffect(() => {
    if (activeDocumentId) {
      fetchSuggestions(activeDocumentId, true);
    }
  }, [activeDocumentId, fetchSuggestions]);

  const getDocumentTags = (doc: DocType) => {
    const titleLower = doc.title.toLowerCase();
    if (titleLower.includes('nda') || titleLower.includes('disclosure')) {
      return { category: 'Contract', tags: ['NDA', 'Contract', 'Confidentiality'] };
    }
    if (titleLower.includes('employment')) {
      return { category: 'Contract', tags: ['Employment', 'HR', 'Contract'] };
    }
    if (titleLower.includes('rent') || titleLower.includes('lease')) {
      return { category: 'Contract', tags: ['Rent', 'Lease', 'Real Estate'] };
    }
    if (titleLower.includes('vakalatnama')) {
      return { category: 'Litigation', tags: ['Vakalatnama', 'Litigation'] };
    }
    if (titleLower.includes('sale deed')) {
      return { category: 'Property', tags: ['Sale Deed', 'Property', 'Conveyance'] };
    }
    if (titleLower.includes('power of attorney')) {
      return { category: 'Property', tags: ['Power of Attorney', 'POA', 'Property'] };
    }
    if (titleLower.includes('regular bail')) {
      return { category: 'Litigation', tags: ['Bail', 'Criminal', 'Litigation'] };
    }
    if (titleLower.includes('anticipatory bail')) {
      return { category: 'Litigation', tags: ['Bail', 'Anticipatory Bail', 'Criminal', 'Litigation'] };
    }
    return { category: 'Legal', tags: ['Legal', 'Draft', 'v1'] };
  };

  const getDocumentDetails = (doc: DocType) => {
    const titleLower = doc.title.toLowerCase();

    if (titleLower.includes('vakalatnama')) {
      return {
        type: 'Vakalatnama',
        parties: ['Client', 'Advocate'],
        govLaw: 'Advocates Act, 1961',
        jurisdiction: 'Respective Court',
        arbitration: 'N/A'
      };
    }
    if (titleLower.includes('employment')) {
      return {
        type: 'Employment Agreement',
        parties: ['Employer / Company', 'Employee'],
        govLaw: 'Companies Act / Labour Laws',
        jurisdiction: 'Applicable Courts',
        arbitration: 'Arbitration & Conciliation Act, 1996'
      };
    }
    if (titleLower.includes('rent') || titleLower.includes('lease')) {
      return {
        type: 'Rent / Lease Agreement',
        parties: ['Owner / Landlord', 'Tenant'],
        govLaw: 'Transfer of Property Act, 1882',
        jurisdiction: 'Local Courts',
        arbitration: 'N/A'
      };
    }
    if (titleLower.includes('sale deed')) {
      return {
        type: 'Sale Deed',
        parties: ['Vendor', 'Purchaser'],
        govLaw: 'Transfer of Property Act, 1882',
        jurisdiction: 'Local Courts',
        arbitration: 'N/A'
      };
    }
    if (titleLower.includes('power of attorney')) {
      return {
        type: 'Power of Attorney',
        parties: ['Principal', 'Attorney'],
        govLaw: 'Powers of Attorney Act, 1882',
        jurisdiction: 'Local Courts',
        arbitration: 'N/A'
      };
    }
    if (titleLower.includes('regular bail')) {
      return {
        type: 'Regular Bail',
        parties: ['Applicant / Accused', 'State (Respondent)'],
        govLaw: 'BNSS, 2023 (Sec 480)',
        jurisdiction: 'Sessions / District Court',
        arbitration: 'N/A'
      };
    }
    if (titleLower.includes('anticipatory bail')) {
      return {
        type: 'Anticipatory Bail',
        parties: ['Petitioner', 'State (Respondent)'],
        govLaw: 'BNSS, 2023 (Sec 482)',
        jurisdiction: 'High Court / Sessions Court',
        arbitration: 'N/A'
      };
    }
    
    // Default (NDA or unknown)
    return {
      type: 'Non-Disclosure Agreement',
      parties: ['Disclosing Party', 'Receiving Party'],
      govLaw: 'Indian Contract Act, 1872',
      jurisdiction: 'Applicable Courts',
      arbitration: 'Arbitration Act, 1996'
    };
  };

  // ─── HANDLERS ─────────────────────────────────────────────────────────────

  const handleSave = async () => {
    if (!activeDocumentId) return;
    const currentDoc = documents.find((d) => d.id === activeDocumentId);
    if (!currentDoc) return;
    
    dispatch(setSaveStatus('saving'));
    try {
      await api.put(`/documents/${activeDocumentId}`, { 
        title: currentDoc.title,
        content: currentDoc.content 
      });
      dispatch(setSaveStatus('saved'));
      toast.success('Document saved successfully');
      setTimeout(() => dispatch(setSaveStatus('idle')), 2000);
    } catch (err) {
      console.error('Failed to save document', err);
      dispatch(setSaveStatus('error'));
      toast.error('Failed to save document');
    }
  };

  const handleApplySuggestion = async (instruction: string) => {
    if (!activeDocumentId || !instruction.trim()) return;

    if (instruction === 'Review Jurisdiction') {
      toast('Please review the jurisdiction and party addresses in the document above.', { icon: '🔍' });
      return;
    }

    setIsRevising(true);
    dispatch(setSaveStatus('saving'));

    try {
      // Use /drafts AI revise endpoint for AI-powered editing
      const res = await api.post(`/drafts/${activeDocumentId}/revise`, { instruction });
      const data = res.data?.data;
      if (data?.status === 'REVISED' && data.draft) {
        dispatch(
          updateDocumentContent({
            id: activeDocumentId,
            content: data.draft.content,
          })
        );
        dispatch(setSaveStatus('saved'));
        toast.success('Suggestion applied successfully');
        setTimeout(() => dispatch(setSaveStatus('idle')), 2000);
      } else if (data?.status === 'NEEDS_CLARIFICATION') {
        toast(data.clarificationQuestion || 'AI needs more information.', { icon: '💬' });
      }
    } catch (err) {
      console.error('Failed to apply suggestion', err);
      dispatch(setSaveStatus('error'));
      toast.error('Failed to apply suggestion.');
    }

    setIsRevising(false);
  };

  // ─── EDIT INTENT KEYWORDS ─────────────────────────────────────────────────
  const REVISE_KEYWORDS = [
    'change', 'update', 'add', 'remove', 'delete', 'replace', 'modify',
    'insert', 'include', 'fix', 'correct', 'rewrite', 'edit', 'revise',
    'make it', 'set the', 'put', 'write', 'draft', 'create', 'append',
    'increase', 'decrease', 'reduce', 'extend', 'shorten', 'rename',
    'move', 'swap', 'convert', 'strengthen', 'weaken',
  ];

  const detectIntent = (text: string): 'revise' | 'ask' => {
    const lower = text.toLowerCase().trim();
    const isQuestion =
      lower.startsWith('what') || lower.startsWith('why') || lower.startsWith('how') ||
      lower.startsWith('when') || lower.startsWith('where') || lower.startsWith('who') ||
      lower.startsWith('is ') || lower.startsWith('are ') || lower.startsWith('does ') ||
      lower.startsWith('can ') || lower.startsWith('explain') || lower.startsWith('tell me') ||
      lower.startsWith('summarize') || lower.startsWith('list') || lower.endsWith('?');
    if (isQuestion) return 'ask';
    if (REVISE_KEYWORDS.some((kw) => lower.includes(kw))) return 'revise';
    return 'ask';
  };

  const handleAIMessage = async () => {
    const query = revisionQuery.trim();
    if (!activeDocumentId || !query) return;

    setIsRevising(true);
    setRevisionQuery('');
    setChatMessages((prev) => [...prev, { role: 'user', content: query }]);

    // Smart intent detection: route to /revise or /ask based on user's message
    const intent = pendingRevisionContext ? 'revise' : detectIntent(query);
    const instruction = pendingRevisionContext
      ? `Original request: ${pendingRevisionContext}\nUser provided the following details: ${query}\nPlease now make the change using this information.`
      : query;

    try {
      if (intent === 'revise') {
        // Use /drafts AI revise endpoint for document editing
        const res = await api.post(`/drafts/${activeDocumentId}/revise`, { instruction });
        const data = res.data?.data;

        if (data?.status === 'NEEDS_CLARIFICATION') {
          // Agent needs more info — store context and ask the user
          setPendingRevisionContext(instruction);
          setChatMessages((prev) => [
            ...prev,
            { role: 'ai', content: data.clarificationQuestion, type: 'question' },
          ]);
        } else if (data?.status === 'REVISED' && data.draft) {
          // Document was successfully revised — update the editor
          setPendingRevisionContext(null);
          dispatch(
            updateDocumentContent({
              id: activeDocumentId,
              content: data.draft.content,
            })
          );
          dispatch(setSaveStatus('saved'));
          setTimeout(() => dispatch(setSaveStatus('idle')), 2000);
          setChatMessages((prev) => [
            ...prev,
            {
              role: 'ai',
              content: `✓ Done — ${data.summaryOfChanges || 'Document updated successfully.'}`,
              type: 'success',
            },
          ]);
          // Refresh suggestions after edit
          fetchSuggestions(activeDocumentId, false);
        }
      } else {
        // Q&A — answer the question, don't touch the document
        setPendingRevisionContext(null);
        const res = await api.post(`/drafts/${activeDocumentId}/ask`, { question: query });
        if (res.data?.success && res.data.data?.answer) {
          setChatMessages((prev) => [
            ...prev,
            { role: 'ai', content: res.data.data.answer, type: 'info' },
          ]);
        }
      }
    } catch (err) {
      console.error('AI message failed', err);
      setPendingRevisionContext(null);
      setChatMessages((prev) => [
        ...prev,
        { role: 'ai', content: 'Something went wrong. Please try again.', type: 'error' },
      ]);
    }

    setIsRevising(false);
  };

  // Initialize documents from backend
  useEffect(() => {
    async function fetchDocuments() {
      try {
        const res = await api.get('/documents');
        if (res.data?.success && Array.isArray(res.data.data)) {
          const fetchedDocs = res.data.data.map((d: any) => ({
            id: d.id,
            title: d.title,
            description: '',
            content: d.content || '',
            status: d.status === 'FINALIZED' ? 'final' : 'draft',
            mode: 'draft',
            createdAt: d.createdAt,
            updatedAt: d.updatedAt,
          }));
          dispatch(setDocuments(fetchedDocs));
        }
      } catch (err) {
        console.error('Failed to fetch documents', err);
      }
    }
    fetchDocuments();
  }, [dispatch]);

  // Handle URL deep-link & default document select
  useEffect(() => {
    const docId = searchParams.get('doc');
    const sortedDocs = [...documents].sort(
      (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
    if (docId && sortedDocs.some((d) => d.id === docId)) {
      dispatch(setActiveDocument(docId));
    } else if (!activeDocumentId && sortedDocs.length > 0) {
      dispatch(setActiveDocument(sortedDocs[0].id));
    }
  }, [searchParams, documents, activeDocumentId, dispatch]);

  const activeDoc = documents.find((d) => d.id === activeDocumentId);

  const handleContentChange = useCallback(
    (content: string) => {
      if (!activeDocumentId) return;
      dispatch(updateDocumentContent({ id: activeDocumentId, content }));
      dispatch(setSaveStatus('saving'));

      clearTimeout(saveTimerRef.current);
      saveTimerRef.current = setTimeout(async () => {
        try {
          await api.put(`/documents/${activeDocumentId}`, { content });
          dispatch(setSaveStatus('saved'));
          // Refresh AI suggestions after autosave
          fetchSuggestions(activeDocumentId, false);
          setTimeout(() => dispatch(setSaveStatus('idle')), 2000);
        } catch (err) {
          console.error('Failed to save document', err);
          dispatch(setSaveStatus('error'));
        }
      }, 1500);
    },
    [activeDocumentId, dispatch, fetchSuggestions]
  );

  const selectDocument = (id: string) => {
    dispatch(setActiveDocument(id));
    router.replace(`/draft?doc=${id}`, { scroll: false });
  };

  const handleNewDocument = async () => {
    try {
      const res = await api.post('/documents', {
        title: 'Untitled Document',
        type: 'DRAFT',
        content: 'Draft content...',
      });
      if (res.data?.success && res.data.data) {
        const d = res.data.data;
        const newDoc: DocType = {
          id: d.id,
          title: d.title,
          description: '',
          content: d.content || '',
          status: 'draft',
          mode: 'draft',
          createdAt: d.createdAt || new Date().toISOString(),
          updatedAt: d.updatedAt || new Date().toISOString(),
        };
        dispatch(addDocument(newDoc));
        dispatch(setActiveDocument(newDoc.id));
        toast.success('Created new document');
      }
    } catch (err) {
      console.error('Failed to create new document', err);
      toast.error('Failed to create document');
    }
  };

  const handleExport = async (format: 'pdf' | 'word') => {
    if (!activeDocumentId) return;
    setExportingId(format);
    try {
      const endpoint = format === 'pdf' ? `/documents/${activeDocumentId}/export/pdf` : `/documents/${activeDocumentId}/export/docx`;
      const res = await api.post(endpoint);
      if (res.data?.success && res.data?.downloadUrl) {
        window.open(res.data.downloadUrl, '_blank');
        toast.success(`Exported ${format.toUpperCase()} successfully!`);
      } else {
        toast.error(`Failed to export ${format.toUpperCase()}`);
      }
    } catch (err) {
      console.error(`Failed to export ${format}`, err);
      toast.error(`Failed to export ${format.toUpperCase()}`);
    } finally {
      setExportingId(null);
    }
  };

  const handleShare = async () => {
    if (!activeDocumentId) return;
    try {
      const res = await api.post(`/documents/${activeDocumentId}/share`);
      if (res.data?.success && res.data.shareUrl) {
        navigator.clipboard.writeText(res.data.shareUrl);
        setShareLink(res.data.shareUrl);
        toast.success('Share link generated & copied to clipboard!');
      }
    } catch (err) {
      console.error('Failed to generate share link', err);
      toast.error('Failed to generate share link');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/documents/${id}`);
      dispatch(deleteDocument(id));
      toast.success('Document archived');
    } catch (err) {
      console.error('Failed to delete document', err);
      toast.error('Failed to archive document');
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const sortedDocuments = [...documents].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );

  return (
    <>
      <div className="flex h-full">
        {/* Left: Explorer Sidebar */}
        <div
          className={`flex flex-shrink-0 flex-col overflow-hidden border-r border-[#1A1A1D] bg-[#0D0D0F] transition-all duration-300 ease-in-out ${isSidebarOpen ? 'w-[280px] opacity-100' : 'w-0 border-none opacity-0'
            } md:flex`}
        >
          {/* Header */}
          <div className="flex shrink-0 items-center justify-between px-5 py-5">
            <span className="text-[15px] font-medium text-text-primary">Documents</span>
            <button
              onClick={handleNewDocument}
              className="flex items-center gap-1.5 rounded-md border border-[#2A2A2D] bg-[#1A1A1D] px-2.5 py-1 text-[11px] font-medium text-text-secondary transition-colors hover:bg-bg-tertiary hover:text-text-primary"
            >
              <Plus size={12} strokeWidth={2.5} />
              New
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-6 border-b border-[#1A1A1D] px-5">
            <button
              onClick={() => setActiveTab('my_docs')}
              className={`relative pb-3 text-[12px] font-medium transition-colors ${activeTab === 'my_docs' ? 'text-text-primary' : 'text-text-muted hover:text-text-secondary'
                }`}
            >
              My Documents
              {activeTab === 'my_docs' && (
                <motion.div
                  layoutId="explorer-tab"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold"
                />
              )}
            </button>
            <button
              onClick={() => setActiveTab('templates')}
              className={`relative pb-3 text-[12px] font-medium transition-colors ${activeTab === 'templates' ? 'text-text-primary' : 'text-text-muted hover:text-text-secondary'
                }`}
            >
              Templates
              {activeTab === 'templates' && (
                <motion.div
                  layoutId="explorer-tab"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold"
                />
              )}
            </button>
          </div>

          {/* List */}
          <div className="custom-scrollbar flex-1 overflow-y-auto">
            {activeTab === 'my_docs' && (
              <div className="flex flex-col">
                {sortedDocuments.map((doc) => {
                  const isActive = doc.id === activeDocumentId;
                  const tags = getDocumentTags(doc);

                  return (
                    <div
                      key={doc.id}
                      onClick={() => selectDocument(doc.id)}
                      className={`group relative flex cursor-pointer flex-col gap-2.5 border-b border-[#1A1A1D] p-5 transition-colors ${isActive
                          ? 'bg-[#C9A84C0A] border-t border-t-gold/20 border-b-gold/20 border-l-[3px] border-l-gold pl-[17px]'
                          : 'hover:bg-bg-tertiary border-l-[3px] border-l-transparent'
                        }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h3 className={`text-[13px] font-medium leading-tight ${isActive ? 'text-gold' : 'text-text-primary'}`}>
                          {doc.title}
                        </h3>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(doc.id);
                          }}
                          className="text-text-muted opacity-0 transition-opacity hover:text-red-500 group-hover:opacity-100"
                          title="Delete Draft"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 mt-0.5">
                        <span className="rounded bg-[#1A1A1D] border border-[#2A2A2D] px-2 py-0.5 text-[9px] tracking-wide font-medium text-text-muted uppercase">
                          {tags.category}
                        </span>
                        <span className={`rounded px-2 py-0.5 text-[9px] tracking-wide font-medium uppercase border ${doc.status === 'draft' ? 'bg-[#3E2D12] text-[#E6B86C] border-[#5E4522]' :
                            doc.status === 'final' ? 'bg-[#183424] text-[#7FD69A] border-[#254A34]' :
                              'bg-[#1A2638] text-[#84ADED] border-[#263750]'
                          }`}>
                          {doc.status}
                        </span>
                      </div>

                      <div className="text-[10px] text-text-muted mt-1 font-medium">
                        Created {formatDate(doc.createdAt)}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {activeTab === 'templates' && (
              <div className="flex flex-col">
                {dbTemplates.map((template) => (
                  <div
                    key={template.id}
                    onClick={async () => {
                      try {
                        const parsedContent = parseTemplateToHTML(template.bodyContent);
                        const res = await api.post('/drafts', {
                          templateId: template.id,
                          title: template.title,
                          content: parsedContent,
                        });
                        if (res.data?.success) {
                          const d = res.data.data.draft;
                          const newDoc: DocType = {
                            id: d.id,
                            title: d.title,
                            description: template.description || '',
                            content: d.content,
                            status: 'draft',
                            mode: 'draft',
                            createdAt: d.createdAt,
                            updatedAt: d.updatedAt,
                          };
                          dispatch(addDocument(newDoc));
                          dispatch(setActiveDocument(newDoc.id));
                          router.replace(`/draft?doc=${newDoc.id}`, { scroll: false });
                          setActiveTab('my_docs');
                        }
                      } catch (err) {
                        console.error('Failed to create draft from template', err);
                      }
                    }}
                    className="group relative flex cursor-pointer flex-col gap-2 border-b border-[#1A1A1D] border-l-[3px] border-l-transparent p-5 transition-colors hover:bg-bg-tertiary"
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 text-text-muted group-hover:text-gold transition-colors">
                        <FileText size={16} strokeWidth={2} />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <h3 className="text-[13px] font-medium text-text-primary group-hover:text-gold transition-colors">
                          {template.title}
                        </h3>
                        <p className="line-clamp-2 text-[11px] text-text-muted leading-relaxed">
                          {template.description || template.bodyContent.substring(0, 100)}...
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right: Draft editor */}
        <div className="relative flex h-full min-w-0 flex-1 flex-col overflow-hidden border-l border-[#1A1A1D] bg-[#0A0A0B]">
          {activeDoc ? (
            <>
              {/* Editor header */}
              <header className="flex h-[56px] shrink-0 items-center justify-between border-b border-[#1A1A1D] bg-[#0D0D0F] px-4">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="p-1.5 text-text-muted transition-colors hover:text-text-primary"
                  >
                    <ArrowLeft size={18} strokeWidth={1.5} />
                  </button>

                  <div className="flex items-center gap-3">
                    <span className="rounded bg-[#183424] px-2 py-0.5 text-[10px] font-medium tracking-wide uppercase text-[#7FD69A]">
                      {getDocumentTags(activeDoc).category}
                    </span>
                    <h1 className="text-[14px] font-medium text-text-primary">
                      {activeDoc.title}
                    </h1>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5 text-[12px] text-text-muted mr-2">
                    <Cloud size={14} strokeWidth={1.5} />
                    {saveStatus === 'saving' ? 'Saving...' : saveStatus === 'saved' ? 'Auto-saved just now' : 'Auto-saved'}
                  </div>

                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 rounded-md border border-[#2A2A2D] bg-[#1A1A1D] px-3 py-1.5 text-[12px] font-medium text-text-secondary transition-colors hover:bg-bg-tertiary hover:text-text-primary"
                  >
                    <CloudUpload size={14} strokeWidth={2} />
                    Save
                  </button>

                  <button 
                    onClick={handleShare}
                    className="flex items-center gap-2 rounded-md border border-[#2A2A2D] bg-[#1A1A1D] px-3 py-1.5 text-[12px] font-medium text-text-secondary transition-colors hover:bg-bg-tertiary hover:text-text-primary"
                  >
                    <Share2 size={14} strokeWidth={2} />
                    Share
                  </button>

                  <button
                    onClick={() => handleExport('word')}
                    disabled={exportingId === 'word'}
                    className="flex items-center gap-2 rounded-md border border-[#2A2A2D] bg-[#1A1A1D] px-3 py-1.5 text-[12px] font-medium text-text-secondary transition-colors hover:bg-bg-tertiary hover:text-text-primary disabled:opacity-50"
                  >
                    <FileText size={14} strokeWidth={2} />
                    {exportingId === 'word' ? 'Exporting...' : 'Download Word'}
                  </button>

                  <button
                    onClick={() => handleExport('pdf')}
                    disabled={exportingId === 'pdf'}
                    className="flex items-center gap-2 rounded-md bg-gold px-3 py-1.5 text-[12px] font-medium text-[#0a0a0b] shadow-sm transition-colors hover:bg-[#D4B254] disabled:opacity-50"
                  >
                    <FileText size={14} strokeWidth={2} />
                    {exportingId === 'pdf' ? 'Exporting...' : 'Download PDF'}
                  </button>
                </div>
              </header>

              <div className="flex flex-1 overflow-hidden">
                {/* DOCUMENT SURFACE & TOOLBAR */}
                <div 
                  className="relative flex flex-1 flex-col overflow-hidden bg-gray-100"
                  onClickCapture={() => {
                    if (isSidebarOpen) setIsSidebarOpen(false);
                  }}
                >
                  <TiptapEditor key={activeDoc.id} content={activeDoc.content} onChange={handleContentChange} />
                </div>

                {/* Right Sidebar */}
                <div className="w-[260px] flex-shrink-0 bg-[#0D0D0F] border-l border-[#1A1A1D] flex flex-col custom-scrollbar overflow-y-auto">
                  {/* Document Details */}
                  <div className="p-4 border-b border-[#1A1A1D]">
                    <div className="flex items-center gap-2 text-[13px] font-semibold text-text-primary mb-3">
                      <Info size={14} className="text-text-secondary" />
                      Document Details
                    </div>

                    <div className="flex flex-col gap-2.5 text-[11px]">
                      <div className="flex justify-between">
                        <span className="text-text-muted">Type:</span>
                        <span className="text-text-primary text-right font-medium">{getDocumentDetails(activeDoc).type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-muted">Parties:</span>
                        <span className="text-text-primary text-right font-medium flex flex-col">
                          <span>{getDocumentDetails(activeDoc).parties[0]}</span>
                          <span className="text-text-muted text-[10px] mt-0.5">{getDocumentDetails(activeDoc).parties[1]}</span>
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-muted">Gov. Law:</span>
                        <span className="text-text-primary text-right font-medium">{getDocumentDetails(activeDoc).govLaw}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-muted">Jurisdiction:</span>
                        <span className="text-text-primary text-right font-medium">{getDocumentDetails(activeDoc).jurisdiction}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-muted">Arbitration:</span>
                        <span className="text-text-primary text-right font-medium">{getDocumentDetails(activeDoc).arbitration}</span>
                      </div>
                      <div className="flex justify-between mt-1 pt-2 border-t border-[#1A1A1D]">
                        <span className="text-text-muted">Created:</span>
                        <span className="text-text-primary text-right font-medium">{formatDate(activeDoc.createdAt)}</span>
                      </div>
                    </div>
                  </div>

                  {/* AI Suggestions */}
                  <div className="p-4 flex-1 border-b border-[#1A1A1D]">
                    <div className="flex items-center gap-2 text-[13px] font-semibold text-text-primary mb-3">
                      <Lightbulb size={14} className="text-gold" />
                      AI Suggestions
                    </div>

                    <div className="flex flex-col gap-3">
                      {isLoadingSuggestions ? (
                        <div className="flex items-center justify-center p-4">
                          <Loader2 size={16} className="animate-spin text-text-muted" />
                        </div>
                      ) : suggestions.length === 0 ? (
                        <div className="text-text-muted text-[11px] text-center p-4">
                          No suggestions at this time.
                        </div>
                      ) : (
                        suggestions.map((suggestion) => (
                          <div 
                            key={suggestion.id}
                            className={`border rounded-lg p-3 border-l-[3px] ${
                              suggestion.type === 'improvement'
                                ? 'border-gold/30 bg-[#C9A84C08] border-l-gold'
                                : 'border-[#2A2A2D] bg-[#1A1A1D]/50 border-l-[#84ADED]'
                            }`}
                          >
                            <div className="flex gap-2.5">
                              {suggestion.type === 'improvement' ? (
                                <Lightbulb size={14} className="text-gold shrink-0 mt-0.5" />
                              ) : (
                                <Shield size={14} className="text-[#84ADED] shrink-0 mt-0.5" />
                              )}
                              <div className="flex flex-col gap-3">
                                <p className="text-[12px] text-text-secondary leading-snug">
                                  {suggestion.text}
                                </p>
                                <button
                                  onClick={() => handleApplySuggestion(suggestion.actionPrompt)}
                                  className={`text-[9px] font-bold tracking-wider text-left uppercase flex items-center gap-1 transition-colors ${
                                    suggestion.type === 'improvement'
                                      ? 'text-gold hover:text-[#E6B86C]'
                                      : 'text-text-muted hover:text-text-secondary'
                                  }`}
                                >
                                  {suggestion.actionPrompt === 'Review Jurisdiction' ? 'Review Jurisdiction' : 'Apply Clause'} <ArrowRight size={12} />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>


                  {/* AI Chat / Revise */}
                  <div className="p-4 mt-auto border-t border-[#1A1A1D] bg-[#0a0a0c] sticky bottom-0 flex flex-col gap-3">

                    {chatMessages.length > 0 && (
                      <div className="flex flex-col gap-2.5 max-h-[240px] overflow-y-auto custom-scrollbar">
                        {chatMessages.map((msg, i) => (
                          <div
                            key={i}
                            className={`p-2.5 rounded-lg text-[12px] leading-relaxed ${
                              msg.role === 'user'
                                ? 'bg-[#1A1A1D] self-end text-text-primary border border-[#2A2A2D] max-w-[90%]'
                                : msg.role === 'system'
                                ? 'text-text-muted text-center text-[11px] italic'
                                : msg.type === 'success'
                                ? 'bg-[#183424] text-[#7FD69A] border border-[#254A34] self-start max-w-[95%]'
                                : msg.type === 'question'
                                ? 'bg-[#1A2638] text-[#84ADED] border border-[#263750] self-start max-w-[95%]'
                                : msg.type === 'error'
                                ? 'bg-[#2D1414] text-red-400 border border-red-900/50 self-start max-w-[95%]'
                                : 'bg-gold/10 text-gold border border-gold/20 self-start max-w-[95%]'
                            }`}
                          >
                            {msg.content}
                          </div>
                        ))}
                      </div>
                    )}

                    {pendingRevisionContext && (
                      <div className="text-[10px] text-[#84ADED] px-1 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#84ADED] inline-block animate-pulse" />
                        Waiting for your answer to apply the change…
                      </div>
                    )}

                    <div className="flex items-center gap-2 bg-[#1A1A1D] border border-[#2A2A2D] rounded-lg p-1.5 focus-within:border-gold/50 transition-colors shadow-sm">
                      <div className="pl-2 pr-1 shrink-0">
                        <Sparkles size={14} className="text-gold" />
                      </div>
                      <input
                        type="text"
                        value={revisionQuery}
                        onChange={(e) => setRevisionQuery(e.target.value)}
                        placeholder={pendingRevisionContext ? 'Provide the missing details…' : 'Ask or tell AI what to change…'}
                        className="bg-transparent w-full min-w-0 text-[12px] text-text-primary outline-none focus:outline-none focus:ring-0 border-none placeholder:text-text-muted"
                        onKeyDown={(e) => e.key === 'Enter' && handleAIMessage()}
                      />
                      <button
                        onClick={handleAIMessage}
                        disabled={isRevising || !revisionQuery.trim()}
                        className="bg-gold text-[#0a0a0b] shrink-0 px-3 py-1.5 rounded text-[11px] font-bold tracking-wide transition-colors hover:bg-[#D4B254] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                      >
                        {isRevising ? (
                          <Loader2 size={12} className="animate-spin" />
                        ) : (
                          'Send'
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex h-full items-center justify-center flex-col animate-in fade-in zoom-in-95 duration-500">
              <div className="h-24 w-24 rounded-3xl bg-gold/5 border border-gold/10 flex items-center justify-center mb-6 shadow-2xl">
                <FilePlus size={40} strokeWidth={1.5} className="text-gold" />
              </div>
              <h3 className="text-xl font-medium text-text-primary mb-2">No Document Selected</h3>
              <p className="text-text-muted text-[14px] text-center max-w-[320px]">
                Create a new blank draft or select a premium legal template from the explorer to begin.
              </p>
              <button
                onClick={handleNewDocument}
                className="mt-8 flex items-center gap-2 rounded-xl bg-gold px-6 py-3 text-[14px] font-bold text-[#0a0a0b] transition-all hover:bg-gold-hover shadow-[0_0_20px_rgba(212,178,84,0.15)] hover:shadow-[0_0_25px_rgba(212,178,84,0.25)] hover:scale-[1.02]"
              >
                <Plus size={18} strokeWidth={2.5} />
                Create Blank Draft
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Premium Share Modal */}
      {shareLink && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-2xl border border-[#2A2A2D] bg-[#111113] p-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/10 text-gold">
                  <Share2 size={20} strokeWidth={2} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-text-primary">Share Document</h3>
                  <p className="text-sm text-text-muted">Anyone with this link can view the document</p>
                </div>
              </div>
              <button 
                onClick={() => setShareLink(null)}
                className="rounded-full p-2 text-text-muted hover:bg-[#1A1A1D] hover:text-text-primary transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="flex items-center gap-2 rounded-xl border border-[#2A2A2D] bg-[#0A0A0B] p-2">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#1A1A1D] text-text-secondary">
                <LinkIcon size={18} strokeWidth={2} />
              </div>
              <input 
                type="text" 
                readOnly 
                value={shareLink} 
                className="w-full bg-transparent px-2 text-sm text-text-primary outline-none"
                onClick={(e) => e.currentTarget.select()}
              />
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(shareLink);
                  toast.success('Copied to clipboard');
                }}
                className="flex shrink-0 items-center gap-2 rounded-lg bg-gold px-4 py-2.5 text-sm font-medium text-[#0A0A0B] transition-colors hover:bg-gold-hover"
              >
                <Copy size={16} strokeWidth={2} />
                Copy
              </button>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button 
                onClick={() => setShareLink(null)}
                className="rounded-lg px-6 py-2.5 text-sm font-medium text-text-secondary hover:bg-[#1A1A1D] hover:text-text-primary transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default function DraftPage() {
  return (
    <Suspense
      fallback={
        <div className="text-text-muted flex h-full items-center justify-center text-[13px]">
          Loading...
        </div>
      }
    >
      <DraftContent />
    </Suspense>
  );
}
