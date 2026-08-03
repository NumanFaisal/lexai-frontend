'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, X, Clock, Search, ChevronLeft, ChevronRight, Check, RefreshCw, Volume2, FileText } from 'lucide-react';
import { getVoiceTranscriptions, uploadVoiceAudio } from '@/lib/api/voice';
import { VoiceTranscription } from '@/lib/types';

interface VoiceInputModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTranscription: (transcript: string) => void;
}

export const VoiceInputModal: React.FC<VoiceInputModalProps> = ({
  isOpen,
  onClose,
  onSelectTranscription,
}) => {
  const [activeTab, setActiveTab] = useState<'record' | 'history'>('history');
  
  // History State
  const [transcriptions, setTranscriptions] = useState<VoiceTranscription[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Audio Recording State
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordingTime, setRecordingTime] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch Transcriptions on Modal Open & Page change
  const fetchTranscriptions = async (currentPage: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await getVoiceTranscriptions(currentPage, 10);
      if (res.success && Array.isArray(res.data)) {
        setTranscriptions(res.data);
        if (res.pagination) {
          setTotalPages(res.pagination.totalPages || 1);
          setTotalCount(res.pagination.total || res.data.length);
        }
      } else {
        setTranscriptions([]);
      }
    } catch (err: any) {
      console.error('Failed to fetch voice transcriptions:', err);
      setError(err.response?.data?.message || 'Failed to load voice transcriptions history.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchTranscriptions(page);
    }
  }, [isOpen, page]);

  // Clean up recording timer
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  if (!isOpen) return null;

  // Recording Logic
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        await handleAudioUpload(audioBlob);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setRecordingTime(0);

      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      console.error('Microphone access error:', err);
      setError('Microphone access denied or unavailable.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      // Stop all audio tracks
      mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop());
      setIsRecording(false);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  };

  const handleAudioUpload = async (audioBlob: Blob) => {
    setIsProcessing(true);
    setError(null);
    try {
      const result = await uploadVoiceAudio(audioBlob);
      const text = result.data?.transcript || result.data?.text;
      if (text) {
        onSelectTranscription(text);
        onClose();
      } else {
        // Refresh transcriptions list
        await fetchTranscriptions(1);
        setActiveTab('history');
      }
    } catch (err: any) {
      console.error('Failed to process voice input:', err);
      setError(err.response?.data?.message || 'Voice transcription failed.');
    } finally {
      setIsProcessing(false);
    }
  };

  const filteredTranscriptions = transcriptions.filter((item) =>
    item.transcript.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDuration = (seconds: number) => {
    if (!seconds) return '0s';
    const mins = Math.floor(seconds / 60);
    const secs = Math.round(seconds % 60);
    return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
  };

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-2xl border border-border-default bg-bg-secondary shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border-default px-6 py-4 bg-bg-tertiary/50">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/10 text-gold border border-gold/20">
              <Volume2 size={20} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-text-primary flex items-center gap-2">
                Voice Assistant & Transcriptions
                <span className="rounded-full bg-gold/10 text-gold px-2 py-0.5 text-[11px] font-medium border border-gold/20">
                  Whisper AI
                </span>
              </h2>
              <p className="text-xs text-text-muted">
                Record new voice queries or pick from your past transcriptions
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

        {/* Tab Navigation */}
        <div className="flex items-center border-b border-border-default px-6 bg-bg-secondary">
          <button
            onClick={() => setActiveTab('history')}
            className={`flex items-center gap-2 py-3 px-4 text-xs font-medium border-b-2 transition-all ${
              activeTab === 'history'
                ? 'border-gold text-gold'
                : 'border-transparent text-text-muted hover:text-text-primary'
            }`}
          >
            <Clock size={14} />
            Transcription History ({totalCount})
          </button>
          <button
            onClick={() => setActiveTab('record')}
            className={`flex items-center gap-2 py-3 px-4 text-xs font-medium border-b-2 transition-all ${
              activeTab === 'record'
                ? 'border-gold text-gold'
                : 'border-transparent text-text-muted hover:text-text-primary'
            }`}
          >
            <Mic size={14} />
            Live Voice Input
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mx-6 mt-4 rounded-lg bg-red-500/10 border border-red-500/20 p-3 text-xs text-red-400">
            {error}
          </div>
        )}

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'history' ? (
            <div className="space-y-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={15} />
                <input
                  type="text"
                  placeholder="Search past transcriptions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border border-border-default bg-bg-tertiary pl-9 pr-4 py-2 text-xs text-text-primary placeholder:text-text-muted outline-none focus:border-gold/50"
                />
              </div>

              {/* Transcriptions List */}
              {loading ? (
                <div className="flex flex-col items-center justify-center py-12 text-text-muted gap-3">
                  <RefreshCw className="animate-spin text-gold" size={24} />
                  <span className="text-xs">Loading voice transcription history...</span>
                </div>
              ) : filteredTranscriptions.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center text-text-muted gap-2 border border-dashed border-border-default rounded-xl bg-bg-tertiary/20">
                  <FileText size={32} className="text-text-muted/40" />
                  <p className="text-xs font-medium text-text-secondary">No voice transcriptions found</p>
                  <p className="text-[11px] text-text-muted">
                    {searchQuery ? 'Try matching a different keyword' : 'Record your first voice query to view history here'}
                  </p>
                  <button
                    onClick={() => setActiveTab('record')}
                    className="mt-2 rounded-lg bg-gold/10 hover:bg-gold/20 text-gold px-3 py-1.5 text-xs font-medium border border-gold/20 transition-colors"
                  >
                    Start Recording
                  </button>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {filteredTranscriptions.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        onSelectTranscription(item.transcript);
                        onClose();
                      }}
                      className="group relative flex flex-col gap-2 rounded-xl border border-border-default bg-bg-tertiary/40 p-4 transition-all hover:border-gold/40 hover:bg-bg-tertiary cursor-pointer"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <p className="text-xs text-text-primary leading-relaxed font-normal group-hover:text-gold transition-colors line-clamp-3">
                          "{item.transcript}"
                        </p>
                        <button
                          title="Use this transcript"
                          className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-gold/10 text-gold opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Check size={14} />
                        </button>
                      </div>

                      <div className="flex items-center gap-3 text-[11px] text-text-muted pt-1 border-t border-border-default/40">
                        <span className="flex items-center gap-1">
                          <Clock size={12} />
                          {formatDate(item.createdAt)}
                        </span>
                        {item.duration > 0 && (
                          <span className="rounded bg-bg-elevated px-1.5 py-0.5 text-[10px]">
                            {formatDuration(item.duration)}
                          </span>
                        )}
                        {item.detectedLang && (
                          <span className="uppercase text-[10px] bg-bg-elevated px-1.5 py-0.5 rounded text-gold">
                            {item.detectedLang}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between pt-4 border-t border-border-default">
                  <span className="text-xs text-text-muted">
                    Page {page} of {totalPages}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      disabled={page <= 1 || loading}
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-border-default text-text-secondary disabled:opacity-40 hover:bg-bg-tertiary"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button
                      disabled={page >= totalPages || loading}
                      onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-border-default text-text-secondary disabled:opacity-40 hover:bg-bg-tertiary"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Live Recording Tab */
            <div className="flex flex-col items-center justify-center py-10 gap-6 text-center">
              <div className="relative flex items-center justify-center">
                {isRecording && (
                  <span className="absolute h-32 w-32 rounded-full bg-red-500/20 animate-ping" />
                )}
                <button
                  disabled={isProcessing}
                  onClick={isRecording ? stopRecording : startRecording}
                  className={`relative flex h-24 w-24 items-center justify-center rounded-full border-2 transition-all shadow-xl ${
                    isRecording
                      ? 'border-red-500 bg-red-500 text-white shadow-red-500/30'
                      : 'border-gold bg-gold/10 text-gold hover:bg-gold/20 hover:scale-105 shadow-gold/20'
                  }`}
                >
                  {isProcessing ? (
                    <RefreshCw className="animate-spin" size={32} />
                  ) : isRecording ? (
                    <MicOff size={32} />
                  ) : (
                    <Mic size={32} />
                  )}
                </button>
              </div>

              <div>
                <p className="text-sm font-semibold text-text-primary">
                  {isProcessing
                    ? 'Processing audio with Whisper STT...'
                    : isRecording
                    ? `Recording... ${recordingTime}s`
                    : 'Click to start voice recording'}
                </p>
                <p className="text-xs text-text-muted mt-1 max-w-sm">
                  {isRecording
                    ? 'Speak clearly in English or Hindi. Click mic again to stop.'
                    : 'Voice input is automatically converted to legal text and saved to your history.'}
                </p>
              </div>

              {isRecording && (
                <button
                  onClick={stopRecording}
                  className="rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 px-5 py-2 text-xs font-medium transition-colors"
                >
                  Stop & Process Recording
                </button>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-border-default px-6 py-3 bg-bg-tertiary/30 text-xs text-text-muted">
          <span>Supported: Hindi + English (Whisper AI)</span>
          <button
            onClick={onClose}
            className="rounded-lg border border-border-default px-4 py-1.5 text-text-secondary hover:bg-bg-tertiary hover:text-text-primary transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
