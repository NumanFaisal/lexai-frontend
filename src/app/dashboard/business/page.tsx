import Link from 'next/link';
export default function Page() {
  return (
    <>
      <nav className="fixed top-0 left-0 z-50 flex h-screen w-[240px] flex-col gap-2 border-r border-[#1E1E21] bg-[#111113] p-4">
        <div className="mt-2 mb-6 flex items-center gap-3 px-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#7B9E87] to-[#2d4d3a]">
            <span className="font-logo text-bg-primary text-lg">L</span>
          </div>
          <div>
            <h1 className="font-logo text-logo text-primary">LexAI</h1>
            <p className="font-meta-small text-meta-small text-text-muted tracking-wider uppercase">
              For Business
            </p>
          </div>
        </div>

        <button className="theme-sme-bg text-bg-primary font-sub-heading text-sub-heading mb-4 flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2 transition-opacity hover:opacity-90">
          <span className="material-symbols-outlined text-[18px]">add</span>
          New Session
        </button>

        <div className="flex flex-grow flex-col gap-1">
          <Link
            href="/business/compliance"
            className="theme-sme-accent font-sub-heading text-sub-heading relative flex items-center gap-3 rounded-lg bg-[#1A1A1D] px-3 py-2.5 after:absolute after:right-0 after:h-4 after:w-1 after:rounded-full after:bg-[#7B9E87] after:content-['']"
          >
            <span
              className="material-symbols-outlined text-[20px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              verified
            </span>
            Compliance Hub
          </Link>
          <Link
            href="/business/drafts"
            className="text-text-muted hover:text-text-primary flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all duration-200 hover:bg-[#1A1A1D]"
          >
            <span className="material-symbols-outlined text-[20px]">edit_document</span>
            Contract Drafts
          </Link>
          <Link
            href="/business/research"
            className="text-text-muted hover:text-text-primary flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all duration-200 hover:bg-[#1A1A1D]"
          >
            <span className="material-symbols-outlined text-[20px]">account_balance</span>
            Legal Research
          </Link>
          <Link
            href="/business/case"
            className="text-text-muted hover:text-text-primary flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all duration-200 hover:bg-[#1A1A1D]"
          >
            <span className="material-symbols-outlined text-[20px]">search</span>
            Case Analysis
          </Link>
          <Link
            href="/pricing"
            className="text-text-muted hover:text-text-primary flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all duration-200 hover:bg-[#1A1A1D]"
          >
            <span className="material-symbols-outlined text-[20px]">workspace_premium</span>
            Premium Access
          </Link>
        </div>

        <div className="mt-auto mb-6">
          <h3 className="font-label-caps text-label-caps text-text-muted mb-2 px-2">
            Quick Queries
          </h3>
          <div className="flex flex-col gap-2">
            <button className="font-meta-small text-meta-small text-text-secondary hover:text-text-primary hover:bg-bg-elevated truncate rounded px-2 py-1 text-left transition-colors">
              "GST compliance for SaaS startup"
            </button>
            <button className="font-meta-small text-meta-small text-text-secondary hover:text-text-primary hover:bg-bg-elevated truncate rounded px-2 py-1 text-left transition-colors">
              "DPDP Act obligations"
            </button>
            <button className="font-meta-small text-meta-small text-text-secondary hover:text-text-primary hover:bg-bg-elevated truncate rounded px-2 py-1 text-left transition-colors">
              "Labour code for 15-person team"
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-[#1E1E21] pt-4">
          <div className="mb-2 flex items-center gap-2 px-2 py-1">
            <span className="theme-sme-bg/10 theme-sme-accent font-label-caps text-label-caps flex items-center gap-1 rounded border border-[#7B9E87]/20 px-2 py-0.5">
              Business Plan <span className="material-symbols-outlined text-[10px]">check</span>
            </span>
          </div>
          <a
            className="text-text-muted hover:text-text-primary flex items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-[#1A1A1D]"
            href="#"
          >
            <span className="material-symbols-outlined text-[18px]">help</span>
            Knowledge Base
          </a>
          <a
            className="text-text-muted hover:text-text-primary flex items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-[#1A1A1D]"
            href="#"
          >
            <span className="material-symbols-outlined text-[18px]">settings</span>
            Settings
          </a>
        </div>
      </nav>

      <header className="sticky top-0 z-40 ml-[240px] flex h-[52px] w-full max-w-[calc(100%-240px)] items-center justify-between border-b border-[#1E1E21] bg-[#0A0A0B]/80 px-6 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <span className="font-sub-heading text-sub-heading text-text-primary">
            Compliance Hub
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="font-meta-small text-meta-small text-text-secondary bg-bg-elevated flex items-center gap-1 rounded px-2 py-1">
            <span className="material-symbols-outlined text-[14px]">location_on</span>
            India (SC)
          </span>
          <div className="border-border-default flex items-center gap-3 border-l pl-4">
            <button className="text-text-muted hover:text-text-primary transition-colors">
              <span className="material-symbols-outlined text-[20px]">notifications</span>
            </button>
            <button className="text-text-muted hover:text-text-primary transition-colors">
              <span className="material-symbols-outlined text-[20px]">account_circle</span>
            </button>
          </div>
        </div>
      </header>

      <main className="ml-[240px] h-screen w-[calc(100%-240px)] overflow-y-auto pt-[52px] pb-12">
        <div className="gap-block mx-auto flex max-w-[720px] flex-col px-6 py-8">
          <div className="flex flex-col gap-2">
            <h2 className="font-page-title text-page-title text-text-primary tracking-tight">
              Business Compliance
            </h2>
            <p className="font-body-ui text-body-ui text-text-secondary">
              Identify, track, and resolve legal obligations for your startup.
            </p>
          </div>

          <div className="bg-bg-secondary border-border-default relative overflow-hidden rounded-xl border shadow-sm">
            <div className="theme-sme-bg absolute top-0 bottom-0 left-0 w-1"></div>
            <div className="p-6 pl-8">
              <h3 className="font-section-head text-section-head text-text-primary mb-6">
                What laws apply to your business?
              </h3>
              <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label className="font-meta-small text-meta-small text-text-secondary">
                    Business Type
                  </label>
                  <select className="bg-bg-primary border-border-default text-text-primary font-body-ui text-body-ui focus:theme-sme-focus rounded-lg border px-3 py-2 outline-none">
                    <option>SaaS / Tech</option>
                    <option>E-commerce</option>
                    <option>Manufacturing</option>
                    <option>Services</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-meta-small text-meta-small text-text-secondary">
                    Location
                  </label>
                  <select className="bg-bg-primary border-border-default text-text-primary font-body-ui text-body-ui focus:theme-sme-focus rounded-lg border px-3 py-2 outline-none">
                    <option>Karnataka</option>
                    <option>Maharashtra</option>
                    <option>Delhi</option>
                    <option>Tamil Nadu</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-meta-small text-meta-small text-text-secondary">
                    Team Size
                  </label>
                  <input
                    className="bg-bg-primary border-border-default text-text-primary font-body-ui text-body-ui focus:theme-sme-focus rounded-lg border px-3 py-2 outline-none"
                    type="number"
                    value="15"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-meta-small text-meta-small text-text-secondary">
                    Annual Revenue
                  </label>
                  <select className="bg-bg-primary border-border-default text-text-primary font-body-ui text-body-ui focus:theme-sme-focus rounded-lg border px-3 py-2 outline-none">
                    <option>&lt; ₹1 Cr</option>
                    <option>₹1 - 5 Cr</option>
                    <option>&gt; ₹5 Cr</option>
                  </select>
                </div>
              </div>
              <Link
                href="/advocate/compliance"
                className="theme-sme-bg text-bg-primary font-sub-heading text-sub-heading flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 transition-opacity hover:opacity-90"
              >
                Generate My Compliance Checklist
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </Link>
            </div>
          </div>

          <div className="gap-section flex flex-col">
            <div className="border-border-default flex flex-col gap-4 border-b pb-4">
              <div className="flex items-center justify-between">
                <h3 className="font-section-head text-section-head text-text-primary">
                  Your Compliance Overview
                </h3>
                <button className="font-meta-small text-meta-small theme-sme-accent flex items-center gap-2 rounded-lg border border-[#7B9E87]/30 px-3 py-1.5 transition-colors hover:bg-[#7B9E87]/10">
                  <span className="material-symbols-outlined text-[14px]">download</span>
                  Download Full Report PDF
                </button>
              </div>
              <div className="flex gap-3">
                <div className="bg-error/10 border-error/20 flex items-center gap-2 rounded-full border px-3 py-1.5">
                  <div className="bg-error h-2 w-2 rounded-full"></div>
                  <span className="font-meta-small text-meta-small text-error">5 Urgent</span>
                </div>
                <div className="bg-warning/10 border-warning/20 flex items-center gap-2 rounded-full border px-3 py-1.5">
                  <div className="bg-warning h-2 w-2 rounded-full"></div>
                  <span className="font-meta-small text-meta-small text-warning">
                    8 This Quarter
                  </span>
                </div>
                <div className="bg-success/10 border-success/20 flex items-center gap-2 rounded-full border px-3 py-1.5">
                  <div className="bg-success h-2 w-2 rounded-full"></div>
                  <span className="font-meta-small text-meta-small text-success">12 Done</span>
                </div>
              </div>
            </div>

            <div className="bg-bg-secondary border-border-default overflow-hidden rounded-xl border">
              <div className="bg-bg-elevated border-border-default flex items-center gap-3 border-b px-4 py-3">
                <div className="bg-error h-2 w-2 rounded-full"></div>
                <h4 className="font-sub-heading text-sub-heading text-text-primary">
                  Tax Compliance (3 urgent)
                </h4>
                <span className="material-symbols-outlined text-text-muted ml-auto text-[20px]">
                  expand_more
                </span>
              </div>
              <div className="flex flex-col">
                <div className="border-border-default/50 hover:bg-bg-tertiary flex items-start justify-between gap-4 border-b px-4 py-4 transition-colors">
                  <div className="flex flex-col gap-1">
                    <span className="font-body-ui text-body-ui text-text-primary font-medium">
                      GST Return Filing (GSTR-3B)
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="font-meta-small text-meta-small text-error flex items-center gap-1">
                        <span className="material-symbols-outlined text-[12px]">schedule</span>
                        Due: 20th each month
                      </span>
                      <span className="font-meta-small text-meta-small text-text-secondary border-border-default border-l pl-3">
                        Penalty: ₹50/day
                      </span>
                    </div>
                  </div>
                  <button className="border-border-default text-text-secondary hover:text-text-primary hover:border-text-muted font-meta-small text-meta-small flex shrink-0 items-center gap-1 rounded border bg-transparent px-3 py-1.5 transition-colors">
                    Mark Done <span className="material-symbols-outlined text-[14px]">check</span>
                  </button>
                </div>

                <div className="hover:bg-bg-tertiary flex items-start justify-between gap-4 px-4 py-4 transition-colors">
                  <div className="flex flex-col gap-1">
                    <span className="font-body-ui text-body-ui text-text-primary font-medium">
                      E-invoicing requirement
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="font-meta-small text-meta-small text-text-secondary flex items-center gap-1">
                        <span className="material-symbols-outlined text-[12px]">info</span>
                        Threshold: &gt;₹5Cr turnover
                      </span>
                      <span className="font-meta-small text-meta-small text-text-secondary border-border-default border-l pl-3">
                        Penalty: ₹10,000
                      </span>
                    </div>
                  </div>
                  <button className="border-border-default text-text-secondary hover:text-text-primary hover:border-text-muted font-meta-small text-meta-small flex shrink-0 items-center gap-1 rounded border bg-transparent px-3 py-1.5 transition-colors">
                    Mark Done
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-bg-secondary border-border-default overflow-hidden rounded-xl border">
              <div className="bg-bg-elevated border-border-default flex items-center gap-3 border-b px-4 py-3">
                <div className="bg-warning h-2 w-2 rounded-full"></div>
                <h4 className="font-sub-heading text-sub-heading text-text-primary">
                  Labour &amp; HR (2 pending)
                </h4>
                <span className="material-symbols-outlined text-text-muted ml-auto text-[20px]">
                  expand_more
                </span>
              </div>
              <div className="flex flex-col">
                <div className="hover:bg-bg-tertiary flex items-start justify-between gap-4 px-4 py-4 transition-colors">
                  <div className="flex flex-col gap-1">
                    <span className="font-body-ui text-body-ui text-text-primary font-medium">
                      EPF Registration
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="font-meta-small text-meta-small text-warning flex items-center gap-1">
                        <span className="material-symbols-outlined text-[12px]">group</span>
                        Required: 20+ employees
                      </span>
                    </div>
                  </div>
                  <button className="border-border-default text-text-secondary hover:text-text-primary hover:border-text-muted font-meta-small text-meta-small flex shrink-0 items-center gap-1 rounded border bg-transparent px-3 py-1.5 transition-colors">
                    Mark Done
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-bg-secondary border-border-default overflow-hidden rounded-xl border">
              <div className="bg-bg-elevated border-border-default flex items-center gap-3 border-b px-4 py-3">
                <div className="bg-success h-2 w-2 rounded-full"></div>
                <h4 className="font-sub-heading text-sub-heading text-text-primary">
                  Data Privacy (1 done)
                </h4>
                <span className="material-symbols-outlined text-text-muted ml-auto text-[20px]">
                  expand_more
                </span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-start justify-between gap-4 px-4 py-4 opacity-70">
                  <div className="flex flex-col gap-1">
                    <span className="font-body-ui text-body-ui text-text-secondary line-through">
                      Privacy Policy published
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="font-meta-small text-meta-small text-success flex items-center gap-1">
                        <span className="material-symbols-outlined text-[12px]">check_circle</span>
                        Completed
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-bg-secondary border-border-default mt-4 rounded-xl border p-6">
            <div className="border-border-default bg-bg-primary/50 group flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 transition-colors hover:border-[#7B9E87]/50">
              <div className="bg-bg-elevated mb-3 flex h-12 w-12 items-center justify-center rounded-full transition-transform group-hover:scale-110">
                <span className="material-symbols-outlined text-text-muted text-[24px]">
                  upload_file
                </span>
              </div>
              <h4 className="font-sub-heading text-sub-heading text-text-primary mb-1">
                Upload a contract for AI review →
              </h4>
              <p className="font-meta-small text-meta-small text-text-secondary">
                Flag risky clauses instantly
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
