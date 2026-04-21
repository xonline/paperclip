---
name: paid-ads
description: Plan, write, and optimise paid advertising campaigns for Meta Ads (Facebook + Instagram) and Google Ads (Search, Display, Performance Max). Use this skill whenever the user wants to create an ad campaign, write ad copy, set up targeting, plan a budget, audit ad performance, or improve ROAS — even if they just say "run some Facebook ads" or "set up Google ads for my business". Also use for landing page brief reviews related to ad campaigns.
---

# Paid Ads

Build campaigns that convert, not just campaigns that spend. Every decision — audience, copy, bid strategy, landing page — should trace back to a clear conversion goal.

## When to Use

- creating a new Meta or Google Ads campaign from scratch
- writing ad copy (headlines, descriptions, primary text)
- planning audience targeting or keyword strategy
- reviewing or optimising an underperforming campaign
- calculating budgets or projecting ROAS
- writing a creative brief for ad visuals
- advising on campaign structure (campaigns → ad sets → ads)

## Meta Ads (Facebook + Instagram)

### Campaign Structure

```
Campaign (objective + budget)
└── Ad Set (audience + placement + schedule)
    └── Ad (creative + copy)
```

- **1 objective per campaign** — Traffic, Leads, Conversions, Awareness, etc.
- **2-4 ad sets per campaign** — test different audiences, not different objectives
- **2-3 ads per ad set** — A/B test creatives; Meta rotates toward the winner
- **CBO vs ABO**: Campaign Budget Optimisation (CBO) = Meta distributes budget; Ad Set Budget (ABO) = you control per-set. Use CBO for scaling, ABO for testing.

### Objectives — When to Use Each

| Objective | Use when |
|---|---|
| Awareness / Reach | Brand new — no pixel data, cold audience |
| Traffic | Driving clicks to content or cold landing pages |
| Engagement | Social proof, growing page, retargeting warm audience |
| Leads | Lead gen forms — get emails/contacts without leaving Meta |
| Conversions | You have a pixel + 50+ events/week — let Meta optimise |
| Catalogue Sales | ecommerce with product feed |

### Audience Targeting

**Cold audiences (top of funnel):**
- Detailed targeting: interests, behaviours, demographics — stack 3-5 relevant ones
- Lookalike audiences (LAL): 1% LAL from customer list or pixel events
- Broad targeting: age/gender only — let Meta's AI find buyers (works with Advantage+)

**Warm audiences (retargeting):**
- Website visitors (last 30/60/90 days)
- Video viewers (50%/75% watched)
- Instagram/Facebook engagers (30/60/90 days)
- Lead form openers but not submitted

**Exclusions (always set):**
- Exclude existing customers from cold campaigns
- Exclude purchasers from retargeting (or show upsell)
- Exclude recent purchasers (last 7-14 days) to avoid wasted spend

### Ad Copy Formula

**Primary Text (above the image/video):**
```
[Hook — problem, desire, or bold claim]
[Bridge — why this matters or agitate the pain]
[Solution — your product/service]
[Proof — stat, testimonial, or result]
[CTA — one clear action]
```

**Headline (below creative, most visible):**
- Under 40 characters
- Benefit-led, not feature-led
- Creates curiosity or urgency

**Description (under headline):**
- Supporting detail or secondary benefit
- Optional but useful for high-intent cold audiences

**Ad Copy Frameworks:**

PAS (Problem-Agitate-Solution):
```
Tired of [problem]? [Make it worse]. [Product] fixes this by [mechanism].
```

AIDA (Attention-Interest-Desire-Action):
```
[Attention hook] → [Why this is interesting] → [Why they want it] → [Click here]
```

Social Proof:
```
"[Customer quote with specific result]" — [Name, context]
Join [X number] people who [achieved outcome].
```

### Creative Briefs

When writing a creative brief for Meta ads:
- **Format**: Image, Video (15s), Carousel, or Story/Reel (9:16)
- **Hook** (first 3 seconds for video): state the problem or outcome immediately
- **Visual**: show the product in use, show the result, or show the person before/after
- **Text overlay**: 1 line max, reinforces the hook
- **Aspect ratio**: Feed = 1:1 or 4:5, Stories/Reels = 9:16
- Use `image-prompt` skill to generate Nano Banana prompts for static creatives

### Budget Framework

```
Daily budget = (Monthly budget) / 30
Minimum test budget per ad set: $10-20/day (enough data)
Minimum for conversions objective: enough to get 50 events/week
```

- Start conservative (2-3 ad sets, 2 ads each), let data accumulate before scaling
- Scale winning ad sets by 20-30% every 3-4 days — don't double budget overnight
- Kill ad sets with CPM > 3x average, CTR < 1%, or no conversions after 3x CPA target spend

---

## Google Ads

### Campaign Types

| Type | Use when |
|---|---|
| Search | High-intent buyers actively searching — best for direct response |
| Performance Max | You have conversion data and want Google to find buyers across all channels |
| Display | Retargeting or awareness — cheaper CPM, lower intent |
| Shopping | ecommerce with product feed |
| YouTube | Video ads — awareness or remarketing |

### Search Campaign Structure

```
Campaign (budget + location + bid strategy)
└── Ad Group (tightly themed keyword cluster)
    ├── Keywords (3-10 per ad group)
    └── Responsive Search Ad (RSA)
```

- **1 theme per ad group** — don't mix "wedding photography" and "event photography" in same group
- **3-5 tightly related keywords per ad group** — exact match or phrase match for control
- **1 RSA per ad group** (15 headlines, 4 descriptions — Google mixes them)
- **Add negatives aggressively** — irrelevant searches kill budget fast

### Match Types

| Type | Syntax | Traffic | Control |
|---|---|---|---|
| Exact | `[keyword]` | Low | High |
| Phrase | `"keyword"` | Medium | Medium |
| Broad | `keyword` | High | Low |

- Start with Exact + Phrase. Add Broad only after you have conversion data.
- Review Search Terms report weekly — add irrelevant terms as negatives.

### Keyword Research

When doing keyword research:
1. Seed keywords: what would your buyer type when ready to buy?
2. Expand: use variants (synonyms, long-tail, location modifiers, brand vs generic)
3. Classify by intent: Informational (blog) / Navigational (brand) / Commercial (compare) / Transactional (buy)
4. Prioritise transactional + commercial intent for Search campaigns
5. Estimate: CPC, monthly volume, competition level

### RSA Ad Copy

**Headlines (15 available, 3 shown):**
- Include primary keyword in at least 2 headlines
- Mix: benefit-led, urgency, social proof, question, CTA
- Each headline: 30 chars max
- Pin Headline 1 to keyword if brand/product name is critical

**Descriptions (4 available, 2 shown):**
- 90 chars max each
- Expand on benefits, handle objections, include CTA
- At least 1 should include a USP + CTA

**Ad Copy Formula for Google Search:**
```
Headline 1: [Keyword or close variant]
Headline 2: [Primary benefit or USP]
Headline 3: [CTA or offer/urgency]
Description 1: [Expand benefit + proof]
Description 2: [Handle objection + CTA]
```

**Example:**
```
H1: Sydney Wedding Photographer
H2: 10+ Years · Award-Winning Work
H3: Book Your Date — Limited Spots
D1: Beautiful, natural wedding photography that captures real moments. Over 500 couples served.
D2: No stiff poses. Relaxed, documentary style. View galleries and check availability today.
```

### Ad Extensions (Assets) — Always Add

- **Sitelinks**: 4+ links to key pages (About, Pricing, Gallery, Contact)
- **Callouts**: 4+ short USPs ("Free Consultation", "Same-Day Response", "10 Years Experience")
- **Structured Snippets**: list services, locations, or features
- **Call extension**: if phone calls matter
- **Lead form**: if the goal is lead capture

### Bid Strategies

| Strategy | Use when |
|---|---|
| Maximise Clicks | New campaigns with no conversion data — get traffic first |
| Target CPA | You have 30+ conversions/month — optimise cost per conversion |
| Target ROAS | ecommerce with revenue data — optimise return on ad spend |
| Maximise Conversions | Conversion data exists, no CPA target yet |
| Manual CPC | Full control needed, or smart bidding underperforms |

### Negative Keywords

Always add these to new Search campaigns from day one:
- `free`, `diy`, `how to`, `tutorial`, `course` (unless you sell these)
- Competitor brand names (unless running conquesting)
- Irrelevant locations
- Job-related: `jobs`, `careers`, `salary`, `internship`

---

## Performance Metrics & Benchmarks

### Meta Ads
| Metric | Good | Warning | Fix |
|---|---|---|---|
| CTR (link) | > 1.5% | < 0.8% | Test new creatives/hooks |
| CPM | Varies by niche | > 3x your average | Audience too narrow or bid competition |
| CPC | Varies | Rising week-over-week | Creative fatigue — refresh ads |
| ROAS | > 3x for ecomm | < 2x | Funnel issue — check landing page |
| Frequency | 1-3 for cold | > 4 for cold | Audience fatigue — expand or refresh |

### Google Ads
| Metric | Good | Warning | Fix |
|---|---|---|---|
| CTR | > 5% search | < 2% | Poor ad relevance or match type too broad |
| Quality Score | 7-10 | < 5 | Improve ad relevance + landing page |
| Impression Share | > 60% | < 30% | Increase budget or bid |
| Conversion Rate | > 3% | < 1% | Landing page issue |
| CPA | Depends on LTV | > LTV | Pause low-performing keywords |

---

## Campaign Audit Checklist

When auditing an existing campaign:
- [ ] Is the objective aligned with the business goal?
- [ ] Is the pixel / conversion tracking firing correctly?
- [ ] Are audiences segmented (cold vs warm vs retargeting)?
- [ ] Are exclusions in place?
- [ ] Is there creative fatigue (frequency > 3-4 for cold)?
- [ ] Are there enough ad variations being tested?
- [ ] Is budget distributed toward winning ad sets/keywords?
- [ ] Are negatives applied (Google)?
- [ ] Does the landing page match the ad's promise?
- [ ] Is there a clear, single CTA on the landing page?

---

## Landing Page Brief

Ad performance depends heavily on the landing page. When reviewing or briefing one:
- **Headline**: must match the ad's main promise exactly (message match)
- **Above the fold**: hero image/video, headline, subheadline, CTA button — all visible without scrolling
- **Social proof**: near the top — testimonials with names/photos, logos, stats
- **Single CTA**: no competing links or navigation that leads away
- **Speed**: < 3s load time — slow pages tank conversion rates
- **Mobile**: test on mobile first — most Meta traffic is mobile

---

## Related Skills

- `social-media` — organic content; paid ads should complement organic strategy
- `brand-voice` — ad copy must match brand voice
- `image-prompt` — generate creative briefs for ad visuals
- `seo` — Google Ads keywords often overlap with SEO keyword strategy
