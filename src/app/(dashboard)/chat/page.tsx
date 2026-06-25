'use client';

import { useEffect, useCallback, useRef, useState, useMemo, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mic, RotateCcw, CreditCard } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '@/store';
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
} from '@/store/slices/chatSlice';
import { incrementQueriesUsed } from '@/store/slices/authSlice';
import {
  MODE_DATA,
  MOCK_CONVERSATIONS,
  MOCK_MESSAGES,
  MOCK_STREAMING_RESPONSE,
} from '@/lib/mock-data';
import { listItemStagger } from '@/lib/animations';
import type { ChatMode, ChatMessage } from '@/lib/types';
import Link from 'next/link';

// ── Mode Tabs ──────────────────────────────────
function ModeTabs() {
  const dispatch = useAppDispatch();
  const { activeMode } = useAppSelector((s) => s.chat);
  const router = useRouter();

  const modes: ChatMode[] = ['research', 'draft', 'compliance', 'case'];

  const handleModeChange = (mode: ChatMode) => {
    dispatch(setActiveMode(mode));
    router.replace(`/chat?mode=${mode}`, { scroll: false });
  };

  return (
    <div className="flex items-center gap-1 rounded-xl bg-bg-secondary p-1 border border-border-default">
      {modes.map((mode) => {
        const data = MODE_DATA[mode];
        const isActive = activeMode === mode;
        return (
          <button
            key={mode}
            onClick={() => handleModeChange(mode)}
            className={`relative rounded-lg px-3 py-1.5 text-[12px] font-medium transition-colors duration-150 ${
              isActive ? 'text-text-primary' : 'text-text-muted hover:text-text-secondary'
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="mode-tab-indicator"
                className="absolute inset-0 rounded-lg"
                style={{ backgroundColor: `${data.color}22` }}
                transition={{ duration: 0.15, ease: 'easeOut' }}
              />
            )}
            <span className="relative flex items-center gap-1.5">
              <span className="text-[13px]">{data.icon}</span>
              <span className="hidden sm:inline">{data.shortLabel}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

// ── Citation Badge ─────────────────────────────
function CitationBadge({
  citation,
}: {
  citation: ChatMessage['citations'] extends (infer T)[] | undefined ? T : never;
}) {
  if (!citation) return null;
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 font-mono text-[11px] leading-[1.3] ${
        citation.verified
          ? 'bg-[#C9A84C1A] border border-[#C9A84C4D] text-gold'
          : 'bg-[#BE7B7B1A] border border-[#BE7B7B66] text-error'
      }`}
    >
      <span className={citation.verified ? 'text-success' : 'text-warning'}>
        {citation.verified ? '✓' : '⚠'}
      </span>
      {citation.text}
      {citation.url && (
        <span className="text-text-muted">↗</span>
      )}
    </span>
  );
}

// ── Message Bubble ─────────────────────────────
function MessageBubble({ message }: { message: ChatMessage }) {
  const mode = MODE_DATA[message.mode];

  if (message.role === 'user') {
    return (
      <motion.div
        className="flex justify-end"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
      >
        <div className="max-w-[88%] rounded-[14px_14px_4px_14px] border border-[#C9A84C44] bg-gradient-to-br from-[#C9A84C22] to-[#C9A84C11] px-3.5 py-2.5 text-[13px] leading-[1.6] text-text-primary">
          {message.content}
        </div>
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
          <span
            className="font-mono text-[11px] tracking-[0.5px]"
            style={{ color: mode.color }}
          >
            LEXAI · {mode.label.toUpperCase()}
          </span>
        </div>

        {/* Response content */}
        <div className="rounded-[4px_14px_14px_14px] border border-border-default bg-[#141416] px-4 py-3.5">
          <div
            className={`prose-chat text-[13px] leading-[1.75] text-[#C8C3B8] ${
              message.isStreaming ? 'typing-cursor' : ''
            }`}
            dangerouslySetInnerHTML={{
              __html: formatMarkdown(message.content),
            }}
          />

          {/* Citations */}
          {message.citations && message.citations.length > 0 && (
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {message.citations.map((cite) => (
                <CitationBadge key={cite.id} citation={cite} />
              ))}
            </div>
          )}

          {/* Confidence */}
          {message.confidence && !message.isStreaming && (
            <div className="mt-2 flex items-center gap-1.5 text-[11px] text-text-muted">
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
              {message.confidence.charAt(0).toUpperCase() +
                message.confidence.slice(1)}{' '}
              confidence · Citations verified
            </div>
          )}

          {/* Disclaimer */}
          {!message.isStreaming && (
            <div className="mt-3 border-t border-[#252528] pt-2.5 text-[11px] italic text-text-muted">
              ℹ️ Not legal advice. Consult a qualified advocate for your
              specific matter.
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ── Empty State ────────────────────────────────
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
      <h2 className="mt-4 font-serif text-[22px] font-semibold text-text-primary">
        {data.label}
      </h2>
      <p className="mt-2 max-w-[340px] text-center text-[13px] leading-relaxed text-text-secondary">
        {data.description}
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        {data.quickPrompts.map((prompt) => (
          <button
            key={prompt}
            onClick={() => dispatch(setInputValue(prompt))}
            className="rounded-full border border-border-default bg-bg-secondary px-3 py-1.5 text-[11px] text-text-muted transition-colors hover:border-[#C9A84C99] hover:text-gold"
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Paywall Card ───────────────────────────────
function PaywallCard() {
  return (
    <motion.div
      className="mx-auto max-w-lg rounded-2xl border-2 border-gold-border bg-bg-secondary p-6"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-subtle">
          <CreditCard size={20} strokeWidth={1.5} className="text-gold" />
        </div>
        <div>
          <h3 className="text-[14px] font-semibold text-text-primary">
            Query limit reached
          </h3>
          <p className="text-[12px] text-text-secondary">
            You&apos;ve used all your free queries this month
          </p>
        </div>
      </div>
      <p className="mt-3 text-[13px] leading-relaxed text-text-secondary">
        Upgrade your plan to continue using LexAI with unlimited queries, contract
        drafting, voice input, and more.
      </p>
      <Link
        href="/pricing?from=limit"
        className="mt-4 flex items-center justify-center gap-2 rounded-[10px] bg-gold px-5 py-2.5 text-[13px] font-medium text-bg-primary transition-colors hover:bg-gold-hover"
      >
        Upgrade Plan
        <CreditCard size={14} strokeWidth={1.5} />
      </Link>
    </motion.div>
  );
}

// ── Chat Page Content ──────────────────────────
function ChatContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((s) => s.auth);
  const { messages, activeMode, isStreaming, inputValue, conversations, activeConversationId } =
    useAppSelector((s) => s.chat);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [retryMessageId, setRetryMessageId] = useState<string | null>(null);

  // Sync mode from URL
  useEffect(() => {
    const modeParam = searchParams.get('mode') as ChatMode | null;
    if (modeParam && Object.keys(MODE_DATA).includes(modeParam)) {
      dispatch(setActiveMode(modeParam));
    }

    // Load conversation from URL
    const convId = searchParams.get('conversationId');
    if (convId && convId !== activeConversationId) {
      dispatch(setActiveConversation(convId));
      const msgs = MOCK_MESSAGES[convId];
      if (msgs) {
        dispatch(setMessages(msgs));
      }
    }
  }, [searchParams, dispatch, activeConversationId]);

  // Load conversations list
  useEffect(() => {
    if (conversations.length === 0) {
      dispatch(setConversations(MOCK_CONVERSATIONS));
    }
  }, [dispatch, conversations.length]);

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

  const isAtLimit = useMemo(
    () =>
      user ? user.queriesUsed >= user.queriesLimit : false,
    [user]
  );

  // Send message with simulated streaming
  const sendMessage = useCallback(async () => {
    const content = inputValue.trim();
    if (!content || isStreaming) return;

    // Check limit
    if (isAtLimit) return;

    // Clear input
    dispatch(setInputValue(''));
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    // Create user message
    const userMsg: ChatMessage = {
      id: `msg_${Date.now()}`,
      conversationId: activeConversationId || `conv_${Date.now()}`,
      role: 'user',
      content,
      mode: activeMode,
      createdAt: new Date().toISOString(),
    };

    dispatch(addMessage(userMsg));

    // If no active conversation, create one
    if (!activeConversationId) {
      const newConvId = `conv_${Date.now()}`;
      dispatch(setActiveConversation(newConvId));
      dispatch(
        addConversation({
          id: newConvId,
          title: content.slice(0, 50) + (content.length > 50 ? '...' : ''),
          mode: activeMode,
          lastMessage: content,
          messageCount: 1,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        })
      );
      router.replace(`/chat?mode=${activeMode}&conversationId=${newConvId}`, {
        scroll: false,
      });
    }

    // Create empty assistant message for streaming
    const assistantMsgId = `msg_${Date.now() + 1}`;
    const assistantMsg: ChatMessage = {
      id: assistantMsgId,
      conversationId: userMsg.conversationId,
      role: 'assistant',
      content: '',
      mode: activeMode,
      isStreaming: true,
      createdAt: new Date().toISOString(),
    };

    dispatch(addMessage(assistantMsg));
    dispatch(setIsStreaming(true));

    // Simulate SSE streaming
    const words = MOCK_STREAMING_RESPONSE.split(' ');
    for (let i = 0; i < words.length; i++) {
      await new Promise((r) => setTimeout(r, 20 + Math.random() * 30));
      dispatch(
        appendToMessage({
          id: assistantMsgId,
          content: (i === 0 ? '' : ' ') + words[i],
        })
      );
    }

    // Finish streaming — add citations and confidence
    dispatch(
      updateMessage({
        id: assistantMsgId,
        updates: {
          isStreaming: false,
          citations: [
            {
              id: `cite_${Date.now()}`,
              text: 'Section 302 IPC',
              source: 'Indian Kanoon',
              url: 'https://indiankanoon.org',
              verified: true,
            },
            {
              id: `cite_${Date.now() + 1}`,
              text: 'State of UP v. Krishna Gopal (1988)',
              source: 'Supreme Court',
              verified: true,
            },
          ],
          confidence: 'high',
        },
      })
    );

    dispatch(setIsStreaming(false));
    dispatch(incrementQueriesUsed());
  }, [
    inputValue,
    isStreaming,
    isAtLimit,
    activeMode,
    activeConversationId,
    dispatch,
    router,
  ]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const canSend = inputValue.trim().length > 0 && !isStreaming && !isAtLimit;

  return (
    <div className="flex h-full flex-col">
      {/* Mode tabs (below topbar, inside content area) */}
      <div className="flex items-center justify-center border-b border-border-default px-4 py-2">
        <ModeTabs />
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 lg:px-0">
        <div className="mx-auto max-w-[720px] space-y-5">
          {messages.length === 0 && !isStreaming ? (
            <EmptyState mode={activeMode} />
          ) : (
            <>
              {messages.map((msg) => (
                <MessageBubble key={msg.id} message={msg} />
              ))}

              {/* Retry card */}
              {retryMessageId && (
                <div className="flex justify-start">
                  <div className="rounded-xl border border-error/30 bg-error/5 px-4 py-3 text-[13px] text-text-secondary">
                    Something went wrong.{' '}
                    <button
                      onClick={() => setRetryMessageId(null)}
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
      </div>

      {/* Input bar */}
      <div className="border-t border-border-default bg-bg-primary px-4 pb-4 pt-3 lg:px-6">
        <div className="mx-auto max-w-[720px]">
          <div
            className={`flex items-end gap-2.5 rounded-[14px] border bg-bg-secondary px-3.5 py-2.5 transition-colors duration-200 ${
              inputValue.trim() ? 'border-gold-border' : 'border-border-default'
            }`}
          >
            <textarea
              ref={textareaRef}
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder={
                isAtLimit
                  ? 'Query limit reached — upgrade to continue'
                  : 'Ask about Indian law...'
              }
              disabled={isAtLimit}
              rows={1}
              className="flex-1 resize-none bg-transparent text-[13px] text-text-primary placeholder:text-text-disabled outline-none disabled:opacity-50"
              style={{ maxHeight: '120px' }}
            />

            {/* Voice button (placeholder) */}
            <button
              className="flex h-[34px] w-[34px] flex-shrink-0 items-center justify-center rounded-[9px] bg-bg-tertiary text-info transition-colors hover:bg-bg-elevated"
              title="Voice input (Pro feature)"
            >
              <Mic size={16} strokeWidth={1.5} />
            </button>

            {/* Send button */}
            <button
              onClick={sendMessage}
              disabled={!canSend}
              className={`flex h-[34px] w-[34px] flex-shrink-0 items-center justify-center rounded-[9px] transition-all duration-200 ${
                canSend
                  ? 'bg-gradient-to-br from-gold to-gold/80 text-bg-primary'
                  : 'bg-bg-tertiary text-text-disabled'
              }`}
            >
              <Send
                size={16}
                strokeWidth={1.5}
                className={canSend ? '' : ''}
              />
            </button>
          </div>

          {/* Footer text */}
          <div className="mt-2 flex items-center justify-between text-[10px] text-text-disabled">
            <span>Powered by Claude · Indian Law Jurisdiction</span>
            <span>Enter to send · Shift+Enter for newline</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Simple markdown formatter ──────────────────
function formatMarkdown(text: string): string {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/## (.+)/g, '<h3 class="text-[14px] font-semibold text-gold mt-4 mb-1.5">$1</h3>')
    .replace(/### (.+)/g, '<h4 class="text-[13px] font-semibold text-gold mt-3 mb-1">$1</h4>')
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-text-primary font-medium">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/^› (.+)$/gm, '<div class="flex gap-1.5 my-0.5"><span class="text-gold flex-shrink-0">›</span><span>$1</span></div>')
    .replace(/^\d+\. (.+)$/gm, '<div class="flex gap-2 my-0.5"><span class="text-text-muted flex-shrink-0">•</span><span>$1</span></div>')
    .replace(/\n\n/g, '<br/><br/>')
    .replace(/\n/g, '<br/>');
}

export default function ChatPage() {
  return (
    <Suspense fallback={<div className="h-full flex items-center justify-center text-text-muted text-[13px]">Loading...</div>}>
      <ChatContent />
    </Suspense>
  );
}
