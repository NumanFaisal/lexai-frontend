export default function Page() {
  return (
    <>
      <div className="bg-surface-container-high fixed top-0 left-0 z-50 h-1 w-full">
        <div className="bg-primary-container h-full w-full transition-all duration-500"></div>
      </div>

      <header className="p-section fixed top-0 z-40 flex w-full items-center justify-between pt-8">
        <div className="flex items-center gap-2">
          <span className="font-logo text-logo text-primary-container tracking-tighter">LexAI</span>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-[1024px] flex-grow flex-col items-center justify-center px-4 py-24 sm:px-8">
        <div className="mb-block max-w-2xl text-center">
          <h1 className="font-page-title text-page-title text-on-background mb-standard">
            How will you use LexAI?
          </h1>
          <p className="font-body-chat text-body-chat text-text-secondary">
            We'll personalize your dashboard and quick prompts
          </p>
        </div>
        <div className="gap-standard mb-block grid w-full grid-cols-1 md:grid-cols-3">
          <button className="bg-bg-secondary border-border-default p-section hover:border-gold-border group hover:ring-gold-border focus:ring-primary-container focus:border-primary-container active-state-card relative flex scale-100 flex-col rounded-xl border text-left ring-1 ring-transparent transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_0_15px_rgba(201,168,76,0.1)] focus:bg-white/5 focus:outline-none">
            <div className="bg-primary-container/20 mb-standard text-primary-container flex h-12 w-12 items-center justify-center rounded-full">
              <span className="material-symbols-outlined text-[24px]">balance</span>
            </div>
            <h2 className="font-section-head text-section-head text-on-background mb-small">
              I am an Advocate
            </h2>
            <p className="font-body-ui text-body-ui text-text-secondary mb-section flex-grow">
              Research case law, draft legal notices, bail applications, and documents with Indian
              Kanoon citations
            </p>
            <div className="mb-section w-full">
              <ul className="space-y-2">
                <li className="font-meta-small text-meta-small text-text-muted flex items-center gap-2">
                  <span className="bg-text-muted h-1 w-1 rounded-full"></span> Legal research
                </li>
                <li className="font-meta-small text-meta-small text-text-muted flex items-center gap-2">
                  <span className="bg-text-muted h-1 w-1 rounded-full"></span> Document drafting
                </li>
                <li className="font-meta-small text-meta-small text-text-muted flex items-center gap-2">
                  <span className="bg-text-muted h-1 w-1 rounded-full"></span> Case analysis
                </li>
              </ul>
            </div>
            <div className="bg-gold-subtle border-gold-border mt-auto inline-flex items-center justify-center rounded-full border px-3 py-1">
              <span className="font-label-caps text-label-caps text-primary-container">
                MOST POPULAR
              </span>
            </div>
            <span className="material-symbols-outlined text-primary-container absolute top-6 right-6 opacity-0 transition-opacity">
              check_circle
            </span>
          </button>

          <button className="bg-bg-secondary border-border-default p-section group relative flex scale-100 flex-col rounded-xl border text-left ring-1 ring-transparent transition-all duration-300 hover:scale-[1.01] hover:border-[#4db6ac44] hover:shadow-[0_0_15px_rgba(77,182,172,0.1)] hover:ring-[#4db6ac44] focus:outline-none">
            <div className="mb-standard flex h-12 w-12 items-center justify-center rounded-full bg-[#4db6ac22] text-[#4db6ac]">
              <span className="material-symbols-outlined text-[24px]">domain</span>
            </div>
            <h2 className="font-section-head text-section-head text-on-background mb-small">
              I run a Business / Startup
            </h2>
            <p className="font-body-ui text-body-ui text-text-secondary mb-section flex-grow">
              Check GST, DPDP Act, Labour Code compliance. Review contracts. Build legal safety for
              your team.
            </p>
            <div className="mb-section w-full">
              <ul className="space-y-2">
                <li className="font-meta-small text-meta-small text-text-muted flex items-center gap-2">
                  <span className="bg-text-muted h-1 w-1 rounded-full"></span> Compliance checker
                </li>
                <li className="font-meta-small text-meta-small text-text-muted flex items-center gap-2">
                  <span className="bg-text-muted h-1 w-1 rounded-full"></span> Contract review
                </li>
                <li className="font-meta-small text-meta-small text-text-muted flex items-center gap-2">
                  <span className="bg-text-muted h-1 w-1 rounded-full"></span> Legal notices
                </li>
              </ul>
            </div>
            <div className="mt-auto inline-flex items-center justify-center rounded-full border border-[#7B9E8755] bg-[#7B9E8722] px-3 py-1">
              <span className="font-label-caps text-label-caps text-success">
                FOR SMES &amp; STARTUPS
              </span>
            </div>
          </button>

          <button className="bg-bg-secondary border-border-default p-section group relative flex scale-100 flex-col rounded-xl border text-left ring-1 ring-transparent transition-all duration-300 hover:scale-[1.01] hover:border-[#64b5f644] hover:shadow-[0_0_15px_rgba(100,181,246,0.1)] hover:ring-[#64b5f644] focus:outline-none">
            <div className="mb-standard flex h-12 w-12 items-center justify-center rounded-full bg-[#64b5f622] text-[#64b5f6]">
              <span className="material-symbols-outlined text-[24px]">school</span>
            </div>
            <h2 className="font-section-head text-section-head text-on-background mb-small">
              I am a Law Student
            </h2>
            <p className="font-body-ui text-body-ui text-text-secondary mb-section flex-grow">
              Research cases, prepare moot court arguments, understand Bare Acts in plain English.
              Free tier available.
            </p>
            <div className="mb-section w-full">
              <ul className="space-y-2">
                <li className="font-meta-small text-meta-small text-text-muted flex items-center gap-2">
                  <span className="bg-text-muted h-1 w-1 rounded-full"></span> Case research
                </li>
                <li className="font-meta-small text-meta-small text-text-muted flex items-center gap-2">
                  <span className="bg-text-muted h-1 w-1 rounded-full"></span> Moot court prep
                </li>
                <li className="font-meta-small text-meta-small text-text-muted flex items-center gap-2">
                  <span className="bg-text-muted h-1 w-1 rounded-full"></span> Bare Act explainer
                </li>
              </ul>
            </div>
            <div className="mt-auto inline-flex items-center justify-center rounded-full border border-[#64b5f655] bg-[#64b5f622] px-3 py-1">
              <span className="font-label-caps text-label-caps text-[#64b5f6]">
                FREE TIER AVAILABLE
              </span>
            </div>
          </button>
        </div>
        <div className="pb-section mt-auto flex w-full justify-center">
          <button
            className="bg-surface-variant text-text-disabled font-sub-heading text-sub-heading flex cursor-not-allowed items-center gap-2 rounded-lg px-8 py-3 opacity-50 transition-all duration-300 focus:outline-none"
            disabled=""
          >
            Continue <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>
      </main>
      <style>{`
        /* Demonstrating selected state purely via CSS focus for this static HTML */
        .active-state-card:focus {
            border-color: #c9a84c;
            border-width: 2px;
            background-color: rgba(255, 255, 255, 0.05);
            padding: 27px; /* Compensate for 2px border vs 1px to prevent layout shift */
        }
        .active-state-card:focus .material-symbols-outlined[style*="check_circle"],
        .active-state-card:focus > span.material-symbols-outlined {
            opacity: 1;
            font-variation-settings: 'FILL' 1;
        }
`}</style>
    </>
  );
}
