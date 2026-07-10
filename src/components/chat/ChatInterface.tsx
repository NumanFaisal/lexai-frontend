'use client';

import { useEffect, useCallback, useRef, useState, useMemo, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mic, RotateCcw, CreditCard, ChevronDown, Check, Brain, Sparkles, Cpu } from 'lucide-react';
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
              className={`text-[13px] font-medium transition-colors relative pb-1 ${
                isActive
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

  const className = `inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 font-mono text-[11px] leading-[1.3] transition-colors ${
    citation.verified
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

//  Message Bubble 
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

  if (message.role === 'assistant' && message.mode === 'compliance' && message.content.startsWith('## COMPLIANCE AUDIT')) {
    return (
      <motion.div
        className="w-full flex justify-start"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        <ComplianceDashboard />
      </motion.div>
    );
  }

  if (message.role === 'assistant' && message.mode === 'case' && message.content.startsWith('## Legal Case Analysis')) {
    return (
      <motion.div
        className="w-full flex justify-start"
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
          <span
            className="font-mono text-[11px] tracking-[0.5px]"
            style={{ color: mode.color }}
          >
            LEXAI · {mode.label.toUpperCase()}
          </span>
        </div>

        {/* Response content */}
        <div className="rounded-[4px_14px_14px_14px] border border-border-default bg-[#141416] px-4 py-3.5">
          {message.isStreaming && !message.content ? (
            <GavelLoader isThinking={true} />
          ) : (
            <div
              className={`prose-chat text-[13px] leading-[1.75] text-[#C8C3B8] ${
                message.isStreaming ? 'typing-cursor' : ''
              }`}
              dangerouslySetInnerHTML={{
                __html: formatMarkdown(message.content),
              }}
            />
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

//  Paywall Card 
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

//  Chat Content
function ChatContent({ mode }: { mode: ChatMode }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((s) => s.auth);
  const { messages, isStreaming, inputValue, conversations, activeConversationId } =
    useAppSelector((s) => s.chat);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [retryMessageId, setRetryMessageId] = useState<string | null>(null);
  const lastProcessedQueryRef = useRef<string | null>(null);

  const [selectedModel, setSelectedModel] = useState('gemini-2.0-flash');
  const [modelDropdownOpen, setModelDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

    const urlConvId = searchParams.get('conversationId');
    if (urlConvId) {
      // URL has a specific conversation ID, load it
      dispatch(setActiveConversation(urlConvId));
      const msgs = MOCK_MESSAGES[urlConvId] || [];
      dispatch(setMessages(msgs));
      return;
    }

    // Check if current active conversation in Redux matches this mode.
    // If it doesn't match, we must load the correct mode's conversation or clear.
    const activeConv = conversations.find(c => c.id === activeConversationId);
    if (!activeConv || activeConv.mode !== mode) {
      const modeConvs = conversations.filter((c) => c.mode === mode);
      if (modeConvs.length > 0) {
        // Load the most recent conversation for this mode
        const latest = modeConvs[0];
        dispatch(setActiveConversation(latest.id));
        const msgs = MOCK_MESSAGES[latest.id] || [];
        dispatch(setMessages(msgs));
      } else {
        // Clear chat to start empty state
        dispatch(clearChat());
      }
    }
  }, [mode, searchParams, conversations, dispatch, activeConversationId]);

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
  const sendMessage = useCallback(async (overrideContent?: string) => {
    const content = (overrideContent !== undefined ? overrideContent : inputValue).trim();
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
      mode: mode,
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
          mode: mode,
          lastMessage: content,
          messageCount: 1,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        })
      );
      router.replace(`/${mode === 'research' ? 'chat' : mode}?conversationId=${newConvId}`, {
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
      mode: mode,
      isStreaming: true,
      createdAt: new Date().toISOString(),
    };

    dispatch(addMessage(assistantMsg));
    dispatch(setIsStreaming(true));

    try {
      // Replaced fetch with custom axios instance
      const response = await api.post('/chat/research', {
        message: content,
        model: selectedModel,
      });

      const responseData = response.data;

      if (responseData.success && responseData.data) {
        const responseText = typeof responseData.data === 'string'
          ? responseData.data
          : (responseData.data.answer || responseData.data.response || responseData.data.text || responseData.data.message || responseData.data.error || 'No answer received from the AI model.');

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
              confidence:"low",
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
      {/* Secondary nav tabs */}
      <SecondaryNav activeMode={mode} />

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 lg:px-0">
        <div className={`mx-auto space-y-5 transition-all duration-300 ${mode === 'compliance' || mode === 'case' ? 'max-w-[1000px]' : 'max-w-[720px]'}`}>
          {messages.length === 0 && !isStreaming ? (
            <EmptyState mode={mode} />
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
      </div>

      {/* Input bar */}
      <div className="border-t border-border-default bg-bg-primary px-4 pb-4 pt-3 lg:px-6">
        <div className={`mx-auto transition-all duration-300 ${mode === 'compliance' || mode === 'case' ? 'max-w-[1000px]' : 'max-w-[720px]'}`}>
          <div
            className={`flex items-end gap-2.5 rounded-[14px] border bg-bg-secondary px-3.5 py-2.5 transition-colors duration-200 ${
              inputValue.trim() ? 'border-gold-border' : 'border-border-default'
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
                          className={`flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left text-[12px] transition-colors ${
                            isSelected
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
              onClick={() => sendMessage()}
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

//  Simple markdown formatter 
function formatMarkdown(text: string): string {
  if (!text) return '';
  return text
    .replace(/\r\n/g, '\n')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/^### (.+)/gm, '<h4 class="text-[13px] font-semibold text-gold mt-3 mb-1">$1</h4>')
    .replace(/^## (.+)/gm, '<h3 class="text-[14px] font-semibold text-gold mt-4 mb-1.5">$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-text-primary font-medium">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/^› (.+)$/gm, '<div class="flex gap-1.5 my-0.5"><span class="text-gold flex-shrink-0">›</span><span>$1</span></div>')
    .replace(/^\d+\. (.+)$/gm, '<div class="flex gap-2 my-0.5"><span class="text-text-muted flex-shrink-0">•</span><span>$1</span></div>')
    .replace(/^[-*] (.+)$/gm, '<div class="flex gap-2 my-0.5"><span class="text-text-muted flex-shrink-0">•</span><span>$1</span></div>')
    .replace(/\n\n/g, '<br/><br/>')
    .replace(/\n/g, '<br/>');
}

interface ChatInterfaceProps {
  mode: ChatMode;
}

export default function ChatInterface({ mode }: ChatInterfaceProps) {
  return (
    <Suspense fallback={<div className="h-full flex items-center justify-center text-text-muted text-[13px]">Loading...</div>}>
      <ChatContent mode={mode} />
    </Suspense>
  );
}
