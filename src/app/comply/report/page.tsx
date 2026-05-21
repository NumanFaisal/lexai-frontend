export default function Page() {
  return (
    <>
      <header className="bg-bg-primary/80 border-border-default sticky top-0 z-40 flex h-[52px] w-full items-center justify-between border-b px-6 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <button className="text-text-secondary hover:text-primary hover:bg-bg-elevated flex items-center justify-center rounded-full p-2 transition-colors">
            <span className="material-symbols-outlined text-xl" data-icon="arrow_back">
              arrow_back
            </span>
          </button>
          <h1 className="font-sub-heading text-sub-heading text-text-primary">
            Compliance Report — Acme SaaS, Bengaluru
          </h1>
        </div>
        <button className="bg-success text-on-secondary font-sub-heading text-sub-heading hover:bg-opacity-90 flex items-center gap-2 rounded-lg px-4 py-2 transition-opacity">
          <span className="material-symbols-outlined text-[18px]" data-icon="download">
            download
          </span>
          Download PDF
        </button>
      </header>

      <main className="py-section gap-major mx-auto flex w-full max-w-[720px] flex-1 flex-col px-4">
        <section className="bg-bg-secondary border-border-default border-l-success p-standard gap-standard relative flex flex-col overflow-hidden rounded-xl border border-l-4">
          <div className="from-success/5 pointer-events-none absolute inset-0 bg-gradient-to-br to-transparent"></div>
          <div className="relative z-10 flex items-start justify-between">
            <div>
              <h2 className="font-section-head text-section-head text-text-primary mb-1">
                Acme SaaS Compliance Profile
              </h2>
              <p className="font-meta-small text-meta-small text-text-secondary tracking-widest uppercase">
                Business Context
              </p>
            </div>
            <div className="bg-bg-elevated border-border-default flex items-center gap-2 rounded-full border px-3 py-1">
              <span
                className="material-symbols-outlined text-text-secondary text-[14px]"
                data-icon="calendar_today"
              >
                calendar_today
              </span>
              <span className="font-meta-small text-meta-small text-text-secondary">
                Report generated 14 Jun 2025
              </span>
            </div>
          </div>
          <div className="border-border-default relative z-10 flex flex-wrap gap-4 border-t pt-4">
            <div className="min-w-[120px] flex-1">
              <p className="font-label-caps text-label-caps text-text-muted mb-1">TYPE</p>
              <p className="font-body-ui text-body-ui text-text-primary font-medium">
                SaaS Startup
              </p>
            </div>
            <div className="min-w-[120px] flex-1">
              <p className="font-label-caps text-label-caps text-text-muted mb-1">LOCATION</p>
              <p className="font-body-ui text-body-ui text-text-primary font-medium">
                Bengaluru, Karnataka
              </p>
            </div>
            <div className="min-w-[120px] flex-1">
              <p className="font-label-caps text-label-caps text-text-muted mb-1">TEAM</p>
              <p className="font-body-ui text-body-ui text-text-primary font-medium">
                12 employees
              </p>
            </div>
            <div className="min-w-[120px] flex-1">
              <p className="font-label-caps text-label-caps text-text-muted mb-1">REVENUE</p>
              <p className="font-body-ui text-body-ui text-text-primary font-medium">₹40L ARR</p>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="bg-error/10 border-error/20 p-standard hover:bg-error/20 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border text-center transition-colors">
            <span className="text-error text-2xl font-bold">3</span>
            <span className="font-sub-heading text-sub-heading text-error">Urgent</span>
          </div>
          <div className="bg-warning/10 border-warning/20 p-standard hover:bg-warning/20 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border text-center transition-colors">
            <span className="text-warning text-2xl font-bold">5</span>
            <span className="font-sub-heading text-sub-heading text-warning">This Quarter</span>
          </div>
          <div className="bg-tertiary/10 border-tertiary/20 p-standard hover:bg-tertiary/20 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border text-center transition-colors">
            <span className="text-tertiary text-2xl font-bold">4</span>
            <span className="font-sub-heading text-sub-heading text-tertiary">Optional</span>
          </div>
          <div className="bg-success/10 border-success/20 p-standard hover:bg-success/20 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border text-center transition-colors">
            <span className="text-success text-2xl font-bold">6</span>
            <span className="font-sub-heading text-sub-heading text-success">Completed</span>
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h3 className="font-section-head text-section-head text-text-primary mb-2">
            Detailed Checklist
          </h3>

          <div className="bg-bg-secondary border-border-default overflow-hidden rounded-xl border shadow-sm">
            <div className="p-standard border-border-default hover:bg-bg-elevated flex cursor-pointer items-center justify-between border-b transition-colors">
              <div className="flex items-center gap-3">
                <div className="bg-error h-3 w-3 shrink-0 rounded-full"></div>
                <h4 className="font-sub-heading text-sub-heading text-text-primary">
                  Tax Compliance{' '}
                  <span className="text-text-muted font-normal">· 3 requirements</span>
                </h4>
              </div>
              <span
                className="material-symbols-outlined text-text-secondary"
                data-icon="expand_less"
              >
                expand_less
              </span>
            </div>

            <div className="border-error flex flex-col border-l-2">
              <div className="p-standard border-border-default/50 hover:bg-bg-elevated/50 flex flex-col items-start justify-between gap-4 border-b transition-colors sm:flex-row sm:items-center">
                <div className="flex flex-1 items-start gap-3">
                  <div className="bg-error mt-2 h-2 w-2 shrink-0 rounded-full"></div>
                  <div>
                    <p className="font-sub-heading text-sub-heading text-text-primary mb-1">
                      GST Return Filing (GSTR-3B)
                    </p>
                    <div className="flex flex-wrap gap-x-4 gap-y-1">
                      <span className="font-citation text-citation text-text-secondary bg-surface-container rounded px-2 py-0.5">
                        CGST Act Sec 39
                      </span>
                      <span className="font-meta-small text-meta-small text-text-secondary flex items-center gap-1">
                        <span
                          className="material-symbols-outlined text-[12px]"
                          data-icon="schedule"
                        >
                          schedule
                        </span>{' '}
                        Due: 20th of each month
                      </span>
                      <span className="font-meta-small text-meta-small text-error flex items-center gap-1">
                        <span className="material-symbols-outlined text-[12px]" data-icon="warning">
                          warning
                        </span>{' '}
                        Penalty: ₹50/day
                      </span>
                    </div>
                  </div>
                </div>
                <button className="bg-primary/10 text-primary border-primary/30 font-sub-heading text-sub-heading hover:bg-primary/20 rounded-lg border px-3 py-1.5 whitespace-nowrap transition-colors">
                  Mark Done
                </button>
              </div>

              <div className="p-standard border-border-default/50 hover:bg-bg-elevated/50 flex flex-col items-start justify-between gap-4 border-b transition-colors sm:flex-row sm:items-center">
                <div className="flex flex-1 items-start gap-3">
                  <div className="bg-warning mt-2 h-2 w-2 shrink-0 rounded-full"></div>
                  <div>
                    <p className="font-sub-heading text-sub-heading text-text-primary mb-1">
                      E-invoicing Setup
                    </p>
                    <div className="flex flex-wrap gap-x-4 gap-y-1">
                      <span className="font-citation text-citation text-text-secondary bg-surface-container rounded px-2 py-0.5">
                        CGST Rule 48(4)
                      </span>
                      <span className="font-meta-small text-meta-small text-text-secondary flex items-center gap-1">
                        <span className="material-symbols-outlined text-[12px]" data-icon="info">
                          info
                        </span>{' '}
                        Required when turnover &gt;₹5Cr
                      </span>
                      <span className="font-meta-small text-meta-small text-warning flex items-center gap-1">
                        <span className="material-symbols-outlined text-[12px]" data-icon="warning">
                          warning
                        </span>{' '}
                        Fine: ₹10,000
                      </span>
                    </div>
                  </div>
                </div>
                <button className="text-text-secondary border-border-default font-sub-heading text-sub-heading hover:text-text-primary hover:border-text-secondary rounded-lg border bg-transparent px-3 py-1.5 whitespace-nowrap transition-colors">
                  Learn More
                </button>
              </div>

              <div className="p-standard hover:bg-bg-elevated/50 flex flex-col items-start justify-between gap-4 opacity-70 transition-colors sm:flex-row sm:items-center">
                <div className="flex flex-1 items-start gap-3">
                  <div className="bg-success mt-2 h-2 w-2 shrink-0 rounded-full"></div>
                  <div>
                    <p className="font-sub-heading text-sub-heading text-text-primary mb-1 line-through">
                      GST Registration
                    </p>
                    <div className="flex flex-wrap gap-x-4 gap-y-1">
                      <span className="font-citation text-citation text-text-secondary bg-surface-container rounded px-2 py-0.5">
                        CGST Act Sec 22
                      </span>
                      <span className="font-meta-small text-meta-small text-success flex items-center gap-1">
                        <span
                          className="material-symbols-outlined text-[12px]"
                          data-icon="check_circle"
                        >
                          check_circle
                        </span>{' '}
                        Completed
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-success px-3 py-1.5">
                  <span className="material-symbols-outlined" data-icon="done_all">
                    done_all
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-bg-secondary border-border-default overflow-hidden rounded-xl border shadow-sm">
            <div className="p-standard hover:bg-bg-elevated border-warning flex cursor-pointer items-center justify-between border-l-2 transition-colors">
              <div className="flex items-center gap-3">
                <div className="bg-warning h-3 w-3 shrink-0 rounded-full"></div>
                <h4 className="font-sub-heading text-sub-heading text-text-primary">
                  Labour &amp; HR{' '}
                  <span className="text-text-muted font-normal">· 4 requirements (2 pending)</span>
                </h4>
              </div>
              <span
                className="material-symbols-outlined text-text-secondary"
                data-icon="expand_more"
              >
                expand_more
              </span>
            </div>
          </div>

          <div className="bg-bg-secondary border-border-default overflow-hidden rounded-xl border shadow-sm">
            <div className="p-standard border-border-default hover:bg-bg-elevated flex cursor-pointer items-center justify-between border-b transition-colors">
              <div className="flex items-center gap-3">
                <div className="bg-tertiary h-3 w-3 shrink-0 rounded-full"></div>
                <h4 className="font-sub-heading text-sub-heading text-text-primary">
                  Data Privacy (DPDP Act 2023){' '}
                  <span className="text-text-muted font-normal">· 3 requirements</span>
                </h4>
              </div>
              <span
                className="material-symbols-outlined text-text-secondary"
                data-icon="expand_less"
              >
                expand_less
              </span>
            </div>

            <div className="border-tertiary flex flex-col border-l-2">
              <div className="p-standard border-border-default/50 hover:bg-bg-elevated/50 flex flex-col items-start justify-between gap-4 border-b transition-colors sm:flex-row sm:items-center">
                <div className="flex flex-1 items-start gap-3">
                  <div className="bg-error mt-2 h-2 w-2 shrink-0 rounded-full"></div>
                  <div>
                    <p className="font-sub-heading text-sub-heading text-text-primary mb-1">
                      Privacy Policy
                    </p>
                    <div className="flex flex-col gap-1">
                      <span className="font-body-ui text-body-ui text-text-secondary">
                        Must explain data collected, use, retention.
                      </span>
                      <span className="font-citation text-citation text-text-secondary bg-surface-container w-fit rounded px-2 py-0.5">
                        DPDP Act Sec 7
                      </span>
                    </div>
                  </div>
                </div>
                <button className="bg-primary text-on-primary font-sub-heading text-sub-heading hover:bg-primary-hover flex items-center gap-2 rounded-lg px-3 py-1.5 whitespace-nowrap transition-colors">
                  <span className="material-symbols-outlined text-[16px]" data-icon="edit_document">
                    edit_document
                  </span>
                  Create with LexAI
                </button>
              </div>

              <div className="p-standard border-border-default/50 hover:bg-bg-elevated/50 flex flex-col items-start justify-between gap-4 border-b transition-colors sm:flex-row sm:items-center">
                <div className="flex flex-1 items-start gap-3">
                  <div className="bg-error mt-2 h-2 w-2 shrink-0 rounded-full"></div>
                  <div>
                    <p className="font-sub-heading text-sub-heading text-text-primary mb-1">
                      User Consent Mechanism
                    </p>
                    <div className="flex flex-col gap-1">
                      <span className="font-body-ui text-body-ui text-text-secondary">
                        Implement before collecting any user data.
                      </span>
                      <span className="font-citation text-citation text-text-secondary bg-surface-container w-fit rounded px-2 py-0.5">
                        DPDP Act Sec 6
                      </span>
                    </div>
                  </div>
                </div>
                <button className="text-text-secondary border-border-default font-sub-heading text-sub-heading hover:text-text-primary hover:border-text-secondary rounded-lg border bg-transparent px-3 py-1.5 whitespace-nowrap transition-colors">
                  Learn More
                </button>
              </div>

              <div className="p-standard hover:bg-bg-elevated/50 flex flex-col items-start justify-between gap-4 transition-colors sm:flex-row sm:items-center">
                <div className="flex flex-1 items-start gap-3">
                  <div className="bg-warning mt-2 h-2 w-2 shrink-0 rounded-full"></div>
                  <div>
                    <p className="font-sub-heading text-sub-heading text-text-primary mb-1">
                      Data Breach Response Plan
                    </p>
                    <div className="flex flex-wrap gap-x-4 gap-y-1">
                      <span className="font-meta-small text-meta-small text-text-secondary flex items-center gap-1">
                        <span
                          className="material-symbols-outlined text-[12px]"
                          data-icon="notification_important"
                        >
                          notification_important
                        </span>{' '}
                        72-hour notification to DPBI
                      </span>
                      <span className="font-meta-small text-meta-small text-warning">
                        Medium priority
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-bg-secondary border-border-default overflow-hidden rounded-xl border opacity-70 shadow-sm">
            <div className="p-standard hover:bg-bg-elevated border-success flex cursor-pointer items-center justify-between border-l-2 transition-colors">
              <div className="flex items-center gap-3">
                <div className="bg-success h-3 w-3 shrink-0 rounded-full"></div>
                <h4 className="font-sub-heading text-sub-heading text-text-primary">
                  Corporate Compliance{' '}
                  <span className="text-text-muted font-normal">· All 5 completed</span>
                </h4>
              </div>
              <span
                className="material-symbols-outlined text-text-secondary"
                data-icon="expand_more"
              >
                expand_more
              </span>
            </div>
          </div>
        </section>

        <section className="mt-block pt-section border-border-default flex flex-col justify-end gap-4 border-t sm:flex-row">
          <button className="text-success border-success/50 font-sub-heading text-sub-heading hover:bg-success/10 flex items-center justify-center gap-2 rounded-lg border bg-transparent px-6 py-3 transition-colors">
            <span className="material-symbols-outlined text-[18px]" data-icon="picture_as_pdf">
              picture_as_pdf
            </span>
            Export Full Report as PDF
          </button>
          <button className="bg-bg-elevated text-text-primary border-border-default font-sub-heading text-sub-heading hover:bg-surface-variant flex items-center justify-center gap-2 rounded-lg border px-6 py-3 transition-colors">
            <span className="material-symbols-outlined text-[18px]" data-icon="event">
              event
            </span>
            Set Reminders in Google Calendar
          </button>
        </section>
      </main>
    </>
  );
}
