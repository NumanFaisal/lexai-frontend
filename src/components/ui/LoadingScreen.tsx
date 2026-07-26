'use client';

import { useAppSelector } from '@/store';
import { motion } from 'framer-motion';
import { fadeIn } from '@/lib/animations';
import { Scale } from 'lucide-react';

export default function LoadingScreen() {
  const { isInitialized } = useAppSelector((s) => s.auth);

  if (isInitialized) return null;

  return (
    <motion.div
      className="bg-bg-primary fixed inset-0 z-50 flex items-center justify-center"
      {...fadeIn}
      exit={{ opacity: 0 }}
    >
      <div className="flex flex-col items-center gap-4">
        <div className="bg-gold flex h-12 w-12 items-center justify-center rounded-lg">
          <Scale className="text-bg-primary h-6 w-6" strokeWidth={1.5} />
        </div>
        <h1 className="text-text-primary font-serif text-2xl font-bold">LexAI</h1>
      </div>
    </motion.div>
  );
}
