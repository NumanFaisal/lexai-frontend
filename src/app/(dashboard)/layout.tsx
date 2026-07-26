'use client';

import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from '@/components/layout/Sidebar';
import TopBar from '@/components/layout/TopBar';
import LoadingScreen from '@/components/ui/LoadingScreen';
import { useAppDispatch, useAppSelector } from '@/store';
import { pageTransition } from '@/lib/animations';
import api from '@/lib/axios';
import { useEffect } from 'react';
import { clearUser, setInitialized, setUser } from '@/store/slices/authSlice';
import { setConversations } from '@/store/slices/chatSlice';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isInitialized, isAuthenticated } = useAppSelector((s) => s.auth);

  // 1. Hydrate the user session on first load
  useEffect(() => {
    const hydrateAuth = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        dispatch(clearUser());
        router.push('/login');
        return;
      }

      try {
        // Fetch the user data from your backend
        const response = await api.get('/auth/me');
        const backendUser = response.data.data;

        // Map it to your Redux state
        dispatch(setUser({
          id: backendUser.id,
          username: backendUser.name,
          email: backendUser.email,
          persona: backendUser.persona ? backendUser.persona.toLowerCase() as any : null,
          plan: 'free' as const,
          queriesLimit: 30, // Fallbacks
          queriesUsed: 0,
          hasCompletedOnboarding: true, 
          avatarInitials: (backendUser.name || 'U').substring(0, 2).toUpperCase(),
          createdAt: new Date().toISOString(),
        }));
      } catch (error) {
        console.error('Failed to hydrate session:', error);
        localStorage.removeItem('token');
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        dispatch(clearUser());
        router.push('/login');
      } finally {
        // Stop the loading screen!
        dispatch(setInitialized());
      }
    };

    if (!isInitialized) {
      hydrateAuth();
    }
  }, [isInitialized, dispatch, router]);

  // Fetch actual user conversations list on mount/auth state change
  useEffect(() => {
    if (isAuthenticated) {
      const fetchConversations = async () => {
        try {
          const response = await api.get('/chat/conversations');
          if (response.data.success && response.data.data) {
            dispatch(setConversations(response.data.data));
          }
        } catch (err) {
          console.error('Failed to fetch conversations on mount:', err);
        }
      };
      fetchConversations();
    }
  }, [isAuthenticated, dispatch]);


  // 2. Show loading screen during auth hydration
  if (!isInitialized) {
    return <LoadingScreen />;
  }

  // 3. Fallback guard
  if (!isAuthenticated) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="bg-bg-primary flex h-screen overflow-hidden">
      {/* Sidebar — persists, never unmounts */}
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        {/* TopBar — persists, content changes based on active route */}
        <TopBar />

        {/* Main content — only this area transitions */}
        <main className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={pageTransition.initial}
              animate={pageTransition.animate}
              exit={pageTransition.exit}
              transition={pageTransition.transition}
              className="h-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
