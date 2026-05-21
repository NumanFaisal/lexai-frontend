import Link from 'next/link';
export default function Page() {
  return (
    <>
      <nav
        className="border-border-default fixed top-0 left-0 z-50 flex h-screen w-[240px] -translate-x-full flex-col gap-2 border-r bg-[#0D0D0F] p-4 shadow-none transition-transform duration-300 md:translate-x-0"
        id="mobile-sidebar"
      >
        <div className="mb-2 flex items-center gap-3 px-2 py-4">
          <div className="from-primary to-inverse-primary flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br">
            <span className="material-symbols-outlined text-bg-primary text-[20px]">balance</span>
          </div>
          <div>
            <h1 className="font-logo text-logo text-primary tracking-tighter">LexAI</h1>
            <p className="font-meta-small text-meta-small text-text-secondary">
              Legal Intelligence
            </p>
          </div>
        </div>
        <div className="gap-major flex flex-1 flex-col overflow-y-auto pr-1">
          <div className="gap-component flex flex-col">
            <span className="font-label-caps text-label-caps text-text-muted px-2 uppercase">
              SELECT MODE
            </span>
            <ul className="gap-micro flex flex-col">
              <li>
                <Link
                  href="/advocate/research"
                  className="font-body-ui text-body-ui text-primary bg-gold-subtle border-gold-border group relative flex w-full items-center justify-between rounded-lg border px-3 py-2.5 text-left font-semibold transition-all"
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[18px]">balance</span>
                    Legal Research
                  </div>
                  <span className="bg-primary h-1 w-1 rounded-full shadow-[0_0_8px_rgba(201,168,76,0.8)]"></span>
                </Link>
              </li>
              <li>
                <Link
                  href="/advocate/drafts"
                  className="font-body-ui text-body-ui text-text-secondary hover:text-primary hover:bg-bg-tertiary group flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left transition-all duration-200"
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-text-muted group-hover:text-primary text-[18px] transition-colors">
                      history_edu
                    </span>
                    Draft Contract
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  href="/advocate/compliance"
                  className="font-body-ui text-body-ui text-text-secondary hover:text-primary hover:bg-bg-tertiary group flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left transition-all duration-200"
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-text-muted group-hover:text-primary text-[18px] transition-colors">
                      fact_check
                    </span>
                    Compliance Check
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  href="/advocate/case"
                  className="font-body-ui text-body-ui text-text-secondary hover:text-primary hover:bg-bg-tertiary group flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left transition-all duration-200"
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-text-muted group-hover:text-primary text-[18px] transition-colors">
                      search_insights
                    </span>
                    Case Analysis
                  </div>
                </Link>
              </li>
            </ul>
          </div>
          <div className="bg-border-default h-px w-full"></div>

          <div className="gap-component flex flex-col">
            <span className="font-label-caps text-label-caps text-text-muted px-2 uppercase">
              QUICK QUERIES
            </span>
            <div className="gap-small flex flex-col">
              <button className="font-meta-small text-meta-small text-text-secondary bg-surface-container-low hover:border-gold-border hover:text-text-primary truncate rounded-md border border-transparent px-3 py-2 text-left transition-all duration-200">
                Section 138 NI Act — cheque bounce
              </button>
              <button className="font-meta-small text-meta-small text-text-secondary bg-surface-container-low hover:border-gold-border hover:text-text-primary truncate rounded-md border border-transparent px-3 py-2 text-left transition-all duration-200">
                Bail application grounds
              </button>
              <button className="font-meta-small text-meta-small text-text-secondary bg-surface-container-low hover:border-gold-border hover:text-text-primary truncate rounded-md border border-transparent px-3 py-2 text-left transition-all duration-200">
                Landlord eviction rights Delhi
              </button>
            </div>
          </div>
        </div>

        <div className="gap-standard pt-standard border-border-default mt-auto flex flex-col border-t">
          <button className="font-sub-heading text-sub-heading flex w-full items-center justify-center gap-2 rounded-lg border border-[#4a3068] bg-[#2a1b38] py-2.5 text-[#d4b3f5] transition-colors hover:bg-[#3b264f]">
            <span className="material-symbols-outlined icon-fill text-[18px]">mic</span>
            Voice Input
          </button>

          <div className="bg-surface-container border-border-default flex items-center justify-between rounded-lg border px-3 py-2.5">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary icon-fill text-[16px]">
                verified
              </span>
              <span className="font-sub-heading text-sub-heading text-primary">Advocate Pro</span>
            </div>
            <span className="font-meta-small text-meta-small text-text-muted">24 queries</span>
          </div>

          <button className="text-text-secondary hover:text-text-primary group flex w-full items-center justify-between px-2 py-2 transition-colors">
            <div className="flex items-center gap-2">
              <div className="bg-surface-variant border-border-default flex h-6 w-6 items-center justify-center rounded-full border">
                <span className="material-symbols-outlined text-[14px]">person</span>
              </div>
              <span className="font-body-ui text-body-ui">Settings</span>
            </div>
            <span className="material-symbols-outlined text-text-muted group-hover:text-primary text-[16px] transition-colors">
              settings
            </span>
          </button>
        </div>
      </nav>

      <main className="bg-bg-primary relative ml-0 flex h-screen flex-1 flex-col md:ml-[240px]">
        <header className="bg-bg-primary/80 border-border-default sticky top-0 z-40 flex h-[52px] w-full shrink-0 items-center justify-between border-b px-6 shadow-sm backdrop-blur-md">
          <div className="flex items-center gap-4">
            <button className="text-text-secondary hover:text-text-primary transition-colors md:hidden">
              <span className="material-symbols-outlined">menu</span>
            </button>
            <div className="text-primary flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">balance</span>
              <span className="font-sub-heading text-sub-heading">Legal Research</span>
            </div>
            <div className="bg-surface-container-low border-border-default hidden items-center rounded-full border px-3 py-1 sm:flex">
              <span className="bg-success mr-2 h-1.5 w-1.5 rounded-full"></span>
              <span className="font-meta-small text-meta-small text-text-secondary">
                Indian Jurisdiction
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="font-sub-heading text-sub-heading text-bg-primary bg-primary hover:bg-gold-hover flex items-center gap-2 rounded-[10px] px-4 py-1.5 shadow-sm transition-colors">
              <span className="material-symbols-outlined text-[16px]">add</span>
              New chat
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto scroll-smooth pb-[140px]">
          <div className="gap-major mx-auto flex w-full max-w-[720px] flex-col px-4 py-8">
            <div className="flex w-full justify-end">
              <div className="border-gold-border group relative max-w-[85%] rounded-2xl rounded-br-sm border bg-gradient-to-br from-[#1A1A1D] to-[#16130d] px-5 py-4 shadow-sm sm:max-w-[75%]">
                <p className="font-body-chat text-body-chat text-text-primary">
                  What are the grounds for anticipatory bail under Section 438 CrPC?
                </p>

                <div className="absolute top-2 right-2 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                  <button className="text-text-muted hover:text-primary bg-bg-primary rounded p-1">
                    <span className="material-symbols-outlined text-[16px]">edit</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="flex w-full justify-start">
              <div className="border-border-default relative flex max-w-[90%] flex-col gap-4 rounded-2xl rounded-tl-sm border bg-[#141416] px-6 py-5 shadow-sm sm:max-w-[85%]">
                <div className="border-border-default flex items-center gap-2 border-b pb-3">
                  <span className="material-symbols-outlined text-primary text-[14px]">
                    balance
                  </span>
                  <span className="font-label-caps text-label-caps text-primary tracking-widest">
                    LEXAI · LEGAL RESEARCH
                  </span>
                </div>

                <div className="font-body-chat text-body-chat flex flex-col gap-4 text-[#E8E0D0]">
                  <p>
                    Under Section 438 of the Code of Criminal Procedure (CrPC), 1973, anticipatory
                    bail can be granted by the High Court or the Court of Session. The primary
                    ground is a reasonable apprehension of arrest in a non-bailable offence.
                  </p>
                  <p>The court considers several factors before granting anticipatory bail:</p>
                  <ul className="text-text-secondary list-disc space-y-2 pl-5">
                    <li>
                      <strong>Nature and gravity of the accusation:</strong> The severity of the
                      alleged offence is a paramount consideration.
                    </li>
                    <li>
                      <strong>Antecedents of the applicant:</strong> Including whether they have
                      previously undergone imprisonment on conviction by a Court in respect of any
                      cognizable offence.
                    </li>
                    <li>
                      <strong>Fleeing from justice:</strong> The possibility of the applicant
                      fleeing from justice if anticipatory bail is granted.
                    </li>
                    <li>
                      <strong>Mala fide intent:</strong> Where the accusation has been made with the
                      object of injuring or humiliating the applicant by having him so arrested.
                    </li>
                  </ul>
                  <p>
                    The landmark judgment establishing the principles for anticipatory bail remains{' '}
                    <em>Gurbaksh Singh Sibbia v. State of Punjab</em>.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  <div className="bg-gold-subtle border-gold-border inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1">
                    <span className="material-symbols-outlined text-success icon-fill text-[12px]">
                      check_circle
                    </span>
                    <span className="font-citation text-citation text-primary">
                      Section 438 CrPC
                    </span>
                  </div>
                  <div className="bg-gold-subtle border-gold-border inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1">
                    <span className="material-symbols-outlined text-success icon-fill text-[12px]">
                      check_circle
                    </span>
                    <span className="font-citation text-citation text-primary">
                      Gurbaksh Singh Sibbia v. State of Punjab (1980)
                    </span>
                  </div>
                </div>

                <div className="border-border-default mt-1 flex items-center justify-between border-t border-dashed pt-3">
                  <div className="flex gap-2">
                    <button className="text-text-muted hover:text-primary flex items-center gap-1 transition-colors">
                      <span className="material-symbols-outlined text-[16px]">content_copy</span>
                      <span className="font-meta-small text-meta-small">Copy</span>
                    </button>
                    <button className="text-text-muted hover:text-success flex items-center gap-1 transition-colors">
                      <span className="material-symbols-outlined text-[16px]">thumb_up</span>
                    </button>
                    <button className="text-text-muted hover:text-error flex items-center gap-1 transition-colors">
                      <span className="material-symbols-outlined text-[16px]">thumb_down</span>
                    </button>
                  </div>
                  <span className="font-meta-small text-meta-small text-text-muted italic">
                    LexAI provides legal information, not formal legal advice.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="from-bg-primary via-bg-primary absolute bottom-0 left-0 w-full bg-gradient-to-t to-transparent px-4 pt-8 pb-6 md:px-8">
          <div className="mx-auto w-full max-w-[720px]">
            <div className="bg-bg-secondary border-border-default focus-within:border-gold-border focus-within:ring-gold-border flex flex-col rounded-[14px] border p-2 shadow-[0_-4px_24px_rgba(0,0,0,0.5)] transition-all focus-within:ring-1">
              <div className="relative w-full">
                <textarea
                  className="text-text-primary font-body-ui text-body-ui placeholder:text-text-muted max-h-[200px] min-h-[56px] w-full resize-none border-none bg-transparent px-3 py-2 leading-relaxed focus:ring-0"
                  placeholder="Ask any legal question in Hindi or English..."
                  rows="2"
                ></textarea>
              </div>
              <div className="border-border-default/50 mt-1 flex items-center justify-between border-t px-2 pt-2">
                <div className="flex items-center gap-2">
                  <button className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-[#2a1b38] text-[#d4b3f5] transition-colors hover:bg-[#3b264f]">
                    <span className="material-symbols-outlined icon-fill text-[18px]">mic</span>
                  </button>
                  <button className="hover:bg-surface-variant text-text-muted hover:text-text-primary flex h-[34px] w-[34px] items-center justify-center rounded-full transition-colors">
                    <span className="material-symbols-outlined text-[18px]">attach_file</span>
                  </button>
                </div>

                <button className="from-primary to-inverse-primary text-bg-primary flex h-[34px] w-[34px] items-center justify-center rounded-full bg-gradient-to-br shadow-sm transition-opacity hover:opacity-90">
                  <span className="material-symbols-outlined text-[18px] font-bold">
                    arrow_upward
                  </span>
                </button>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between px-2">
              <span className="font-meta-small text-meta-small text-text-muted">
                Powered by Claude · Indian Law Jurisdiction
              </span>
              <span className="font-meta-small text-meta-small text-text-muted">Enter to send</span>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
