'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function Page() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setError(null);
    setLoading(true);

    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL || 'https://localhost:4000';
      const response = await axios.post(`${apiBase}/api/v1/auth/signin`, {
        email,
        password,
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
        'An error occurred during login.';
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
              Welcome back.
            </h1>
            <p className="text-primary-container/80 text-body-ui font-body-ui">
              India's AI legal assistant
            </p>
          </div>

          <div className="gap-small mt-small flex">
            <div className="bg-border-default h-2 w-2 rounded-full"></div>
            <div className="bg-primary-container h-2 w-2 rounded-full"></div>
          </div>
        </header>

        <div className="px-major pb-major space-y-section">
          {error && (
            <div className="border-error/20 bg-error/10 text-error rounded-lg border p-3 text-center text-xs">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-section">
            <div className="space-y-4">
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
              <span>{loading ? 'Logging in...' : 'Log In'}</span>
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
            By logging in you agree to our Terms. We don't share your legal queries.
          </p>
          <Link
            className="text-primary-container hover:text-gold-hover text-sub-heading font-sub-heading inline-block transition-colors"
            href="/auth/signup"
          >
            Don't have an account? Sign up
          </Link>
        </footer>
      </main>
    </>
  );
}
