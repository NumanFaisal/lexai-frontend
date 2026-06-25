'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Eye, EyeOff, ArrowRight, ChevronDown } from 'lucide-react';
import { useAppDispatch } from '@/store';
import { setUser } from '@/store/slices/authSlice';
import { registerUser } from '@/lib/auth';
import { pageTransition } from '@/lib/animations';

const PERSONAS = [
  { value: 'advocate', label: '⚖ Legal Advocate' },
  { value: 'business', label: '🏢 Business / SME' },
  { value: 'student', label: '📚 Law Student' },
];

export default function SignupPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    persona: '',
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

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 800));

    const result = registerUser({
      username: formData.username,
      email: formData.email,
      password: formData.password,
      persona: formData.persona || null,
    });

    if (result.success && result.user) {
      dispatch(setUser(result.user));
      router.push('/onboard');
    } else {
      setError(result.error || 'Registration failed');
      setIsLoading(false);
    }
  };

  return (
    <motion.div {...pageTransition}>
      <div className="rounded-2xl border border-border-default bg-bg-secondary p-8">
        <h2 className="font-serif text-2xl font-semibold text-text-primary">
          Create your account
        </h2>
        <p className="mt-2 text-[13px] text-text-secondary">
          Start using AI-powered legal research for India
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="username"
              className="mb-1.5 block text-[13px] font-medium text-text-secondary"
            >
              Full name
            </label>
            <input
              id="username"
              type="text"
              value={formData.username}
              onChange={(e) => updateField('username', e.target.value)}
              placeholder="Advocate Sharma"
              className="w-full rounded-[10px] border border-border-default bg-bg-primary px-4 py-2.5 text-[13px] text-text-primary placeholder:text-text-disabled outline-none transition-colors duration-200 focus:border-gold-border"
            />
          </div>

          <div>
            <label
              htmlFor="signup-email"
              className="mb-1.5 block text-[13px] font-medium text-text-secondary"
            >
              Email address
            </label>
            <input
              id="signup-email"
              type="email"
              value={formData.email}
              onChange={(e) => updateField('email', e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-[10px] border border-border-default bg-bg-primary px-4 py-2.5 text-[13px] text-text-primary placeholder:text-text-disabled outline-none transition-colors duration-200 focus:border-gold-border"
              autoComplete="email"
            />
          </div>

          <div>
            <label
              htmlFor="signup-password"
              className="mb-1.5 block text-[13px] font-medium text-text-secondary"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="signup-password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => updateField('password', e.target.value)}
                placeholder="At least 6 characters"
                className="w-full rounded-[10px] border border-border-default bg-bg-primary px-4 py-2.5 pr-10 text-[13px] text-text-primary placeholder:text-text-disabled outline-none transition-colors duration-200 focus:border-gold-border"
                autoComplete="new-password"
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

          <div>
            <label
              htmlFor="persona"
              className="mb-1.5 block text-[13px] font-medium text-text-secondary"
            >
              I am a... <span className="text-text-muted">(optional)</span>
            </label>
            <div className="relative">
              <select
                id="persona"
                value={formData.persona}
                onChange={(e) => updateField('persona', e.target.value)}
                className="w-full appearance-none rounded-[10px] border border-border-default bg-bg-primary px-4 py-2.5 pr-10 text-[13px] text-text-primary outline-none transition-colors duration-200 focus:border-gold-border"
              >
                <option value="">Select your role</option>
                {PERSONAS.map((p) => (
                  <option key={p.value} value={p.value}>
                    {p.label}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={16}
                strokeWidth={1.5}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text-muted"
              />
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
            {isLoading ? 'Creating account...' : 'Create Account'}
            {!isLoading && <ArrowRight size={16} strokeWidth={1.5} />}
          </button>
        </form>
      </div>

      <p className="mt-6 text-center text-[13px] text-text-secondary">
        Already have an account?{' '}
        <Link
          href="/login"
          className="text-gold underline decoration-dotted underline-offset-2 hover:text-gold-hover"
        >
          Sign in
        </Link>
      </p>
    </motion.div>
  );
}
