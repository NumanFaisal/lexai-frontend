'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import api from '../../../lib/axios';
import { useAppDispatch } from '@/store';
import { setUser } from '@/store/slices/authSlice';
// import { registerUser, authenticateUser } from '@/lib/auth';
import { pageTransition } from '@/lib/animations';
import type { User } from '@/lib/types';

export default function SignupPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    persona: 'advocate',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.username || !formData.email || !formData.password) {
      setError('Please fill in all required fields');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setIsLoading(true);

    try {
      const response = await api.post('/auth/signup', {
        email: formData.email,
        password: formData.password,
        username: formData.username,
        persona: formData.persona.toUpperCase()
      });

      const result = response.data;

      if (result.success) {
        localStorage.setItem('token', result.data.token);

        // 2. ADD THIS LINE for Next.js Middleware
        document.cookie = `token=${result.data.token}; path=/; max-age=86400; SameSite=Lax`;

        const backendUser = result.data.user;

        const userForRedux: User = {
          id: backendUser.id,
          username: backendUser.username,
          email: backendUser.email,
          persona: backendUser.persona ? backendUser.persona.toLowerCase() as any : null,
          plan: 'free' as const,
          queriesLimit: backendUser.queriesLimit ?? 30,
          queriesUsed: backendUser.queriesUsed ?? 0,
          hasCompletedOnboarding: backendUser.hasCompletedOnboarding ?? false,
          avatarInitials: backendUser.avatarInitials || (backendUser.username || '')
            .split(' ')
            .map((n: string) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2),
          createdAt: backendUser.createdAt || new Date().toISOString(),
        };

        dispatch(setUser(userForRedux));
        router.push('/onboard');
      } else {
        setError(result.message || 'Registration failed');
      }

    } catch (err: any) {
      console.error('Signup Error:', err);

      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Network error. Is the backend server running?');
      }
    } finally {
      setIsLoading(false);
    }
  };
    

  return (
    <motion.div {...pageTransition} className="space-y-6">
      {/* Sign Up / Login Switcher Tabs */}
      <div className="border-border-default/60 mb-6 flex gap-8 border-b pb-3">
        <Link
          href="/signup"
          className="text-gold border-gold -mb-[14px] border-b-2 pb-3 font-serif text-[22px] font-semibold"
        >
          Sign Up
        </Link>
        <Link
          href="/login"
          className="text-text-muted hover:text-text-secondary -mb-[14px] pb-3 font-serif text-[22px] font-semibold transition-colors"
        >
          Login
        </Link>
      </div>

      <div>
        <h2 className="text-text-primary font-serif text-[24px] font-semibold">
          Create your account
        </h2>
        <p className="text-text-secondary mt-1 text-[13px]">
          Start with 30 free queries. No credit card.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* I am a... (Persona Selector) */}
        <div>
          <label className="text-text-secondary mb-2 block text-[13px] font-medium">
            I am a...
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'advocate', label: 'Advocate' },
              { id: 'business', label: 'Business' },
              { id: 'student', label: 'Student' },
            ].map((role) => {
              const isActive = formData.persona === role.id;
              return (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => updateField('persona', role.id)}
                  className={`rounded-[6px] border px-3 py-2 font-sans text-[12px] font-medium tracking-wide transition-all ${
                    isActive
                      ? 'bg-gold/10 border-gold text-gold font-bold'
                      : 'bg-bg-secondary border-border-default text-text-secondary hover:border-text-muted hover:text-text-primary'
                  }`}
                >
                  {role.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Inputs */}
        <div className="space-y-3">
          <div>
            <input
              id="username"
              type="text"
              value={formData.username}
              onChange={(e) => updateField('username', e.target.value)}
              placeholder="Full Name"
              className="border-border-default text-text-primary placeholder:text-text-muted focus:border-gold-border w-full rounded-[6px] border bg-[#0a0a0b] px-4 py-3 text-[13px] transition-colors duration-200 outline-none"
            />
          </div>

          <div>
            <input
              id="signup-email"
              type="email"
              value={formData.email}
              onChange={(e) => updateField('email', e.target.value)}
              placeholder="Email Address"
              className="border-border-default text-text-primary placeholder:text-text-muted focus:border-gold-border w-full rounded-[6px] border bg-[#0a0a0b] px-4 py-3 text-[13px] transition-colors duration-200 outline-none"
              autoComplete="email"
            />
          </div>

          <div>
            <input
              id="signup-phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => {
                const val = e.target.value;
                if (/^[+0-9\s-]*$/.test(val)) {
                  updateField('phone', val);
                }
              }}
              placeholder="+91 Phone Number"
              className="border-border-default text-text-primary placeholder:text-text-muted focus:border-gold-border w-full rounded-[6px] border bg-[#0a0a0b] px-4 py-3 text-[13px] transition-colors duration-200 outline-none"
            />
          </div>

          <div className="relative">
            <input
              id="signup-password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={(e) => updateField('password', e.target.value)}
              placeholder="Password"
              className="border-border-default text-text-primary placeholder:text-text-muted focus:border-gold-border w-full rounded-[6px] border bg-[#0a0a0b] px-4 py-3 pr-10 text-[13px] transition-colors duration-200 outline-none"
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-text-muted hover:text-text-secondary absolute top-1/2 right-3 -translate-y-1/2"
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
          <p className="bg-error/10 text-error rounded-lg px-3 py-2 text-[12px]">{error}</p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full cursor-pointer rounded-[6px] bg-[#c9a84c] py-3 text-[13px] font-bold tracking-wide text-[#0A0A0B] transition-all duration-200 hover:bg-[#e8c96a] active:scale-[0.98] disabled:opacity-60"
        >
          {isLoading ? 'Creating account...' : 'Create Account'}
        </button>
      </form>

      {/* Or continue with */}
      <div className="space-y-4">
        <div className="relative flex items-center py-1">
          <div className="border-border-default/60 flex-grow border-t"></div>
          <span className="text-text-muted mx-4 flex-shrink font-mono text-[11px] tracking-wider uppercase">
            or continue with
          </span>
          <div className="border-border-default/60 flex-grow border-t"></div>
        </div>

        <button
          type="button"
          onClick={() => {
            console.log("Google Auth Placeholder");
          }}
          className="border-border-default text-text-primary hover:bg-bg-secondary hover:border-text-muted flex w-full cursor-pointer items-center justify-center gap-3 rounded-[6px] border bg-[#0a0a0b] py-3 text-[13px] font-medium transition-colors duration-200"
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

      {/* Redirect footer */}
      <div className="text-center">
        <p className="text-text-secondary text-[13px]">
          Already have an account?{' '}
          <Link href="/login" className="text-gold hover:text-gold-hover font-semibold underline">
            Login
          </Link>
        </p>

        <p className="text-text-muted mx-auto mt-4 max-w-[320px] text-[10px] leading-relaxed">
          By registering, you agree to our Terms of Service & Privacy Policy.
          <br />
          Compliant with IT Act 2000.
        </p>
      </div>
    </motion.div>
  );
}
