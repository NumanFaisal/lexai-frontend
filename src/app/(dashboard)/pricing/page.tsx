'use client';

import { useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { MOCK_PRICING_PLANS } from '@/lib/mock-data';
import { useAppSelector } from '@/store';
import { listItemStagger } from '@/lib/animations';
import toast from 'react-hot-toast';

function PricingContent() {
  const searchParams = useSearchParams();
  const { user } = useAppSelector((s) => s.auth);
  const fromLimit = searchParams.get('from') === 'limit';
  const proCardRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to Pro card if redirected from limit
  useEffect(() => {
    if (fromLimit && proCardRef.current) {
      proCardRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [fromLimit]);

  // Handle payment success callback
  useEffect(() => {
    if (searchParams.get('payment') === 'success') {
      toast.success('Payment successful! Your plan has been upgraded.');
    }
  }, [searchParams]);

  const handleUpgrade = (planId: string) => {
    if (planId === user?.plan) {
      toast('You are already on this plan', { icon: 'ℹ️' });
      return;
    }
    // In a real app, this would redirect to Razorpay
    toast.success('Redirecting to payment gateway...');
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="mx-auto max-w-[960px] px-6 py-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-text-primary font-serif text-[30px] font-semibold">
            Choose your plan
          </h1>
          <p className="text-text-secondary mt-2 text-[13px]">
            Unlock the full power of AI-assisted Indian legal research
          </p>
        </div>

        {/* Plan cards */}
        <motion.div
          className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
          variants={listItemStagger.container}
          initial="initial"
          animate="animate"
        >
          {MOCK_PRICING_PLANS.map((plan) => {
            const isCurrentPlan = user?.plan === plan.id;
            const isHighlighted = fromLimit && plan.id === 'advocate_pro';
            const isFeatured = plan.featured;

            return (
              <motion.div
                key={plan.id}
                variants={listItemStagger.item}
                ref={plan.id === 'advocate_pro' ? proCardRef : undefined}
                className={`relative rounded-2xl border p-7 transition-all duration-200 ${
                  isFeatured
                    ? 'border-gold scale-[1.02] border-2 shadow-[0_0_40px_#C9A84C15]'
                    : 'border-border-default bg-bg-secondary'
                } ${isHighlighted ? 'pulse-once' : ''}`}
                style={{
                  backgroundColor: isFeatured ? '#111113' : undefined,
                }}
              >
                {/* Featured badge */}
                {isFeatured && (
                  <div className="bg-gold text-bg-primary absolute -top-3 right-4 rounded-full px-3 py-1 text-[10px] font-semibold">
                    Most Popular
                  </div>
                )}

                {/* Plan name */}
                <p
                  className="text-[12px] font-medium tracking-[0.08em] uppercase"
                  style={{ color: plan.color }}
                >
                  {plan.name}
                </p>

                {/* Price */}
                <div className="mt-3 flex items-baseline gap-1">
                  <span
                    className="text-[40px] font-semibold"
                    style={{
                      color: isFeatured ? '#C9A84C' : '#E8E0D0',
                    }}
                  >
                    {plan.price === 0 ? '₹0' : `₹${plan.price}`}
                  </span>
                  <span className="text-text-muted text-[14px]">{plan.period}</span>
                </div>

                <p className="text-text-muted mt-1 text-[12px]">{plan.description}</p>

                {/* Divider */}
                <div className="bg-border-default my-5 h-px" />

                {/* Features */}
                <ul className="space-y-2.5">
                  {plan.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className={`flex items-start gap-2 text-[13px] ${
                        feature.included ? 'text-text-secondary' : 'text-text-disabled line-through'
                      }`}
                    >
                      {feature.included ? (
                        <Check
                          size={14}
                          strokeWidth={1.5}
                          className="mt-0.5 flex-shrink-0"
                          style={{ color: plan.color }}
                        />
                      ) : (
                        <X
                          size={14}
                          strokeWidth={1.5}
                          className="text-text-disabled mt-0.5 flex-shrink-0"
                        />
                      )}
                      {feature.text}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  onClick={() => handleUpgrade(plan.id)}
                  disabled={isCurrentPlan}
                  className="mt-6 w-full rounded-[10px] py-3 text-[13px] font-medium transition-colors duration-200"
                  style={
                    isCurrentPlan
                      ? {
                          backgroundColor: 'transparent',
                          border: '1px solid #1E1E21',
                          color: '#666666',
                        }
                      : isFeatured
                        ? {
                            backgroundColor: plan.color,
                            color: '#0A0A0B',
                          }
                        : {
                            backgroundColor: plan.color,
                            color:
                              plan.id === 'student' || plan.id === 'business'
                                ? '#FFFFFF'
                                : '#0A0A0B',
                          }
                  }
                >
                  {isCurrentPlan ? 'Current Plan' : plan.ctaText}
                </button>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Footer note */}
        <p className="text-text-muted mt-8 text-center text-[11px]">
          All prices in ₹ (Indian Rupees). Cancel anytime. Payments processed securely via Razorpay.
        </p>
      </div>
    </div>
  );
}

export default function PricingPage() {
  return (
    <Suspense
      fallback={
        <div className="text-text-muted flex h-full items-center justify-center text-[13px]">
          Loading...
        </div>
      }
    >
      <PricingContent />
    </Suspense>
  );
}
