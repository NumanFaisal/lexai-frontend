'use client';

import { useRef, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Menu, Plus, Settings, CreditCard, LogOut, ChevronDown, Search, Bell } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '@/store';
import { toggleMobileSidebar, setUserMenuOpen } from '@/store/slices/uiSlice';
import { clearUser } from '@/store/slices/authSlice';
import { clearChat } from '@/store/slices/chatSlice';
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
    router.push('/');
  };

  const handleNewChat = () => {
    dispatch(clearChat());
    router.push('/chat');
  };

  const currentMode = MODE_DATA[activeMode as ChatMode];
  const pageTitle = ROUTE_TITLES[pathname] || 'LexAI';

  return (
    <header className="flex h-[56px] flex-shrink-0 items-center justify-between border-b border-border-default bg-bg-secondary px-4">
      {/* Left: Mobile hamburger + page/mode context */}
      <div className="flex items-center gap-4 flex-1">
        <button
          onClick={() => dispatch(toggleMobileSidebar())}
          className="flex h-[32px] w-[32px] items-center justify-center rounded-[7px] border border-border-default lg:hidden hover:bg-bg-tertiary transition-colors shrink-0"
        >
          <Menu size={16} strokeWidth={1.5} className="text-text-secondary" />
        </button>

        {/* Search bar */}
        <div className="relative w-full max-w-[280px] sm:max-w-xs md:max-w-md">
          <Search size={16} strokeWidth={1.5} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
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
            className="w-full bg-bg-primary border border-border-default rounded-full py-1.5 pl-10 pr-4 text-[12px] text-text-primary placeholder:text-text-disabled focus:outline-none focus:border-gold transition-all"
          />
        </div>

        {/* Nav links */}
        <nav className="hidden lg:flex items-center gap-6 ml-4">
          <Link
            href="/chat"
            className="text-text-secondary hover:text-text-primary transition-colors text-[13px] font-medium"
          >
            Dashboard
          </Link>
          <Link
            href="/vault"
            className="text-text-secondary hover:text-text-primary transition-colors text-[13px] font-medium"
          >
            History
          </Link>
          <Link
            href="/documents"
            className="text-text-secondary hover:text-text-primary transition-colors text-[13px] font-medium"
          >
            Templates
          </Link>
        </nav>
      </div>

      {/* Right: Actions + Upgrade + Notification + User Menu */}
      <div className="flex items-center gap-3 shrink-0 ml-4">
        {pathname === '/chat' && (
          <button
            onClick={handleNewChat}
            className="hidden md:flex items-center gap-1.5 rounded-md border border-border-default px-2.5 py-1 text-[11px] text-text-muted transition-colors hover:border-gold-border hover:text-gold"
          >
            <Plus size={14} strokeWidth={1.5} />
            New chat
          </button>
        )}

        <button
          onClick={() => router.push('/pricing')}
          className="hidden sm:block px-4 py-1 border border-border-default text-text-primary text-[12px] font-medium rounded-full hover:bg-bg-tertiary active:scale-[0.98] transition-all"
        >
          Upgrade
        </button>

        {/* Notification Bell */}
        <button className="p-2 text-text-muted hover:text-text-primary transition-colors relative">
          <Bell size={18} strokeWidth={1.5} />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-error rounded-full"></span>
        </button>

        {/* User dropdown */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => dispatch(setUserMenuOpen(!userMenuOpen))}
            className="flex items-center gap-2 rounded-lg px-2 py-1.5 transition-colors hover:bg-bg-tertiary"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-bg-tertiary text-[11px] font-medium text-gold">
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
            <div className="absolute right-0 top-full mt-1 w-48 rounded-xl border border-border-default bg-bg-secondary py-1 shadow-lg z-50">
              <button
                onClick={() => {
                  dispatch(setUserMenuOpen(false));
                  router.push('/settings');
                }}
                className="flex w-full items-center gap-2.5 px-3 py-2 text-left text-[13px] text-text-secondary transition-colors hover:bg-bg-tertiary hover:text-text-primary"
              >
                <Settings size={16} strokeWidth={1.5} />
                Settings
              </button>
              <button
                onClick={() => {
                  dispatch(setUserMenuOpen(false));
                  router.push('/pricing');
                }}
                className="flex w-full items-center gap-2.5 px-3 py-2 text-left text-[13px] text-text-secondary transition-colors hover:bg-bg-tertiary hover:text-text-primary"
              >
                <CreditCard size={16} strokeWidth={1.5} />
                Upgrade Plan
              </button>
              <div className="my-1 h-px bg-border-default" />
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-2.5 px-3 py-2 text-left text-[13px] text-error transition-colors hover:bg-error/5"
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
