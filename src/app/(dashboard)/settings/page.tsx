'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Shield, CreditCard, Bell, LogOut, Trash2, X } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '@/store';
import { clearUser, updateProfile } from '@/store/slices/authSlice';
import { clearChat } from '@/store/slices/chatSlice';
import { logout } from '@/lib/auth';
import { modalTransition } from '@/lib/animations';
import toast from 'react-hot-toast';

const PLAN_LABELS: Record<string, { label: string; color: string }> = {
  free: { label: 'Free', color: '#666666' },
  student: { label: 'Student', color: '#7B8FBE' },
  advocate_pro: { label: 'Advocate Pro ✓', color: '#C9A84C' },
  business: { label: 'Business ✓', color: '#7B9E87' },
};

export default function SettingsPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((s) => s.auth);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [notifications, setNotifications] = useState({
    emailUpdates: true,
    usageAlerts: true,
    newFeatures: false,
  });

  if (!user) return null;

  const planInfo = PLAN_LABELS[user.plan] || PLAN_LABELS.free;

  const handleLogout = () => {
    logout();
    dispatch(clearUser());
    dispatch(clearChat());
    router.push('/');
  };

  const handleToggle = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
    toast.success('Preferences updated');
  };

  const handleDeleteAccount = () => {
    setShowDeleteModal(false);
    logout();
    dispatch(clearUser());
    dispatch(clearChat());
    toast.success('Account deleted');
    router.push('/');
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="mx-auto max-w-[640px] px-6 py-8">
        <h1 className="text-text-primary font-serif text-[30px] font-semibold">Settings</h1>

        {/* Profile section */}
        <section className="mt-8">
          <h2 className="text-text-primary flex items-center gap-2 text-[14px] font-semibold">
            <User size={16} strokeWidth={1.5} className="text-text-muted" />
            Profile
          </h2>
          <div className="border-border-default bg-bg-secondary mt-4 space-y-4 rounded-2xl border p-6">
            <div>
              <label className="text-text-muted mb-1.5 block text-[12px] font-medium">Name</label>
              <input
                type="text"
                value={user.username}
                onChange={(e) => dispatch(updateProfile({ username: e.target.value }))}
                className="border-border-default bg-bg-primary text-text-primary focus:border-gold-border w-full rounded-[10px] border px-4 py-2.5 text-[13px] transition-colors outline-none"
              />
            </div>
            <div>
              <label className="text-text-muted mb-1.5 block text-[12px] font-medium">Email</label>
              <div className="flex items-center gap-2">
                <Mail size={16} strokeWidth={1.5} className="text-text-muted" />
                <span className="text-text-secondary text-[13px]">{user.email}</span>
              </div>
            </div>
            <div>
              <label className="text-text-muted mb-1.5 block text-[12px] font-medium">
                Persona
              </label>
              <div className="flex items-center gap-2">
                <Shield size={16} strokeWidth={1.5} className="text-text-muted" />
                <span className="text-text-secondary text-[13px] capitalize">
                  {user.persona || 'Not set'}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Plan section */}
        <section className="mt-8">
          <h2 className="text-text-primary flex items-center gap-2 text-[14px] font-semibold">
            <CreditCard size={16} strokeWidth={1.5} className="text-text-muted" />
            Subscription
          </h2>
          <div className="border-border-default bg-bg-secondary mt-4 flex items-center justify-between rounded-2xl border p-6">
            <div>
              <span
                className="inline-block rounded-full px-3 py-1 text-[12px] font-medium"
                style={{
                  backgroundColor: `${planInfo.color}22`,
                  color: planInfo.color,
                }}
              >
                {planInfo.label}
              </span>
              <p className="text-text-muted mt-2 text-[12px]">
                {user.queriesUsed}/{user.queriesLimit === 999999 ? '∞' : user.queriesLimit} queries
                used this month
              </p>
            </div>
            <button
              onClick={() => router.push('/pricing')}
              className="border-border-default text-text-secondary hover:border-gold-border hover:text-gold rounded-[10px] border px-4 py-2 text-[13px] transition-colors"
            >
              Change plan
            </button>
          </div>
        </section>

        {/* Notifications section */}
        <section className="mt-8">
          <h2 className="text-text-primary flex items-center gap-2 text-[14px] font-semibold">
            <Bell size={16} strokeWidth={1.5} className="text-text-muted" />
            Notifications
          </h2>
          <div className="border-border-default bg-bg-secondary divide-border-default mt-4 space-y-0 divide-y rounded-2xl border">
            {[
              {
                key: 'emailUpdates' as const,
                label: 'Email updates',
                desc: 'Receive product updates and announcements',
              },
              {
                key: 'usageAlerts' as const,
                label: 'Usage alerts',
                desc: 'Get notified when approaching query limits',
              },
              {
                key: 'newFeatures' as const,
                label: 'New features',
                desc: 'Be the first to know about new LexAI features',
              },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between px-6 py-4">
                <div>
                  <p className="text-text-primary text-[13px] font-medium">{item.label}</p>
                  <p className="text-text-muted text-[11px]">{item.desc}</p>
                </div>
                <button
                  onClick={() => handleToggle(item.key)}
                  className={`relative h-6 w-11 rounded-full transition-colors duration-200 ${
                    notifications[item.key] ? 'bg-gold' : 'bg-bg-tertiary'
                  }`}
                >
                  <div
                    className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform duration-200 ${
                      notifications[item.key] ? 'translate-x-[22px]' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Danger zone */}
        <section className="mt-8 mb-12">
          <div className="flex items-center gap-4">
            <button
              onClick={handleLogout}
              className="border-border-default text-text-secondary hover:bg-bg-tertiary flex items-center gap-2 rounded-[10px] border px-4 py-2.5 text-[13px] font-medium transition-colors"
            >
              <LogOut size={16} strokeWidth={1.5} />
              Log out
            </button>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="text-error flex items-center gap-2 rounded-[10px] border border-[#BE7B7B44] px-4 py-2.5 text-[13px] font-medium transition-colors hover:bg-[#BE7B7B15]"
            >
              <Trash2 size={16} strokeWidth={1.5} />
              Delete account
            </button>
          </div>
        </section>
      </div>

      {/* Delete confirmation modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDeleteModal(false)}
            />
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center px-4"
              {...modalTransition}
            >
              <div className="border-border-default bg-bg-secondary w-full max-w-[400px] rounded-2xl border p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-text-primary text-[16px] font-semibold">Delete account?</h3>
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="text-text-muted hover:bg-bg-tertiary rounded-lg p-1"
                  >
                    <X size={18} strokeWidth={1.5} />
                  </button>
                </div>
                <p className="text-text-secondary mt-3 text-[13px] leading-relaxed">
                  This action is permanent and cannot be undone. All your conversations, documents,
                  and saved research will be permanently deleted.
                </p>
                <div className="mt-5 flex items-center gap-3">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="border-border-default text-text-secondary hover:bg-bg-tertiary flex-1 rounded-[10px] border py-2.5 text-[13px] transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteAccount}
                    className="bg-error hover:bg-error/90 flex-1 rounded-[10px] py-2.5 text-[13px] font-medium text-white transition-colors"
                  >
                    Delete account
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
