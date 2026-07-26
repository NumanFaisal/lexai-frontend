'use client';

import {
  AlertTriangle,
  Clock,
  CheckCircle,
  FileText,
  UserCheck,
  Lightbulb,
  Download,
  AlertCircle,
} from 'lucide-react';

export default function ComplianceDashboard() {
  return (
    <div className="w-full space-y-6">
      {/* Header Section */}
      <div className="space-y-2">
        <span className="text-gold font-mono text-[11px] font-semibold tracking-[0.2em] uppercase">
          Compliance Audit
        </span>
        <div>
          <h2 className="text-text-primary font-serif text-[26px] leading-tight font-semibold md:text-[32px]">
            Private Limited Company (SaaS) — FY 2025-26
          </h2>
          <p className="text-text-secondary mt-1 text-[13px] md:text-[14px]">
            Based on Companies Act 2013 and GST rules. Last sync with MCA portal: 2 hours ago.
          </p>
        </div>
      </div>

      {/* Summary Row */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Card 1: Action Required */}
        <div className="bg-bg-secondary border-error/20 group hover:border-error/40 relative overflow-hidden rounded-xl border p-5 transition-colors duration-200">
          <div className="bg-error/5 group-hover:bg-error/10 absolute -top-4 -right-4 h-24 w-24 rounded-full blur-2xl transition-all duration-300"></div>
          <h3 className="text-error font-serif text-[44px] leading-none font-semibold">2</h3>
          <p className="text-text-secondary mt-1 text-[12px] font-medium tracking-wider uppercase">
            Action Required
          </p>
          <div className="text-error bg-error/10 mt-4 flex w-fit items-center gap-1.5 rounded-md px-2.5 py-0.5 text-[11px] font-medium">
            <AlertTriangle size={12} /> High Risk
          </div>
        </div>

        {/* Card 2: Due within 30 days */}
        <div className="bg-bg-secondary border-warning/20 group hover:border-warning/40 relative overflow-hidden rounded-xl border p-5 transition-colors duration-200">
          <div className="bg-warning/5 group-hover:bg-warning/10 absolute -top-4 -right-4 h-24 w-24 rounded-full blur-2xl transition-all duration-300"></div>
          <h3 className="text-warning font-serif text-[44px] leading-none font-semibold">3</h3>
          <p className="text-text-secondary mt-1 text-[12px] font-medium tracking-wider uppercase">
            Due within 30 days
          </p>
          <div className="text-warning bg-warning/10 mt-4 flex w-fit items-center gap-1.5 rounded-md px-2.5 py-0.5 text-[11px] font-medium">
            <Clock size={12} /> Critical
          </div>
        </div>

        {/* Card 3: Up to date */}
        <div className="bg-bg-secondary border-success/20 group hover:border-success/40 relative overflow-hidden rounded-xl border p-5 transition-colors duration-200">
          <div className="bg-success/5 group-hover:bg-success/10 absolute -top-4 -right-4 h-24 w-24 rounded-full blur-2xl transition-all duration-300"></div>
          <h3 className="text-success font-serif text-[44px] leading-none font-semibold">14</h3>
          <p className="text-text-secondary mt-1 text-[12px] font-medium tracking-wider uppercase">
            Up to date
          </p>
          <div className="text-success bg-success/10 mt-4 flex w-fit items-center gap-1.5 rounded-md px-2.5 py-0.5 text-[11px] font-medium">
            <CheckCircle size={12} /> Compliant
          </div>
        </div>
      </div>

      {/* Checklist Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-text-primary font-serif text-[18px] font-semibold md:text-[20px]">
            Ministry of Corporate Affairs (MCA) Filings
          </h4>
          <button className="text-gold hover:text-gold-hover text-[12px] font-medium transition-colors hover:underline">
            View All
          </button>
        </div>

        <div className="bg-bg-secondary border-border-default divide-border-default divide-y overflow-hidden rounded-xl border">
          {/* Item 1: AOC-4 */}
          <div className="hover:bg-bg-tertiary/40 flex flex-col justify-between gap-4 p-4 transition-colors duration-150 sm:flex-row sm:items-center md:p-5">
            <div className="flex items-start gap-4">
              <div className="bg-error/10 border-error/20 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border">
                <FileText className="text-error" size={20} strokeWidth={1.5} />
              </div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h5 className="text-text-primary text-[14px] font-medium">
                    AOC-4 (Financial Statement Filing)
                  </h5>
                  <span className="bg-error/20 border-error/30 text-error rounded border px-2 py-0.5 text-[9px] font-bold tracking-wider uppercase">
                    Overdue
                  </span>
                </div>
                <p className="text-error flex items-center gap-1 text-[12px]">
                  <AlertCircle size={12} /> Penalty of ₹100/day applies since Oct 30, 2025.
                </p>
              </div>
            </div>
            <button className="bg-error text-bg-primary hover:bg-error/90 shrink-0 self-start rounded-lg px-4 py-1.5 text-[12px] font-medium transition-all active:scale-[0.98] sm:self-center">
              Fix now
            </button>
          </div>

          {/* Item 2: DIR-3 KYC */}
          <div className="hover:bg-bg-tertiary/40 flex flex-col justify-between gap-4 p-4 transition-colors duration-150 sm:flex-row sm:items-center md:p-5">
            <div className="flex items-start gap-4">
              <div className="bg-warning/10 border-warning/20 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border">
                <UserCheck className="text-warning" size={20} strokeWidth={1.5} />
              </div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h5 className="text-text-primary text-[14px] font-medium">
                    DIR-3 KYC (Director KYC)
                  </h5>
                  <span className="bg-warning/10 border-warning/20 text-warning rounded border px-2 py-0.5 text-[9px] font-bold tracking-wider uppercase">
                    Upcoming
                  </span>
                </div>
                <p className="text-text-secondary flex items-center gap-1 text-[12px]">
                  <Clock size={12} /> Due in 14 days (Deadline: Dec 15, 2025).
                </p>
              </div>
            </div>
            <button className="border-border-default text-text-secondary hover:text-text-primary hover:border-text-secondary shrink-0 self-start rounded-lg border px-4 py-1.5 text-[12px] font-medium transition-all active:scale-[0.98] sm:self-center">
              Prepare
            </button>
          </div>

          {/* Item 3: MGT-7 */}
          <div className="hover:bg-bg-tertiary/40 flex flex-col justify-between gap-4 p-4 transition-colors duration-150 sm:flex-row sm:items-center md:p-5">
            <div className="flex items-start gap-4 opacity-75">
              <div className="bg-success/10 border-success/20 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border">
                <CheckCircle className="text-success" size={20} strokeWidth={1.5} />
              </div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h5 className="text-text-primary text-[14px] font-medium">
                    MGT-7 (Annual Return)
                  </h5>
                  <span className="bg-success/10 border-success/20 text-success rounded border px-2 py-0.5 text-[9px] font-bold tracking-wider uppercase">
                    Completed
                  </span>
                </div>
                <p className="text-text-muted flex items-center gap-1 text-[12px]">
                  <CheckCircle size={12} /> Filed on Oct 22, 2025. Receipt ID: #88129-L
                </p>
              </div>
            </div>
            <button className="border-border-default text-text-muted flex shrink-0 cursor-default items-center gap-1.5 self-start rounded-lg border px-4 py-1.5 text-[12px] font-medium sm:self-center">
              <Download size={12} /> Download
            </button>
          </div>
        </div>
      </div>

      {/* Bonus Section: Regulatory Insight */}
      <div className="bg-gold-subtle border-gold-border group relative overflow-hidden rounded-xl border p-5">
        <div className="relative z-10 flex gap-4">
          <div className="bg-gold/10 text-gold border-gold/20 h-fit shrink-0 rounded-lg border p-1.5">
            <Lightbulb size={20} strokeWidth={1.5} />
          </div>
          <div className="space-y-1">
            <h4 className="text-gold font-serif text-[16px] font-semibold">
              Recent Update: GST Notification 12/2025
            </h4>
            <p className="text-text-secondary text-[13px] leading-relaxed">
              New ITC claim restrictions apply for companies with inter-state service transactions
              exceeding ₹5Cr. Your SaaS subscription revenue may trigger additional GSTR-2B
              reconciliations.
            </p>
          </div>
        </div>
        <div className="from-gold/5 pointer-events-none absolute top-0 right-0 h-full w-32 bg-gradient-to-l to-transparent"></div>
      </div>
    </div>
  );
}
