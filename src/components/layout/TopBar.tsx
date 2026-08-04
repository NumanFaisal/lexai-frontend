'use client';

import { useRef, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Menu, Plus, Settings, CreditCard, LogOut, ChevronDown, Search, Bell } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '@/store';
import { toggleMobileSidebar, toggleSidebar, setUserMenuOpen } from '@/store/slices/uiSlice';

import { clearUser } from '@/store/slices/authSlice';
import { clearChat, setActiveMode } from '@/store/slices/chatSlice';
import { logout } from '@/lib/auth';
import { MODE_DATA } from '@/lib/mock-data';
import type { ChatMode } from '@/lib/types';
import Link from 'next/link';

const ROUTE_TITLES: Record<string, string> = {
  '/chat': 'Chat',
  '/vault': 'Vault',
  '/documents': 'Documents',
  '/settings': 'Settings',
  '/pricing': 'Pricing',
  '/onboard': 'Welcome',
};

export default function TopBar() {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((s) => s.auth);
  const { activeMode } = useAppSelector((s) => s.chat);
  const { userMenuOpen } = useAppSelector((s) => s.ui);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        dispatch(setUserMenuOpen(false));
      }
    }
    if (userMenuOpen) {
      document.addEventListener('mousedown', handleClick);
      return () => document.removeEventListener('mousedown', handleClick);
    }
  }, [userMenuOpen, dispatch]);

  const handleLogout = () => {
    dispatch(setUserMenuOpen(false));
    logout();
    dispatch(clearUser());
    dispatch(clearChat());
    window.location.href = '/login';
  };

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
  };

  const currentMode = MODE_DATA[activeMode as ChatMode];
  const pageTitle = ROUTE_TITLES[pathname] || 'LexAI';

  return (
    <header className="border-border-default bg-bg-secondary flex h-[56px] flex-shrink-0 items-center justify-between border-b px-4">
      {/* Left: Mobile hamburger + page/mode context */}
      <div className="flex flex-1 items-center gap-4">
        {/* Desktop sidebar toggle */}
        <button
          onClick={() => dispatch(toggleSidebar())}
          className="border-border-default hover:bg-bg-tertiary hidden lg:flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-[7px] border transition-colors"
          title="Toggle sidebar"
        >
          <Menu size={16} strokeWidth={1.5} className="text-text-secondary" />
        </button>
        {/* Mobile sidebar toggle */}
        <button
          onClick={() => dispatch(toggleMobileSidebar())}
          className="border-border-default hover:bg-bg-tertiary flex lg:hidden h-[32px] w-[32px] shrink-0 items-center justify-center rounded-[7px] border transition-colors"
        >
          <Menu size={16} strokeWidth={1.5} className="text-text-secondary" />
        </button>

        {/* Search bar */}
        <div className="relative w-full max-w-[280px] sm:max-w-xs md:max-w-md">
          <Search
            size={16}
            strokeWidth={1.5}
            className="text-text-muted absolute top-1/2 left-3 -translate-y-1/2"
          />
          <input
            type="text"
            placeholder="Search compliance codes, case files..."
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                const val = e.currentTarget.value.trim();
                if (val) {
                  let targetRoute = '/chat';
                  if (pathname === '/draft') targetRoute = '/draft';
                  else if (pathname === '/compliance') targetRoute = '/compliance';
                  else if (pathname === '/case') targetRoute = '/case';

                  router.push(`${targetRoute}?q=${encodeURIComponent(val)}`);
                  e.currentTarget.value = '';
                }
              }
            }}
            className="bg-bg-primary border-border-default text-text-primary placeholder:text-text-disabled focus:border-gold w-full rounded-full border py-1.5 pr-4 pl-10 text-[12px] transition-all focus:outline-none"
          />
        </div>

        {/* Nav links */}
        <nav className="ml-4 hidden items-center gap-6 lg:flex">
          <Link
            href="/chat"
            className="text-text-secondary hover:text-text-primary text-[13px] font-medium transition-colors"
          >
            Dashboard
          </Link>
          <Link
            href="/vault"
            className="text-text-secondary hover:text-text-primary text-[13px] font-medium transition-colors"
          >
            History
          </Link>
          <Link
            href="/documents"
            className="text-text-secondary hover:text-text-primary text-[13px] font-medium transition-colors"
          >
            Templates
          </Link>
        </nav>
      </div>

      {/* Right: Actions + Upgrade + Notification + User Menu */}
      <div className="ml-4 flex shrink-0 items-center gap-3">
        <button
          onClick={handleNewChat}
          className="bg-gold hover:bg-gold-hover flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[12px] font-semibold text-[#0a0a0b] transition-colors shadow-sm shadow-gold/20 md:flex hidden"
        >
          <Plus size={14} strokeWidth={2} />
          New Chat
        </button>

        <button
          onClick={() => router.push('/pricing')}
          className="border-border-default text-text-primary hover:bg-bg-tertiary hidden rounded-full border px-4 py-1 text-[12px] font-medium transition-all active:scale-[0.98] sm:block"
        >
          Upgrade
        </button>

        {/* Notification Bell */}
        <button className="text-text-muted hover:text-text-primary relative p-2 transition-colors">
          <Bell size={18} strokeWidth={1.5} />
          <span className="bg-error absolute top-2 right-2 h-1.5 w-1.5 rounded-full"></span>
        </button>

        {/* User dropdown */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => dispatch(setUserMenuOpen(!userMenuOpen))}
            className="hover:bg-bg-tertiary flex items-center gap-2 rounded-lg px-2 py-1.5 transition-colors"
          >
            <div className="bg-bg-tertiary text-gold flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-medium">
              {user?.avatarInitials || '?'}
            </div>
            <ChevronDown
              size={14}
              strokeWidth={1.5}
              className={`text-text-muted transition-transform duration-150 ${
                userMenuOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          {userMenuOpen && (
            <div className="border-border-default bg-bg-secondary absolute top-full right-0 z-50 mt-1 w-48 rounded-xl border py-1 shadow-lg">
              <button
                onClick={() => {
                  dispatch(setUserMenuOpen(false));
                  router.push('/settings');
                }}
                className="text-text-secondary hover:bg-bg-tertiary hover:text-text-primary flex w-full items-center gap-2.5 px-3 py-2 text-left text-[13px] transition-colors"
              >
                <Settings size={16} strokeWidth={1.5} />
                Settings
              </button>
              <button
                onClick={() => {
                  dispatch(setUserMenuOpen(false));
                  router.push('/pricing');
                }}
                className="text-text-secondary hover:bg-bg-tertiary hover:text-text-primary flex w-full items-center gap-2.5 px-3 py-2 text-left text-[13px] transition-colors"
              >
                <CreditCard size={16} strokeWidth={1.5} />
                Upgrade Plan
              </button>
              <div className="bg-border-default my-1 h-px" />
              <button
                onClick={handleLogout}
                className="text-error hover:bg-error/5 flex w-full items-center gap-2.5 px-3 py-2 text-left text-[13px] transition-colors"
              >
                <LogOut size={16} strokeWidth={1.5} />
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
