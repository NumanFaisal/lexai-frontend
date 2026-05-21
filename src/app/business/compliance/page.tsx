import Link from 'next/link';
export default function Page() {
  return (
    <>
      <aside className="font-noto-serif fixed top-0 left-0 z-50 flex h-screen w-[240px] flex-col gap-2 border-r border-[#1E1E21] bg-[#111113] p-4 tracking-tight antialiased shadow-none">
        <div className="mb-8 flex items-center gap-3 px-2">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-gradient-to-br from-[#C9A84C] to-[#E8C96A]">
            <span className="material-symbols-outlined text-bg-primary text-xl font-bold">
              account_balance
            </span>
          </div>
          <div>
            <h1 className="font-serif text-2xl leading-none font-bold tracking-tighter text-[#C9A84C]">
              LexAI
            </h1>
            <p className="text-text-secondary text-[10px] tracking-widest uppercase">
              Legal Intelligence
            </p>
          </div>
        </div>
        <nav className="flex-1 space-y-1">
          <Link
            href="/student/chat"
            className="flex items-center gap-3 rounded-lg p-2.5 text-gray-500 transition-all duration-200 hover:bg-[#1A1A1D] hover:text-[#C9A84C]"
          >
            <span className="material-symbols-outlined" data-icon="chat_bubble">
              chat_bubble
            </span>
            <span>Legal Chat</span>
          </Link>
          <Link
            href="/student/vault"
            className="flex items-center gap-3 rounded-lg p-2.5 text-gray-500 transition-all duration-200 hover:bg-[#1A1A1D] hover:text-[#C9A84C]"
          >
            <span className="material-symbols-outlined" data-icon="account_balance">
              account_balance
            </span>
            <span>Research Vault</span>
          </Link>
          <Link
            href="/business/drafts"
            className="flex items-center gap-3 rounded-lg p-2.5 text-gray-500 transition-all duration-200 hover:bg-[#1A1A1D] hover:text-[#C9A84C]"
          >
            <span className="material-symbols-outlined" data-icon="edit_document">
              edit_document
            </span>
            <span>Contract Drafts</span>
          </Link>

          <Link
            href="/business/compliance"
            className="relative flex items-center gap-3 rounded-lg bg-[#1A1A1D] p-2.5 font-semibold text-[#C9A84C] after:absolute after:right-0 after:h-4 after:w-1 after:rounded-full after:bg-[#C9A84C] after:content-['']"
          >
            <span className="material-symbols-outlined" data-icon="verified">
              verified
            </span>
            <span>Compliance Hub</span>
          </Link>
          <Link
            href="/pricing"
            className="flex items-center gap-3 rounded-lg p-2.5 text-gray-500 transition-all duration-200 hover:bg-[#1A1A1D] hover:text-[#C9A84C]"
          >
            <span className="material-symbols-outlined" data-icon="workspace_premium">
              workspace_premium
            </span>
            <span>Premium Access</span>
          </Link>
        </nav>
        <button className="mt-4 flex scale-95 items-center justify-center gap-2 rounded-lg bg-[#C9A84C] px-4 py-2.5 font-bold text-[#0A0A0B] transition-colors transition-transform hover:bg-[#E8C96A] active:scale-90">
          <span className="material-symbols-outlined text-sm">add</span>
          New Research Session
        </button>
        <div className="mt-auto space-y-1 border-t border-[#1E1E21] pt-4">
          <a
            className="flex items-center gap-3 rounded-lg p-2.5 text-gray-500 transition-all duration-200 hover:bg-[#1A1A1D] hover:text-[#C9A84C]"
            href="#"
          >
            <span className="material-symbols-outlined" data-icon="help">
              help
            </span>
            <span>Knowledge Base</span>
          </a>
          <a
            className="flex items-center gap-3 rounded-lg p-2.5 text-gray-500 transition-all duration-200 hover:bg-[#1A1A1D] hover:text-[#C9A84C]"
            href="#"
          >
            <span className="material-symbols-outlined" data-icon="settings">
              settings
            </span>
            <span>Settings</span>
          </a>
        </div>
      </aside>

      <div className="ml-[240px] flex min-h-screen flex-col">
        <header className="font-noto-serif sticky top-0 z-40 flex h-[52px] w-full items-center justify-between border-b border-[#1E1E21] bg-[#0A0A0B]/80 px-6 text-sm font-medium shadow-sm backdrop-blur-md">
          <div className="flex flex-1 items-center gap-4">
            <div className="relative w-full max-w-md">
              <span className="material-symbols-outlined absolute top-1/2 left-3 -translate-y-1/2 text-sm text-gray-500">
                search
              </span>
              <input
                className="w-full rounded-full border border-[#1E1E21] bg-[#111113] py-1.5 pr-4 pl-10 text-xs transition-all focus:ring-1 focus:ring-[#C9A84C44] focus:outline-none"
                placeholder="Search compliance records..."
                type="text"
              />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-[#C9A84C]">
              <span className="material-symbols-outlined text-sm">gavel</span>
              <span className="text-xs font-bold tracking-widest uppercase">India (SC)</span>
            </div>
            <div className="h-4 w-[1px] bg-[#1E1E21]"></div>
            <div className="flex items-center gap-4">
              <button className="relative text-gray-400 transition-colors hover:text-white">
                <span className="material-symbols-outlined">notifications</span>
                <span className="bg-error absolute top-0 right-0 h-2 w-2 rounded-full border-2 border-[#0A0A0B]"></span>
              </button>
              <button className="text-gray-400 transition-colors hover:text-white">
                <span className="material-symbols-outlined">history</span>
              </button>
              <button className="text-gray-400 transition-colors hover:text-white">
                <span className="material-symbols-outlined">account_circle</span>
              </button>
              <button className="rounded-full bg-[#C9A84C] px-4 py-1 text-xs font-bold text-[#0A0A0B] transition-colors hover:bg-[#E8C96A]">
                Upgrade to Pro
              </button>
            </div>
          </div>
        </header>

        <main className="py-block px-standard mx-auto w-full max-w-[720px] flex-1">
          <section className="mb-major">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="font-page-title text-page-title text-text-primary mb-2">
                  Compliance Hub
                </h2>
                <p className="font-body-ui text-text-secondary">
                  Centralized legal oversight for SME founders and legal teams.
                </p>
              </div>
              <div className="bg-success/10 border-success/20 flex items-center gap-2 rounded-lg border px-3 py-1.5">
                <span className="bg-success h-2 w-2 animate-pulse rounded-full"></span>
                <span className="text-success text-[10px] font-bold tracking-wider uppercase">
                  Overall: Healthy
                </span>
              </div>
            </div>
          </section>

          <div className="gap-component mb-major grid grid-cols-1 md:grid-cols-3">
            <div className="p-standard rounded-xl border border-[#1E1E21] bg-[#111113]">
              <span className="font-label-caps text-label-caps text-text-secondary mb-2 block uppercase">
                Tax Compliance
              </span>
              <div className="flex items-end justify-between">
                <h3 className="font-page-title text-success text-2xl">98%</h3>
                <span className="material-symbols-outlined text-success">check_circle</span>
              </div>
            </div>
            <div className="p-standard rounded-xl border border-[#1E1E21] bg-[#111113]">
              <span className="font-label-caps text-label-caps text-text-secondary mb-2 block uppercase">
                Labor Laws
              </span>
              <div className="flex items-end justify-between">
                <h3 className="font-page-title text-warning text-2xl">84%</h3>
                <span className="material-symbols-outlined text-warning">warning</span>
              </div>
            </div>
            <div className="p-standard rounded-xl border border-[#1E1E21] bg-[#111113]">
              <span className="font-label-caps text-label-caps text-text-secondary mb-2 block uppercase">
                Data Privacy
              </span>
              <div className="flex items-end justify-between">
                <h3 className="font-page-title text-text-primary text-2xl">100%</h3>
                <span className="material-symbols-outlined text-success">verified</span>
              </div>
            </div>
          </div>

          <div className="space-y-component">
            <h4 className="font-section-head text-section-head text-text-primary mb-component">
              Active Compliance Actions
            </h4>

            <div className="overflow-hidden rounded-xl border border-[#1E1E21] bg-[#111113]">
              <div className="bg-secondary-container/10 px-standard flex items-center justify-between border-b border-[#1E1E21] py-2">
                <div className="flex items-center gap-2">
                  <span
                    className="material-symbols-outlined text-sm text-[#abcfb6]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    payments
                  </span>
                  <span className="text-[10px] font-bold tracking-widest text-[#abcfb6] uppercase">
                    Tax &amp; GST
                  </span>
                </div>
                <span className="text-text-secondary text-[10px]">Next Due: 20th Oct</span>
              </div>
              <div className="space-y-4 p-4">
                <div className="group flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="bg-success h-2 w-2 rounded-full"></div>
                    <div>
                      <p className="font-sub-heading text-text-primary">GST-R1 Monthly Filing</p>
                      <p className="text-meta-small text-text-secondary">
                        Filed successfully on Oct 09, 2024
                      </p>
                    </div>
                  </div>
                  <button className="text-text-secondary rounded-full border border-[#1E1E21] px-3 py-1 text-xs transition-all hover:text-[#C9A84C]">
                    View Receipt
                  </button>
                </div>
                <div className="group flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="bg-success h-2 w-2 rounded-full"></div>
                    <div>
                      <p className="font-sub-heading text-text-primary">TDS Quarterly Deposit</p>
                      <p className="text-meta-small text-text-secondary">
                        Processed for Q3 FY24-25
                      </p>
                    </div>
                  </div>
                  <button className="text-text-secondary rounded-full border border-[#1E1E21] px-3 py-1 text-xs transition-all hover:text-[#C9A84C]">
                    Audit Trail
                  </button>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-[#1E1E21] bg-[#111113]">
              <div className="bg-warning/5 px-standard flex items-center justify-between border-b border-[#1E1E21] py-2">
                <div className="flex items-center gap-2">
                  <span
                    className="material-symbols-outlined text-warning text-sm"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    groups
                  </span>
                  <span className="text-warning text-[10px] font-bold tracking-widest uppercase">
                    Labor &amp; HR Compliance
                  </span>
                </div>
                <span className="text-warning text-[10px] font-bold">Action Required</span>
              </div>
              <div className="space-y-4 p-4">
                <div className="group flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="bg-warning h-2 w-2 rounded-full"></div>
                    <div>
                      <p className="font-sub-heading text-text-primary">POSH Annual Report</p>
                      <p className="text-meta-small text-text-secondary">
                        Draft pending review by External Member
                      </p>
                    </div>
                  </div>
                  <button className="bg-warning text-bg-primary hover:bg-gold-hover rounded-full px-3 py-1 text-xs font-bold transition-all">
                    Review Now
                  </button>
                </div>
                <div className="group flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="bg-error h-2 w-2 rounded-full"></div>
                    <div>
                      <p className="font-sub-heading text-text-primary">
                        PF Contribution (September)
                      </p>
                      <p className="text-meta-small text-error font-medium">
                        Missing payment confirmation - 2 days overdue
                      </p>
                    </div>
                  </div>
                  <button className="bg-error rounded-full px-3 py-1 text-xs font-bold text-white transition-all hover:opacity-90">
                    Pay Now
                  </button>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-[#1E1E21] bg-[#111113]">
              <div className="bg-on-tertiary-fixed-variant/10 px-standard flex items-center justify-between border-b border-[#1E1E21] py-2">
                <div className="flex items-center gap-2">
                  <span
                    className="material-symbols-outlined text-tertiary text-sm"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    security
                  </span>
                  <span className="text-tertiary text-[10px] font-bold tracking-widest uppercase">
                    Data &amp; Privacy (DPDP)
                  </span>
                </div>
                <span className="text-text-secondary text-[10px]">Audit: Completed</span>
              </div>
              <div className="space-y-4 p-4">
                <div className="group flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="bg-success h-2 w-2 rounded-full"></div>
                    <div>
                      <p className="font-sub-heading text-text-primary">Consent Manager Protocol</p>
                      <p className="text-meta-small text-text-secondary">
                        Aligned with DPDP Act 2023 requirements
                      </p>
                    </div>
                  </div>
                  <div className="bg-gold-subtle border-gold-border flex items-center gap-2 rounded border px-2 py-0.5">
                    <span className="material-symbols-outlined text-primary text-[10px]">
                      verified
                    </span>
                    <span className="text-primary text-[9px] font-bold tracking-tighter uppercase">
                      Verified AI
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <section className="mt-major p-major rounded-2xl border border-[#1E1E21] bg-gradient-to-br from-[#1A1A1D] to-[#111113]">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border border-[#C9A84C44] bg-[#C9A84C1A]">
                <span
                  className="material-symbols-outlined text-[#C9A84C]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  lightbulb
                </span>
              </div>
              <div>
                <h4 className="font-section-head text-section-head mb-2 text-[#C9A84C]">
                  LexAI Strategic Recommendation
                </h4>
                <p className="font-body-chat text-text-secondary mb-4 leading-relaxed">
                  Based on your current labor compliance status, your POSH annual report is reaching
                  a critical deadline. We recommend finalizing the draft today to avoid the ₹50,000
                  fine stipulated under the Sexual Harassment of Women at Workplace (Prevention,
                  Prohibition and Redressal) Act, 2013.
                </p>
                <div className="flex gap-2">
                  <button className="hover:bg-gold-hover rounded-lg bg-[#C9A84C] px-4 py-2 text-xs font-bold text-[#0A0A0B] transition-all">
                    Draft POSH Report
                  </button>
                  <button className="text-text-secondary rounded-lg border border-[#1E1E21] bg-transparent px-4 py-2 text-xs font-bold transition-all hover:border-[#C9A84C] hover:text-[#C9A84C]">
                    Remind Tomorrow
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section className="mt-major">
            <div className="group relative h-[200px] w-full overflow-hidden rounded-2xl">
              <img
                alt="Legal Background"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                data-alt="A professional legal library setting with rows of leather-bound books and warm ambient lighting. The scene is shot from a low angle with a shallow depth of field, emphasizing a high-end corporate atmosphere. Gold accents from desk lamps highlight the rich textures of the books and mahogany wood, creating a mood of wisdom, authority, and deep institutional trust."
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAFgiQ5UFxD7d2okwtYHn7ZaEymbhkgHW3R5S1n7yIAY0JQnZbgSoU5N4K4-kMpza_WeLVdLBHEpHiRMeNOb9nlgwf4Uwphi906x7BbWxq7mNoGCJLgRU0cbUnnvqoxpMoAI3AA8RcwrGQDhQntmTTan__9qvC6Np6LXxU6uny5cmRaPtUOm0aSc9shLqUdEQzAvu8LHnfq_FQAY0DBOIW0dB3B5KIh4womUlWxnAX26_mazlKcnmulz31n1mhEzdS3GeM4LIMl57s"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] via-[#0A0A0B]/60 to-transparent"></div>
              <div className="absolute bottom-6 left-6">
                <span className="font-label-caps text-label-caps mb-1 block text-[#abcfb6] uppercase">
                  Persona Insight
                </span>
                <h3 className="font-page-title text-xl text-white">SME Founder Guardrails</h3>
                <p className="mt-1 max-w-sm text-xs text-gray-300">
                  Protecting your enterprise with automated regulatory scanning and risk mitigation.
                </p>
              </div>
            </div>
          </section>
        </main>

        <footer className="font-noto-serif mt-auto w-full border-t border-[#1E1E21] bg-[#0A0A0B] py-12 text-xs tracking-widest uppercase opacity-80 transition-opacity hover:opacity-100">
          <div className="mx-auto grid max-w-7xl grid-cols-1 items-center px-8 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <span className="text-lg font-bold text-[#C9A84C]">LexAI</span>
              <p className="text-gray-600">
                © 2024 LexAI Intelligence. Trusted by Advocates &amp; SME Founders.
              </p>
            </div>
            <div className="flex flex-wrap gap-6 text-gray-600 md:justify-end">
              <a className="transition-opacity hover:text-[#C9A84C]" href="#">
                Privacy Policy
              </a>
              <a className="transition-opacity hover:text-[#C9A84C]" href="#">
                Terms of Service
              </a>
              <a className="transition-opacity hover:text-[#C9A84C]" href="#">
                AI Disclosure
              </a>
              <a className="transition-opacity hover:text-[#C9A84C]" href="#">
                Contact Support
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
