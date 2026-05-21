import Link from 'next/link';
export default function Page() {
  return (
    <>
      <aside className="fixed top-0 left-0 z-50 flex h-screen w-[240px] flex-col gap-2 border-r border-[#1E1E21] bg-[#111113] p-4">
        <div className="mb-8 flex items-center gap-3 px-2">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-gradient-to-br from-[#C9A84C] to-[#E8C96A]">
            <span
              className="material-symbols-outlined text-xl text-[#0A0A0B]"
              data-weight="fill"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              account_balance
            </span>
          </div>
          <div>
            <h1 className="font-noto-serif text-2xl font-bold tracking-tighter text-[#C9A84C]">
              LexAI
            </h1>
            <p className="text-[10px] font-medium tracking-widest text-gray-500 uppercase">
              Legal Intelligence
            </p>
          </div>
        </div>
        <button className="mb-6 w-full rounded-lg bg-[#C9A84C] px-4 py-2.5 text-sm font-semibold text-[#0A0A0B] transition-transform active:scale-95">
          New Research Session
        </button>
        <nav className="flex flex-1 flex-col gap-1">
          <Link
            href="/student/chat"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all duration-200 hover:bg-[#1A1A1D]"
          >
            <span className="material-symbols-outlined">chat_bubble</span>
            <span className="font-noto-serif text-sm">Legal Chat</span>
          </Link>
          <Link
            href="/student/vault"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all duration-200 hover:bg-[#1A1A1D]"
          >
            <span className="material-symbols-outlined">account_balance</span>
            <span className="font-noto-serif text-sm">Research Vault</span>
          </Link>
          <Link
            href="/student/drafts"
            className="active-tab-indicator relative flex items-center gap-3 rounded-lg bg-[#1A1A1D] px-3 py-2 font-semibold text-[#C9A84C] transition-all duration-200"
          >
            <span className="material-symbols-outlined">edit_document</span>
            <span className="font-noto-serif text-sm">Contract Drafts</span>
          </Link>
          <Link
            href="/business/compliance"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all duration-200 hover:bg-[#1A1A1D]"
          >
            <span className="material-symbols-outlined">verified</span>
            <span className="font-noto-serif text-sm">Compliance Hub</span>
          </Link>
          <Link
            href="/pricing"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all duration-200 hover:bg-[#1A1A1D]"
          >
            <span className="material-symbols-outlined">workspace_premium</span>
            <span className="font-noto-serif text-sm">Premium Access</span>
          </Link>
        </nav>
        <div className="mt-auto flex flex-col gap-1 border-t border-[#1E1E21] pt-4">
          <a
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all duration-200 hover:bg-[#1A1A1D]"
            href="#"
          >
            <span className="material-symbols-outlined">help</span>
            <span className="font-noto-serif text-sm">Knowledge Base</span>
          </a>
          <a
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all duration-200 hover:bg-[#1A1A1D]"
            href="#"
          >
            <span className="material-symbols-outlined">settings</span>
            <span className="font-noto-serif text-sm">Settings</span>
          </a>
        </div>
      </aside>

      <header className="sticky top-0 z-40 ml-[240px] flex h-[52px] w-full max-w-[calc(100%-240px)] items-center justify-between border-b border-[#1E1E21] bg-[#0A0A0B]/80 px-6 backdrop-blur-md">
        <div className="flex flex-1 items-center gap-4">
          <div className="flex w-full max-w-md items-center gap-2 rounded-lg border border-[#1E1E21] bg-[#111113] px-3 py-1.5">
            <span className="material-symbols-outlined text-lg text-gray-500">search</span>
            <input
              className="text-on-surface w-full border-none bg-transparent text-sm focus:ring-0"
              placeholder="Search case files, citations, or laws..."
              type="text"
            />
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="font-noto-serif flex items-center gap-4 text-sm text-gray-400">
            <span className="cursor-pointer transition-colors hover:text-white">India (SC)</span>
            <button className="rounded-full border border-[#C9A84C44] px-4 py-1 text-xs font-semibold text-[#C9A84C] transition-all hover:bg-[#C9A84C1A]">
              Upgrade to Pro
            </button>
          </div>
          <div className="flex items-center gap-3 border-l border-[#1E1E21] pl-6 text-gray-500">
            <span className="material-symbols-outlined cursor-pointer transition-colors hover:text-white">
              notifications
            </span>
            <span className="material-symbols-outlined cursor-pointer transition-colors hover:text-white">
              history
            </span>
            <span className="material-symbols-outlined cursor-pointer transition-colors hover:text-[#C9A84C]">
              account_circle
            </span>
          </div>
        </div>
      </header>

      <main className="bg-bg-primary ml-[240px] flex min-h-[calc(100vh-52px)] flex-col p-10">
        <div className="mx-auto w-full max-w-[1000px]">
          <div className="mb-10">
            <h2 className="font-page-title text-page-title text-primary mb-2">
              Case Analysis &amp; Strategy
            </h2>
            <p className="text-text-secondary font-body-ui max-w-2xl">
              Upload legal documents for comprehensive multi-point analysis, precedent discovery,
              and strategic risk assessment tailored for Indian Jurisdiction.
            </p>
          </div>

          <div className="mb-12">
            <div className="group border-gold-border hover:bg-gold-subtle relative flex cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed p-12 transition-all">
              <div className="pointer-events-none absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
              <div className="bg-gold-subtle border-gold-border mb-6 flex h-16 w-16 items-center justify-center rounded-full border">
                <span className="material-symbols-outlined text-3xl text-[#C9A84C]">
                  upload_file
                </span>
              </div>
              <h3 className="font-section-head text-on-surface mb-2">Drop your case files here</h3>
              <p className="text-meta-small text-text-muted mb-6">
                Supports PDF, DOCX, and Scanned Images (Up to 50MB per file)
              </p>
              <button className="hover:bg-gold-hover rounded-lg bg-[#C9A84C] px-8 py-2.5 font-bold text-[#0A0A0B] transition-colors">
                Select Documents
              </button>
            </div>
          </div>

          <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="bg-bg-secondary border-border-default flex flex-col gap-6 rounded-xl border p-6 md:col-span-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">gavel</span>
                  <h3 className="font-section-head text-on-surface">Identified Legal Issues</h3>
                </div>
                <span className="bg-gold-subtle rounded-full px-3 py-1 text-[10px] font-bold tracking-wider text-[#C9A84C] uppercase">
                  AI Powered
                </span>
              </div>
              <div className="space-y-4">
                <div className="bg-bg-tertiary border-border-default hover:border-gold-border rounded-lg border p-4 transition-all">
                  <div className="mb-2 flex items-start justify-between">
                    <h4 className="text-primary text-sm font-semibold">
                      Admissibility of Digital Evidence
                    </h4>
                    <div className="flex items-center gap-1">
                      <div className="bg-success h-1.5 w-1.5 rounded-full"></div>
                      <span className="text-success text-[10px] font-medium">HIGH CONFIDENCE</span>
                    </div>
                  </div>
                  <p className="text-body-ui text-text-secondary mb-4 leading-relaxed">
                    Challenge the WhatsApp transcripts based on Section 65B of the Indian Evidence
                    Act. Missing electronic certificate from the service provider.
                  </p>
                  <div className="flex gap-2">
                    <span className="bg-gold-subtle border-gold-border font-noto-serif rounded border px-2 py-1 text-[11px] text-[#C9A84C] italic">
                      Sec. 65B IEA
                    </span>
                    <span className="bg-gold-subtle border-gold-border font-noto-serif rounded border px-2 py-1 text-[11px] text-[#C9A84C] italic">
                      Arjun Panditrao v. Kailash
                    </span>
                  </div>
                </div>
                <div className="bg-bg-tertiary border-border-default hover:border-gold-border rounded-lg border p-4 transition-all">
                  <div className="mb-2 flex items-start justify-between">
                    <h4 className="text-primary text-sm font-semibold">
                      Statutory Limitation Period
                    </h4>
                    <div className="flex items-center gap-1">
                      <div className="bg-warning h-1.5 w-1.5 rounded-full"></div>
                      <span className="text-warning text-[10px] font-medium">
                        MEDIUM CONFIDENCE
                      </span>
                    </div>
                  </div>
                  <p className="text-body-ui text-text-secondary leading-relaxed">
                    The claim for damages was filed 38 months after the cause of action. Potential
                    bar under Article 113 of the Limitation Act, 1963.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-bg-secondary border-border-default rounded-xl border p-6">
              <h3 className="font-section-head text-on-surface mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">analytics</span>
                Case Stats
              </h3>
              <div className="space-y-6">
                <div>
                  <div className="mb-2 flex justify-between text-xs">
                    <span className="text-text-muted">Complexity Score</span>
                    <span className="text-primary font-bold">84/100</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#1A1A1D]">
                    <div className="bg-primary h-full w-[84%]"></div>
                  </div>
                </div>
                <div className="border-border-default border-t pt-6">
                  <div className="text-text-muted mb-4 text-[10px] font-bold tracking-widest uppercase">
                    Suggested Strategies
                  </div>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="bg-gold-subtle flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full">
                        <span className="material-symbols-outlined text-[12px] text-[#C9A84C]">
                          check
                        </span>
                      </div>
                      <span className="text-on-surface text-xs leading-tight">
                        File interim application for stay on proceedings
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="bg-gold-subtle flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full">
                        <span className="material-symbols-outlined text-[12px] text-[#C9A84C]">
                          check
                        </span>
                      </div>
                      <span className="text-on-surface text-xs leading-tight">
                        Request expert forensic analysis of digital devices
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="bg-gold-subtle flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full">
                        <span className="material-symbols-outlined text-[12px] text-[#C9A84C]">
                          check
                        </span>
                      </div>
                      <span className="text-on-surface text-xs leading-tight">
                        Prepare rejoinder for jurisdictional objections
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="font-section-head text-on-surface">Relevant Precedents (India)</h3>
              <button className="text-primary flex items-center gap-1 text-xs font-semibold hover:underline">
                View Search History{' '}
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="group border-border-default hover:border-gold-border relative overflow-hidden rounded-xl border bg-[#111113] transition-all">
                <div className="relative h-32 w-full overflow-hidden">
                  <img
                    alt="Law court"
                    className="h-full w-full object-cover opacity-30 grayscale transition-opacity group-hover:opacity-50"
                    data-alt="A grand, neoclassical courtroom interior in India, captured with a cinematic low-angle shot. The image shows polished dark wood paneling, rows of leather-bound law books, and an ornate judge's bench. Lighting is warm and atmospheric, with golden shafts of sunlight filtering through tall windows, highlighting the dust motes and creating a mood of solemn authority and legal prestige."
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBA1ryyFudyE_5pjyk0WEgQDs0FOfMkFpMe38jP9IInTu_-WslK8ggOO5uqpBSGmz5fe8RjnBPMDMr6KvIJEfqDZXphn0IruA--ZmuKn2MH_3bacigPRULTigrNFnktH3_7SAAKV1r3pLD69iLdTudqkxjLhcC6GILKC-YHQh5lS-tc-4FiVuQmnbeAJ6XLfCtEn_hmItWUu4DZylxYd7GdrrAlVxI38Q-nTCGjSqIIJHP1bKNzBgU8ZueWSB5o8KZNonEo5LHLsZg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111113] to-transparent"></div>
                  <div className="absolute bottom-3 left-4">
                    <span className="rounded bg-[#C9A84C] px-2 py-0.5 text-[10px] font-bold text-[#0A0A0B]">
                      SUPREME COURT
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="text-primary mb-2 text-sm font-semibold">
                    Anvar P.V. v. P.K. Basheer (2014)
                  </h4>
                  <p className="text-text-secondary mb-4 line-clamp-2 text-xs">
                    Landmark ruling clarifying the mandatory nature of Section 65B(4) certificates
                    for electronic evidence admissibility.
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="bg-gold-subtle border-gold-border flex items-center gap-1 rounded border px-2 py-1">
                      <span className="font-noto-serif text-xs font-semibold text-[#C9A84C] italic">
                        ✓ 92% Match
                      </span>
                    </div>
                    <span className="text-text-muted text-[10px]">Cited 4,200+ times</span>
                  </div>
                </div>
              </div>
              <div className="group border-border-default hover:border-gold-border relative overflow-hidden rounded-xl border bg-[#111113] transition-all">
                <div className="relative h-32 w-full overflow-hidden">
                  <img
                    alt="Scales of justice"
                    className="h-full w-full object-cover opacity-30 grayscale transition-opacity group-hover:opacity-50"
                    data-alt="Close-up of a bronze scale of justice resting on a vintage legal document. The setting is a dimly lit, professional office with a deep mahogany desk. The mood is serious and intellectual. Golden light glints off the metallic edges of the scales, contrasting with the deep dark shadows of the background. The aesthetic is modern-corporate but rooted in classical legal tradition."
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgYJ1i7SW7_Mrcg5LMxTqSOfm9dHzFIQ4xlP3v8WJxE6uOY8x189Ox3ydjYNdbEEPcFWg5WZBtQBxe9BftSvl1gGBQjWLgK8-NRzHMZCYQOyRQgc2G4fClE5J6jMhe6T6s0gL1MdJuPrV-XQVEDHfaLQO3L7W8mzBpHrMyQAc9EwB5OW-7cv2l29wdmLDIXJ4zYi65K9x9qn_m5DQL7RE1O6kD3a0pvu9qXPrfKNt03vdnIlTEF6k8bm66N0cNlc8-UC_7IoHqbJg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111113] to-transparent"></div>
                  <div className="absolute bottom-3 left-4">
                    <span className="text-tertiary-fixed rounded bg-[#1A2F59] px-2 py-0.5 text-[10px] font-bold">
                      DELHI HIGH COURT
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="text-primary mb-2 text-sm font-semibold">
                    M/s. Sterlite Technologies Ltd (2019)
                  </h4>
                  <p className="text-text-secondary mb-4 line-clamp-2 text-xs">
                    Interpreting contractual liability and digital signatures under the Information
                    Technology Act.
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="bg-gold-subtle border-gold-border flex items-center gap-1 rounded border px-2 py-1">
                      <span className="font-noto-serif text-xs font-semibold text-[#C9A84C] italic">
                        ✓ 74% Match
                      </span>
                    </div>
                    <span className="text-text-muted text-[10px]">Commercial Division</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <footer className="mt-auto w-full border-t border-[#1E1E21] py-12">
            <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
              <div>
                <div className="font-noto-serif mb-2 text-lg font-bold text-[#C9A84C]">LexAI</div>
                <p className="font-noto-serif text-xs tracking-widest text-gray-600 uppercase">
                  © 2024 LexAI Intelligence. Trusted by Advocates &amp; SME Founders.
                </p>
              </div>
              <div className="flex flex-wrap gap-6 md:justify-end">
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
        </div>
      </main>
    </>
  );
}
