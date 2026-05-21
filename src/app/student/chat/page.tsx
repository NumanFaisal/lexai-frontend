import Link from 'next/link';
export default function Page() {
  return (
    <>
      <aside className="font-noto-serif fixed top-0 left-0 flex h-screen w-[240px] flex-col gap-2 border-r border-[#1E1E21] bg-[#111113] p-4 tracking-tight antialiased">
        <div className="mb-4 flex items-center gap-3 px-2 py-4">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-gradient-to-br from-[#C9A84C] to-[#503d00]">
            <span
              className="material-symbols-outlined text-xl text-[#0A0A0B]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              account_balance
            </span>
          </div>
          <div>
            <h1 className="font-serif text-2xl font-bold tracking-tighter text-[#C9A84C]">LexAI</h1>
            <p className="text-text-secondary text-[10px] tracking-[2px] uppercase">
              Legal Intelligence
            </p>
          </div>
        </div>
        <button className="mb-6 flex w-full scale-95 items-center justify-center gap-2 rounded-lg bg-[#C9A84C] py-3 font-bold text-[#0A0A0B] transition-transform active:scale-90">
          <span className="material-symbols-outlined text-sm">add</span>
          <span>New Research Session</span>
        </button>
        <nav className="flex-1 space-y-1">
          <Link
            href="/student/chat"
            className="relative flex items-center gap-3 rounded-lg px-3 py-2.5 font-semibold text-[#C9A84C] after:absolute after:right-0 after:h-4 after:w-1 after:rounded-full after:bg-[#C9A84C] after:content-[''] hover:bg-[#1A1A1D]"
          >
            <span className="material-symbols-outlined" data-icon="chat_bubble">
              chat_bubble
            </span>
            <span className="text-sm">Legal Chat</span>
          </Link>
          <Link
            href="/student/vault"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-gray-500 transition-all duration-200 hover:bg-[#1A1A1D] hover:text-[#C9A84C]"
          >
            <span className="material-symbols-outlined" data-icon="account_balance">
              account_balance
            </span>
            <span className="text-sm">Research Vault</span>
          </Link>
          <Link
            href="/student/drafts"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-gray-500 transition-all duration-200 hover:bg-[#1A1A1D] hover:text-[#C9A84C]"
          >
            <span className="material-symbols-outlined" data-icon="edit_document">
              edit_document
            </span>
            <span className="text-sm">Contract Drafts</span>
          </Link>
          <Link
            href="/student/compliance"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-gray-500 transition-all duration-200 hover:bg-[#1A1A1D] hover:text-[#C9A84C]"
          >
            <span className="material-symbols-outlined" data-icon="verified">
              verified
            </span>
            <span className="text-sm">Compliance Hub</span>
          </Link>
          <Link
            href="/student/premium"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-gray-500 transition-all duration-200 hover:bg-[#1A1A1D] hover:text-[#C9A84C]"
          >
            <span className="material-symbols-outlined" data-icon="workspace_premium">
              workspace_premium
            </span>
            <span className="text-sm">Premium Access</span>
          </Link>
        </nav>
        <div className="space-y-1 border-t border-[#1E1E21] pt-4">
          <a
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all duration-200 hover:bg-[#1A1A1D] hover:text-[#C9A84C]"
            href="#"
          >
            <span className="material-symbols-outlined" data-icon="help">
              help
            </span>
            <span className="text-sm">Knowledge Base</span>
          </a>
          <a
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all duration-200 hover:bg-[#1A1A1D] hover:text-[#C9A84C]"
            href="#"
          >
            <span className="material-symbols-outlined" data-icon="settings">
              settings
            </span>
            <span className="text-sm">Settings</span>
          </a>
        </div>
      </aside>

      <header className="font-noto-serif sticky top-0 z-40 ml-[240px] flex h-[52px] w-full max-w-[calc(100%-240px)] items-center justify-between border-b border-[#1E1E21] bg-[#0A0A0B]/80 px-6 text-sm font-medium backdrop-blur-md">
        <div className="flex flex-1 items-center gap-4">
          <div className="relative w-full max-w-md">
            <span className="material-symbols-outlined text-text-disabled absolute top-1/2 left-3 -translate-y-1/2 text-lg">
              search
            </span>
            <input
              className="placeholder-text-disabled w-full rounded-full border-none bg-[#111113] py-1.5 pr-4 pl-10 text-xs focus:ring-1 focus:ring-[#C9A84C44]"
              placeholder="Search precedents, statutes, or history..."
              type="text"
            />
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="bg-tertiary-container/10 border-tertiary-container/20 flex items-center gap-2 rounded-full border px-3 py-1">
            <span className="bg-tertiary h-2 w-2 rounded-full shadow-[0_0_8px_rgba(178,198,248,0.5)]"></span>
            <span className="text-tertiary text-[11px] font-semibold tracking-wide">
              India (SC)
            </span>
          </div>
          <div className="flex items-center gap-4 text-gray-400">
            <button className="relative transition-colors hover:text-white">
              <span className="material-symbols-outlined" data-icon="notifications">
                notifications
              </span>
              <span className="bg-error absolute top-0 right-0 h-1.5 w-1.5 rounded-full"></span>
            </button>
            <button className="transition-colors hover:text-white">
              <span className="material-symbols-outlined" data-icon="history">
                history
              </span>
            </button>
            <div className="border-gold-border h-8 w-8 overflow-hidden rounded-full border">
              <img
                alt="Profile"
                className="h-full w-full object-cover"
                data-alt="A professional headshot avatar of a young Indian law student with glasses, smiling confidently against a minimalist dark studio background. The lighting is soft and cinematic, emphasizing a professional yet academic aesthetic consistent with a high-end educational platform."
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDC2g73CBwezCA7y_B2M8VNHYVCw9sGZZ9HzDbP1hAJBj76QVleRFOUQ2z7uL2AKH5SDLwXYiQgPg8T4IB57JJXk8QQnLQPwo4LwhRyrm1WMNfGtRvMKnBDs3ynmL7MJaSrAzVv0z9lqDEPkggAj0dBLNSuUc7y-ut8ic66O5-HnLGl_0bJJ3v4jfGymtM7nLzWDmTNQpkBPeUK_xE5r0PPINBXPG2BqVCDVVJLzyrAYhbAwjFYVFvmO7bY87GGFxhcACjiLLUu6VU"
              />
            </div>
          </div>
          <button className="hover:bg-gold-hover rounded-full bg-[#C9A84C] px-4 py-1.5 text-xs font-bold text-[#0A0A0B] transition-colors">
            Upgrade to Pro
          </button>
        </div>
      </header>

      <main className="ml-[240px] flex min-h-[calc(100vh-52px)] max-w-[calc(100%-240px)] flex-col items-center p-8">
        <div className="flex w-full max-w-[720px] flex-1 flex-col">
          <div className="mb-8 text-center">
            <span className="font-label-caps text-label-caps mb-2 block text-[#C9A84C] uppercase">
              Academic Assistant
            </span>
            <h2 className="font-page-title text-page-title text-text-primary mb-3">
              Master the Moot
            </h2>
            <p className="text-text-secondary font-body-chat mx-auto max-w-lg">
              Analyze complex case law, dissect judicial reasoning, and prepare iron-clad arguments
              with AI-powered legal intelligence.
            </p>
          </div>

          <div className="custom-scrollbar mb-8 flex-1 space-y-6 overflow-y-auto pr-2">
            <div className="flex flex-col items-start gap-2">
              <div className="ml-4 flex items-center gap-2">
                <span
                  className="material-symbols-outlined text-tertiary text-sm"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  auto_awesome
                </span>
                <span className="text-tertiary text-[10px] font-bold tracking-wider uppercase">
                  AI TUTOR MODE
                </span>
              </div>
              <div className="max-w-[85%] rounded-2xl rounded-tl-none border border-[#1E1E21] bg-[#141416] p-5">
                <p className="font-body-chat text-text-primary mb-4 leading-relaxed">
                  Welcome back, Counsel. I've analyzed the recent developments in the{' '}
                  <span className="text-tertiary border-tertiary/30 border-b">
                    Right to Privacy
                  </span>{' '}
                  framework. Would you like to review how the *Justice K.S. Puttaswamy* judgment
                  affects digital surveillance laws for your upcoming moot competition?
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="font-citation text-text-secondary flex items-center gap-1 rounded border border-[#1E1E21] bg-[#1A1A1D] px-2 py-1 text-[10px]">
                    <span className="material-symbols-outlined text-success text-[12px]">
                      check_circle
                    </span>{' '}
                    Verified Source: Supreme Court of India
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end gap-2">
              <div className="user-bubble-gradient max-w-[85%] rounded-2xl rounded-br-none p-5 shadow-lg">
                <p className="font-body-chat font-medium text-[#0A0A0B]">
                  Yes, specifically focus on the 'Proportionality Test' mentioned in the judgment.
                  How can I apply it to a hypothetical scenario involving facial recognition
                  technology?
                </p>
              </div>
              <span className="text-text-disabled mr-4 text-[10px] uppercase">Read 11:24 AM</span>
            </div>

            <div className="flex flex-col items-start gap-2">
              <div className="ml-4 flex items-center gap-2">
                <span
                  className="material-symbols-outlined text-tertiary text-sm"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  school
                </span>
                <span className="text-tertiary text-[10px] font-bold tracking-wider uppercase">
                  CONCEPT BREAKDOWN
                </span>
              </div>
              <div className="max-w-[90%] rounded-2xl rounded-tl-none border border-[#1E1E21] bg-[#141416] p-5">
                <p className="font-body-chat text-text-primary mb-4 leading-relaxed">
                  The Proportionality Test in *Puttaswamy* involves a four-fold requirement:
                </p>
                <ol className="font-body-chat text-text-secondary mb-4 list-decimal space-y-3 pl-5">
                  <li>
                    <strong className="text-text-primary">Legality:</strong> The action must be
                    sanctioned by law.
                  </li>
                  <li>
                    <strong className="text-text-primary">Need:</strong> There must be a legitimate
                    state aim.
                  </li>
                  <li>
                    <strong className="text-text-primary">Proportionality:</strong> A rational nexus
                    between objects and means.
                  </li>
                  <li>
                    <strong className="text-text-primary">Procedural Safeguards:</strong> Protection
                    against abuse.
                  </li>
                </ol>
                <div className="bg-gold-subtle border-gold-border mb-4 rounded-lg border p-3">
                  <p className="font-citation text-[11px] text-[#C9A84C] italic">
                    "The state must demonstrate that the measure adopted is the least restrictive
                    way to achieve its goal." — Para 325, Puttaswamy (2017).
                  </p>
                </div>
                <div className="flex gap-2">
                  <button className="bg-surface-container-high text-text-secondary flex items-center gap-1 rounded px-3 py-1 text-[11px] font-medium transition-colors hover:text-white">
                    <span className="material-symbols-outlined text-sm">content_copy</span> Copy
                  </button>
                  <button className="bg-surface-container-high text-text-secondary flex items-center gap-1 rounded px-3 py-1 text-[11px] font-medium transition-colors hover:text-white">
                    <span className="material-symbols-outlined text-sm">bookmark</span> Save to
                    Vault
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-3">
            <button className="hover:border-tertiary/50 group rounded-xl border border-[#1E1E21] bg-[#111113] p-4 text-left transition-all">
              <span className="material-symbols-outlined text-tertiary mb-2 transition-transform group-hover:scale-110">
                gavel
              </span>
              <p className="text-text-primary mb-1 text-[12px] font-bold">Moot Prep</p>
              <p className="text-text-secondary text-[10px]">
                Draft an opening statement for the Appellant.
              </p>
            </button>
            <button className="hover:border-tertiary/50 group rounded-xl border border-[#1E1E21] bg-[#111113] p-4 text-left transition-all">
              <span className="material-symbols-outlined text-secondary mb-2 transition-transform group-hover:scale-110">
                balance
              </span>
              <p className="text-text-primary mb-1 text-[12px] font-bold">Compare Precedents</p>
              <p className="text-text-secondary text-[10px]">
                ADM Jabalpur vs. Puttaswamy comparison.
              </p>
            </button>
            <button className="hover:border-tertiary/50 group rounded-xl border border-[#1E1E21] bg-[#111113] p-4 text-left transition-all">
              <span className="material-symbols-outlined mb-2 text-[#C9A84C] transition-transform group-hover:scale-110">
                menu_book
              </span>
              <p className="text-text-primary mb-1 text-[12px] font-bold">Statute Quiz</p>
              <p className="text-text-secondary text-[10px]">
                Test my knowledge on Article 21 exceptions.
              </p>
            </button>
          </div>

          <div className="sticky bottom-8 flex items-center gap-3 rounded-[14px] border border-[#1E1E21] bg-[#16130d] p-1.5 shadow-2xl transition-all focus-within:border-[#C9A84C44]">
            <button className="text-text-disabled flex h-10 w-10 items-center justify-center transition-colors hover:text-[#C9A84C]">
              <span className="material-symbols-outlined">mic</span>
            </button>
            <input
              className="text-text-primary placeholder-text-disabled flex-1 border-none bg-transparent py-3 text-sm focus:ring-0"
              placeholder="Ask about Section 377, the Basic Structure Doctrine, or your moot case..."
              type="text"
            />
            <button className="hover:bg-gold-hover flex h-10 w-10 items-center justify-center rounded-[10px] bg-[#C9A84C] text-[#0A0A0B] transition-colors">
              <span
                className="material-symbols-outlined"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                send
              </span>
            </button>
          </div>
        </div>

        <footer className="mt-block font-noto-serif mx-auto grid w-full max-w-7xl grid-cols-1 items-center border-t border-[#1E1E21] px-8 py-12 text-xs tracking-widest uppercase md:grid-cols-2">
          <div className="flex flex-col gap-4">
            <div className="font-serif text-lg font-bold text-[#C9A84C]">LexAI</div>
            <p className="tracking-normal text-gray-600 normal-case">
              © 2024 LexAI Intelligence. Trusted by Advocates &amp; SME Founders.
            </p>
          </div>
          <div className="flex gap-6 md:justify-end">
            <a
              className="text-gray-600 opacity-80 transition-opacity hover:text-[#C9A84C] hover:opacity-100"
              href="#"
            >
              Privacy Policy
            </a>
            <a
              className="text-gray-600 opacity-80 transition-opacity hover:text-[#C9A84C] hover:opacity-100"
              href="#"
            >
              Terms of Service
            </a>
            <a
              className="text-gray-600 opacity-80 transition-opacity hover:text-[#C9A84C] hover:opacity-100"
              href="#"
            >
              AI Disclosure
            </a>
            <a
              className="text-gray-600 opacity-80 transition-opacity hover:text-[#C9A84C] hover:opacity-100"
              href="#"
            >
              Contact Support
            </a>
          </div>
        </footer>
      </main>
    </>
  );
}
