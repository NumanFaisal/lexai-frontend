'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
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
} from 'lucide-react';
import { useAppSelector } from '@/store';

export default function HomePage() {
  const { user } = useAppSelector((s) => s.auth);

  return (
    <div className="flex min-h-screen flex-col bg-bg-primary text-text-primary antialiased">
      {/* Top Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-bg-secondary/80 backdrop-blur-md border-b border-border-default flex justify-between items-center px-6 md:px-12 h-[52px]">
        <div className="flex items-center gap-2">
          <span className="text-gold text-lg">⚖</span>
          <span className="font-serif text-[18px] font-bold text-text-primary tracking-wide">LexAI</span>
        </div>
        
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-[12px] text-text-secondary hidden sm:inline">
                Welcome, {user.username}
              </span>
              <Link
                href="/chat"
                className="bg-gold text-bg-primary hover:bg-gold-hover transition-colors px-4 py-1.5 rounded-[6px] text-[12px] font-medium tracking-wide uppercase"
              >
                Go to Dashboard
              </Link>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="text-text-secondary hover:text-text-primary transition-colors text-[13px] font-medium"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="bg-gold text-bg-primary hover:bg-gold-hover transition-colors px-4 py-1.5 rounded-[6px] text-[12px] font-bold tracking-wide uppercase"
              >
                Start Free
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Main content */}
      <main className="flex-grow pt-[52px]">
        {/* HERO SECTION */}
        <section className="flex flex-col items-center justify-center text-center py-20 px-6 max-w-[1200px] mx-auto mt-6">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-[11px] font-sans font-semibold text-gold tracking-[2px] uppercase mb-3"
          >
            INDIA’S FIRST AI LEGAL ASSISTANT
          </motion.span>
          
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-serif text-[40px] md:text-[56px] text-text-primary max-w-[800px] mb-6 leading-tight font-bold"
          >
            Legal Intelligence for Every Indian
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[16px] md:text-[18px] text-text-secondary max-w-[580px] mb-8 leading-relaxed"
          >
            Research case law, draft contracts, check compliance — powered by Indian law, built for Indian courts.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 mb-16"
          >
            {user ? (
              <Link
                href="/chat"
                className="bg-gold text-bg-primary hover:bg-gold-hover transition-all py-3 px-6 rounded-[8px] font-sans font-bold text-[14px] uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-gold/10"
              >
                Go to Dashboard <ArrowRight size={16} />
              </Link>
            ) : (
              <>
                <Link
                  href="/signup"
                  className="bg-gold text-bg-primary hover:bg-gold-hover transition-all py-3 px-6 rounded-[8px] font-sans font-bold text-[14px] uppercase tracking-wider shadow-lg shadow-gold/10"
                >
                  Start Free — No Card Required
                </Link>
                <Link
                  href="/login"
                  className="bg-transparent text-gold border border-border-default hover:border-gold transition-all py-3 px-6 rounded-[8px] font-sans font-bold text-[14px] flex items-center gap-2"
                >
                  See how it works <ArrowRight size={16} />
                </Link>
              </>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-6 md:gap-8 text-[12px] font-medium text-text-muted border-t border-border-default/60 pt-8 w-full max-w-[800px]"
          >
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-gold" />
              10,000+ Advocates
            </div>
            <div className="hidden sm:block w-px h-4 bg-border-default"></div>
            <div className="flex items-center gap-2">
              <BookOpen size={16} className="text-gold" />
              50+ Acts Covered
            </div>
            <div className="hidden sm:block w-px h-4 bg-border-default"></div>
            <div className="flex items-center gap-2 font-mono uppercase text-[11px] tracking-wide">
              IPC • BNS • GST • Companies Act
            </div>
          </motion.div>
        </section>

        {/* FEATURES SECTION */}
        <section className="py-20 px-6 max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="bg-bg-secondary border border-border-default rounded-xl p-[28px] relative flex flex-col h-full hover:border-gold transition-all duration-300 group">
              <div className="absolute top-0 left-0 w-8 h-[2px] bg-gold rounded-tl-xl"></div>
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gold/10 text-gold mb-6 border border-gold-border">
                <Scale size={20} strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-[18px] text-text-primary mb-3 font-semibold">Legal Research</h3>
              <p className="text-[13px] text-text-secondary leading-relaxed flex-grow">
                Ask any question about Indian law. Get cited answers from IPC, BNS, CrPC.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-bg-secondary border border-border-default rounded-xl p-[28px] relative flex flex-col h-full hover:border-business transition-all duration-300 group">
              <div className="absolute top-0 left-0 w-8 h-[2px] bg-business rounded-tl-xl"></div>
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-business/10 text-business mb-6 border border-business/20">
                <FileText size={20} strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-[18px] text-text-primary mb-3 font-semibold">Contract Drafting</h3>
              <p className="text-[13px] text-text-secondary leading-relaxed flex-grow">
                Describe the agreement. Get a full India-compliant draft in 30 seconds.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-bg-secondary border border-border-default rounded-xl p-[28px] relative flex flex-col h-full hover:border-student transition-all duration-300 group">
              <div className="absolute top-0 left-0 w-8 h-[2px] bg-student rounded-tl-xl"></div>
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-student/10 text-student mb-6 border border-student/20">
                <ClipboardCheck size={20} strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-[18px] text-text-primary mb-3 font-semibold">Compliance Check</h3>
              <p className="text-[13px] text-text-secondary leading-relaxed flex-grow">
                Know your obligations under GST, Labour, DPDP, and Companies Act.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-bg-secondary border border-border-default rounded-xl p-[28px] relative flex flex-col h-full hover:border-case-accent transition-all duration-300 group">
              <div className="absolute top-0 left-0 w-8 h-[2px] bg-case-accent rounded-tl-xl"></div>
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-case-accent/10 text-case-accent mb-6 border border-case-accent/20">
                <Search size={20} strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-[18px] text-text-primary mb-3 font-semibold">Case Analysis</h3>
              <p className="text-[13px] text-text-secondary leading-relaxed flex-grow">
                Paste your facts. Get applicable sections, precedents, and next steps.
              </p>
            </div>
          </div>
        </section>

        {/* SOCIAL PROOF SECTION */}
        <section className="py-20 px-6 max-w-[1200px] mx-auto border-t border-border-default/60">
          <h2 className="font-serif text-[28px] text-center mb-12 text-text-primary font-semibold">
            Trusted by advocates across India
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Testimonial 1 */}
            <div className="bg-bg-secondary border border-border-default p-6 rounded-xl relative">
              <Quote size={28} className="absolute top-6 right-6 text-gold/10" />
              <p className="text-[13px] leading-relaxed text-text-primary mb-6 relative z-10">
                &quot;Saves 3 hours per case on research. The citations are accurate and heavily rely on recent Supreme Court judgements.&quot;
              </p>
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-text-primary uppercase tracking-wider">
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
                <span className="text-[11px] font-bold text-text-primary uppercase tracking-wider">
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
                <span className="text-[11px] font-bold text-text-primary uppercase tracking-wider">
                  CA Vikram Singh
                </span>
                <span className="text-[11px] text-text-muted">Corporate Counsel, Delhi</span>
              </div>
            </div>
          </div>
        </section>

        {/* PRICING PREVIEW */}
        <section className="py-20 px-6 max-w-[1200px] mx-auto mb-20">
          <h2 className="font-serif text-[28px] text-center mb-12 text-text-primary font-semibold">
            Select your intelligence tier
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
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-[#0A0A0B] text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-sm">
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
      <footer className="bg-bg-secondary/40 border-t border-border-default/60 w-full py-12 px-6 md:px-12 max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between gap-8 mt-auto">
        <div className="flex flex-col gap-3 max-w-[400px]">
          <div className="font-mono text-gold font-bold tracking-widest uppercase">LexAI</div>
          <p className="font-mono text-[11px] text-text-muted leading-relaxed">
            © 2026 LexAI Sovereign Intelligence. All rights reserved. Indian Law Jurisdiction Disclaimer: Information provided is for educational purposes and does not constitute professional legal advice.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-12 gap-y-4">
          <div className="flex flex-col gap-2">
            <Link href="#" className="text-text-secondary hover:text-gold transition-colors text-[13px]">
              Terms of Service
            </Link>
            <Link href="#" className="text-text-secondary hover:text-gold transition-colors text-[13px]">
              Privacy Policy
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <Link href="#" className="text-text-secondary hover:text-gold transition-colors text-[13px]">
              Regulatory Compliance
            </Link>
            <Link href="#" className="text-text-secondary hover:text-gold transition-colors text-[13px]">
              Contact Counsel
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
