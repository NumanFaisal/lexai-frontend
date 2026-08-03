'use client';

import { useEffect, useCallback, useRef, useState, useMemo, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mic, RotateCcw, CreditCard, ChevronDown, ChevronUp, Check, Brain, Sparkles, Cpu, Paperclip, X, FileText, Briefcase, Trash2, Download } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '@/store';
import { toast } from 'react-hot-toast';
import {
  setActiveMode,
  addMessage,
  appendToMessage,
  updateMessage,
  setIsStreaming,
  setInputValue,
  clearChat,
  setMessages,
  setActiveConversation,
  setConversations,
  addConversation,
  updateConversationId,
  updateConversationTitle,
} from '@/store/slices/chatSlice';
import { incrementQueriesUsed } from '@/store/slices/authSlice';
import {
  MODE_DATA,
  MOCK_MESSAGES,
  MOCK_STREAMING_RESPONSE,
  MOCK_COMPLIANCE_RESPONSE,
  MOCK_CASE_RESPONSE,
} from '@/lib/mock-data';
import { listItemStagger } from '@/lib/animations';
import type { ChatMode, ChatMessage } from '@/lib/types';
import Link from 'next/link';
import ComplianceDashboard from '@/components/chat/ComplianceDashboard';
import CaseAnalysisDashboard from '@/components/chat/CaseAnalysisDashboard';
import GavelLoader from '@/components/ui/GavelLoader';
import api from '@/lib/axios';
import { VoiceInputModal } from '@/components/chat/VoiceInputModal';
import { CaseUploadDropdown } from '@/components/chat/CaseUploadDropdown';

const MODELS = [
  { id: 'gemini-2.0-flash', name: 'Gemini 2.0 Flash', short: 'Gemini 2.0', icon: Sparkles, color: 'text-info' },
  { id: 'gemini-1.5-pro', name: 'Gemini 1.5 Pro', short: 'Gemini 1.5', icon: Cpu, color: 'text-info' },
  { id: 'claude-3-5-sonnet', name: 'Claude 3.5 Sonnet', short: 'Claude 3.5', icon: Brain, color: 'text-gold' },
  { id: 'gpt-4o', name: 'GPT-4o', short: 'GPT-4o', icon: Cpu, color: 'text-success' },
];

//  Secondary Navigation Tabs 
function SecondaryNav({ activeMode }: { activeMode: ChatMode }) {
  const router = useRouter();

  const tabs: { value: ChatMode; label: string; href: string }[] = [
    { value: 'research', label: 'Research', href: '/chat' },
    { value: 'draft', label: 'Draft', href: '/draft' },
    { value: 'compliance', label: 'Compliance', href: '/compliance' },
    { value: 'case', label: 'Case Analysis', href: '/case' },
  ];

  return (
    <div className="sticky top-0 bg-bg-primary/95 backdrop-blur-sm z-30 px-6 py-4 border-b border-border-default">
      <div className={`mx-auto flex items-center gap-8 transition-all duration-300 ${activeMode === 'compliance' ? 'max-w-[1000px]' : 'max-w-[720px]'}`}>
        {tabs.map((tab) => {
          const isActive = activeMode === tab.value;
          return (
            <button
              key={tab.value}
              onClick={() => router.push(tab.href)}
              className={`text-[13px] font-medium transition-colors relative pb-1 ${isActive
                ? 'text-gold after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gold'
                : 'text-text-secondary hover:text-text-primary'
                }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

//  Citation Badge 
function CitationBadge({
  citation,
}: {
  citation: ChatMessage['citations'] extends (infer T)[] | undefined ? T : never;
}) {
  if (!citation) return null;

  const text = citation.text || citation.rawText || citation.caseName || citation.actName || 'Citation';
  const url = citation.url || citation.kanoonUrl;

  const content = (
    <>
      <span className={citation.verified ? 'text-success' : 'text-warning'}>
        {citation.verified ? '✓' : '⚠'}
      </span>
      {text}
      {url && (
        <span className="text-text-muted">↗</span>
      )}
    </>
  );

  const className = `inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 font-mono text-[11px] leading-[1.3] transition-colors ${citation.verified
    ? 'bg-[#C9A84C1A] border border-[#C9A84C4D] text-gold hover:bg-[#C9A84C2D]'
    : 'bg-[#BE7B7B1A] border border-[#BE7B7B66] text-error hover:bg-[#BE7B7B2D]'
    }`;

  if (url) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {content}
      </a>
    );
  }

  return (
    <span className={className}>
      {content}
    </span>
  );
}

const normalizeMode = (m: string): ChatMode => {
  if (!m) return 'research';
  const lower = m.toLowerCase().replace('-', '_');
  if (lower === 'case_analysis' || lower === 'case') return 'case';
  return lower as ChatMode;
};

//  Message Bubble 
function MessageBubble({
  message,
  onFillCompliance,
  onEditCompliance
}: {
  message: ChatMessage;
  onFillCompliance?: (data: { businessType: string; state: string; headcount: number; revenueBracket: string }) => void;
  onEditCompliance?: (content: string) => void;
}) {
  const normalized = normalizeMode(message.mode);
  const mode = MODE_DATA[normalized] || MODE_DATA.research;

  const [submitted, setSubmitted] = useState(false);
  const isInfoRequired = message.role === 'assistant' && message.content.includes('[INFO_REQUIRED]') && !submitted;
  const cleanContent = message.content.replace('[INFO_REQUIRED]', '').trim();

  // Local state for interactive compliance items
  const [items, setItems] = useState<any[]>((message as any).complianceItems || []);
  const [editingNotes, setEditingNotes] = useState<{ [itemId: string]: string }>({});
  const [showNotesForm, setShowNotesForm] = useState<{ [itemId: string]: boolean }>({});
  const [isChecklistExpanded, setIsChecklistExpanded] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const reportId = (message as any).reportId;

  // Sync state if message updates
  useEffect(() => {
    if ((message as any).complianceItems) {
      setItems((message as any).complianceItems);
    }
  }, [(message as any).complianceItems]);

  const toggleItem = async (itemId: string, currentStatus: boolean) => {
    if (!reportId) return;
    const newStatus = !currentStatus;

    // Optimistic update
    setItems(prev => prev.map(item => item.id === itemId ? { ...item, isCompleted: newStatus } : item));

    try {
      const response = await api.patch(`/compliance/${reportId}/items/${itemId}`, {
        isCompleted: newStatus
      });
      if (response.data && (response.data.status === 'success' || response.data.success)) {
        const updatedData = response.data.data;
        if (updatedData) {
          setItems(prev => prev.map(item => item.id === itemId ? { ...item, ...updatedData } : item));
        }
        toast.success(newStatus ? 'Marked as completed' : 'Marked as incomplete');
      } else {
        throw new Error('Update failed');
      }
    } catch (err) {
      console.error('Failed to update compliance item status:', err);
      toast.error('Failed to update status. Please try again.');
      // Rollback on error
      setItems((message as any).complianceItems || []);
    }
  };

  const saveNotes = async (itemId: string, currentStatus: boolean) => {
    if (!reportId) return;
    const notesValue = editingNotes[itemId] ?? '';

    // Optimistic update
    setItems(prev => prev.map(item => item.id === itemId ? { ...item, notes: notesValue } : item));
    setShowNotesForm(prev => ({ ...prev, [itemId]: false }));

    try {
      const response = await api.patch(`/compliance/${reportId}/items/${itemId}`, {
        isCompleted: currentStatus,
        notes: notesValue
      });
      if (response.data && (response.data.status === 'success' || response.data.success)) {
        const updatedData = response.data.data;
        if (updatedData) {
          setItems(prev => prev.map(item => item.id === itemId ? { ...item, ...updatedData } : item));
        }
        toast.success('Notes updated successfully');
      } else {
        throw new Error('Update failed');
      }
    } catch (err) {
      console.error('Failed to save compliance item notes:', err);
      toast.error('Failed to update notes.');
      // Rollback on error
      setItems((message as any).complianceItems || []);
    }
  };

  const handlePdfExport = async () => {
    if (isExporting || !reportId) return;
    setIsExporting(true);

    try {
      const res = await api.post(`/compliance/${reportId}/export/pdf`);
      if (res.data && (res.data.status === 'success' || res.data.success || res.status === 202)) {
        toast.loading(res.data.message || 'PDF generation started. It will be available shortly.', { id: `pdf-export-${reportId}` });

        let pollCount = 0;
        const interval = setInterval(async () => {
          pollCount++;
          if (pollCount > 30) { // Max 1 minute polling (30 * 2s)
            clearInterval(interval);
            setIsExporting(false);
            toast.error('PDF generation timed out. Please try again.', { id: `pdf-export-${reportId}` });
            return;
          }

          try {
            const reportRes = await api.get(`/compliance/${reportId}`);
            if (reportRes.data && (reportRes.data.status === 'success' || reportRes.data.success) && reportRes.data.data?.pdfUrl) {
              clearInterval(interval);
              setIsExporting(false);
              toast.success('PDF generated successfully! Starting download...', { id: `pdf-export-${reportId}` });

              const pdfUrl = reportRes.data.data.pdfUrl;
              const link = document.createElement('a');
              link.href = pdfUrl;
              link.setAttribute('download', `Compliance_Report_${reportId}.pdf`);
              link.setAttribute('target', '_blank');
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }
          } catch (pollErr) {
            console.error('Error polling compliance PDF url:', pollErr);
          }
        }, 2000); // Poll every 2 seconds
      } else {
        throw new Error('Export trigger failed');
      }
    } catch (err) {
      console.error('Failed to trigger PDF export:', err);
      setIsExporting(false);
      toast.error('Failed to start PDF export. Please try again.', { id: `pdf-export-${reportId}` });
    }
  };

  if (message.role === 'user') {
    const isComplianceMsg = message.content.startsWith('Compliance check:');
    return (
      <motion.div
        className="flex justify-end group"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
      >
        <div className="max-w-[88%] flex flex-col items-end gap-1">
          <div className="rounded-[14px_14px_4px_14px] border border-[#C9A84C44] bg-gradient-to-br from-[#C9A84C22] to-[#C9A84C11] px-3.5 py-2.5 text-[13px] leading-[1.6] text-text-primary">
            {message.content}
          </div>
          {isComplianceMsg && onEditCompliance && (
            <button
              onClick={() => onEditCompliance(message.content)}
              className="text-[10px] text-gold hover:text-gold-hover hover:underline opacity-0 group-hover:opacity-100 transition-opacity duration-150 mr-1 flex items-center gap-1 font-medium"
            >
              ⚙️ Update parameters
            </button>
          )}
        </div>
      </motion.div>
    );
  }

  if (
    message.role === 'assistant' &&
    message.mode === 'compliance' &&
    message.content.startsWith('## COMPLIANCE AUDIT')
  ) {
    return (
      <motion.div
        className="flex w-full justify-start"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        <ComplianceDashboard data={message as any} />
      </motion.div>
    );
  }

  if (
    message.role === 'assistant' &&
    message.mode === 'case' &&
    message.content.startsWith('## Legal Case Analysis')
  ) {
    return (
      <motion.div
        className="flex w-full justify-start"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        <CaseAnalysisDashboard />
      </motion.div>
    );
  }

  return (
    <motion.div
      className="flex justify-start"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      <div className="max-w-full space-y-2">
        {/* Mode badge */}
        <div className="flex items-center gap-2">
          <div
            className="flex h-6 w-6 items-center justify-center rounded-md border text-[12px]"
            style={{
              backgroundColor: `${mode.color}22`,
              borderColor: `${mode.color}70`,
            }}
          >
            {mode.icon}
          </div>
          <span className="font-mono text-[11px] tracking-[0.5px]" style={{ color: mode.color }}>
            LEXAI · {mode.label.toUpperCase()}
          </span>
        </div>

        {/* Response content */}
        <div className="rounded-[4px_14px_14px_14px] border border-border-default bg-[#141416] px-4 py-3.5 min-w-[280px]">
          {message.isStreaming && !message.content ? (
            <GavelLoader isThinking={true} />
          ) : (
            <div
              className={`prose-chat text-[13px] leading-[1.75] text-[#C8C3B8] ${message.isStreaming ? 'typing-cursor' : ''
                }`}
              dangerouslySetInnerHTML={{
                __html: formatMarkdown(cleanContent),
              }}
            />
          )}

          {/* Interactive Compliance Form in Bubble */}
          {isInfoRequired && onFillCompliance && !message.isStreaming && (
            <div className="mt-4 border-t border-border-default/20 pt-4 space-y-3.5">
              <p className="text-[12px] text-text-secondary font-medium">To proceed, please enter your business details:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
                <div className="flex flex-col gap-0.5">
                  <label className="text-[9px] font-mono tracking-wider text-text-muted uppercase">Business Type</label>
                  <input
                    type="text"
                    id={`bubble-bt-${message.id}`}
                    placeholder="e.g. SaaS, E-commerce, Services"
                    className="bg-transparent border-b border-border-default/60 rounded-none py-1 text-[12.5px] text-text-primary placeholder:text-text-disabled outline-none focus:border-gold transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-0.5">
                  <label className="text-[9px] font-mono tracking-wider text-text-muted uppercase">State / Region</label>
                  <input
                    type="text"
                    id={`bubble-state-${message.id}`}
                    placeholder="e.g. Jharkhand, Karnataka"
                    className="bg-transparent border-b border-border-default/60 rounded-none py-1 text-[12.5px] text-text-primary placeholder:text-text-disabled outline-none focus:border-gold transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-0.5">
                  <label className="text-[9px] font-mono tracking-wider text-text-muted uppercase">Headcount</label>
                  <input
                    type="number"
                    id={`bubble-hc-${message.id}`}
                    placeholder="e.g. 10"
                    className="bg-transparent border-b border-border-default/60 rounded-none py-1 text-[12.5px] text-text-primary placeholder:text-text-disabled outline-none focus:border-gold transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-0.5">
                  <label className="text-[9px] font-mono tracking-wider text-text-muted uppercase">Annual Revenue Bracket</label>
                  <select
                    id={`bubble-rev-${message.id}`}
                    className="bg-transparent border-b border-border-default/60 rounded-none py-1 text-[12.5px] text-text-primary outline-none focus:border-gold transition-colors appearance-none"
                    style={{ backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%23888' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E")`, backgroundPosition: 'right 0.1rem center', backgroundSize: '1.1rem', backgroundRepeat: 'no-repeat', paddingRight: '1.5rem' }}
                  >
                    <option value="" disabled selected className="bg-bg-secondary text-text-muted">Select bracket...</option>
                    <option value="&lt;20L" className="bg-bg-secondary text-text-primary">&lt;20L</option>
                    <option value="20L-1Cr" className="bg-bg-secondary text-text-primary">20L-1Cr</option>
                    <option value="1Cr-10Cr" className="bg-bg-secondary text-text-primary">1Cr-10Cr</option>
                    <option value="&gt;10Cr" className="bg-bg-secondary text-text-primary">&gt;10Cr</option>
                  </select>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  const btInput = document.getElementById(`bubble-bt-${message.id}`) as HTMLInputElement;
                  const stateInput = document.getElementById(`bubble-state-${message.id}`) as HTMLInputElement;
                  const hcInput = document.getElementById(`bubble-hc-${message.id}`) as HTMLInputElement;
                  const revInput = document.getElementById(`bubble-rev-${message.id}`) as HTMLSelectElement;
                  if (btInput && stateInput && btInput.value.trim() && stateInput.value.trim()) {
                    onFillCompliance({
                      businessType: btInput.value.trim(),
                      state: stateInput.value.trim(),
                      headcount: parseInt(hcInput?.value, 10) || 0,
                      revenueBracket: revInput?.value || 'Not specified'
                    });
                    setSubmitted(true);
                  } else {
                    toast.error('Please fill in all details.');
                  }
                }}
                className="w-full bg-gold/10 hover:bg-gold/20 text-gold border border-gold-border/20 transition-colors rounded-lg py-2 text-[12px] font-medium flex items-center justify-center gap-1.5 mt-2"
              >
                <Briefcase size={12} />
                Submit Compliance Details
              </button>
            </div>
          )}

          {/* Interactive Compliance Checklist Items */}
          {!message.isStreaming && items && items.length > 0 && (
            <div className="mt-4 border-t border-border-default/20 pt-4 space-y-3">
              <div
                onClick={() => setIsChecklistExpanded(!isChecklistExpanded)}
                className="flex items-center justify-between cursor-pointer group pb-1"
              >
                <h4 className="font-serif text-[14px] font-semibold text-text-primary flex items-center gap-1.5 font-serif select-none group-hover:text-gold transition-colors">
                  <Briefcase size={14} className="text-gold" />
                  Interactive Audit Checklist
                </h4>
                <div className="flex items-center gap-2.5 flex-shrink-0 text-text-muted group-hover:text-gold transition-colors">
                  {reportId && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePdfExport();
                        }}
                        disabled={isExporting}
                        className="p-1 rounded hover:bg-gold/10 transition-colors flex items-center gap-1 text-[11px] font-medium text-gold disabled:opacity-50"
                        title="Export and Download PDF Report"
                      >
                        <Download size={13} className={isExporting ? 'animate-bounce' : ''} />
                        {isExporting ? 'Exporting...' : 'Export PDF'}
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          const htmlString = `
                            <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
                            <head><meta charset='utf-8'/><title>LexAI Compliance Report</title></head>
                            <body style="font-family: Arial, sans-serif; padding: 20px;">
                              <h1 style="color: #c9a84c;">LexAI — Compliance Audit Report</h1>
                              <div>${formatMarkdown(message.content || '')}</div>
                              <hr/>
                              <p><em>⚖️ Generated by LexAI Sovereign Intelligence. Confidential Corporate Document.</em></p>
                            </body>
                            </html>
                          `;
                          const blob = new Blob(['\ufeff' + htmlString], { type: 'application/msword' });
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement('a');
                          a.href = url;
                          a.download = `LexAI_Compliance_Report_${Date.now()}.docx`;
                          document.body.appendChild(a);
                          a.click();
                          document.body.removeChild(a);
                          URL.revokeObjectURL(url);
                          toast.success('Downloaded DOCX Report!');
                        }}
                        className="p-1 rounded hover:bg-gold/10 transition-colors flex items-center gap-1 text-[11px] font-medium text-gold"
                        title="Export and Download DOCX Word Document"
                      >
                        <FileText size={13} />
                        Export DOCX
                      </button>
                    </>
                  )}
                  {isChecklistExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
              </div>

              {isChecklistExpanded && (
                <div className="space-y-2 animate-in fade-in slide-in-from-top-1 duration-200">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className={`p-3 rounded-lg border transition-all duration-150 ${item.isCompleted
                        ? 'bg-[#18181b]/40 border-success/15 opacity-70'
                        : 'bg-bg-secondary border-border-default hover:border-gold/30'
                        }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <input
                          type="checkbox"
                          checked={!!item.isCompleted}
                          onChange={() => toggleItem(item.id, !!item.isCompleted)}
                          className="mt-0.5 rounded border-border-default text-gold focus:ring-gold bg-bg-primary h-4 w-4 cursor-pointer"
                        />
                        <div className="flex-1 space-y-1">
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className={`text-[12.5px] font-medium transition-all duration-150 ${item.isCompleted ? 'line-through text-text-muted' : 'text-text-primary'}`}>
                              {item.title}
                            </span>
                            {item.priority === 'URGENT' && (
                              <span className="px-1.5 py-0.5 bg-[#BE7B7B1A] border border-[#BE7B7B44] text-[#BE7B7B] text-[8.5px] rounded font-bold uppercase tracking-wider font-sans">
                                URGENT
                              </span>
                            )}
                            {item.priority === 'THIS_QUARTER' && (
                              <span className="px-1.5 py-0.5 bg-[#E8C96A1A] border border-[#E8C96A44] text-[#E8C96A] text-[8.5px] rounded font-bold uppercase tracking-wider font-sans font-medium">
                                THIS QUARTER
                              </span>
                            )}
                          </div>

                          <div className="text-[11px] text-text-secondary space-y-0.5 pt-0.5 leading-relaxed">
                            <div><span className="text-text-muted">Law:</span> <span className="text-text-primary">{item.law}{item.section ? ` (Section ${item.section})` : ''}</span></div>
                            <div><span className="text-text-muted">Requirement:</span> <span className="text-text-primary">{item.requirement}</span></div>
                            {item.deadline && <div><span className="text-text-muted">Deadline:</span> <span className="text-text-primary">{item.deadline}</span></div>}
                            {item.penalty && <div><span className="text-text-muted">Penalty:</span> <span className="text-text-primary text-[#BE7B7B]">{item.penalty}</span></div>}
                            {item.action && <div><span className="text-text-muted">Action Required:</span> <span className="text-text-primary text-gold">{item.action}</span></div>}
                          </div>

                          {/* Notes badge / content */}
                          {item.notes && (
                            <div className="mt-1.5 bg-[#141416]/50 px-2 py-1 rounded text-[11px] text-[#C8C3B8]/90 italic border-l-2 border-gold/40">
                              Note: {item.notes}
                            </div>
                          )}

                          {/* Note forms edit */}
                          {showNotesForm[item.id] ? (
                            <div className="mt-2 flex items-center gap-2">
                              <input
                                type="text"
                                value={editingNotes[item.id] ?? item.notes ?? ''}
                                onChange={(e) => setEditingNotes(prev => ({ ...prev, [item.id]: e.target.value }))}
                                placeholder="Add a compliance note..."
                                className="flex-1 bg-[#141416] border border-border-default/60 rounded px-2 py-1 text-[11.5px] text-text-primary placeholder:text-text-disabled outline-none focus:border-gold"
                              />
                              <button
                                onClick={() => saveNotes(item.id, !!item.isCompleted)}
                                className="px-2.5 py-1 bg-gold text-bg-primary rounded text-[10px] font-semibold hover:bg-gold-hover transition-colors"
                              >
                                Save
                              </button>
                              <button
                                onClick={() => setShowNotesForm(prev => ({ ...prev, [item.id]: false }))}
                                className="px-2.5 py-1 bg-[#141416] border border-border-default/60 rounded text-[10px] text-text-muted hover:text-text-primary transition-colors"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => {
                                setShowNotesForm(prev => ({ ...prev, [item.id]: true }));
                                setEditingNotes(prev => ({ ...prev, [item.id]: item.notes ?? '' }));
                              }}
                              className="mt-1.5 text-[10px] text-gold hover:text-gold-hover hover:underline transition-colors flex items-center gap-1 font-medium"
                            >
                              📝 {item.notes ? 'Edit Note' : 'Add Note'}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Citations */}
          {message.citations && message.citations.length > 0 && (
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {message.citations.map((cite, index) => (
                cite ? <CitationBadge key={cite.id || `cite-${index}`} citation={cite} /> : null
              ))}
            </div>
          )}

          {/* Confidence */}
          {message.confidence && !message.isStreaming && (
            <div className="text-text-muted mt-2 flex items-center gap-1.5 text-[11px]">
              <span
                className="inline-block h-1.5 w-1.5 rounded-full"
                style={{
                  backgroundColor:
                    message.confidence === 'high'
                      ? '#7B9E87'
                      : message.confidence === 'medium'
                        ? '#E8C96A'
                        : '#BE7B7B',
                }}
              />
              {message.confidence.charAt(0).toUpperCase() + message.confidence.slice(1)} confidence
              · Citations verified
            </div>
          )}

          {/* Disclaimer */}
          {!message.isStreaming && (
            <div className="text-text-muted mt-3 border-t border-[#252528] pt-2.5 text-[11px] italic">
              ℹ️ Not legal advice. Consult a qualified advocate for your specific matter.
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// Empty State 
function EmptyState({ mode }: { mode: ChatMode }) {
  const data = MODE_DATA[mode];
  const dispatch = useAppDispatch();

  return (
    <div className="flex h-full flex-col items-center justify-center px-6 py-12">
      <div
        className="flex h-14 w-14 items-center justify-center rounded-2xl border text-[28px]"
        style={{
          backgroundColor: `${data.color}26`,
          borderColor: `${data.color}55`,
        }}
      >
        {data.icon}
      </div>
      <h2 className="text-text-primary mt-4 font-serif text-[22px] font-semibold">{data.label}</h2>
      <p className="text-text-secondary mt-2 max-w-[340px] text-center text-[13px] leading-relaxed">
        {data.description}
      </p>

      <div className="mt-6 flex flex-wrap justify-center gap-2">
        {data.quickPrompts.map((prompt) => (
          <button
            key={prompt}
            onClick={() => dispatch(setInputValue(prompt))}
            className="border-border-default bg-bg-secondary text-text-muted hover:text-gold rounded-full border px-3 py-1.5 text-[11px] transition-colors hover:border-[#C9A84C99]"
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
}

//  Paywall Card 
function PaywallCard() {
  return (
    <motion.div
      className="border-gold-border bg-bg-secondary mx-auto max-w-lg rounded-2xl border-2 p-6"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      <div className="flex items-center gap-3">
        <div className="bg-gold-subtle flex h-10 w-10 items-center justify-center rounded-xl">
          <CreditCard size={20} strokeWidth={1.5} className="text-gold" />
        </div>
        <div>
          <h3 className="text-text-primary text-[14px] font-semibold">Query limit reached</h3>
          <p className="text-text-secondary text-[12px]">
            You&apos;ve used all your free queries this month
          </p>
        </div>
      </div>
      <p className="text-text-secondary mt-3 text-[13px] leading-relaxed">
        Upgrade your plan to continue using LexAI with unlimited queries, contract drafting, voice
        input, and more.
      </p>
      <Link
        href="/pricing?from=limit"
        className="bg-gold text-bg-primary hover:bg-gold-hover mt-4 flex items-center justify-center gap-2 rounded-[10px] px-5 py-2.5 text-[13px] font-medium transition-colors"
      >
        Upgrade Plan
        <CreditCard size={14} strokeWidth={1.5} />
      </Link>
    </motion.div>
  );
}

//  Chat Content
function ChatContent({ mode }: { mode: ChatMode }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((s) => s.auth);
  const { messages, isStreaming, inputValue, conversations, activeConversationId } = useAppSelector(
    (s) => s.chat
  );

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [retryMessageId, setRetryMessageId] = useState<string | null>(null);
  const lastProcessedQueryRef = useRef<string | null>(null);

  const [selectedModel, setSelectedModel] = useState(mode === 'compliance' ? 'gpt-4o' : 'gemini-2.0-flash');
  const [modelDropdownOpen, setModelDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [uploadedFile, setUploadedFile] = useState<{ caseId: string; name: string } | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [isUploadDropdownOpen, setIsUploadDropdownOpen] = useState(false);
  const [selectedAcceptFilter, setSelectedAcceptFilter] = useState<string>('*');
  const uploadButtonRef = useRef<HTMLButtonElement>(null);

  const handleSelectVoiceTranscription = (transcript: string) => {
    dispatch(setInputValue(transcript));
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const [showComplianceForm, setShowComplianceForm] = useState(mode === 'compliance');
  const [complianceData, setComplianceData] = useState({
    businessType: '',
    state: '',
    headcount: 0,
    revenueBracket: '',
    hasUserData: false,
    isFood: false,
    isFintech: false,
  });
  const [complianceReports, setComplianceReports] = useState<any[]>([]);
  const [exportingReports, setExportingReports] = useState<{ [reportId: string]: boolean }>({});

  const handleRecentPdfExport = async (rId: string) => {
    if (exportingReports[rId]) return;
    setExportingReports(prev => ({ ...prev, [rId]: true }));

    try {
      const res = await api.post(`/compliance/${rId}/export/pdf`);
      if (res.data && res.data.status === 'success') {
        toast.loading('Generating PDF. Your download will start automatically once ready...', { id: `pdf-export-${rId}` });

        let pollCount = 0;
        const interval = setInterval(async () => {
          pollCount++;
          if (pollCount > 30) {
            clearInterval(interval);
            setExportingReports(prev => ({ ...prev, [rId]: false }));
            toast.error('PDF generation timed out. Please try again.', { id: `pdf-export-${rId}` });
            return;
          }

          try {
            const reportRes = await api.get(`/compliance/${rId}`);
            if (reportRes.data && reportRes.data.status === 'success' && reportRes.data.data?.pdfUrl) {
              clearInterval(interval);
              setExportingReports(prev => ({ ...prev, [rId]: false }));
              toast.success('PDF generated successfully! Starting download...', { id: `pdf-export-${rId}` });

              const pdfUrl = reportRes.data.data.pdfUrl;
              const link = document.createElement('a');
              link.href = pdfUrl;
              link.setAttribute('download', `Compliance_Report_${rId}.pdf`);
              link.setAttribute('target', '_blank');
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }
          } catch (pollErr) {
            console.error('Error polling compliance PDF url:', pollErr);
          }
        }, 2000);
      } else {
        throw new Error('Export trigger failed');
      }
    } catch (err) {
      console.error('Failed to trigger PDF export:', err);
      setExportingReports(prev => ({ ...prev, [rId]: false }));
      toast.error('Failed to start PDF export. Please try again.', { id: `pdf-export-${rId}` });
    }
  };

  // Sync compliance form visibility when mode changes
  useEffect(() => {
    setShowComplianceForm(mode === 'compliance');
    if (mode === 'compliance') {
      const fetchReports = async () => {
        try {
          const res = await api.get('/compliance');
          if (res.data && (res.data.success || res.data.status === 'success')) {
            setComplianceReports(res.data.data || []);
          }
        } catch (err: any) {
          if (err.response?.status === 404) {
            console.warn(`Compliance report ${urlReportId} not found.`);
            dispatch(clearChat());
            router.replace(pathname);
          } else {
            console.error('Failed to fetch compliance details:', err);
          }
        }
      };
      fetchReports();
    }
  }, [mode]);

  const processCaseFileUpload = async (file: File) => {
    if (!file) return;

    // Check size limit: max 15MB
    const maxSizeBytes = 15 * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      toast.error('File size exceeds the 15MB limit.');
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', file.name);

    try {
      const response = await api.post('/case-analysis/upload', formData);

      if (response.data.success && response.data.data) {
        const caseId = response.data.data.caseId;
        setUploadedFile({ caseId, name: file.name });
        toast.success(`Successfully uploaded ${file.name}`);
      } else {
        toast.error('Failed to upload case document.');
      }
    } catch (err) {
      console.error('File Upload Error:', err);
      toast.error('Error uploading case document. Please try again.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processCaseFileUpload(file);
    }
  };

  const handleSelectFormat = (acceptFilter: string) => {
    setSelectedAcceptFilter(acceptFilter);
    setTimeout(() => {
      if (fileInputRef.current) {
        fileInputRef.current.accept = acceptFilter;
        fileInputRef.current.click();
      }
    }, 50);
  };

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setModelDropdownOpen(false);
      }
    }
    if (modelDropdownOpen) {
      document.addEventListener('mousedown', handleClick);
      return () => document.removeEventListener('mousedown', handleClick);
    }
  }, [modelDropdownOpen]);

  // Sync page mode and load/clear conversation history based on active route
  useEffect(() => {
    dispatch(setActiveMode(mode));
    if (mode === 'compliance') {
      setSelectedModel('gpt-4o');
    } else {
      setSelectedModel('gemini-2.0-flash');
    }

    const urlReportId = searchParams.get('reportId');
    const urlConvId = searchParams.get('conversationId');

    if (urlReportId) {
      dispatch(setActiveConversation(urlReportId));
      const fetchComplianceDetails = async () => {
        try {
          const res = await api.get(`/compliance/${urlReportId}`);
          const data = res.data?.data || res.data;
          if (data) {
            const userMsg: ChatMessage = {
              id: `msg_${urlReportId}_user`,
              conversationId: data.id || urlReportId,
              role: 'user',
              content: `Compliance audit for ${data.businessType || 'business'} in ${data.state || 'India'}`,
              mode: 'compliance',
              createdAt: data.createdAt || new Date().toISOString(),
            };

            const assistantMsg: ChatMessage = {
              id: data.id || urlReportId,
              conversationId: data.id || urlReportId,
              role: 'assistant',
              content: data.response || data.summary || `## COMPLIANCE AUDIT FOR ${data.businessType || 'BUSINESS'}\n\nCompliance checklist compiled under Companies Act 2013 & GST rules.`,
              mode: 'compliance',
              createdAt: data.createdAt || new Date().toISOString(),
            } as any;

            (assistantMsg as any).reportId = data.id || urlReportId;
            (assistantMsg as any).complianceItems = data.items || [];

            dispatch(setMessages([userMsg, assistantMsg]));
          }
        } catch (err: any) {
          if (err?.response?.status === 404) {
            console.warn(`Compliance report ${urlReportId} no longer exists. Resetting URL.`);
            dispatch(clearChat());
            if (typeof window !== 'undefined') {
              const newUrl = new URL(window.location.href);
              newUrl.searchParams.delete('reportId');
              newUrl.searchParams.delete('conversationId');
              window.history.replaceState({}, '', newUrl.pathname + (newUrl.search || ''));
            }
          } else {
            console.error('Failed to load compliance report details:', err);
          }
        }
      };
      fetchComplianceDetails();
    } else if (urlConvId) {
      dispatch(setActiveConversation(urlConvId));

      if (urlConvId.startsWith('conv_')) {
        // Fallback to mock data if it's a mock conversation
        const msgs = MOCK_MESSAGES[urlConvId] || [];
        dispatch(setMessages(msgs));
      } else if (!urlConvId.startsWith('temp_')) {
        // Fetch actual conversation from backend API
        const fetchMessages = async () => {
          try {
            const response = await api.get(`/chat/conversations/${urlConvId}`);
            if (response.data.success && response.data.data) {
              const data = response.data.data;
              const mappedMsgs: ChatMessage[] = [];
              (data.queries || []).forEach((q: any, idx: number) => {
                // 1. User message
                mappedMsgs.push({
                  id: `msg_${urlConvId}_${idx}_user`,
                  conversationId: data.id,
                  role: 'user',
                  content: q.inputText || '',
                  mode: normalizeMode(data.mode || mode),
                  createdAt: q.createdAt || data.createdAt || new Date().toISOString(),
                });

                // 2. Assistant message
                mappedMsgs.push({
                  id: q.id || `msg_${urlConvId}_${idx}_assistant`,
                  conversationId: data.id,
                  role: 'assistant',
                  content: q.response || '',
                  mode: normalizeMode(data.mode || mode),
                  citations: (q.citationsVerified || q.citations || []).map((cite: any, citeIdx: number) => ({
                    id: cite.id || `cite_${q.id || idx}_${citeIdx}`,
                    text: cite.rawText || cite.text || '',
                    source: cite.actName || cite.caseName || 'Source',
                    url: cite.kanoonUrl || cite.url,
                    verified: !!cite.verified,
                    type: cite.type,
                    rawText: cite.rawText,
                    sectionNum: cite.sectionNum,
                    actName: cite.actName,
                    caseName: cite.caseName,
                    kanoonUrl: cite.kanoonUrl,
                  })),
                  confidence: (q.confidenceLevel || 'HIGH').toLowerCase() as any,
                  createdAt: q.createdAt || data.createdAt || new Date().toISOString(),
                  complianceItems: q.complianceItems,
                  reportId: q.reportId,
                } as any);
              });
              dispatch(setMessages(mappedMsgs));
            }
          } catch (error: any) {
            if (error?.response?.status === 404) {
              console.warn(`Conversation ${urlConvId} no longer exists. Resetting URL.`);
              dispatch(clearChat());
              if (typeof window !== 'undefined') {
                const newUrl = new URL(window.location.href);
                newUrl.searchParams.delete('conversationId');
                window.history.replaceState({}, '', newUrl.pathname + (newUrl.search || ''));
              }
            } else {
              console.error('Error fetching conversation messages:', error);
            }
          }
        };
        fetchMessages();
      }
    } else {
      // Never show previous chat by default when opening the chat screen
      dispatch(clearChat());
    }
  }, [mode, searchParams, dispatch]);

  // Auto-scroll on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Auto-resize textarea
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setInputValue(e.target.value));
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
  };

  const isAtLimit = useMemo(() => (user ? user.queriesUsed >= user.queriesLimit : false), [user]);

  // Send message with simulated streaming
  const sendMessage = useCallback(async (overrideContent?: string, overrideComplianceData?: any) => {
    const content = (overrideContent !== undefined ? overrideContent : inputValue).trim();
    if (!content && mode !== 'compliance') return;
    if (isStreaming) return;

    // Check limit
    if (isAtLimit) return;

    // Clear input
    dispatch(setInputValue(''));
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    const tempConvId = activeConversationId || `temp_${Date.now()}`;

    // For compliance mode, display exactly the structured parameters query
    const activeCompliance = overrideComplianceData || complianceData;
    const displayContent = mode === 'compliance'
      ? `Compliance check: ${activeCompliance.businessType || 'SaaS'}, ${activeCompliance.state || 'Jharkhand'}, ${activeCompliance.headcount || 0} employees`
      : content;

    // Create user message
    const userMsg: ChatMessage = {
      id: `msg_${Date.now()}`,
      conversationId: tempConvId,
      role: 'user',
      content: displayContent,
      mode: mode,
      createdAt: new Date().toISOString(),
    };

    dispatch(addMessage(userMsg));

    // If no active conversation, create a temporary one in store
    if (!activeConversationId) {
      const initialTitle = content.slice(0, 40) + (content.length > 40 ? '...' : '');
      dispatch(setActiveConversation(tempConvId));
      dispatch(
        addConversation({
          id: tempConvId,
          title: initialTitle,
          mode: mode,
          lastMessage: content,
          messageCount: 1,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        })
      );
      router.replace(`/${mode === 'research' ? 'chat' : mode}?conversationId=${tempConvId}`, {
        scroll: false,
      });

      // Asynchronously generate concise AI title using ultra-cheap Groq API
      api.post('/chat/generate-title', { prompt: content })
        .then((res) => {
          if (res.data?.success && res.data?.data?.title) {
            const aiTitle = res.data.data.title;
            dispatch(updateConversationTitle({ id: tempConvId, title: aiTitle }));
          }
        })
        .catch((err) => console.error('Groq title generation error:', err));
    }

    // Create empty assistant message for streaming
    const assistantMsgId = `msg_${Date.now() + 1}`;
    const assistantMsg: ChatMessage = {
      id: assistantMsgId,
      conversationId: tempConvId,
      role: 'assistant',
      content: '',
      mode: mode,
      isStreaming: true,
      createdAt: new Date().toISOString(),
    };

    dispatch(addMessage(assistantMsg));
    dispatch(setIsStreaming(true));

    try {
      let response;
      if (mode === 'case') {
        const payload: any = {
          message: content,
          model: selectedModel === 'gemini-2.0-flash' ? 'gpt-4o' : selectedModel,
          conversationId: activeConversationId && !activeConversationId.startsWith('temp_') && !activeConversationId.startsWith('conv_') ? activeConversationId : undefined,
        };
        if (uploadedFile) {
          payload.caseId = uploadedFile.caseId;
        }
        response = await api.post('/case-analysis/analyze', payload);
      } else if (mode === 'compliance') {
        response = await api.post('/chat/compliance', {
          message: displayContent,
          model: selectedModel,
          conversationId: activeConversationId && !activeConversationId.startsWith('temp_') && !activeConversationId.startsWith('conv_') ? activeConversationId : undefined,
          ...activeCompliance,
        });
      } else {
        response = await api.post('/chat/research', {
          message: content,
          model: selectedModel,
          conversationId: activeConversationId && !activeConversationId.startsWith('temp_') && !activeConversationId.startsWith('conv_') ? activeConversationId : undefined,
        });
      }

      const responseData = response.data;

      if (responseData.success && responseData.data) {
        let responseText = '';
        if (typeof responseData.data === 'string') {
          responseText = responseData.data;
        } else if (responseData.data) {
          responseText = responseData.data.response || responseData.data.analysis || responseData.data.answer || responseData.data.text || responseData.data.message || responseData.data.summary || responseData.data.error || 'No answer received from the AI model.';

          // Format compliance checklist if present (only if responseText is not already preformatted by backend response)
          if (!responseData.data.response && Array.isArray(responseData.data.items) && responseData.data.items.length > 0) {
            responseText = `### Compliance Audit Checklist\n\n`;
            responseText += `${responseData.data.summary || ''}\n\n`;
            responseData.data.items.forEach((item: any) => {
              responseText += `\n**[${item.priority || 'INFO'}] ${item.title || 'Obligation'}**\n`;
              responseText += `* **Law**: ${item.law || 'N/A'}${item.section ? ` (Section ${item.section})` : ''}\n`;
              responseText += `* **Requirement**: ${item.requirement || 'N/A'}\n`;
              if (item.deadline) responseText += `* **Deadline**: ${item.deadline}\n`;
              if (item.penalty) responseText += `* **Penalty**: ${item.penalty}\n`;
              if (item.action) responseText += `* **Action Required**: ${item.action}\n`;
            });
            if (responseData.data.disclaimer) {
              responseText += `\n\n_${responseData.data.disclaimer}_`;
            }
          }

          // Format applicable laws if present
          if (Array.isArray(responseData.data.applicableLaws) && responseData.data.applicableLaws.length > 0) {
            responseText += '\n\n### Applicable Laws\n' + responseData.data.applicableLaws.map((law: string) => `* ${law}`).join('\n');
          }
          // Format recommendations if present
          if (Array.isArray(responseData.data.recommendations) && responseData.data.recommendations.length > 0) {
            responseText += '\n\n### Recommendations\n' + responseData.data.recommendations.map((rec: string) => `* ${rec}`).join('\n');
          }
        }

        const backendConvId = responseData.data.conversationId || responseData.data.id;

        // Simulate streaming UX
        const words = responseText.split(' ');
        for (let i = 0; i < words.length; i++) {
          await new Promise((r) => setTimeout(r, 20 + Math.random() * 20));
          dispatch(
            appendToMessage({
              id: assistantMsgId,
              content: (i === 0 ? '' : ' ') + words[i],
            })
          );
        }

        dispatch(
          updateMessage({
            id: assistantMsgId,
            updates: {
              isStreaming: false,
              confidence: 'high',
              citations: (typeof responseData.data === 'object' ? responseData.data.citations : null) || [],
            },
          })
        );

        // If the backend returned a new conversation ID, map our local state and URL to it
        const currentActiveId = activeConversationId || tempConvId;
        if (backendConvId && backendConvId !== currentActiveId) {
          dispatch(updateConversationId({ oldId: currentActiveId, newId: backendConvId }));
          router.replace(`/${mode === 'research' ? 'chat' : mode}?conversationId=${backendConvId}`, {
            scroll: false,
          });
        }

        // Refresh the conversations list to ensure the sidebar shows the new/updated conversation
        const refreshConversations = async () => {
          try {
            const listRes = await api.get('/chat/conversations');
            if (listRes.data.success && listRes.data.data) {
              dispatch(setConversations(listRes.data.data));
            }
          } catch (e) {
            console.error('Failed to refresh conversations list:', e);
          }
        };
        refreshConversations();

      } else {
        throw new Error("Invalid API Response");
      }

    } catch (err: unknown) {
      console.error(err);
      const error = err as { response?: { status: number } };

      // Axios throws errors for 4xx status codes automatically
      if (error.response && error.response.status === 429) {
        dispatch(
          updateMessage({
            id: assistantMsgId,
            updates: {
              content: "**Rate limit exceeded.** You have reached your query limit for this plan. Please upgrade your plan or try again later.",
              isStreaming: false,
              confidence: "low",
            },
          })
        );
      } else {
        // Fallback for 500s or network failures
        setRetryMessageId(assistantMsgId);
        dispatch(
          updateMessage({
            id: assistantMsgId,
            updates: {
              content: "Something went wrong connecting to the AI. Please try again.",
              isStreaming: false,
            },
          }),
        );
      }
    } finally {
      dispatch(setIsStreaming(false));
      dispatch(incrementQueriesUsed());
      setUploadedFile(null); // Clear uploaded file attachment
      if (mode === 'compliance') {
        setComplianceData({
          businessType: '',
          state: '',
          headcount: 0,
          revenueBracket: '',
          hasUserData: false,
          isFood: false,
          isFintech: false,
        });
      }
    }
  }, [
    inputValue,
    isStreaming,
    isAtLimit,
    mode,
    activeConversationId,
    dispatch,
    router,
    selectedModel,
    updateConversationId,
    uploadedFile,
    complianceData,
  ]);

  useEffect(() => {
    const qParam = searchParams.get('q');

    if (qParam && qParam.trim() && qParam !== lastProcessedQueryRef.current && !isStreaming) {
      lastProcessedQueryRef.current = qParam;
      dispatch(setInputValue(qParam));
      sendMessage(qParam);
    }

  }, [searchParams, isStreaming, dispatch, sendMessage]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const canSend = inputValue.trim().length >= 2 && !isStreaming && !isAtLimit;

  return (
    <div className="flex h-full flex-col">
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 lg:px-0">
        <div
          className={`mx-auto space-y-5 transition-all duration-300 ${mode === 'compliance' || mode === 'case' ? 'max-w-[1000px]' : 'max-w-[720px]'}`}
        >
          {messages.length === 0 && !isStreaming ? (
            <div className="space-y-8">
              <EmptyState mode={mode} />
            </div>
          ) : (
            <>
              {messages.map((msg) => (
                <MessageBubble
                  key={msg.id}
                  message={msg}
                  onFillCompliance={(data) => {
                    setComplianceData(prev => {
                      const updated = { ...prev, ...data };
                      // Auto-trigger analysis with a slight delay
                      setTimeout(() => {
                        sendMessage(`Analyze compliance for ${updated.businessType} in ${updated.state}`);
                      }, 100);
                      return updated;
                    });
                  }}
                  onEditCompliance={(content) => {
                    const match = content.match(/Compliance check:\s*([^,]+),\s*([^,]+),\s*(\d+)\s+employees/);
                    if (match) {
                      setComplianceData(prev => ({
                        ...prev,
                        businessType: match[1].trim(),
                        state: match[2].trim(),
                        headcount: parseInt(match[3], 10) || 0
                      }));
                      setShowComplianceForm(true);
                      toast.success('Loaded parameters back into form. Adjust and re-submit.');
                    }
                  }}
                />
              ))}

              {/* Retry card */}
              {retryMessageId && (
                <div className="flex justify-start">
                  <div className="border-error/30 bg-error/5 text-text-secondary rounded-xl border px-4 py-3 text-[13px]">
                    Something went wrong.{' '}
                    <button
                      onClick={() => {
                        setRetryMessageId(null);
                        sendMessage();
                      }}
                      className="inline-flex items-center gap-1 text-gold hover:text-gold-hover"
                    >
                      <RotateCcw size={12} strokeWidth={1.5} />
                      Retry?
                    </button>
                  </div>
                </div>
              )}

              {/* Paywall card */}
              {isAtLimit && <PaywallCard />}
            </>
          )}
          <div ref={messagesEndRef} />
        </div>
        {/* Secondary nav tabs */}
      </div>

      {/* Input bar */}
      <div className="border-t border-border-default bg-bg-primary px-4 pb-4 pt-3 lg:px-6">
        <div className={`mx-auto transition-all duration-300 ${mode === 'compliance' || mode === 'case' ? 'max-w-[1000px]' : 'max-w-[720px]'}`}>

          {/* Uploaded File Pill Indicator */}
          {uploadedFile && (
            <div className="mb-2 flex items-center justify-between rounded-lg border border-gold-border/30 bg-gold-subtle/10 px-3 py-1.5 text-[12px] text-gold">
              <div className="flex items-center gap-2 truncate">
                <FileText size={13} strokeWidth={1.5} />
                <span className="truncate font-medium">{uploadedFile.name}</span>
              </div>
              <button
                type="button"
                onClick={() => setUploadedFile(null)}
                className="text-text-muted hover:text-error transition-colors"
                title="Remove attachment"
              >
                <X size={14} strokeWidth={2} />
              </button>
            </div>
          )}

          {/* Compliance Form */}
          <AnimatePresence>
            {mode === 'compliance' && showComplianceForm && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                className="overflow-hidden mb-3 border border-border-default rounded-[14px] bg-bg-tertiary p-4 text-[13px] text-text-primary"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-border-default pb-2">
                    <span className="font-medium text-gold flex items-center gap-1.5">
                      <Briefcase size={14} />
                      Structured Compliance Data
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowComplianceForm(false)}
                      className="text-text-secondary hover:text-text-primary text-[11px]"
                    >
                      Hide
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {/* Business Type */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-medium text-text-secondary">Business Type</label>
                      <input
                        type="text"
                        value={complianceData.businessType}
                        onChange={(e) => setComplianceData({ ...complianceData, businessType: e.target.value })}
                        placeholder="e.g. Fintech Startup, Cafe"
                        className="bg-bg-secondary border border-border-default rounded-lg px-2.5 py-1.5 text-[12px] text-text-primary placeholder:text-text-disabled outline-none focus:border-gold-border transition-colors"
                      />
                    </div>

                    {/* State */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-medium text-text-secondary">State / Region</label>
                      <input
                        type="text"
                        value={complianceData.state}
                        onChange={(e) => setComplianceData({ ...complianceData, state: e.target.value })}
                        placeholder="e.g. Karnataka"
                        className="bg-bg-secondary border border-border-default rounded-lg px-2.5 py-1.5 text-[12px] text-text-primary placeholder:text-text-disabled outline-none focus:border-gold-border transition-colors"
                      />
                    </div>

                    {/* Headcount */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-medium text-text-secondary">Headcount</label>
                      <input
                        type="number"
                        value={complianceData.headcount || ''}
                        onChange={(e) => setComplianceData({ ...complianceData, headcount: parseInt(e.target.value, 10) || 0 })}
                        placeholder="0"
                        className="bg-bg-secondary border border-border-default rounded-lg px-2.5 py-1.5 text-[12px] text-text-primary placeholder:text-text-disabled outline-none focus:border-gold-border transition-colors"
                      />
                    </div>

                    {/* Revenue Bracket */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-medium text-text-secondary">Annual Revenue Bracket</label>
                      <select
                        value={complianceData.revenueBracket}
                        onChange={(e) => setComplianceData({ ...complianceData, revenueBracket: e.target.value })}
                        className="bg-bg-secondary border border-border-default rounded-lg px-2.5 py-1.5 text-[12px] text-text-primary outline-none focus:border-gold-border transition-colors appearance-none"
                        style={{ backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%23888' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E")`, backgroundPosition: 'right 0.5rem center', backgroundSize: '1.25rem', backgroundRepeat: 'no-repeat', paddingRight: '2rem' }}
                      >
                        <option value="" disabled className="bg-bg-secondary text-text-muted">Select bracket...</option>
                        <option value="&lt;20L" className="bg-bg-secondary text-text-primary">&lt;20L</option>
                        <option value="20L-1Cr" className="bg-bg-secondary text-text-primary">20L-1Cr</option>
                        <option value="1Cr-10Cr" className="bg-bg-secondary text-text-primary">1Cr-10Cr</option>
                        <option value="&gt;10Cr" className="bg-bg-secondary text-text-primary">&gt;10Cr</option>
                      </select>
                    </div>
                  </div>

                  {/* Checkboxes */}
                  <div className="flex flex-wrap items-center gap-6 pt-1 border-t border-border-default/50">
                    <label className="flex items-center gap-2 cursor-pointer select-none text-[12px] text-text-secondary hover:text-text-primary transition-colors">
                      <input
                        type="checkbox"
                        checked={complianceData.hasUserData}
                        onChange={(e) => setComplianceData({ ...complianceData, hasUserData: e.target.checked })}
                        className="rounded border-border-default text-gold focus:ring-gold bg-bg-secondary h-4 w-4"
                      />
                      <span>Processes User Data</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer select-none text-[12px] text-text-secondary hover:text-text-primary transition-colors">
                      <input
                        type="checkbox"
                        checked={complianceData.isFood}
                        onChange={(e) => setComplianceData({ ...complianceData, isFood: e.target.checked })}
                        className="rounded border-border-default text-gold focus:ring-gold bg-bg-secondary h-4 w-4"
                      />
                      <span>Food Business</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer select-none text-[12px] text-text-secondary hover:text-text-primary transition-colors">
                      <input
                        type="checkbox"
                        checked={complianceData.isFintech}
                        onChange={(e) => setComplianceData({ ...complianceData, isFintech: e.target.checked })}
                        className="rounded border-border-default text-gold focus:ring-gold bg-bg-secondary h-4 w-4"
                      />
                      <span>Fintech Business</span>
                    </label>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div
            className={`bg-bg-secondary flex items-end gap-2.5 rounded-[14px] border px-3.5 py-2.5 transition-colors duration-200 ${inputValue.trim() ? 'border-gold-border' : 'border-border-default'
              }`}
          >
            {/* Model Selector Dropdown */}
            <div className="relative flex-shrink-0" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setModelDropdownOpen(!modelDropdownOpen)}
                className="flex h-[34px] items-center gap-1.5 rounded-[9px] bg-bg-tertiary px-2.5 text-[12px] font-medium text-text-secondary hover:text-text-primary border border-border-default hover:border-gold-border transition-all duration-200 flex-shrink-0"
                title="Select AI Model"
              >
                {(() => {
                  const currentModel = MODELS.find(m => m.id === selectedModel) || MODELS[0];
                  const Icon = currentModel.icon;
                  return (
                    <>
                      <Icon size={14} className={currentModel.color} />
                      <span className="hidden sm:inline">{currentModel.short}</span>
                    </>
                  );
                })()}
                <ChevronDown size={12} strokeWidth={1.5} className={`transition-transform duration-150 ${modelDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {modelDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    transition={{ duration: 0.15, ease: 'easeOut' }}
                    className="absolute left-0 bottom-full mb-2 w-56 rounded-xl border border-border-default bg-bg-secondary p-1 shadow-xl z-50"
                  >
                    <div className="px-2.5 py-1.5 text-[10px] font-semibold tracking-wider text-text-muted uppercase">
                      Select Model
                    </div>
                    {MODELS.map((model) => {
                      const Icon = model.icon;
                      const isSelected = selectedModel === model.id;
                      return (
                        <button
                          key={model.id}
                          type="button"
                          onClick={() => {
                            setSelectedModel(model.id);
                            setModelDropdownOpen(false);
                          }}
                          className={`flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left text-[12px] transition-colors ${isSelected
                            ? 'bg-gold-subtle text-gold'
                            : 'text-text-secondary hover:bg-bg-tertiary hover:text-text-primary'
                            }`}
                        >
                          <div className="flex items-center gap-2">
                            <Icon size={14} className={model.color} />
                            <span>{model.name}</span>
                          </div>
                          {isSelected && <Check size={14} className="text-gold" />}
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <textarea
              ref={textareaRef}
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder={
                isAtLimit
                  ? 'Query limit reached — upgrade to continue'
                  : mode === 'compliance'
                    ? 'Ask AI about these compliance requirements...'
                    : 'Ask about Indian law...'
              }
              disabled={isAtLimit}
              rows={1}
              className="text-text-primary placeholder:text-text-disabled flex-1 resize-none bg-transparent text-[13px] outline-none disabled:opacity-50"
              style={{ maxHeight: '120px' }}
            />

            {/* Voice button */}
            <button
              type="button"
              onClick={() => setIsVoiceModalOpen(true)}
              disabled={isAtLimit}
              className="bg-bg-tertiary text-info hover:bg-bg-elevated flex h-[34px] w-[34px] flex-shrink-0 items-center justify-center rounded-[9px] transition-colors disabled:opacity-50"
              title="Voice input & history"
            >
              <Mic size={16} strokeWidth={1.5} />
            </button>

            {/* Compliance Form Toggle Button */}
            {mode === 'compliance' && (
              <button
                type="button"
                onClick={() => setShowComplianceForm(!showComplianceForm)}
                className={`flex h-[34px] w-[34px] flex-shrink-0 items-center justify-center rounded-[9px] border transition-all duration-200 ${showComplianceForm
                  ? 'bg-gold-subtle text-gold border-gold-border'
                  : 'bg-bg-tertiary text-text-secondary hover:text-text-primary hover:bg-bg-elevated border-border-default'
                  }`}
                title="Toggle Compliance Data Form"
              >
                <Briefcase size={16} strokeWidth={1.5} />
              </button>
            )}

            {/* File Upload Button (Only for Case Analysis mode) */}
            {mode === 'case' && (
              <div className="relative">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept={selectedAcceptFilter}
                  className="hidden"
                />
                <CaseUploadDropdown
                  isOpen={isUploadDropdownOpen}
                  onClose={() => setIsUploadDropdownOpen(false)}
                  onSelectFormat={handleSelectFormat}
                  triggerRef={uploadButtonRef}
                  align="right"
                />
                <button
                  ref={uploadButtonRef}
                  type="button"
                  onClick={() => setIsUploadDropdownOpen(!isUploadDropdownOpen)}
                  disabled={isUploading || isAtLimit}
                  className={`flex h-[34px] w-[34px] flex-shrink-0 items-center justify-center rounded-[9px] bg-bg-tertiary transition-all duration-200 hover:bg-bg-elevated ${
                    isUploading ? 'text-gold animate-pulse' : 'text-text-secondary hover:text-text-primary'
                  }`}
                  title="Upload Case Document (Select PDF, DOCX, Image, Audio. Max 15MB)"
                >
                  <Paperclip size={16} strokeWidth={1.5} />
                </button>
              </div>
            )}

            {/* Send button */}
            <button
              onClick={() => sendMessage()}
              disabled={!canSend}
              className={`flex h-[34px] w-[34px] flex-shrink-0 items-center justify-center rounded-[9px] transition-all duration-200 ${canSend
                ? 'from-gold to-gold/80 text-bg-primary bg-gradient-to-br'
                : 'bg-bg-tertiary text-text-disabled'
                }`}
            >
              <Send size={16} strokeWidth={1.5} />
            </button>
          </div>

          {/* Footer text */}
          <div className="text-text-disabled mt-2 flex items-center justify-between text-[10px]">
            <span>Powered by Claude · Indian Law Jurisdiction</span>
            <span>Enter to send · Shift+Enter for newline</span>
          </div>
        </div>
      </div>

      {/* Voice Input & Transcriptions Modal */}
      <VoiceInputModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
        onSelectTranscription={handleSelectVoiceTranscription}
      />
    </div>
  );
}

// Simple markdown formatter
function formatMarkdown(text: string): string {
  if (!text) return '';
  let html = text
    .replace(/\r\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\[URGENT\]/g, '<span class="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-[#BE7B7B1A] border border-[#BE7B7B66] text-[#BE7B7B] mr-1.5 font-sans">URGENT</span>')
    .replace(/\[THIS_QUARTER\]/g, '<span class="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-[#E8C96A1A] border border-[#E8C96A44] text-[#E8C96A] mr-1.5 font-sans font-medium">THIS QUARTER</span>')
    .replace(/^### (.+)/gm, '<h4 class="text-[13px] font-semibold text-gold mt-2.5 mb-1">$1</h4>')
    .replace(/^## (.+)/gm, '<h3 class="text-[14px] font-semibold text-gold mt-3 mb-1">$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-text-primary font-medium">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/^› (.+)$/gm, '<div class="flex gap-1.5 my-0.5"><span class="text-gold flex-shrink-0">›</span><span>$1</span></div>')
    .replace(/^\d+\. (.+)$/gm, '<div class="flex gap-2 my-0.5"><span class="text-text-muted flex-shrink-0">•</span><span>$1</span></div>')
    .replace(/^[-*] (.+)$/gm, '<div class="flex gap-2 my-0.5"><span class="text-text-muted flex-shrink-0">•</span><span>$1</span></div>')
    .replace(/\n\n/g, '<br/>')
    .replace(/\n/g, ' ');

  // Strip unnecessary <br/> tags immediately before/after block elements
  html = html
    .replace(/(<\/h[34]>)\s*<br\s*\/?>/gi, '$1')
    .replace(/<br\s*\/?>\s*(<h[34])/gi, '$1')
    .replace(/(<\/div>)\s*<br\s*\/?>/gi, '$1')
    .replace(/<br\s*\/?>\s*(<div)/gi, '$1');

  return html;
}

interface ChatInterfaceProps {
  mode: ChatMode;
}

export default function ChatInterface({ mode }: ChatInterfaceProps) {
  return (
    <Suspense
      fallback={
        <div className="text-text-muted flex h-full items-center justify-center text-[13px]">
          Loading...
        </div>
      }
    >
      <ChatContent mode={mode} />
    </Suspense>
  );
}
