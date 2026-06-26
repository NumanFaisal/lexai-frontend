'use client';

import { 
  AlertTriangle, 
  Clock, 
  CheckCircle, 
  FileText, 
  UserCheck, 
  Lightbulb, 
  Download,
  AlertCircle
} from 'lucide-react';

export default function ComplianceDashboard() {
  return (
    <div className="w-full space-y-6">
      {/* Header Section */}
      <div className="space-y-2">
        <span className="font-mono text-[11px] font-semibold text-gold tracking-[0.2em] uppercase">
          Compliance Audit
        </span>
        <div>
          <h2 className="font-serif text-[26px] md:text-[32px] font-semibold text-text-primary leading-tight font-serif">
            Private Limited Company (SaaS) — FY 2025-26
          </h2>
          <p className="text-text-secondary text-[13px] md:text-[14px] mt-1">
            Based on Companies Act 2013 and GST rules. Last sync with MCA portal: 2 hours ago.
          </p>
        </div>
      </div>

      {/* Summary Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: Action Required */}
        <div className="bg-bg-secondary border border-error/20 rounded-xl p-5 relative overflow-hidden group hover:border-error/40 transition-colors duration-200">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-error/5 rounded-full blur-2xl group-hover:bg-error/10 transition-all duration-300"></div>
          <h3 className="text-error text-[44px] font-serif leading-none font-semibold">2</h3>
          <p className="text-text-secondary text-[12px] font-medium mt-1 uppercase tracking-wider">
            Action Required
          </p>
          <div className="mt-4 flex items-center gap-1.5 text-[11px] text-error bg-error/10 w-fit px-2.5 py-0.5 rounded-md font-medium">
            <AlertTriangle size={12} /> High Risk
          </div>
        </div>

        {/* Card 2: Due within 30 days */}
        <div className="bg-bg-secondary border border-warning/20 rounded-xl p-5 relative overflow-hidden group hover:border-warning/40 transition-colors duration-200">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-warning/5 rounded-full blur-2xl group-hover:bg-warning/10 transition-all duration-300"></div>
          <h3 className="text-warning text-[44px] font-serif leading-none font-semibold">3</h3>
          <p className="text-text-secondary text-[12px] font-medium mt-1 uppercase tracking-wider">
            Due within 30 days
          </p>
          <div className="mt-4 flex items-center gap-1.5 text-[11px] text-warning bg-warning/10 w-fit px-2.5 py-0.5 rounded-md font-medium">
            <Clock size={12} /> Critical
          </div>
        </div>

        {/* Card 3: Up to date */}
        <div className="bg-bg-secondary border border-success/20 rounded-xl p-5 relative overflow-hidden group hover:border-success/40 transition-colors duration-200">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-success/5 rounded-full blur-2xl group-hover:bg-success/10 transition-all duration-300"></div>
          <h3 className="text-success text-[44px] font-serif leading-none font-semibold">14</h3>
          <p className="text-text-secondary text-[12px] font-medium mt-1 uppercase tracking-wider">
            Up to date
          </p>
          <div className="mt-4 flex items-center gap-1.5 text-[11px] text-success bg-success/10 w-fit px-2.5 py-0.5 rounded-md font-medium">
            <CheckCircle size={12} /> Compliant
          </div>
        </div>
      </div>

      {/* Checklist Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-serif text-[18px] md:text-[20px] font-semibold text-text-primary">
            Ministry of Corporate Affairs (MCA) Filings
          </h4>
          <button className="text-gold text-[12px] font-medium hover:underline hover:text-gold-hover transition-colors">
            View All
          </button>
        </div>

        <div className="bg-bg-secondary border border-border-default rounded-xl divide-y divide-border-default overflow-hidden">
          {/* Item 1: AOC-4 */}
          <div className="p-4 md:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-bg-tertiary/40 transition-colors duration-150">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-error/10 border border-error/20 flex items-center justify-center shrink-0">
                <FileText className="text-error" size={20} strokeWidth={1.5} />
              </div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h5 className="text-text-primary text-[14px] font-medium">
                    AOC-4 (Financial Statement Filing)
                  </h5>
                  <span className="px-2 py-0.5 bg-error/20 border border-error/30 text-error text-[9px] rounded font-bold tracking-wider uppercase">
                    Overdue
                  </span>
                </div>
                <p className="text-error text-[12px] flex items-center gap-1">
                  <AlertCircle size={12} /> Penalty of ₹100/day applies since Oct 30, 2025.
                </p>
              </div>
            </div>
            <button className="self-start sm:self-center px-4 py-1.5 bg-error text-bg-primary font-medium text-[12px] rounded-lg hover:bg-error/90 active:scale-[0.98] transition-all shrink-0">
              Fix now
            </button>
          </div>

          {/* Item 2: DIR-3 KYC */}
          <div className="p-4 md:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-bg-tertiary/40 transition-colors duration-150">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-warning/10 border border-warning/20 flex items-center justify-center shrink-0">
                <UserCheck className="text-warning" size={20} strokeWidth={1.5} />
              </div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h5 className="text-text-primary text-[14px] font-medium">
                    DIR-3 KYC (Director KYC)
                  </h5>
                  <span className="px-2 py-0.5 bg-warning/10 border border-warning/20 text-warning text-[9px] rounded font-bold tracking-wider uppercase">
                    Upcoming
                  </span>
                </div>
                <p className="text-text-secondary text-[12px] flex items-center gap-1">
                  <Clock size={12} /> Due in 14 days (Deadline: Dec 15, 2025).
                </p>
              </div>
            </div>
            <button className="self-start sm:self-center px-4 py-1.5 border border-border-default text-text-secondary font-medium text-[12px] rounded-lg hover:text-text-primary hover:border-text-secondary active:scale-[0.98] transition-all shrink-0">
              Prepare
            </button>
          </div>

          {/* Item 3: MGT-7 */}
          <div className="p-4 md:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-bg-tertiary/40 transition-colors duration-150">
            <div className="flex items-start gap-4 opacity-75">
              <div className="w-10 h-10 rounded-lg bg-success/10 border border-success/20 flex items-center justify-center shrink-0">
                <CheckCircle className="text-success" size={20} strokeWidth={1.5} />
              </div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h5 className="text-text-primary text-[14px] font-medium">
                    MGT-7 (Annual Return)
                  </h5>
                  <span className="px-2 py-0.5 bg-success/10 border border-success/20 text-success text-[9px] rounded font-bold tracking-wider uppercase">
                    Completed
                  </span>
                </div>
                <p className="text-text-muted text-[12px] flex items-center gap-1">
                  <CheckCircle size={12} /> Filed on Oct 22, 2025. Receipt ID: #88129-L
                </p>
              </div>
            </div>
            <button className="self-start sm:self-center px-4 py-1.5 border border-border-default text-text-muted font-medium text-[12px] rounded-lg cursor-default flex items-center gap-1.5 shrink-0">
              <Download size={12} /> Download
            </button>
          </div>
        </div>
      </div>

      {/* Bonus Section: Regulatory Insight */}
      <div className="bg-gold-subtle border border-gold-border rounded-xl p-5 relative overflow-hidden group">
        <div className="flex gap-4 relative z-10">
          <div className="shrink-0 p-1.5 rounded-lg bg-gold/10 text-gold border border-gold/20 h-fit">
            <Lightbulb size={20} strokeWidth={1.5} />
          </div>
          <div className="space-y-1">
            <h4 className="text-gold font-serif text-[16px] font-semibold font-serif">
              Recent Update: GST Notification 12/2025
            </h4>
            <p className="text-text-secondary text-[13px] leading-relaxed">
              New ITC claim restrictions apply for companies with inter-state service transactions exceeding ₹5Cr. Your SaaS subscription revenue may trigger additional GSTR-2B reconciliations.
            </p>
          </div>
        </div>
        <div className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-gold/5 to-transparent pointer-events-none"></div>
      </div>
    </div>
  );
}
