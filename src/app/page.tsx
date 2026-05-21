export default function Page() {
  return (
    <>
      <header className="border-border-default sticky top-0 z-40 flex h-[52px] w-full items-center justify-between border-b bg-[#0A0A0B]/80 px-6 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span className="font-logo text-logo text-primary-container tracking-tighter">LexAI</span>
        </div>
        <div className="gap-standard flex items-center">
          <button className="font-sub-heading text-sub-heading text-text-secondary hover:text-primary-container focus:ring-gold-border rounded-DEFAULT px-2 py-1 transition-colors outline-none focus:ring-1">
            Log In
          </button>
          <button className="bg-primary-container text-on-primary font-sub-heading text-sub-heading hover:bg-gold-hover focus:ring-gold-border rounded-[10px] px-4 py-1.5 transition-colors outline-none focus:ring-1">
            Sign Up
          </button>
        </div>
      </header>
      <main>
        <section className="gradient-backdrop relative flex min-h-[819px] flex-col items-center justify-center overflow-hidden px-4">
          <div className="pointer-events-none absolute inset-0 bg-[url('https://placehold.co/1920x1080/0D1B2A/0D1B2A?text=Noise')] opacity-5 mix-blend-overlay"></div>
          <div className="gap-major relative z-10 flex max-w-[720px] flex-col items-center text-center">
            <div className="gap-standard flex flex-col items-center">
              <span className="bg-bg-elevated/50 border-border-default font-label-caps text-label-caps text-primary-container inline-flex items-center gap-2 rounded-full border px-3 py-1">
                <span className="material-symbols-outlined text-[14px]">bolt</span>
                V2.0 LIVE FOR INDIA
              </span>
              <h1 className="font-hero-h1 text-hero-h1 text-on-background max-w-[640px] leading-tight">
                AI Legal Assistant for Every Indian
              </h1>
              <p className="font-section-head text-section-head text-text-secondary max-w-[580px] font-normal">
                Research laws, draft contracts, check compliance — in seconds. Built for Indian
                advocates, startups &amp; students.
              </p>
            </div>
            <div className="gap-standard flex flex-col items-center sm:flex-row">
              <button className="bg-primary-container text-on-primary font-sub-heading text-sub-heading hover:bg-gold-hover focus:ring-gold-border w-full rounded-[10px] px-8 py-3 transition-colors outline-none focus:ring-1 sm:w-auto">
                Try Free — No Credit Card
              </button>
              <button className="border-border-default text-text-primary font-sub-heading text-sub-heading hover:border-primary-container hover:text-primary-container focus:ring-gold-border w-full rounded-[10px] border bg-transparent px-8 py-3 transition-colors outline-none focus:ring-1 sm:w-auto">
                See How It Works
              </button>
            </div>
            <div className="pt-major gap-standard font-meta-small text-meta-small text-text-muted flex items-center justify-center">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-primary-container text-[16px]">
                  groups
                </span>{' '}
                500+ advocates
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-primary-container text-[16px]">
                  search
                </span>{' '}
                10,000+ queries
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-primary-container text-[16px]">
                  location_on
                </span>{' '}
                Trusted in 8 cities
              </span>
            </div>
          </div>
        </section>

        <section className="py-block -mt-block relative z-20 mx-auto max-w-7xl px-6">
          <div className="gap-standard grid grid-cols-1 md:grid-cols-3">
            <div className="bg-bg-secondary border-l-primary-container border-border-default p-large group cursor-pointer rounded-lg border-y border-r border-l-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_4px_20px_rgba(201,168,76,0.1)]">
              <div className="gap-standard flex h-full flex-col justify-between">
                <div>
                  <div className="bg-bg-elevated mb-standard border-border-default group-hover:border-primary-container flex h-12 w-12 items-center justify-center rounded-full border transition-colors">
                    <span className="material-symbols-outlined text-primary-container text-[24px]">
                      gavel
                    </span>
                  </div>
                  <h3 className="font-section-head text-section-head text-on-background mb-small">
                    Advocates
                  </h3>
                  <p className="font-body-ui text-body-ui text-text-secondary">
                    Accelerate legal research across Indian Kanoon. Draft applications instantly.
                  </p>
                </div>
                <span className="font-sub-heading text-sub-heading text-primary-container mt-auto inline-flex items-center gap-1 group-hover:underline">
                  Try for free{' '}
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </span>
              </div>
            </div>

            <div className="bg-bg-secondary border-l-primary-container border-border-default p-large group cursor-pointer rounded-lg border-y border-r border-l-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_4px_20px_rgba(201,168,76,0.1)]">
              <div className="gap-standard flex h-full flex-col justify-between">
                <div>
                  <div className="bg-bg-elevated mb-standard border-border-default group-hover:border-primary-container flex h-12 w-12 items-center justify-center rounded-full border transition-colors">
                    <span className="material-symbols-outlined text-primary-container text-[24px]">
                      business
                    </span>
                  </div>
                  <h3 className="font-section-head text-section-head text-on-background mb-small">
                    Businesses
                  </h3>
                  <p className="font-body-ui text-body-ui text-text-secondary">
                    Generate NDAs, employment contracts, and check compliance risks effortlessly.
                  </p>
                </div>
                <span className="font-sub-heading text-sub-heading text-primary-container mt-auto inline-flex items-center gap-1 group-hover:underline">
                  Try for free{' '}
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </span>
              </div>
            </div>

            <div className="bg-bg-secondary border-l-primary-container border-border-default p-large group cursor-pointer rounded-lg border-y border-r border-l-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_4px_20px_rgba(201,168,76,0.1)]">
              <div className="gap-standard flex h-full flex-col justify-between">
                <div>
                  <div className="bg-bg-elevated mb-standard border-border-default group-hover:border-primary-container flex h-12 w-12 items-center justify-center rounded-full border transition-colors">
                    <span className="material-symbols-outlined text-primary-container text-[24px]">
                      school
                    </span>
                  </div>
                  <h3 className="font-section-head text-section-head text-on-background mb-small">
                    Students
                  </h3>
                  <p className="font-body-ui text-body-ui text-text-secondary">
                    Summarize landmark judgments and build moot court memorials fast.
                  </p>
                </div>
                <span className="font-sub-heading text-sub-heading text-primary-container mt-auto inline-flex items-center gap-1 group-hover:underline">
                  Try for free{' '}
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="py-block gap-block mx-auto flex max-w-[720px] flex-col px-6">
          <div className="gap-major bg-bg-secondary p-section border-border-default flex flex-col items-center rounded-xl border md:flex-row">
            <div className="gap-small flex flex-1 flex-col">
              <h2 className="font-page-title text-page-title text-on-background">
                Verified Legal Research
              </h2>
              <p className="font-body-ui text-body-ui text-text-secondary">
                AI answers backed by exact citations from Indian Kanoon. No hallucinations, just
                reliable case law.
              </p>
            </div>
            <div className="flex flex-1 justify-center md:justify-end">
              <div className="bg-gold-subtle text-primary-container border-gold-border flex items-center gap-2 rounded-lg border px-4 py-2">
                <span className="material-symbols-outlined text-success text-[20px]">verified</span>
                <span className="font-sub-heading text-sub-heading">Supreme Court Cited</span>
              </div>
            </div>
          </div>

          <div className="gap-major bg-bg-secondary p-section border-border-default flex flex-col items-center rounded-xl border md:flex-row-reverse">
            <div className="gap-small flex flex-1 flex-col">
              <h2 className="font-page-title text-page-title text-on-background">
                Complete Document Drafting
              </h2>
              <p className="font-body-ui text-body-ui text-text-secondary">
                Generate highly accurate NDAs, bail applications, and legal notices in seconds.
                Formatted for Indian courts.
              </p>
            </div>
            <div className="bg-bg-elevated border-border-default w-full flex-1 rounded-lg border p-4">
              <div className="bg-surface-container-high mb-2 h-4 w-1/3 rounded"></div>
              <div className="bg-surface-container-highest mb-1 h-2 w-full rounded"></div>
              <div className="bg-surface-container-highest mb-1 h-2 w-5/6 rounded"></div>
              <div className="bg-surface-container-highest mb-4 h-2 w-4/6 rounded"></div>
              <div className="bg-primary-container ml-auto h-6 w-8 rounded"></div>
            </div>
          </div>

          <div className="gap-major bg-bg-secondary p-section border-border-default flex flex-col items-center rounded-xl border md:flex-row">
            <div className="gap-small flex flex-1 flex-col">
              <h2 className="font-page-title text-page-title text-on-background">
                WhatsApp-First Workflow
              </h2>
              <p className="font-body-ui text-body-ui text-text-secondary">
                Access legal intelligence directly from WhatsApp. No app downloads required. Fast
                and discrete.
              </p>
            </div>
            <div className="flex w-full flex-1 justify-center md:justify-end">
              <div className="bg-bg-elevated border-border-default flex w-full max-w-[240px] flex-col gap-2 rounded-xl border p-3">
                <div className="bg-primary-container text-on-primary max-w-[80%] self-end rounded-t-lg rounded-bl-lg p-2 text-xs">
                  What's the limitation for breach of contract?
                </div>
                <div className="bg-surface-container text-on-surface border-border-default max-w-[80%] self-start rounded-t-lg rounded-br-lg border p-2 text-xs">
                  Under the Limitation Act, 1963, it is 3 years.
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-border-default mt-auto w-full border-t bg-[#0A0A0B] py-12">
        <div className="gap-standard mx-auto grid max-w-7xl grid-cols-1 items-center px-8 md:grid-cols-2">
          <div className="gap-micro flex flex-col">
            <span className="font-logo text-logo text-primary-container">LexAI</span>
            <p className="font-meta-small text-meta-small text-text-muted">
              © 2024 LexAI Intelligence. Trusted by Advocates &amp; SME Founders.
            </p>
            <p className="font-meta-small text-meta-small text-primary-container mt-1 opacity-80">
              Made for Indian lawyers
            </p>
          </div>
          <div className="gap-small flex flex-wrap md:justify-end">
            <a
              className="font-label-caps text-label-caps text-text-secondary hover:text-primary-container opacity-80 transition-opacity hover:opacity-100"
              href="#"
            >
              Privacy Policy
            </a>
            <a
              className="font-label-caps text-label-caps text-text-secondary hover:text-primary-container opacity-80 transition-opacity hover:opacity-100"
              href="#"
            >
              Terms of Service
            </a>
            <a
              className="font-label-caps text-label-caps text-text-secondary hover:text-primary-container opacity-80 transition-opacity hover:opacity-100"
              href="#"
            >
              AI Disclosure
            </a>
            <a
              className="font-label-caps text-label-caps text-text-secondary hover:text-primary-container opacity-80 transition-opacity hover:opacity-100"
              href="#"
            >
              Contact Support
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
