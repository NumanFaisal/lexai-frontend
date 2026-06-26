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
  HelpCircle as FaqIcon
} from 'lucide-react';
import { useAppSelector } from '@/store';

export default function HomePage() {
  const { user } = useAppSelector((s) => s.auth);
  const [activeTab, setActiveTab] = useState<'research' | 'drafting' | 'compliance' | 'case'>('research');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "How accurate is LexAI's citation engine?",
      a: "LexAI utilizes an advanced citation verification model that cross-references statutory references with our database of over 1.2M High Court and Supreme Court judgments. Every citation is verified to minimize AI hallucinations."
    },
    {
      q: "Does it support the new criminal codes (BNS, BNSS, BSA)?",
      a: "Yes. LexAI is fully fine-tuned on the new Bharatiya Nyaya Sanhita (BNS), Bharatiya Nagarik Suraksha Sanhita (BNSS), and Bharatiya Sakshya Adhiniyam (BSA), as well as the older IPC, CrPC, and Evidence Act for retroactivity analysis."
    },
    {
      q: "Is my firm's case data and client files secure?",
      a: "Security is our highest priority. All queries and drafts are locally sandboxed and encrypted with zero-retention policies on our servers. Your sensitive corporate client data is never used to train global models."
    },
    {
      q: "Can I export drafted contracts to Word or PDF?",
      a: "Absolutely. Once the Draft Editor generates your contract, you can edit it live in our browser editor and export it to clean, pre-formatted DOCX or PDF format instantly."
    },
    {
      q: "How does LexAI monitor regulatory compliance?",
      a: "Our compliance system integrates with government notification feeds (MCA, GSTN, SEBI, CBDT). When you query compliance, it compares your company parameters against the latest circulars to flag outstanding audits and filings."
    }
  ];

  return (
    <div className="flex min-h-screen flex-col bg-bg-primary text-text-primary antialiased relative overflow-hidden">
      
      {/* Decorative Background Grid & Glows */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#111113_1px,transparent_1px),linear-gradient(to_bottom,#111113_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none z-0" />
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-gold/5 blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-[800px] right-1/4 w-[600px] h-[600px] rounded-full bg-gold/3 blur-[150px] pointer-events-none z-0" />

      {/* Top Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-bg-secondary/80 backdrop-blur-md border-b border-border-default flex justify-between items-center px-6 md:px-12 h-[52px]">
        <div className="flex items-center gap-2">
          <span className="text-gold text-lg">⚖</span>
          <span className="font-serif text-[18px] font-bold text-text-primary tracking-wide">LexAI</span>
        </div>
        
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-[12px] text-text-secondary hidden sm:inline font-mono">
                // {user.username}
              </span>
              <Link
                href="/chat"
                className="bg-gold text-bg-primary hover:bg-gold-hover transition-colors px-4 py-1.5 rounded-[6px] text-[12px] font-medium tracking-wide uppercase font-sans"
              >
                Go to Dashboard
              </Link>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="text-text-secondary hover:text-text-primary transition-colors text-[13px] font-medium font-sans"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="bg-gold text-bg-primary hover:bg-gold-hover transition-colors px-4 py-1.5 rounded-[6px] text-[12px] font-bold tracking-wide uppercase font-sans"
              >
                Start Free
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Main content */}
      <main className="flex-grow pt-[52px] relative z-10">
        
        {/* HERO SECTION */}
        <section className="flex flex-col items-center justify-center text-center py-20 px-6 max-w-[1200px] mx-auto mt-6">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-[11px] font-mono text-gold tracking-[3px] uppercase mb-4 px-3 py-1 bg-gold/10 border border-gold-border rounded-full"
          >
            Sovereign Legal Intelligence
          </motion.span>
          
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-serif text-[44px] md:text-[64px] text-text-primary max-w-[900px] mb-6 leading-[1.1] font-bold"
          >
            Sovereign Legal Intelligence <br className="hidden md:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-[#f0d89e]">For Indian Jurisdictions</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[16px] md:text-[18px] text-text-secondary max-w-[620px] mb-10 leading-relaxed font-sans"
          >
            Deploy fine-tuned AI counsel trained on Indian statutes, civil codes, and circulars. Streamline research, auto-draft agreements, and audit compliance instantly.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 mb-20"
          >
            {user ? (
              <Link
                href="/chat"
                className="bg-gold text-bg-primary hover:bg-gold-hover transition-all py-3.5 px-8 rounded-[8px] font-sans font-bold text-[14px] uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-gold/15"
              >
                Go to Dashboard <ArrowRight size={16} />
              </Link>
            ) : (
              <>
                <Link
                  href="/signup"
                  className="bg-gold text-bg-primary hover:bg-gold-hover transition-all py-3.5 px-8 rounded-[8px] font-sans font-bold text-[14px] uppercase tracking-wider shadow-lg shadow-gold/15"
                >
                  Start Free — No Card Required
                </Link>
                <a
                  href="#showcase"
                  className="bg-transparent text-gold border border-border-default hover:border-gold hover:bg-gold/5 transition-all py-3.5 px-8 rounded-[8px] font-sans font-bold text-[14px] flex items-center gap-2"
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
            className="flex flex-wrap justify-center gap-8 md:gap-16 text-[12px] font-medium text-text-muted border-y border-border-default/60 py-6 w-full max-w-[900px]"
          >
            <div className="flex items-center gap-2.5">
              <ShieldCheck size={18} className="text-gold" />
              <span>10,000+ Advocates Active</span>
            </div>
            <div className="hidden md:block w-px h-6 bg-border-default"></div>
            <div className="flex items-center gap-2.5">
              <Database size={18} className="text-gold" />
              <span>1.2 Million Precedents Indexed</span>
            </div>
            <div className="hidden md:block w-px h-6 bg-border-default"></div>
            <div className="flex items-center gap-2.5 font-mono uppercase text-[11px] tracking-wide">
              <span>BNS • BNSs • BSA • Companies Act</span>
            </div>
          </motion.div>
        </section>

        {/* FEATURES GRID SECTION */}
        <section className="py-20 px-6 max-w-[1200px] mx-auto border-t border-border-default/60">
          <div className="text-center max-w-[600px] mx-auto mb-16">
            <span className="text-[11px] font-mono text-gold uppercase tracking-[2px] block mb-2">Capabilities</span>
            <h2 className="font-serif text-[32px] md:text-[40px] text-text-primary font-bold">Comprehensive Suite for Legal Operations</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1 */}
            <div className="bg-bg-secondary border border-border-default rounded-xl p-[28px] relative flex flex-col h-full hover:border-gold transition-all duration-300 group hover:shadow-[0_10px_30px_rgba(201,168,76,0.04)]">
              <div className="absolute top-0 left-0 w-8 h-[2px] bg-gold rounded-tl-xl"></div>
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gold/10 text-gold mb-6 border border-gold-border">
                <Search size={20} strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-[18px] text-text-primary mb-3 font-semibold">Legal Research</h3>
              <p className="text-[13px] text-text-secondary leading-relaxed flex-grow">
                Ask any question about Indian statutes. Get answers fully cited under BNS, IPC, and regional acts.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-bg-secondary border border-border-default rounded-xl p-[28px] relative flex flex-col h-full hover:border-business transition-all duration-300 group hover:shadow-[0_10px_30px_rgba(123,158,135,0.04)]">
              <div className="absolute top-0 left-0 w-8 h-[2px] bg-business rounded-tl-xl"></div>
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-business/10 text-business mb-6 border border-business/20">
                <FileText size={20} strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-[18px] text-text-primary mb-3 font-semibold">Contract Drafting</h3>
              <p className="text-[13px] text-text-secondary leading-relaxed flex-grow">
                Describe terms, outline considerations, or input custom clauses. Generate clean contracts instantly.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-bg-secondary border border-border-default rounded-xl p-[28px] relative flex flex-col h-full hover:border-student transition-all duration-300 group hover:shadow-[0_10px_30px_rgba(123,143,190,0.04)]">
              <div className="absolute top-0 left-0 w-8 h-[2px] bg-student rounded-tl-xl"></div>
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-student/10 text-student mb-6 border border-student/20">
                <ClipboardCheck size={20} strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-[18px] text-text-primary mb-3 font-semibold">Compliance Check</h3>
              <p className="text-[13px] text-text-secondary leading-relaxed flex-grow">
                Audit files, analyze regulatory circulars, and monitor company status updates under MCA and GST.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-bg-secondary border border-border-default rounded-xl p-[28px] relative flex flex-col h-full hover:border-case-accent transition-all duration-300 group hover:shadow-[0_10px_30px_rgba(190,123,123,0.04)]">
              <div className="absolute top-0 left-0 w-8 h-[2px] bg-case-accent rounded-tl-xl"></div>
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-case-accent/10 text-case-accent mb-6 border border-case-accent/20">
                <Scale size={20} strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-[18px] text-text-primary mb-3 font-semibold">Case Analysis</h3>
              <p className="text-[13px] text-text-secondary leading-relaxed flex-grow">
                Submit statement of facts. Match Supreme Court precedents, isolate statutory risks, and refine arguments.
              </p>
            </div>
          </div>
        </section>

        {/* NEW: INTERACTIVE CONSOLE SHOWCASE */}
        <section id="showcase" className="py-20 px-6 max-w-[1200px] mx-auto border-t border-border-default/60 scroll-mt-14">
          <div className="text-center max-w-[600px] mx-auto mb-12">
            <span className="text-[11px] font-mono text-gold uppercase tracking-[2px] block mb-2">Live Demo</span>
            <h2 className="font-serif text-[32px] md:text-[40px] text-text-primary font-bold">Experience the Workspace</h2>
            <p className="text-text-secondary text-[14px] mt-3">Interactive preview of the primary workflows in our application sandbox.</p>
          </div>

          <div className="bg-bg-secondary border border-border-default/80 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(201,168,76,0.05)]">
            {/* Console Header */}
            <div className="bg-bg-primary border-b border-border-default px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-error opacity-70"></span>
                  <span className="w-3 h-3 rounded-full bg-warning opacity-70"></span>
                  <span className="w-3 h-3 rounded-full bg-success opacity-70"></span>
                </div>
                <div className="flex items-center gap-2 text-[11px] font-mono text-text-muted">
                  <Terminal size={12} className="text-gold" />
                  <span>LEXAI_CORE_WORKSPACE_V1.4 // SECURE_SHELL</span>
                </div>
              </div>
              {/* Tabs */}
              <div className="flex flex-wrap items-center gap-1 bg-bg-secondary p-1 rounded-lg border border-border-default">
                {(['research', 'drafting', 'compliance', 'case'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1.5 rounded-md text-[11px] font-mono font-medium tracking-wide uppercase transition-all ${
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
            <div className="p-6 md:p-8 min-h-[400px] flex flex-col justify-between bg-gradient-to-b from-bg-secondary to-bg-primary">
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
                      <div className="w-8 h-8 rounded bg-bg-elevated border border-border-default flex items-center justify-center text-text-muted text-[11px] font-mono shrink-0">
                        USR
                      </div>
                      <div className="bg-bg-elevated/40 border border-border-default/60 rounded-lg p-4 max-w-[80%] text-[13px] text-text-secondary">
                        What is the statutory limitation period for filing a commercial suit for breach of contract in India?
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded bg-gold/15 border border-gold-border flex items-center justify-center text-gold text-[12px] font-serif shrink-0">
                        ⚖
                      </div>
                      <div className="bg-bg-elevated/20 border border-gold-border/30 rounded-lg p-5 max-w-[85%] text-[13px] leading-relaxed space-y-4">
                        <p>
                          Under the **Limitation Act, 1963**, specifically **Article 55** of the Schedule, the limitation period for filing a suit for compensation for the breach of any contract is **3 years**.
                        </p>
                        <p className="text-text-secondary pl-3 border-l-2 border-gold/40 italic">
                          &quot;The limitation clock begins to run from the date when the contract is broken, or (where there are successive breaches) when the breach in respect of which the suit is instituted occurs, or (where the breach is continuing) when it ceases.&quot;
                        </p>
                        
                        {/* Citation tag pillbox */}
                        <div className="pt-2 flex flex-wrap gap-2">
                          <span className="flex items-center gap-1 bg-gold/10 border border-gold-border text-gold px-2.5 py-0.5 rounded-full text-[10px] font-mono">
                            <BookOpen size={10} /> Limitation Act, 1963 Art. 55
                          </span>
                          <span className="flex items-center gap-1 bg-gold/10 border border-gold-border text-gold px-2.5 py-0.5 rounded-full text-[10px] font-mono">
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
                    className="grid grid-cols-1 lg:grid-cols-12 gap-6"
                  >
                    <div className="lg:col-span-4 space-y-4">
                      <div className="bg-bg-elevated/40 border border-border-default rounded-xl p-4 space-y-3">
                        <div className="text-[11px] font-mono text-gold uppercase tracking-wider">AI Drafting assistant</div>
                        <p className="text-[12px] text-text-secondary">Provide instruction to update drafted documents instantly.</p>
                        <div className="bg-bg-primary border border-border-default rounded px-3 py-2 text-[12px] text-text-secondary font-mono flex items-center justify-between">
                          <span>Modify governing law to Delhi seat</span>
                          <span className="text-gold font-bold text-[10px] blink cursor-default">|</span>
                        </div>
                        <button className="w-full bg-gold text-bg-primary text-[11px] font-mono uppercase tracking-wider py-2 rounded font-bold hover:bg-gold-hover transition-colors">
                          Apply Revision
                        </button>
                      </div>
                    </div>

                    <div className="lg:col-span-8 bg-bg-elevated/10 border border-border-default/80 rounded-xl p-6 font-serif max-h-[300px] overflow-y-auto space-y-4 shadow-inner text-[13px]">
                      <div className="text-center font-bold border-b border-border-default pb-3 tracking-wider text-text-primary text-[14px]">
                        MUTUAL NON-DISCLOSURE AGREEMENT
                      </div>
                      <p className="text-text-secondary leading-relaxed">
                        This Mutual Non-Disclosure Agreement (&quot;Agreement&quot;) is made and entered into on this 26th day of June, 2026, by and between the disclosing party and receiving party...
                      </p>
                      <div className="bg-success/5 border border-success/20 p-3 rounded text-[13px] leading-relaxed text-text-primary">
                        <div className="text-[10px] font-mono text-success uppercase font-semibold mb-1">// Section 11. GOVERNING LAW & ARBITRATION (AMENDED)</div>
                        This Agreement shall be governed by and construed in accordance with the laws of India. Any dispute arising out of or in connection with this Agreement shall be referred to arbitration in accordance with the Arbitration & Conciliation Act, 1996. <span className="font-bold underline text-gold">The seat and venue of arbitration shall be New Delhi, India.</span>
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
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="bg-bg-elevated/40 border border-border-default p-4 rounded-xl">
                        <div className="text-[11px] font-mono text-text-muted">AUDIT INDEX</div>
                        <div className="text-[24px] font-serif font-bold text-success mt-1">92% Compliant</div>
                      </div>
                      <div className="bg-bg-elevated/40 border border-border-default p-4 rounded-xl">
                        <div className="text-[11px] font-mono text-text-muted">ACTIVE ALERTS</div>
                        <div className="text-[24px] font-serif font-bold text-warning mt-1">1 Attention</div>
                      </div>
                      <div className="bg-bg-elevated/40 border border-border-default p-4 rounded-xl">
                        <div className="text-[11px] font-mono text-text-muted">UPCOMING DEADLINES</div>
                        <div className="text-[24px] font-serif font-bold text-text-primary mt-1">2 Due soon</div>
                      </div>
                    </div>

                    <div className="bg-bg-elevated/20 border border-border-default rounded-xl overflow-hidden text-[12px] font-mono">
                      <div className="bg-bg-elevated/50 px-4 py-2 border-b border-border-default flex justify-between text-text-muted text-[11px]">
                        <span>COMPLIANCE OBJECT</span>
                        <span>STATUS</span>
                      </div>
                      <div className="divide-y divide-border-default">
                        <div className="px-4 py-3 flex justify-between items-center">
                          <span className="text-text-primary">Form AOC-4 (Financial Statements filing)</span>
                          <span className="bg-success/15 border border-success/30 text-success text-[10px] px-2 py-0.5 rounded">COMPLETED</span>
                        </div>
                        <div className="px-4 py-3 flex justify-between items-center">
                          <span className="text-text-primary">Form MGT-7 (Annual Return filing)</span>
                          <span className="bg-success/15 border border-success/30 text-success text-[10px] px-2 py-0.5 rounded">COMPLETED</span>
                        </div>
                        <div className="px-4 py-3 flex justify-between items-center">
                          <span className="text-text-primary">DPDP Consent Architecture Implementation</span>
                          <span className="bg-warning/15 border border-warning/30 text-warning text-[10px] px-2 py-0.5 rounded">ACTION REQUIRED</span>
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
                    <div className="bg-bg-elevated/30 border border-border-default p-4 rounded-xl space-y-2">
                      <div className="flex items-center gap-2">
                        <AlertTriangle size={14} className="text-warning" />
                        <span className="text-[12px] font-mono text-warning">MATTER: COMMERCIAL SPECIFIC PERFORMANCE DISPUTE</span>
                      </div>
                      <p className="text-[13px] text-text-secondary leading-relaxed">
                        Defendant claims specific performance of the land sale agreement is barred due to plaintiff&apos;s failure to aver and prove constant readiness and willingness under Section 16(c) of the Specific Relief Act, 1963.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[12px] font-mono">
                      <div className="bg-bg-elevated/10 border border-border-default p-4 rounded-xl space-y-3">
                        <div className="text-[10px] text-gold uppercase tracking-wider font-bold">Statutory Mapping</div>
                        <ul className="space-y-2">
                          <li className="flex items-center gap-2 text-text-secondary">
                            <Check size={12} className="text-gold" />
                            <span>Specific Relief Act § 16(c)</span>
                          </li>
                          <li className="flex items-center gap-2 text-text-secondary">
                            <Check size={12} className="text-gold" />
                            <span>Contract Act, 1872 § 55 (Time essence)</span>
                          </li>
                        </ul>
                      </div>

                      <div className="bg-bg-elevated/10 border border-border-default p-4 rounded-xl space-y-3">
                        <div className="text-[10px] text-gold uppercase tracking-wider font-bold">Landmark Precedents</div>
                        <ul className="space-y-2">
                          <li className="flex items-center gap-2 text-text-secondary">
                            <Check size={12} className="text-gold" />
                            <span className="truncate">Kanthamani v. Nasreen Ahmed (2017) SC</span>
                          </li>
                          <li className="flex items-center gap-2 text-text-secondary">
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
              <div className="mt-8 border-t border-border-default/60 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-text-muted text-[11px] font-mono">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-success animate-pulse"></span>
                  <span>SYSTEM: STANDBY // LATENCY: 24MS</span>
                </div>
                <Link
                  href="/signup"
                  className="text-gold hover:text-gold-hover transition-colors flex items-center gap-1.5"
                >
                  Spin up local compliance sandbox <ExternalLink size={12} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* NEW: HOW IT WORKS (LEGAL INTELLIGENCE PIPELINE) */}
        <section className="py-20 px-6 max-w-[1200px] mx-auto border-t border-border-default/60">
          <div className="text-center max-w-[600px] mx-auto mb-16">
            <span className="text-[11px] font-mono text-gold uppercase tracking-[2px] block mb-2">Workflow</span>
            <h2 className="font-serif text-[32px] md:text-[40px] text-text-primary font-bold">Sovereign Processing Pipeline</h2>
            <p className="text-text-secondary text-[14px] mt-3">From raw litigation facts to court-ready legal drafts.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Desktop connecting lines */}
            <div className="hidden md:block absolute top-[60px] left-[25%] right-[25%] h-[1px] bg-gradient-to-r from-gold/30 via-gold/10 to-gold/30 z-0"></div>

            {/* Step 1 */}
            <div className="flex flex-col items-center text-center relative z-10">
              <div className="w-[120px] h-[120px] rounded-full bg-bg-secondary border border-border-default flex items-center justify-center mb-6 relative hover:border-gold transition-colors duration-300">
                <span className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-gold text-bg-primary font-mono text-[12px] font-bold flex items-center justify-center shadow">01</span>
                <Cpu className="text-gold" size={32} strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-[18px] text-text-primary mb-3 font-semibold">1. Context Ingestion</h3>
              <p className="text-[13px] text-text-secondary leading-relaxed max-w-[280px]">
                Paste case statements, Upload compliance logs, or input custom clauses.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center relative z-10">
              <div className="w-[120px] h-[120px] rounded-full bg-bg-secondary border border-border-default flex items-center justify-center mb-6 relative hover:border-gold transition-colors duration-300">
                <span className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-gold text-bg-primary font-mono text-[12px] font-bold flex items-center justify-center shadow">02</span>
                <ArrowRightLeft className="text-gold" size={32} strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-[18px] text-text-primary mb-3 font-semibold">2. Precedent Graph Search</h3>
              <p className="text-[13px] text-text-secondary leading-relaxed max-w-[280px]">
                Our model cross-references 50+ acts and 1.2M precedents for relevant rulings.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center relative z-10">
              <div className="w-[120px] h-[120px] rounded-full bg-bg-secondary border border-border-default flex items-center justify-center mb-6 relative hover:border-gold transition-colors duration-300">
                <span className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-gold text-bg-primary font-mono text-[12px] font-bold flex items-center justify-center shadow">03</span>
                <Check className="text-gold" size={32} strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-[18px] text-text-primary mb-3 font-semibold">3. Resolution Output</h3>
              <p className="text-[13px] text-text-secondary leading-relaxed max-w-[280px]">
                Obtain verified citations, interactive compliance reports, or legal drafts.
              </p>
            </div>
          </div>
        </section>

        {/* NEW: SOVEREIGN TRUST PILLARS */}
        <section className="py-20 px-6 max-w-[1200px] mx-auto border-t border-border-default/60">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <span className="text-[11px] font-mono text-gold uppercase tracking-[2px] block">Infrastructure</span>
              <h2 className="font-serif text-[32px] md:text-[40px] text-text-primary font-bold leading-tight">
                Designed for Sovereign Indian Compliance
              </h2>
              <p className="text-text-secondary text-[14px] leading-relaxed">
                LexAI is engineered with strict adherence to Indian bar council ethics guidelines, corporate data governance regulations, and high-security compliance mandates.
              </p>
              <div className="pt-4 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-gold/10 border border-gold-border flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={12} className="text-gold" />
                  </div>
                  <div>
                    <h4 className="text-[13px] font-semibold text-text-primary">100% On-Premise Sandboxing</h4>
                    <p className="text-[11px] text-text-muted">Option to deploy local instances inside private counsel firewalls.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-gold/10 border border-gold-border flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={12} className="text-gold" />
                  </div>
                  <div>
                    <h4 className="text-[13px] font-semibold text-text-primary">Bar Ethics Alignment</h4>
                    <p className="text-[11px] text-text-muted">Citations include linkbacks to original gazettes and court reporters.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-bg-secondary border border-border-default p-8 rounded-2xl space-y-4">
                <Lock className="text-gold" size={24} strokeWidth={1.5} />
                <h3 className="font-serif text-[18px] text-text-primary font-semibold">Zero-Data Retention</h3>
                <p className="text-[12px] text-text-secondary leading-relaxed">
                  Your workspace is encrypted. We do not index queries or upload documents for public model training.
                </p>
              </div>

              <div className="bg-bg-secondary border border-border-default p-8 rounded-2xl space-y-4">
                <Database className="text-gold" size={24} strokeWidth={1.5} />
                <h3 className="font-serif text-[18px] text-text-primary font-semibold">Precedent Database</h3>
                <p className="text-[12px] text-text-secondary leading-relaxed">
                  Continuously updated indexing of judgments across the Supreme Court and all 25 State High Courts.
                </p>
              </div>

              <div className="bg-bg-secondary border border-border-default p-8 rounded-2xl space-y-4">
                <Cpu className="text-gold" size={24} strokeWidth={1.5} />
                <h3 className="font-serif text-[18px] text-text-primary font-semibold">Fine-Tuned LLM</h3>
                <p className="text-[12px] text-text-secondary leading-relaxed">
                  Avoid generic public models. Rely on models explicitly fine-tuned for legal vernacular and act structures.
                </p>
              </div>

              <div className="bg-bg-secondary border border-border-default p-8 rounded-2xl space-y-4">
                <ShieldCheck className="text-gold" size={24} strokeWidth={1.5} />
                <h3 className="font-serif text-[18px] text-text-primary font-semibold">BNS Ready</h3>
                <p className="text-[12px] text-text-secondary leading-relaxed">
                  Integrated with comprehensive transition tables for older IPC and the new BNS criminal act mapping.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SOCIAL PROOF SECTION */}
        <section className="py-20 px-6 max-w-[1200px] mx-auto border-t border-border-default/60">
          <h2 className="font-serif text-[28px] text-center mb-12 text-text-primary font-semibold">
            Trusted by Advocates Across India
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Testimonial 1 */}
            <div className="bg-bg-secondary border border-border-default p-6 rounded-xl relative">
              <Quote size={28} className="absolute top-6 right-6 text-gold/10" />
              <p className="text-[13px] leading-relaxed text-text-primary mb-6 relative z-10">
                &quot;Saves 3 hours per case on research. The citations are accurate and heavily rely on recent Supreme Court judgements.&quot;
              </p>
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-text-primary uppercase tracking-wider font-mono">
                  Adv. Ramesh Kumar
                </span>
                <span className="text-[11px] text-text-muted">Patna High Court</span>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-bg-secondary border border-border-default p-6 rounded-xl relative">
              <Quote size={28} className="absolute top-6 right-6 text-gold/10" />
              <p className="text-[13px] leading-relaxed text-text-primary mb-6 relative z-10">
                &quot;Drafting commercial agreements used to take days. Now I get a solid first draft compliant with the Indian Contract Act in minutes.&quot;
              </p>
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-text-primary uppercase tracking-wider font-mono">
                  Adv. Priya Sharma
                </span>
                <span className="text-[11px] text-text-muted">Bombay High Court</span>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-bg-secondary border border-border-default p-6 rounded-xl relative">
              <Quote size={28} className="absolute top-6 right-6 text-gold/10" />
              <p className="text-[13px] leading-relaxed text-text-primary mb-6 relative z-10">
                &quot;The compliance checker is a lifesaver for my corporate clients. Keeps track of GST and labor law updates seamlessly.&quot;
              </p>
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-text-primary uppercase tracking-wider font-mono">
                  CA Vikram Singh
                </span>
                <span className="text-[11px] text-text-muted">Corporate Counsel, Delhi</span>
              </div>
            </div>
          </div>
        </section>

        {/* NEW: FAQ ACCORDION SECTION */}
        <section className="py-20 px-6 max-w-[800px] mx-auto border-t border-border-default/60">
          <div className="text-center mb-12">
            <span className="text-[11px] font-mono text-gold uppercase tracking-[2px] block mb-2">Support</span>
            <h2 className="font-serif text-[32px] text-text-primary font-bold">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-bg-secondary border border-border-default rounded-xl overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 text-text-primary hover:text-gold transition-colors"
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
                      <div className="px-6 pb-6 pt-1 text-[13px] text-text-secondary leading-relaxed border-t border-border-default/40">
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
        <section className="py-20 px-6 max-w-[1200px] mx-auto mb-20 border-t border-border-default/60">
          <h2 className="font-serif text-[28px] text-center mb-12 text-text-primary font-semibold">
            Select Your Intelligence Tier
          </h2>
          <div className="flex flex-col lg:flex-row justify-center items-stretch gap-6">
            {/* Free */}
            <div className="bg-bg-secondary border border-border-default p-8 rounded-xl flex-1 flex flex-col max-w-[340px] mx-auto w-full">
              <h3 className="font-mono text-[13px] text-text-secondary uppercase tracking-wider mb-2">Free</h3>
              <div className="font-serif text-[32px] text-text-primary mb-6">
                ₹0<span className="text-[16px] text-text-muted font-sans font-normal">/month</span>
              </div>
              <ul className="flex-grow space-y-3 mb-8 border-t border-border-default pt-6">
                <li className="flex items-start gap-2 text-[13px] text-text-secondary font-sans">
                  <Check size={14} className="text-gold mt-0.5" /> Basic legal research
                </li>
                <li className="flex items-start gap-2 text-[13px] text-text-secondary font-sans">
                  <Check size={14} className="text-gold mt-0.5" /> 30 queries/month
                </li>
                <li className="flex items-start gap-2 text-[13px] text-text-secondary font-sans text-text-disabled line-through">
                  Contract drafting & export
                </li>
              </ul>
              <Link
                href={user ? '/chat' : '/signup'}
                className="bg-transparent text-text-secondary border border-border-default hover:border-gold hover:text-gold transition-colors text-center w-full py-2.5 rounded-[6px] text-[13px] font-semibold block"
              >
                {user ? 'Active' : 'Get Started'}
              </Link>
            </div>

            {/* Advocate Pro */}
            <div className="bg-bg-secondary border-2 border-gold p-8 rounded-xl flex-1 flex flex-col max-w-[360px] mx-auto w-full lg:scale-105 relative z-10 shadow-[0_0_40px_rgba(201,168,76,0.05)]">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-[#0A0A0B] text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-sm font-mono">
                Most Popular
              </div>
              <h3 className="font-mono text-[13px] text-gold uppercase tracking-wider mb-2">Advocate Pro</h3>
              <div className="font-serif text-[32px] text-text-primary mb-6">
                ₹799<span className="text-[16px] text-text-muted font-sans font-normal">/month</span>
              </div>
              <ul className="flex-grow space-y-3 mb-8 border-t border-border-default pt-6">
                <li className="flex items-start gap-2 text-[13px] text-text-primary font-sans">
                  <Check size={14} className="text-gold mt-0.5" /> Unlimited legal research
                </li>
                <li className="flex items-start gap-2 text-[13px] text-text-primary font-sans">
                  <Check size={14} className="text-gold mt-0.5" /> Advanced contract drafting
                </li>
                <li className="flex items-start gap-2 text-[13px] text-text-primary font-sans">
                  <Check size={14} className="text-gold mt-0.5" /> Case analysis & summary
                </li>
                <li className="flex items-start gap-2 text-[13px] text-text-primary font-sans">
                  <Check size={14} className="text-gold mt-0.5" /> Priority email support
                </li>
              </ul>
              <Link
                href="/pricing"
                className="bg-gold text-bg-primary hover:bg-gold-hover transition-colors text-center w-full py-2.5 rounded-[6px] text-[13px] font-semibold block"
              >
                Upgrade Now
              </Link>
            </div>

            {/* Business */}
            <div className="bg-bg-secondary border border-business p-8 rounded-xl flex-1 flex flex-col max-w-[340px] mx-auto w-full">
              <h3 className="font-mono text-[13px] text-business uppercase tracking-wider mb-2">Business</h3>
              <div className="font-serif text-[32px] text-text-primary mb-6">
                ₹1,999<span className="text-[16px] text-text-muted font-sans font-normal">/month</span>
              </div>
              <ul className="flex-grow space-y-3 mb-8 border-t border-border-default pt-6">
                <li className="flex items-start gap-2 text-[13px] text-text-secondary font-sans">
                  <Check size={14} className="text-business mt-0.5" /> Everything in Pro
                </li>
                <li className="flex items-start gap-2 text-[13px] text-text-secondary font-sans">
                  <Check size={14} className="text-business mt-0.5" /> Team collaboration (up to 5)
                </li>
                <li className="flex items-start gap-2 text-[13px] text-text-secondary font-sans">
                  <Check size={14} className="text-business mt-0.5" /> Compliance monitoring API
                </li>
              </ul>
              <Link
                href="/pricing"
                className="bg-transparent text-business border border-business hover:bg-business/10 transition-colors text-center w-full py-2.5 rounded-[6px] text-[13px] font-semibold block"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-bg-secondary/40 border-t border-border-default/60 w-full py-12 px-6 md:px-12 max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between gap-8 mt-auto relative z-10">
        <div className="flex flex-col gap-3 max-w-[400px]">
          <div className="font-mono text-gold font-bold tracking-widest uppercase text-[14px]">LexAI</div>
          <p className="font-mono text-[11px] text-text-muted leading-relaxed">
            © 2026 LexAI Sovereign Intelligence. All rights reserved. Indian Law Jurisdiction Disclaimer: Information provided is for educational purposes and does not constitute professional legal advice.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-12 gap-y-4">
          <div className="flex flex-col gap-2">
            <Link href="#" className="text-text-secondary hover:text-gold transition-colors text-[13px] font-sans">
              Terms of Service
            </Link>
            <Link href="#" className="text-text-secondary hover:text-gold transition-colors text-[13px] font-sans">
              Privacy Policy
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <Link href="#" className="text-text-secondary hover:text-gold transition-colors text-[13px] font-sans">
              Regulatory Compliance
            </Link>
            <Link href="#" className="text-text-secondary hover:text-gold transition-colors text-[13px] font-sans">
              Contact Counsel
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
