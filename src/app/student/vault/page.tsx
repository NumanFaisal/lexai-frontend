import Link from 'next/link';
export default function Page() {
  return (
    <>
      <aside className="fixed top-0 left-0 z-50 flex h-screen w-[240px] flex-col gap-2 border-r border-[#1E1E21] bg-[#111113] p-4 shadow-none">
        <div className="mb-8 flex items-center gap-3 px-2">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-gradient-to-br from-[#C9A84C] to-[#E8C96A] text-[#111113]">
            <span
              className="material-symbols-outlined text-lg"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              account_balance
            </span>
          </div>
          <div>
            <h1 className="font-serif text-2xl leading-none font-bold tracking-tighter text-[#C9A84C]">
              LexAI
            </h1>
            <p className="text-text-secondary text-[10px] tracking-widest uppercase">
              Legal Intelligence
            </p>
          </div>
        </div>
        <nav className="flex flex-1 flex-col gap-1">
          <Link
            href="/student/chat"
            className="flex items-center gap-3 rounded-lg p-3 text-gray-500 transition-all duration-200 hover:bg-[#1A1A1D] hover:text-[#C9A84C]"
          >
            <span className="material-symbols-outlined">chat_bubble</span>
            <span className="font-sub-heading text-sub-heading">Legal Chat</span>
          </Link>
          <Link
            href="/student/vault"
            className="relative flex items-center gap-3 rounded-lg bg-[#1A1A1D] p-3 font-semibold text-[#C9A84C] after:absolute after:right-0 after:h-4 after:w-1 after:rounded-full after:bg-[#C9A84C] after:content-['']"
          >
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              account_balance
            </span>
            <span className="font-sub-heading text-sub-heading">Research Vault</span>
          </Link>
          <Link
            href="/student/drafts"
            className="flex items-center gap-3 rounded-lg p-3 text-gray-500 transition-all duration-200 hover:bg-[#1A1A1D] hover:text-[#C9A84C]"
          >
            <span className="material-symbols-outlined">edit_document</span>
            <span className="font-sub-heading text-sub-heading">Contract Drafts</span>
          </Link>
          <Link
            href="/student/compliance"
            className="flex items-center gap-3 rounded-lg p-3 text-gray-500 transition-all duration-200 hover:bg-[#1A1A1D] hover:text-[#C9A84C]"
          >
            <span className="material-symbols-outlined">verified</span>
            <span className="font-sub-heading text-sub-heading">Compliance Hub</span>
          </Link>
          <Link
            href="/student/premium"
            className="flex items-center gap-3 rounded-lg p-3 text-gray-500 transition-all duration-200 hover:bg-[#1A1A1D] hover:text-[#C9A84C]"
          >
            <span className="material-symbols-outlined">workspace_premium</span>
            <span className="font-sub-heading text-sub-heading">Premium Access</span>
          </Link>
        </nav>
        <button className="mb-6 flex scale-95 items-center justify-center gap-2 rounded-xl bg-[#C9A84C] px-4 py-3 font-bold text-[#0A0A0B] transition-transform active:scale-90">
          <span className="material-symbols-outlined text-sm">add</span>
          <span className="text-xs tracking-tight uppercase">New Research Session</span>
        </button>
        <div className="flex flex-col gap-1 border-t border-[#1E1E21] pt-4">
          <a
            className="flex items-center gap-3 rounded-lg p-2 px-3 text-gray-500 transition-all duration-200 hover:bg-[#1A1A1D] hover:text-[#C9A84C]"
            href="#"
          >
            <span className="material-symbols-outlined text-xl">help</span>
            <span className="text-sm">Knowledge Base</span>
          </a>
          <a
            className="flex items-center gap-3 rounded-lg p-2 px-3 text-gray-500 transition-all duration-200 hover:bg-[#1A1A1D] hover:text-[#C9A84C]"
            href="#"
          >
            <span className="material-symbols-outlined text-xl">settings</span>
            <span className="text-sm">Settings</span>
          </a>
        </div>
      </aside>

      <header className="sticky top-0 z-40 ml-[240px] flex h-[52px] w-full max-w-[calc(100%-240px)] items-center justify-between border-b border-[#1E1E21] bg-[#0A0A0B]/80 px-6 shadow-sm backdrop-blur-md">
        <div className="flex flex-1 items-center gap-4">
          <div className="relative w-full max-w-md">
            <span className="material-symbols-outlined text-text-disabled absolute top-1/2 left-3 -translate-y-1/2 text-lg">
              search
            </span>
            <input
              className="text-text-primary w-full rounded-lg border-none bg-[#111113] py-1.5 pr-4 pl-10 text-sm focus:ring-1 focus:ring-[#C9A84C44]"
              placeholder="Search research vault..."
              type="text"
            />
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span
              className="material-symbols-outlined text-sm text-[#C9A84C]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              location_on
            </span>
            <span className="font-noto-serif text-text-primary text-sm font-medium">
              India (SC)
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative text-gray-400 transition-colors hover:text-white">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full border border-[#0A0A0B] bg-[#C9A84C]"></span>
            </button>
            <button className="text-gray-400 transition-colors hover:text-white">
              <span className="material-symbols-outlined">history</span>
            </button>
            <button className="flex items-center gap-2 rounded-full border border-[#1E1E21] bg-[#111113] p-1 pl-3 transition-colors hover:bg-[#1A1A1D]">
              <span className="text-xs font-semibold text-[#C9A84C]">PRO</span>
              <span className="material-symbols-outlined text-text-secondary">account_circle</span>
            </button>
          </div>
        </div>
      </header>

      <main className="ml-[240px] min-h-screen p-10">
        <div className="mx-auto max-w-[720px]">
          <div className="mb-major">
            <div className="mb-small flex items-center gap-2">
              <span className="bg-tertiary h-2 w-2 rounded-full"></span>
              <span className="font-meta-small text-meta-small text-tertiary tracking-widest uppercase">
                Active Archives
              </span>
            </div>
            <h2 className="font-page-title text-page-title text-text-primary mb-small">
              Research Vault
            </h2>
            <p className="text-text-secondary font-body-ui text-base leading-relaxed">
              Your central repository for analyzed case summaries, specific legal statutes, and
              synthesized research notes across current academic semesters.
            </p>
          </div>

          <div className="gap-standard mb-block grid grid-cols-12">
            <div className="p-standard group relative col-span-8 flex flex-col justify-between overflow-hidden rounded-xl border border-[#1E1E21] bg-[#111113]">
              <div className="relative z-10">
                <span className="text-text-secondary font-label-caps text-xs tracking-widest uppercase">
                  Deep Search Efficiency
                </span>
                <div className="font-page-title mt-2 text-4xl text-[#C9A84C]">84%</div>
                <p className="text-text-disabled mt-1 text-xs">
                  Faster discovery across 42 saved summaries
                </p>
              </div>
              <div className="absolute top-0 right-0 bottom-0 w-32 opacity-20 transition-opacity group-hover:opacity-40">
                <img
                  className="h-full w-full object-cover"
                  data-alt="A highly detailed abstract digital visualization of interconnected data nodes and neural networks rendered in deep navy blue and shimmering gold. The style is clean and modern with a distinct technological edge, utilizing thin glowing lines to suggest complex information architecture. Soft blue accents bleed into a dark charcoal background to create a professional and authoritative atmosphere for a legal research tool. The mood is sophisticated and precise, emphasizing high-end data processing."
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDs_1MYU3yjzgON7kOnUaC9TI5Odxh4xnp3AHx6_Yo0rG4SNnG1G37U42lj_vTlqC_pQzQAGH5c545l9h9wmg3K_wdllufYgFAJdH-RNgZgLqmZctHoQfTnqlt9LLsDughtrn1PMbu6BOKUuoWktGgjzxJwVwPq12mu8sr6eA3Oh1hLWO1qfCeGls7yJ_wxPgeB0Hvk3wFGdHkUyMA_Oi4ZaxiLe_UsSY-27wG5OVTYKq9EXxrYTBM6AYwwPEUpb0p2Tdj1XO-1apI"
                />
              </div>
            </div>
            <div className="p-standard col-span-4 flex flex-col items-center justify-center rounded-xl border border-[#1E1E21] bg-[#111113] text-center">
              <span className="material-symbols-outlined text-tertiary mb-2 text-3xl">
                auto_awesome
              </span>
              <span className="text-text-primary text-xl font-bold">12</span>
              <span className="text-text-secondary text-[10px] uppercase">AI Citations</span>
            </div>
          </div>

          <div className="gap-component mb-section flex items-center overflow-x-auto pb-2">
            <button className="px-large py-small rounded-full bg-[#C9A84C] text-xs font-bold whitespace-nowrap text-[#0A0A0B]">
              All Files
            </button>
            <button className="px-large py-small text-text-secondary rounded-full border border-[#1E1E21] bg-[#111113] text-xs font-semibold whitespace-nowrap transition-all hover:border-[#C9A84C44]">
              Case Summaries
            </button>
            <button className="px-large py-small text-text-secondary rounded-full border border-[#1E1E21] bg-[#111113] text-xs font-semibold whitespace-nowrap transition-all hover:border-[#C9A84C44]">
              Statutes &amp; Codes
            </button>
            <button className="px-large py-small text-text-secondary rounded-full border border-[#1E1E21] bg-[#111113] text-xs font-semibold whitespace-nowrap transition-all hover:border-[#C9A84C44]">
              Personal Drafts
            </button>
          </div>

          <div className="space-y-standard">
            <div className="p-standard group cursor-pointer rounded-xl border border-[#1E1E21] bg-[#111113] transition-all hover:border-[#C9A84C44]">
              <div className="mb-small flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-tertiary flex h-10 w-10 items-center justify-center rounded-lg bg-[#1A1A1D]">
                    <span className="material-symbols-outlined">description</span>
                  </div>
                  <div>
                    <h4 className="font-sub-heading text-sub-heading text-text-primary">
                      Kesavananda Bharati v. State of Kerala
                    </h4>
                    <p className="text-meta-small text-text-disabled flex items-center gap-2">
                      <span className="font-citation">Constitutional Law</span>
                      <span>•</span>
                      <span>Added 2 days ago</span>
                    </p>
                  </div>
                </div>
                <div className="bg-gold-subtle rounded border border-[#C9A84C44] px-2 py-0.5 text-[10px] font-bold text-[#C9A84C] uppercase">
                  Supreme Court
                </div>
              </div>
              <p className="text-body-chat text-text-secondary mb-standard line-clamp-2">
                Summary of the 'Basic Structure Doctrine' and its implications on Article 368.
                Includes cross-references to the 24th and 25th Amendments...
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1 text-[11px] text-[#7B9E87]">
                    <span className="material-symbols-outlined text-xs">verified</span> Verified
                    Citation
                  </span>
                  <span className="text-text-disabled flex items-center gap-1 text-[11px]">
                    <span className="material-symbols-outlined text-xs">notes</span> 4 Notes
                  </span>
                </div>
                <div className="flex items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                  <button className="p-1 transition-colors hover:text-[#C9A84C]">
                    <span className="material-symbols-outlined text-lg">share</span>
                  </button>
                  <button className="p-1 transition-colors hover:text-[#C9A84C]">
                    <span className="material-symbols-outlined text-lg">bookmark</span>
                  </button>
                  <button className="hover:text-error p-1 transition-colors">
                    <span className="material-symbols-outlined text-lg">delete</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="p-standard group cursor-pointer rounded-xl border border-[#1E1E21] bg-[#111113] transition-all hover:border-[#C9A84C44]">
              <div className="mb-small flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-tertiary flex h-10 w-10 items-center justify-center rounded-lg bg-[#1A1A1D]">
                    <span className="material-symbols-outlined">gavel</span>
                  </div>
                  <div>
                    <h4 className="font-sub-heading text-sub-heading text-text-primary">
                      Section 138 - Negotiable Instruments Act
                    </h4>
                    <p className="text-meta-small text-text-disabled flex items-center gap-2">
                      <span className="font-citation">Commercial Law</span>
                      <span>•</span>
                      <span>Added 1 week ago</span>
                    </p>
                  </div>
                </div>
                <div className="text-text-secondary rounded border border-[#1E1E21] bg-[#1A1A1D] px-2 py-0.5 text-[10px] font-bold uppercase">
                  Statute
                </div>
              </div>
              <p className="text-body-chat text-text-secondary mb-standard line-clamp-2">
                Detailed breakdown of dishonor of cheque for insufficiency of funds. Includes
                mandatory notice period requirements and jurisdiction rules...
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1 text-[11px] text-[#7B9E87]">
                    <span className="material-symbols-outlined text-xs">verified</span> Verified
                    Citation
                  </span>
                  <span className="text-text-disabled flex items-center gap-1 text-[11px]">
                    <span className="material-symbols-outlined text-xs">link</span> 2 References
                  </span>
                </div>
                <div className="flex items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                  <button className="p-1 transition-colors hover:text-[#C9A84C]">
                    <span className="material-symbols-outlined text-lg">share</span>
                  </button>
                  <button className="p-1 transition-colors hover:text-[#C9A84C]">
                    <span className="material-symbols-outlined text-lg">bookmark</span>
                  </button>
                  <button className="hover:text-error p-1 transition-colors">
                    <span className="material-symbols-outlined text-lg">delete</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="p-major flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#1E1E21] text-center">
              <div className="bg-gold-subtle mb-standard flex h-12 w-12 items-center justify-center rounded-full">
                <span className="material-symbols-outlined text-[#C9A84C]">add_notes</span>
              </div>
              <h5 className="font-sub-heading text-text-primary mb-micro">Expand your Vault</h5>
              <p className="text-text-secondary mb-standard max-w-xs text-xs">
                Use the Legal Chat to analyze new cases and save them directly here for your exam
                preparations.
              </p>
              <button className="flex items-center gap-1 text-xs font-bold text-[#C9A84C] hover:underline">
                Start New Session{' '}
                <span className="material-symbols-outlined text-xs">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-auto ml-[240px] w-[calc(100%-240px)] border-t border-[#1E1E21] bg-[#0A0A0B] py-12">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-8 md:grid-cols-2">
          <div>
            <div className="mb-2 font-serif text-lg font-bold text-[#C9A84C]">LexAI</div>
            <p className="font-noto-serif text-xs tracking-widest text-gray-600 uppercase">
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
