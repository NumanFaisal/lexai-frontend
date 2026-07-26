import { Scale, FileText, ClipboardCheck } from 'lucide-react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-bg-primary text-text-primary flex min-h-screen w-full">
      {/* Left side: Branding & Product details */}
      <div className="bg-bg-secondary border-border-default relative hidden w-[42%] flex-col justify-between overflow-hidden border-r p-16 lg:flex">
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
        <div className="relative z-10 my-auto max-w-[420px] space-y-8">
          <h2 className="text-text-primary font-serif text-[42px] leading-tight font-bold">
            India&apos;s Legal AI
          </h2>
          <p className="text-text-secondary text-[14px] leading-relaxed">
            Research. Draft. Comply. All in one platform built for Indian law.
          </p>

          <ul className="space-y-6 pt-4">
            <li className="flex items-start gap-3">
              <div className="bg-gold/10 border-gold-border mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border">
                <Scale size={12} className="text-gold" />
              </div>
              <span className="text-text-secondary text-[13px] leading-relaxed">
                Covers IPC, BNS 2023, CrPC, GST Act, Companies Act and 50+ more.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="bg-gold/10 border-gold-border mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border">
                <FileText size={12} className="text-gold" />
              </div>
              <span className="text-text-secondary text-[13px] leading-relaxed">
                Draft Section 138 NI Act notices, rent agreements, employment contracts.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="bg-gold/10 border-gold-border mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border">
                <ClipboardCheck size={12} className="text-gold" />
              </div>
              <span className="text-text-secondary text-[13px] leading-relaxed">
                Check GST, DPDP, labour compliance for your business.
              </span>
            </li>
          </ul>
        </div>

        {/* Testimonial Quote */}
        <div className="relative z-10 space-y-6">
          <div className="bg-bg-primary/60 border-border-default/80 max-w-[420px] rounded-xl border p-5 backdrop-blur-sm">
            <p className="text-text-primary font-serif text-[13px] leading-relaxed italic">
              &quot;LexAI saved me 4 hours last week on a bail application.&quot;
            </p>
            <p className="text-text-muted mt-3 text-[11px]">— Adv. Priya Sharma, Delhi HC</p>
          </div>

          <div className="text-text-muted font-mono text-[11px]">
            © 2025 LexAI • Built in Patna, Bihar
          </div>
        </div>
      </div>

      {/* Right side: Dynamic forms container */}
      <div className="flex flex-1 flex-col items-center justify-center overflow-y-auto p-6 md:p-12">
        <div className="w-full max-w-[440px]">{children}</div>
      </div>
    </div>
  );
}
