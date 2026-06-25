'use client';

import { useRef, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Menu, Plus, Settings, CreditCard, LogOut, ChevronDown } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '@/store';
import { toggleMobileSidebar, setUserMenuOpen } from '@/store/slices/uiSlice';
import { clearUser } from '@/store/slices/authSlice';
import { clearChat } from '@/store/slices/chatSlice';
import { logout } from '@/lib/auth';
import { MODE_DATA } from '@/lib/mock-data';
import type { ChatMode } from '@/lib/types';

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
    <header className="flex h-[52px] flex-shrink-0 items-center border-b border-border-default bg-bg-secondary px-4">
      {/* Left: Mobile hamburger + context */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => dispatch(toggleMobileSidebar())}
          className="flex h-[30px] w-[30px] items-center justify-center rounded-[7px] border border-border-default lg:hidden hover:bg-bg-tertiary transition-colors"
        >
          <Menu size={16} strokeWidth={1.5} className="text-text-secondary" />
        </button>

        {pathname === '/chat' ? (
          <div className="flex items-center gap-2">
            <span className="text-[16px]">{currentMode?.icon}</span>
            <span className="text-[13px] font-medium text-text-primary">
              {currentMode?.label}
            </span>
            <div className="mx-2 h-[14px] w-px bg-bg-elevated" />
            <span className="rounded-full bg-bg-tertiary px-2.5 py-0.5 text-[11px] text-text-muted">
              Indian Jurisdiction
            </span>
          </div>
        ) : (
          <h2 className="text-[13px] font-medium text-text-primary">{pageTitle}</h2>
        )}
      </div>

      {/* Right: Actions + User menu */}
      <div className="ml-auto flex items-center gap-2">
        {pathname === '/chat' && (
          <button
            onClick={handleNewChat}
            className="flex items-center gap-1.5 rounded-md border border-border-default px-2.5 py-1 text-[11px] text-text-muted transition-colors hover:border-gold-border hover:text-gold"
          >
            <Plus size={14} strokeWidth={1.5} />
            New chat
          </button>
        )}

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
