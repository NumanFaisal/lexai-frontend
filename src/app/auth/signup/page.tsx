export default function Page() {
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
          <div className="space-y-small">
            <label
              className="text-text-secondary text-sub-heading font-sub-heading block"
              htmlFor="phone"
            >
              Enter your mobile number
            </label>
            <div className="bg-bg-tertiary border-border-default focus-within:border-gold-border focus-within:ring-gold-border relative flex h-12 items-center rounded-lg border transition-all duration-200 focus-within:ring-1">
              <div className="gap-micro pl-standard pr-small border-border-default bg-surface-container-low flex h-full items-center rounded-l-lg border-r py-2 select-none">
                <span>🇮🇳</span>
                <span className="text-text-primary font-medium">+91</span>
              </div>

              <input
                autocomplete="tel-national"
                className="text-text-primary placeholder:text-text-muted px-standard h-full w-full flex-1 border-none bg-transparent text-[15px] tracking-wide focus:ring-0"
                id="phone"
                placeholder="98765 43210"
                type="tel"
              />
            </div>
            <p className="text-text-muted font-meta-small text-meta-small">
              We'll send a 6-digit OTP via SMS
            </p>
          </div>

          <button className="bg-primary-container hover:bg-gold-hover text-on-primary font-sub-heading text-sub-heading px-standard gap-small group flex w-full items-center justify-center rounded-lg py-3 transition-colors">
            <span>Send OTP</span>
            <span className="material-symbols-outlined text-[18px] transition-transform group-hover:translate-x-1">
              arrow_forward
            </span>
          </button>

          <div className="pt-small pb-section border-border-default/50 mt-section space-y-small pointer-events-none relative border-t opacity-40 select-none">
            <div className="bg-bg-secondary/50 absolute inset-0 z-10 backdrop-blur-[1px]"></div>
            <p className="text-text-secondary text-center text-sm">
              Enter the code sent to +91 XXXXXXXXXX
            </p>
            <div className="gap-micro flex justify-between">
              <div className="bg-bg-tertiary border-border-default h-12 w-10 rounded-lg border"></div>
              <div className="bg-bg-tertiary border-border-default h-12 w-10 rounded-lg border"></div>
              <div className="bg-bg-tertiary border-border-default h-12 w-10 rounded-lg border"></div>
              <div className="bg-bg-tertiary border-border-default h-12 w-10 rounded-lg border"></div>
              <div className="bg-bg-tertiary border-border-default h-12 w-10 rounded-lg border"></div>
              <div className="bg-bg-tertiary border-border-default h-12 w-10 rounded-lg border"></div>
            </div>
          </div>

          <div className="py-small relative flex items-center">
            <div className="border-border-default flex-grow border-t"></div>
            <span className="mx-standard text-text-muted text-meta-small font-meta-small flex-shrink-0 tracking-wider uppercase">
              or continue with
            </span>
            <div className="border-border-default flex-grow border-t"></div>
          </div>

          <button className="border-border-default hover:bg-bg-tertiary hover:border-text-secondary text-text-primary font-sub-heading text-sub-heading px-standard gap-small flex w-full items-center justify-center rounded-lg border bg-transparent py-3 transition-colors">
            <svg className="h-5 w-5" fill="currentColor" viewbox="0 0 24 24">
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
            By signing up you agree to our Terms. We don't share your legal queries.
          </p>
          <a
            className="text-primary-container hover:text-gold-hover text-sub-heading font-sub-heading inline-block transition-colors"
            href="#"
          >
            Already have an account? Log in
          </a>
        </footer>
      </main>
    </>
  );
}
