'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Check, ArrowRight, SkipForward } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '@/store';
import { updatePersona } from '@/store/slices/authSlice';
import { setInputValue } from '@/store/slices/chatSlice';
import { updateUserData } from '@/lib/auth';
import { PERSONA_DATA } from '@/lib/mock-data';
import { listItemStagger } from '@/lib/animations';
import toast from 'react-hot-toast';
import type { Persona } from '@/lib/types';

type PersonaKey = 'advocate' | 'business' | 'student';

export default function OnboardPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((s) => s.auth);
  const [selected, setSelected] = useState<PersonaKey | null>(
    (user?.persona as PersonaKey) || null
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Rule: Already onboarded → redirect to /chat
  useEffect(() => {
    if (user?.hasCompletedOnboarding) {
      router.replace('/chat');
    }
  }, [user?.hasCompletedOnboarding, router]);

  if (user?.hasCompletedOnboarding) {
    return null;
  }

  const handleContinue = async () => {
    if (!selected) return;
    setIsSubmitting(true);

    // Optimistic update
    dispatch(updatePersona(selected));

    // Persist to localStorage for registered users
    if (user?.email) {
      updateUserData(user.email, {
        persona: selected,
        hasCompletedOnboarding: true,
      });
    }

    // Set example query for persona
    const personaData = PERSONA_DATA[selected];
    dispatch(setInputValue(personaData.exampleQuery));

    toast.success("Welcome to LexAI! Here's your first example query.");
    router.push('/chat');
  };

  const handleSkip = () => {
    dispatch(updatePersona(null as Persona));
    if (user?.email) {
      updateUserData(user.email, {
        persona: null,
        hasCompletedOnboarding: true,
      });
    }
    toast.success('Welcome to LexAI!');
    router.push('/chat');
  };

  return (
    <div className="flex h-full items-center justify-center p-6">
      <div className="w-full max-w-[640px]">
        <div className="text-center">
          <h1 className="text-text-primary font-serif text-[30px] leading-[1.25] font-semibold">
            Choose your path
          </h1>
          <p className="text-text-secondary mt-3 text-[13px] leading-relaxed">
            Select how you&apos;ll primarily use LexAI. This personalizes your experience with
            relevant tools, templates, and query suggestions.
          </p>
        </div>

        <motion.div
          className="mt-8 space-y-3"
          variants={listItemStagger.container}
          initial="initial"
          animate="animate"
        >
          {(Object.entries(PERSONA_DATA) as [PersonaKey, (typeof PERSONA_DATA)[PersonaKey]][]).map(
            ([key, data]) => {
              const isSelected = selected === key;
              return (
                <motion.button
                  key={key}
                  variants={listItemStagger.item}
                  onClick={() => setSelected(key)}
                  className={`relative w-full rounded-2xl border p-7 text-left transition-all duration-200 ${
                    isSelected
                      ? 'bg-opacity-5 border-2'
                      : 'border-border-default bg-bg-secondary hover:border-opacity-60 hover:scale-[1.01]'
                  }`}
                  style={{
                    borderColor: isSelected ? data.color : undefined,
                    backgroundColor: isSelected ? `${data.color}0D` : undefined,
                  }}
                >
                  {/* Selected checkmark */}
                  {isSelected && (
                    <div
                      className="absolute top-4 right-4 flex h-5 w-5 items-center justify-center rounded-full"
                      style={{ backgroundColor: data.color }}
                    >
                      <Check size={12} strokeWidth={2} className="text-bg-primary" />
                    </div>
                  )}

                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div
                      className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full text-[28px]"
                      style={{
                        backgroundColor: `${data.color}26`,
                      }}
                    >
                      {data.icon}
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="text-text-primary font-serif text-[18px] font-semibold">
                        {data.title}
                      </h3>
                      <p className="text-text-secondary mt-1 text-[13px] leading-relaxed">
                        {data.description}
                      </p>
                      <p className="text-text-muted mt-2 text-[11px]">{data.useCases}</p>
                    </div>
                  </div>
                </motion.button>
              );
            }
          )}
        </motion.div>

        <div className="mt-8 flex items-center gap-3">
          <button
            onClick={handleContinue}
            disabled={!selected || isSubmitting}
            className="bg-gold text-bg-primary hover:bg-gold-hover flex flex-1 items-center justify-center gap-2 rounded-[10px] px-5 py-3 text-[13px] font-medium transition-colors duration-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isSubmitting ? 'Setting up...' : 'Continue'}
            {!isSubmitting && <ArrowRight size={16} strokeWidth={1.5} />}
          </button>
          <button
            onClick={handleSkip}
            className="border-border-default text-text-muted hover:border-gold-border hover:text-text-secondary flex items-center gap-1.5 rounded-[10px] border px-4 py-3 text-[13px] transition-colors"
          >
            <SkipForward size={14} strokeWidth={1.5} />
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
}
