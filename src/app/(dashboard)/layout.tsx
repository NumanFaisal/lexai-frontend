'use client';

import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from '@/components/layout/Sidebar';
import TopBar from '@/components/layout/TopBar';
import LoadingScreen from '@/components/ui/LoadingScreen';
import { useAppSelector } from '@/store';
import { pageTransition } from '@/lib/animations';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { isInitialized, isAuthenticated } = useAppSelector((s) => s.auth);

  // Show loading screen during auth hydration
  if (!isInitialized) {
    return <LoadingScreen />;
  }

  // If not authenticated and initialized, proxy should redirect — but guard anyway
  if (!isAuthenticated) {
    return <LoadingScreen />;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-bg-primary">
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
