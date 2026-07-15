'use client';

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
} from 'lucide-react';
import { useAppSelector, useAppDispatch } from '@/store';
import { setMobileSidebarOpen } from '@/store/slices/uiSlice';
import { clearChat, setActiveMode } from '@/store/slices/chatSlice';
import { sidebarTransition, backdropTransition } from '@/lib/animations';

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
};

function SidebarContent() {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAppSelector((s) => s.auth);
  const { conversations, activeConversationId } = useAppSelector((s) => s.chat);
  const dispatch = useAppDispatch();

  const closeMobile = () => dispatch(setMobileSidebarOpen(false));

  const handleConvClick = (conv: any) => {
    const modeRouteMap: Record<string, string> = {
      research: '/chat',
      RESEARCH: '/chat',
      draft: '/draft',
      DRAFT: '/draft',
      compliance: '/compliance',
      COMPLIANCE: '/compliance',
      case: '/case',
      CASE: '/case',
    };
    const route = modeRouteMap[conv.mode] || '/chat';
    router.push(`${route}?conversationId=${conv.id}`);
    closeMobile();
  };

  return (
    <div className="flex h-full flex-col bg-[#0D0D0F] border-r border-[#1A1A1D]">
      {/* Logo */}
      <div className="flex items-center gap-3 px-[18px] pt-5 pb-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-gold to-[#8B6914]">
          <Scale className="h-4 w-4 text-white" strokeWidth={1.5} />
        </div>
        <div>
          <h1 className="font-serif text-[18px] font-bold leading-none text-text-primary font-serif">
            LexAI
          </h1>
          <p className="mt-0.5 text-[9px] font-medium uppercase tracking-[1.5px] text-text-muted">
            Indian Law · AI
          </p>
        </div>
        {/* Mobile close */}
        <button
          onClick={closeMobile}
          className="ml-auto lg:hidden rounded-lg p-1.5 text-text-muted hover:bg-bg-tertiary hover:text-text-secondary"
        >
          <X size={18} strokeWidth={1.5} />
        </button>
      </div>

      {/* Scrollable middle container (Navigation + Recent Chats) */}
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-6 scrollbar-thin">
        {/* Navigation */}
        <nav className="space-y-1">
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
        <div className="space-y-2">
          <h3 className="px-3 text-[10px] font-semibold uppercase tracking-wider text-text-muted">
            Recent Chats
          </h3>
          <div className="space-y-0.5 max-h-[300px] overflow-y-auto pr-1 scrollbar-thin">
            {conversations.length === 0 ? (
              <p className="px-3 py-2 text-[11px] text-text-disabled italic">
                No recent chats
              </p>
            ) : (
              conversations.map((conv) => {
                const isActive = activeConversationId === conv.id;
                const Icon = MODE_ICONS[conv.mode] || MessageSquare;

                return (
                  <button
                    key={conv.id}
                    onClick={() => handleConvClick(conv)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[12px] transition-colors text-left ${
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
                );
              })
            )}
          </div>
        </div>
      </div>


      {/* New Research Button */}
      <div className="px-3 mb-4 shrink-0">
        <button
          onClick={() => {
            dispatch(clearChat());
            dispatch(setActiveMode('research'));
            router.push('/chat');
            closeMobile();
          }}
          className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-gold text-[#0a0a0b] font-semibold text-[13px] rounded-lg hover:bg-gold-hover transition-colors shadow-md shadow-gold/10"
        >
          <Plus size={16} strokeWidth={2} />
          New Research
        </button>
      </div>

      {/* Settings & Support Links */}
      <div className="px-3 py-2 border-t border-[#1A1A1D] space-y-1">
        <Link
          href="/settings"
          onClick={closeMobile}
          className={`flex items-center gap-3 rounded-lg px-3 py-2 text-[13px] font-medium transition-colors duration-150 ${
            pathname === '/settings'
              ? 'bg-[#C9A84C14] text-gold'
              : 'text-text-secondary hover:bg-bg-tertiary hover:text-text-primary'
          }`}
        >
          <Settings size={18} strokeWidth={1.5} className={pathname === '/settings' ? 'text-gold' : 'text-text-muted'} />
          <span>Settings</span>
        </Link>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            closeMobile();
          }}
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-[13px] font-medium text-text-secondary hover:bg-bg-tertiary hover:text-text-primary transition-colors duration-150"
        >
          <HelpCircle size={18} strokeWidth={1.5} className="text-text-muted" />
          <span>Support</span>
        </a>
      </div>

      {/* Query counter */}
      {user && (
        <div className="mx-3 mb-3 rounded-lg border border-border-default bg-bg-secondary px-3 py-2.5">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-text-muted">Queries used</span>
            <span className="font-mono text-text-secondary">
              {user.queriesUsed}/{user.queriesLimit === 999999 ? '∞' : user.queriesLimit}
            </span>
          </div>
          {user.queriesLimit !== 999999 && (
            <div className="mt-1.5 h-1 w-full rounded-full bg-bg-tertiary overflow-hidden">
              <div
                className="h-full rounded-full bg-gold transition-all duration-300"
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
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-bg-tertiary text-[12px] font-medium text-gold">
              {user.avatarInitials}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-medium text-text-primary">
                {user.username}
              </p>
              <p className="truncate text-[11px] text-text-muted">{user.email}</p>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="border-t border-[#1A1A1D] px-[18px] py-3">
        <p className="text-[10px] leading-[1.5] text-text-disabled">
          India&apos;s legal AI assistant. Not a substitute for professional legal
          counsel.
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
      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-[240px] flex-shrink-0">
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
