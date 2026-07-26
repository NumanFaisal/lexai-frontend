import type { User, Conversation, VaultItem, Document, ChatMessage, PricingPlan } from './types';

// ── Mock Users ─────────────────────────────────
export const MOCK_USERS: Record<string, User & { password: string }> = {
  'demo@lexai.in': {
    id: 'usr_1',
    username: 'Advocate Sharma',
    email: 'demo@lexai.in',
    password: 'password123',
    persona: 'advocate',
    plan: 'advocate_pro',
    hasCompletedOnboarding: true,
    queriesUsed: 24,
    queriesLimit: 100,
    avatarInitials: 'AS',
    createdAt: '2025-06-01T00:00:00Z',
  },
  'new@lexai.in': {
    id: 'usr_2',
    username: 'New User',
    email: 'new@lexai.in',
    password: 'password123',
    persona: null,
    plan: 'free',
    hasCompletedOnboarding: false,
    queriesUsed: 0,
    queriesLimit: 30,
    avatarInitials: 'NU',
    createdAt: '2025-06-25T00:00:00Z',
  },
  'limit@lexai.in': {
    id: 'usr_3',
    username: 'Free User',
    email: 'limit@lexai.in',
    password: 'password123',
    persona: 'student',
    plan: 'free',
    hasCompletedOnboarding: true,
    queriesUsed: 30,
    queriesLimit: 30,
    avatarInitials: 'FU',
    createdAt: '2025-06-10T00:00:00Z',
  },
};

// ── Mock Conversations ─────────────────────────
export const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv_1',
    title: 'Section 138 NI Act — Cheque Bounce',
    mode: 'research',
    lastMessage: 'Section 138 of the Negotiable Instruments Act provides for penalties...',
    messageCount: 4,
    createdAt: '2025-06-24T10:00:00Z',
    updatedAt: '2025-06-24T10:30:00Z',
  },
  {
    id: 'conv_2',
    title: 'Employment Contract — IT Company',
    mode: 'draft',
    lastMessage: 'Here is a draft employment agreement for your IT company...',
    messageCount: 6,
    createdAt: '2025-06-23T14:00:00Z',
    updatedAt: '2025-06-23T15:00:00Z',
  },
  {
    id: 'conv_3',
    title: 'GST Compliance — E-commerce',
    mode: 'compliance',
    lastMessage: 'Based on your e-commerce business, here are the compliance requirements...',
    messageCount: 3,
    createdAt: '2025-06-22T09:00:00Z',
    updatedAt: '2025-06-22T09:45:00Z',
  },
  {
    id: 'conv_4',
    title: 'Bail Application — Section 420 IPC',
    mode: 'case',
    lastMessage: 'For a bail application under Section 420 IPC, the key considerations are...',
    messageCount: 5,
    createdAt: '2025-06-21T16:00:00Z',
    updatedAt: '2025-06-21T17:00:00Z',
  },
];

// ── Mock Chat Messages ─────────────────────────
export const MOCK_MESSAGES: Record<string, ChatMessage[]> = {
  conv_1: [
    {
      id: 'msg_1',
      conversationId: 'conv_1',
      role: 'user',
      content: 'What are the penalties under Section 138 of the NI Act?',
      mode: 'research',
      createdAt: '2025-06-24T10:00:00Z',
    },
    {
      id: 'msg_2',
      conversationId: 'conv_1',
      role: 'assistant',
      content: `## Penalties under Section 138 NI Act

Section 138 of the Negotiable Instruments Act, 1881 deals with **dishonour of cheques** for insufficiency of funds.

### Key Penalties

› **Imprisonment**: Up to **two years**, or
› **Fine**: Up to **twice the amount of the cheque**, or
› **Both**: Imprisonment and fine together

### Essential Requirements for Prosecution

1. The cheque must have been drawn for discharge of a legally enforceable debt or liability
2. The cheque must have been presented within **6 months** of the date on the cheque or within the period of its validity
3. The payee must have issued a **demand notice** within **30 days** of receiving dishonour information
4. The drawer must have **failed to pay** within **15 days** of receiving the demand notice

### Recent Amendments

The Negotiable Instruments (Amendment) Act, 2018 introduced provisions for **interim compensation** — the court may direct the drawer to pay interim compensation of up to 20% of the cheque amount during trial.

*ℹ️ Not legal advice. Consult a qualified advocate for your specific matter.*`,
      mode: 'research',
      citations: [
        {
          id: 'cite_1',
          text: 'Section 138, NI Act 1881',
          source: 'Indian Kanoon',
          url: 'https://indiankanoon.org/doc/1132672/',
          verified: true,
        },
        {
          id: 'cite_2',
          text: 'Dashrath Rupsingh Rathod v. State of Maharashtra (2014)',
          source: 'Supreme Court',
          url: 'https://indiankanoon.org/doc/51448930/',
          verified: true,
        },
        {
          id: 'cite_3',
          text: 'NI Amendment Act 2018',
          source: 'India Code',
          verified: false,
        },
      ],
      confidence: 'high',
      createdAt: '2025-06-24T10:01:00Z',
    },
    {
      id: 'msg_3',
      conversationId: 'conv_1',
      role: 'user',
      content: 'What is the limitation period for filing a complaint under Section 138?',
      mode: 'research',
      createdAt: '2025-06-24T10:15:00Z',
    },
    {
      id: 'msg_4',
      conversationId: 'conv_1',
      role: 'assistant',
      content: `## Limitation Period — Section 138 NI Act

The complaint must be filed **within 30 days** of the cause of action arising. The cause of action arises when the drawer fails to make payment within 15 days of receiving the demand notice.

### Timeline Summary

1. **Cheque dishonoured** → Bank returns cheque
2. **Within 30 days** of dishonour → Payee sends demand notice
3. **15 days** from receipt of notice → Drawer's deadline to pay
4. **Within 30 days** of expiry of 15-day period → **File complaint**

### Important Case Law

In **Sadanandan Bhadran v. Madhavan Sunil Kumar (1998)**, the Supreme Court held that the 30-day period for filing the complaint starts from the date when the cause of action arises under clause (c) of the proviso to Section 138.

The court may **condone delay** in filing if sufficient cause is shown, as per Section 142(b) of the NI Act.

*ℹ️ Not legal advice. Consult a qualified advocate for your specific matter.*`,
      mode: 'research',
      citations: [
        {
          id: 'cite_4',
          text: 'Section 142, NI Act 1881',
          source: 'Indian Kanoon',
          url: 'https://indiankanoon.org/doc/1823824/',
          verified: true,
        },
        {
          id: 'cite_5',
          text: 'Sadanandan Bhadran v. Madhavan Sunil Kumar (1998)',
          source: 'Supreme Court',
          verified: true,
        },
      ],
      confidence: 'high',
      createdAt: '2025-06-24T10:16:00Z',
    },
  ],
};

// ── Mock Vault Items ───────────────────────────
export const MOCK_VAULT_ITEMS: VaultItem[] = [
  {
    id: 'vault_1',
    conversationId: 'conv_1',
    title: 'Section 138 NI Act — Cheque Bounce',
    preview: 'Penalties under Section 138 including imprisonment up to two years and fine...',
    mode: 'research',
    bookmarked: true,
    createdAt: '2025-06-24T10:30:00Z',
  },
  {
    id: 'vault_2',
    conversationId: 'conv_2',
    title: 'Employment Contract — IT Company',
    preview: 'Standard employment agreement with clauses for IP assignment, non-compete...',
    mode: 'draft',
    bookmarked: false,
    createdAt: '2025-06-23T15:00:00Z',
  },
  {
    id: 'vault_3',
    conversationId: 'conv_3',
    title: 'GST Compliance — E-commerce',
    preview: 'Registration requirements, return filing schedule, input tax credit rules...',
    mode: 'compliance',
    bookmarked: true,
    createdAt: '2025-06-22T09:45:00Z',
  },
  {
    id: 'vault_4',
    conversationId: 'conv_4',
    title: 'Bail Application — Section 420 IPC',
    preview: 'Grounds for bail, surety requirements, conditions typically imposed...',
    mode: 'case',
    bookmarked: false,
    createdAt: '2025-06-21T17:00:00Z',
  },
  {
    id: 'vault_5',
    conversationId: 'conv_1',
    title: 'Property Transfer — Sale Deed',
    preview: 'Requirements for valid sale deed under Transfer of Property Act 1882...',
    mode: 'research',
    bookmarked: true,
    createdAt: '2025-06-20T12:00:00Z',
  },
  {
    id: 'vault_6',
    conversationId: 'conv_2',
    title: 'Partnership Deed — LLP Conversion',
    preview: 'Steps and compliance requirements for converting partnership to LLP...',
    mode: 'draft',
    bookmarked: false,
    createdAt: '2025-06-19T08:30:00Z',
  },
];

export const MOCK_DOCUMENTS: Document[] = [
  {
    id: 'doc_initial',
    title: 'Untitled Document',
    description: '',
    content: '',
    status: 'draft',
    mode: 'draft',
    createdAt: '2025-06-25T10:00:00Z',
    updatedAt: '2025-06-25T10:00:00Z',
  },
];

// ── Mock Pricing Plans ─────────────────────────
export const MOCK_PRICING_PLANS: PricingPlan[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    period: '/month',
    description: 'Try LexAI with limited queries',
    features: [
      { text: '30 queries per month', included: true },
      { text: 'Legal Research mode', included: true },
      { text: 'Basic citation verification', included: true },
      { text: 'Contract drafting', included: false },
      { text: 'Compliance analysis', included: false },
      { text: 'Case analysis', included: false },
      { text: 'Voice input', included: false },
      { text: 'Document export (PDF/Word)', included: false },
    ],
    featured: false,
    color: '#666666',
    ctaText: 'Current Plan',
  },
  {
    id: 'student',
    name: 'Student',
    price: 299,
    period: '/month',
    description: 'For law students and researchers',
    features: [
      { text: '200 queries per month', included: true },
      { text: 'All 4 AI modes', included: true },
      { text: 'Advanced citation verification', included: true },
      { text: 'Contract drafting (5/month)', included: true },
      { text: 'Compliance analysis', included: true },
      { text: 'Case analysis', included: true },
      { text: 'Voice input', included: false },
      { text: 'Document export (PDF/Word)', included: true },
    ],
    featured: false,
    color: '#7B8FBE',
    ctaText: 'Upgrade to Student',
  },
  {
    id: 'advocate_pro',
    name: 'Advocate Pro',
    price: 799,
    period: '/month',
    description: 'For practicing advocates and law firms',
    features: [
      { text: 'Unlimited queries', included: true },
      { text: 'All 4 AI modes', included: true },
      { text: 'Deep citation verification', included: true },
      { text: 'Unlimited contract drafting', included: true },
      { text: 'Compliance analysis', included: true },
      { text: 'Case analysis with precedents', included: true },
      { text: 'Voice input (Hindi + English)', included: true },
      { text: 'Document export (PDF/Word)', included: true },
    ],
    featured: true,
    color: '#C9A84C',
    ctaText: 'Upgrade to Pro',
  },
  {
    id: 'business',
    name: 'Business',
    price: 1999,
    period: '/month',
    description: 'For SMEs and corporate legal teams',
    features: [
      { text: 'Unlimited queries', included: true },
      { text: 'All 4 AI modes', included: true },
      { text: 'Deep citation verification', included: true },
      { text: 'Unlimited contract drafting', included: true },
      { text: 'Regulatory compliance dashboard', included: true },
      { text: 'Case analysis with precedents', included: true },
      { text: 'Voice input (Hindi + English)', included: true },
      { text: 'Priority support + API access', included: true },
    ],
    featured: false,
    color: '#7B9E87',
    ctaText: 'Upgrade to Business',
  },
];

// ── Persona data for onboarding ────────────────
export const PERSONA_DATA = {
  advocate: {
    icon: '⚖',
    title: 'Legal Advocate',
    description:
      'For practicing advocates, lawyers, and legal professionals. Get AI-powered legal research, case analysis, and contract drafting tailored for Indian courts.',
    useCases: 'Case research, Draft pleadings, Precedent analysis, Client advisory',
    color: '#C9A84C',
    exampleQuery: 'What are the grounds for anticipatory bail under Section 438 CrPC?',
  },
  business: {
    icon: '🏢',
    title: 'Business / SME',
    description:
      'For entrepreneurs, founders, and business owners. Navigate Indian business law, compliance requirements, and contract management with confidence.',
    useCases: 'GST compliance, Employment law, Company registration, Contract review',
    color: '#7B9E87',
    exampleQuery: 'What are the DPDP Act 2023 compliance requirements for my e-commerce startup?',
  },
  student: {
    icon: '📚',
    title: 'Law Student',
    description:
      'For law students and researchers. Access comprehensive legal research, understand case law, and prepare for moot courts with AI assistance.',
    useCases: 'Legal research, Case briefs, Moot court prep, Study notes',
    color: '#7B8FBE',
    exampleQuery:
      'Explain the doctrine of basic structure as established in Kesavananda Bharati v. State of Kerala',
  },
} as const;

// ── Mode data ──────────────────────────────────
export const MODE_DATA = {
  research: {
    icon: '⚖',
    label: 'Legal Research',
    shortLabel: 'Research',
    color: '#C9A84C',
    description:
      'Ask any question about Indian law — IPC, Companies Act, GST, labour laws, property law, and more.',
    quickPrompts: [
      'Section 138 NI Act mein kya hota hai?',
      'What is the limitation period under CPC?',
      'Explain doctrine of res judicata',
    ],
  },
  draft: {
    icon: '📜',
    label: 'Contract Draft',
    shortLabel: 'Draft',
    color: '#7B9E87',
    description:
      'Describe the contract you need. LexAI will draft a complete, India-compliant legal document.',
    quickPrompts: [
      'Draft an employment agreement for IT company',
      'Create a rental agreement for Patna',
      'NDA for startup partnership',
    ],
  },
  compliance: {
    icon: '✅',
    label: 'Compliance Check',
    shortLabel: 'Compliance',
    color: '#7B8FBE',
    description:
      'Describe your business or situation. Get a full compliance checklist under Indian regulations.',
    quickPrompts: [
      'GST compliance for e-commerce business',
      'DPDP Act requirements for SaaS startup',
      'Labour law compliance for 50-employee company',
    ],
  },
  case: {
    icon: '🔍',
    label: 'Case Analysis',
    shortLabel: 'Case',
    color: '#BE7B7B',
    description:
      'Describe your legal situation. Get an analysis, applicable laws, and recommended next steps.',
    quickPrompts: [
      'Bail application under Section 420 IPC',
      'Property dispute with neighbour in Bihar',
      'Consumer complaint against e-commerce company',
    ],
  },
} as const;

// ── SSE Mock Response ──────────────────────────
export const MOCK_STREAMING_RESPONSE = `## Legal Research Response

Based on your query, here is the relevant legal analysis under Indian law.

### Key Provisions

› **Section 302 IPC / Section 103 BNS 2023**: Punishment for murder — imprisonment for life or death sentence, and fine.

› **Burden of Proof**: The prosecution must prove the case beyond reasonable doubt. The accused is presumed innocent until proven guilty.

### Relevant Case Law

The Supreme Court in **State of UP v. Krishna Gopal (1988)** held that circumstantial evidence must form a complete chain pointing to the guilt of the accused, leaving no reasonable ground for a conclusion consistent with innocence.

### Recommended Next Steps

1. Review the FIR and charge sheet carefully
2. Identify potential witnesses for defense
3. Prepare for bail application if in custody
4. Gather alibi evidence if applicable

*ℹ️ Not legal advice. Consult a qualified advocate for your specific matter.*`;

export const MOCK_COMPLIANCE_RESPONSE = `## COMPLIANCE AUDIT
Private Limited Company (SaaS) — FY 2025-26
Based on Companies Act 2013 and GST rules. Last sync with MCA portal: 2 hours ago.`;

export const MOCK_CASE_RESPONSE = `## Legal Case Analysis
Anticipatory Bail Application — FY 2025-26
Case evaluation under Sec 438 CrPC and IPC offences. Jurisdiction: Delhi High Court.`;
