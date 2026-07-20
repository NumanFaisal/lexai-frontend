'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Search, Bookmark, BookmarkCheck, Clock } from 'lucide-react';
import { MODE_DATA } from '@/lib/mock-data';
import { listItemStagger } from '@/lib/animations';
import type { ChatMode, VaultItem } from '@/lib/types';
import api from '@/lib/axios';
import GavelLoader from '@/components/ui/GavelLoader';

const FILTER_OPTIONS: { value: ChatMode | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'research', label: 'Research' },
  { value: 'draft', label: 'Drafts' },
  { value: 'compliance', label: 'Compliance' },
  { value: 'case', label: 'Case Analysis' },
];

const normalizeMode = (m?: string, inputText?: string): ChatMode => {
  if (m) {
    const lower = m.toLowerCase().replace('-', '_');
    if (lower === 'case_analysis' || lower === 'case') return 'case';
    if (lower === 'research' || lower === 'draft' || lower === 'compliance') return lower as ChatMode;
  }
  const inputLower = (inputText || '').toLowerCase();
  if (inputLower.includes('compliance')) return 'compliance';
  if (inputLower.includes('case analysis')) return 'case';
  if (inputLower.includes('draft contract') || inputLower.includes('draft agreement')) return 'draft';
  return 'research';
};

export default function VaultPage() {
  const router = useRouter();
  const [items, setItems] = useState<VaultItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<ChatMode | 'all'>('all');
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Fetch actual chat history from backend API
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await api.get('/chat/history');
        if (response.data.success && Array.isArray(response.data.data)) {
          const mappedItems: VaultItem[] = response.data.data.map((q: any) => {
            const mode = normalizeMode(q.mode || q.conversation?.mode, q.inputText);
            return {
              id: q.id,
              title: q.title || q.conversation?.title || (q.inputText ? q.inputText.split('\n')[0].slice(0, 50) : 'Untitled Query'),
              preview: q.response || '',
              mode,
              bookmarked: false,
              conversationId: q.conversationId || q.id,
              createdAt: q.createdAt || new Date().toISOString(),
            };
          });
          setItems(mappedItems);
        }
      } catch (err) {
        console.error('Failed to fetch chat history:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchHistory();
  }, []);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 250);
    return () => clearTimeout(timer);
  }, [search]);

  // Client-side filtering
  const filteredItems = useMemo(() => {
    let result = items;
    if (filter !== 'all') {
      result = result.filter((item) => item.mode === filter);
    }
    if (debouncedSearch) {
      const q = debouncedSearch.toLowerCase();
      result = result.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.preview.toLowerCase().includes(q)
      );
    }
    return result;
  }, [items, filter, debouncedSearch]);

  const toggleBookmark = (id: string) => {
    // Optimistic update
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, bookmarked: !item.bookmarked } : item
      )
    );
  };

  const openConversation = (item: VaultItem) => {
    const route = item.mode === 'research' ? 'chat' : item.mode;
    router.push(`/${route}?conversationId=${item.conversationId}`);
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    const now = new Date();
    const diff = now.getTime() - d.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="mx-auto max-w-[800px] px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="font-serif text-[30px] font-semibold text-text-primary">
            Vault
          </h1>
          <span className="text-[12px] text-text-muted">
            {filteredItems.length} items
          </span>
        </div>

        {/* Search */}
        <div className="mt-5 relative">
          <Search
            size={16}
            strokeWidth={1.5}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search saved research..."
            className="w-full rounded-xl border border-border-default bg-bg-secondary py-2.5 pl-9 pr-4 text-[13px] text-text-primary placeholder:text-text-disabled outline-none transition-colors focus:border-gold-border"
          />
        </div>

        {/* Filter pills */}
        <div className="mt-4 flex flex-wrap gap-2">
          {FILTER_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setFilter(opt.value)}
              className={`rounded-full px-3 py-1 text-[12px] font-medium transition-colors duration-150 ${
                filter === opt.value
                  ? 'bg-gold-subtle border border-gold-border text-gold'
                  : 'border border-border-default text-text-muted hover:text-text-secondary hover:border-border-default/60'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Items list */}
        {isLoading ? (
          <div className="flex h-[300px] items-center justify-center">
            <GavelLoader />
          </div>
        ) : (
          <motion.div
            className="mt-6 space-y-3"
            variants={listItemStagger.container}
            initial="initial"
            animate="animate"
            key={`${filter}-${debouncedSearch}`}
          >
            {filteredItems.length === 0 ? (
              <div className="py-16 text-center">
                <p className="text-[14px] text-text-muted">
                  No items found
                </p>
                <p className="mt-1 text-[12px] text-text-disabled">
                  Try adjusting your search or filters
                </p>
              </div>
            ) : (
              filteredItems.map((item) => {
                const modeData = MODE_DATA[item.mode];
                return (
                  <motion.div
                    key={item.id}
                    variants={listItemStagger.item}
                    className="group cursor-pointer rounded-2xl border border-border-default bg-bg-secondary p-4 transition-all duration-200 hover:border-opacity-60"
                    style={{
                      ['--hover-border' as string]: `${modeData.color}99`,
                    }}
                    onClick={() => openConversation(item)}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = `${modeData.color}60`;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = '';
                    }}
                  >
                    <div className="flex items-start gap-3">
                      {/* Mode icon */}
                      <div
                        className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg text-[16px]"
                        style={{
                          backgroundColor: `${modeData.color}1A`,
                        }}
                      >
                        {modeData.icon}
                      </div>

                      {/* Content */}
                      <div className="min-w-0 flex-1">
                        <h3 className="text-[14px] font-medium text-text-primary">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-[12px] leading-relaxed text-text-secondary line-clamp-2">
                          {item.preview}
                        </p>
                        <div className="mt-2 flex items-center gap-3 text-[11px] text-text-muted">
                          <span className="flex items-center gap-1">
                            <Clock size={12} strokeWidth={1.5} />
                            {formatDate(item.createdAt)}
                          </span>
                          <span
                            className="rounded-full px-1.5 py-0.5 text-[10px]"
                            style={{
                              backgroundColor: `${modeData.color}1A`,
                              color: modeData.color,
                            }}
                          >
                            {modeData.shortLabel}
                          </span>
                        </div>
                      </div>

                      {/* Bookmark */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleBookmark(item.id);
                        }}
                        className="flex-shrink-0 rounded-lg p-1.5 text-text-muted transition-colors hover:bg-bg-tertiary hover:text-gold"
                      >
                        {item.bookmarked ? (
                          <BookmarkCheck
                            size={18}
                            strokeWidth={1.5}
                            className="text-gold"
                          />
                        ) : (
                          <Bookmark size={18} strokeWidth={1.5} />
                        )}
                      </button>
                    </div>
                  </motion.div>
                );
              })
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
