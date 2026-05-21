export default function Page() {
  return (
    <>
      <nav className="bg-bg-primary/80 border-border-default sticky top-0 z-40 flex h-[52px] w-full items-center justify-between border-b px-6 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <div className="text-primary-container font-sub-heading text-sub-heading flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">balance</span>
            <span>Legal Research</span>
            <div className="bg-primary-container ml-1 h-1.5 w-1.5 rounded-full"></div>
          </div>
          <div className="bg-bg-tertiary border-border-default flex items-center rounded-full border px-3 py-1">
            <span className="text-text-muted font-meta-small text-meta-small">
              Indian Jurisdiction
            </span>
          </div>
        </div>
        <a
          className="text-text-muted hover:text-primary-container font-sub-heading text-sub-heading flex items-center gap-2 transition-colors"
          href="#"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          New chat
        </a>
      </nav>

      <main className="flex flex-grow flex-col items-center overflow-y-auto px-4 pt-8 pb-32">
        <div className="gap-block flex w-full max-w-[720px] flex-col">
          <div className="flex w-full justify-end">
            <div className="bg-gold-subtle border-gold-border p-standard max-w-[85%] rounded-[14px] rounded-br-none border shadow-sm">
              <p className="font-body-chat text-body-chat text-text-primary">
                My landlord has been refusing to return my security deposit for 6 months after I
                vacated the flat in Delhi. What are my legal options?
              </p>
            </div>
          </div>

          <div className="flex w-full flex-col gap-2">
            <div className="flex items-center gap-1.5 px-1">
              <span className="material-symbols-outlined text-primary-container text-[12px]">
                balance
              </span>
              <span className="font-label-caps text-label-caps text-primary-container tracking-[1.5px] uppercase">
                LEXAI · LEGAL RESEARCH
              </span>
            </div>

            <div className="border-border-default p-standard gap-standard flex flex-col rounded-[4px] rounded-tr-[14px] rounded-b-[14px] border bg-[#141416] shadow-sm">
              <h3 className="font-sub-heading text-sub-heading text-primary-container font-semibold">
                Legal Rights for Security Deposit Recovery in Delhi
              </h3>

              <p className="font-body-chat text-body-chat text-[#C8C3B8]">
                Under the Transfer of Property Act 1882 and the Delhi Rent Control Act 1958, a
                landlord is legally obligated to return the security deposit within a reasonable
                period after vacation — typically 30 days...
              </p>

              <ul className="font-body-chat text-body-chat flex flex-col gap-2 text-[#C8C3B8]">
                <li className="flex items-start gap-2">
                  <span className="text-primary-container leading-relaxed font-bold">›</span>
                  <span>
                    Section 106 TPA: Landlord must settle dues within reasonable notice period
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-container leading-relaxed font-bold">›</span>
                  <span>
                    Delhi Rent Control Act Section 39: Protects against illegal withholding
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-container leading-relaxed font-bold">›</span>
                  <span>Legal notice demand (Section 80 CPC) before filing case</span>
                </li>
              </ul>

              <div className="mt-2 flex flex-wrap gap-2">
                <div className="bg-gold-subtle border-gold-border hover:bg-gold-border flex cursor-pointer items-center gap-1.5 rounded-full border px-3 py-1 transition-colors">
                  <span className="text-primary-container text-[10px] font-bold">✓</span>
                  <span className="font-citation text-citation text-primary-container">
                    Section 106, Transfer of Property Act 1882
                  </span>
                  <span className="material-symbols-outlined text-primary-container ml-1 text-[12px]">
                    open_in_new
                  </span>
                </div>
                <div className="bg-gold-subtle border-gold-border hover:bg-gold-border flex cursor-pointer items-center gap-1.5 rounded-full border px-3 py-1 transition-colors">
                  <span className="text-primary-container text-[10px] font-bold">✓</span>
                  <span className="font-citation text-citation text-primary-container">
                    Section 39, Delhi Rent Control Act 1958
                  </span>
                  <span className="material-symbols-outlined text-primary-container ml-1 text-[12px]">
                    open_in_new
                  </span>
                </div>
                <div className="bg-error/10 border-error/30 hover:bg-error/20 flex cursor-pointer items-center gap-1.5 rounded-full border px-3 py-1 transition-colors">
                  <span className="text-error text-[10px] font-bold">⚠</span>
                  <span className="font-citation text-citation text-error">
                    Check: Suresh Kumar v. State of Delhi
                  </span>
                  <span className="material-symbols-outlined text-error ml-1 text-[12px]">
                    warning
                  </span>
                </div>
              </div>

              <div className="border-border-default mt-1 flex items-center gap-1.5 border-t pt-3">
                <div className="bg-success h-1.5 w-1.5 rounded-full"></div>
                <span className="font-meta-small text-meta-small text-text-muted">
                  High confidence · Citations verified
                </span>
              </div>

              <div className="bg-bg-tertiary p-standard border-border-default mt-2 rounded-lg border">
                <h4 className="font-sub-heading text-sub-heading text-primary-container mb-3 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px]">directions_run</span>
                  Recommended Action Steps
                </h4>
                <ol className="font-body-chat text-body-chat marker:text-primary-container flex list-inside list-decimal flex-col gap-2 pl-1 text-[#C8C3B8] marker:font-bold">
                  <li>Send legal notice via advocate (we can draft this)</li>
                  <li>File with Rent Controller if ignored</li>
                  <li>Approach Consumer Forum for harassment</li>
                </ol>
              </div>

              <div className="border-border-default mt-4 flex items-start gap-2 border-t pt-3">
                <span className="text-[12px]">ℹ️</span>
                <p className="font-meta-small text-meta-small text-text-muted italic">
                  This is not legal advice. Consult a qualified advocate before taking legal action.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <div className="from-bg-primary via-bg-primary fixed bottom-0 left-0 z-50 flex w-full justify-center bg-gradient-to-t to-transparent px-4 pt-12 pb-6">
        <div className="relative w-full max-w-[720px]">
          <div className="border-border-default focus-within:border-gold-border focus-within:ring-gold-border flex items-end gap-2 rounded-[14px] border bg-[#141416] p-2 shadow-lg transition-all focus-within:ring-1">
            <button className="flex h-[34px] w-[34px] flex-shrink-0 items-center justify-center rounded-lg border border-[#D8B4FE]/20 bg-[#2A1B38] text-[#D8B4FE] transition-colors hover:bg-[#3B264E]">
              <span className="material-symbols-outlined text-[20px]">mic</span>
            </button>
            <textarea
              className="font-body-ui text-body-ui text-text-primary placeholder-text-muted max-h-[120px] min-h-[34px] w-full resize-none border-none bg-transparent py-2 focus:ring-0"
              placeholder="Ask a follow-up question..."
              rows="1"
              style={{ scrollbarWidth: 'thin', scrollbarColor: '#38342d transparent' }}
            ></textarea>
            <button className="bg-primary text-on-primary hover:bg-gold-hover flex h-[34px] w-[34px] flex-shrink-0 items-center justify-center rounded-lg transition-colors">
              <span
                className="material-symbols-outlined text-[20px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                send
              </span>
            </button>
          </div>
          <div className="mt-2 text-center">
            <p className="font-meta-small text-meta-small text-text-muted">
              LexAI can make mistakes. Verify critical information.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
