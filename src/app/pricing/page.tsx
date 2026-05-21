export default function Page() {
  return (
    <>
      <main className="px-standard py-block mx-auto flex w-full max-w-[1200px] flex-grow flex-col items-center">
        <div className="mb-major w-full max-w-[720px] text-center">
          <h1 className="font-hero-h1 text-hero-h1 text-on-surface mb-standard">
            Simple pricing. No surprises.
          </h1>
          <p className="font-section-head text-section-head text-text-secondary mb-major">
            Always cheaper than a single lawyer call. Cancel anytime.
          </p>

          <div className="bg-bg-secondary p-micro border-border-default inline-flex rounded-full border shadow-sm">
            <button className="px-large py-small bg-primary-container text-on-primary-container font-sub-heading text-sub-heading rounded-full transition-colors">
              Monthly
            </button>
            <button className="px-large py-small text-text-secondary hover:text-text-primary font-sub-heading text-sub-heading rounded-full transition-colors">
              Annual (save 20%)
            </button>
          </div>
        </div>

        <div className="gap-standard mb-block grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          <div className="bg-bg-secondary border-border-default p-section relative z-10 flex h-full flex-col rounded-xl border transition-transform duration-300 hover:-translate-y-1">
            <div className="mb-standard">
              <span className="bg-surface-variant text-on-surface-variant px-component py-micro font-label-caps text-label-caps mb-component inline-block rounded-full tracking-widest uppercase">
                Free Forever
              </span>
              <div className="gap-micro flex items-baseline">
                <span className="font-page-title text-page-title text-on-surface">₹0</span>
              </div>
              <span className="text-text-muted font-meta-small text-meta-small">forever</span>
            </div>
            <p className="text-primary font-sub-heading text-sub-heading mb-standard pb-standard border-border-default border-b">
              30 queries/month
            </p>
            <ul className="space-y-component mb-standard flex-grow">
              <li className="gap-small flex items-start">
                <span className="material-symbols-outlined text-text-secondary text-[16px]">
                  check
                </span>
                <span className="font-body-ui text-body-ui text-text-secondary">
                  Legal Research
                </span>
              </li>
              <li className="gap-small flex items-start">
                <span className="material-symbols-outlined text-text-secondary text-[16px]">
                  check
                </span>
                <span className="font-body-ui text-body-ui text-text-secondary">Case Analysis</span>
              </li>
              <li className="gap-small flex items-start">
                <span className="material-symbols-outlined text-text-secondary text-[16px]">
                  check
                </span>
                <span className="font-body-ui text-body-ui text-text-secondary">
                  No credit card
                </span>
              </li>
              <li className="gap-small flex items-start opacity-50">
                <span className="material-symbols-outlined text-text-muted text-[16px]">close</span>
                <span className="font-body-ui text-body-ui text-text-muted line-through">
                  Voice input
                </span>
              </li>
              <li className="gap-small flex items-start opacity-50">
                <span className="material-symbols-outlined text-text-muted text-[16px]">close</span>
                <span className="font-body-ui text-body-ui text-text-muted line-through">
                  Contract drafting
                </span>
              </li>
              <li className="gap-small flex items-start opacity-50">
                <span className="material-symbols-outlined text-text-muted text-[16px]">close</span>
                <span className="font-body-ui text-body-ui text-text-muted line-through">
                  PDF export
                </span>
              </li>
            </ul>
            <button className="py-component border-border-default text-text-primary hover:bg-surface-variant font-sub-heading text-sub-heading mt-auto w-full rounded-lg border transition-colors">
              Get Started
            </button>
          </div>

          <div className="bg-bg-secondary border-tertiary-container p-section relative z-10 flex h-full flex-col rounded-xl border transition-transform duration-300 hover:-translate-y-1">
            <div className="mb-standard">
              <span className="px-component py-micro font-label-caps text-label-caps mb-component inline-block rounded-full bg-[#1a2f59] tracking-widest text-[#97abdc] uppercase">
                Student
              </span>
              <div className="gap-micro flex items-baseline">
                <span className="font-page-title text-page-title text-on-surface">₹199</span>
              </div>
              <span className="text-text-muted font-meta-small text-meta-small">/month</span>
            </div>
            <p className="text-tertiary-container font-sub-heading text-sub-heading mb-standard pb-standard border-border-default border-b">
              200 queries/month
            </p>
            <ul className="space-y-component mb-standard flex-grow">
              <li className="gap-small flex items-start">
                <span className="material-symbols-outlined text-tertiary-container text-[16px]">
                  check
                </span>
                <span className="font-body-ui text-body-ui text-text-primary">
                  Research + Case Analysis
                </span>
              </li>
              <li className="gap-small flex items-start">
                <span className="material-symbols-outlined text-tertiary-container text-[16px]">
                  check
                </span>
                <span className="font-body-ui text-body-ui text-text-primary">
                  Bare Act Explainer
                </span>
              </li>
              <li className="gap-small flex items-start">
                <span className="material-symbols-outlined text-tertiary-container text-[16px]">
                  check
                </span>
                <span className="font-body-ui text-body-ui text-text-primary">Moot Court Prep</span>
              </li>
              <li className="gap-small flex items-start opacity-50">
                <span className="material-symbols-outlined text-text-muted text-[16px]">close</span>
                <span className="font-body-ui text-body-ui text-text-muted line-through">
                  Voice input
                </span>
              </li>
              <li className="gap-small flex items-start opacity-50">
                <span className="material-symbols-outlined text-text-muted text-[16px]">close</span>
                <span className="font-body-ui text-body-ui text-text-muted line-through">
                  Contracts
                </span>
              </li>
            </ul>
            <button className="py-component font-sub-heading text-sub-heading mt-auto w-full rounded-lg bg-[#2a3f69] text-[#d8e2ff] transition-colors hover:bg-[#1a2f59]">
              Start Student Plan
            </button>
          </div>

          <div className="border-primary-container p-section pro-card-glow relative z-20 flex h-full scale-105 flex-col rounded-xl border-2 bg-[#111113] transition-transform duration-300 hover:scale-[1.07]">
            <div className="absolute top-0 right-0 h-[100px] w-[100px] overflow-hidden rounded-tr-xl">
              <div className="bg-primary-container text-on-primary-container font-label-caps absolute top-[15px] -right-[35px] w-[150px] rotate-45 transform py-1 text-center text-[10px] font-bold uppercase shadow-sm">
                Most Popular
              </div>
            </div>
            <div className="mb-standard pt-micro">
              <span className="bg-primary-container text-on-primary-container px-component py-micro font-label-caps text-label-caps mb-component inline-block rounded-full tracking-widest uppercase">
                Advocate Pro
              </span>
              <div className="gap-micro flex items-baseline">
                <span className="font-page-title text-page-title text-primary-container">₹799</span>
              </div>
              <span className="text-text-muted font-meta-small text-meta-small">/month</span>
            </div>
            <p className="text-primary font-sub-heading text-sub-heading mb-standard pb-standard border-gold-border border-b">
              Unlimited queries
            </p>
            <ul className="space-y-component mb-standard flex-grow">
              <li className="gap-small flex items-start">
                <span className="text-[14px]">⚖</span>
                <span className="font-body-ui text-body-ui text-text-primary">Legal Research</span>
              </li>
              <li className="gap-small flex items-start">
                <span className="text-[14px]">📜</span>
                <span className="font-body-ui text-body-ui text-text-primary">
                  Contract Drafting
                </span>
              </li>
              <li className="gap-small flex items-start">
                <span className="text-[14px]">✅</span>
                <span className="font-body-ui text-body-ui text-text-primary">
                  Compliance Check
                </span>
              </li>
              <li className="gap-small flex items-start">
                <span className="text-[14px]">🔍</span>
                <span className="font-body-ui text-body-ui text-text-primary">Case Analysis</span>
              </li>
              <li className="gap-small flex items-start">
                <span className="text-[14px]">🎤</span>
                <span className="font-body-ui text-body-ui text-text-primary">
                  Hindi Voice Input
                </span>
              </li>
              <li className="gap-small flex items-start">
                <span className="text-[14px]">💬</span>
                <span className="font-body-ui text-body-ui text-text-primary">WhatsApp Bot</span>
              </li>
              <li className="gap-small flex items-start">
                <span
                  className="material-symbols-outlined text-primary-container text-[16px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  description
                </span>
                <span className="font-body-ui text-body-ui text-text-primary">
                  PDF + Word Export
                </span>
              </li>
            </ul>
            <div className="bg-gold-subtle p-component mb-standard border-gold-border rounded-lg border text-center">
              <span className="font-citation text-citation text-primary italic">
                Saves 3+ hrs/week = ₹3,000+ extra income
              </span>
            </div>
            <button className="py-component bg-primary-container text-on-primary-container hover:bg-gold-hover font-sub-heading text-sub-heading mt-auto w-full rounded-lg font-bold shadow-md shadow-[#C9A84C44] transition-colors">
              Start Advocate Pro
            </button>
          </div>

          <div className="bg-bg-secondary border-secondary-fixed-dim p-section relative z-10 flex h-full flex-col rounded-xl border transition-transform duration-300 hover:-translate-y-1">
            <div className="mb-standard">
              <span className="px-component py-micro font-label-caps text-label-caps mb-component inline-block rounded-full bg-[#2f503d] tracking-widest text-[#abcfb6] uppercase">
                Business
              </span>
              <div className="gap-micro flex items-baseline">
                <span className="font-page-title text-page-title text-on-surface">₹1,999</span>
              </div>
              <span className="text-text-muted font-meta-small text-meta-small">/month</span>
            </div>
            <p className="text-secondary-fixed-dim font-sub-heading text-sub-heading mb-standard pb-standard border-border-default border-b">
              Priority access
            </p>
            <ul className="space-y-component mb-standard flex-grow">
              <li className="gap-small flex items-start">
                <span className="material-symbols-outlined text-secondary-fixed-dim text-[16px]">
                  check
                </span>
                <span className="font-body-ui text-body-ui text-text-primary font-semibold">
                  Everything in Pro +
                </span>
              </li>
              <li className="gap-small flex items-start">
                <span className="material-symbols-outlined text-secondary-fixed-dim text-[16px]">
                  group
                </span>
                <span className="font-body-ui text-body-ui text-text-primary">5-team seats</span>
              </li>
              <li className="gap-small flex items-start">
                <span className="material-symbols-outlined text-secondary-fixed-dim text-[16px]">
                  verified_user
                </span>
                <span className="font-body-ui text-body-ui text-text-primary">
                  Compliance Suite
                </span>
              </li>
              <li className="gap-small flex items-start">
                <span className="material-symbols-outlined text-secondary-fixed-dim text-[16px]">
                  upload_file
                </span>
                <span className="font-body-ui text-body-ui text-text-primary">
                  Contract Review upload
                </span>
              </li>
              <li className="gap-small flex items-start">
                <span className="material-symbols-outlined text-secondary-fixed-dim text-[16px]">
                  support_agent
                </span>
                <span className="font-body-ui text-body-ui text-text-primary">
                  Priority support
                </span>
              </li>
            </ul>
            <button className="py-component border-secondary-fixed-dim font-sub-heading text-sub-heading mt-auto w-full rounded-lg border bg-[#2f503d] text-[#abcfb6] transition-colors hover:bg-[#163725]">
              Start Business Plan
            </button>
          </div>
        </div>

        <div className="mb-block w-full max-w-[720px]">
          <h2 className="font-section-head text-section-head text-on-surface mb-section text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-micro">
            <details className="group bg-bg-secondary border-border-default overflow-hidden rounded-lg border">
              <summary className="p-standard font-sub-heading text-sub-heading text-text-primary hover:bg-surface-variant flex cursor-pointer items-center justify-between transition-colors">
                Can I try before paying?
                <span className="material-symbols-outlined text-text-muted transition-transform group-open:rotate-180">
                  expand_more
                </span>
              </summary>
              <div className="px-standard pb-standard pt-micro text-text-secondary font-body-ui text-body-ui border-border-default border-t">
                Yes, our Free Forever plan allows you to test the core features of LexAI with 30
                queries per month before committing to a paid plan.
              </div>
            </details>
            <details className="group bg-bg-secondary border-border-default overflow-hidden rounded-lg border">
              <summary className="p-standard font-sub-heading text-sub-heading text-text-primary hover:bg-surface-variant flex cursor-pointer items-center justify-between transition-colors">
                What payment methods are accepted?
                <span className="material-symbols-outlined text-text-muted transition-transform group-open:rotate-180">
                  expand_more
                </span>
              </summary>
              <div className="px-standard pb-standard pt-micro text-text-secondary font-body-ui text-body-ui border-border-default border-t">
                We accept all major UPI apps, credit/debit cards, and net banking options available
                in India for a seamless checkout experience.
              </div>
            </details>
            <details className="group bg-bg-secondary border-border-default overflow-hidden rounded-lg border">
              <summary className="p-standard font-sub-heading text-sub-heading text-text-primary hover:bg-surface-variant flex cursor-pointer items-center justify-between transition-colors">
                Is my data safe?
                <span className="material-symbols-outlined text-text-muted transition-transform group-open:rotate-180">
                  expand_more
                </span>
              </summary>
              <div className="px-standard pb-standard pt-micro text-text-secondary font-body-ui text-body-ui border-border-default border-t">
                Absolutely. All interactions are end-to-end encrypted and we do not use your private
                case data or contract uploads to train our public models.
              </div>
            </details>
          </div>
        </div>

        <div className="gap-standard md:gap-major py-standard border-border-default flex w-full max-w-[720px] flex-wrap justify-center border-t">
          <div className="gap-small text-text-muted flex items-center">
            <span className="material-symbols-outlined text-[20px]">lock</span>
            <span className="font-meta-small text-meta-small">End-to-end encrypted</span>
          </div>
          <div className="gap-small text-text-muted flex items-center">
            <span className="material-symbols-outlined text-[20px]">credit_card</span>
            <span className="font-meta-small text-meta-small">UPI, cards, netbanking</span>
          </div>
          <div className="gap-small text-text-muted flex items-center">
            <span className="material-symbols-outlined text-[20px]">undo</span>
            <span className="font-meta-small text-meta-small">Cancel anytime</span>
          </div>
        </div>
      </main>

      <footer className="flat no shadows mt-auto w-full border-t border-[#1E1E21] bg-[#0A0A0B] py-12">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center px-8 md:grid-cols-2">
          <div className="mb-4 md:mb-0">
            <span className="text-lg font-bold text-[#C9A84C]">LexAI</span>
            <p className="font-noto-serif mt-2 text-xs tracking-widest text-[#C9A84C] uppercase opacity-80">
              © 2024 LexAI Intelligence. Trusted by Advocates &amp; SME Founders.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 md:justify-end">
            <a
              className="font-noto-serif text-xs tracking-widest text-gray-600 uppercase opacity-80 transition-opacity hover:text-[#C9A84C] hover:opacity-100"
              href="#"
            >
              Privacy Policy
            </a>
            <a
              className="font-noto-serif text-xs tracking-widest text-gray-600 uppercase opacity-80 transition-opacity hover:text-[#C9A84C] hover:opacity-100"
              href="#"
            >
              Terms of Service
            </a>
            <a
              className="font-noto-serif text-xs tracking-widest text-gray-600 uppercase opacity-80 transition-opacity hover:text-[#C9A84C] hover:opacity-100"
              href="#"
            >
              AI Disclosure
            </a>
            <a
              className="font-noto-serif text-xs tracking-widest text-gray-600 uppercase opacity-80 transition-opacity hover:text-[#C9A84C] hover:opacity-100"
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
