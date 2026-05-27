'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
};

export default function AuthCallbackPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const syncAttempted = useRef(false);

  useEffect(() => {
    const token = getCookie('token');
    if (!token) {
      router.push('/auth/login');
      return;
    }

    if (syncAttempted.current) return;
    syncAttempted.current = true;

    const handleCallback = async () => {
      try {
        const apiBase = process.env.NEXT_PUBLIC_API_URL || 'https://localhost:4000';

        const response = await axios.get(
          `${apiBase}/api/v1/auth/me`,
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
          // Fallback to ADVOCATE dashboard
          router.push('/dashboard/advocate');
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
  }, [router]);

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
