'use client';
import Link from 'next/link';
export default function Page() {
  return (
    <>
      <aside className="fixed top-0 left-0 z-50 flex h-screen w-[240px] flex-col gap-2 border-r border-[#1E1E21] bg-[#111113] p-4">
        <div className="mb-8 px-2">
          <h1 className="font-noto-serif text-2xl font-bold tracking-tighter text-[#C9A84C]">
            LexAI
          </h1>
          <p className="text-[10px] font-medium tracking-widest text-gray-500 uppercase">
            Legal Intelligence
          </p>
        </div>
        <button className="bg-primary-container text-on-primary-container mb-6 flex w-full scale-95 items-center justify-center gap-2 rounded-lg py-3 font-semibold transition-transform active:scale-90">
          <span className="material-symbols-outlined">add</span>
          New Research Session
        </button>
        <nav className="flex flex-col gap-1">
          <Link
            href="/student/chat"
            className="flex items-center gap-3 rounded-lg p-3 text-gray-500 transition-all duration-200 hover:bg-[#1A1A1D] hover:text-[#C9A84C]"
          >
            <span className="material-symbols-outlined">chat_bubble</span>
            Legal Chat
          </Link>

          <Link
            href="/student/vault"
            className="relative flex items-center gap-3 rounded-lg bg-[#1A1A1D] p-3 font-semibold text-[#C9A84C] after:absolute after:right-0 after:h-4 after:w-1 after:rounded-full after:bg-[#C9A84C] after:content-['']"
          >
            <span className="material-symbols-outlined">account_balance</span>
            Research Vault
          </Link>
          <Link
            href="/business/drafts"
            className="flex items-center gap-3 rounded-lg p-3 text-gray-500 transition-all duration-200 hover:bg-[#1A1A1D] hover:text-[#C9A84C]"
          >
            <span className="material-symbols-outlined">edit_document</span>
            Contract Drafts
          </Link>
          <Link
            href="/business/compliance"
            className="flex items-center gap-3 rounded-lg p-3 text-gray-500 transition-all duration-200 hover:bg-[#1A1A1D] hover:text-[#C9A84C]"
          >
            <span className="material-symbols-outlined">verified</span>
            Compliance Hub
          </Link>
          <Link
            href="/pricing"
            className="flex items-center gap-3 rounded-lg p-3 text-gray-500 transition-all duration-200 hover:bg-[#1A1A1D] hover:text-[#C9A84C]"
          >
            <span className="material-symbols-outlined">workspace_premium</span>
            Premium Access
          </Link>
        </nav>
        <div className="mt-auto flex flex-col gap-1 border-t border-[#1E1E21] pt-4">
          <a
            className="flex items-center gap-3 rounded-lg p-3 text-gray-500 transition-all duration-200 hover:bg-[#1A1A1D] hover:text-[#C9A84C]"
            href="#"
          >
            <span className="material-symbols-outlined">help</span>
            Knowledge Base
          </a>
          <a
            className="flex items-center gap-3 rounded-lg p-3 text-gray-500 transition-all duration-200 hover:bg-[#1A1A1D] hover:text-[#C9A84C]"
            href="#"
          >
            <span className="material-symbols-outlined">settings</span>
            Settings
          </a>
          <button
            onClick={() => {
              document.cookie = "token=; path=/; max-age=0";
              window.location.href = "/auth/login";
            }}
            className="font-sub-heading text-sub-heading flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all duration-200 hover:bg-[#1A1A1D] hover:text-error cursor-pointer text-left w-full"
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>logout</span>
            <span>Log Out</span>
          </button>

        </div>
      </aside>

      <main className="ml-[240px] flex min-h-screen flex-col">
        <header className="font-noto-serif sticky top-0 z-40 flex h-[52px] w-full items-center justify-between border-b border-[#1E1E21] bg-[#0A0A0B]/80 px-6 text-sm font-medium backdrop-blur-md">
          <div className="flex w-1/2 items-center gap-4">
            <div className="relative w-full max-w-md">
              <span className="material-symbols-outlined absolute top-1/2 left-3 -translate-y-1/2 text-lg text-gray-500">
                search
              </span>
              <input
                className="w-full rounded-full border border-[#1E1E21] bg-[#111113] py-1.5 pr-4 pl-10 text-xs transition-all outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C44]"
                placeholder="Search GST exemptions or DPDP compliance..."
                type="text"
              />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-success flex items-center gap-2">
              <span className="bg-success h-2 w-2 animate-pulse rounded-full"></span>
              <span className="text-[11px] font-semibold tracking-wide">
                India (SC) Jurisdiction
              </span>
            </div>
            <div className="flex items-center gap-4 border-l border-[#1E1E21] pl-6">
              <button className="material-symbols-outlined text-gray-400 transition-colors hover:text-white">
                notifications
              </button>
              <button className="material-symbols-outlined text-gray-400 transition-colors hover:text-white">
                history
              </button>
              <button className="rounded-md border border-[#C9A84C] px-4 py-1.5 text-[11px] font-bold text-[#C9A84C] transition-all hover:bg-[#C9A84C] hover:text-[#0A0A0B]">
                Upgrade to Pro
              </button>
            </div>
          </div>
        </header>

        <div className="py-block px-standard flex flex-grow flex-col items-center">
          <div className="space-y-major w-full max-w-[720px]">
            <div className="space-y-micro">
              <h2 className="font-page-title text-page-title text-text-primary">Legal Research</h2>
              <p className="font-body-ui text-text-secondary text-sm">
                Analyze complex regulations through a simplified, business-first lens.
              </p>
            </div>

            <div className="grid grid-cols-12 gap-4">
              <div className="p-standard group relative col-span-12 cursor-pointer overflow-hidden rounded-xl border border-[#1E1E21] bg-[#111113] transition-all hover:border-[#C9A84C44] md:col-span-7">
                <div className="mb-major flex items-start justify-between">
                  <div>
                    <span className="text-secondary-fixed rounded border border-[#2d4d3a] bg-[#2d4d3a]/30 px-2 py-0.5 text-[10px] font-bold tracking-widest uppercase">
                      Finance
                    </span>
                    <h3 className="font-section-head text-section-head mt-2">
                      GST Compliance 2024
                    </h3>
                    <p className="text-text-secondary mt-1 text-xs">
                      Updates on Input Tax Credit and GSTR-3B filings for SMEs.
                    </p>
                  </div>
                  <div className="text-secondary flex h-12 w-12 items-center justify-center rounded-full bg-[#2d4d3a] text-2xl">
                    <span className="material-symbols-outlined">payments</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <span className="font-citation rounded border border-white/10 bg-white/5 px-2 py-1 text-[10px]">
                    8 New Updates
                  </span>
                  <span className="font-citation rounded border border-white/10 bg-white/5 px-2 py-1 text-[10px]">
                    Tier 2 Ready
                  </span>
                </div>
              </div>

              <div className="p-standard group col-span-12 flex cursor-pointer flex-col rounded-xl border border-[#1E1E21] bg-[#111113] transition-all hover:border-[#C9A84C44] md:col-span-5">
                <div className="mb-small flex h-10 w-10 items-center justify-center rounded-lg bg-[#C9A84C1A] text-[#C9A84C]">
                  <span className="material-symbols-outlined">shield</span>
                </div>
                <h3 className="font-section-head mb-1 text-[17px]">DPDP Act Guide</h3>
                <p className="text-text-secondary mb-4 text-[12px] leading-relaxed">
                  Data privacy obligations for Indian business founders.
                </p>
                <div className="mt-auto">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      <div className="bg-surface-container-high h-6 w-6 overflow-hidden rounded-full border-2 border-[#111113]">
                        <img
                          className="h-full w-full object-cover"
                          data-alt="Professional headshot of a legal expert in business law with a clean, minimalist studio background. The portrait features soft, directional lighting highlighting confidence and expertise, aligned with a premium corporate aesthetic."
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9nYVnl08-Jt9TNsVZSuy0oTzlON-pmaIhv_28tII3hHJq24hCQGAklxIr0qz_7zniW3VS32lwyYqyl54gfLHnmQv_Axy6KFRZkr8j2XjR8SzC6_8ldw4JUJqz1DVFXi11oiGAT3TirhVQBytttWQw8F9mSB5iVPm2wuhBHgEbuLF1HV-aJsqMnLmT1GTP7dMv4E3Vcn0cQop2Uq2wU14x7CiZR-SkoWpSLX8RltOOscfJZbREZ-gbemBwVdBYRwagIRM9psMNEKk"
                        />
                      </div>
                      <div className="bg-surface-container-high flex h-6 w-6 items-center justify-center rounded-full border-2 border-[#111113] text-[8px] font-bold">
                        +12
                      </div>
                    </div>
                    <span className="text-[10px] text-gray-500">Legal reviews this week</span>
                  </div>
                </div>
              </div>

              <div className="p-standard col-span-12 flex items-center justify-between rounded-xl border border-[#1E1E21] bg-gradient-to-br from-[#111113] to-[#1A1A1D]">
                <div className="flex items-center gap-4">
                  <div className="bg-tertiary-container/10 text-tertiary rounded-xl p-3">
                    <span className="material-symbols-outlined text-3xl">groups</span>
                  </div>
                  <div>
                    <h4 className="font-sub-heading text-sub-heading">Labor Law Codes</h4>
                    <p className="text-text-secondary text-xs">
                      Awaiting notification: Industrial Relations &amp; Social Security.
                    </p>
                  </div>
                </div>
                <button className="rounded-full border border-[#1E1E21] p-2 transition-colors hover:bg-white/5">
                  <span className="material-symbols-outlined">chevron_right</span>
                </button>
              </div>
            </div>

            <div className="space-y-standard">
              <div className="flex items-center justify-between border-b border-[#1E1E21] pb-2">
                <span className="font-label-caps text-label-caps text-text-secondary uppercase">
                  Active Session
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-success flex items-center gap-1 text-[11px]">
                    <span
                      className="material-symbols-outlined text-sm"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      verified
                    </span>
                    Highly Confident
                  </span>
                </div>
              </div>

              <div className="space-y-major">
                <div className="flex flex-col items-end gap-2">
                  <div className="text-on-primary-container max-w-[85%] rounded-2xl rounded-tr-none bg-gradient-to-r from-[#C9A84C] to-[#E8C96A] px-4 py-3 shadow-lg">
                    <p className="font-body-chat text-body-chat leading-relaxed font-medium">
                      Explain the impact of Digital Personal Data Protection (DPDP) Act on a SaaS
                      startup handling customer emails in India.
                    </p>
                  </div>
                  <span className="text-[10px] text-gray-500">10:42 AM</span>
                </div>

                <div className="flex flex-col items-start gap-2">
                  <div className="mb-1 flex items-center gap-2">
                    <div className="flex items-center gap-1 rounded border border-[#1E1E21] bg-[#1A1A1D] px-2 py-0.5">
                      <span className="material-symbols-outlined text-[12px] text-[#C9A84C]">
                        gavel
                      </span>
                      <span className="text-[9px] font-bold tracking-tighter text-[#C9A84C] uppercase">
                        Research Mode
                      </span>
                    </div>
                  </div>
                  <div className="text-text-primary max-w-[90%] rounded-2xl rounded-tl-none border border-[#1E1E21] bg-[#141416] px-5 py-4 shadow-sm">
                    <p className="font-body-chat text-body-chat mb-4 leading-relaxed">
                      Under the DPDP Act 2023, your SaaS startup is classified as a{' '}
                      <strong className="text-[#C9A84C]">Data Fiduciary</strong>. Key impacts
                      include:
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-secondary mt-0.5 text-sm">
                          check_circle
                        </span>
                        <p className="text-[13px]">
                          <span className="font-bold">Consent Management:</span> You must provide
                          notice in English and all 22 languages (if applicable) before collecting
                          emails.
                        </p>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-secondary mt-0.5 text-sm">
                          check_circle
                        </span>
                        <p className="text-[13px]">
                          <span className="font-bold">Data Protection Officer (DPO):</span> Required
                          if your processing is considered "Significant".
                        </p>
                      </li>
                    </ul>

                    <div className="mt-6 border-t border-[#1E1E21] pt-4">
                      <div className="mb-2 flex items-center gap-2">
                        <span className="text-text-secondary text-[10px] font-bold tracking-widest uppercase">
                          Verified Sources
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <div className="flex items-center gap-1.5 rounded border border-[#C9A84C44] bg-[#C9A84C1A] px-2 py-1">
                          <span className="text-success text-[10px]">✓</span>
                          <span className="font-citation text-citation text-[#C9A84C]">
                            The Gazette of India: DPDP Act 2023, Sec 6(1)
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 rounded border border-white/10 bg-white/5 px-2 py-1">
                          <span className="material-symbols-outlined text-[12px] text-gray-500">
                            link
                          </span>
                          <span className="font-citation text-citation text-gray-400">
                            MeitY Advisory 2024/02
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="ml-4 flex gap-4">
                    <button className="flex items-center gap-1 text-[11px] text-gray-500 transition-colors hover:text-white">
                      <span className="material-symbols-outlined text-sm">content_copy</span> Copy
                    </button>
                    <button className="flex items-center gap-1 text-[11px] text-gray-500 transition-colors hover:text-white">
                      <span className="material-symbols-outlined text-sm">share</span> Export PDF
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-major sticky bottom-6">
                <div className="flex items-center gap-2 rounded-[14px] border border-[#1E1E21] bg-[#111113] p-2 shadow-2xl transition-all focus-within:border-[#C9A84C]">
                  <button className="flex h-10 w-10 items-center justify-center text-gray-400 transition-colors hover:text-[#C9A84C]">
                    <span className="material-symbols-outlined">mic</span>
                  </button>
                  <input
                    className="text-text-primary flex-grow border-none bg-transparent px-2 text-sm focus:ring-0"
                    placeholder="Ask about GST refunds or labor compliance..."
                    type="text"
                  />
                  <button className="hover:bg-gold-hover flex h-10 w-10 items-center justify-center rounded-[10px] bg-[#C9A84C] text-[#0A0A0B] shadow-lg transition-colors">
                    <span className="material-symbols-outlined">send</span>
                  </button>
                </div>
                <p className="mt-3 text-center text-[10px] font-medium text-gray-600">
                  LexAI provides general legal intelligence. Consult a qualified professional for
                  binding advice.
                </p>
              </div>
            </div>
          </div>
        </div>

        <footer className="mt-auto w-full border-t border-[#1E1E21] bg-[#0A0A0B] py-12">
          <div className="mx-auto grid max-w-7xl grid-cols-1 items-center px-8 md:grid-cols-2">
            <div className="space-y-2">
              <p className="font-noto-serif text-lg font-bold text-[#C9A84C]">LexAI</p>
              <p className="font-noto-serif text-xs tracking-widest text-gray-600 uppercase">
                © 2024 LexAI Intelligence. Trusted by Advocates &amp; SME Founders.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 md:mt-0 md:justify-end">
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
      </main>
    </>
  );
}
