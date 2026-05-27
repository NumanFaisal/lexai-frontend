'use client';

import Link from 'next/link';
export default function Page() {
  return (
    <>
      <aside className="fixed top-0 left-0 z-50 flex h-screen w-[240px] flex-col gap-2 border-r border-[#1E1E21] bg-[#111113] p-4 shadow-none">
        <div className="mb-4 flex flex-col gap-1 px-2 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-gradient-to-br from-[#C9A84C] to-[#E8C96A] shadow-lg">
              <span className="font-logo text-sm font-bold text-[#111113]">L</span>
            </div>
            <h1 className="font-serif text-2xl font-bold tracking-tighter text-[#C9A84C]">LexAI</h1>
          </div>
          <p className="font-noto-serif mt-1 pl-11 text-xs tracking-tight text-[#C9A84C] antialiased opacity-80">
            Legal Intelligence
          </p>
        </div>
        <button className="font-sub-heading text-sub-heading mb-4 flex w-full scale-95 items-center justify-center gap-2 rounded-lg bg-[#C9A84C] px-4 py-2.5 text-[#111113] transition-transform hover:bg-[#E8C96A] active:scale-90">
          <span className="material-symbols-outlined text-[18px]">add</span>
          New Research Session
        </button>
        <nav className="flex flex-1 flex-col gap-1">
          <Link
            href="/student/chat"
            className="relative flex items-center gap-3 rounded-lg px-3 py-2 font-semibold text-[#C9A84C] after:absolute after:right-0 after:h-4 after:w-1 after:rounded-full after:bg-[#C9A84C] after:content-[''] hover:bg-[#1A1A1D]"
          >
            <span
              className="material-symbols-outlined text-[20px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              chat_bubble
            </span>
            Legal Chat
          </Link>

          <Link
            href="/student/vault"
            className="font-sub-heading text-sub-heading flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all duration-200 hover:bg-[#1A1A1D] hover:text-[#C9A84C]"
          >
            <span className="material-symbols-outlined text-[20px]">account_balance</span>
            Research Vault
          </Link>
          <Link
            href="/student/drafts"
            className="font-sub-heading text-sub-heading flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all duration-200 hover:bg-[#1A1A1D] hover:text-[#C9A84C]"
          >
            <span className="material-symbols-outlined text-[20px]">edit_document</span>
            Contract Drafts
          </Link>
          <Link
            href="/student/compliance"
            className="font-sub-heading text-sub-heading flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all duration-200 hover:bg-[#1A1A1D] hover:text-[#C9A84C]"
          >
            <span className="material-symbols-outlined text-[20px]">verified</span>
            Compliance Hub
          </Link>
          <Link
            href="/student/premium"
            className="font-sub-heading text-sub-heading flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all duration-200 hover:bg-[#1A1A1D] hover:text-[#C9A84C]"
          >
            <span className="material-symbols-outlined text-[20px]">workspace_premium</span>
            Premium Access
          </Link>
        </nav>

        <div className="bg-bg-elevated border-border-default mb-4 rounded-lg border px-3 py-3">
          <div className="mb-2 flex items-center justify-between">
            <span className="font-meta-small text-meta-small text-text-secondary">
              Student Plan
            </span>
            <span className="font-meta-small text-meta-small text-tertiary">186/200</span>
          </div>
          <div className="bg-surface-variant h-1 w-full overflow-hidden rounded-full">
            <div className="bg-tertiary h-full w-[93%] rounded-full"></div>
          </div>
        </div>
        <div className="mt-auto flex flex-col gap-1 border-t border-[#1E1E21] pt-4">
          <a
            className="font-sub-heading text-sub-heading flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all duration-200 hover:bg-[#1A1A1D] hover:text-[#C9A84C]"
            href="#"
          >
            <span className="material-symbols-outlined text-[20px]">help</span>
            Knowledge Base
          </a>
          <a
            className="font-sub-heading text-sub-heading flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all duration-200 hover:bg-[#1A1A1D] hover:text-[#C9A84C]"
            href="#"
          >
            <span className="material-symbols-outlined text-[20px]">settings</span>
            Settings
          </a>
          <button
            onClick={() => {
              document.cookie = "token=; path=/; max-age=0";
              window.location.href = "/auth/login";
            }}
            className="font-sub-heading text-sub-heading flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all duration-200 hover:bg-[#1A1A1D] hover:text-error cursor-pointer text-left w-full"
          >
            <span className="material-symbols-outlined text-[20px]">logout</span>
            Log Out
          </button>
        </div>
      </aside>

      <div className="relative ml-[240px] flex h-screen flex-1 flex-col">
        <header className="sticky top-0 z-40 flex h-[52px] w-full max-w-full items-center justify-between border-b border-[#1E1E21] bg-[#0A0A0B]/80 px-6 shadow-sm backdrop-blur-md">
          <div className="border-border-default bg-bg-secondary flex w-64 items-center rounded-md border px-3 py-1.5 text-gray-400 transition-colors focus-within:text-white focus:ring-1 focus:ring-[#C9A84C44]">
            <span className="material-symbols-outlined mr-2 text-[18px]">search</span>
            <input
              className="text-text-primary w-full border-none bg-transparent text-sm placeholder-gray-500 outline-none"
              placeholder="Search case laws, notes..."
              type="text"
            />
          </div>
          <div className="flex items-center gap-4">
            <span className="font-noto-serif text-sm font-medium text-gray-400">India (SC)</span>
            <button className="font-noto-serif rounded border border-[#C9A84C] px-3 py-1.5 text-sm font-medium text-[#C9A84C] transition-colors hover:bg-[#C9A84C1A] focus:ring-1 focus:ring-[#C9A84C44]">
              Upgrade to Pro
            </button>
            <div className="flex items-center gap-3 text-gray-400">
              <button className="rounded transition-colors hover:text-white focus:ring-1 focus:ring-[#C9A84C44]">
                <span className="material-symbols-outlined">notifications</span>
              </button>
              <button className="rounded transition-colors hover:text-white focus:ring-1 focus:ring-[#C9A84C44]">
                <span className="material-symbols-outlined">history</span>
              </button>
              <button className="rounded transition-colors hover:text-white focus:ring-1 focus:ring-[#C9A84C44]">
                <span className="material-symbols-outlined">account_circle</span>
              </button>
            </div>
          </div>
        </header>

        <main className="relative flex flex-1 flex-col overflow-hidden">
          <div className="border-border-default bg-bg-primary flex items-center gap-2 border-b px-8 py-4">
            <button className="bg-tertiary/10 text-tertiary font-sub-heading text-sub-heading border-tertiary/20 flex items-center gap-2 rounded-full border px-4 py-1.5">
              <span className="material-symbols-outlined text-[16px]">balance</span>
              Research
            </button>
            <button className="text-text-muted hover:text-text-primary font-sub-heading text-sub-heading rounded-full px-4 py-1.5 transition-colors">
              Bare Act Explainer
            </button>
            <button className="text-text-muted hover:text-text-primary font-sub-heading text-sub-heading rounded-full px-4 py-1.5 transition-colors">
              Moot Court Prep
            </button>
          </div>

          <div className="mx-auto flex w-full max-w-[720px] flex-1 flex-col gap-6 overflow-y-auto px-6 py-8 pb-48">
            <div className="bg-tertiary-container text-on-tertiary-container flex max-w-[85%] flex-col gap-2 self-end rounded-[14px] rounded-br-sm p-4 shadow-sm">
              <p className="font-body-chat text-body-chat">
                What did the Supreme Court hold in Maneka Gandhi v. Union of India?
              </p>
            </div>

            <div className="bg-bg-secondary border-border-default relative flex w-full max-w-[90%] flex-col gap-4 self-start rounded-[14px] rounded-tl-sm border p-5 shadow-sm">
              <div className="mb-1 flex items-center gap-2">
                <span className="material-symbols-outlined text-tertiary text-[14px]">school</span>
                <span className="font-meta-small text-meta-small text-tertiary tracking-wider uppercase">
                  Student Research Mode
                </span>
              </div>
              <div className="font-body-chat text-body-chat text-text-primary flex flex-col gap-3">
                <p>
                  In <strong>Maneka Gandhi v. Union of India</strong>, the Supreme Court
                  dramatically expanded the scope of Article 21 of the Indian Constitution.
                </p>
                <p>
                  The Court held that the "procedure established by law" required to deprive a
                  person of their life or personal liberty must be{' '}
                  <em>just, fair, and reasonable</em>, not arbitrary, fanciful, or oppressive. This
                  effectively introduced the American concept of procedural due process into Indian
                  constitutional law.
                </p>
                <p>
                  It also ruled that Articles 14, 19, and 21 are not mutually exclusive but are
                  interconnected, forming a "golden triangle" of fundamental rights.
                </p>
              </div>

              <div className="border-border-default/50 mt-2 flex flex-wrap items-center gap-2 border-t pt-4">
                <span className="bg-success/10 text-success border-success/20 text-citation font-citation inline-flex items-center gap-1.5 rounded border px-2.5 py-1 shadow-sm">
                  <span className="material-symbols-outlined text-[12px] font-bold">check</span>
                  AIR 1978 SC 597
                </span>
                <a
                  className="text-tertiary font-meta-small text-meta-small flex items-center gap-1 hover:underline"
                  href="#"
                >
                  View full judgment on Indian Kanoon
                  <span className="material-symbols-outlined text-[12px]">open_in_new</span>
                </a>
              </div>
            </div>
          </div>

          <div className="from-bg-primary via-bg-primary absolute bottom-0 left-0 z-10 flex w-full flex-col items-center gap-4 bg-gradient-to-t to-transparent px-6 pt-12 pb-6">
            <div className="bg-bg-secondary border-border-default focus-within:border-tertiary/50 flex w-full max-w-[720px] items-end gap-2 rounded-[14px] border p-2 transition-all focus-within:shadow-[0_0_0_1px_rgba(178,198,248,0.2)]">
              <button className="text-text-muted hover:text-tertiary mb-1 rounded-lg p-2 transition-colors">
                <span className="material-symbols-outlined">mic</span>
              </button>
              <textarea
                className="font-body-ui text-body-ui text-text-primary placeholder-text-muted max-h-[120px] flex-1 resize-none border-none bg-transparent px-2 py-3 outline-none"
                placeholder="Ask any case law question..."
                rows={1}
              ></textarea>
              <button className="bg-tertiary text-on-tertiary-container hover:bg-tertiary-fixed-dim mb-1 rounded-lg p-2 shadow-sm transition-colors">
                <span
                  className="material-symbols-outlined text-[20px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  arrow_upward
                </span>
              </button>
            </div>

            <div className="bg-warning/10 border-warning/20 text-warning font-meta-small text-meta-small flex w-full max-w-[720px] items-center justify-between rounded-lg border p-2.5 shadow-sm">
              <span className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[14px]">info</span>5 queries left
                this month.
              </span>
              <a
                className="hover:text-gold-hover flex items-center gap-1 font-semibold transition-colors"
                href="#"
              >
                Upgrade to Student Plan (₹199/mo) for 200 queries
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </a>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
