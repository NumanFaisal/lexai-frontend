'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { FileText, Copy, Printer, CheckCircle, ShieldAlert } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '@/lib/axios';

export default function SharedDocumentPage() {
  const params = useParams();
  const token = params?.token as string;

  const [documentData, setDocumentData] = useState<{
    id: string;
    title: string;
    content: string;
    type?: string;
    createdAt?: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;

    async function fetchSharedDocument() {
      try {
        setIsLoading(true);
        const res = await api.get(`/documents/shared/${token}`);
        if (res.data?.success && res.data?.data) {
          setDocumentData(res.data.data);
        } else {
          setError('Document not found or link has expired.');
        }
      } catch (err: any) {
        console.error('Error fetching shared document:', err);
        const msg = err.response?.data?.message || 'This document is unavailable or the share link has expired.';
        setError(msg);
      } finally {
        setIsLoading(false);
      }
    }

    fetchSharedDocument();
  }, [token]);

  const handleCopy = () => {
    if (!documentData?.content) return;
    navigator.clipboard.writeText(documentData.content);
    toast.success('Document text copied to clipboard!');
  };

  const handlePrint = () => {
    window.print();
  };

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#0D0D0F] text-text-muted">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-gold border-t-transparent" />
          <p className="text-[13px] font-medium text-text-secondary">Loading shared document...</p>
        </div>
      </div>
    );
  }

  if (error || !documentData) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#0D0D0F] p-4 text-text-primary">
        <div className="w-full max-w-md rounded-2xl border border-border-default bg-bg-secondary p-6 text-center shadow-xl">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-error/10 text-error">
            <ShieldAlert size={24} />
          </div>
          <h2 className="font-serif text-[20px] font-semibold">Document Unavailable</h2>
          <p className="text-text-secondary mt-2 text-[13px] leading-relaxed">
            {error || 'The share link is invalid or has been disabled by the document owner.'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-text-primary">
      {/* Header Bar */}
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-[#1A1A1D] bg-[#0D0D0F]/90 px-6 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold/10 text-gold font-bold">
            ⚖️
          </div>
          <div>
            <h1 className="text-[14px] font-semibold text-text-primary">{documentData.title}</h1>
            <p className="text-[10px] text-text-muted">Public Shared Legal Document · LexAI Sovereign Intelligence</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 rounded-lg border border-[#2A2A2D] bg-[#1A1A1D] px-3 py-1.5 text-[12px] font-medium text-text-secondary transition-colors hover:bg-bg-tertiary hover:text-text-primary"
          >
            <Copy size={14} />
            Copy Text
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 rounded-lg bg-gold px-3.5 py-1.5 text-[12px] font-medium text-[#0A0A0B] transition-colors hover:bg-gold-hover"
          >
            <Printer size={14} />
            Print / Save
          </button>
        </div>
      </header>

      {/* Main Document Content */}
      <main className="mx-auto max-w-4xl px-4 py-8">
        <div className="rounded-2xl border border-[#2A2A2D] bg-[#111113] p-8 shadow-2xl">
          <div className="mb-6 flex items-center justify-between border-b border-[#2A2A2D] pb-4">
            <span className="rounded bg-gold/10 px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider text-gold">
              {documentData.type || 'LEGAL DRAFT'}
            </span>
            <span className="text-[11px] text-text-muted flex items-center gap-1">
              <CheckCircle size={13} className="text-success" /> Verified Shared Link
            </span>
          </div>

          <div
            className="prose-chat text-[14px] leading-[1.8] text-[#C8C3B8]"
            dangerouslySetInnerHTML={{
              __html: documentData.content
                .replace(/\r\n/g, '\n')
                .replace(/\n\n/g, '<br/><br/>')
                .replace(/^# (.+)/gm, '<h1 class="text-xl font-bold text-gold my-3">$1</h1>')
                .replace(/^## (.+)/gm, '<h2 class="text-lg font-bold text-gold my-2">$1</h2>'),
            }}
          />
        </div>
      </main>
    </div>
  );
}
