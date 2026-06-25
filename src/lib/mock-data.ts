import type {
  User,
  Conversation,
  VaultItem,
  Document,
  ChatMessage,
  PricingPlan,
} from './types';

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
    lastMessage:
      'Section 138 of the Negotiable Instruments Act provides for penalties...',
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
    lastMessage:
      'Based on your e-commerce business, here are the compliance requirements...',
    messageCount: 3,
    createdAt: '2025-06-22T09:00:00Z',
    updatedAt: '2025-06-22T09:45:00Z',
  },
  {
    id: 'conv_4',
    title: 'Bail Application — Section 420 IPC',
    mode: 'case',
    lastMessage:
      'For a bail application under Section 420 IPC, the key considerations are...',
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
      content:
        'What is the limitation period for filing a complaint under Section 138?',
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
    preview:
      'Penalties under Section 138 including imprisonment up to two years and fine...',
    mode: 'research',
    bookmarked: true,
    createdAt: '2025-06-24T10:30:00Z',
  },
  {
    id: 'vault_2',
    conversationId: 'conv_2',
    title: 'Employment Contract — IT Company',
    preview:
      'Standard employment agreement with clauses for IP assignment, non-compete...',
    mode: 'draft',
    bookmarked: false,
    createdAt: '2025-06-23T15:00:00Z',
  },
  {
    id: 'vault_3',
    conversationId: 'conv_3',
    title: 'GST Compliance — E-commerce',
    preview:
      'Registration requirements, return filing schedule, input tax credit rules...',
    mode: 'compliance',
    bookmarked: true,
    createdAt: '2025-06-22T09:45:00Z',
  },
  {
    id: 'vault_4',
    conversationId: 'conv_4',
    title: 'Bail Application — Section 420 IPC',
    preview:
      'Grounds for bail, surety requirements, conditions typically imposed...',
    mode: 'case',
    bookmarked: false,
    createdAt: '2025-06-21T17:00:00Z',
  },
  {
    id: 'vault_5',
    conversationId: 'conv_1',
    title: 'Property Transfer — Sale Deed',
    preview:
      'Requirements for valid sale deed under Transfer of Property Act 1882...',
    mode: 'research',
    bookmarked: true,
    createdAt: '2025-06-20T12:00:00Z',
  },
  {
    id: 'vault_6',
    conversationId: 'conv_2',
    title: 'Partnership Deed — LLP Conversion',
    preview:
      'Steps and compliance requirements for converting partnership to LLP...',
    mode: 'draft',
    bookmarked: false,
    createdAt: '2025-06-19T08:30:00Z',
  },
];

// ── Mock Documents ─────────────────────────────
export const MOCK_DOCUMENTS: Document[] = [
  {
    id: 'doc_1',
    title: 'Employment Agreement — TechCorp India Pvt. Ltd.',
    description: 'Standard employment contract for software engineers',
    content: `# EMPLOYMENT AGREEMENT

**THIS EMPLOYMENT AGREEMENT** is made and entered into as of 15th June, 2025

**BETWEEN:**

**TechCorp India Pvt. Ltd.** (CIN: U74999DL2020PTC123456), a company incorporated under the Companies Act, 2013, having its registered office at Plot No. 42, Sector 62, Noida, Uttar Pradesh — 201301 (hereinafter referred to as the "Company")

**AND:**

**[Employee Name]**, residing at [Address] (hereinafter referred to as the "Employee")

---

## 1. POSITION AND DUTIES

1.1 The Company hereby employs the Employee as **Senior Software Engineer** in the Engineering Department.

1.2 The Employee shall report to the Engineering Manager and perform all duties as may be reasonably assigned.

1.3 The Employee shall devote their full working time, attention, and abilities to the performance of duties.

## 2. COMPENSATION

2.1 **Basic Salary**: ₹8,00,000 per annum (Rupees Eight Lakhs only)

2.2 **House Rent Allowance**: ₹3,20,000 per annum

2.3 **Special Allowance**: ₹2,40,000 per annum

2.4 **Total CTC**: ₹15,60,000 per annum (Rupees Fifteen Lakhs Sixty Thousand only)

## 3. PROBATION PERIOD

3.1 The Employee shall be on probation for a period of **six (6) months** from the date of joining.

3.2 During probation, either party may terminate this agreement by giving **30 days' written notice**.

## 4. INTELLECTUAL PROPERTY

4.1 All intellectual property created by the Employee during the course of employment shall be the exclusive property of the Company.

4.2 The Employee hereby assigns all rights, title, and interest in such intellectual property to the Company.

## 5. CONFIDENTIALITY

5.1 The Employee shall not disclose any confidential information of the Company to any third party during or after the term of employment.

## 6. GOVERNING LAW

6.1 This Agreement shall be governed by and construed in accordance with the laws of India.

6.2 Any disputes shall be subject to the exclusive jurisdiction of the courts in New Delhi.

---

**IN WITNESS WHEREOF**, the parties have executed this Agreement as of the date first written above.

For **TechCorp India Pvt. Ltd.**

_______________________
Authorized Signatory

**Employee**

_______________________
[Employee Name]`,
    status: 'final',
    mode: 'draft',
    createdAt: '2025-06-15T10:00:00Z',
    updatedAt: '2025-06-20T14:00:00Z',
  },
  {
    id: 'doc_2',
    title: 'Non-Disclosure Agreement — Startup Partnership',
    description: 'Mutual NDA for business collaboration',
    content: `# MUTUAL NON-DISCLOSURE AGREEMENT

**Date:** 20th June, 2025

**Between:**
- **Party A**: [Company Name], [Address]
- **Party B**: [Company Name], [Address]

## 1. PURPOSE

The parties wish to explore a potential business relationship concerning [describe purpose] and in connection with this opportunity, each party may disclose certain confidential information to the other party.

## 2. DEFINITION OF CONFIDENTIAL INFORMATION

"Confidential Information" means any information disclosed by one party to the other, either directly or indirectly, in writing, orally, or by inspection of tangible objects.

## 3. OBLIGATIONS

3.1 The Receiving Party shall hold and maintain the Confidential Information in strict confidence.

3.2 The Receiving Party shall not use the Confidential Information for any purpose other than the Purpose stated herein.

## 4. TERM

This Agreement shall remain in effect for a period of **two (2) years** from the date of execution.

## 5. GOVERNING LAW

This Agreement shall be governed by Indian law, with disputes subject to arbitration under the Arbitration and Conciliation Act, 1996, seated in New Delhi.`,
    status: 'draft',
    mode: 'draft',
    createdAt: '2025-06-20T09:00:00Z',
    updatedAt: '2025-06-24T11:00:00Z',
  },
  {
    id: 'doc_3',
    title: 'GST Compliance Report — Q2 2025',
    description: 'Quarterly compliance status for e-commerce business',
    content: `# GST COMPLIANCE REPORT — Q2 2025

**Business:** ABC E-commerce Pvt. Ltd.
**GSTIN:** 09AADCC1234A1Z5
**Period:** April 2025 – June 2025

## Summary

| Item | Status | Due Date |
|------|--------|----------|
| GSTR-1 (April) | ✅ Filed | 11 May 2025 |
| GSTR-1 (May) | ✅ Filed | 11 Jun 2025 |
| GSTR-1 (June) | ⚠️ Pending | 11 Jul 2025 |
| GSTR-3B (April) | ✅ Filed | 20 May 2025 |
| GSTR-3B (May) | ✅ Filed | 20 Jun 2025 |
| GSTR-3B (June) | ⚠️ Pending | 20 Jul 2025 |

## Key Observations

1. **Input Tax Credit**: ₹4,23,000 claimed against ₹12,45,000 outward tax
2. **TCS Collection**: ₹89,000 collected as Tax Collection at Source under Section 52
3. **Reverse Charge**: ₹1,12,000 paid under reverse charge mechanism

## Action Items

- [ ] File GSTR-1 for June by 11 July 2025
- [ ] File GSTR-3B for June by 20 July 2025
- [ ] Reconcile ITC with GSTR-2B before filing
- [ ] Review TCS credits from marketplace operators`,
    status: 'final',
    mode: 'compliance',
    createdAt: '2025-06-18T08:00:00Z',
    updatedAt: '2025-06-24T16:00:00Z',
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
    exampleQuery:
      'What are the grounds for anticipatory bail under Section 438 CrPC?',
  },
  business: {
    icon: '🏢',
    title: 'Business / SME',
    description:
      'For entrepreneurs, founders, and business owners. Navigate Indian business law, compliance requirements, and contract management with confidence.',
    useCases: 'GST compliance, Employment law, Company registration, Contract review',
    color: '#7B9E87',
    exampleQuery:
      'What are the DPDP Act 2023 compliance requirements for my e-commerce startup?',
  },
  student: {
    icon: '📚',
    title: 'Law Student',
    description:
      'For law students and researchers. Access comprehensive legal research, understand case law, and prepare for moot courts with AI assistance.',
    useCases:
      'Legal research, Case briefs, Moot court prep, Study notes',
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
