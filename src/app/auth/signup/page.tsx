'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function Page() {
  const router = useRouter();
  const [selectedPersona, setSelectedPersona] = useState<'ADVOCATE' | 'BUSINESS' | 'STUDENT'>('ADVOCATE');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !email || !password) return;

    setError(null);
    setLoading(true);

    try {
      localStorage.setItem('lexai_signup_role', selectedPersona);
      const apiBase = process.env.NEXT_PUBLIC_API_URL || 'https://localhost:4000';
      
      const response = await axios.post(`${apiBase}/api/v1/auth/signup`, {
        username,
        email,
        password,
        persona: selectedPersona,
      });

      const { token } = response.data?.data || {};

      if (!token) {
        throw new Error('No authentication token received.');
      }

      // Save token in cookie
      document.cookie = `token=${token}; path=/; max-age=604800; SameSite=Lax`;

      // Redirect to Auth Callback to sync and check persona
      router.push('/auth/callback');
    } catch (err: any) {
      console.error(err);
      const errMsg =
        err.response?.data?.error?.message ||
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        'An error occurred during signup.';
      setError(typeof errMsg === 'object' ? JSON.stringify(errMsg) : String(errMsg));
      setLoading(false);
    }
  };

  return (
    <>
      <main className="bg-bg-secondary border-t-primary-container border-border-default relative z-10 flex w-full max-w-[400px] flex-col overflow-hidden rounded-xl border-x border-t-[3px] border-b shadow-2xl">
        <header className="pt-major px-major pb-section gap-standard flex flex-col items-center text-center">
          <div className="gap-small text-primary-container flex items-center">
            <span className="material-symbols-outlined text-2xl">balance</span>
            <span className="font-logo text-logo">LexAI</span>
          </div>

          <div className="space-y-micro">
            <h1 className="text-[22px] leading-tight font-semibold text-white">
              Start for free. No credit card.
            </h1>
            <p className="text-primary-container/80 text-body-ui font-body-ui">
              India's AI legal assistant
            </p>
          </div>

          <div className="gap-small mt-small flex">
            <div className="bg-primary-container h-2 w-2 rounded-full"></div>
            <div className="bg-border-default h-2 w-2 rounded-full"></div>
          </div>
        </header>

        <div className="px-major pb-major space-y-section">
          {error && (
            <div className="border-error/20 bg-error/10 text-error rounded-lg border p-3 text-center text-xs">
              {error}
            </div>
          )}

          <form onSubmit={handleSignUp} className="space-y-section">
            <div className="space-y-small">
              <label className="text-text-secondary text-sub-heading font-sub-heading block">
                I want to use LexAI as a:
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedPersona('ADVOCATE')}
                  className={`flex flex-col items-center justify-center rounded-lg border py-3 px-2 gap-1.5 transition-all duration-200 focus:outline-none ${
                    selectedPersona === 'ADVOCATE'
                      ? 'bg-primary-container/10 border-primary-container text-primary-container shadow-[0_0_12px_rgba(201,168,76,0.15)]'
                      : 'bg-bg-tertiary border-border-default text-text-muted hover:border-text-secondary hover:text-text-primary'
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px]">balance</span>
                  <span className="text-[12px] font-medium leading-none">Advocate</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedPersona('BUSINESS')}
                  className={`flex flex-col items-center justify-center rounded-lg border py-3 px-2 gap-1.5 transition-all duration-200 focus:outline-none ${
                    selectedPersona === 'BUSINESS'
                      ? 'bg-[#7b9e87]/10 border-[#7b9e87] text-[#7b9e87] shadow-[0_0_12px_rgba(123,158,135,0.15)]'
                      : 'bg-bg-tertiary border-border-default text-text-muted hover:border-text-secondary hover:text-text-primary'
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px]">domain</span>
                  <span className="text-[12px] font-medium leading-none">Business</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedPersona('STUDENT')}
                  className={`flex flex-col items-center justify-center rounded-lg border py-3 px-2 gap-1.5 transition-all duration-200 focus:outline-none ${
                    selectedPersona === 'STUDENT'
                      ? 'bg-[#64b5f6]/10 border-[#64b5f6] text-[#64b5f6] shadow-[0_0_12px_rgba(100,181,246,0.15)]'
                      : 'bg-bg-tertiary border-border-default text-text-muted hover:border-text-secondary hover:text-text-primary'
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px]">school</span>
                  <span className="text-[12px] font-medium leading-none">Student</span>
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-small">
                <label className="text-text-secondary text-sub-heading font-sub-heading block">
                  Username
                </label>
                <div className="bg-bg-tertiary border-border-default focus-within:border-gold-border focus-within:ring-gold-border relative flex h-12 items-center rounded-lg border transition-all duration-200 focus-within:ring-1">
                  <div className="pl-standard pr-small border-border-default bg-surface-container-low flex h-full items-center rounded-l-lg border-r py-2 select-none">
                    <span className="material-symbols-outlined text-[20px] text-text-secondary">person</span>
                  </div>
                  <input
                    className="text-text-primary placeholder:text-text-muted px-standard h-full w-full flex-1 border-none bg-transparent text-[15px] tracking-wide focus:ring-0 outline-none"
                    placeholder="john_doe"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-small">
                <label className="text-text-secondary text-sub-heading font-sub-heading block">
                  Email Address
                </label>
                <div className="bg-bg-tertiary border-border-default focus-within:border-gold-border focus-within:ring-gold-border relative flex h-12 items-center rounded-lg border transition-all duration-200 focus-within:ring-1">
                  <div className="pl-standard pr-small border-border-default bg-surface-container-low flex h-full items-center rounded-l-lg border-r py-2 select-none">
                    <span className="material-symbols-outlined text-[20px] text-text-secondary">mail</span>
                  </div>
                  <input
                    className="text-text-primary placeholder:text-text-muted px-standard h-full w-full flex-1 border-none bg-transparent text-[15px] tracking-wide focus:ring-0 outline-none"
                    placeholder="john@example.com"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-small">
                <label className="text-text-secondary text-sub-heading font-sub-heading block">
                  Password
                </label>
                <div className="bg-bg-tertiary border-border-default focus-within:border-gold-border focus-within:ring-gold-border relative flex h-12 items-center rounded-lg border transition-all duration-200 focus-within:ring-1">
                  <div className="pl-standard pr-small border-border-default bg-surface-container-low flex h-full items-center rounded-l-lg border-r py-2 select-none">
                    <span className="material-symbols-outlined text-[20px] text-text-secondary">lock</span>
                  </div>
                  <input
                    className="text-text-primary placeholder:text-text-muted px-standard h-full w-full flex-1 border-none bg-transparent text-[15px] tracking-wide focus:ring-0 outline-none"
                    placeholder="••••••••"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`bg-primary-container hover:bg-gold-hover text-on-primary font-sub-heading text-sub-heading px-standard gap-small group flex w-full items-center justify-center rounded-lg py-3 transition-colors ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <span>{loading ? 'Signing up...' : 'Sign Up'}</span>
              {!loading && (
                <span className="material-symbols-outlined text-[18px] transition-transform group-hover:translate-x-1">
                  arrow_forward
                </span>
              )}
            </button>
          </form>
        </div>

        <footer className="bg-bg-tertiary px-major py-section border-border-default space-y-standard border-t text-center">
          <p className="text-text-muted mx-auto max-w-[280px] text-[11px] leading-relaxed">
            By signing up you agree to our Terms. We don't share your legal queries.
          </p>
          <Link
            className="text-primary-container hover:text-gold-hover text-sub-heading font-sub-heading inline-block transition-colors"
            href="/auth/login"
          >
            Already have an account? Log in
          </Link>
        </footer>
      </main>
    </>
  );
}
