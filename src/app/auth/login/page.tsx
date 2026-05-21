'use client';

import { useState } from 'react';
import { useSignIn } from '@clerk/nextjs';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const getClerkErrorMessage = (err: any): string => {
  if (!err) return 'An unknown error occurred.';
  if (err.errors && Array.isArray(err.errors) && err.errors.length > 0) {
    return err.errors[0].longMessage || err.errors[0].message || err.message;
  }
  return err.longMessage || err.message || String(err);
};

export default function Page() {
  const { signIn } = useSignIn();
  const router = useRouter();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signIn || !identifier || !password) return;

    setError(null);
    setLoading(true);

    try {
      const createRes = await signIn.create({
        identifier,
        password,
      });

      if (createRes.error) {
        setError(getClerkErrorMessage(createRes.error));
        setLoading(false);
        return;
      }

      if (signIn.status === 'complete') {
        router.push('/auth/callback');
      } else {
        console.error('Sign in not complete:', signIn);
        setError('Login succeeded but verification is incomplete.');
        setLoading(false);
      }
    } catch (err: any) {
      console.error(err);
      setError(getClerkErrorMessage(err));
      setLoading(false);
    }
  };

  const handleGoogleSSO = async () => {
    if (!signIn) return;
    setError(null);
    setLoading(true);
    try {
      const res = await signIn.sso({
        strategy: 'oauth_google',
        redirectUrl: '/auth/callback',
        redirectCallbackUrl: window.location.origin + '/sso-callback',
      });
      if (res?.error) {
        setError(getClerkErrorMessage(res.error));
        setLoading(false);
      }
    } catch (err: any) {
      setLoading(false);
      setError(getClerkErrorMessage(err));
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
          <div id="clerk-captcha" />
          {error && (
            <div className="border-error/20 bg-error/10 text-error rounded-lg border p-3 text-center text-xs">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-section">
            <div className="space-y-4">
              <div className="space-y-small">
                <label className="text-text-secondary text-sub-heading font-sub-heading block">
                  Username or Email
                </label>
                <div className="bg-bg-tertiary border-border-default focus-within:border-gold-border focus-within:ring-gold-border relative flex h-12 items-center rounded-lg border transition-all duration-200 focus-within:ring-1">
                  <div className="pl-standard pr-small border-border-default bg-surface-container-low flex h-full items-center rounded-l-lg border-r py-2 select-none">
                    <span className="material-symbols-outlined text-[20px] text-text-secondary">person</span>
                  </div>
                  <input
                    className="text-text-primary placeholder:text-text-muted px-standard h-full w-full flex-1 border-none bg-transparent text-[15px] tracking-wide focus:ring-0 outline-none"
                    placeholder="john_doe or john@example.com"
                    type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
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

          <div className="py-small relative flex items-center">
            <div className="border-border-default flex-grow border-t"></div>
            <span className="mx-standard text-text-muted text-meta-small font-meta-small flex-shrink-0 tracking-wider uppercase">
              or continue with
            </span>
            <div className="border-border-default flex-grow border-t"></div>
          </div>

          <button
            type="button"
            onClick={handleGoogleSSO}
            disabled={loading}
            className={`border-border-default hover:bg-bg-tertiary hover:border-text-secondary text-text-primary font-sub-heading text-sub-heading px-standard gap-small flex w-full items-center justify-center rounded-lg border bg-transparent py-3 transition-colors ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              ></path>
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              ></path>
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              ></path>
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              ></path>
            </svg>
            <span>Google</span>
          </button>
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
