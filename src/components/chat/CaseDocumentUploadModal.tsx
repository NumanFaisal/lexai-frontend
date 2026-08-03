'use client';

import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, FileCode, Image as ImageIcon, Mic, X, UploadCloud, ShieldAlert, ArrowRight, Check } from 'lucide-react';

interface CaseDocumentUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFileSelect: (file: File) => void;
  isUploading?: boolean;
}

interface FormatOption {
  id: 'pdf' | 'docx' | 'image' | 'audio';
  title: string;
  subtitle: string;
  accept: string;
  extensions: string;
  icon: React.ElementType;
  badgeColor: string;
  iconBg: string;
  hoverBorder: string;
}

const FORMAT_OPTIONS: FormatOption[] = [
  {
    id: 'pdf',
    title: 'PDF Document',
    subtitle: 'Court petitions, judgments, legal notices, or agreements',
    accept: 'application/pdf,.pdf',
    extensions: '.PDF',
    icon: FileText,
    badgeColor: 'bg-red-500/10 text-red-400 border-red-500/20',
    iconBg: 'bg-red-500/10 text-red-400 border-red-500/20',
    hoverBorder: 'hover:border-red-500/40 hover:bg-red-500/5',
  },
  {
    id: 'docx',
    title: 'Word Document',
    subtitle: 'Editable legal briefs, contract drafts, or affidavits',
    accept: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/msword,.docx,.doc',
    extensions: '.DOCX, .DOC',
    icon: FileCode,
    badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    iconBg: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    hoverBorder: 'hover:border-blue-500/40 hover:bg-blue-500/5',
  },
  {
    id: 'image',
    title: 'Image / Scan',
    subtitle: 'Scanned evidence pages, legal notices, or photo documents',
    accept: 'image/*,.png,.jpg,.jpeg,.webp',
    extensions: '.PNG, .JPG, .WEBP',
    icon: ImageIcon,
    badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    iconBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    hoverBorder: 'hover:border-emerald-500/40 hover:bg-emerald-500/5',
  },
  {
    id: 'audio',
    title: 'Audio File',
    subtitle: 'Recorded client statements, court audio, or voice notes',
    accept: 'audio/*,.mp3,.wav,.m4a,.webm,.ogg',
    extensions: '.MP3, .WAV, .M4A, .WEBM',
    icon: Mic,
    badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    iconBg: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    hoverBorder: 'hover:border-purple-500/40 hover:bg-purple-500/5',
  },
];

export const CaseDocumentUploadModal: React.FC<CaseDocumentUploadModalProps> = ({
  isOpen,
  onClose,
  onFileSelect,
  isUploading = false,
}) => {
  const [selectedAccept, setSelectedAccept] = useState<string>('*');
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleOptionClick = (acceptFilter: string) => {
    setSelectedAccept(acceptFilter);
    setTimeout(() => {
      if (fileInputRef.current) {
        fileInputRef.current.accept = acceptFilter;
        fileInputRef.current.click();
      }
    }, 50);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
      onClose();
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      onFileSelect(file);
      onClose();
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-in fade-in duration-200">
        {/* Hidden File Input */}
        <input
          type="file"
          ref={fileInputRef}
          accept={selectedAccept}
          onChange={handleInputChange}
          className="hidden"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="relative w-full max-w-2xl rounded-2xl border border-border-default bg-bg-secondary shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border-default px-6 py-4 bg-bg-tertiary/60">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/10 text-gold border border-gold/20">
                <UploadCloud size={22} />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-text-primary flex items-center gap-2">
                  Upload Case Document
                  <span className="rounded-full bg-gold/10 text-gold px-2.5 py-0.5 text-[11px] font-medium border border-gold/20">
                    Max 15MB
                  </span>
                </h2>
                <p className="text-xs text-text-muted">
                  Select your document type to begin AI-powered Case Analysis
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-text-muted hover:bg-bg-tertiary hover:text-text-primary transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 space-y-6 overflow-y-auto">
            {/* Format Selection Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {FORMAT_OPTIONS.map((option) => {
                const Icon = option.icon;
                return (
                  <button
                    key={option.id}
                    type="button"
                    disabled={isUploading}
                    onClick={() => handleOptionClick(option.accept)}
                    className={`group relative flex flex-col justify-between text-left p-4 rounded-xl border border-border-default bg-bg-tertiary/40 transition-all duration-200 cursor-pointer ${option.hoverBorder} hover:shadow-lg disabled:opacity-50`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-xl border ${option.iconBg}`}>
                        <Icon size={20} />
                      </div>
                      <span className={`text-[10px] font-semibold tracking-wider px-2 py-0.5 rounded-full border ${option.badgeColor}`}>
                        {option.extensions}
                      </span>
                    </div>

                    <div className="space-y-1 mb-4">
                      <h3 className="text-sm font-semibold text-text-primary group-hover:text-gold transition-colors flex items-center gap-1.5">
                        {option.title}
                        <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-gold" />
                      </h3>
                      <p className="text-[12px] text-text-muted leading-relaxed">
                        {option.subtitle}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-text-secondary pt-2 border-t border-border-default/40">
                      <span className="text-text-muted font-mono text-[10px]">Supported: PDF, DOCX, Img, Audio</span>
                      <span className="font-semibold text-gold group-hover:underline">Select & Upload →</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Drag & Drop Box */}
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => handleOptionClick('.pdf,.docx,.doc,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/*,audio/*')}
              className={`flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-xl transition-all cursor-pointer ${
                isDragOver
                  ? 'border-gold bg-gold/5 scale-[1.01]'
                  : 'border-border-default hover:border-gold/50 bg-bg-tertiary/20 hover:bg-bg-tertiary/40'
              }`}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/10 text-gold mb-2 border border-gold/20">
                <UploadCloud size={24} />
              </div>
              <p className="text-xs font-semibold text-text-primary">
                Drag & drop your file here, or <span className="text-gold underline">browse all supported files</span>
              </p>
              <p className="text-[11px] text-text-muted mt-1">
                Supports PDF, DOCX, Images (PNG/JPG), Audio (MP3/WAV/M4A) up to 15MB
              </p>
            </div>

            {/* Format Policy Note */}
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-bg-tertiary border border-border-default/60 text-[11px] text-text-muted">
              <ShieldAlert size={14} className="text-gold flex-shrink-0" />
              <span>
                Files are securely processed for AI case vector indexing and text extraction under strict privacy policies.
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
