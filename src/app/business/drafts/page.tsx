import Link from 'next/link';
export default function Page() {
  return (
    <>
      <aside className="fixed top-0 left-0 z-50 flex h-screen w-[240px] flex-col gap-2 border-r border-[#1E1E21] bg-[#111113] p-4">
        <div className="mb-8 flex items-center gap-3 px-2">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-gradient-to-br from-[#C9A84C] to-[#E8C96A]">
            <span className="material-symbols-outlined font-bold text-[#0A0A0B]">
              account_balance
            </span>
          </div>
          <div>
            <h1 className="font-serif text-2xl font-bold tracking-tighter text-[#C9A84C]">LexAI</h1>
            <p className="font-noto-serif text-[10px] tracking-widest text-gray-500 uppercase">
              Legal Intelligence
            </p>
          </div>
        </div>
        <nav className="flex-1 space-y-1">
          <Link
            href="/student/chat"
            className="flex items-center gap-3 rounded-lg p-3 text-sm font-medium text-gray-500 transition-all duration-200 hover:bg-[#1A1A1D] hover:text-[#C9A84C]"
          >
            <span className="material-symbols-outlined" data-icon="chat_bubble">
              chat_bubble
            </span>
            Legal Chat
          </Link>
          <Link
            href="/student/vault"
            className="flex items-center gap-3 rounded-lg p-3 text-sm font-medium text-gray-500 transition-all duration-200 hover:bg-[#1A1A1D] hover:text-[#C9A84C]"
          >
            <span className="material-symbols-outlined" data-icon="account_balance">
              account_balance
            </span>
            Research Vault
          </Link>
          <Link
            href="/business/drafts"
            className="relative flex items-center gap-3 rounded-lg bg-[#1A1A1D] p-3 text-sm font-semibold text-[#C9A84C] after:absolute after:right-0 after:h-4 after:w-1 after:rounded-full after:bg-[#C9A84C] after:content-['']"
          >
            <span className="material-symbols-outlined" data-icon="edit_document">
              edit_document
            </span>
            Contract Drafts
          </Link>
          <Link
            href="/business/compliance"
            className="flex items-center gap-3 rounded-lg p-3 text-sm font-medium text-gray-500 transition-all duration-200 hover:bg-[#1A1A1D] hover:text-[#C9A84C]"
          >
            <span className="material-symbols-outlined" data-icon="verified">
              verified
            </span>
            Compliance Hub
          </Link>
          <Link
            href="/pricing"
            className="flex items-center gap-3 rounded-lg p-3 text-sm font-medium text-gray-500 transition-all duration-200 hover:bg-[#1A1A1D] hover:text-[#C9A84C]"
          >
            <span className="material-symbols-outlined" data-icon="workspace_premium">
              workspace_premium
            </span>
            Premium Access
          </Link>
        </nav>
        <button className="mb-8 w-full rounded-lg bg-[#C9A84C] px-4 py-2.5 text-xs font-bold tracking-wider text-[#0A0A0B] uppercase transition-transform hover:bg-[#E8C96A] active:scale-95">
          New Research Session
        </button>
        <div className="mt-auto space-y-1 border-t border-[#1E1E21] pt-4">
          <a
            className="flex items-center gap-3 rounded-lg p-2 text-xs text-gray-500 transition-all duration-200 hover:bg-[#1A1A1D] hover:text-[#C9A84C]"
            href="#"
          >
            <span className="material-symbols-outlined" data-icon="help">
              help
            </span>
            Knowledge Base
          </a>
          <a
            className="flex items-center gap-3 rounded-lg p-2 text-xs text-gray-500 transition-all duration-200 hover:bg-[#1A1A1D] hover:text-[#C9A84C]"
            href="#"
          >
            <span className="material-symbols-outlined" data-icon="settings">
              settings
            </span>
            Settings
          </a>
        </div>
      </aside>

      <header className="sticky top-0 z-40 ml-[240px] flex h-[52px] w-full max-w-[calc(100%-240px)] items-center justify-between border-b border-[#1E1E21] bg-[#0A0A0B]/80 px-6 backdrop-blur-md">
        <div className="flex w-64 items-center gap-2 rounded-full border border-[#1E1E21] bg-[#111113] px-3 py-1">
          <span className="material-symbols-outlined text-sm text-gray-500">search</span>
          <input
            className="text-on-surface w-full border-none bg-transparent text-xs placeholder-gray-600 focus:ring-0"
            placeholder="Search templates..."
            type="text"
          />
        </div>
        <div className="flex items-center gap-6">
          <div className="border-secondary-container bg-secondary-container/20 flex items-center gap-2 rounded-full border px-3 py-1">
            <span className="bg-success h-2 w-2 rounded-full"></span>
            <span className="font-noto-serif text-secondary text-sm font-medium">India (SC)</span>
          </div>
          <button className="rounded border border-[#C9A84C] px-4 py-1.5 text-xs font-bold tracking-widest text-[#C9A84C] uppercase transition-colors hover:bg-[#C9A84C1A]">
            Upgrade to Pro
          </button>
          <div className="flex items-center gap-4 text-gray-400">
            <span
              className="material-symbols-outlined cursor-pointer hover:text-white"
              data-icon="notifications"
            >
              notifications
            </span>
            <span
              className="material-symbols-outlined cursor-pointer hover:text-white"
              data-icon="history"
            >
              history
            </span>
            <span
              className="material-symbols-outlined cursor-pointer hover:text-white"
              data-icon="account_circle"
            >
              account_circle
            </span>
          </div>
        </div>
      </header>

      <main className="ml-[240px] min-h-screen max-w-[calc(100%-240px)] p-10">
        <div className="mx-auto max-w-[800px]">
          <div className="mb-12">
            <div className="mb-2 flex items-center gap-2">
              <span className="text-success font-label-caps text-xs font-bold tracking-[2px] uppercase">
                SME &amp; Startup Edition
              </span>
            </div>
            <h2 className="font-page-title text-page-title text-text-primary mb-4">
              Contract Drafts
            </h2>
            <p className="font-body-ui text-text-secondary max-w-xl">
              Automate your legal workflow. Generate enterprise-ready agreements with entity mapping
              and regional compliance verification for the Indian market.
            </p>
          </div>

          <section className="mb-12">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="font-section-head text-section-head text-text-primary">
                Featured Templates
              </h3>
              <button className="text-secondary text-xs font-bold hover:underline">View All</button>
            </div>
            <div className="grid grid-cols-12 gap-4">
              <div className="hover:border-secondary group col-span-8 cursor-pointer rounded-xl border border-[#1E1E21] bg-[#111113] p-6 transition-colors">
                <div className="mb-4 flex items-start justify-between">
                  <div className="bg-secondary-container/30 rounded-lg p-3">
                    <span
                      className="material-symbols-outlined text-secondary"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      handshake
                    </span>
                  </div>
                  <span className="bg-secondary-container/20 text-secondary rounded px-2 py-1 text-[10px] font-bold uppercase">
                    Most Used
                  </span>
                </div>
                <h4 className="font-sub-heading text-sub-heading text-text-primary mb-2">
                  Master Service Agreement (MSA)
                </h4>
                <p className="text-text-secondary font-body-ui mb-4 text-xs">
                  The foundational agreement for vendor-client relationships, localized for GST
                  compliance and Indian arbitration law.
                </p>
                <div className="flex items-center gap-4 border-t border-[#1E1E21] pt-4">
                  <div className="flex -space-x-2">
                    <div className="border-bg-primary bg-surface-container flex h-6 w-6 items-center justify-center rounded-full border text-[10px] font-bold">
                      JD
                    </div>
                    <div className="border-bg-primary bg-surface-container flex h-6 w-6 items-center justify-center rounded-full border text-[10px] font-bold">
                      RK
                    </div>
                  </div>
                  <span className="text-text-disabled text-[10px]">
                    124 drafts generated this week
                  </span>
                </div>
              </div>

              <div className="hover:border-secondary group col-span-4 cursor-pointer rounded-xl border border-[#1E1E21] bg-[#111113] p-6 transition-colors">
                <div className="mb-4">
                  <span className="material-symbols-outlined text-secondary">lock</span>
                </div>
                <h4 className="font-sub-heading text-sub-heading text-text-primary mb-2">
                  Unilateral NDA
                </h4>
                <p className="text-text-secondary text-[11px] leading-relaxed">
                  Protect your IP during initial discussions with vendors or hires.
                </p>
                <div className="mt-6 flex items-center gap-2">
                  <span className="bg-success h-2 w-2 rounded-full"></span>
                  <span className="text-text-disabled text-[10px]">Verified 2024</span>
                </div>
              </div>

              <div className="hover:border-secondary group col-span-4 cursor-pointer rounded-xl border border-[#1E1E21] bg-[#111113] p-6 transition-colors">
                <div className="mb-4">
                  <span className="material-symbols-outlined text-secondary">badge</span>
                </div>
                <h4 className="font-sub-heading text-sub-heading text-text-primary mb-2">
                  Employment Letter
                </h4>
                <p className="text-text-secondary text-[11px] leading-relaxed">
                  Standardized offer letters including PF/ESIC clauses.
                </p>
              </div>

              <div className="hover:border-secondary group relative col-span-8 cursor-pointer overflow-hidden rounded-xl border border-[#1E1E21] bg-[#111113] p-6 transition-colors">
                <div className="flex items-center gap-6">
                  <div className="w-1/3">
                    <h4 className="font-sub-heading text-sub-heading text-text-primary mb-2">
                      Founder Agreement
                    </h4>
                    <p className="text-text-secondary text-[11px] leading-relaxed">
                      Vesting schedules, IP assignment, and exit clauses for early-stage
                      co-founders.
                    </p>
                    <button className="bg-secondary text-on-secondary mt-4 rounded-lg px-4 py-2 text-[11px] font-bold tracking-wider uppercase">
                      Start Drafting
                    </button>
                  </div>
                  <div className="bg-surface-container-high relative flex h-32 w-2/3 items-center justify-center overflow-hidden rounded-lg">
                    <img
                      className="h-full w-full object-cover opacity-40"
                      data-alt="A detailed close-up shot of a professional legal contract lying on a dark textured surface. The document features elegant serif typography and is accented with subtle metallic gold foil on the company seal. The lighting is soft and directional, creating a premium and authoritative atmosphere consistent with a high-end corporate law firm. The overall color palette is a sophisticated blend of deep charcoal, cream paper, and muted sage green."
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3mvBTw0l6y_M8Gh_wn08YAm9V9AkA4qWPp1LNAwgtYckE0aBofzgJE5YGzIP_g9F6oOL0li48QJuRNaioKpLXpJFxkE0Ns1bIhtgULBW2G27vqCGCmYXu-9LtXmgKPuWQYwsIT9NnAl-xl7mVpHtGX-xzleviBIyx5qs4MNvd0MfXEl4rkhWvSWvVi1ZKChrIgSTHvB87Yxd9LzLg3Eo7I1hqcrfipFDQBEk-MrG46_X7wngRBgr1ovEYx8UkE5-SHYKF18QjJ_s"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="bg-surface-container-low border-border-default rounded-xl border p-8">
              <div className="mb-6 flex items-center gap-3">
                <div className="bg-secondary/10 flex h-10 w-10 items-center justify-center rounded-full">
                  <span className="material-symbols-outlined text-secondary">database</span>
                </div>
                <h3 className="font-section-head text-section-head text-text-primary">
                  Entity Mapping
                </h3>
              </div>
              <div className="space-y-4">
                <div className="bg-bg-primary/50 border-border-default rounded-lg border p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-secondary text-[11px] font-bold tracking-wider uppercase">
                      Primary Entity
                    </span>
                    <span className="material-symbols-outlined text-text-disabled text-xs">
                      edit
                    </span>
                  </div>
                  <div className="text-sm font-medium">Acme Tech Solutions Pvt Ltd</div>
                  <div className="text-text-disabled mt-1 text-[10px]">
                    CIN: U72900KA2021PTC142831
                  </div>
                </div>
                <div className="bg-bg-primary/50 border-border-default rounded-lg border p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-text-disabled text-[11px] font-bold tracking-wider uppercase">
                      Counterparty
                    </span>
                    <span className="text-secondary cursor-pointer text-[10px] font-bold">
                      + Select
                    </span>
                  </div>
                  <div className="font-italic text-text-disabled text-sm italic">
                    No entity selected...
                  </div>
                </div>
                <div className="pt-4">
                  <div className="mb-3 flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary text-sm">bolt</span>
                    <span className="text-text-secondary text-[11px] font-medium">
                      AI-Assisted Clause Matching
                    </span>
                  </div>
                  <div className="bg-bg-primary h-1.5 w-full overflow-hidden rounded-full">
                    <div className="bg-secondary h-full w-3/4"></div>
                  </div>
                  <div className="text-text-disabled mt-1 flex justify-between text-[9px] font-bold tracking-widest uppercase">
                    <span>Accuracy Score</span>
                    <span>88%</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <h3 className="font-section-head text-section-head text-text-primary mb-4">
                Intelligent Checks
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-4">
                  <div className="mt-1 flex-shrink-0">
                    <span
                      className="material-symbols-outlined text-success"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      check_circle
                    </span>
                  </div>
                  <div>
                    <p className="text-text-primary text-sm font-medium">Stamp Duty Estimation</p>
                    <p className="text-text-secondary text-xs">
                      Auto-calculated based on state jurisdiction and instrument type.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="mt-1 flex-shrink-0">
                    <span
                      className="material-symbols-outlined text-success"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      check_circle
                    </span>
                  </div>
                  <div>
                    <p className="text-text-primary text-sm font-medium">
                      Signing Authority Validation
                    </p>
                    <p className="text-text-secondary text-xs">
                      Verification of authorized signatories via MCA records.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="mt-1 flex-shrink-0">
                    <span
                      className="material-symbols-outlined text-warning"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      error
                    </span>
                  </div>
                  <div>
                    <p className="text-text-primary text-sm font-medium">
                      Arbitration Clause Check
                    </p>
                    <p className="text-text-secondary text-xs">
                      Recommendation: Update to SIAC or DIAC for international vendors.
                    </p>
                  </div>
                </li>
              </ul>
              <button className="border-secondary text-secondary hover:bg-secondary/10 mt-8 self-start rounded-lg border px-6 py-3 text-xs font-bold tracking-widest uppercase transition-colors">
                Configure Automation Rules
              </button>
            </div>
          </section>
        </div>
      </main>

      <footer className="mt-auto ml-[240px] w-[calc(100%-240px)] border-t border-[#1E1E21] bg-[#0A0A0B] py-12">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center px-8 md:grid-cols-2">
          <div className="space-y-4">
            <div className="font-serif text-lg font-bold text-[#C9A84C]">LexAI</div>
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
