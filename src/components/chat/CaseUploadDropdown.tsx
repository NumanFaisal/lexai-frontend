'use client';

import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, FileCode, Image as ImageIcon, Mic, UploadCloud } from 'lucide-react';

interface CaseUploadDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectFormat: (acceptFilter: string) => void;
  align?: 'left' | 'right' | 'center';
  triggerRef?: React.RefObject<HTMLElement | null>;
}

export const UPLOAD_FORMAT_OPTIONS = [
  {
    id: 'pdf',
    label: 'PDF Document',
    sublabel: 'Briefs, judgments, court orders',
    accept: 'application/pdf,.pdf',
    ext: 'PDF',
    icon: FileText,
    iconColor: 'text-red-400 bg-red-500/10 border-red-500/20',
  },
  {
    id: 'docx',
    label: 'Word Document',
    sublabel: 'Editable drafts, notices, affidavits',
    accept: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/msword,.docx,.doc',
    ext: 'DOCX / DOC',
    icon: FileCode,
    iconColor: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
  },
  {
    id: 'image',
    label: 'Image / Scan',
    sublabel: 'Scanned evidence pages & photos',
    accept: 'image/*,.png,.jpg,.jpeg,.webp',
    ext: 'PNG / JPG',
    icon: ImageIcon,
    iconColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  },
  {
    id: 'audio',
    label: 'Audio File',
    sublabel: 'Voice notes, client audio & recordings',
    accept: 'audio/*,.mp3,.wav,.m4a,.webm,.ogg',
    ext: 'MP3 / WAV',
    icon: Mic,
    iconColor: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
  },
];

export const CaseUploadDropdown: React.FC<CaseUploadDropdownProps> = ({
  isOpen,
  onClose,
  onSelectFormat,
  align = 'left',
  triggerRef,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        containerRef.current &&
        !containerRef.current.contains(target) &&
        (!triggerRef?.current || !triggerRef.current.contains(target))
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose, triggerRef]);

  if (!isOpen) return null;

  const alignClasses =
    align === 'right'
      ? 'right-0'
      : align === 'center'
      ? 'left-1/2 -translate-x-1/2'
      : 'left-0';

  return (
    <AnimatePresence>
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0, scale: 0.95, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 8 }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
        className={`absolute bottom-full mb-2.5 w-72 rounded-2xl border border-border-default bg-bg-secondary/95 backdrop-blur-md p-1.5 shadow-2xl z-50 overflow-hidden ${alignClasses}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-3 py-2 border-b border-border-default/60 mb-1">
          <span className="text-[10px] font-bold tracking-wider text-text-muted uppercase flex items-center gap-1.5">
            <UploadCloud size={12} className="text-gold" />
            Upload Document Type
          </span>
          <span className="text-[9.5px] font-semibold text-gold bg-gold/10 px-1.5 py-0.5 rounded border border-gold/20">
            Max 15MB
          </span>
        </div>

        {/* Dropdown Options */}
        <div className="space-y-1">
          {UPLOAD_FORMAT_OPTIONS.map((opt) => {
            const Icon = opt.icon;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => {
                  onSelectFormat(opt.accept);
                  onClose();
                }}
                className="group flex w-full items-start gap-2.5 rounded-xl px-2.5 py-2 text-left transition-all hover:bg-bg-tertiary hover:border-gold/20 border border-transparent"
              >
                <div className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border text-[14px] mt-0.5 ${opt.iconColor}`}>
                  <Icon size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-[12.5px] font-semibold text-text-primary group-hover:text-gold transition-colors">
                      {opt.label}
                    </span>
                    <span className="text-[9px] font-mono text-text-muted bg-bg-elevated px-1.5 py-0.5 rounded">
                      {opt.ext}
                    </span>
                  </div>
                  <p className="text-[11px] text-text-muted truncate mt-0.5">
                    {opt.sublabel}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
