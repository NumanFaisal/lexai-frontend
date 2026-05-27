'use client';
import Link from 'next/link';
export default function Page() {
  return (
    <>
      <aside className="fixed top-0 left-0 z-50 flex h-screen w-[240px] flex-col gap-2 border-r border-[#1E1E21] bg-[#111113] p-4">
        <div className="mb-8 px-2">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-gradient-to-br from-[#C9A84C] to-[#584400]">
              <span className="text-on-primary font-logo text-lg font-bold">L</span>
            </div>
            <div>
              <h1 className="font-serif text-2xl font-bold tracking-tighter text-[#C9A84C]">
                LexAI
              </h1>
              <p className="text-text-muted text-[10px] tracking-widest uppercase">
                Legal Intelligence
              </p>
            </div>
          </div>
        </div>
        <nav className="flex-1 space-y-1">
          <Link
            href="/student/chat"
            className="group flex items-center gap-3 rounded-lg p-2.5 text-gray-500 transition-all duration-200 hover:bg-[#1A1A1D] hover:text-[#C9A84C]"
          >
            <span className="material-symbols-outlined text-xl" data-icon="chat_bubble">
              chat_bubble
            </span>
            <span className="text-sm font-medium">Legal Chat</span>
          </Link>
          <Link
            href="/student/vault"
            className="relative flex items-center gap-3 rounded-lg bg-[#1A1A1D] p-2.5 font-semibold text-[#C9A84C] after:absolute after:right-0 after:h-4 after:w-1 after:rounded-full after:bg-[#C9A84C] after:content-['']"
          >
            <span className="material-symbols-outlined text-xl" data-icon="account_balance">
              account_balance
            </span>
            <span className="text-sm font-medium">Research Vault</span>
          </Link>
          <Link
            href="/student/drafts"
            className="group flex items-center gap-3 rounded-lg p-2.5 text-gray-500 transition-all duration-200 hover:bg-[#1A1A1D] hover:text-[#C9A84C]"
          >
            <span className="material-symbols-outlined text-xl" data-icon="edit_document">
              edit_document
            </span>
            <span className="text-sm font-medium">Contract Drafts</span>
          </Link>
          <Link
            href="/business/compliance"
            className="group flex items-center gap-3 rounded-lg p-2.5 text-gray-500 transition-all duration-200 hover:bg-[#1A1A1D] hover:text-[#C9A84C]"
          >
            <span className="material-symbols-outlined text-xl" data-icon="verified">
              verified
            </span>
            <span className="text-sm font-medium">Compliance Hub</span>
          </Link>
          <Link
            href="/pricing"
            className="group flex items-center gap-3 rounded-lg p-2.5 text-gray-500 transition-all duration-200 hover:bg-[#1A1A1D] hover:text-[#C9A84C]"
          >
            <span className="material-symbols-outlined text-xl" data-icon="workspace_premium">
              workspace_premium
            </span>
            <span className="text-sm font-medium">Premium Access</span>
          </Link>
        </nav>
        <button className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-[#C9A84C] px-4 py-2.5 text-sm font-bold text-[#111113] transition-transform active:scale-95">
          <span className="material-symbols-outlined text-lg" data-icon="add">
            add
          </span>
          New Research Session
        </button>
        <div className="mt-auto space-y-1 border-t border-[#1E1E21] pt-4">
          <a
            className="group flex items-center gap-3 rounded-lg p-2.5 text-gray-500 transition-all duration-200 hover:bg-[#1A1A1D] hover:text-[#C9A84C]"
            href="#"
          >
            <span className="material-symbols-outlined text-xl" data-icon="help">
              help
            </span>
            <span className="text-sm font-medium">Knowledge Base</span>
          </a>
          <a
            className="group flex items-center gap-3 rounded-lg p-2.5 text-gray-500 transition-all duration-200 hover:bg-[#1A1A1D] hover:text-[#C9A84C]"
            href="#"
          >
            <span className="material-symbols-outlined text-xl" data-icon="settings">
              settings
            </span>
            <span className="text-sm font-medium">Settings</span>
          </a>
          <button 
            onClick={() => {
              document.cookie = "token=; path=/; max-age=0";
              window.location.href = "/auth/login";
            }}
            className="text-text-secondary hover:text-error group flex w-full items-center justify-between px-2 py-2 transition-colors"
          >
            <div className="flex items-center gap-2">
              <div className="bg-surface-variant border-border-default flex h-6 w-6 items-center justify-center rounded-full border group-hover:border-error">
                <span className="material-symbols-outlined text-[14px] text-text-muted group-hover:text-error">logout</span>
              </div>
              <span className="font-body-ui text-body-ui">Log Out</span>
            </div>
            <span className="material-symbols-outlined text-text-muted group-hover:text-error text-[16px] transition-colors">
              logout
            </span>
          </button>

        </div>
      </aside>

      <main className="ml-[240px] flex min-h-screen flex-col">
        <header className="sticky top-0 z-40 flex h-[52px] w-full items-center justify-between border-b border-[#1E1E21] bg-[#0A0A0B]/80 px-6 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 border-b-2 border-[#C9A84C] py-3.5 text-sm font-medium text-[#C9A84C]">
              <span className="material-symbols-outlined text-lg" data-icon="gavel">
                gavel
              </span>
              <span>India (SC)</span>
            </div>
            <div className="h-4 w-[1px] bg-[#1E1E21]"></div>
            <div className="cursor-pointer text-sm font-medium text-gray-400 transition-colors hover:text-white">
              High Courts
            </div>
          </div>
          <div className="flex items-center gap-6">
            <button className="rounded-full bg-[#C9A84C] px-4 py-1.5 text-xs font-bold text-[#111113] transition-colors hover:bg-[#E8C96A]">
              Upgrade to Pro
            </button>
            <div className="flex items-center gap-4 text-gray-400">
              <span
                className="material-symbols-outlined cursor-pointer transition-colors hover:text-white"
                data-icon="notifications"
              >
                notifications
              </span>
              <span
                className="material-symbols-outlined cursor-pointer transition-colors hover:text-white"
                data-icon="history"
              >
                history
              </span>
              <div className="h-8 w-8 overflow-hidden rounded-full border border-[#C9A84C44]">
                <img
                  alt="Profile"
                  className="h-full w-full object-cover"
                  data-alt="A professional headshot of a seasoned Indian advocate in a black legal robe, set against a blurred background of a traditional law library with mahogany shelves and leather-bound books. The lighting is warm and authoritative, emphasizing trust and experience. The overall aesthetic is clean, sharp, and corporate."
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBaL73EkkQbO4d4TwxSo6gOLViUz5J_IcbihsdoxSqTtFNGefIIwmIaw3R_vmawSOY_0K8Shgx-zRg4ckGaLystdoGVlSCDOmcS1IHjw9D12IMTa5KXowhsfdQcDIgGpIWr8VKv9EyvxuFDLLoHc1c5bM_xdiFOTRXE6ZB2mpKFWOXo584Kgum7zO_hJwNY2wLyDOq71Jf727ICqP2IBPs45l93GVClbDwh2ycNPEshdbfzcSuQG8v2S7gZd_C3vulFm52C62RFOBE"
                />
              </div>
            </div>
          </div>
        </header>

        <div className="mx-auto w-full max-w-[720px] flex-1 px-6 pt-12 pb-24">
          <div className="mb-12 text-center">
            <h2 className="font-page-title text-page-title text-primary mb-2">
              Legal Research Engine
            </h2>
            <p className="text-text-secondary font-body-ui">
              Access over 2 million judgments and central statutes with AI-powered precision.
            </p>
          </div>

          <div className="relative mb-12">
            <div className="absolute inset-0 rounded-full bg-[#C9A84C] opacity-5 blur-2xl"></div>
            <div className="bg-surface-container border-gold-border focus-within:border-primary relative rounded-xl border p-2 shadow-2xl transition-all duration-300">
              <div className="flex items-center gap-3 px-4">
                <span className="material-symbols-outlined text-primary" data-icon="search">
                  search
                </span>
                <input
                  className="text-text-primary placeholder-text-disabled font-body-ui w-full border-none bg-transparent py-4 text-lg focus:ring-0"
                  placeholder="Search by party name, citation, or legal query..."
                  type="text"
                />
                <button className="bg-primary hover:bg-gold-hover text-on-primary flex items-center gap-2 rounded-lg px-6 py-2.5 font-bold transition-colors">
                  <span>Analyze</span>
                  <span className="material-symbols-outlined text-sm" data-icon="auto_awesome">
                    auto_awesome
                  </span>
                </button>
              </div>
            </div>
          </div>

          <section className="mb-16 grid grid-cols-3 gap-4">
            <div className="bg-surface-container-low border-border-default hover:border-primary group cursor-pointer rounded-xl border p-4 transition-all">
              <div className="bg-gold-subtle group-hover:bg-primary mb-3 flex h-10 w-10 items-center justify-center rounded-lg transition-colors">
                <span
                  className="material-symbols-outlined text-primary group-hover:text-on-primary"
                  data-icon="account_balance"
                >
                  account_balance
                </span>
              </div>
              <h3 className="font-sub-heading text-primary">Supreme Court</h3>
              <p className="text-meta-small text-text-muted">Landmark Judgments (1950-2024)</p>
            </div>
            <div className="bg-surface-container-low border-border-default hover:border-primary group cursor-pointer rounded-xl border p-4 transition-all">
              <div className="bg-gold-subtle group-hover:bg-primary mb-3 flex h-10 w-10 items-center justify-center rounded-lg transition-colors">
                <span
                  className="material-symbols-outlined text-primary group-hover:text-on-primary"
                  data-icon="gavel"
                >
                  gavel
                </span>
              </div>
              <h3 className="font-sub-heading text-primary">High Courts</h3>
              <p className="text-meta-small text-text-muted">25 States &amp; Union Territories</p>
            </div>
            <div className="bg-surface-container-low border-border-default hover:border-primary group cursor-pointer rounded-xl border p-4 transition-all">
              <div className="bg-gold-subtle group-hover:bg-primary mb-3 flex h-10 w-10 items-center justify-center rounded-lg transition-colors">
                <span
                  className="material-symbols-outlined text-primary group-hover:text-on-primary"
                  data-icon="description"
                >
                  description
                </span>
              </div>
              <h3 className="font-sub-heading text-primary">Bare Acts</h3>
              <p className="text-meta-small text-text-muted">Central &amp; State Statutes</p>
            </div>
          </section>

          <section>
            <div className="mb-6 flex items-center justify-between">
              <h3 className="font-section-head text-primary flex items-center gap-2">
                <span className="material-symbols-outlined" data-icon="history">
                  history
                </span>
                Recent Research
              </h3>
              <button className="text-meta-small text-text-muted hover:text-primary font-bold tracking-widest uppercase">
                Clear All
              </button>
            </div>
            <div className="space-y-3">
              <div className="bg-surface-container border-border-default hover:bg-surface-container-high group flex items-center justify-between rounded-lg border p-4 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="bg-success mt-1 h-2 w-2 rounded-full"></div>
                  <div>
                    <h4 className="font-sub-heading text-text-primary group-hover:text-primary transition-colors">
                      Kesavananda Bharati v. State of Kerala
                    </h4>
                    <div className="mt-1 flex gap-3">
                      <span className="text-citation text-text-muted font-citation">
                        1973 (4) SCC 225
                      </span>
                      <span className="text-citation text-text-muted flex items-center gap-1">
                        <span
                          className="material-symbols-outlined text-[10px]"
                          data-icon="verified"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          verified
                        </span>
                        Verified Precedent
                      </span>
                    </div>
                  </div>
                </div>
                <span
                  className="material-symbols-outlined text-text-muted cursor-pointer opacity-0 transition-opacity group-hover:opacity-100 hover:text-white"
                  data-icon="open_in_new"
                >
                  open_in_new
                </span>
              </div>

              <div className="bg-surface-container border-border-default hover:bg-surface-container-high group flex items-center justify-between rounded-lg border p-4 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="bg-warning mt-1 h-2 w-2 rounded-full"></div>
                  <div>
                    <h4 className="font-sub-heading text-text-primary group-hover:text-primary transition-colors">
                      Section 138 NI Act: Interim Compensation
                    </h4>
                    <div className="mt-1 flex gap-3">
                      <span className="text-citation text-text-muted font-citation">
                        Negotiable Instruments Act, 1881
                      </span>
                      <span className="text-citation text-text-muted">Updated: 2 days ago</span>
                    </div>
                  </div>
                </div>
                <span
                  className="material-symbols-outlined text-text-muted cursor-pointer opacity-0 transition-opacity group-hover:opacity-100 hover:text-white"
                  data-icon="open_in_new"
                >
                  open_in_new
                </span>
              </div>

              <div className="bg-surface-container border-border-default hover:bg-surface-container-high group flex items-center justify-between rounded-lg border p-4 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="bg-case-accent mt-1 h-2 w-2 rounded-full"></div>
                  <div>
                    <h4 className="font-sub-heading text-text-primary group-hover:text-primary transition-colors">
                      Personal Liberty under Article 21
                    </h4>
                    <div className="mt-1 flex gap-3">
                      <span className="text-citation text-text-muted font-citation">
                        Constitution of India
                      </span>
                      <span className="text-citation text-text-muted">Draft Saved</span>
                    </div>
                  </div>
                </div>
                <span
                  className="material-symbols-outlined text-text-muted cursor-pointer opacity-0 transition-opacity group-hover:opacity-100 hover:text-white"
                  data-icon="open_in_new"
                >
                  open_in_new
                </span>
              </div>
            </div>
          </section>
        </div>

        <footer className="mt-auto w-full border-t border-[#1E1E21] bg-[#0A0A0B] py-12">
          <div className="mx-auto grid max-w-7xl grid-cols-1 items-center px-8 md:grid-cols-2">
            <div>
              <h2 className="mb-2 font-serif text-lg font-bold text-[#C9A84C]">LexAI</h2>
              <p className="font-noto-serif text-xs tracking-widest text-gray-600 uppercase">
                © 2024 LexAI Intelligence. Trusted by Advocates &amp; SME Founders.
              </p>
            </div>
            <div className="mt-4 flex gap-6 md:mt-0 md:justify-end">
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

      <div className="fixed right-8 bottom-8 z-50">
        <button className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-[#C9A84C] to-[#584400] text-[#111113] shadow-2xl transition-transform hover:scale-105 active:scale-95">
          <span className="material-symbols-outlined text-2xl" data-icon="psychology">
            psychology
          </span>
          <div className="bg-surface-container border-gold-border text-primary absolute -top-12 right-0 hidden rounded border px-3 py-1 text-[10px] font-bold tracking-tighter whitespace-nowrap uppercase group-hover:block">
            Ask Legal AI
          </div>
        </button>
      </div>
    </>
  );
}
