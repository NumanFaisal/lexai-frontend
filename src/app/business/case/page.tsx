'use client';
import Link from 'next/link';
export default function Page() {
  return (
    <>
      <aside className="fixed top-0 left-0 z-50 flex h-screen w-[240px] flex-col gap-2 border-r border-[#1E1E21] bg-[#111113] p-4">
        <div className="mb-8 flex items-center gap-3 px-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#C9A84C] to-[#584400]">
            <span className="text-on-primary font-logo text-xl">L</span>
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-2xl leading-none font-bold tracking-tighter text-[#C9A84C]">
              LexAI
            </span>
            <span className="text-text-secondary font-sub-heading text-[10px] tracking-widest uppercase">
              Legal Intelligence
            </span>
          </div>
        </div>
        <nav className="flex-1 space-y-1">
          <Link
            href="/student/chat"
            className="group flex items-center gap-3 rounded-lg p-3 text-gray-500 transition-all duration-200 hover:bg-[#1A1A1D] hover:text-[#C9A84C]"
          >
            <span
              className="material-symbols-outlined transition-transform group-hover:scale-110"
              data-icon="chat_bubble"
            >
              chat_bubble
            </span>
            <span className="font-sub-heading text-sm">Legal Chat</span>
          </Link>
          <Link
            href="/student/vault"
            className="group flex items-center gap-3 rounded-lg p-3 text-gray-500 transition-all duration-200 hover:bg-[#1A1A1D] hover:text-[#C9A84C]"
          >
            <span
              className="material-symbols-outlined transition-transform group-hover:scale-110"
              data-icon="account_balance"
            >
              account_balance
            </span>
            <span className="font-sub-heading text-sm">Research Vault</span>
          </Link>
          <Link
            href="/business/drafts"
            className="group relative flex items-center gap-3 rounded-lg bg-[#1A1A1D] p-3 font-semibold text-[#C9A84C] after:absolute after:right-0 after:h-4 after:w-1 after:rounded-full after:bg-[#C9A84C] after:content-['']"
          >
            <span
              className="material-symbols-outlined transition-transform group-hover:scale-110"
              data-icon="edit_document"
            >
              edit_document
            </span>
            <span className="font-sub-heading text-sm">Contract Drafts</span>
          </Link>
          <Link
            href="/business/compliance"
            className="group flex items-center gap-3 rounded-lg p-3 text-gray-500 transition-all duration-200 hover:bg-[#1A1A1D] hover:text-[#C9A84C]"
          >
            <span
              className="material-symbols-outlined transition-transform group-hover:scale-110"
              data-icon="verified"
            >
              verified
            </span>
            <span className="font-sub-heading text-sm">Compliance Hub</span>
          </Link>
          <Link
            href="/pricing"
            className="group flex items-center gap-3 rounded-lg p-3 text-gray-500 transition-all duration-200 hover:bg-[#1A1A1D] hover:text-[#C9A84C]"
          >
            <span
              className="material-symbols-outlined transition-transform group-hover:scale-110"
              data-icon="workspace_premium"
            >
              workspace_premium
            </span>
            <span className="font-sub-heading text-sm">Premium Access</span>
          </Link>
        </nav>
        <div className="mt-auto space-y-1 border-t border-[#1E1E21] pt-4">
          <button className="mb-4 w-full scale-95 rounded-lg bg-[#C9A84C] py-2.5 text-xs font-bold tracking-wider text-[#0A0A0B] uppercase transition-transform active:scale-90">
            New Research Session
          </button>
          <a
            className="group flex items-center gap-3 rounded-lg p-3 text-gray-500 transition-all duration-200 hover:bg-[#1A1A1D] hover:text-[#C9A84C]"
            href="#"
          >
            <span className="material-symbols-outlined" data-icon="help">
              help
            </span>
            <span className="font-sub-heading text-sm">Knowledge Base</span>
          </a>
          <a
            className="group flex items-center gap-3 rounded-lg p-3 text-gray-500 transition-all duration-200 hover:bg-[#1A1A1D] hover:text-[#C9A84C]"
            href="#"
          >
            <span className="material-symbols-outlined" data-icon="settings">
              settings
            </span>
            <span className="font-sub-heading text-sm">Settings</span>
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
        <header className="sticky top-0 z-40 flex h-[52px] w-full items-center justify-between border-b border-[#1E1E21] bg-[#0A0A0B]/80 px-6 backdrop-blur-md">
          <div className="flex flex-1 items-center gap-4">
            <div className="relative w-full max-w-md">
              <span
                className="material-symbols-outlined text-text-disabled absolute top-1/2 left-3 -translate-y-1/2 text-sm"
                data-icon="search"
              >
                search
              </span>
              <input
                className="text-on-surface w-full rounded-full border-none bg-[#111113] py-1.5 pr-4 pl-10 text-xs focus:ring-1 focus:ring-[#C9A84C44]"
                placeholder="Search case law, notices, or acts..."
                type="text"
              />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="bg-secondary-container/20 border-secondary-container/30 flex items-center gap-2 rounded-full border px-3 py-1">
              <div className="bg-success h-2 w-2 rounded-full"></div>
              <span className="font-noto-serif text-secondary text-[11px] font-medium">
                India (SC)
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span
                className="material-symbols-outlined cursor-pointer text-xl text-gray-400 transition-colors hover:text-white"
                data-icon="notifications"
              >
                notifications
              </span>
              <span
                className="material-symbols-outlined cursor-pointer text-xl text-gray-400 transition-colors hover:text-white"
                data-icon="history"
              >
                history
              </span>
              <div className="group flex cursor-pointer items-center gap-2">
                <span
                  className="material-symbols-outlined text-2xl text-[#C9A84C]"
                  data-icon="account_circle"
                >
                  account_circle
                </span>
                <span className="text-text-primary text-xs font-semibold transition-colors group-hover:text-[#C9A84C]">
                  Upgrade to Pro
                </span>
              </div>
            </div>
          </div>
        </header>

        <div className="py-block px-standard mx-auto w-full max-w-[720px] flex-1">
          <div className="mb-major">
            <div className="mb-2 flex items-center gap-2">
              <span className="bg-secondary-container/30 text-secondary border-secondary-container rounded-sm border px-2 py-0.5 text-[10px] font-bold tracking-widest uppercase">
                Business Persona
              </span>
              <span className="text-text-disabled text-xs">•</span>
              <span className="text-text-secondary font-meta-small text-xs">
                Case ID: LX-2024-882
              </span>
            </div>
            <h1 className="font-page-title text-page-title text-text-primary mb-2">
              Notice of Contractual Breach
            </h1>
            <p className="text-text-secondary font-body-ui">
              Analyzing legal exposure for "Swift Logistics Pvt. Ltd." regarding the vendor dispute
              dated October 14, 2024.
            </p>
          </div>

          <div className="mb-section grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="bg-bg-secondary border-border-default relative overflow-hidden rounded-xl border p-6 md:col-span-2">
              <div className="bg-secondary/5 absolute top-0 right-0 -mt-16 -mr-16 h-32 w-32 rounded-full blur-3xl"></div>
              <div className="mb-6 flex items-start justify-between">
                <div>
                  <h3 className="font-section-head text-section-head text-text-primary mb-1">
                    Exposure Analysis
                  </h3>
                  <p className="text-meta-small text-text-secondary">
                    AI-calculated potential liability and risk score.
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-text-disabled font-label-caps mb-1 block text-xs uppercase">
                    Risk Level
                  </span>
                  <span className="bg-warning/10 text-warning border-warning/20 rounded-full border px-3 py-1 text-xs font-bold">
                    Moderate (64%)
                  </span>
                </div>
              </div>
              <div className="mb-6 flex items-end gap-2">
                <span className="font-page-title text-4xl text-[#C9A84C]">₹12,50,000</span>
                <span className="text-text-secondary font-meta-small mb-1.5">
                  Est. Maximum Exposure
                </span>
              </div>
              <div className="border-border-default grid grid-cols-3 gap-4 border-t pt-6">
                <div>
                  <span className="text-text-disabled font-label-caps mb-1 block text-[10px] uppercase">
                    Court Fees
                  </span>
                  <span className="font-citation text-text-primary text-sm">₹1,25,000</span>
                </div>
                <div>
                  <span className="text-text-disabled font-label-caps mb-1 block text-[10px] uppercase">
                    Counsel Est.
                  </span>
                  <span className="font-citation text-text-primary text-sm">₹3,00,000</span>
                </div>
                <div>
                  <span className="text-text-disabled font-label-caps mb-1 block text-[10px] uppercase">
                    Timeline
                  </span>
                  <span className="font-citation text-text-primary text-sm">12-18 Months</span>
                </div>
              </div>
            </div>

            <div className="bg-secondary-container/5 border-secondary-container/20 group hover:border-secondary-container/40 rounded-xl border p-6 transition-colors">
              <div className="mb-4 flex items-center gap-3">
                <span className="material-symbols-outlined text-secondary" data-icon="gavel">
                  gavel
                </span>
                <h4 className="font-sub-heading text-sub-heading text-secondary">Legal Strategy</h4>
              </div>
              <ul className="space-y-3">
                <li className="text-on-surface flex gap-2 text-xs">
                  <span className="text-secondary">•</span>
                  <span>Invoke Clause 12.4 (Force Majeure) for shipping delays.</span>
                </li>
                <li className="text-on-surface flex gap-2 text-xs">
                  <span className="text-secondary">•</span>
                  <span>Propose pre-litigation mediation to cap costs at ₹2L.</span>
                </li>
              </ul>
            </div>

            <div className="bg-bg-secondary border-border-default rounded-xl border p-6">
              <div className="mb-4 flex items-center gap-3">
                <span
                  className="material-symbols-outlined text-[#C9A84C]"
                  data-icon="library_books"
                >
                  library_books
                </span>
                <h4 className="font-sub-heading text-sub-heading text-text-primary">
                  Key Precedents
                </h4>
              </div>
              <div className="space-y-3">
                <div className="bg-bg-tertiary border-border-default hover:bg-surface-variant cursor-pointer rounded-lg border p-2 transition-colors">
                  <p className="mb-1 text-[11px] font-bold text-[#C9A84C]">
                    Sharma vs. LogiCorp (2021)
                  </p>
                  <p className="text-text-secondary line-clamp-1 text-[10px]">
                    SC ruled 10% penalty cap on logistics delay...
                  </p>
                </div>
                <div className="bg-bg-tertiary border-border-default hover:bg-surface-variant cursor-pointer rounded-lg border p-2 transition-colors">
                  <p className="mb-1 text-[11px] font-bold text-[#C9A84C]">
                    Apex Vendors Ltd. vs. Union (2019)
                  </p>
                  <p className="text-text-secondary line-clamp-1 text-[10px]">
                    Definition of 'reasonable notice' for breach...
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-bg-secondary border-border-default mb-section overflow-hidden rounded-xl border">
            <div className="border-border-default flex items-center justify-between border-b px-6 py-4">
              <h3 className="font-section-head text-text-primary text-sm tracking-wider uppercase">
                Required Documentation
              </h3>
              <div className="flex gap-1">
                <div className="bg-success h-2 w-2 rounded-full"></div>
                <div className="bg-warning h-2 w-2 rounded-full"></div>
                <div className="bg-error h-2 w-2 rounded-full"></div>
              </div>
            </div>
            <div className="divide-border-default divide-y">
              <div className="group hover:bg-bg-tertiary flex items-center justify-between px-6 py-4 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="bg-success h-1.5 w-1.5 rounded-full"></div>
                  <span className="text-text-primary text-xs">
                    Master Service Agreement (Signed)
                  </span>
                </div>
                <span className="text-success font-citation bg-success/10 rounded px-2 py-0.5 text-[10px] font-bold">
                  VERIFIED
                </span>
              </div>
              <div className="group hover:bg-bg-tertiary flex items-center justify-between px-6 py-4 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="bg-warning h-1.5 w-1.5 rounded-full"></div>
                  <span className="text-text-primary text-xs">Breach Notification Receipt</span>
                </div>
                <button className="hover:bg-gold-hover rounded bg-[#C9A84C] px-3 py-1 text-[10px] font-bold text-[#0A0A0B] transition-colors">
                  UPLOAD
                </button>
              </div>
              <div className="group hover:bg-bg-tertiary flex items-center justify-between px-6 py-4 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="bg-error h-1.5 w-1.5 rounded-full"></div>
                  <span className="text-text-primary text-xs">
                    Proof of Unavoidable Delay (Logistics)
                  </span>
                </div>
                <span className="text-error font-citation bg-error/10 rounded px-2 py-0.5 text-[10px] font-bold uppercase">
                  Critical Action
                </span>
              </div>
            </div>
          </div>

          <div className="border-gold-border mb-section relative rounded-2xl border bg-gradient-to-br from-[#111113] to-[#0A0A0B] p-8">
            <div className="absolute top-4 right-8">
              <span
                className="material-symbols-outlined text-6xl text-[#C9A84C] opacity-20"
                data-icon="auto_awesome"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                auto_awesome
              </span>
            </div>
            <h4 className="font-noto-serif mb-4 text-lg text-[#C9A84C]">
              LexAI Strategic Recommendation
            </h4>
            <p className="text-body-chat text-on-surface mb-6 leading-relaxed italic">
              "Based on 42 similar cases in the Karnataka High Court between 2021-2023, the
              'Moderate Risk' rating stems from the vendor's failure to provide a curative period
              notice. We recommend immediate dispatch of a 'Defect of Notice' reply to stall
              proceedings by 30 days."
            </p>
            <div className="flex gap-4">
              <button className="rounded-lg bg-[#C9A84C] px-6 py-2.5 text-sm font-bold text-[#0A0A0B] transition-transform active:scale-95">
                Generate Reply Draft
              </button>
              <button className="border-border-default text-text-primary hover:bg-bg-tertiary rounded-lg border px-6 py-2.5 text-sm font-bold transition-colors">
                Contact Legal Desk
              </button>
            </div>
          </div>
        </div>

        <footer className="mt-auto w-full border-t border-[#1E1E21] bg-[#0A0A0B] py-12">
          <div className="mx-auto grid max-w-7xl grid-cols-1 items-center px-8 md:grid-cols-2">
            <div>
              <span className="font-serif text-lg font-bold text-[#C9A84C]">LexAI</span>
              <p className="font-noto-serif mt-2 text-[10px] tracking-[0.2em] text-gray-600 uppercase">
                © 2024 LexAI Intelligence. Trusted by Advocates &amp; SME Founders.
              </p>
            </div>
            <div className="mt-6 flex gap-6 md:mt-0 md:justify-end">
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
                Contact Support
              </a>
            </div>
          </div>
        </footer>
      </main>

      <div className="pointer-events-none fixed inset-0 z-[-1] overflow-hidden">
        <div className="absolute -top-[10%] -left-[5%] h-[40%] w-[40%] rounded-full bg-[#C9A84C] opacity-[0.03] blur-[120px]"></div>
        <div className="bg-secondary absolute right-[2%] bottom-[5%] h-[30%] w-[30%] rounded-full opacity-[0.02] blur-[100px]"></div>
      </div>
    </>
  );
}
