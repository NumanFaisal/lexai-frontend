import Link from 'next/link';
export default function Page() {
  return (
    <>
      <aside className="font-noto-serif fixed top-0 left-0 z-50 flex h-screen w-[240px] flex-col gap-2 border-r border-[#1E1E21] bg-[#111113] p-4 tracking-tight antialiased shadow-none">
        <div className="mb-8 flex items-center gap-3 px-2">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-gradient-to-br from-[#C9A84C] to-[#A68A3B] font-serif text-xl font-bold text-[#0A0A0B]">
            L
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-2xl font-bold tracking-tighter text-[#C9A84C]">
              LexAI
            </span>
            <span className="text-[10px] tracking-widest text-gray-500 uppercase">
              Legal Intelligence
            </span>
          </div>
        </div>
        <button className="mb-6 flex w-full scale-95 items-center justify-center gap-2 rounded-lg bg-[#C9A84C] px-4 py-3 text-sm font-bold text-[#0A0A0B] transition-transform active:scale-90">
          <span className="material-symbols-outlined text-sm">add</span>
          New Research Session
        </button>
        <nav className="flex-1 space-y-1">
          <Link
            href="/student/chat"
            className="flex items-center gap-3 rounded-lg p-3 text-gray-500 transition-all duration-200 hover:bg-[#1A1A1D] hover:text-[#C9A84C]"
          >
            <span className="material-symbols-outlined">chat_bubble</span>
            <span className="text-sm">Legal Chat</span>
          </Link>
          <Link
            href="/student/vault"
            className="flex items-center gap-3 rounded-lg p-3 text-gray-500 transition-all duration-200 hover:bg-[#1A1A1D] hover:text-[#C9A84C]"
          >
            <span className="material-symbols-outlined">account_balance</span>
            <span className="text-sm">Research Vault</span>
          </Link>
          <Link
            href="/student/drafts"
            className="flex items-center gap-3 rounded-lg p-3 text-gray-500 transition-all duration-200 hover:bg-[#1A1A1D] hover:text-[#C9A84C]"
          >
            <span className="material-symbols-outlined">edit_document</span>
            <span className="text-sm">Contract Drafts</span>
          </Link>
          <Link
            href="/student/compliance"
            className="flex items-center gap-3 rounded-lg p-3 text-gray-500 transition-all duration-200 hover:bg-[#1A1A1D] hover:text-[#C9A84C]"
          >
            <span className="material-symbols-outlined">verified</span>
            <span className="text-sm">Compliance Hub</span>
          </Link>
          <Link
            href="/student/premium"
            className="relative flex items-center gap-3 rounded-lg bg-[#1A1A1D] p-3 font-semibold text-[#C9A84C] after:absolute after:right-0 after:h-4 after:w-1 after:rounded-full after:bg-[#C9A84C] after:content-['']"
          >
            <span className="material-symbols-outlined">workspace_premium</span>
            <span className="text-sm">Premium Access</span>
          </Link>
        </nav>
        <div className="mt-auto space-y-1 border-t border-[#1E1E21] pt-4">
          <a
            className="flex items-center gap-3 rounded-lg p-3 text-gray-500 transition-all duration-200 hover:bg-[#1A1A1D] hover:text-[#C9A84C]"
            href="#"
          >
            <span className="material-symbols-outlined">help</span>
            <span className="font-noto-serif text-sm">Knowledge Base</span>
          </a>
          <a
            className="flex items-center gap-3 rounded-lg p-3 text-gray-500 transition-all duration-200 hover:bg-[#1A1A1D] hover:text-[#C9A84C]"
            href="#"
          >
            <span className="material-symbols-outlined">settings</span>
            <span className="font-noto-serif text-sm">Settings</span>
          </a>
        </div>
      </aside>

      <header className="sticky top-0 z-40 ml-[240px] flex h-[52px] w-full max-w-[calc(100%-240px)] items-center justify-between border-b border-[#1E1E21] bg-[#0A0A0B]/80 px-6 shadow-sm backdrop-blur-md">
        <div className="flex items-center gap-4">
          <div className="relative">
            <span className="material-symbols-outlined absolute top-1/2 left-3 -translate-y-1/2 text-sm text-gray-500">
              search
            </span>
            <input
              className="w-64 rounded-full border-none bg-[#111113] py-1.5 pr-4 pl-9 text-sm text-white focus:ring-1 focus:ring-[#C9A84C44]"
              placeholder="Search case laws or statues..."
              type="text"
            />
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 rounded-full bg-[#1A1A1D] px-3 py-1 text-xs font-medium text-gray-400">
            <span className="h-2 w-2 rounded-full bg-green-500"></span>
            India (SC)
          </div>
          <div className="flex items-center gap-4 text-gray-400">
            <button className="transition-colors hover:text-white">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <button className="transition-colors hover:text-white">
              <span className="material-symbols-outlined">history</span>
            </button>
            <button className="transition-colors hover:text-white">
              <span className="material-symbols-outlined">account_circle</span>
            </button>
          </div>
          <button className="rounded-lg bg-[#C9A84C] px-4 py-1.5 text-xs font-bold text-[#0A0A0B] transition-colors hover:bg-[#E8C96A]">
            Upgrade to Pro
          </button>
        </div>
      </header>

      <main className="bg-bg-primary ml-[240px] min-h-screen p-12">
        <div className="mx-auto max-w-[1000px]">
          <section className="mb-12">
            <div className="mb-4 flex items-center gap-2">
              <span className="font-label-caps text-label-caps text-[#C9A84C] uppercase">
                Student Subscription
              </span>
              <div className="bg-border-default h-[1px] flex-1"></div>
            </div>
            <h1 className="font-hero-h1 text-hero-h1 text-text-primary mb-4 leading-tight">
              Elevate Your <span className="text-primary">Legal Mastery.</span>
            </h1>
            <p className="text-text-secondary font-body-chat max-w-2xl text-lg">
              Unlock professional-grade tools designed for the next generation of Indian jurists.
              Compare your current tier with LexAI Premium.
            </p>
          </section>

          <div className="mb-16 grid grid-cols-12 gap-6">
            <div className="bg-bg-secondary border-border-default relative col-span-12 flex flex-col overflow-hidden rounded-xl border p-8 lg:col-span-5">
              <div className="absolute top-0 right-0 p-4">
                <span className="text-text-secondary border-border-default rounded border bg-[#1A1A1D] px-2 py-1 text-[10px] tracking-widest uppercase">
                  Active Plan
                </span>
              </div>
              <h3 className="font-section-head text-section-head text-text-primary mb-2">
                Student Basic
              </h3>
              <div className="mb-6 flex items-baseline gap-1">
                <span className="text-3xl font-bold">₹0</span>
                <span className="text-text-disabled text-sm">/ month</span>
              </div>
              <ul className="flex-1 space-y-4">
                <li className="text-text-secondary flex items-start gap-3 text-sm">
                  <span className="material-symbols-outlined text-success text-sm">
                    check_circle
                  </span>
                  Standard Chat (100 msgs/day)
                </li>
                <li className="text-text-secondary flex items-start gap-3 text-sm">
                  <span className="material-symbols-outlined text-success text-sm">
                    check_circle
                  </span>
                  Basic Case Law Search
                </li>
                <li className="text-text-secondary flex items-start gap-3 text-sm">
                  <span className="material-symbols-outlined text-success text-sm">
                    check_circle
                  </span>
                  Limited Draft Exports (PDF only)
                </li>
                <li className="text-text-disabled flex items-start gap-3 text-sm">
                  <span className="material-symbols-outlined text-sm">block</span>
                  Moot Court AI Simulations
                </li>
                <li className="text-text-disabled flex items-start gap-3 text-sm">
                  <span className="material-symbols-outlined text-sm">block</span>
                  High-Fidelity Docx Export
                </li>
              </ul>
              <button className="border-border-default text-text-disabled mt-8 w-full cursor-not-allowed rounded-lg border py-3 text-sm font-semibold">
                Current Membership
              </button>
            </div>

            <div className="group relative col-span-12 flex flex-col rounded-xl border border-[#C9A84C]/30 bg-gradient-to-br from-[#1A1A1D] to-[#111113] p-8 lg:col-span-7">
              <div className="absolute inset-0 bg-[#C9A84C]/5 opacity-0 transition-opacity group-hover:opacity-100"></div>
              <div className="absolute top-0 right-0 p-4">
                <span className="rounded bg-[#C9A84C] px-3 py-1 text-[10px] font-bold tracking-widest text-[#0A0A0B] uppercase shadow-lg">
                  Recommended
                </span>
              </div>
              <div className="mb-2 flex items-start justify-between">
                <div>
                  <h3 className="font-section-head text-section-head text-primary mb-1">
                    Premium Scholar
                  </h3>
                  <p className="text-text-secondary text-xs">
                    For students aiming for Tier-1 internships.
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex items-baseline justify-end gap-1">
                    <span className="text-text-primary text-4xl font-bold">₹499</span>
                    <span className="text-text-secondary text-sm">/ month</span>
                  </div>
                  <span className="text-primary/70 text-[10px]">Billed annually (Save 20%)</span>
                </div>
              </div>
              <div className="mt-8 grid flex-1 grid-cols-2 gap-x-8 gap-y-4">
                <li className="text-text-primary flex list-none items-start gap-3 text-sm">
                  <span className="material-symbols-outlined text-primary text-sm">verified</span>
                  Unlimited AI Jurisprudence
                </li>
                <li className="text-text-primary flex list-none items-start gap-3 text-sm">
                  <span className="material-symbols-outlined text-primary text-sm">verified</span>
                  Priority Compute for Speed
                </li>
                <li className="text-text-primary flex list-none items-start gap-3 text-sm">
                  <span
                    className="material-symbols-outlined text-primary text-sm"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    gavel
                  </span>
                  Moot Court Simulator
                </li>
                <li className="text-text-primary flex list-none items-start gap-3 text-sm">
                  <span
                    className="material-symbols-outlined text-primary text-sm"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    description
                  </span>
                  Premium Docx Formatting
                </li>
                <li className="text-text-primary flex list-none items-start gap-3 text-sm">
                  <span className="material-symbols-outlined text-primary text-sm">verified</span>
                  AI Case Citation Checker
                </li>
                <li className="text-text-primary flex list-none items-start gap-3 text-sm">
                  <span className="material-symbols-outlined text-primary text-sm">verified</span>
                  Global Legal Access
                </li>
              </div>
              <button className="mt-8 w-full transform rounded-lg bg-[#C9A84C] py-4 text-base font-bold text-[#0A0A0B] shadow-xl transition-all hover:scale-[1.01] hover:bg-[#E8C96A] active:scale-95">
                Upgrade to Premium Now
              </button>
            </div>
          </div>

          <div className="mb-24 grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="bg-bg-secondary border-border-default group overflow-hidden rounded-xl border">
              <div className="relative h-48 overflow-hidden">
                <img
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  data-alt="A sophisticated digital rendering of a classic mahogany courtroom with a modern holographic overlay showing legal arguments and statutes. The lighting is dramatic and cinematic with soft blue highlights and golden glows, emphasizing a high-tech legal training environment suitable for a premium student moot court simulation."
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDh4M7fHbuGyCb2VV2aEObaxtdzjp9hHGjjRDm6ssNv2F-beQj5W2Qsf0WOEajOkeNA1dPun8HfpBgQ9XO75vd1onUnf7xAO9oQ7C_5Mp5VZh49Gns2Zv_4Fjkm6Qgz1-ur5k_ZORevUOSir6mFMmtZGTlopxqLo8chh1Ldnqya6mPiQ5n6hzkLBvdD7T37mBpLvnIJaPZgwnIrC33BVwV5PKyMTAx_IFqz21EuiLimmFQONNpT-7hRikkxGuuzxOuemAZQG6pGkSI"
                />
                <div className="from-bg-secondary absolute inset-0 bg-gradient-to-t to-transparent"></div>
                <div className="absolute bottom-4 left-6">
                  <span className="mb-2 inline-block rounded bg-[#2a3f69] px-2 py-0.5 text-[9px] font-bold tracking-tighter text-white uppercase">
                    Premium Exclusive
                  </span>
                  <h4 className="font-section-head text-white">Moot Court AI Simulator</h4>
                </div>
              </div>
              <div className="p-6">
                <p className="text-text-secondary font-body-chat mb-4 text-sm">
                  Practice your oral arguments against a generative AI judge. Receive instant
                  feedback on your posture, logic, and legal citations.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="border-border-default text-text-muted rounded border bg-[#1A1A1D] px-2 py-1 text-[10px]">
                    Real-time Feedback
                  </span>
                  <span className="border-border-default text-text-muted rounded border bg-[#1A1A1D] px-2 py-1 text-[10px]">
                    Voice Analysis
                  </span>
                  <span className="border-border-default text-text-muted rounded border bg-[#1A1A1D] px-2 py-1 text-[10px]">
                    Mock Bench
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-bg-secondary border-border-default group overflow-hidden rounded-xl border">
              <div className="relative h-48 overflow-hidden">
                <img
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  data-alt="Close-up of a high-end, minimalist white paper document being digitally printed with elegant golden typography and precise legal formatting. The background features a blurred corporate legal office with cool blue window light and warm indoor lamps, highlighting professional drafting quality and attention to detail."
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuADdJepM3xH44VtivTB8H02hXxy4mGC33YEbjc_a1ruNl26Y5ca7RkcnRx06gLqplTRc9qMHZYPfYmAPIDTGelpwCY9lNiXVw3cP-dWOc_-xwO6BBhzSPV-Tc_jNULL8O3wGkyK8rx401Su6EDEOFB7sx5KoPTQz4zOywjVPbHlA4NRn4aCgi3-IbXFbDGHhAlFzjLSawojBFgRCImVXNamO8czSeAbehiN1WJxA-mWNctSDyJPKDZ-kqfQqXj_cpROXPcY51YVRL0"
                />
                <div className="from-bg-secondary absolute inset-0 bg-gradient-to-t to-transparent"></div>
                <div className="absolute bottom-4 left-6">
                  <span className="mb-2 inline-block rounded bg-[#2a3f69] px-2 py-0.5 text-[9px] font-bold tracking-tighter text-white uppercase">
                    High Fidelity
                  </span>
                  <h4 className="font-section-head text-white">Professional Draft Exports</h4>
                </div>
              </div>
              <div className="p-6">
                <p className="text-text-secondary font-body-chat mb-4 text-sm">
                  Export your research and drafts into perfectly formatted .docx files ready for
                  court filing or senior counsel review.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="border-border-default text-text-muted rounded border bg-[#1A1A1D] px-2 py-1 text-[10px]">
                    SC Formatting
                  </span>
                  <span className="border-border-default text-text-muted rounded border bg-[#1A1A1D] px-2 py-1 text-[10px]">
                    Auto-Table of Cases
                  </span>
                  <span className="border-border-default text-text-muted rounded border bg-[#1A1A1D] px-2 py-1 text-[10px]">
                    Footnote Logic
                  </span>
                </div>
              </div>
            </div>
          </div>

          <section className="relative mb-24 overflow-hidden rounded-2xl border border-[#2a3f69]/40 bg-[#1A2333]/30 p-10">
            <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-[#2a3f69]/20 blur-[100px]"></div>
            <div className="relative z-10 flex flex-col items-center gap-10 md:flex-row">
              <div className="flex-1">
                <h2 className="font-page-title text-page-title text-text-primary mb-4 italic">
                  "The competitive edge I needed for my internship at the Supreme Court."
                </h2>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#C9A84C]/40 bg-[#C9A84C]/20">
                    <span
                      className="material-symbols-outlined text-sm text-[#C9A84C]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      person
                    </span>
                  </div>
                  <div>
                    <p className="text-text-primary text-sm font-bold">Ananya Sharma</p>
                    <p className="text-text-secondary text-xs">Final Year, NLSIU Bangalore</p>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-auto">
                <div className="bg-bg-primary/60 border-border-default rounded-xl border p-6 backdrop-blur-sm">
                  <div className="mb-4 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-green-500"></span>
                    <span className="text-[10px] font-bold tracking-widest text-[#C9A84C] uppercase">
                      Verified Placement
                    </span>
                  </div>
                  <p className="text-text-secondary mb-2 text-sm">
                    Users with Premium have a 64% higher chance of securing Tier-1 clerkships.
                  </p>
                  <a
                    className="text-primary flex items-center gap-1 text-xs font-bold hover:underline"
                    href="#"
                  >
                    Read the 2023 Student Report{' '}
                    <span className="material-symbols-outlined text-xs">arrow_forward</span>
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer className="mt-auto ml-[240px] w-full border-t border-[#1E1E21] bg-[#0A0A0B] py-12">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center px-8 md:grid-cols-2">
          <div className="space-y-4">
            <div className="font-serif text-lg font-bold tracking-tighter text-[#C9A84C] uppercase">
              LexAI
            </div>
            <p className="font-noto-serif max-w-sm text-xs leading-loose tracking-widest text-gray-600 uppercase">
              © 2024 LexAI Intelligence. Trusted by Advocates &amp; SME Founders.
            </p>
          </div>
          <div className="flex flex-wrap justify-start gap-x-8 gap-y-4 md:justify-end">
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
