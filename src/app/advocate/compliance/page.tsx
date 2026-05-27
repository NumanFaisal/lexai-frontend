'use client';
import Link from 'next/link';
export default function Page() {
  return (
    <>
      <aside className="font-noto-serif fixed top-0 left-0 z-50 flex h-screen w-[240px] flex-col gap-2 border-r border-[#1E1E21] bg-[#111113] p-4 tracking-tight antialiased">
        <div className="mb-4 flex items-center gap-3 px-2 py-4">
          <div className="gold-gradient-bg flex h-8 w-8 items-center justify-center rounded">
            <span
              className="material-symbols-outlined text-on-primary text-xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              gavel
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-2xl font-bold tracking-tighter text-[#C9A84C]">
              LexAI
            </span>
            <span className="text-text-muted text-[10px] tracking-widest uppercase">
              Legal Intelligence
            </span>
          </div>
        </div>
        <button className="gold-gradient-bg text-on-primary mb-6 flex w-full scale-95 items-center justify-center gap-2 rounded-lg py-3 font-bold transition-transform active:scale-90">
          <span className="material-symbols-outlined text-sm">add</span>
          New Research Session
        </button>
        <nav className="flex-1 space-y-1">
          <Link
            href="/student/chat"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all duration-200 hover:bg-[#1A1A1D] hover:text-[#C9A84C]"
          >
            <span className="material-symbols-outlined" data-icon="chat_bubble">
              chat_bubble
            </span>
            <span className="text-sm">Legal Chat</span>
          </Link>
          <Link
            href="/student/vault"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all duration-200 hover:bg-[#1A1A1D] hover:text-[#C9A84C]"
          >
            <span className="material-symbols-outlined" data-icon="account_balance">
              account_balance
            </span>
            <span className="text-sm">Research Vault</span>
          </Link>
          <Link
            href="/student/drafts"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all duration-200 hover:bg-[#1A1A1D] hover:text-[#C9A84C]"
          >
            <span className="material-symbols-outlined" data-icon="edit_document">
              edit_document
            </span>
            <span className="text-sm">Contract Drafts</span>
          </Link>
          <Link
            href="/business/compliance"
            className="relative flex items-center gap-3 rounded-lg bg-[#1A1A1D] px-3 py-2 font-semibold text-[#C9A84C] after:absolute after:right-0 after:h-4 after:w-1 after:rounded-full after:bg-[#C9A84C] after:content-['']"
          >
            <span className="material-symbols-outlined" data-icon="verified">
              verified
            </span>
            <span className="text-sm">Compliance Hub</span>
          </Link>
          <Link
            href="/pricing"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all duration-200 hover:bg-[#1A1A1D] hover:text-[#C9A84C]"
          >
            <span className="material-symbols-outlined" data-icon="workspace_premium">
              workspace_premium
            </span>
            <span className="text-sm">Premium Access</span>
          </Link>
        </nav>
        <div className="space-y-1 border-t border-[#1E1E21] pt-4">
          <a
            className="flex items-center gap-3 px-3 py-2 text-gray-500 transition-all hover:text-[#C9A84C]"
            href="#"
          >
            <span className="material-symbols-outlined" data-icon="help">
              help
            </span>
            <span className="text-sm">Knowledge Base</span>
          </a>
          <a
            className="flex items-center gap-3 px-3 py-2 text-gray-500 transition-all hover:text-[#C9A84C]"
            href="#"
          >
            <span className="material-symbols-outlined" data-icon="settings">
              settings
            </span>
            <span className="text-sm">Settings</span>
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

      <header className="font-noto-serif sticky top-0 z-40 ml-[240px] flex h-[52px] w-full max-w-[calc(100%-240px)] items-center justify-between border-b border-[#1E1E21] bg-[#0A0A0B]/80 px-6 text-sm font-medium shadow-sm backdrop-blur-md">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 rounded-lg border border-[#1E1E21] bg-[#1A1A1D] px-3 py-1.5">
            <span className="material-symbols-outlined text-[18px] text-[#C9A84C]">search</span>
            <input
              className="text-text-primary w-48 border-none bg-transparent text-xs focus:ring-0"
              placeholder="Search compliance records..."
              type="text"
            />
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-[#C9A84C]">
            <span className="material-symbols-outlined text-sm">location_on</span>
            <span className="text-xs">India (SC)</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="transition-colors hover:text-white">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <button className="transition-colors hover:text-white">
              <span className="material-symbols-outlined">history</span>
            </button>
            <button className="text-on-primary rounded bg-[#C9A84C] px-3 py-1 text-xs font-bold">
              Upgrade to Pro
            </button>
            <div className="bg-surface-container h-8 w-8 overflow-hidden rounded-full">
              <img
                alt="User Profile"
                className="h-full w-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuALdFI7riKfybl9-eub2g88l_Ado4Logui9o6cvXHCS7R66Hh3NY0MiuDaNV1L00Mq4QySBli4EteZWkjm-OIi4hr8f4wtdTmBvQV6R_iTQ_CEGIVcceCs6cPc0LNVKLXOEq-iklan1Y2SdXf9R4XS9Pz91TFcaaAJQWBqXf9BfGbV3Xk0sp6j6OgD_--HtqtUJMLlVeUifhuYgbk2LQ-DfTHzRt1ZMtHn2Pkdilw8Ter6nm4YoZXv_PkUvmrCCkxSFI5-J0VSP-Ac"
              />
            </div>
          </div>
        </div>
      </header>

      <main className="ml-[240px] max-w-[1200px] p-8">
        <header className="mb-12">
          <h1 className="font-page-title text-page-title text-text-primary mb-2">
            Compliance Check
          </h1>
          <p className="text-text-secondary font-body-ui">
            Verify corporate and legal compliance against current Indian statutes.
          </p>
        </header>

        <div className="mb-12 grid grid-cols-12 gap-6">
          <div className="relative col-span-8 overflow-hidden rounded-xl border border-[#1E1E21] bg-[#111113] p-6">
            <div className="relative z-10 mb-8 flex items-start justify-between">
              <div>
                <h3 className="font-section-head text-section-head text-text-primary mb-1">
                  Corporate Health Audit
                </h3>
                <p className="text-text-muted text-xs">
                  Drafting for Reliance Logistics JV • Ref: RL-2024-001
                </p>
              </div>
              <span className="bg-gold-subtle border-gold-border rounded border px-2 py-1 text-[10px] font-bold text-[#C9A84C]">
                RISK ASSESSMENT
              </span>
            </div>
            <div className="relative z-10 flex items-end gap-8">
              <div className="flex flex-col">
                <span className="text-4xl font-bold text-[#C9A84C]">84%</span>
                <span className="text-text-muted mt-1 text-xs tracking-widest uppercase">
                  Compliance Score
                </span>
              </div>
              <div className="mb-2 h-2 flex-1 overflow-hidden rounded-full bg-[#1E1E21]">
                <div className="gold-gradient-bg h-full w-[84%]"></div>
              </div>
            </div>

            <div className="absolute -right-8 -bottom-8 opacity-5">
              <span
                className="material-symbols-outlined text-[120px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                balance
              </span>
            </div>
          </div>

          <div className="col-span-4 flex flex-col justify-between rounded-xl border border-[#1E1E21] bg-[#111113] p-6">
            <div className="flex items-center justify-between">
              <span className="text-text-muted text-xs font-medium">Pending Issues</span>
              <span className="material-symbols-outlined text-error text-xl">warning</span>
            </div>
            <div>
              <h4 className="text-error text-3xl font-bold">03</h4>
              <p className="text-text-muted mt-2 text-[11px]">
                Critical regulatory gaps identified in the last 24 hours.
              </p>
            </div>
          </div>

          <div className="col-span-3 flex items-center gap-4 rounded-xl border border-[#1E1E21] bg-[#111113] p-4">
            <div className="bg-gold-subtle flex h-10 w-10 items-center justify-center rounded-lg">
              <span className="material-symbols-outlined text-[#C9A84C]">gavel</span>
            </div>
            <div>
              <p className="text-text-muted text-[10px] uppercase">Statutes Checked</p>
              <p className="text-lg font-bold">142</p>
            </div>
          </div>
          <div className="col-span-3 flex items-center gap-4 rounded-xl border border-[#1E1E21] bg-[#111113] p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1a2f59]/30">
              <span className="material-symbols-outlined text-tertiary">description</span>
            </div>
            <div>
              <p className="text-text-muted text-[10px] uppercase">Documents Verified</p>
              <p className="text-lg font-bold">12</p>
            </div>
          </div>
          <div className="bg-gold-subtle border-gold-border col-span-6 flex items-center justify-between rounded-xl border p-4">
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined scale-125 text-[#C9A84C]">
                auto_awesome
              </span>
              <div>
                <p className="text-sm font-semibold text-[#C9A84C]">LexAI Recommendation</p>
                <p className="text-text-secondary text-[11px]">
                  Update Clause 4.2 to align with new SEBI guidelines.
                </p>
              </div>
            </div>
            <button className="text-[11px] font-bold tracking-wider text-[#C9A84C] uppercase underline">
              Fix Now
            </button>
          </div>
        </div>

        <div className="mb-12 overflow-hidden rounded-xl border border-[#1E1E21] bg-[#111113]">
          <div className="flex items-center justify-between border-b border-[#1E1E21] p-6">
            <h2 className="font-section-head text-section-head">Statutory Checklist</h2>
            <div className="flex gap-2">
              <button className="text-text-primary rounded-lg border border-[#1E1E21] bg-[#1A1A1D] px-4 py-2 text-xs font-semibold transition-colors hover:bg-[#222226]">
                Export Report
              </button>
              <button className="gold-gradient-bg text-on-primary flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold">
                <span className="material-symbols-outlined text-sm">add_task</span>
                Add New Item
              </button>
            </div>
          </div>

          <div className="divide-y divide-[#1E1E21]">
            <div className="group flex items-center gap-4 p-4 transition-colors hover:bg-[#1A1A1D]">
              <div className="bg-success h-2 w-2 rounded-full shadow-[0_0_8px_rgba(123,158,135,0.6)]"></div>
              <div className="flex-1">
                <p className="text-text-primary text-sm font-semibold">
                  FDI Policy Compliance - Press Note 3
                </p>
                <p className="text-text-muted text-[11px]">
                  Verification of beneficial ownership from neighboring borders.
                </p>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex flex-col items-end">
                  <span className="bg-gold-subtle font-citation border-gold-border flex items-center gap-1 rounded border px-2 py-0.5 text-[10px] text-[#C9A84C]">
                    <span
                      className="material-symbols-outlined text-[10px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      check_circle
                    </span>
                    VERIFIED
                  </span>
                  <span className="text-text-muted mt-1 text-[9px] uppercase">2 hrs ago</span>
                </div>
                <button className="text-text-disabled group-hover:text-text-primary p-2 transition-colors">
                  <span className="material-symbols-outlined">more_vert</span>
                </button>
              </div>
            </div>

            <div className="group flex items-center gap-4 p-4 transition-colors hover:bg-[#1A1A1D]">
              <div className="bg-error h-2 w-2 rounded-full shadow-[0_0_8px_rgba(190,123,123,0.6)]"></div>
              <div className="flex-1">
                <p className="text-text-primary text-sm font-semibold">
                  Stamp Duty Valuation - Maharashtra
                </p>
                <p className="text-text-muted text-[11px]">
                  Missing e-Stamping certificate for Schedule 1 Article 5(h).
                </p>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex flex-col items-end">
                  <span className="bg-error/10 text-error font-citation border-error/20 flex items-center gap-1 rounded border px-2 py-0.5 text-[10px]">
                    <span
                      className="material-symbols-outlined text-[10px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      warning
                    </span>
                    ACTION REQ
                  </span>
                  <span className="text-text-muted mt-1 text-[9px] uppercase">Just Now</span>
                </div>
                <button className="text-text-disabled group-hover:text-text-primary p-2 transition-colors">
                  <span className="material-symbols-outlined">more_vert</span>
                </button>
              </div>
            </div>

            <div className="group flex items-center gap-4 p-4 transition-colors hover:bg-[#1A1A1D]">
              <div className="bg-warning h-2 w-2 rounded-full shadow-[0_0_8px_rgba(232,201,106,0.6)]"></div>
              <div className="flex-1">
                <p className="text-text-primary text-sm font-semibold">
                  GST Reverse Charge Mechanism (RCM)
                </p>
                <p className="text-text-muted text-[11px]">
                  Verification of legal service invoices for financial year 2023-24.
                </p>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex flex-col items-end">
                  <span className="bg-warning/10 text-warning font-citation border-warning/20 flex items-center gap-1 rounded border px-2 py-0.5 text-[10px]">
                    <span
                      className="material-symbols-outlined text-[10px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      hourglass_top
                    </span>
                    PENDING
                  </span>
                  <span className="text-text-muted mt-1 text-[9px] uppercase">Yesterday</span>
                </div>
                <button className="text-text-disabled group-hover:text-text-primary p-2 transition-colors">
                  <span className="material-symbols-outlined">more_vert</span>
                </button>
              </div>
            </div>

            <div className="group flex items-center gap-4 p-4 transition-colors hover:bg-[#1A1A1D]">
              <div className="bg-success h-2 w-2 rounded-full shadow-[0_0_8px_rgba(123,158,135,0.6)]"></div>
              <div className="flex-1">
                <p className="text-text-primary text-sm font-semibold">MSME Act Disclosure</p>
                <p className="text-text-muted text-[11px]">
                  Review of credit terms and interest penalties for vendor delays.
                </p>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex flex-col items-end">
                  <span className="bg-gold-subtle font-citation border-gold-border flex items-center gap-1 rounded border px-2 py-0.5 text-[10px] text-[#C9A84C]">
                    <span
                      className="material-symbols-outlined text-[10px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      check_circle
                    </span>
                    VERIFIED
                  </span>
                  <span className="text-text-muted mt-1 text-[9px] uppercase">3 days ago</span>
                </div>
                <button className="text-text-disabled group-hover:text-text-primary p-2 transition-colors">
                  <span className="material-symbols-outlined">more_vert</span>
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-[#1E1E21] bg-[#0A0A0B] p-4 text-center">
            <button className="text-text-muted text-xs font-semibold transition-colors hover:text-[#C9A84C]">
              View All 42 Compliance Items
            </button>
          </div>
        </div>

        <div className="mb-12 grid grid-cols-2 gap-8">
          <div className="rounded-xl border border-[#1E1E21] bg-[#111113] p-6">
            <h3 className="font-section-head text-section-head mb-4">Jurisdiction Map</h3>
            <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-[#1E1E21] bg-[#1A1A1D]">
              <img
                className="h-full w-full object-cover opacity-40 grayscale"
                data-alt="A sophisticated dark-themed map of India with highlighted legal jurisdiction regions and gold accent pinpoints showing office locations. The map has a premium, minimalist architectural style with soft atmospheric lighting, reflecting a professional legal and corporate aesthetic."
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA5xiRD2w2Ev1ROi9fWuXpxmSKLHQc1X85NN4mr6nuJrkIPVKpRwO6ebLQtDFxLz3cXjCSVznbjcNN-zVCTCDhU0Sf02VEkuzKL4iAJwdWKXKmwgt3YBsUvX4pN3WX2F4OzzZ6mfRj6ioNC5oDyr3OBap6rujLQyozWt8Ff3baXDmVYyUwku86pI9zCb9MFI1qD7ZG9jAEDxKzpAPfTlf2YjVGiSPBi8fzNH9XYc026igE_SKJLLbiH0U8A_BZiFOOpjcR2JU3QaXY"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="border-gold-border flex items-center gap-2 rounded-full border bg-[#0A0A0B]/80 px-4 py-2 backdrop-blur">
                  <span className="h-2 w-2 rounded-full bg-[#C9A84C]"></span>
                  <span className="text-xs font-bold text-[#C9A84C]">
                    ACTIVE SESSION: BOMBAY HIGH COURT
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-[#1E1E21] bg-[#111113] p-6">
            <h3 className="font-section-head text-section-head mb-4">AI Research Context</h3>
            <div className="space-y-4">
              <div className="rounded-lg border-l-4 border-[#C9A84C] bg-[#1A1A1D] p-3">
                <p className="mb-1 text-xs font-bold text-[#C9A84C]">PRO-TIP</p>
                <p className="text-text-secondary text-xs">
                  Recent Supreme Court rulings on "Place of Effective Management" (POEM) may impact
                  the JV residency status. Suggesting inclusion of residency certificates in the
                  checklist.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="text-text-muted rounded bg-[#1E1E21] px-2 py-1 text-[10px]">
                  Section 185 Companies Act
                </span>
                <span className="text-text-muted rounded bg-[#1E1E21] px-2 py-1 text-[10px]">
                  GST Rule 42
                </span>
                <span className="text-text-muted rounded bg-[#1E1E21] px-2 py-1 text-[10px]">
                  TDS Compliance
                </span>
                <span className="text-text-muted rounded bg-[#1E1E21] px-2 py-1 text-[10px]">
                  IBC Section 9
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-auto ml-[240px] w-full max-w-[calc(100%-240px)] border-t border-[#1E1E21] bg-[#0A0A0B] py-12 shadow-none">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-8 md:grid-cols-2">
          <div className="space-y-4">
            <span className="font-logo text-lg font-bold tracking-tighter text-[#C9A84C]">
              LexAI
            </span>
            <p className="font-noto-serif text-xs leading-relaxed tracking-widest text-gray-600 uppercase">
              © 2024 LexAI Intelligence. Trusted by Advocates &amp; SME Founders.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-2 md:justify-end">
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
