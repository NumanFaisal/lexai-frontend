import Link from 'next/link';
export default function Page() {
  return (
    <>
      <aside className="fixed top-0 left-0 z-50 flex h-screen w-[240px] flex-col gap-2 border-r border-[#1E1E21] bg-[#111113] p-4">
        <div className="mb-8 flex items-center gap-3 px-2">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-gradient-to-br from-[#C9A84C] to-[#E6C364]">
            <span className="material-symbols-outlined text-bg-primary text-xl" data-icon="balance">
              balance
            </span>
          </div>
          <div>
            <h1 className="font-serif text-2xl font-bold tracking-tighter text-[#C9A84C]">LexAI</h1>
            <p className="text-text-secondary text-[10px] tracking-widest uppercase opacity-70">
              Legal Intelligence
            </p>
          </div>
        </div>
        <nav className="flex flex-1 flex-col gap-1">
          <Link
            href="/student/chat"
            className="flex items-center gap-3 rounded-lg p-3 text-gray-500 transition-all duration-200 hover:bg-[#1A1A1D] hover:text-[#C9A84C]"
          >
            <span className="material-symbols-outlined" data-icon="chat_bubble">
              chat_bubble
            </span>
            <span className="font-sub-heading text-sub-heading">Legal Chat</span>
          </Link>
          <Link
            href="/student/vault"
            className="flex items-center gap-3 rounded-lg p-3 text-gray-500 transition-all duration-200 hover:bg-[#1A1A1D] hover:text-[#C9A84C]"
          >
            <span className="material-symbols-outlined" data-icon="account_balance">
              account_balance
            </span>
            <span className="font-sub-heading text-sub-heading">Research Vault</span>
          </Link>

          <Link
            href="/student/drafts"
            className="relative flex items-center gap-3 rounded-lg bg-[#1A1A1D] p-3 font-semibold text-[#C9A84C] after:absolute after:right-0 after:h-4 after:w-1 after:rounded-full after:bg-[#C9A84C] after:content-['']"
          >
            <span className="material-symbols-outlined" data-icon="edit_document">
              edit_document
            </span>
            <span className="font-sub-heading text-sub-heading">Contract Drafts</span>
          </Link>
          <Link
            href="/student/compliance"
            className="flex items-center gap-3 rounded-lg p-3 text-gray-500 transition-all duration-200 hover:bg-[#1A1A1D] hover:text-[#C9A84C]"
          >
            <span className="material-symbols-outlined" data-icon="verified">
              verified
            </span>
            <span className="font-sub-heading text-sub-heading">Compliance Hub</span>
          </Link>
          <Link
            href="/student/premium"
            className="flex items-center gap-3 rounded-lg p-3 text-gray-500 transition-all duration-200 hover:bg-[#1A1A1D] hover:text-[#C9A84C]"
          >
            <span className="material-symbols-outlined" data-icon="workspace_premium">
              workspace_premium
            </span>
            <span className="font-sub-heading text-sub-heading">Premium Access</span>
          </Link>
        </nav>
        <div className="mt-auto flex flex-col gap-1 border-t border-[#1E1E21] pt-4">
          <a
            className="flex items-center gap-3 rounded-lg p-3 text-gray-500 transition-all duration-200 hover:bg-[#1A1A1D] hover:text-[#C9A84C]"
            href="#"
          >
            <span className="material-symbols-outlined" data-icon="help">
              help
            </span>
            <span className="font-sub-heading text-sub-heading">Knowledge Base</span>
          </a>
          <a
            className="flex items-center gap-3 rounded-lg p-3 text-gray-500 transition-all duration-200 hover:bg-[#1A1A1D] hover:text-[#C9A84C]"
            href="#"
          >
            <span className="material-symbols-outlined" data-icon="settings">
              settings
            </span>
            <span className="font-sub-heading text-sub-heading">Settings</span>
          </a>
        </div>
      </aside>

      <header className="sticky top-0 z-40 ml-[240px] flex h-[52px] w-full max-w-[calc(100%-240px)] items-center justify-between border-b border-[#1E1E21] bg-[#0A0A0B]/80 px-6 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <div className="flex items-center rounded-md border border-[#1E1E21] bg-[#1A1A1D] px-3 py-1">
            <span
              className="material-symbols-outlined text-text-secondary mr-2 text-sm"
              data-icon="search"
            >
              search
            </span>
            <input
              className="text-text-primary w-48 border-none bg-transparent text-xs focus:ring-0"
              placeholder="Search templates..."
              type="text"
            />
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-sm text-[#C9A84C]" data-icon="gavel">
              gavel
            </span>
            <span className="font-sub-heading text-text-secondary text-xs">
              India (SC) Jurisdiction
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-1 text-gray-400 transition-colors hover:text-[#C9A84C]">
              <span className="material-symbols-outlined" data-icon="notifications">
                notifications
              </span>
            </button>
            <button className="p-1 text-gray-400 transition-colors hover:text-[#C9A84C]">
              <span className="material-symbols-outlined" data-icon="history">
                history
              </span>
            </button>
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#C9A84C44] bg-[#1E1E21]">
              <span
                className="material-symbols-outlined text-sm text-[#C9A84C]"
                data-icon="account_circle"
              >
                account_circle
              </span>
            </div>
          </div>
          <button className="hover:bg-gold-hover rounded-[10px] bg-[#C9A84C] px-4 py-1.5 text-xs font-bold text-[#0A0A0B] transition-colors">
            Upgrade to Pro
          </button>
        </div>
      </header>

      <main className="ml-[240px] min-h-[calc(100vh-52px)] bg-[#0A0A0B] p-8">
        <div className="mx-auto grid max-w-[1200px] grid-cols-12 gap-8">
          <div className="col-span-12 flex flex-col gap-6 lg:col-span-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-page-title text-page-title text-text-primary">
                  Master Service Agreement
                </h2>
                <p className="font-meta-small text-meta-small text-text-secondary">
                  Drafting Session: Vendor-Client Relationship (Standard)
                </p>
              </div>
              <div className="flex gap-2">
                <button className="border-border-default text-text-primary flex items-center gap-2 rounded-lg border bg-[#1A1A1D] px-4 py-2 text-xs transition-all hover:border-[#C9A84C]">
                  <span className="material-symbols-outlined text-sm" data-icon="download">
                    download
                  </span>{' '}
                  Export PDF
                </button>
                <button className="flex items-center gap-2 rounded-lg bg-[#C9A84C] px-4 py-2 text-xs font-bold text-[#0A0A0B]">
                  <span className="material-symbols-outlined text-sm" data-icon="save">
                    save
                  </span>{' '}
                  Save Progress
                </button>
              </div>
            </div>

            <div className="border-border-default overflow-hidden rounded-xl border bg-[#111113]">
              <div className="border-border-default flex items-center gap-4 border-b bg-[#1A1A1D]/50 p-4">
                <div className="border-border-default flex gap-2 rounded-lg border bg-[#0A0A0B] p-1">
                  <button className="text-text-secondary rounded p-1.5 hover:bg-[#1A1A1D]">
                    <span className="material-symbols-outlined text-sm" data-icon="format_bold">
                      format_bold
                    </span>
                  </button>
                  <button className="text-text-secondary rounded p-1.5 hover:bg-[#1A1A1D]">
                    <span className="material-symbols-outlined text-sm" data-icon="format_italic">
                      format_italic
                    </span>
                  </button>
                  <button className="text-text-secondary rounded p-1.5 hover:bg-[#1A1A1D]">
                    <span
                      className="material-symbols-outlined text-sm"
                      data-icon="format_list_bulleted"
                    >
                      format_list_bulleted
                    </span>
                  </button>
                </div>
                <div className="bg-border-default h-4 w-px"></div>
                <span className="text-text-secondary font-meta-small text-xs">
                  Auto-saving to Research Vault...
                </span>
              </div>
              <div className="max-h-[700px] space-y-8 overflow-y-auto p-12 font-serif text-sm leading-relaxed text-[#E9E1D7]">
                <section className="mb-12 text-center">
                  <h3 className="text-xl font-bold tracking-widest uppercase">
                    Master Service Agreement
                  </h3>
                  <p className="mt-4 text-xs italic">
                    This Agreement is made on this [DATE] day of [MONTH], 2024
                  </p>
                </section>
                <div className="space-y-6">
                  <div className="clause-highlight group relative cursor-pointer rounded-r-lg border border-[#C9A84C33] p-4">
                    <span className="text-bg-primary absolute top-4 -left-3 rounded-full bg-[#C9A84C] px-1.5 py-0.5 text-[8px] font-bold">
                      ACTIVE
                    </span>
                    <h4 className="mb-2 text-xs font-bold text-[#C9A84C] uppercase">
                      1. Scope of Services
                    </h4>
                    <p className="text-sm">
                      The Service Provider shall perform the services as specifically described in
                      Exhibit A (the "Services"). Any modification to the Services must be
                      documented in a written "Change Order" signed by both Parties. The Service
                      Provider shall perform the Services in a professional and workmanlike manner,
                      consistent with industry standards.
                    </p>
                  </div>
                  <div className="group rounded-r-lg border border-transparent p-4 transition-colors hover:bg-[#1A1A1D]">
                    <h4 className="text-text-secondary mb-2 text-xs font-bold uppercase">
                      2. Payment Terms
                    </h4>
                    <p className="text-sm opacity-60">
                      Client shall pay the Service Provider the fees set forth in Exhibit B. All
                      invoices are due within thirty (30) days of receipt. Late payments shall
                      accrue interest at the rate of 1.5% per month or the maximum rate permitted by
                      law, whichever is less.
                    </p>
                  </div>
                  <div className="group rounded-r-lg border border-transparent p-4 transition-colors hover:bg-[#1A1A1D]">
                    <h4 className="text-text-secondary mb-2 text-xs font-bold uppercase">
                      3. Limitation of Liability
                    </h4>
                    <p className="text-sm opacity-60">
                      To the maximum extent permitted by applicable law, in no event shall either
                      party be liable for any indirect, punitive, incidental, special,
                      consequential, or exemplary damages, including without limitation damages for
                      loss of profits, goodwill, use, data, or other intangible losses.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-12 flex flex-col gap-6 lg:col-span-4">
            <div className="sticky top-[76px] overflow-hidden rounded-xl border border-[#C9A84C44] bg-[#111113]">
              <div className="flex items-center justify-between border-b border-[#1E1E21] bg-gradient-to-r from-[#C9A84C1A] to-transparent p-4">
                <div className="flex items-center gap-2">
                  <span
                    className="material-symbols-outlined text-[#C9A84C]"
                    data-icon="auto_awesome"
                  >
                    auto_awesome
                  </span>
                  <span className="font-sub-heading text-xs font-bold text-[#C9A84C]">
                    LexAI Insights
                  </span>
                </div>
                <span className="bg-success/10 text-success rounded-full px-2 py-0.5 text-[10px] font-bold">
                  Verified Analysis
                </span>
              </div>
              <div className="flex flex-col gap-4 p-5">
                <div className="space-y-2">
                  <h5 className="text-text-primary text-sm font-bold">
                    Why 'Professional &amp; Workmanlike'?
                  </h5>
                  <p className="text-text-secondary text-xs leading-relaxed">
                    In Indian Contract Law (Section 73), this phrase establishes the **Standard of
                    Care**. It protects the Client from substandard performance while limiting the
                    Provider's liability to standard professional benchmarks rather than absolute
                    perfection.
                  </p>
                </div>
                <div className="border-tertiary rounded-lg border-l-2 bg-[#1A1A1D] p-3">
                  <h6 className="text-tertiary mb-1 text-[10px] font-bold tracking-wider uppercase">
                    Student Tip
                  </h6>
                  <p className="text-text-secondary text-xs italic">
                    "Always pair this with a 'Time of the Essence' clause if deadlines are critical
                    to the project's success."
                  </p>
                </div>
                <div className="border-border-default border-t pt-4">
                  <p className="text-text-secondary mb-3 text-[10px] tracking-widest uppercase">
                    Suggested Alternatives
                  </p>
                  <div className="flex flex-col gap-2">
                    <button className="border-border-default group rounded-lg border p-3 text-left transition-all hover:border-[#C9A84C44]">
                      <span className="text-text-primary block text-xs font-bold group-hover:text-[#C9A84C]">
                        Strict Performance
                      </span>
                      <span className="text-text-secondary text-[10px]">
                        Removes 'industry standards' for higher liability.
                      </span>
                    </button>
                    <button className="border-border-default group rounded-lg border p-3 text-left transition-all hover:border-[#C9A84C44]">
                      <span className="text-text-primary block text-xs font-bold group-hover:text-[#C9A84C]">
                        Best Efforts Basis
                      </span>
                      <span className="text-text-secondary text-[10px]">
                        Lowers the bar for R&amp;D/Uncertain projects.
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-border-default space-y-4 rounded-xl border bg-[#111113] p-5">
              <h5 className="text-text-primary text-xs font-bold tracking-widest uppercase">
                Drafting Checklist
              </h5>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span
                    className="material-symbols-outlined text-success mt-0.5 text-sm"
                    data-icon="check_circle"
                  >
                    check_circle
                  </span>
                  <div>
                    <p className="text-text-primary text-xs font-medium">Parties Identified</p>
                    <p className="text-text-secondary text-[10px]">Correct CIN/PAN included.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span
                    className="material-symbols-outlined text-success mt-0.5 text-sm"
                    data-icon="check_circle"
                  >
                    check_circle
                  </span>
                  <div>
                    <p className="text-text-primary text-xs font-medium">Scope Defined</p>
                    <p className="text-text-secondary text-[10px]">Exhibit A referenced.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span
                    className="material-symbols-outlined mt-0.5 text-sm text-[#C9A84C]"
                    data-icon="radio_button_checked"
                  >
                    radio_button_checked
                  </span>
                  <div>
                    <p className="text-xs font-medium text-[#C9A84C]">Payment Terms</p>
                    <p className="text-text-secondary text-[10px]">
                      Currently reviewing Section 2.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 opacity-40">
                  <span
                    className="material-symbols-outlined text-text-disabled mt-0.5 text-sm"
                    data-icon="radio_button_unchecked"
                  >
                    radio_button_unchecked
                  </span>
                  <div>
                    <p className="text-xs font-medium">Termination Clauses</p>
                    <p className="text-text-secondary text-[10px]">Pending review.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-auto ml-[240px] w-[calc(100%-240px)] border-t border-[#1E1E21] bg-[#0A0A0B] py-12">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center px-8 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <span className="font-logo text-lg font-bold text-[#C9A84C]">LexAI</span>
            <p className="font-meta-small text-text-secondary text-xs tracking-widest uppercase">
              © 2024 LexAI Intelligence. Trusted by Advocates &amp; SME Founders.
            </p>
          </div>
          <div className="flex justify-end gap-6">
            <a
              className="font-label-caps text-[10px] text-gray-600 transition-opacity hover:text-[#C9A84C]"
              href="#"
            >
              Privacy Policy
            </a>
            <a
              className="font-label-caps text-[10px] text-gray-600 transition-opacity hover:text-[#C9A84C]"
              href="#"
            >
              Terms of Service
            </a>
            <a
              className="font-label-caps text-[10px] text-gray-600 transition-opacity hover:text-[#C9A84C]"
              href="#"
            >
              AI Disclosure
            </a>
            <a
              className="font-label-caps text-[10px] text-gray-600 transition-opacity hover:text-[#C9A84C]"
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
