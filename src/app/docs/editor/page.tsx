export default function Page() {
  return (
    <>
      <header className="bg-bg-secondary border-border-default px-standard z-50 flex h-[64px] shrink-0 items-center justify-between border-b">
        <div className="gap-standard flex items-center">
          <button className="text-text-secondary hover:text-text-primary hover:bg-surface-variant flex h-8 w-8 items-center justify-center rounded-full transition-colors">
            <span className="material-symbols-outlined text-lg">arrow_back</span>
          </button>
          <div className="gap-small flex items-center">
            <span className="bg-secondary-container text-on-secondary-container font-label-caps text-label-caps rounded px-2 py-0.5 uppercase">
              NDA
            </span>
            <div className="group hover:border-border-default hover:bg-surface-variant flex cursor-pointer items-center gap-2 rounded border border-transparent px-2 py-1 transition-colors">
              <h1 className="font-section-head text-section-head text-on-surface m-0 max-w-md truncate">
                Non-Disclosure Agreement — Acme Pvt Ltd &amp; TechVendor
              </h1>
              <span className="material-symbols-outlined text-text-muted text-[16px] opacity-0 transition-opacity group-hover:opacity-100">
                edit
              </span>
            </div>
          </div>
        </div>
        <div className="text-success font-meta-small text-meta-small flex items-center gap-1">
          <span className="material-symbols-outlined text-[14px]">cloud_done</span>
          Auto-saved 2 min ago
        </div>
        <div className="gap-component flex items-center">
          <button className="border-border-default text-text-secondary hover:text-on-surface hover:bg-surface-variant font-sub-heading text-sub-heading flex h-[36px] items-center gap-2 rounded border px-3 py-1.5 transition-colors">
            <span className="material-symbols-outlined text-[18px]">share</span>
            Share
          </button>
          <button className="border-outline text-on-surface hover:bg-surface-variant font-sub-heading text-sub-heading flex h-[36px] items-center gap-2 rounded border px-3 py-1.5 transition-colors">
            <span className="material-symbols-outlined text-[18px]">description</span>
            Download Word
          </button>
          <button className="bg-primary-container text-on-primary-container hover:bg-warning font-sub-heading text-sub-heading flex h-[36px] items-center gap-2 rounded px-4 py-1.5 font-medium transition-colors">
            <span
              className="material-symbols-outlined text-[18px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              picture_as_pdf
            </span>
            Download PDF
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <main className="bg-surface-container-lowest relative flex h-full flex-1 flex-col overflow-hidden">
          <div className="gap-small px-section py-component border-border-default bg-surface-container flex shrink-0 items-center border-b">
            <div className="bg-surface-variant border-border-default text-text-secondary font-meta-small text-meta-small flex items-center gap-1.5 rounded-full border px-2.5 py-1">
              <span className="material-symbols-outlined text-[14px]">calendar_today</span>
              Generated 14 Jun 2025
            </div>
            <div className="bg-surface-variant border-border-default text-text-secondary font-meta-small text-meta-small flex items-center gap-1.5 rounded-full border px-2.5 py-1">
              <span className="material-symbols-outlined text-[14px]">gavel</span>
              Indian Contract Act
            </div>
            <div className="bg-surface-variant border-border-default text-text-secondary font-meta-small text-meta-small flex items-center gap-1.5 rounded-full border px-2.5 py-1">
              <span className="material-symbols-outlined text-[14px]">location_on</span>
              Delhi Jurisdiction
            </div>
            <div className="bg-surface-variant border-border-default text-text-secondary font-meta-small text-meta-small flex items-center gap-1.5 rounded-full border px-2.5 py-1">
              <span className="material-symbols-outlined text-[14px]">history</span>
              Version 2
            </div>
          </div>

          <div className="bg-surface border-border-default flex shrink-0 items-center justify-center gap-1 border-b px-4 py-2">
            <div className="bg-surface-variant border-border-default flex items-center rounded-md border p-1">
              <button
                className="text-text-secondary hover:text-on-surface hover:bg-surface-container flex h-8 w-8 items-center justify-center rounded transition-colors"
                title="Bold"
              >
                <span className="material-symbols-outlined text-[18px]">format_bold</span>
              </button>
              <button
                className="text-text-secondary hover:text-on-surface hover:bg-surface-container flex h-8 w-8 items-center justify-center rounded transition-colors"
                title="Italic"
              >
                <span className="material-symbols-outlined text-[18px]">format_italic</span>
              </button>
              <button
                className="text-text-secondary hover:text-on-surface hover:bg-surface-container flex h-8 w-8 items-center justify-center rounded transition-colors"
                title="Underline"
              >
                <span className="material-symbols-outlined text-[18px]">format_underlined</span>
              </button>
              <div className="bg-border-default mx-1 h-5 w-px"></div>
              <button
                className="text-text-secondary hover:text-on-surface hover:bg-surface-container flex h-8 w-8 items-center justify-center rounded transition-colors"
                title="Heading"
              >
                <span className="material-symbols-outlined text-[18px]">title</span>
              </button>
              <button
                className="text-text-secondary hover:text-on-surface hover:bg-surface-container flex h-8 w-8 items-center justify-center rounded transition-colors"
                title="Bullet List"
              >
                <span className="material-symbols-outlined text-[18px]">format_list_bulleted</span>
              </button>
              <div className="bg-border-default mx-1 h-5 w-px"></div>
              <button
                className="text-text-secondary hover:text-on-surface hover:bg-surface-container flex h-8 w-8 items-center justify-center rounded transition-colors"
                title="Undo"
              >
                <span className="material-symbols-outlined text-[18px]">undo</span>
              </button>
              <button
                className="text-text-disabled flex h-8 w-8 items-center justify-center rounded"
                disabled=""
                title="Redo"
              >
                <span className="material-symbols-outlined text-[18px]">redo</span>
              </button>
            </div>
          </div>

          <div className="p-section flex flex-1 justify-center overflow-y-auto bg-[#1E1E21]/30">
            <div className="relative my-4 flex h-max min-h-[1056px] w-full max-w-[816px] flex-col rounded-sm bg-[#fdfdfc] text-[#1a1a1a] shadow-lg">
              <div className="flex flex-col gap-6 px-16 py-20 font-serif text-[15px] leading-[1.8]">
                <div className="mb-8 text-center">
                  <h2 className="mb-2 text-2xl font-bold tracking-wide text-black uppercase">
                    NON-DISCLOSURE AGREEMENT
                  </h2>
                  <p className="text-sm text-gray-600 italic">
                    (Under the Indian Contract Act, 1872)
                  </p>
                </div>
                <p>
                  This Agreement is entered into on <strong>14th June, 2025</strong> between:
                </p>
                <div className="space-y-4 pl-6">
                  <p>
                    <strong>1. Acme Private Limited</strong>, a company incorporated under the
                    Companies Act, 2013, having its registered office at [Address], hereinafter
                    referred to as the 'Disclosing Party';
                  </p>
                  <p className="text-center font-bold">AND</p>
                  <p>
                    <strong>2. TechVendor Solutions Pvt Ltd</strong>, hereinafter referred to as the
                    'Receiving Party'.
                  </p>
                </div>
                <p className="mt-4">
                  <strong>WHEREAS</strong> the Parties wish to explore a potential business
                  relationship...
                </p>
                <div className="mt-8 space-y-6">
                  <section>
                    <h3 className="mb-2 font-bold uppercase">
                      [CLAUSE 1] DEFINITION OF CONFIDENTIAL INFORMATION
                    </h3>
                    <p className="text-justify text-gray-800">
                      "Confidential Information" means all non-public, proprietary, or classified
                      information disclosed by the Disclosing Party to the Receiving Party, whether
                      in writing, orally, or by inspection of tangible objects, that is designated
                      as confidential or that reasonably should be understood to be confidential
                      given the nature of the information and the circumstances of disclosure.
                    </p>
                  </section>
                  <section>
                    <h3 className="mb-2 font-bold uppercase">
                      [CLAUSE 2] OBLIGATIONS OF THE RECEIVING PARTY
                    </h3>
                    <p className="text-justify text-gray-800">
                      The Receiving Party shall hold and maintain the Confidential Information in
                      strictest confidence for the sole and exclusive benefit of the Disclosing
                      Party. The Receiving Party shall carefully restrict access to Confidential
                      Information to employees, contractors, and third parties as is reasonably
                      required.
                    </p>
                  </section>
                  <section>
                    <h3 className="mb-2 font-bold uppercase">[CLAUSE 3] DURATION</h3>
                    <p className="text-justify text-gray-800">
                      This Agreement shall remain in force for a period of <strong>2 years</strong>{' '}
                      from the date first above written, unless mutually terminated earlier in
                      writing by both Parties.
                    </p>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </main>

        <aside className="border-border-default bg-bg-secondary flex w-[300px] shrink-0 flex-col overflow-y-auto border-l">
          <div className="p-standard border-border-default border-b">
            <h3 className="font-sub-heading text-sub-heading text-on-surface mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px]">info</span>
              Document Details
            </h3>
            <ul className="font-body-ui text-body-ui text-text-secondary space-y-3">
              <li className="flex items-start justify-between">
                <span className="w-1/3">Type:</span>
                <span className="text-on-surface w-2/3 text-right font-medium">
                  Non-Disclosure Agreement
                </span>
              </li>
              <li className="flex items-start justify-between">
                <span className="w-1/3">Parties:</span>
                <span className="text-on-surface w-2/3 text-right">
                  Acme Pvt Ltd
                  <br />
                  <span className="text-text-muted">TechVendor</span>
                </span>
              </li>
              <li className="flex items-start justify-between">
                <span className="w-1/3">Gov. Law:</span>
                <span className="text-on-surface w-2/3 text-right">Indian Contract Act 1872</span>
              </li>
              <li className="flex items-start justify-between">
                <span className="w-1/3">Jurisdiction:</span>
                <span className="text-on-surface w-2/3 text-right">Delhi Courts</span>
              </li>
              <li className="flex items-start justify-between">
                <span className="w-1/3">Arbitration:</span>
                <span className="text-on-surface w-2/3 text-right">
                  Indian Arbitration Act 1996
                </span>
              </li>
              <li className="border-border-default mt-2 flex items-start justify-between border-t pt-2">
                <span className="w-1/3">Created:</span>
                <span className="text-on-surface w-2/3 text-right">14 Jun 2025</span>
              </li>
            </ul>
          </div>
          <div className="p-standard border-border-default flex-1 border-b">
            <h3 className="font-sub-heading text-sub-heading text-on-surface mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-warning text-[20px]">lightbulb</span>
              AI Suggestions
            </h3>
            <div className="space-y-3">
              <div className="bg-surface-variant/50 border-gold-subtle group relative rounded border p-3">
                <div className="bg-warning absolute top-0 left-0 h-full w-1 rounded-l"></div>
                <div className="flex gap-2">
                  <span className="material-symbols-outlined text-warning mt-0.5 shrink-0 text-[16px]">
                    tips_and_updates
                  </span>
                  <div>
                    <p className="font-body-ui text-body-ui text-on-surface-variant leading-snug">
                      Consider adding a non-solicitation clause to protect your employees.
                    </p>
                    <button className="text-warning hover:text-gold-hover font-meta-small text-meta-small mt-2 flex items-center gap-1 tracking-wider uppercase transition-colors">
                      Apply Clause{' '}
                      <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-surface-variant/50 border-border-default relative rounded border p-3">
                <div className="bg-tertiary-container absolute top-0 left-0 h-full w-1 rounded-l"></div>
                <div className="flex gap-2">
                  <span className="material-symbols-outlined text-tertiary-container mt-0.5 shrink-0 text-[16px]">
                    policy
                  </span>
                  <div>
                    <p className="font-body-ui text-body-ui text-on-surface-variant leading-snug">
                      Jurisdiction clause references Delhi — ensure both parties have Delhi
                      presence.
                    </p>
                    <button className="text-text-secondary hover:text-on-surface font-meta-small text-meta-small mt-2 flex items-center gap-1 tracking-wider uppercase transition-colors">
                      Review Jurisdiction{' '}
                      <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-standard bg-surface border-border-default mt-auto border-t">
            <h3 className="font-sub-heading text-sub-heading text-on-surface mb-3">Share</h3>
            <div className="mb-3 flex items-center justify-between">
              <span className="font-body-ui text-body-ui text-text-secondary">
                Enable public link
              </span>
              <label className="relative inline-flex cursor-pointer items-center">
                <input className="peer sr-only" type="checkbox" value="" />
                <div className="bg-surface-variant peer after:bg-text-secondary after:border-text-secondary peer-checked:bg-primary peer-checked:after:bg-on-primary h-5 w-9 rounded-full peer-focus:outline-none after:absolute after:top-[2px] after:left-[2px] after:h-4 after:w-4 after:rounded-full after:border after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
              </label>
            </div>
            <div className="bg-surface-variant border-border-default pointer-events-none flex items-center gap-2 rounded border p-1.5 opacity-50">
              <span className="material-symbols-outlined text-text-muted ml-1 text-[16px]">
                link
              </span>
              <input
                className="text-text-disabled font-citation text-citation flex-1 cursor-not-allowed border-none bg-transparent p-0 focus:ring-0"
                readOnly={true}
                type="text"
                value="lexai.in/doc/nda-14j-8x9q"
              />
              <button
                className="text-text-muted hover:bg-surface-container rounded p-1"
                disabled=""
              >
                <span className="material-symbols-outlined text-[16px]">content_copy</span>
              </button>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
