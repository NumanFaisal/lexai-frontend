'use client';

import { useState } from 'react';
import { useSignUp } from '@clerk/nextjs';
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
  const { signUp } = useSignUp();
  const router = useRouter();
  const [selectedPersona, setSelectedPersona] = useState<'ADVOCATE' | 'BUSINESS' | 'STUDENT'>('ADVOCATE');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otpValues, setOtpValues] = useState<string[]>(Array(6).fill(''));
  const [pendingVerification, setPendingVerification] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signUp || !username || !email || !password) return;

    setError(null);
    setLoading(true);

    try {
      localStorage.setItem('lexai_signup_role', selectedPersona);
      const createRes = await signUp.create({
        username,
        emailAddress: email,
        password,
      });

      if (createRes.error) {
        setError(getClerkErrorMessage(createRes.error));
        setLoading(false);
        return;
      }

      const sendRes = await signUp.verifications.sendEmailCode();
      if (sendRes.error) {
        setError(getClerkErrorMessage(sendRes.error));
        setLoading(false);
        return;
      }

      setPendingVerification(true);
    } catch (err: any) {
      console.error(err);
      setError(getClerkErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!signUp) return;

    const code = otpValues.join('');
    if (code.length !== 6) {
      setError('Please enter a 6-digit verification code.');
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const verifyRes = await signUp.verifications.verifyEmailCode({
        code,
      });

      if (verifyRes.error) {
        setError(getClerkErrorMessage(verifyRes.error));
        setLoading(false);
        return;
      }

      if (signUp.status === 'complete') {
        const finalizeRes = await signUp.finalize();
        if (finalizeRes.error) {
          setError(getClerkErrorMessage(finalizeRes.error));
          setLoading(false);
        } else {
          router.push('/auth/callback');
        }
      } else {
        console.error('Sign up not complete:', signUp);
        setError('Verification succeeded but account registration is incomplete.');
        setLoading(false);
      }
    } catch (err: any) {
      console.error(err);
      setError(getClerkErrorMessage(err));
      setLoading(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      const pasted = value.slice(0, 6).split('');
      const newValues = [...otpValues];
      for (let i = 0; i < 6; i++) {
        newValues[i] = pasted[i] || '';
      }
      setOtpValues(newValues);
      
      const focusIndex = Math.min(pasted.length, 5);
      const targetElement = document.getElementById(`otp-${focusIndex}`);
      if (targetElement) {
        targetElement.focus();
      }

      // If they pasted a complete 6-digit code, auto-verify
      if (pasted.length === 6) {
        setTimeout(async () => {
          setError(null);
          setLoading(true);
          try {
            const verifyRes = await signUp.verifications.verifyEmailCode({ code: value.slice(0, 6) });
            if (verifyRes.error) {
              setError(getClerkErrorMessage(verifyRes.error));
              setLoading(false);
              return;
            }
            if (signUp.status === 'complete') {
              const finalizeRes = await signUp.finalize();
              if (finalizeRes.error) {
                setError(getClerkErrorMessage(finalizeRes.error));
                setLoading(false);
              } else {
                router.push('/auth/callback');
              }
            } else {
              setError('Verification succeeded but account registration is incomplete.');
              setLoading(false);
            }
          } catch (err) {
            setError(getClerkErrorMessage(err));
            setLoading(false);
          }
        }, 50);
      }
      return;
    }

    const newValues = [...otpValues];
    newValues[index] = value;
    setOtpValues(newValues);

    if (value !== '' && index < 5) {
      const nextElement = document.getElementById(`otp-${index + 1}`);
      if (nextElement) {
        nextElement.focus();
      }
    }

    // Auto verify if all fields are filled
    const code = newValues.join('');
    if (code.length === 6) {
      setTimeout(async () => {
        setError(null);
        setLoading(true);
        try {
          const verifyRes = await signUp.verifications.verifyEmailCode({ code });
          if (verifyRes.error) {
            setError(getClerkErrorMessage(verifyRes.error));
            setLoading(false);
            return;
          }
          if (signUp.status === 'complete') {
            const finalizeRes = await signUp.finalize();
            if (finalizeRes.error) {
              setError(getClerkErrorMessage(finalizeRes.error));
              setLoading(false);
            } else {
              router.push('/auth/callback');
            }
          } else {
            setError('Verification succeeded but account registration is incomplete.');
            setLoading(false);
          }
        } catch (err) {
          setError(getClerkErrorMessage(err));
          setLoading(false);
        }
      }, 50);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && otpValues[index] === '' && index > 0) {
      const prevElement = document.getElementById(`otp-${index - 1}`);
      if (prevElement) {
        prevElement.focus();
      }
    }
  };

  const handleGoogleSSO = async () => {
    if (!signUp) return;
    setError(null);
    setLoading(true);
    try {
      localStorage.setItem('lexai_signup_role', selectedPersona);
      const res = await signUp.sso({
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
          <div id="clerk-captcha" />
          {error && (
            <div className="border-error/20 bg-error/10 text-error rounded-lg border p-3 text-center text-xs">
              {error}
            </div>
          )}

          {!pendingVerification ? (
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
          ) : (
            <form onSubmit={handleVerifyOTP} className="space-y-section">
              <div className="space-y-small">
                <div className="flex items-center justify-between">
                  <label className="text-text-secondary text-sub-heading font-sub-heading block">
                    Enter the code sent to
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setPendingVerification(false);
                      setOtpValues(Array(6).fill(''));
                    }}
                    className="text-primary-container hover:underline text-xs"
                  >
                    Change Details
                  </button>
                </div>
                <div className="bg-bg-tertiary border-border-default/50 pointer-events-none relative flex h-12 items-center rounded-lg border opacity-60">
                  <div className="pl-standard pr-small border-border-default bg-surface-container-low flex h-full items-center rounded-l-lg border-r py-2 select-none">
                    <span className="material-symbols-outlined text-[20px] text-text-secondary font-medium">mail</span>
                  </div>
                  <span className="text-text-primary px-standard text-[15px] tracking-wide truncate max-w-[240px]">
                    {email}
                  </span>
                </div>
              </div>

              <div className="space-y-small">
                <div className="gap-micro flex justify-between">
                  {otpValues.map((val, idx) => (
                    <input
                      key={idx}
                      id={`otp-${idx}`}
                      type="text"
                      maxLength={1}
                      value={val}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(idx, e)}
                      disabled={loading}
                      className="bg-bg-tertiary border-border-default h-12 w-12 rounded-lg border text-center text-white text-[18px] focus:border-primary-container focus:ring-primary-container focus:outline-none outline-none transition-colors"
                    />
                  ))}
                </div>
                <p className="text-text-muted font-meta-small text-meta-small">
                  Type or paste the 6-digit OTP code sent to your email.
                </p>
              </div>

              <button
                type="submit"
                disabled={loading || otpValues.join('').length !== 6}
                className={`bg-primary-container hover:bg-gold-hover text-on-primary font-sub-heading text-sub-heading px-standard gap-small group flex w-full items-center justify-center rounded-lg py-3 transition-colors ${
                  loading || otpValues.join('').length !== 6 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <span>{loading ? 'Verifying...' : 'Verify Email'}</span>
                {!loading && (
                  <span className="material-symbols-outlined text-[18px] transition-transform group-hover:translate-x-1">
                    arrow_forward
                  </span>
                )}
              </button>
            </form>
          )}

          {!pendingVerification && (
            <>
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
            </>
          )}
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
