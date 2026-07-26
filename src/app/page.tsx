'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Scale,
  FileText,
  ClipboardCheck,
  Search,
  ArrowRight,
  ShieldCheck,
  BookOpen,
  Check,
  Quote,
  ChevronDown,
  ChevronUp,
  Cpu,
  Lock,
  Terminal,
  ExternalLink,
  Settings,
  AlertTriangle,
  HelpCircle,
  Database,
  ArrowRightLeft,
  Briefcase,
  HelpCircle as FaqIcon,
} from 'lucide-react';
import { useAppSelector } from '@/store';

export default function HomePage() {
  const { user } = useAppSelector((s) => s.auth);
  const [activeTab, setActiveTab] = useState<'research' | 'drafting' | 'compliance' | 'case'>(
    'research'
  );
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "How accurate is LexAI's citation engine?",
      a: 'LexAI utilizes an advanced citation verification model that cross-references statutory references with our database of over 1.2M High Court and Supreme Court judgments. Every citation is verified to minimize AI hallucinations.',
    },
    {
      q: 'Does it support the new criminal codes (BNS, BNSS, BSA)?',
      a: 'Yes. LexAI is fully fine-tuned on the new Bharatiya Nyaya Sanhita (BNS), Bharatiya Nagarik Suraksha Sanhita (BNSS), and Bharatiya Sakshya Adhiniyam (BSA), as well as the older IPC, CrPC, and Evidence Act for retroactivity analysis.',
    },
    {
      q: "Is my firm's case data and client files secure?",
      a: 'Security is our highest priority. All queries and drafts are locally sandboxed and encrypted with zero-retention policies on our servers. Your sensitive corporate client data is never used to train global models.',
    },
    {
      q: 'Can I export drafted contracts to Word or PDF?',
      a: 'Absolutely. Once the Draft Editor generates your contract, you can edit it live in our browser editor and export it to clean, pre-formatted DOCX or PDF format instantly.',
    },
    {
      q: 'How does LexAI monitor regulatory compliance?',
      a: 'Our compliance system integrates with government notification feeds (MCA, GSTN, SEBI, CBDT). When you query compliance, it compares your company parameters against the latest circulars to flag outstanding audits and filings.',
    },
  ];

  return (
    <div className="bg-bg-primary text-text-primary relative flex min-h-screen flex-col overflow-hidden antialiased">
      {/* Decorative Background Grid & Glows */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(to_right,#111113_1px,transparent_1px),linear-gradient(to_bottom,#111113_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] bg-[size:4rem_4rem]" />
      <div className="bg-gold/5 pointer-events-none absolute top-0 left-1/4 z-0 h-[500px] w-[500px] rounded-full blur-[120px]" />
      <div className="bg-gold/3 pointer-events-none absolute top-[800px] right-1/4 z-0 h-[600px] w-[600px] rounded-full blur-[150px]" />

      {/* Top Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-bg-secondary/80 backdrop-blur-md border-b border-border-default flex justify-between items-center px-6 md:px-12 h-[52px]">
        <div className="flex items-center gap-2 cursor-default select-none">
          <span className="text-gold text-lg">⚖</span>
          <span className="text-text-primary font-serif text-[18px] font-bold tracking-wide">
            LexAI
          </span>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-text-secondary hidden font-mono text-[12px] sm:inline">
                // {user.username}
              </span>
              <Link
                href="/chat"
                className="bg-gold text-bg-primary hover:bg-gold-hover rounded-[6px] px-4 py-1.5 font-sans text-[12px] font-medium tracking-wide uppercase transition-colors"
              >
                Go to Dashboard
              </Link>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="text-text-secondary hover:text-text-primary font-sans text-[13px] font-medium transition-colors"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="bg-gold text-bg-primary hover:bg-gold-hover rounded-[6px] px-4 py-1.5 font-sans text-[12px] font-bold tracking-wide uppercase transition-colors"
              >
                Start Free
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Main content */}
      <main className="relative z-10 flex-grow pt-[52px]">
        {/* HERO SECTION */}
        <section className="mx-auto mt-6 flex max-w-[1200px] flex-col items-center justify-center px-6 py-20 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-gold bg-gold/10 border-gold-border mb-4 rounded-full border px-3 py-1 font-mono text-[11px] tracking-[3px] uppercase"
          >
            Sovereign Legal Intelligence
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-text-primary mb-6 max-w-[900px] font-serif text-[44px] leading-[1.1] font-bold md:text-[64px]"
          >
            Sovereign Legal Intelligence <br className="hidden md:inline" />
            <span className="from-gold bg-gradient-to-r to-[#f0d89e] bg-clip-text text-transparent">
              For Indian Jurisdictions
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-text-secondary mb-10 max-w-[620px] font-sans text-[16px] leading-relaxed md:text-[18px]"
          >
            Deploy fine-tuned AI counsel trained on Indian statutes, civil codes, and circulars.
            Streamline research, auto-draft agreements, and audit compliance instantly.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-20 flex flex-col items-center gap-4 sm:flex-row"
          >
            {user ? (
              <Link
                href="/chat"
                className="bg-gold text-bg-primary hover:bg-gold-hover shadow-gold/15 flex items-center gap-2 rounded-[8px] px-8 py-3.5 font-sans text-[14px] font-bold tracking-wider uppercase shadow-lg transition-all"
              >
                Go to Dashboard <ArrowRight size={16} />
              </Link>
            ) : (
              <>
                <Link
                  href="/signup"
                  className="bg-gold text-bg-primary hover:bg-gold-hover shadow-gold/15 rounded-[8px] px-8 py-3.5 font-sans text-[14px] font-bold tracking-wider uppercase shadow-lg transition-all"
                >
                  Start Free — No Card Required
                </Link>
                <a
                  href="#showcase"
                  className="text-gold border-border-default hover:border-gold hover:bg-gold/5 flex items-center gap-2 rounded-[8px] border bg-transparent px-8 py-3.5 font-sans text-[14px] font-bold transition-all"
                >
                  See how it works <ArrowRight size={16} />
                </a>
              </>
            )}
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-text-muted border-border-default/60 flex w-full max-w-[900px] flex-wrap justify-center gap-8 border-y py-6 text-[12px] font-medium md:gap-16"
          >
            <div className="flex items-center gap-2.5">
              <ShieldCheck size={18} className="text-gold" />
              <span>10,000+ Advocates Active</span>
            </div>
            <div className="bg-border-default hidden h-6 w-px md:block"></div>
            <div className="flex items-center gap-2.5">
              <Database size={18} className="text-gold" />
              <span>1.2 Million Precedents Indexed</span>
            </div>
            <div className="bg-border-default hidden h-6 w-px md:block"></div>
            <div className="flex items-center gap-2.5 font-mono text-[11px] tracking-wide uppercase">
              <span>BNS • BNSs • BSA • Companies Act</span>
            </div>
          </motion.div>
        </section>

        {/* FEATURES GRID SECTION */}
        <section className="border-border-default/60 mx-auto max-w-[1200px] border-t px-6 py-20">
          <div className="mx-auto mb-16 max-w-[600px] text-center">
            <span className="text-gold mb-2 block font-mono text-[11px] tracking-[2px] uppercase">
              Capabilities
            </span>
            <h2 className="text-text-primary font-serif text-[32px] font-bold md:text-[40px]">
              Comprehensive Suite for Legal Operations
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Card 1 */}
            <div className="bg-bg-secondary border-border-default hover:border-gold group relative flex h-full flex-col rounded-xl border p-[28px] transition-all duration-300 hover:shadow-[0_10px_30px_rgba(201,168,76,0.04)]">
              <div className="bg-gold absolute top-0 left-0 h-[2px] w-8 rounded-tl-xl"></div>
              <div className="bg-gold/10 text-gold border-gold-border mb-6 flex h-12 w-12 items-center justify-center rounded-full border">
                <Search size={20} strokeWidth={1.5} />
              </div>
              <h3 className="text-text-primary mb-3 font-serif text-[18px] font-semibold">
                Legal Research
              </h3>
              <p className="text-text-secondary flex-grow text-[13px] leading-relaxed">
                Ask any question about Indian statutes. Get answers fully cited under BNS, IPC, and
                regional acts.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-bg-secondary border-border-default hover:border-business group relative flex h-full flex-col rounded-xl border p-[28px] transition-all duration-300 hover:shadow-[0_10px_30px_rgba(123,158,135,0.04)]">
              <div className="bg-business absolute top-0 left-0 h-[2px] w-8 rounded-tl-xl"></div>
              <div className="bg-business/10 text-business border-business/20 mb-6 flex h-12 w-12 items-center justify-center rounded-full border">
                <FileText size={20} strokeWidth={1.5} />
              </div>
              <h3 className="text-text-primary mb-3 font-serif text-[18px] font-semibold">
                Contract Drafting
              </h3>
              <p className="text-text-secondary flex-grow text-[13px] leading-relaxed">
                Describe terms, outline considerations, or input custom clauses. Generate clean
                contracts instantly.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-bg-secondary border-border-default hover:border-student group relative flex h-full flex-col rounded-xl border p-[28px] transition-all duration-300 hover:shadow-[0_10px_30px_rgba(123,143,190,0.04)]">
              <div className="bg-student absolute top-0 left-0 h-[2px] w-8 rounded-tl-xl"></div>
              <div className="bg-student/10 text-student border-student/20 mb-6 flex h-12 w-12 items-center justify-center rounded-full border">
                <ClipboardCheck size={20} strokeWidth={1.5} />
              </div>
              <h3 className="text-text-primary mb-3 font-serif text-[18px] font-semibold">
                Compliance Check
              </h3>
              <p className="text-text-secondary flex-grow text-[13px] leading-relaxed">
                Audit files, analyze regulatory circulars, and monitor company status updates under
                MCA and GST.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-bg-secondary border-border-default hover:border-case-accent group relative flex h-full flex-col rounded-xl border p-[28px] transition-all duration-300 hover:shadow-[0_10px_30px_rgba(190,123,123,0.04)]">
              <div className="bg-case-accent absolute top-0 left-0 h-[2px] w-8 rounded-tl-xl"></div>
              <div className="bg-case-accent/10 text-case-accent border-case-accent/20 mb-6 flex h-12 w-12 items-center justify-center rounded-full border">
                <Scale size={20} strokeWidth={1.5} />
              </div>
              <h3 className="text-text-primary mb-3 font-serif text-[18px] font-semibold">
                Case Analysis
              </h3>
              <p className="text-text-secondary flex-grow text-[13px] leading-relaxed">
                Submit statement of facts. Match Supreme Court precedents, isolate statutory risks,
                and refine arguments.
              </p>
            </div>
          </div>
        </section>

        {/* NEW: INTERACTIVE CONSOLE SHOWCASE */}
        <section
          id="showcase"
          className="border-border-default/60 mx-auto max-w-[1200px] scroll-mt-14 border-t px-6 py-20"
        >
          <div className="mx-auto mb-12 max-w-[600px] text-center">
            <span className="text-gold mb-2 block font-mono text-[11px] tracking-[2px] uppercase">
              Live Demo
            </span>
            <h2 className="text-text-primary font-serif text-[32px] font-bold md:text-[40px]">
              Experience the Workspace
            </h2>
            <p className="text-text-secondary mt-3 text-[14px]">
              Interactive preview of the primary workflows in our application sandbox.
            </p>
          </div>

          <div className="bg-bg-secondary border-border-default/80 overflow-hidden rounded-2xl border shadow-[0_20px_50px_rgba(201,168,76,0.05)]">
            {/* Console Header */}
            <div className="bg-bg-primary border-border-default flex flex-col items-center justify-between gap-4 border-b px-6 py-4 sm:flex-row">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-1.5">
                  <span className="bg-error h-3 w-3 rounded-full opacity-70"></span>
                  <span className="bg-warning h-3 w-3 rounded-full opacity-70"></span>
                  <span className="bg-success h-3 w-3 rounded-full opacity-70"></span>
                </div>
                <div className="text-text-muted flex items-center gap-2 font-mono text-[11px]">
                  <Terminal size={12} className="text-gold" />
                  <span>LEXAI_CORE_WORKSPACE_V1.4 // SECURE_SHELL</span>
                </div>
              </div>
              {/* Tabs */}
              <div className="bg-bg-secondary border-border-default flex flex-wrap items-center gap-1 rounded-lg border p-1">
                {(['research', 'drafting', 'compliance', 'case'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`rounded-md px-3 py-1.5 font-mono text-[11px] font-medium tracking-wide uppercase transition-all ${
                      activeTab === tab
                        ? 'bg-gold text-bg-primary font-bold shadow'
                        : 'text-text-secondary hover:text-text-primary hover:bg-bg-elevated/40'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Console Body */}
            <div className="from-bg-secondary to-bg-primary flex min-h-[400px] flex-col justify-between bg-gradient-to-b p-6 md:p-8">
              <AnimatePresence mode="wait">
                {activeTab === 'research' && (
                  <motion.div
                    key="research"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="flex items-start gap-4">
                      <div className="bg-bg-elevated border-border-default text-text-muted flex h-8 w-8 shrink-0 items-center justify-center rounded border font-mono text-[11px]">
                        USR
                      </div>
                      <div className="bg-bg-elevated/40 border-border-default/60 text-text-secondary max-w-[80%] rounded-lg border p-4 text-[13px]">
                        What is the statutory limitation period for filing a commercial suit for
                        breach of contract in India?
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-gold/15 border-gold-border text-gold flex h-8 w-8 shrink-0 items-center justify-center rounded border font-serif text-[12px]">
                        ⚖
                      </div>
                      <div className="bg-bg-elevated/20 border-gold-border/30 max-w-[85%] space-y-4 rounded-lg border p-5 text-[13px] leading-relaxed">
                        <p>
                          Under the **Limitation Act, 1963**, specifically **Article 55** of the
                          Schedule, the limitation period for filing a suit for compensation for the
                          breach of any contract is **3 years**.
                        </p>
                        <p className="text-text-secondary border-gold/40 border-l-2 pl-3 italic">
                          &quot;The limitation clock begins to run from the date when the contract
                          is broken, or (where there are successive breaches) when the breach in
                          respect of which the suit is instituted occurs, or (where the breach is
                          continuing) when it ceases.&quot;
                        </p>

                        {/* Citation tag pillbox */}
                        <div className="flex flex-wrap gap-2 pt-2">
                          <span className="bg-gold/10 border-gold-border text-gold flex items-center gap-1 rounded-full border px-2.5 py-0.5 font-mono text-[10px]">
                            <BookOpen size={10} /> Limitation Act, 1963 Art. 55
                          </span>
                          <span className="bg-gold/10 border-gold-border text-gold flex items-center gap-1 rounded-full border px-2.5 py-0.5 font-mono text-[10px]">
                            <Scale size={10} /> SC: N.V. Srinivasa Murthy v. Mariyappa
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'drafting' && (
                  <motion.div
                    key="drafting"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 gap-6 lg:grid-cols-12"
                  >
                    <div className="space-y-4 lg:col-span-4">
                      <div className="bg-bg-elevated/40 border-border-default space-y-3 rounded-xl border p-4">
                        <div className="text-gold font-mono text-[11px] tracking-wider uppercase">
                          AI Drafting assistant
                        </div>
                        <p className="text-text-secondary text-[12px]">
                          Provide instruction to update drafted documents instantly.
                        </p>
                        <div className="bg-bg-primary border-border-default text-text-secondary flex items-center justify-between rounded border px-3 py-2 font-mono text-[12px]">
                          <span>Modify governing law to Delhi seat</span>
                          <span className="text-gold blink cursor-default text-[10px] font-bold">
                            |
                          </span>
                        </div>
                        <button className="bg-gold text-bg-primary hover:bg-gold-hover w-full rounded py-2 font-mono text-[11px] font-bold tracking-wider uppercase transition-colors">
                          Apply Revision
                        </button>
                      </div>
                    </div>

                    <div className="bg-bg-elevated/10 border-border-default/80 max-h-[300px] space-y-4 overflow-y-auto rounded-xl border p-6 font-serif text-[13px] shadow-inner lg:col-span-8">
                      <div className="border-border-default text-text-primary border-b pb-3 text-center text-[14px] font-bold tracking-wider">
                        MUTUAL NON-DISCLOSURE AGREEMENT
                      </div>
                      <p className="text-text-secondary leading-relaxed">
                        This Mutual Non-Disclosure Agreement (&quot;Agreement&quot;) is made and
                        entered into on this 26th day of June, 2026, by and between the disclosing
                        party and receiving party...
                      </p>
                      <div className="bg-success/5 border-success/20 text-text-primary rounded border p-3 text-[13px] leading-relaxed">
                        <div className="text-success mb-1 font-mono text-[10px] font-semibold uppercase">
                          // Section 11. GOVERNING LAW & ARBITRATION (AMENDED)
                        </div>
                        This Agreement shall be governed by and construed in accordance with the
                        laws of India. Any dispute arising out of or in connection with this
                        Agreement shall be referred to arbitration in accordance with the
                        Arbitration & Conciliation Act, 1996.{' '}
                        <span className="text-gold font-bold underline">
                          The seat and venue of arbitration shall be New Delhi, India.
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'compliance' && (
                  <motion.div
                    key="compliance"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                      <div className="bg-bg-elevated/40 border-border-default rounded-xl border p-4">
                        <div className="text-text-muted font-mono text-[11px]">AUDIT INDEX</div>
                        <div className="text-success mt-1 font-serif text-[24px] font-bold">
                          92% Compliant
                        </div>
                      </div>
                      <div className="bg-bg-elevated/40 border-border-default rounded-xl border p-4">
                        <div className="text-text-muted font-mono text-[11px]">ACTIVE ALERTS</div>
                        <div className="text-warning mt-1 font-serif text-[24px] font-bold">
                          1 Attention
                        </div>
                      </div>
                      <div className="bg-bg-elevated/40 border-border-default rounded-xl border p-4">
                        <div className="text-text-muted font-mono text-[11px]">
                          UPCOMING DEADLINES
                        </div>
                        <div className="text-text-primary mt-1 font-serif text-[24px] font-bold">
                          2 Due soon
                        </div>
                      </div>
                    </div>

                    <div className="bg-bg-elevated/20 border-border-default overflow-hidden rounded-xl border font-mono text-[12px]">
                      <div className="bg-bg-elevated/50 border-border-default text-text-muted flex justify-between border-b px-4 py-2 text-[11px]">
                        <span>COMPLIANCE OBJECT</span>
                        <span>STATUS</span>
                      </div>
                      <div className="divide-border-default divide-y">
                        <div className="flex items-center justify-between px-4 py-3">
                          <span className="text-text-primary">
                            Form AOC-4 (Financial Statements filing)
                          </span>
                          <span className="bg-success/15 border-success/30 text-success rounded border px-2 py-0.5 text-[10px]">
                            COMPLETED
                          </span>
                        </div>
                        <div className="flex items-center justify-between px-4 py-3">
                          <span className="text-text-primary">
                            Form MGT-7 (Annual Return filing)
                          </span>
                          <span className="bg-success/15 border-success/30 text-success rounded border px-2 py-0.5 text-[10px]">
                            COMPLETED
                          </span>
                        </div>
                        <div className="flex items-center justify-between px-4 py-3">
                          <span className="text-text-primary">
                            DPDP Consent Architecture Implementation
                          </span>
                          <span className="bg-warning/15 border-warning/30 text-warning rounded border px-2 py-0.5 text-[10px]">
                            ACTION REQUIRED
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'case' && (
                  <motion.div
                    key="case"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="bg-bg-elevated/30 border-border-default space-y-2 rounded-xl border p-4">
                      <div className="flex items-center gap-2">
                        <AlertTriangle size={14} className="text-warning" />
                        <span className="text-warning font-mono text-[12px]">
                          MATTER: COMMERCIAL SPECIFIC PERFORMANCE DISPUTE
                        </span>
                      </div>
                      <p className="text-text-secondary text-[13px] leading-relaxed">
                        Defendant claims specific performance of the land sale agreement is barred
                        due to plaintiff&apos;s failure to aver and prove constant readiness and
                        willingness under Section 16(c) of the Specific Relief Act, 1963.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 gap-4 font-mono text-[12px] md:grid-cols-2">
                      <div className="bg-bg-elevated/10 border-border-default space-y-3 rounded-xl border p-4">
                        <div className="text-gold text-[10px] font-bold tracking-wider uppercase">
                          Statutory Mapping
                        </div>
                        <ul className="space-y-2">
                          <li className="text-text-secondary flex items-center gap-2">
                            <Check size={12} className="text-gold" />
                            <span>Specific Relief Act § 16(c)</span>
                          </li>
                          <li className="text-text-secondary flex items-center gap-2">
                            <Check size={12} className="text-gold" />
                            <span>Contract Act, 1872 § 55 (Time essence)</span>
                          </li>
                        </ul>
                      </div>

                      <div className="bg-bg-elevated/10 border-border-default space-y-3 rounded-xl border p-4">
                        <div className="text-gold text-[10px] font-bold tracking-wider uppercase">
                          Landmark Precedents
                        </div>
                        <ul className="space-y-2">
                          <li className="text-text-secondary flex items-center gap-2">
                            <Check size={12} className="text-gold" />
                            <span className="truncate">Kanthamani v. Nasreen Ahmed (2017) SC</span>
                          </li>
                          <li className="text-text-secondary flex items-center gap-2">
                            <Check size={12} className="text-gold" />
                            <span className="truncate">Shenbagam v. KK Rathinavel (2022) SC</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Console Footer */}
              <div className="border-border-default/60 text-text-muted mt-8 flex flex-col items-center justify-between gap-4 border-t pt-4 font-mono text-[11px] sm:flex-row">
                <div className="flex items-center gap-2">
                  <span className="bg-success h-2 w-2 animate-pulse rounded-full"></span>
                  <span>SYSTEM: STANDBY // LATENCY: 24MS</span>
                </div>
                <Link
                  href="/signup"
                  className="text-gold hover:text-gold-hover flex items-center gap-1.5 transition-colors"
                >
                  Spin up local compliance sandbox <ExternalLink size={12} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* NEW: HOW IT WORKS (LEGAL INTELLIGENCE PIPELINE) */}
        <section className="border-border-default/60 mx-auto max-w-[1200px] border-t px-6 py-20">
          <div className="mx-auto mb-16 max-w-[600px] text-center">
            <span className="text-gold mb-2 block font-mono text-[11px] tracking-[2px] uppercase">
              Workflow
            </span>
            <h2 className="text-text-primary font-serif text-[32px] font-bold md:text-[40px]">
              Sovereign Processing Pipeline
            </h2>
            <p className="text-text-secondary mt-3 text-[14px]">
              From raw litigation facts to court-ready legal drafts.
            </p>
          </div>

          <div className="relative grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Desktop connecting lines */}
            <div className="from-gold/30 via-gold/10 to-gold/30 absolute top-[60px] right-[25%] left-[25%] z-0 hidden h-[1px] bg-gradient-to-r md:block"></div>

            {/* Step 1 */}
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="bg-bg-secondary border-border-default hover:border-gold relative mb-6 flex h-[120px] w-[120px] items-center justify-center rounded-full border transition-colors duration-300">
                <span className="bg-gold text-bg-primary absolute -top-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full font-mono text-[12px] font-bold shadow">
                  01
                </span>
                <Cpu className="text-gold" size={32} strokeWidth={1.5} />
              </div>
              <h3 className="text-text-primary mb-3 font-serif text-[18px] font-semibold">
                1. Context Ingestion
              </h3>
              <p className="text-text-secondary max-w-[280px] text-[13px] leading-relaxed">
                Paste case statements, Upload compliance logs, or input custom clauses.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="bg-bg-secondary border-border-default hover:border-gold relative mb-6 flex h-[120px] w-[120px] items-center justify-center rounded-full border transition-colors duration-300">
                <span className="bg-gold text-bg-primary absolute -top-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full font-mono text-[12px] font-bold shadow">
                  02
                </span>
                <ArrowRightLeft className="text-gold" size={32} strokeWidth={1.5} />
              </div>
              <h3 className="text-text-primary mb-3 font-serif text-[18px] font-semibold">
                2. Precedent Graph Search
              </h3>
              <p className="text-text-secondary max-w-[280px] text-[13px] leading-relaxed">
                Our model cross-references 50+ acts and 1.2M precedents for relevant rulings.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="bg-bg-secondary border-border-default hover:border-gold relative mb-6 flex h-[120px] w-[120px] items-center justify-center rounded-full border transition-colors duration-300">
                <span className="bg-gold text-bg-primary absolute -top-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full font-mono text-[12px] font-bold shadow">
                  03
                </span>
                <Check className="text-gold" size={32} strokeWidth={1.5} />
              </div>
              <h3 className="text-text-primary mb-3 font-serif text-[18px] font-semibold">
                3. Resolution Output
              </h3>
              <p className="text-text-secondary max-w-[280px] text-[13px] leading-relaxed">
                Obtain verified citations, interactive compliance reports, or legal drafts.
              </p>
            </div>
          </div>
        </section>

        {/* NEW: SOVEREIGN TRUST PILLARS */}
        <section className="border-border-default/60 mx-auto max-w-[1200px] border-t px-6 py-20">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <div className="space-y-6 lg:col-span-5">
              <span className="text-gold block font-mono text-[11px] tracking-[2px] uppercase">
                Infrastructure
              </span>
              <h2 className="text-text-primary font-serif text-[32px] leading-tight font-bold md:text-[40px]">
                Designed for Sovereign Indian Compliance
              </h2>
              <p className="text-text-secondary text-[14px] leading-relaxed">
                LexAI is engineered with strict adherence to Indian bar council ethics guidelines,
                corporate data governance regulations, and high-security compliance mandates.
              </p>
              <div className="space-y-4 pt-4">
                <div className="flex items-start gap-3">
                  <div className="bg-gold/10 border-gold-border mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border">
                    <Check size={12} className="text-gold" />
                  </div>
                  <div>
                    <h4 className="text-text-primary text-[13px] font-semibold">
                      100% On-Premise Sandboxing
                    </h4>
                    <p className="text-text-muted text-[11px]">
                      Option to deploy local instances inside private counsel firewalls.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-gold/10 border-gold-border mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border">
                    <Check size={12} className="text-gold" />
                  </div>
                  <div>
                    <h4 className="text-text-primary text-[13px] font-semibold">
                      Bar Ethics Alignment
                    </h4>
                    <p className="text-text-muted text-[11px]">
                      Citations include linkbacks to original gazettes and court reporters.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-7">
              <div className="bg-bg-secondary border-border-default space-y-4 rounded-2xl border p-8">
                <Lock className="text-gold" size={24} strokeWidth={1.5} />
                <h3 className="text-text-primary font-serif text-[18px] font-semibold">
                  Zero-Data Retention
                </h3>
                <p className="text-text-secondary text-[12px] leading-relaxed">
                  Your workspace is encrypted. We do not index queries or upload documents for
                  public model training.
                </p>
              </div>

              <div className="bg-bg-secondary border-border-default space-y-4 rounded-2xl border p-8">
                <Database className="text-gold" size={24} strokeWidth={1.5} />
                <h3 className="text-text-primary font-serif text-[18px] font-semibold">
                  Precedent Database
                </h3>
                <p className="text-text-secondary text-[12px] leading-relaxed">
                  Continuously updated indexing of judgments across the Supreme Court and all 25
                  State High Courts.
                </p>
              </div>

              <div className="bg-bg-secondary border-border-default space-y-4 rounded-2xl border p-8">
                <Cpu className="text-gold" size={24} strokeWidth={1.5} />
                <h3 className="text-text-primary font-serif text-[18px] font-semibold">
                  Fine-Tuned LLM
                </h3>
                <p className="text-text-secondary text-[12px] leading-relaxed">
                  Avoid generic public models. Rely on models explicitly fine-tuned for legal
                  vernacular and act structures.
                </p>
              </div>

              <div className="bg-bg-secondary border-border-default space-y-4 rounded-2xl border p-8">
                <ShieldCheck className="text-gold" size={24} strokeWidth={1.5} />
                <h3 className="text-text-primary font-serif text-[18px] font-semibold">
                  BNS Ready
                </h3>
                <p className="text-text-secondary text-[12px] leading-relaxed">
                  Integrated with comprehensive transition tables for older IPC and the new BNS
                  criminal act mapping.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SOCIAL PROOF SECTION */}
        <section className="border-border-default/60 mx-auto max-w-[1200px] border-t px-6 py-20">
          <h2 className="text-text-primary mb-12 text-center font-serif text-[28px] font-semibold">
            Trusted by Advocates Across India
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Testimonial 1 */}
            <div className="bg-bg-secondary border-border-default relative rounded-xl border p-6">
              <Quote size={28} className="text-gold/10 absolute top-6 right-6" />
              <p className="text-text-primary relative z-10 mb-6 text-[13px] leading-relaxed">
                &quot;Saves 3 hours per case on research. The citations are accurate and heavily
                rely on recent Supreme Court judgements.&quot;
              </p>
              <div className="flex flex-col">
                <span className="text-text-primary font-mono text-[11px] font-bold tracking-wider uppercase">
                  Adv. Ramesh Kumar
                </span>
                <span className="text-text-muted text-[11px]">Patna High Court</span>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-bg-secondary border-border-default relative rounded-xl border p-6">
              <Quote size={28} className="text-gold/10 absolute top-6 right-6" />
              <p className="text-text-primary relative z-10 mb-6 text-[13px] leading-relaxed">
                &quot;Drafting commercial agreements used to take days. Now I get a solid first
                draft compliant with the Indian Contract Act in minutes.&quot;
              </p>
              <div className="flex flex-col">
                <span className="text-text-primary font-mono text-[11px] font-bold tracking-wider uppercase">
                  Adv. Priya Sharma
                </span>
                <span className="text-text-muted text-[11px]">Bombay High Court</span>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-bg-secondary border-border-default relative rounded-xl border p-6">
              <Quote size={28} className="text-gold/10 absolute top-6 right-6" />
              <p className="text-text-primary relative z-10 mb-6 text-[13px] leading-relaxed">
                &quot;The compliance checker is a lifesaver for my corporate clients. Keeps track of
                GST and labor law updates seamlessly.&quot;
              </p>
              <div className="flex flex-col">
                <span className="text-text-primary font-mono text-[11px] font-bold tracking-wider uppercase">
                  CA Vikram Singh
                </span>
                <span className="text-text-muted text-[11px]">Corporate Counsel, Delhi</span>
              </div>
            </div>
          </div>
        </section>

        {/* NEW: FAQ ACCORDION SECTION */}
        <section className="border-border-default/60 mx-auto max-w-[800px] border-t px-6 py-20">
          <div className="mb-12 text-center">
            <span className="text-gold mb-2 block font-mono text-[11px] tracking-[2px] uppercase">
              Support
            </span>
            <h2 className="text-text-primary font-serif text-[32px] font-bold">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-bg-secondary border-border-default overflow-hidden rounded-xl border transition-all duration-300"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="text-text-primary hover:text-gold flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors"
                >
                  <span className="font-serif text-[15px] font-medium">{faq.q}</span>
                  {activeFaq === index ? (
                    <ChevronUp size={16} className="text-gold shrink-0" />
                  ) : (
                    <ChevronDown size={16} className="text-text-muted shrink-0" />
                  )}
                </button>

                <AnimatePresence initial={false}>
                  {activeFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="text-text-secondary border-border-default/40 border-t px-6 pt-1 pb-6 text-[13px] leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>

        {/* PRICING PREVIEW */}
        <section className="border-border-default/60 mx-auto mb-20 max-w-[1200px] border-t px-6 py-20">
          <h2 className="text-text-primary mb-12 text-center font-serif text-[28px] font-semibold">
            Select Your Intelligence Tier
          </h2>
          <div className="flex flex-col items-stretch justify-center gap-6 lg:flex-row">
            {/* Free */}
            <div className="bg-bg-secondary border-border-default mx-auto flex w-full max-w-[340px] flex-1 flex-col rounded-xl border p-8">
              <h3 className="text-text-secondary mb-2 font-mono text-[13px] tracking-wider uppercase">
                Free
              </h3>
              <div className="text-text-primary mb-6 font-serif text-[32px]">
                ₹0<span className="text-text-muted font-sans text-[16px] font-normal">/month</span>
              </div>
              <ul className="border-border-default mb-8 flex-grow space-y-3 border-t pt-6">
                <li className="text-text-secondary flex items-start gap-2 font-sans text-[13px]">
                  <Check size={14} className="text-gold mt-0.5" /> Basic legal research
                </li>
                <li className="text-text-secondary flex items-start gap-2 font-sans text-[13px]">
                  <Check size={14} className="text-gold mt-0.5" /> 30 queries/month
                </li>
                <li className="text-text-secondary text-text-disabled flex items-start gap-2 font-sans text-[13px] line-through">
                  Contract drafting & export
                </li>
              </ul>
              <Link
                href={user ? '/chat' : '/signup'}
                className="text-text-secondary border-border-default hover:border-gold hover:text-gold block w-full rounded-[6px] border bg-transparent py-2.5 text-center text-[13px] font-semibold transition-colors"
              >
                {user ? 'Active' : 'Get Started'}
              </Link>
            </div>

            {/* Advocate Pro */}
            <div className="bg-bg-secondary border-gold relative z-10 mx-auto flex w-full max-w-[360px] flex-1 flex-col rounded-xl border-2 p-8 shadow-[0_0_40px_rgba(201,168,76,0.05)] lg:scale-105">
              <div className="bg-gold absolute -top-3 left-1/2 -translate-x-1/2 rounded-sm px-3 py-1 font-mono text-[10px] font-bold tracking-widest text-[#0A0A0B] uppercase">
                Most Popular
              </div>
              <h3 className="text-gold mb-2 font-mono text-[13px] tracking-wider uppercase">
                Advocate Pro
              </h3>
              <div className="text-text-primary mb-6 font-serif text-[32px]">
                ₹799
                <span className="text-text-muted font-sans text-[16px] font-normal">/month</span>
              </div>
              <ul className="border-border-default mb-8 flex-grow space-y-3 border-t pt-6">
                <li className="text-text-primary flex items-start gap-2 font-sans text-[13px]">
                  <Check size={14} className="text-gold mt-0.5" /> Unlimited legal research
                </li>
                <li className="text-text-primary flex items-start gap-2 font-sans text-[13px]">
                  <Check size={14} className="text-gold mt-0.5" /> Advanced contract drafting
                </li>
                <li className="text-text-primary flex items-start gap-2 font-sans text-[13px]">
                  <Check size={14} className="text-gold mt-0.5" /> Case analysis & summary
                </li>
                <li className="text-text-primary flex items-start gap-2 font-sans text-[13px]">
                  <Check size={14} className="text-gold mt-0.5" /> Priority email support
                </li>
              </ul>
              <Link
                href="/pricing"
                className="bg-gold text-bg-primary hover:bg-gold-hover block w-full rounded-[6px] py-2.5 text-center text-[13px] font-semibold transition-colors"
              >
                Upgrade Now
              </Link>
            </div>

            {/* Business */}
            <div className="bg-bg-secondary border-business mx-auto flex w-full max-w-[340px] flex-1 flex-col rounded-xl border p-8">
              <h3 className="text-business mb-2 font-mono text-[13px] tracking-wider uppercase">
                Business
              </h3>
              <div className="text-text-primary mb-6 font-serif text-[32px]">
                ₹1,999
                <span className="text-text-muted font-sans text-[16px] font-normal">/month</span>
              </div>
              <ul className="border-border-default mb-8 flex-grow space-y-3 border-t pt-6">
                <li className="text-text-secondary flex items-start gap-2 font-sans text-[13px]">
                  <Check size={14} className="text-business mt-0.5" /> Everything in Pro
                </li>
                <li className="text-text-secondary flex items-start gap-2 font-sans text-[13px]">
                  <Check size={14} className="text-business mt-0.5" /> Team collaboration (up to 5)
                </li>
                <li className="text-text-secondary flex items-start gap-2 font-sans text-[13px]">
                  <Check size={14} className="text-business mt-0.5" /> Compliance monitoring API
                </li>
              </ul>
              <Link
                href="/pricing"
                className="text-business border-business hover:bg-business/10 block w-full rounded-[6px] border bg-transparent py-2.5 text-center text-[13px] font-semibold transition-colors"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-bg-secondary/40 border-border-default/60 relative z-10 mx-auto mt-auto flex w-full max-w-[1200px] flex-col justify-between gap-8 border-t px-6 py-12 md:flex-row md:px-12">
        <div className="flex max-w-[400px] flex-col gap-3">
          <div className="text-gold font-mono text-[14px] font-bold tracking-widest uppercase">
            LexAI
          </div>
          <p className="text-text-muted font-mono text-[11px] leading-relaxed">
            © 2026 LexAI Sovereign Intelligence. All rights reserved. Indian Law Jurisdiction
            Disclaimer: Information provided is for educational purposes and does not constitute
            professional legal advice.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-12 gap-y-4">
          <div className="flex flex-col gap-2">
            <Link href="/terms" className="text-text-secondary hover:text-gold transition-colors text-[13px] font-sans">
              Terms of Service
            </Link>
            <Link href="/privacy" className="text-text-secondary hover:text-gold transition-colors text-[13px] font-sans">
              Privacy Policy
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <Link href="/compliance" className="text-text-secondary hover:text-gold transition-colors text-[13px] font-sans">
              Regulatory Compliance
            </Link>
            <Link href="/pricing" className="text-text-secondary hover:text-gold transition-colors text-[13px] font-sans">
              Contact Counsel
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
