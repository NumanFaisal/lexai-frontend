import { Scale, FileText, ClipboardCheck } from 'lucide-react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full bg-bg-primary text-text-primary">
      {/* Left side: Branding & Product details */}
      <div className="hidden lg:flex w-[42%] flex-col justify-between p-16 bg-bg-secondary border-r border-border-default relative overflow-hidden">
        {/* Glow decoration */}
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-gold/5 blur-[100px] pointer-events-none" />
        
        {/* Header Logo (Non-interactive branding) */}
        <div className="flex items-center gap-3 relative z-10 cursor-default select-none">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold/10 border border-gold-border cursor-default">
            <Scale className="h-5 w-5 text-gold" strokeWidth={1.5} />
          </div>
          <div className="cursor-default">
            <h1 className="font-serif text-lg font-bold text-text-primary tracking-wide">
              LexAI
            </h1>
            <p className="text-[8px] font-medium uppercase tracking-[2px] text-gold">
              Indian Law · AI
            </p>
          </div>
        </div>

        {/* Main Pitch */}
        <div className="space-y-8 my-auto relative z-10 max-w-[420px]">
          <h2 className="font-serif text-[42px] leading-tight font-bold text-text-primary">
            India&apos;s Legal AI
          </h2>
          <p className="text-[14px] text-text-secondary leading-relaxed">
            Research. Draft. Comply. All in one platform built for Indian law.
          </p>

          <ul className="space-y-6 pt-4">
            <li className="flex items-start gap-3">
              <div className="w-5 h-5 rounded bg-gold/10 border border-gold-border flex items-center justify-center shrink-0 mt-0.5">
                <Scale size={12} className="text-gold" />
              </div>
              <span className="text-[13px] text-text-secondary leading-relaxed">
                Covers IPC, BNS 2023, CrPC, GST Act, Companies Act and 50+ more.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-5 h-5 rounded bg-gold/10 border border-gold-border flex items-center justify-center shrink-0 mt-0.5">
                <FileText size={12} className="text-gold" />
              </div>
              <span className="text-[13px] text-text-secondary leading-relaxed">
                Draft Section 138 NI Act notices, rent agreements, employment contracts.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-5 h-5 rounded bg-gold/10 border border-gold-border flex items-center justify-center shrink-0 mt-0.5">
                <ClipboardCheck size={12} className="text-gold" />
              </div>
              <span className="text-[13px] text-text-secondary leading-relaxed">
                Check GST, DPDP, labour compliance for your business.
              </span>
            </li>
          </ul>
        </div>

        {/* Testimonial Quote */}
        <div className="space-y-6 relative z-10">
          <div className="bg-bg-primary/60 border border-border-default/80 p-5 rounded-xl max-w-[420px] backdrop-blur-sm">
            <p className="font-serif text-[13px] leading-relaxed text-text-primary italic">
              &quot;LexAI saved me 4 hours last week on a bail application.&quot;
            </p>
            <p className="text-[11px] text-text-muted mt-3">
              — Adv. Priya Sharma, Delhi HC
            </p>
          </div>
          
          <div className="text-[11px] font-mono text-text-muted">
            © 2025 LexAI • Built in Patna, Bihar
          </div>
        </div>
      </div>

      {/* Right side: Dynamic forms container */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 md:p-12 overflow-y-auto">
        <div className="w-full max-w-[440px]">
          {children}
        </div>
      </div>
    </div>
  );
}
