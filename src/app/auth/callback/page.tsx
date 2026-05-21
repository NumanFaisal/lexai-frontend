'use client';

import { useEffect, useState, useRef } from 'react';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import axios from 'axios';

type Persona = 'ADVOCATE' | 'BUSINESS' | 'STUDENT';

export default function AuthCallbackPage() {
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const syncAttempted = useRef(false);

  useEffect(() => {
    if (!isLoaded) return;

    if (!isSignedIn) {
      router.push('/auth/login');
      return;
    }

    if (syncAttempted.current) return;
    syncAttempted.current = true;

    const handleCallback = async () => {
      try {
        const token = await getToken();
        if (!token) {
          throw new Error('Authentication token not found');
        }

        const savedRole = localStorage.getItem('lexai_signup_role') as Persona | null;

        if (savedRole && ['ADVOCATE', 'BUSINESS', 'STUDENT'].includes(savedRole)) {
          try {
            await axios.post(
              `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/onboarding/persona`,
              { persona: savedRole },
              {
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            localStorage.removeItem('lexai_signup_role');
            router.push(`/dashboard/${savedRole.toLowerCase()}`);
          } catch (err: any) {
            console.error('Failed to save selected role:', err);
            throw err;
          }
        } else {
          try {
            const response = await axios.get(
              `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/me`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            const existingPersona = response.data?.data?.persona;
            if (existingPersona && ['ADVOCATE', 'BUSINESS', 'STUDENT'].includes(existingPersona)) {
              router.push(`/dashboard/${existingPersona.toLowerCase()}`);
            } else {
              // Fallback to ADVOCATE if no role is found on backend
              await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/onboarding/persona`,
                { persona: 'ADVOCATE' },
                {
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
              router.push('/dashboard/advocate');
            }
          } catch (err: any) {
            console.error('Failed to retrieve user persona:', err);
            throw err;
          }
        }
      } catch (err: any) {
        console.error('Authentication callback error:', err);
        setError(
          err.response?.data?.error?.message ||
          err.message ||
          'An error occurred during authentication synchronization.'
        );
      }
    };

    handleCallback();
  }, [isLoaded, isSignedIn, getToken, router]);

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#0A0A0B] text-white p-4">
        <div className="max-w-md w-full text-center space-y-4">
          <div className="border-error/20 bg-error/10 text-error rounded-lg border p-4 text-sm">
            {error}
          </div>
          <button
            onClick={() => {
              setError(null);
              syncAttempted.current = false;
              router.push('/auth/login');
            }}
            className="bg-primary-container hover:bg-gold-hover text-on-primary font-medium px-6 py-2.5 rounded-lg transition-colors"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0A0A0B] text-white">
      <div className="flex flex-col items-center gap-4">
        <div className="relative flex h-16 w-16 items-center justify-center">
          <div className="animate-ping absolute h-8 w-8 rounded-full bg-primary-container/20"></div>
          <span className="animate-spin material-symbols-outlined text-primary-container text-[40px]">
            balance
          </span>
        </div>
        <p className="text-text-secondary text-sm font-medium tracking-wide">
          Redirecting you to your workspace...
        </p>
      </div>
    </div>
  );
}
