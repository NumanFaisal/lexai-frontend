import Link from 'next/link';
export default function Page() {
  return (
    <>
      <aside className="fixed top-0 left-0 z-50 flex h-screen w-[240px] flex-col gap-2 border-r border-[#1E1E21] bg-[#111113] p-4">
        <div className="mb-8 flex flex-col gap-1 px-2">
          <span className="font-serif text-2xl font-bold tracking-tighter text-[#C9A84C]">
            LexAI
          </span>
          <span className="font-noto-serif text-[10px] tracking-widest text-gray-500 uppercase">
            Legal Intelligence
          </span>
        </div>
        <nav className="flex flex-grow flex-col gap-2">
          <Link
            href="/student/chat"
            className="flex items-center gap-3 rounded-lg p-3 text-gray-500 transition-all duration-200 hover:bg-[#1A1A1D] hover:text-[#C9A84C]"
          >
            <span className="material-symbols-outlined">chat_bubble</span>
            <span className="font-noto-serif text-sm">Legal Chat</span>
          </Link>
          <Link
            href="/student/vault"
            className="flex items-center gap-3 rounded-lg p-3 text-gray-500 transition-all duration-200 hover:bg-[#1A1A1D] hover:text-[#C9A84C]"
          >
            <span className="material-symbols-outlined">account_balance</span>
            <span className="font-noto-serif text-sm">Research Vault</span>
          </Link>

          <Link
            href="/student/drafts"
            className="relative flex items-center gap-3 rounded-lg bg-[#1A1A1D] p-3 font-semibold text-[#C9A84C] after:absolute after:right-0 after:h-4 after:w-1 after:rounded-full after:bg-[#C9A84C] after:content-['']"
          >
            <span className="material-symbols-outlined">edit_document</span>
            <span className="font-noto-serif text-sm">Contract Drafts</span>
          </Link>
          <Link
            href="/business/compliance"
            className="flex items-center gap-3 rounded-lg p-3 text-gray-500 transition-all duration-200 hover:bg-[#1A1A1D] hover:text-[#C9A84C]"
          >
            <span className="material-symbols-outlined">verified</span>
            <span className="font-noto-serif text-sm">Compliance Hub</span>
          </Link>
          <Link
            href="/pricing"
            className="flex items-center gap-3 rounded-lg p-3 text-gray-500 transition-all duration-200 hover:bg-[#1A1A1D] hover:text-[#C9A84C]"
          >
            <span className="material-symbols-outlined">workspace_premium</span>
            <span className="font-noto-serif text-sm">Premium Access</span>
          </Link>
        </nav>
        <button className="mb-4 w-full scale-95 rounded-lg bg-[#C9A84C] py-3 text-xs font-bold tracking-tight text-[#0A0A0B] uppercase transition-transform active:scale-90">
          New Research Session
        </button>
        <div className="flex flex-col gap-2 border-t border-[#1E1E21] pt-4">
          <a
            className="flex items-center gap-3 p-3 text-gray-500 transition-all duration-200 hover:text-[#C9A84C]"
            href="#"
          >
            <span className="material-symbols-outlined">help</span>
            <span className="font-noto-serif text-sm">Knowledge Base</span>
          </a>
          <a
            className="flex items-center gap-3 p-3 text-gray-500 transition-all duration-200 hover:text-[#C9A84C]"
            href="#"
          >
            <span className="material-symbols-outlined">settings</span>
            <span className="font-noto-serif text-sm">Settings</span>
          </a>
        </div>
      </aside>

      <header className="sticky top-0 z-40 ml-[240px] flex h-[52px] w-full max-w-[calc(100%-240px)] items-center justify-between border-b border-[#1E1E21] bg-[#0A0A0B]/80 px-6 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 rounded-full border border-[#1E1E21] bg-[#111113] px-3 py-1 focus-within:ring-1 focus-within:ring-[#C9A84C44]">
            <span className="material-symbols-outlined text-sm text-gray-500">search</span>
            <input
              className="text-on-surface w-48 border-none bg-transparent text-xs focus:ring-0"
              placeholder="Search templates..."
              type="text"
            />
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="font-noto-serif flex items-center gap-2 text-sm font-medium text-[#C9A84C]">
            <span className="material-symbols-outlined text-sm">gavel</span>
            <span>India (SC)</span>
          </div>
          <div className="flex items-center gap-4 text-gray-400">
            <span className="material-symbols-outlined cursor-pointer transition-colors hover:text-white">
              notifications
            </span>
            <span className="material-symbols-outlined cursor-pointer transition-colors hover:text-white">
              history
            </span>
            <span className="material-symbols-outlined cursor-pointer transition-colors hover:text-white">
              account_circle
            </span>
            <button className="hover:bg-gold-hover rounded-full bg-[#C9A84C] px-4 py-1.5 text-xs font-bold text-[#0A0A0B] transition-colors">
              Upgrade to Pro
            </button>
          </div>
        </div>
      </header>

      <main className="p-block ml-[240px] min-h-screen">
        <div className="px-major mx-auto max-w-[1024px]">
          <div className="mb-major flex items-end justify-between">
            <div>
              <h1 className="font-page-title text-page-title text-primary mb-2">Contract Drafts</h1>
              <p className="text-text-secondary text-body-ui">
                Manage your legal templates and active drafting sessions.
              </p>
            </div>
            <button className="px-large py-component flex items-center gap-2 rounded-xl bg-[#C9A84C] font-bold text-[#0A0A0B] shadow-lg transition-all hover:shadow-[#C9A84C22]">
              <span className="material-symbols-outlined">add_circle</span>
              <span>New Draft</span>
            </button>
          </div>

          <div className="gap-standard mb-major grid grid-cols-3">
            <div className="bg-bg-secondary border-border-default p-standard rounded-xl border">
              <div className="text-label-caps text-text-muted mb-micro">ACTIVE DRAFTS</div>
              <div className="flex items-baseline gap-2">
                <span className="text-section-head text-primary font-bold">14</span>
                <span className="text-meta-small text-success">+3 this week</span>
              </div>
            </div>
            <div className="bg-bg-secondary border-border-default p-standard rounded-xl border">
              <div className="text-label-caps text-text-muted mb-micro">PENDING REVIEW</div>
              <div className="flex items-baseline gap-2">
                <span className="text-section-head text-warning font-bold">08</span>
                <span className="text-meta-small text-text-muted">Avg. 2 days</span>
              </div>
            </div>
            <div className="bg-bg-secondary border-border-default p-standard rounded-xl border">
              <div className="text-label-caps text-text-muted mb-micro">COMPLETED</div>
              <div className="flex items-baseline gap-2">
                <span className="text-section-head text-text-primary font-bold">142</span>
                <span className="text-meta-small text-text-muted">Total finalized</span>
              </div>
            </div>
          </div>

          <h2 className="font-section-head text-section-head mb-standard text-text-primary">
            Master Templates
          </h2>
          <div className="gap-standard mb-block grid grid-cols-4">
            <div className="group bg-bg-secondary border-border-default p-standard hover:border-primary-container relative col-span-2 flex h-48 cursor-pointer flex-col justify-between overflow-hidden rounded-xl border transition-all">
              <div className="flex items-start justify-between">
                <span className="material-symbols-outlined text-primary text-3xl">
                  corporate_fare
                </span>
                <span className="text-label-caps bg-gold-subtle text-primary rounded px-2 py-1">
                  MOST USED
                </span>
              </div>
              <div>
                <h3 className="font-sub-heading text-sub-heading text-text-primary">
                  Shareholders' Agreement
                </h3>
                <p className="text-meta-small text-text-muted">
                  Updated for 2024 Companies Act compliance.
                </p>
              </div>
            </div>
            <div className="group bg-bg-secondary border-border-default p-standard hover:border-primary-container gap-component flex cursor-pointer flex-col items-center justify-center rounded-xl border text-center transition-all">
              <span className="material-symbols-outlined text-secondary text-2xl">handshake</span>
              <span className="font-sub-heading text-body-ui">Vendor Service Level</span>
            </div>
            <div className="group bg-bg-secondary border-border-default p-standard hover:border-primary-container gap-component flex cursor-pointer flex-col items-center justify-center rounded-xl border text-center transition-all">
              <span className="material-symbols-outlined text-error text-2xl">lock</span>
              <span className="font-sub-heading text-body-ui">Mutual NDA (India)</span>
            </div>
          </div>

          <div className="bg-bg-secondary border-border-default overflow-hidden rounded-xl border">
            <div className="p-standard border-border-default bg-surface-container-low flex items-center justify-between border-b">
              <h3 className="font-section-head text-body-ui font-semibold">Recent Contracts</h3>
              <div className="gap-small flex">
                <button className="text-meta-small bg-bg-tertiary text-text-secondary border-border-default rounded-full border px-3 py-1">
                  Filter
                </button>
                <button className="text-meta-small bg-bg-tertiary text-text-secondary border-border-default rounded-full border px-3 py-1">
                  Export
                </button>
              </div>
            </div>
            <div className="divide-border-default divide-y">
              <div className="p-standard hover:bg-bg-tertiary group flex items-center justify-between transition-colors">
                <div className="gap-standard flex items-center">
                  <div className="bg-surface-container-high text-primary flex h-10 w-10 items-center justify-center rounded-lg">
                    <span className="material-symbols-outlined">description</span>
                  </div>
                  <div>
                    <h4 className="text-body-ui text-text-primary font-semibold">
                      Commercial Lease - Mumbai BKC
                    </h4>
                    <p className="text-meta-small text-text-muted">
                      Last modified: 2 hours ago by Adv. Sharma
                    </p>
                  </div>
                </div>
                <div className="gap-major flex items-center">
                  <div className="text-warning flex items-center gap-2 rounded-full border border-[#E8C96A44] bg-[#E8C96A1A] px-3 py-1 text-[11px] font-semibold">
                    <span className="bg-warning h-1.5 w-1.5 rounded-full"></span>
                    REVIEW
                  </div>
                  <span className="material-symbols-outlined text-text-muted group-hover:text-primary cursor-pointer transition-colors">
                    more_vert
                  </span>
                </div>
              </div>

              <div className="p-standard hover:bg-bg-tertiary group flex items-center justify-between transition-colors">
                <div className="gap-standard flex items-center">
                  <div className="bg-surface-container-high text-text-muted flex h-10 w-10 items-center justify-center rounded-lg">
                    <span className="material-symbols-outlined">draw</span>
                  </div>
                  <div>
                    <h4 className="text-body-ui text-text-primary font-semibold">
                      Consultancy Agreement (Software)
                    </h4>
                    <p className="text-meta-small text-text-muted">Last modified: Yesterday</p>
                  </div>
                </div>
                <div className="gap-major flex items-center">
                  <div className="text-text-secondary flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold">
                    <span className="bg-text-disabled h-1.5 w-1.5 rounded-full"></span>
                    DRAFT
                  </div>
                  <span className="material-symbols-outlined text-text-muted group-hover:text-primary cursor-pointer transition-colors">
                    more_vert
                  </span>
                </div>
              </div>

              <div className="p-standard hover:bg-bg-tertiary group flex items-center justify-between transition-colors">
                <div className="gap-standard flex items-center">
                  <div className="bg-surface-container-high text-secondary flex h-10 w-10 items-center justify-center rounded-lg">
                    <span className="material-symbols-outlined">task_alt</span>
                  </div>
                  <div>
                    <h4 className="text-body-ui text-text-primary font-semibold">
                      Master Service Agreement - Tech Corp
                    </h4>
                    <p className="text-meta-small text-text-muted">Finalized: Oct 12, 2024</p>
                  </div>
                </div>
                <div className="gap-major flex items-center">
                  <div className="text-secondary flex items-center gap-2 rounded-full border border-[#abcfb644] bg-[#abcfb61A] px-3 py-1 text-[11px] font-semibold">
                    <span className="bg-secondary h-1.5 w-1.5 rounded-full"></span>
                    FINAL
                  </div>
                  <span className="material-symbols-outlined text-text-muted group-hover:text-primary cursor-pointer transition-colors">
                    more_vert
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-auto ml-[240px] w-full max-w-[calc(100%-240px)] border-t border-[#1E1E21] bg-[#0A0A0B] py-12">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center px-8 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <span className="font-noto-serif text-lg font-bold text-[#C9A84C]">LexAI</span>
            <p className="font-noto-serif text-xs tracking-widest text-gray-600 uppercase">
              © 2024 LexAI Intelligence. Trusted by Advocates &amp; SME Founders.
            </p>
          </div>
          <div className="flex justify-end gap-8">
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
