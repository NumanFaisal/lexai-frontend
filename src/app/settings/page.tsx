import Link from 'next/link';
export default function Page() {
  return (
    <>
      <nav className="fixed top-0 left-0 z-50 flex hidden h-screen w-[240px] flex-col gap-2 border-r border-[#1E1E21] bg-[#111113] p-4 shadow-none md:flex">
        <div className="mb-8 flex items-center gap-3 px-2">
          <div className="from-primary-container to-surface-variant flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br">
            <span className="material-symbols-outlined text-bg-primary text-sm font-bold">
              balance
            </span>
          </div>
          <div>
            <div className="font-serif text-2xl font-bold tracking-tighter text-[#C9A84C]">
              LexAI
            </div>
            <div className="font-meta-small text-meta-small text-text-secondary">
              Legal Intelligence
            </div>
          </div>
        </div>
        <button className="bg-primary-container text-bg-primary font-sub-heading text-sub-heading hover:bg-gold-hover mb-6 flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2 transition-colors">
          <span className="material-symbols-outlined text-sm">add</span>
          New Research Session
        </button>
        <div className="flex flex-1 flex-col gap-1 overflow-y-auto">
          <Link
            href="/student/chat"
            className="font-noto-serif flex scale-95 items-center gap-3 rounded-lg p-2 tracking-tight text-gray-500 antialiased transition-all duration-200 hover:bg-[#1A1A1D] hover:text-[#C9A84C] active:scale-90"
          >
            <span className="material-symbols-outlined">chat_bubble</span> Legal Chat
          </Link>
          <Link
            href="/student/vault"
            className="font-noto-serif flex scale-95 items-center gap-3 rounded-lg p-2 tracking-tight text-gray-500 antialiased transition-all duration-200 hover:bg-[#1A1A1D] hover:text-[#C9A84C] active:scale-90"
          >
            <span className="material-symbols-outlined">account_balance</span> Research Vault
          </Link>
          <Link
            href="/student/drafts"
            className="font-noto-serif flex scale-95 items-center gap-3 rounded-lg p-2 tracking-tight text-gray-500 antialiased transition-all duration-200 hover:bg-[#1A1A1D] hover:text-[#C9A84C] active:scale-90"
          >
            <span className="material-symbols-outlined">edit_document</span> Contract Drafts
          </Link>
          <Link
            href="/business/compliance"
            className="font-noto-serif flex scale-95 items-center gap-3 rounded-lg p-2 tracking-tight text-gray-500 antialiased transition-all duration-200 hover:bg-[#1A1A1D] hover:text-[#C9A84C] active:scale-90"
          >
            <span className="material-symbols-outlined">verified</span> Compliance Hub
          </Link>
          <Link
            href="/pricing"
            className="font-noto-serif flex scale-95 items-center gap-3 rounded-lg p-2 tracking-tight text-gray-500 antialiased transition-all duration-200 hover:bg-[#1A1A1D] hover:text-[#C9A84C] active:scale-90"
          >
            <span className="material-symbols-outlined">workspace_premium</span> Premium Access
          </Link>
        </div>
        <div className="border-border-default mt-auto flex flex-col gap-1 border-t pt-4">
          <a
            className="font-noto-serif flex scale-95 items-center gap-3 rounded-lg p-2 tracking-tight text-gray-500 antialiased transition-all duration-200 hover:bg-[#1A1A1D] hover:text-[#C9A84C] active:scale-90"
            href="#"
          >
            <span className="material-symbols-outlined">help</span> Knowledge Base
          </a>
          <a
            className="font-noto-serif relative flex scale-95 items-center gap-3 rounded-lg p-2 font-semibold tracking-tight text-[#C9A84C] antialiased after:absolute after:right-0 after:h-4 after:w-1 after:rounded-full after:bg-[#C9A84C] after:content-[''] hover:bg-[#1A1A1D] active:scale-90"
            href="#"
          >
            <span className="material-symbols-outlined icon-fill">settings</span> Settings
          </a>
        </div>
      </nav>

      <div className="flex min-w-0 flex-1 flex-col md:ml-[240px]">
        <header className="font-noto-serif sticky top-0 z-40 flex h-[52px] w-full items-center justify-between border-b border-[#1E1E21] bg-[#0A0A0B]/80 px-6 text-sm font-medium shadow-sm backdrop-blur-md">
          <div className="flex items-center gap-4">
            <div className="hidden text-lg font-bold text-[#C9A84C]">LexAI</div>
          </div>
          <div className="flex items-center gap-4">
            <button className="rounded px-3 py-1 text-gray-400 transition-colors hover:text-white focus:ring-1 focus:ring-[#C9A84C44]">
              India (SC)
            </button>
            <button className="rounded-lg border border-[#C9A84C44] px-4 py-1.5 text-[#C9A84C] transition-colors hover:bg-[#C9A84C1A]">
              Upgrade to Pro
            </button>
            <div className="ml-2 flex items-center gap-2 border-l border-[#1E1E21] pl-4">
              <button className="text-gray-400 transition-colors hover:text-white">
                <span className="material-symbols-outlined">notifications</span>
              </button>
              <button className="text-gray-400 transition-colors hover:text-white">
                <span className="material-symbols-outlined">history</span>
              </button>
              <button className="text-gray-400 transition-colors hover:text-white">
                <span className="material-symbols-outlined">account_circle</span>
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="pb-block mx-auto w-full max-w-[640px]">
            <div className="mb-major">
              <h1 className="font-page-title text-page-title text-on-surface mb-2">Settings</h1>
              <p className="font-body-ui text-body-ui text-text-secondary">
                Manage your account and subscription
              </p>
            </div>

            <section className="bg-bg-secondary border-border-default p-section mb-standard rounded-xl border">
              <h2 className="font-label-caps text-label-caps text-primary-container mb-standard tracking-widest uppercase">
                Profile
              </h2>
              <div className="gap-section flex items-start">
                <div className="bg-bg-elevated text-primary-container font-logo text-logo flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full">
                  AK
                </div>
                <div className="flex-1">
                  <div className="mb-1 flex items-center justify-between">
                    <h3 className="font-sub-heading text-sub-heading text-on-surface">
                      Arjun Kumar Singh
                    </h3>
                    <button className="text-text-secondary hover:text-primary-container transition-colors">
                      <span className="material-symbols-outlined text-[18px]">edit</span>
                    </button>
                  </div>
                  <p className="font-body-ui text-body-ui text-text-secondary mb-3">
                    +91 98765 43210
                  </p>
                  <div className="flex items-center gap-3">
                    <span className="bg-secondary-container text-secondary font-meta-small text-meta-small flex items-center gap-1 rounded px-2 py-1">
                      <span className="material-symbols-outlined text-[12px]">work</span> Advocate
                    </span>
                    <button className="font-body-ui text-body-ui text-text-secondary hover:text-on-surface decoration-border-default underline underline-offset-4">
                      Change
                    </button>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-bg-secondary border-gold-border p-section mb-standard relative overflow-hidden rounded-xl border">
              <div className="bg-primary-container pointer-events-none absolute top-0 right-0 h-32 w-32 rounded-full opacity-5 blur-[60px]"></div>
              <h2 className="font-label-caps text-label-caps text-primary-container mb-standard tracking-widest uppercase">
                Subscription
              </h2>
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="font-section-head text-section-head text-on-surface">
                    Advocate Pro
                  </span>
                  <span className="bg-gold-subtle text-primary-container border-gold-border rounded border px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase">
                    Active
                  </span>
                </div>
                <p className="font-meta-small text-meta-small text-text-secondary text-right">
                  Next billing:
                  <br />
                  ₹799 on 15 July 2025
                </p>
              </div>
              <ul className="font-body-ui text-body-ui text-text-secondary mb-section flex flex-wrap gap-x-6 gap-y-2">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-success text-[14px]">
                    check_circle
                  </span>{' '}
                  Unlimited queries
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-success text-[14px]">
                    check_circle
                  </span>{' '}
                  Voice input
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-success text-[14px]">
                    check_circle
                  </span>{' '}
                  PDF export
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-success text-[14px]">
                    check_circle
                  </span>{' '}
                  WhatsApp bot
                </li>
              </ul>
              <div className="flex items-center gap-4">
                <button className="border-primary-container text-primary-container font-sub-heading text-sub-heading hover:bg-gold-subtle flex items-center gap-2 rounded-lg border bg-transparent px-4 py-2 transition-colors">
                  Upgrade to Business{' '}
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
                <button className="font-meta-small text-meta-small text-error hover:text-on-error-container decoration-error/30 underline underline-offset-4 transition-colors">
                  Cancel Subscription
                </button>
              </div>
            </section>

            <section className="bg-bg-secondary border-border-default p-section mb-standard rounded-xl border">
              <h2 className="font-label-caps text-label-caps text-secondary mb-standard flex items-center gap-2 tracking-widest uppercase">
                <span className="bg-secondary h-1.5 w-1.5 rounded-full"></span> WhatsApp
              </h2>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-sub-heading text-sub-heading text-on-surface mb-1 flex items-center gap-2">
                    <span className="material-symbols-outlined text-success text-[18px]">
                      check
                    </span>{' '}
                    Linked to +91 98765 43210
                  </p>
                  <p className="font-body-ui text-body-ui text-text-secondary text-sm">
                    Your WhatsApp queries sync with this dashboard automatically.
                  </p>
                </div>
                <button className="font-meta-small text-meta-small text-error hover:text-on-error-container bg-error-container/20 border-error/20 rounded border px-3 py-1.5 transition-colors">
                  Unlink
                </button>
              </div>
            </section>

            <section className="bg-bg-secondary border-border-default p-section mb-standard rounded-xl border">
              <h2 className="font-label-caps text-label-caps text-text-secondary mb-standard tracking-widest uppercase">
                Usage This Month
              </h2>
              <div className="mb-4">
                <div className="font-body-ui text-body-ui mb-2 flex justify-between">
                  <span className="text-on-surface">Query Limit</span>
                  <span className="text-primary-container font-medium">Unlimited</span>
                </div>
                <div className="bg-bg-elevated h-1.5 w-full overflow-hidden rounded-full">
                  <div className="bg-primary-container h-full w-[15%] rounded-full opacity-80"></div>
                </div>
              </div>
              <div className="border-border-default mb-4 flex items-center justify-between border-b pb-4">
                <div>
                  <p className="font-section-head text-section-head text-on-surface">247</p>
                  <p className="font-meta-small text-meta-small text-text-secondary">
                    Queries this month
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-section-head text-section-head text-on-surface">4.2s</p>
                  <p className="font-meta-small text-meta-small text-text-secondary">
                    Avg response time
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-bg-elevated flex-1 rounded p-3">
                  <p className="font-sub-heading text-sub-heading text-on-surface">12</p>
                  <p className="font-meta-small text-meta-small text-text-secondary">
                    Contracts drafted
                  </p>
                </div>
                <div className="bg-bg-elevated flex-1 rounded p-3">
                  <p className="font-sub-heading text-sub-heading text-on-surface">8</p>
                  <p className="font-meta-small text-meta-small text-text-secondary">
                    Compliance checks
                  </p>
                </div>
                <div className="bg-bg-elevated flex-1 rounded p-3">
                  <p className="font-sub-heading text-sub-heading text-on-surface">5</p>
                  <p className="font-meta-small text-meta-small text-text-secondary">
                    Case analyses
                  </p>
                </div>
              </div>
            </section>

            <section className="bg-bg-secondary border-border-default p-section mb-standard rounded-xl border">
              <h2 className="font-label-caps text-label-caps text-text-secondary mb-standard tracking-widest uppercase">
                Notifications
              </h2>
              <div className="flex flex-col gap-1">
                <div className="border-border-default flex items-center justify-between border-b py-2 last:border-0">
                  <span className="font-body-ui text-body-ui text-on-surface">
                    WhatsApp query limit warnings
                  </span>
                  <div className="bg-primary-container relative h-4 w-8 cursor-pointer rounded-full">
                    <div className="bg-bg-secondary absolute top-0.5 right-0.5 h-3 w-3 rounded-full shadow-sm"></div>
                  </div>
                </div>
                <div className="border-border-default flex items-center justify-between border-b py-2 last:border-0">
                  <span className="font-body-ui text-body-ui text-on-surface">
                    Weekly usage report
                  </span>
                  <div className="bg-primary-container relative h-4 w-8 cursor-pointer rounded-full">
                    <div className="bg-bg-secondary absolute top-0.5 right-0.5 h-3 w-3 rounded-full shadow-sm"></div>
                  </div>
                </div>
                <div className="border-border-default flex items-center justify-between border-b py-2 last:border-0">
                  <span className="font-body-ui text-body-ui text-text-secondary">
                    New feature announcements
                  </span>
                  <div className="bg-bg-elevated relative h-4 w-8 cursor-pointer rounded-full">
                    <div className="bg-text-secondary absolute top-0.5 left-0.5 h-3 w-3 rounded-full shadow-sm"></div>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-bg-secondary border-error/30 p-section relative overflow-hidden rounded-xl border">
              <div className="bg-error/5 pointer-events-none absolute inset-0"></div>
              <h2 className="font-label-caps text-label-caps text-error mb-standard tracking-widest uppercase">
                Account Details
              </h2>
              <div className="relative z-10 flex items-center justify-between">
                <button className="font-meta-small text-meta-small text-text-secondary hover:text-on-surface decoration-border-default underline underline-offset-4">
                  Export all my data (DPDP compliance)
                </button>
                <button className="border-error text-error font-sub-heading text-sub-heading hover:bg-error-container/20 rounded border bg-transparent px-3 py-1.5 transition-colors">
                  Delete Account
                </button>
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  );
}
