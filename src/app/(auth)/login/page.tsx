'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import { useAppDispatch } from '@/store';
import { setUser } from '@/store/slices/authSlice';
import { authenticateUser } from '@/lib/auth';
import { pageTransition } from '@/lib/animations';
import api from '@/lib/axios';
import { User } from '@/lib/types';

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
    
    try {
      const response = await api.post('/auth/signin', {
        email,
        password,
      });

      const result = response.data;

      if (result.success) {
        // Save token
        localStorage.setItem('token', result.data.token);

        // 2. ADD THIS LINE for Next.js Middleware
  document.cookie = `token=${result.data.token}; path=/; max-age=86400; SameSite=Lax`;

        const backendUser = result.data.user;

        // Format user data for redux store 
        const userForRedux: User = {
          id: backendUser.id,
          username: backendUser.name || backendUser.username, 
          email: backendUser.email,
          persona: backendUser.persona ? backendUser.persona.toLowerCase() as any : null,
          plan: 'free' as const,
          queriesLimit: backendUser.queriesLimit ?? 30,
          queriesUsed: backendUser.queriesUsed ?? 0,
          hasCompletedOnboarding: backendUser.hasCompletedOnboarding ?? false,
          avatarInitials: backendUser.avatarInitials || (backendUser.name || backendUser.username || '')
            .split(' ')
            .map((n: string) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2),
          createdAt: backendUser.createdAt || new Date().toISOString(),
        };

        // Dispatch to store
        dispatch(setUser(userForRedux));

        //Redirect routing based on onboarding status
        if (!userForRedux.hasCompletedOnboarding) {
          router.push('/onboard');
        } else {
          router.push(callbackUrl);
        }
      }

    } catch (err: any) {
      console.error('Login Error:', err);

      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Invalid credentials or network error.');
      }
    } finally {
      setIsLoading(false);
    }

  };

  // Helper for the Demo Account button to also use the actual API
  const handleDemoLogin = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const response = await api.post('/auth/signin', {
        email: 'demo@lexai.in',
        password: 'password123',
      });
      
      const result = response.data;
      if (result.success) {
        localStorage.setItem('token', result.data.token);
        const backendUser = result.data.user;
        const userForRedux: User = {
          id: backendUser.id,
          username: backendUser.name || backendUser.username,
          email: backendUser.email,
          persona: backendUser.persona ? backendUser.persona.toLowerCase() as any : null,
          plan: 'free' as const,
          queriesLimit: backendUser.queriesLimit ?? 30,
          queriesUsed: backendUser.queriesUsed ?? 0,
          hasCompletedOnboarding: backendUser.hasCompletedOnboarding ?? false,
          avatarInitials: backendUser.avatarInitials || 'DE',
          createdAt: backendUser.createdAt || new Date().toISOString(),
        };
        
        dispatch(setUser(userForRedux));
        router.push('/chat');
      }
    } catch (err: any) {
      setError('Demo account not found on backend. Please create it first.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div {...pageTransition} className="space-y-6">
      {/* Sign Up / Login Switcher Tabs */}
      <div className="flex gap-8 border-b border-border-default/60 pb-3 mb-6">
        <Link
          href="/signup"
          className="font-serif text-[22px] font-semibold text-text-muted hover:text-text-secondary pb-3 -mb-[14px] transition-colors"
        >
          Sign Up
        </Link>
        <Link
          href="/login"
          className="font-serif text-[22px] font-semibold text-gold border-b-2 border-gold pb-3 -mb-[14px]"
        >
          Login
        </Link>
      </div>

      <div>
        <h2 className="font-serif text-[24px] font-semibold text-text-primary">
          Welcome back
        </h2>
        <p className="mt-1 text-[13px] text-text-secondary">
          Sign in to continue to LexAI
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-3">
          <div>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className="w-full rounded-[6px] border border-border-default bg-[#0a0a0b] px-4 py-3 text-[13px] text-text-primary placeholder:text-text-muted outline-none transition-colors duration-200 focus:border-gold-border"
              autoComplete="email"
            />
          </div>

          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full rounded-[6px] border border-border-default bg-[#0a0a0b] px-4 py-3 pr-10 text-[13px] text-text-primary placeholder:text-text-muted outline-none transition-colors duration-200 focus:border-gold-border"
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary"
            >
              {showPassword ? (
                <EyeOff size={15} strokeWidth={1.5} />
              ) : (
                <Eye size={15} strokeWidth={1.5} />
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
          className="w-full bg-[#c9a84c] hover:bg-[#e8c96a] text-[#0A0A0B] py-3 rounded-[6px] text-[13px] font-bold tracking-wide transition-all duration-200 active:scale-[0.98] disabled:opacity-60 cursor-pointer"
        >
          {isLoading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>

      {/* Or continue with */}
      <div className="space-y-4">
        <div className="relative flex py-1 items-center">
          <div className="flex-grow border-t border-border-default/60"></div>
          <span className="flex-shrink mx-4 text-text-muted text-[11px] font-mono uppercase tracking-wider">
            or continue with
          </span>
          <div className="flex-grow border-t border-border-default/60"></div>
        </div>

        <button
          type="button"
          onClick={() => {
            console.log('Google Auth Placeholder');
          }}
          className="w-full flex items-center justify-center gap-3 rounded-[6px] border border-border-default bg-[#0a0a0b] py-3 text-[13px] text-text-primary font-medium hover:bg-bg-secondary hover:border-text-muted transition-colors duration-200 cursor-pointer"
        >
          <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24">
            <path
              fill="#EA4335"
              d="M5.2662 9.7656C6.1995 6.9776 8.8139 5 11.9014 5C13.6543 5 15.2236 5.625 16.46 6.6478L19.822 3.2858C17.747 1.3544 14.9602 0.25 11.9014 0.25C7.29 0.25 3.3216 2.8711 1.3203 6.7109L5.2662 9.7656Z"
            />
            <path
              fill="#4285F4"
              d="M23.49 12.275c0-.825-.075-1.62-.21-2.385H11.9v4.515h6.51c-.28 1.485-1.12 2.745-2.38 3.585l3.69 2.865c2.16-1.995 3.77-4.935 3.77-8.58z"
            />
            <path
              fill="#FBBC05"
              d="M5.266 14.234c-.24-.72-.376-1.488-.376-2.284s.136-1.564.376-2.284L1.32 5.96C.478 7.66 0 9.56 0 11.55c0 1.99.478 3.89 1.32 5.59l3.946-3.906z"
            />
            <path
              fill="#34A853"
              d="M11.9 23.75c3.24 0 5.97-1.08 7.96-2.915l-3.69-2.865c-1.02.685-2.33 1.1-4.27 1.1-3.087 0-5.702-1.978-6.635-4.766L1.32 17.21c2.001 3.84 5.97 6.46 10.58 6.46z"
            />
          </svg>
          Google Sign-In
        </button>
      </div>

      {/* Demo Credentials */}
      <div className="rounded-[6px] border border-border-default/60 bg-bg-secondary/40 p-4 text-center">
        <p className="text-[11px] text-text-muted leading-relaxed">
          Demo Account: <code className="font-mono text-gold bg-bg-primary px-1.5 py-0.5 rounded">demo@lexai.in</code>
          <br />
          Password: <code className="font-mono text-gold bg-bg-primary px-1.5 py-0.5 rounded">password123</code>
        </p>
      </div>

      {/* Redirect Footer */}
      <div className="text-center">
        <p className="text-[13px] text-text-secondary">
          Don&apos;t have an account?{' '}
          <Link
            href="/signup"
            className="text-gold underline hover:text-gold-hover font-semibold"
          >
            Create account
          </Link>
        </p>
      </div>
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
