# JAZZO Content Manager — Design Document

> **Slogan:** "Your Entire Team On One Platform That Never Sleeps."
>
> **Status:** Brainstorm Complete → Ready for Implementation
>
> **Last Updated:** 2026-04-02

---

## 1. Brand Identity

### Logo
- Stylized abstract "J" lettermark with flowing gold-to-purple gradients
- Dark background (#0a0a14), AI circuit patterns within curves
- Typography: "JAZZO" in bold Outfit, "CONTENT MANAGER" in thin Inter

### Slogan
**"Your Entire Team On One Platform That Never Sleeps."**

### Design Tokens

| Token | Value | Usage |
|-------|-------|-------|
| --bg-primary | #0a0a14 | Page background (deep space black) |
| --bg-surface | #12121f | Cards, panels, modals |
| --bg-surface-hover | #1a1a2e | Card hover states |
| --accent-gold | #d4a017 | Primary CTA, headings, accents |
| --accent-purple | #8b5cf6 | Gradient endpoint, secondary accent |
| --accent-cyan | #06b6d4 | Links, hover states, active indicators |
| --gradient-primary | #d4a017 to #8b5cf6 | Hero, CTA buttons, featured cards |
| --text-primary | #f0f0f5 | Headlines, body text |
| --text-secondary | #7a7a8e | Captions, labels, metadata |
| --text-muted | #4a4a5e | Placeholders, disabled states |
| --success | #22c55e | Active agents, confirmations |
| --warning | #f59e0b | Pending, in-progress |
| --error | #ef4444 | Errors, critical alerts |
| --font-heading | Outfit | All headings (700 weight) |
| --font-body | Inter | Body text (400 weight) |
| --radius-card | 12px | Cards, panels |
| --radius-button | 8px | Buttons, inputs |
| --radius-pill | 999px | Tags, badges |

### Motion System
- Hero: CSS particle background (gold + purple nodes)
- Agent cards: Hover lift (translateY -8px) + gold glow pulse
- Page transitions: Fade + slide-up (Framer Motion, 300ms)
- CTA buttons: Shimmer gradient sweep on hover
- Scroll: Reveal-on-scroll for each section (IntersectionObserver)
- Agent status: Pulsing dot animation (green = active)

---

## 2. Target Customer

**Primary:** Small businesses (1-10 employees) who cannot afford a full marketing team.

**Value Proposition:** JAZZO's 7 AI agents replace the need to hire a branding designer, web developer, content creator, videographer, marketing strategist, lead generation specialist, and accountant.

---

## 3. Agent Architecture

### 7 Customer-Facing Agents

| # | Agent Name | Icon | What the Client Sees | Backend Agents |
|:-:|-----------|:----:|---------------------|---------------|
| 1 | Brand Builder | art | Logo, slogan, brand identity kit, Brand DNA | Logo_Evolver + Onboarding_Agent |
| 2 | Website Enhancer | globe | 10 site improvements + conversion funnel | Website_Enhancer |
| 3 | Campaign Strategist | chart | 30-day marketing plan + content calendar | Campaign_Strategist + Viral_Hook_Engine |
| 4 | Content and Video Engine | film | Daily posts + 10s/5s cinematic videos | Content_Engine + Cinematic_Video_Engine |
| 5 | Lead Hunter | target | Verified B2B lead lists (LinkedIn Package ONLY) | Lead_Hunter_Agent + Secure_Browser_Agent |
| 6 | Credit Builder | card | Tradeline tracking, PAYDEX progress, Net-term reporting | Business_Credit_Agent |
| 7 | Business Manager | clipboard | Billing, contracts, compliance docs | Finance_Agent + Legal_Agent |

### Hidden System Agents (Not Shown to Clients)
- Dispatcher: Routes tasks to correct agents based on client plan
- Meta_Learning_Agent: Optimizes agent performance, reduces token burn

### Agent Backend
- AI Model: Google Gemini API (interactive agents)
- Orchestration: n8n workflows

---

## 4. Revenue Model

### Pricing Tiers

| Tier | Monthly | Annual (25% off) | Includes |
|------|:-------:|:-----------------:|----------|
| Starter | $299/mo | $2,691/yr ($224/mo) | Brand Builder + Website Enhancer + Campaign Strategist |
| Growth | $599/mo | $5,391/yr ($449/mo) | Starter + Content and Video Engine + Business Manager |
| Empire | $999/mo | $8,991/yr ($749/mo) | Growth + Credit Builder + priority support |

### Add-Ons

| Add-On | Price | Details |
|--------|:-----:|---------|
| LinkedIn Package | $199/mo | Lead Hunter agent - verified B2B leads (Mon/Thu delivery) |
| Extra Video Credits | $99/mo | +20 cinematic videos per month |
| White Label | $299/mo | Remove JAZZO branding from all deliverables |

### Payment Options
1. Stripe: Card payments, subscriptions, invoices
2. Net-15 Credit Terms: Pay within 15 days of invoice (available after 30 days as client)
3. Net-30 Credit Terms: Pay within 30 days of invoice (available after 60 days as client)
4. Upfront Payment: 25% discount when paying upfront (monthly or annual)

### Credit Reporting
- Payments on Net-15/Net-30 terms are reported to D&B and Experian Business
- 60-day delay before first report hits the bureaus
- Helps clients build PAYDEX score while paying for services
- Metro 2 format compliance for accurate reporting

---

## 5. Site Architecture

### Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| Framework | Next.js 15 (App Router) | SSR for SEO + client components for dashboard |
| Hosting | Vercel | Easiest deployment, edge-fast, free tier |
| Auth | NextAuth.js | Google + email login, session management |
| Payments | Stripe | Subscriptions, invoices, checkout |
| AI | Google Gemini API | Interactive agent backends |
| Animation | Framer Motion | Page transitions, scroll animations |
| Styling | CSS Modules + CSS variables | Design token system, no framework lock-in |
| Database | Vercel Postgres or Supabase | Client data, agent logs, credit records |
| Workflows | n8n (self-hosted or cloud) | Agent orchestration, scheduled tasks |

### Page Map

- / : Home (hero, 7 agents, how it works, pricing preview, CTA)
- /services : 7 Agent showcase with interactive demo cards
- /pricing : 3 tiers + add-ons + Net-15/30 credit terms
- /about : JAZZO story, mission, team
- /contact : Intake form + calendar booking
- /blog : SEO content hub
- /onboarding : Multi-step signup to Stripe checkout to Dispatcher
- /dashboard : Client portal (agent status, deliverables, billing)
- /dashboard/credit : Credit Builder portal (PAYDEX tracker, tradelines)

---

## 6. Onboarding Flow

Step 1: Business Info (Name, URL, Industry, Logo upload)
Step 2: Select Plan (Starter / Growth / Empire)
Step 3: Add-Ons (LinkedIn Package? Extra Videos? White Label?)
Step 4: Payment (Stripe checkout OR select Net-15/Net-30 terms)
Step 5: Confirmation (Dashboard access + Agents are deploying)
Dispatcher routes to: Brand Builder then Website OR Social Media Enhancer then Campaign Strategist

---

## 7. Workflow Automations (n8n)

| # | Workflow Name | Pattern | Trigger | Flow | Priority |
|:-:|-------------|---------|---------|------|:--------:|
| 1 | New Client Onboarding | Webhook | Stripe checkout complete | Brand Builder then Website OR Social Media Enhancer (client choice) then Campaign Strategist | High |
| 2 | Daily Content Generation | Scheduled | Cron (6 AM daily) | Content and Video Engine then post to client channels | High |
| 3 | Lead Delivery | Scheduled | Cron (Mon/Thu) | Lead Hunter then email verified leads (LinkedIn Package clients ONLY) | Med |
| 4 | Credit Reporting | Scheduled | Cron (1st of month) | Scan Net-15/30 payments then Metro 2 report then flag delinquencies (first report after 60 days) | High |
| 5 | Campaign Refresh | Scheduled | Cron (monthly) | Campaign Strategist generates new 30-day plan then notifies client | Med |
| 6 | Agent Performance Monitor | Scheduled | Cron (weekly) | Meta_Learning_Agent reviews logs then optimize token usage then Slack alert | Low |
| 7 | Client Intake Form | Webhook | Form submission | Validate data then create Stripe customer then trigger Onboarding workflow | High |

---

## 8. Decision Log

| # | Decision | Alternatives Considered | Why This Option |
|:-:|----------|------------------------|----------------|
| 1 | Approach 1 (Showcase then Platform) | Full Launch, Landing Sprint | Ship fast, start collecting clients, iterate dashboard based on real feedback |
| 2 | Next.js + Vercel | Astro, Vite, Flutter Web | SSR for SEO + client components for dashboard + easiest hosting + Gemini API routes |
| 3 | 7 customer-facing agents | Show all 14 | Simpler for small biz clients; internal agents run silently |
| 4 | Stripe + Net-15/Net-30 | PayPal, manual billing | Clients build business credit while paying = double value |
| 5 | Dark + Gold + Bold + Premium | Light mode, minimal | Matches AI/tech positioning, stands out from generic SMB tools |
| 6 | n8n for orchestration | Temporal, Inngest | Visual workflow builder, webhook + cron patterns, accessible for maintenance |
| 7 | 25% annual upfront discount | 10%, 15%, no discount | Incentivizes cash flow + commitment |
| 8 | Lead Hunter = LinkedIn add-on only | Include in all tiers | Premium service, higher margin, justifies premium price |
| 9 | 60-day credit reporting delay | 30-day, 90-day | Industry standard for new tradeline reporting to bureaus |

---

## 9. Implementation Plan

### Phase A: Marketing Site (Target: 2 weeks)

| Day | Task | Status |
|:---:|------|:------:|
| 1 | Initialize Next.js project, design system (CSS tokens), layout | Todo |
| 2 | Home page: hero with particle background, nav | Todo |
| 3 | Home page: 7 agent cards, how it works, pricing preview | Todo |
| 4 | Services page: agent detail cards with demos | Todo |
| 5 | Pricing page: tier cards, add-ons, credit terms | Todo |
| 6 | About + Contact pages | Todo |
| 7 | Blog scaffold + SEO meta tags | Todo |
| 8 | Onboarding flow: multi-step form | Todo |
| 9 | Stripe integration: checkout, subscriptions | Todo |
| 10 | Motion polish: Framer Motion animations, particle background | Todo |
| 11 | Responsive design pass (mobile/tablet) | Todo |
| 12 | Testing + Vercel deployment | Todo |

### Phase B: Client Platform (Target: 2 weeks after Phase A)

| Day | Task | Status |
|:---:|------|:------:|
| 13 | NextAuth.js setup (Google + email login) | Todo |
| 14 | Client dashboard: layout, agent status cards | Todo |
| 15 | Dashboard: deliverables feed, download center | Todo |
| 16 | Credit Builder portal: PAYDEX tracker, tradeline display | Todo |
| 17 | Stripe billing portal: invoices, payment history | Todo |
| 18 | Net-15/Net-30 credit term logic | Todo |
| 19 | n8n workflow setup: onboarding, content, credit | Todo |
| 20 | Gemini API integration: agent backends | Todo |
| 21 | Testing + deployment | Todo |

---

## 10. Risks and Mitigations

| Risk | Impact | Mitigation |
|------|:------:|-----------|
| Gemini API rate limits | Agents slow down | Implement queuing + caching |
| Credit reporting compliance (Metro 2) | Legal liability | Consult with credit reporting attorney before launch |
| Stripe chargebacks on Net terms | Revenue loss | Net terms only after 30-60 day client history |
| Content quality consistency | Client churn | Meta_Learning_Agent + human review for first 30 days |
| Scope creep (14 to 7 agents still complex) | Delayed launch | Phase A (marketing) ships independently of agent backends |
