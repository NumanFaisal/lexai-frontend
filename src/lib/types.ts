export type Persona = 'advocate' | 'business' | 'student' | null;

export type ChatMode = 'research' | 'draft' | 'compliance' | 'case';

export type Plan = 'free' | 'student' | 'advocate_pro' | 'business';

export interface User {
  id: string;
  username: string;
  email: string;
  persona: Persona;
  plan: Plan;
  hasCompletedOnboarding: boolean;
  queriesUsed: number;
  queriesLimit: number;
  avatarInitials: string;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  role: 'user' | 'assistant';
  content: string;
  mode: ChatMode;
  citations?: Citation[];
  confidence?: 'high' | 'medium' | 'low';
  isStreaming?: boolean;
  createdAt: string;
}

export interface Citation {
  id: string;
  text: string;
  source: string;
  url?: string;
  verified: boolean;
}

export interface Conversation {
  id: string;
  title: string;
  mode: ChatMode;
  lastMessage: string;
  messageCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface VaultItem {
  id: string;
  conversationId: string;
  title: string;
  preview: string;
  mode: ChatMode;
  bookmarked: boolean;
  createdAt: string;
}

export interface Document {
  id: string;
  title: string;
  description: string;
  content: string;
  status: 'draft' | 'final' | 'generating';
  mode: ChatMode;
  createdAt: string;
  updatedAt: string;
}

export interface UsageStats {
  queriesUsed: number;
  queriesLimit: number;
  plan: Plan;
  documentsGenerated: number;
  documentsLimit: number;
}

export interface PricingPlan {
  id: Plan;
  name: string;
  price: number;
  period: string;
  description: string;
  features: PricingFeature[];
  featured: boolean;
  color: string;
  ctaText: string;
}

export interface PricingFeature {
  text: string;
  included: boolean;
}
