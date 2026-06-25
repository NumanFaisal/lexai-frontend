'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useAppDispatch } from '@/store';
import { setUser } from '@/store/slices/authSlice';
import { authenticateUser } from '@/lib/auth';
import { pageTransition } from '@/lib/animations';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const callbackUrl = searchParams.get('callbackUrl') || '/chat';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    // Simulate network delay
    await new Promise((r) => setTimeout(r, 600));

    const result = authenticateUser(email, password);

    if (result.success && result.user) {
      dispatch(setUser(result.user));

      if (!result.user.hasCompletedOnboarding) {
        router.push('/onboard');
      } else {
        router.push(callbackUrl);
      }
    } else {
      setError(result.error || 'Invalid credentials');
      setIsLoading(false);
    }
  };

  return (
    <motion.div {...pageTransition}>
      <div className="rounded-2xl border border-border-default bg-bg-secondary p-8">
        <h2 className="font-serif text-2xl font-semibold text-text-primary">
          Welcome back
        </h2>
        <p className="mt-2 text-[13px] text-text-secondary">
          Sign in to continue to LexAI
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-[13px] font-medium text-text-secondary"
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-[10px] border border-border-default bg-bg-primary px-4 py-2.5 text-[13px] text-text-primary placeholder:text-text-disabled outline-none transition-colors duration-200 focus:border-gold-border"
              autoComplete="email"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1.5 block text-[13px] font-medium text-text-secondary"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full rounded-[10px] border border-border-default bg-bg-primary px-4 py-2.5 pr-10 text-[13px] text-text-primary placeholder:text-text-disabled outline-none transition-colors duration-200 focus:border-gold-border"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary"
              >
                {showPassword ? (
                  <EyeOff size={16} strokeWidth={1.5} />
                ) : (
                  <Eye size={16} strokeWidth={1.5} />
                )}
              </button>
            </div>
          </div>

          {error && (
            <p className="rounded-lg bg-error/10 px-3 py-2 text-[12px] text-error">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full items-center justify-center gap-2 rounded-[10px] bg-gold px-5 py-2.5 text-[13px] font-medium text-bg-primary transition-colors duration-200 hover:bg-gold-hover active:scale-[0.98] disabled:opacity-60"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
            {!isLoading && <ArrowRight size={16} strokeWidth={1.5} />}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-[12px] text-text-muted">
            Demo accounts: <code className="font-mono text-gold">demo@lexai.in</code> or{' '}
            <code className="font-mono text-gold">new@lexai.in</code>
            <br />
            Password: <code className="font-mono text-gold">password123</code>
          </p>
        </div>
      </div>

      <p className="mt-6 text-center text-[13px] text-text-secondary">
        Don&apos;t have an account?{' '}
        <Link
          href="/signup"
          className="text-gold underline decoration-dotted underline-offset-2 hover:text-gold-hover"
        >
          Create account
        </Link>
      </p>
    </motion.div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="text-center py-8 text-text-muted text-[13px]">Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}
