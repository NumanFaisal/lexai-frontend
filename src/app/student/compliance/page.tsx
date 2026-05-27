'use client';
import Link from 'next/link';
export default function Page() {
  return (
    <>
      <aside className="font-noto-serif fixed top-0 left-0 z-50 flex h-screen w-[240px] flex-col gap-2 border-r border-[#1E1E21] bg-[#111113] p-4 tracking-tight antialiased shadow-none">
        <div className="mb-8 flex items-center gap-3 px-2">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-gradient-to-br from-[#C9A84C] to-[#8E722A]">
            <span className="text-lg font-bold text-[#0A0A0B]">L</span>
          </div>
          <div>
            <h1 className="font-serif text-2xl font-bold tracking-tighter text-[#C9A84C]">LexAI</h1>
            <p className="text-[10px] tracking-widest text-gray-500 uppercase">
              Legal Intelligence
            </p>
          </div>
        </div>
        <button className="mb-6 flex scale-95 items-center justify-center gap-2 rounded-lg bg-[#C9A84C] px-4 py-2.5 font-bold text-[#0A0A0B] transition-transform active:scale-90">
          <span className="material-symbols-outlined text-sm">add</span>
          New Research Session
        </button>
        <nav className="flex-1 space-y-1">
          <Link
            href="/student/chat"
            className="flex items-center gap-3 rounded-lg p-2.5 text-gray-500 transition-all duration-200 hover:bg-[#1A1A1D] hover:text-[#C9A84C]"
          >
            <span className="material-symbols-outlined">chat_bubble</span>
            Legal Chat
          </Link>
          <Link
            href="/student/vault"
            className="flex items-center gap-3 rounded-lg p-2.5 text-gray-500 transition-all duration-200 hover:bg-[#1A1A1D] hover:text-[#C9A84C]"
          >
            <span className="material-symbols-outlined">account_balance</span>
            Research Vault
          </Link>
          <Link
            href="/student/drafts"
            className="flex items-center gap-3 rounded-lg p-2.5 text-gray-500 transition-all duration-200 hover:bg-[#1A1A1D] hover:text-[#C9A84C]"
          >
            <span className="material-symbols-outlined">edit_document</span>
            Contract Drafts
          </Link>
          <Link
            href="/student/compliance"
            className="relative flex items-center gap-3 rounded-lg bg-[#1A1A1D] p-2.5 font-semibold text-[#C9A84C] after:absolute after:right-0 after:h-4 after:w-1 after:rounded-full after:bg-[#C9A84C] after:content-['']"
          >
            <span className="material-symbols-outlined">verified</span>
            Compliance Hub
          </Link>
          <Link
            href="/student/premium"
            className="flex items-center gap-3 rounded-lg p-2.5 text-gray-500 transition-all duration-200 hover:bg-[#1A1A1D] hover:text-[#C9A84C]"
          >
            <span className="material-symbols-outlined">workspace_premium</span>
            Premium Access
          </Link>
        </nav>
        <div className="mt-auto space-y-1 border-t border-[#1E1E21] pt-4">
          <a
            className="flex items-center gap-3 rounded-lg p-2.5 text-gray-500 transition-all duration-200 hover:bg-[#1A1A1D] hover:text-[#C9A84C]"
            href="#"
          >
            <span className="material-symbols-outlined">help</span>
            Knowledge Base
          </a>
          <a
            className="flex items-center gap-3 rounded-lg p-2.5 text-gray-500 transition-all duration-200 hover:bg-[#1A1A1D] hover:text-[#C9A84C]"
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

      <div className="ml-[240px] flex min-h-screen flex-col">
        <header className="font-noto-serif sticky top-0 z-40 flex h-[52px] w-full items-center justify-between border-b border-[#1E1E21] bg-[#0A0A0B]/80 px-6 text-sm font-medium shadow-sm backdrop-blur-md">
          <div className="flex flex-1 items-center gap-4">
            <div className="relative w-full max-w-md">
              <span className="material-symbols-outlined absolute top-1/2 left-3 -translate-y-1/2 text-lg text-gray-500">
                search
              </span>
              <input
                className="w-full rounded-full border-none bg-[#111113] py-1.5 pr-4 pl-10 text-xs placeholder-gray-600 focus:ring-1 focus:ring-[#C9A84C44]"
                placeholder="Search MCA regulations, Tax forms..."
                type="text"
              />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-[#C9A84C]">
              <span className="material-symbols-outlined text-lg">gavel</span>
              <span className="text-xs font-bold">India (SC)</span>
            </div>
            <button className="rounded border border-[#C9A84C44] bg-[#C9A84C1A] px-3 py-1 text-xs font-bold text-[#C9A84C] transition-colors hover:bg-[#C9A84C] hover:text-[#0A0A0B]">
              Upgrade to Pro
            </button>
            <div className="flex items-center gap-3 text-gray-400">
              <span className="material-symbols-outlined cursor-pointer transition-colors hover:text-white">
                notifications
              </span>
              <span className="material-symbols-outlined cursor-pointer transition-colors hover:text-white">
                history
              </span>
              <span className="material-symbols-outlined cursor-pointer transition-colors hover:text-white">
                account_circle
              </span>
            </div>
          </div>
        </header>

        <main className="mx-auto w-full max-w-[1200px] flex-1 p-8">
          <section className="mb-12">
            <div className="flex flex-col items-end justify-between gap-6 md:flex-row">
              <div className="space-y-2">
                <span className="text-tertiary font-label-caps tracking-widest uppercase">
                  Student Research Workspace
                </span>
                <h2 className="font-page-title text-page-title text-text-primary">
                  Indian Corporate Compliance Hub
                </h2>
                <p className="text-text-secondary max-w-xl">
                  Deep-dive into MCA-21 requirements, SEBI regulations, and Income Tax compliance
                  for academic modeling and SME case studies.
                </p>
              </div>
              <div className="flex gap-3">
                <div className="flex flex-col items-end">
                  <span className="text-[10px] font-bold text-gray-500 uppercase">
                    Last Updated
                  </span>
                  <span className="font-citation text-primary text-sm">Oct 24, 2023 (FY24)</span>
                </div>
              </div>
            </div>
          </section>

          <div className="grid grid-cols-12 gap-6">
            <div className="group relative col-span-12 overflow-hidden rounded-xl border border-[#1E1E21] bg-[#111113] p-6 lg:col-span-8">
              <div className="absolute top-0 right-0 p-8 opacity-10 transition-opacity group-hover:opacity-20">
                <span className="material-symbols-outlined text-9xl">analytics</span>
              </div>
              <div className="relative z-10 flex h-full flex-col">
                <div className="mb-6 flex items-center gap-3">
                  <div className="bg-tertiary-container/10 rounded-lg p-2">
                    <span className="material-symbols-outlined text-tertiary">library_books</span>
                  </div>
                  <h3 className="font-section-head text-section-head">
                    Annual Filing Checklist (Form AOC-4)
                  </h3>
                </div>
                <div className="mb-8 space-y-4">
                  <div className="flex items-center justify-between rounded-lg border border-[#1E1E21] bg-[#1A1A1D] p-3">
                    <div className="flex items-center gap-4">
                      <span className="bg-success h-2 w-2 rounded-full"></span>
                      <span className="text-sm font-medium">Financial Statements (Sch III)</span>
                    </div>
                    <span className="font-citation bg-success/10 text-success border-success/20 rounded border px-2 py-0.5 text-[10px]">
                      ✓ VERIFIED
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-[#1E1E21] bg-[#1A1A1D] p-3">
                    <div className="flex items-center gap-4">
                      <span className="bg-warning h-2 w-2 rounded-full"></span>
                      <span className="text-sm font-medium">Board's Report Section 134</span>
                    </div>
                    <span className="font-citation bg-warning/10 text-warning border-warning/20 rounded border px-2 py-0.5 text-[10px]">
                      IN PROGRESS
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-[#1E1E21] bg-[#1A1A1D] p-3">
                    <div className="flex items-center gap-4">
                      <span className="bg-error h-2 w-2 rounded-full"></span>
                      <span className="text-sm font-medium">Auditor's Report ADT-1 Mapping</span>
                    </div>
                    <span className="font-citation bg-error/10 text-error border-error/20 rounded border px-2 py-0.5 text-[10px]">
                      ⚠ MISSING DATA
                    </span>
                  </div>
                </div>
                <div className="mt-auto flex gap-4">
                  <button className="rounded-lg bg-[#C9A84C] px-6 py-2 text-sm font-bold text-[#0A0A0B] transition-transform active:scale-95">
                    Generate Memo
                  </button>
                  <button className="text-text-primary rounded-lg border border-[#1E1E21] px-6 py-2 text-sm transition-colors hover:bg-[#1A1A1D]">
                    View Citations
                  </button>
                </div>
              </div>
            </div>

            <div className="col-span-12 flex flex-col items-center justify-center space-y-4 rounded-xl border border-[#1E1E21] bg-[#111113] p-6 text-center lg:col-span-4">
              <div className="relative flex h-32 w-32 items-center justify-center">
                <svg className="h-full w-full -rotate-90 transform">
                  <circle
                    className="text-[#1A1A1D]"
                    cx="64"
                    cy="64"
                    fill="transparent"
                    r="58"
                    stroke="currentColor"
                    strokeWidth="8"
                  ></circle>
                  <circle
                    className="text-tertiary"
                    cx="64"
                    cy="64"
                    fill="transparent"
                    r="58"
                    stroke="currentColor"
                    strokeDasharray="364"
                    strokeDashoffset="91"
                    strokeWidth="8"
                  ></circle>
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-tertiary text-3xl font-bold">75%</span>
                  <span className="font-label-caps text-[9px] text-gray-500">HUB READINESS</span>
                </div>
              </div>
              <h4 className="font-sub-heading text-sub-heading">Academic Research Score</h4>
              <p className="text-text-secondary text-xs">
                Your project "SME Tax Compliance" is reaching high accuracy benchmarks for statutory
                citations.
              </p>
            </div>

            <div className="bg-tertiary-container/5 border-tertiary-container/20 col-span-12 rounded-xl border p-6 md:col-span-6">
              <h3 className="font-section-head text-section-head mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-tertiary">event_note</span>
                Filing Timeline (Q3)
              </h3>
              <div className="space-y-6">
                <div className="border-tertiary-container/30 relative border-l pb-6 pl-6">
                  <div className="bg-tertiary absolute top-0 -left-[5px] h-2 w-2 rounded-full shadow-[0_0_8px_rgba(178,198,248,0.6)]"></div>
                  <div className="flex flex-col">
                    <span className="font-citation text-tertiary mb-1 text-[10px]">
                      NOV 15, 2023
                    </span>
                    <span className="text-sm font-semibold">GSTR-3B Summary Return</span>
                    <p className="text-text-secondary mt-1 text-xs">
                      Monthly summary of sales, purchases, and input tax credit.
                    </p>
                  </div>
                </div>
                <div className="border-tertiary-container/30 relative border-l pb-2 pl-6">
                  <div className="absolute top-0 -left-[5px] h-2 w-2 rounded-full bg-gray-600"></div>
                  <div className="flex flex-col">
                    <span className="font-citation mb-1 text-[10px] text-gray-500">
                      DEC 07, 2023
                    </span>
                    <span className="text-sm font-semibold">TDS Payment Deposit</span>
                    <p className="text-text-secondary mt-1 text-xs">
                      Deposit of TDS deducted in the month of November.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="group relative col-span-12 h-[280px] overflow-hidden rounded-xl md:col-span-6">
              <img
                alt="Indian Legal Concept"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                data-alt="A moody, high-contrast photograph of a classic wooden gavel resting on a leather-bound legal tome. The setting is a dimly lit, professional law library with warm amber light catching the dust in the air. The colors are deep mahoganies and soft golds, reflecting a premium and authoritative legal atmosphere. The composition is artistic and minimalist, evoking trust and historical legal weight."
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdz6GjXMdC30EGD6_MwKW5v44uG9lVHxhvEYgTU1wv_Q2AaZQp9FhQsVQnsNYk2dadcq5A5kiUJ2jzRXHVpapXLvMSbBVxd78yU7ujcV_9X332PqEPthPK081Ubbo00C_XGciMp0S607rrihZrykPB-zhO8V0J0IQcD8pAWT7ROsBeqoN9s37T6TECA_3LDB1BXhFnMWrc8jxAE6-hmTN091H7e0F_41omdeyzoPhNjTlMcdxgFbFCcQ15oaD7xJZYwrcN3rIeJU4"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <div className="mb-2 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-sm">
                    auto_awesome
                  </span>
                  <span className="text-primary text-[10px] font-bold tracking-widest uppercase">
                    AI Spotlight
                  </span>
                </div>
                <h4 className="font-section-head text-white">
                  The Impact of Section 135 on SME Growth
                </h4>
                <p className="mt-2 text-xs text-gray-300">
                  Latest research insight generated from 2,000+ MCA filings.
                </p>
              </div>
            </div>
          </div>

          <section className="mt-12">
            <div className="mb-8 flex items-center justify-between">
              <h3 className="font-section-head text-section-head">Resource Repository</h3>
              <a className="text-tertiary flex items-center gap-1 text-xs hover:underline" href="#">
                View All
                <span className="material-symbols-outlined text-xs">arrow_forward</span>
              </a>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="hover:border-tertiary/40 group rounded-lg border border-[#1E1E21] bg-[#111113] p-5 transition-colors">
                <span className="material-symbols-outlined text-tertiary mb-4 block transition-transform group-hover:scale-110">
                  description
                </span>
                <h5 className="mb-2 text-sm font-bold">Company Formation (OPC)</h5>
                <p className="text-text-secondary text-xs">
                  A step-by-step guide to One Person Company registration in India.
                </p>
              </div>
              <div className="hover:border-tertiary/40 group rounded-lg border border-[#1E1E21] bg-[#111113] p-5 transition-colors">
                <span className="material-symbols-outlined text-tertiary mb-4 block transition-transform group-hover:scale-110">
                  security
                </span>
                <h5 className="mb-2 text-sm font-bold">Data Privacy (DPDP 2023)</h5>
                <p className="text-text-secondary text-xs">
                  Summary of the new Digital Personal Data Protection Act requirements.
                </p>
              </div>
              <div className="hover:border-tertiary/40 group rounded-lg border border-[#1E1E21] bg-[#111113] p-5 transition-colors">
                <span className="material-symbols-outlined text-tertiary mb-4 block transition-transform group-hover:scale-110">
                  payments
                </span>
                <h5 className="mb-2 text-sm font-bold">GST Compliance Matrix</h5>
                <p className="text-text-secondary text-xs">
                  Interactive matrix for determining GST rates and HSN codes.
                </p>
              </div>
            </div>
          </section>
        </main>

        <footer className="font-noto-serif mt-auto w-full border-t border-[#1E1E21] bg-[#0A0A0B] py-12 text-xs tracking-widest uppercase">
          <div className="mx-auto grid max-w-7xl grid-cols-1 items-center px-8 md:grid-cols-2">
            <div className="flex flex-col gap-4">
              <span className="text-lg font-bold text-[#C9A84C]">LexAI</span>
              <p className="tracking-normal text-gray-600 normal-case">
                © 2024 LexAI Intelligence. Trusted by Advocates &amp; SME Founders.
              </p>
            </div>
            <div className="flex flex-wrap gap-x-8 gap-y-4 text-gray-600 md:justify-end">
              <a
                className="opacity-80 transition-opacity hover:text-[#C9A84C] hover:opacity-100"
                href="#"
              >
                Privacy Policy
              </a>
              <a
                className="opacity-80 transition-opacity hover:text-[#C9A84C] hover:opacity-100"
                href="#"
              >
                Terms of Service
              </a>
              <a
                className="opacity-80 transition-opacity hover:text-[#C9A84C] hover:opacity-100"
                href="#"
              >
                AI Disclosure
              </a>
              <a
                className="opacity-80 transition-opacity hover:text-[#C9A84C] hover:opacity-100"
                href="#"
              >
                Contact Support
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
