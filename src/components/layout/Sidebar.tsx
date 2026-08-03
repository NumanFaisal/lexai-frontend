'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  FileText,
  ShieldCheck,
  Gavel,
  Settings,
  HelpCircle,
  X,
  Scale,
  Plus,
  MessageSquare,
  Trash2,
  AlertTriangle,
} from 'lucide-react';
import { useAppSelector, useAppDispatch } from '@/store';
import { setMobileSidebarOpen } from '@/store/slices/uiSlice';
import { clearChat, setActiveMode, removeConversation } from '@/store/slices/chatSlice';

import { sidebarTransition, backdropTransition } from '@/lib/animations';
import { groupConversationsByDate } from '@/lib/dateUtils';
import api from '@/lib/axios';
import { toast } from 'react-hot-toast';

const NAV_ITEMS = [
  { href: '/chat', label: 'Research', icon: BookOpen },
  { href: '/draft', label: 'Draft', icon: FileText },
  { href: '/compliance', label: 'Compliance', icon: ShieldCheck },
  { href: '/case', label: 'Case Analysis', icon: Gavel },
];

const MODE_ICONS: Record<string, any> = {
  research: BookOpen,
  RESEARCH: BookOpen,
  draft: FileText,
  DRAFT: FileText,
  compliance: ShieldCheck,
  COMPLIANCE: ShieldCheck,
  case: Gavel,
  CASE: Gavel,
  case_analysis: Gavel,
  CASE_ANALYSIS: Gavel,
  'case-analysis': Gavel,
  'CASE-ANALYSIS': Gavel,
};

function SidebarContent() {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAppSelector((s) => s.auth);
  const { conversations, activeConversationId } = useAppSelector((s) => s.chat);
  const dispatch = useAppDispatch();
  const [complianceReports, setComplianceReports] = useState<any[]>([]);
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; conv: any | null; loading: boolean }>({
    open: false,
    conv: null,
    loading: false,
  });

  const closeMobile = () => dispatch(setMobileSidebarOpen(false));

  const getCurrentModeFromPath = (path: string) => {
    if (path.startsWith('/chat')) return 'research';
    if (path.startsWith('/draft')) return 'draft';
    if (path.startsWith('/compliance')) return 'compliance';
    if (path.startsWith('/case')) return 'case';
    return null;
  };
  const currentScreenMode = getCurrentModeFromPath(pathname);

  // Fetch compliance reports via GET /api/v1/compliance
  useEffect(() => {
    if (currentScreenMode === 'compliance') {
      const fetchComplianceReports = async () => {
        try {
          const res = await api.get('/compliance');
          if (res.data && (res.data.success || res.data.status === 'success')) {
            setComplianceReports(res.data.data || []);
          }
        } catch (err) {
          console.error('Failed to fetch compliance reports for sidebar:', err);
        }
      };
      fetchComplianceReports();
    }
  }, [currentScreenMode]);

  const filteredConversations = useMemo(() => {
    const chatConvs = conversations.filter((conv) => {
      if (!currentScreenMode) return true;
      const convMode = conv.mode.toLowerCase().replace('-', '_');
      const normalizedConvMode = (convMode === 'case_analysis' || convMode === 'case') ? 'case' : convMode;
      return normalizedConvMode === currentScreenMode;
    });

    if (currentScreenMode === 'compliance') {
      const mappedReports = complianceReports
        .filter((report) => !chatConvs.some((c) => c.id === report.id))
        .map((report) => ({
          id: report.id,
          title: `${report.businessType || 'Compliance'} Audit (${report.state || 'India'})`,
          mode: 'compliance',
          createdAt: report.createdAt || new Date().toISOString(),
          updatedAt: report.createdAt || new Date().toISOString(),
          reportId: report.id,
        }));

      return [...chatConvs, ...mappedReports];
    }

    return chatConvs;
  }, [conversations, currentScreenMode, complianceReports]);

  const handleNewChat = () => {
    dispatch(clearChat());

    if (pathname.startsWith('/case')) {
      dispatch(setActiveMode('case'));
      router.push('/case');
    } else if (pathname.startsWith('/draft')) {
      dispatch(setActiveMode('draft'));
      router.push('/draft');
    } else if (pathname.startsWith('/compliance')) {
      dispatch(setActiveMode('compliance'));
      router.push('/compliance');
    } else {
      dispatch(setActiveMode('research'));
      router.push('/chat');
    }
    closeMobile();
  };

  const handleConvClick = (conv: any) => {
    if (conv.mode === 'compliance' || conv.mode === 'COMPLIANCE') {
      const targetId = conv.reportId || conv.id;
      router.push(`/compliance?reportId=${targetId}&conversationId=${targetId}`);
    } else {
      const modeRouteMap: Record<string, string> = {
        research: '/chat',
        RESEARCH: '/chat',
        draft: '/draft',
        DRAFT: '/draft',
        case: '/case',
        CASE: '/case',
        case_analysis: '/case',
        CASE_ANALYSIS: '/case',
      };
      const route = modeRouteMap[conv.mode] || '/chat';
      router.push(`${route}?conversationId=${conv.id}`);
    }
    closeMobile();
  };

  const openDeleteModal = (e: React.MouseEvent, conv: any) => {
    e.stopPropagation();
    setDeleteModal({ open: true, conv, loading: false });
  };

  const closeDeleteModal = () => {
    if (deleteModal.loading) return;
    setDeleteModal({ open: false, conv: null, loading: false });
  };

  const confirmDelete = async () => {
    const conv = deleteModal.conv;
    if (!conv) return;
    setDeleteModal((prev) => ({ ...prev, loading: true }));
    try {
      if (conv.mode === 'compliance' || conv.mode === 'COMPLIANCE') {
        const reportId = conv.reportId || conv.id;
        await api.delete(`/compliance/${reportId}`);
        setComplianceReports((prev) => prev.filter((r) => r.id !== reportId));
        dispatch(removeConversation(reportId));
        toast.success('Compliance report deleted');
      } else {
        await api.delete(`/chat/conversations/${conv.id}`);
        dispatch(removeConversation(conv.id));
        toast.success('Chat deleted');
      }
      setDeleteModal({ open: false, conv: null, loading: false });
    } catch (err: any) {
      console.error('Failed to delete item:', err);
      const msg = err?.response?.data?.message || 'Failed to delete. Please try again.';
      toast.error(msg);
      setDeleteModal((prev) => ({ ...prev, loading: false }));
    }
  };


  return (
    <div className="flex h-full flex-col bg-[#0D0D0F] border-r border-[#1A1A1D]">
      {/* Logo (Non-interactive branding) */}
      <div className="flex items-center gap-3 px-[18px] pt-5 pb-4 cursor-default select-none">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-gold to-[#8B6914] cursor-default">
          <Scale className="h-4 w-4 text-white" strokeWidth={1.5} />
        </div>
        <div className="cursor-default">
          <h1 className="font-serif text-[18px] font-bold leading-none text-text-primary">
            LexAI
          </h1>
          <p className="mt-0.5 text-[9px] font-medium uppercase tracking-[1.5px] text-text-muted">
            Indian Law · AI
          </p>
        </div>
        {/* Mobile close */}
        <button
          onClick={closeMobile}
          className="text-text-muted hover:bg-bg-tertiary hover:text-text-secondary ml-auto rounded-lg p-1.5 lg:hidden"
        >
          <X size={18} strokeWidth={1.5} />
        </button>
      </div>

      {/* Scrollable middle container (Navigation + Recent Chats) */}
      <div className="flex flex-col flex-1 min-h-0 px-3 py-2 gap-6">
        {/* Navigation */}
        <nav className="space-y-1 shrink-0">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMobile}
                className={`group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium transition-colors duration-150 ${
                  isActive
                    ? 'bg-[#C9A84C14] text-gold'
                    : 'text-text-secondary hover:bg-bg-tertiary hover:text-text-primary'
                }`}
              >
                {/* Active left accent */}
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[3px] rounded-r-full bg-gold"
                    transition={{ duration: 0.15, ease: 'easeOut' }}
                  />
                )}
                <Icon
                  size={18}
                  strokeWidth={1.5}
                  className={isActive ? 'text-gold' : 'text-text-muted group-hover:text-text-secondary'}
                />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Recent Chats Section */}
        <div className="flex flex-col flex-1 min-h-0 space-y-2">
          <div className="flex items-center justify-between px-3 shrink-0">
            <h3 className="text-[10px] font-semibold uppercase tracking-wider text-text-muted">
              Recent Chats
            </h3>
            <button
              onClick={handleNewChat}
              className="flex items-center gap-1 text-[11px] font-medium text-gold hover:text-gold-hover transition-colors"
              title="Start New Chat on Current Screen"
            >
              <Plus size={13} />
              New Chat
            </button>
          </div>
          <div className="flex-1 overflow-y-auto pr-1 scrollbar-thin space-y-3">

            {filteredConversations.length === 0 ? (
              <p className="px-3 py-2 text-[11px] text-text-disabled italic">
                No recent chats
              </p>
            ) : (
              groupConversationsByDate(filteredConversations).map(([groupName, items]) => (
                <div key={groupName} className="space-y-0.5">
                  <h4 className="px-3 text-[9px] font-bold uppercase tracking-widest text-text-muted/60 mb-1">
                    {groupName}
                  </h4>
                  {items.map((conv) => {
                    const isActive = activeConversationId === conv.id;
                    const Icon = MODE_ICONS[conv.mode] || MessageSquare;

                    return (
                      <div
                        key={conv.id}
                        className="group/item relative flex items-center"
                      >
                        <button
                          onClick={() => handleConvClick(conv)}
                          className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[12px] transition-colors text-left pr-8 ${
                            isActive
                              ? 'bg-[#C9A84C14] text-gold font-medium'
                              : 'text-text-secondary hover:bg-bg-tertiary hover:text-text-primary'
                          }`}
                          title={conv.title}
                        >
                          <Icon
                            size={14}
                            className={isActive ? 'text-gold shrink-0' : 'text-text-muted shrink-0'}
                          />
                          <span className="truncate flex-1">{conv.title}</span>
                        </button>
                        <button
                          onClick={(e) => openDeleteModal(e, conv)}
                          className="absolute right-2 opacity-0 group-hover/item:opacity-100 p-1 text-text-muted hover:text-error transition-all cursor-pointer rounded"
                          title="Delete permanently"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteModal.open && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={closeDeleteModal}
            />
            {/* Modal */}
            <motion.div
              className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"
              initial={{ opacity: 0, scale: 0.95, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 8 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
            >
              <div className="pointer-events-auto w-full max-w-[340px] rounded-2xl border border-[#2A2A2D] bg-[#111113] shadow-2xl shadow-black/60 p-6 flex flex-col gap-4">
                {/* Icon + Title */}
                <div className="flex flex-col items-center gap-3 text-center">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-error/10 border border-error/20">
                    <AlertTriangle size={20} className="text-error" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h2 className="text-[15px] font-semibold text-text-primary leading-tight">Delete chat?</h2>
                    <p className="mt-1 text-[12px] text-text-muted leading-relaxed">
                      <span className="font-medium text-text-secondary line-clamp-1">
                        &ldquo;{deleteModal.conv?.title || 'This chat'}&rdquo;
                      </span>{' '}
                      will be permanently deleted and cannot be recovered.
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-1">
                  <button
                    onClick={closeDeleteModal}
                    disabled={deleteModal.loading}
                    className="flex-1 rounded-lg border border-[#2A2A2D] bg-transparent px-4 py-2 text-[13px] font-medium text-text-secondary hover:bg-[#1A1A1D] hover:text-text-primary transition-colors disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDelete}
                    disabled={deleteModal.loading}
                    className="flex-1 rounded-lg bg-error/90 hover:bg-error px-4 py-2 text-[13px] font-semibold text-white transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                  >
                    {deleteModal.loading ? (
                      <>
                        <span className="h-3.5 w-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                        Deleting…
                      </>
                    ) : (
                      <>
                        <Trash2 size={13} strokeWidth={2} />
                        Delete
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>




      {/* Settings & Support Links */}
      <div className="space-y-1 border-t border-[#1A1A1D] px-3 py-2">
        <Link
          href="/settings"
          onClick={closeMobile}
          className={`flex items-center gap-3 rounded-lg px-3 py-2 text-[13px] font-medium transition-colors duration-150 ${
            pathname === '/settings'
              ? 'text-gold bg-[#C9A84C14]'
              : 'text-text-secondary hover:bg-bg-tertiary hover:text-text-primary'
          }`}
        >
          <Settings
            size={18}
            strokeWidth={1.5}
            className={pathname === '/settings' ? 'text-gold' : 'text-text-muted'}
          />
          <span>Settings</span>
        </Link>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            closeMobile();
          }}
          className="text-text-secondary hover:bg-bg-tertiary hover:text-text-primary flex items-center gap-3 rounded-lg px-3 py-2 text-[13px] font-medium transition-colors duration-150"
        >
          <HelpCircle size={18} strokeWidth={1.5} className="text-text-muted" />
          <span>Support</span>
        </a>
      </div>

      {/* Query counter */}
      {user && (
        <div className="border-border-default bg-bg-secondary mx-3 mb-3 rounded-lg border px-3 py-2.5">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-text-muted">Queries used</span>
            <span className="text-text-secondary font-mono">
              {user.queriesUsed}/{user.queriesLimit === 999999 ? '∞' : user.queriesLimit}
            </span>
          </div>
          {user.queriesLimit !== 999999 && (
            <div className="bg-bg-tertiary mt-1.5 h-1 w-full overflow-hidden rounded-full">
              <div
                className="bg-gold h-full rounded-full transition-all duration-300"
                style={{
                  width: `${Math.min((user.queriesUsed / user.queriesLimit) * 100, 100)}%`,
                }}
              />
            </div>
          )}
        </div>
      )}

      {/* User info */}
      {user && (
        <div className="border-t border-[#1A1A1D] px-[18px] py-3">
          <div className="flex items-center gap-3">
            <div className="bg-bg-tertiary text-gold flex h-8 w-8 items-center justify-center rounded-full text-[12px] font-medium">
              {user.avatarInitials}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-text-primary truncate text-[13px] font-medium">{user.username}</p>
              <p className="text-text-muted truncate text-[11px]">{user.email}</p>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="border-t border-[#1A1A1D] px-[18px] py-3">
        <p className="text-text-disabled text-[10px] leading-[1.5]">
          India&apos;s legal AI assistant. Not a substitute for professional legal counsel.
        </p>
      </div>
    </div>
  );
}

export default function Sidebar() {
  const { mobileSidebarOpen } = useAppSelector((s) => s.ui);
  const dispatch = useAppDispatch();

  return (
    <>
      {/* Desktop sidebar — width controlled by animated wrapper in layout */}
      <aside className="hidden lg:block h-full w-full">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/60 lg:hidden"
              onClick={() => dispatch(setMobileSidebarOpen(false))}
              {...backdropTransition}
            />
            <motion.aside
              className="fixed inset-y-0 left-0 z-50 w-[280px] lg:hidden"
              {...sidebarTransition}
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
