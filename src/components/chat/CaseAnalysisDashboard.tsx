'use client';

import { 
  Scale, 
  AlertTriangle, 
  CheckCircle, 
  BookOpen, 
  ChevronRight, 
  ShieldCheck, 
  FileText,
  HelpCircle
} from 'lucide-react';

export default function CaseAnalysisDashboard() {
  const precedents = [
    {
      title: 'Gurbaksh Singh Sibbia v. State of Punjab (1980)',
      citation: '1980 SCC (2) 565',
      court: 'Supreme Court of India (Constitution Bench)',
      ratio: 'A Constitutional Bench settled the scope of Sec 438 CrPC, holding that the power of anticipatory bail is of wide amplitude and shouldn\'t be hedged by unnecessary conditions unless required by facts.',
      verified: true
    },
    {
      title: 'Sushila Aggarwal v. State (NCT of Delhi) (2020)',
      citation: '2020 5 SCC 1',
      court: 'Supreme Court of India (5-Judge Bench)',
      ratio: 'Clarified that protection granted under Section 438 CrPC does not automatically expire at the stage of framing of charges and can continue till the end of the trial in appropriate cases.',
      verified: true
    }
  ];

  const sections = [
    {
      code: 'Section 438 CrPC',
      title: 'Direction for grant of bail to person apprehending arrest',
      desc: 'Enables any person who has reason to believe that they may be arrested on accusation of having committed a non-bailable offence to apply to the High Court or the Court of Session.'
    },
    {
      code: 'Section 420 IPC / Section 318 BNS',
      title: 'Cheating and dishonestly inducing delivery of property',
      desc: 'Deals with offences where individuals cheat and dishonestly induce delivery of property. Carries a maximum punishment of 7 years of imprisonment and a fine.'
    }
  ];

  const argumentsChecklist = [
    { text: 'Establish absence of custodial interrogation necessity', checked: true },
    { text: 'Provide evidence of deep roots in society to counter flight risk', checked: true },
    { text: 'Demonstrate clean political and criminal background checks', checked: true },
    { text: 'Highlight commercial/civil nature of dispute to disprove criminal intent', checked: false },
    { text: 'Secure undertaking to cooperate fully with investigation officer', checked: false }
  ];

  return (
    <div className="w-full space-y-6">
      {/* Header Section */}
      <div className="space-y-2">
        <span className="font-mono text-[11px] font-semibold text-gold tracking-[0.2em] uppercase">
          Case Analysis & Precedents
        </span>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="font-serif text-[26px] md:text-[32px] font-semibold text-text-primary leading-tight font-serif">
              Anticipatory Bail Application — FY 2025-26
            </h2>
            <p className="text-text-secondary text-[13px] md:text-[14px] mt-1">
              Case evaluation under Sec 438 CrPC and IPC offences. Jurisdiction: Delhi High Court.
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-[12px] text-[#BE7B7B] bg-[#BE7B7B]/10 border border-[#BE7B7B]/20 w-fit px-3 py-1 rounded-full font-medium shrink-0 h-fit">
            <AlertTriangle size={13} /> High Legal Risk
          </div>
        </div>
      </div>

      {/* Grid: Overview and Strategy */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Case facts summary */}
        <div className="lg:col-span-7 bg-bg-secondary border border-border-default rounded-xl p-5 md:p-6 space-y-4">
          <h3 className="font-serif text-[18px] font-semibold text-text-primary flex items-center gap-2">
            <FileText size={18} className="text-gold" /> Case Fact Evaluation
          </h3>
          <p className="text-text-secondary text-[13px] leading-relaxed">
            The dispute arises out of an alleged commercial contract default, which the complainant has framed as a criminal breach of trust and cheating (Section 420 IPC). Given that the dispute involves bank transfers and documented business emails, there is a strong foundation to argue that the matter is purely civil, reducing the necessity of custodial arrest.
          </p>

          <div className="border-t border-border-default pt-4 space-y-3">
            <h4 className="text-[12px] font-semibold text-text-primary uppercase tracking-wider">
              Applicable Statutes
            </h4>
            <div className="space-y-3">
              {sections.map((sec, idx) => (
                <div key={idx} className="bg-bg-primary/50 border border-border-default p-3.5 rounded-lg flex items-start gap-3">
                  <div className="shrink-0 p-1.5 rounded bg-gold/10 text-gold text-[12px] font-mono font-bold">
                    {idx + 1}
                  </div>
                  <div>
                    <h5 className="text-[13px] font-semibold text-text-primary">
                      {sec.code}: <span className="font-sans font-medium text-text-secondary">{sec.title}</span>
                    </h5>
                    <p className="text-[11.5px] text-text-muted mt-1 leading-relaxed">
                      {sec.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tactical Strategy */}
        <div className="lg:col-span-5 bg-bg-secondary border border-border-default rounded-xl p-5 md:p-6 space-y-4">
          <h3 className="font-serif text-[18px] font-semibold text-text-primary flex items-center gap-2">
            <Scale size={18} className="text-gold" /> Defense Arguments Strategy
          </h3>
          <p className="text-text-secondary text-[13px] leading-relaxed">
            Prioritize the civil nature of the transaction. The following arguments checklist should be incorporated in the pleading draft:
          </p>

          <div className="space-y-2 pt-2">
            {argumentsChecklist.map((arg, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-[12px]">
                <input 
                  type="checkbox" 
                  checked={arg.checked} 
                  readOnly 
                  className="mt-0.5 rounded border-border-default text-gold focus:ring-gold bg-bg-primary"
                />
                <span className={arg.checked ? 'text-text-secondary' : 'text-text-primary font-medium'}>
                  {arg.text}
                </span>
              </div>
            ))}
          </div>

          <div className="bg-gold-subtle border border-gold-border rounded-lg p-4 mt-6">
            <h4 className="text-gold font-serif text-[13px] font-semibold flex items-center gap-1.5">
              <HelpCircle size={14} /> Tactical Council Tip
            </h4>
            <p className="text-text-secondary text-[11.5px] mt-1 leading-relaxed">
              Ensure you apply for interim protection along with the main application. If the sessions court rejects the petition, immediately approach the High Court with a copy of the sessions order to prevent arrest during the transit period.
            </p>
          </div>
        </div>
      </div>

      {/* Landmark Precedents Section */}
      <div className="space-y-3">
        <h3 className="font-serif text-[20px] font-semibold text-text-primary">
          Landmark Supreme Court Precedents
        </h3>
        
        <div className="space-y-3">
          {precedents.map((prec, idx) => (
            <div key={idx} className="bg-bg-secondary border border-border-default rounded-xl p-5 flex flex-col md:flex-row md:items-start justify-between gap-4 hover:border-gold/30 transition-all duration-200">
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <h4 className="text-[15px] font-serif font-bold text-text-primary">
                    {prec.title}
                  </h4>
                  <span className="font-mono text-[11px] text-gold bg-gold-subtle border border-gold-border px-2.5 py-0.5 rounded">
                    {prec.citation}
                  </span>
                </div>
                <p className="text-text-muted text-[11px] font-medium uppercase tracking-wide">
                  {prec.court}
                </p>
                <p className="text-text-secondary text-[12.5px] leading-relaxed">
                  <strong className="text-text-primary font-medium">Held:</strong> {prec.ratio}
                </p>
              </div>

              <div className="shrink-0 flex items-center gap-1 text-[11px] text-success bg-success/10 border border-success/20 px-2.5 py-0.5 rounded h-fit font-medium">
                <ShieldCheck size={12} /> Verified Citation
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
