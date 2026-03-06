---
name: nick-resume
description: "Use this skill whenever working on Nicholas Ferguson's resume, portfolio site (nickcrew.github.io/resume), cover letters, LinkedIn content, job application materials, or any positioning/narrative work for his job search. Also trigger when generating DOCX resumes, editing resume bullets, reviewing portfolio deep dives, writing outreach messages to founders, or tailoring materials for specific job listings. If the conversation involves Nick's career narrative, bullet writing, or job search materials in any way, use this skill. MUST be read before making any edits to resume content, portfolio site, or generating any job search documents."
---

# Nick's Resume & Portfolio Skill

## Quick Reference

- **Resume generator:** `~/Developer/nickcrew.github.io-resume/resume-base.js`
- **Portfolio site:** `~/Developer/nickcrew.github.io-resume/index.html`
- **Process page:** `~/Developer/nickcrew.github.io-resume/process.html`
- **Run:** `node resume-base.js && soffice --headless --convert-to pdf NicholasFerguson_Resume.docx`
- **Basic memory project:** `main` (folder: `job-search/`)
- **Live site:** https://nickcrew.github.io/resume

## The Narrative

### Core Positioning
"I solve business problems with computers. Teams with deep domain expertise often need a different skillset to get from prototype to production, and I'm the person who bridges that gap."

This is NOT "platform engineer who builds infrastructure." This is a generalist builder targeting founding engineer roles at seed-stage companies with non-technical domain-expert founders.

### Career Arc (show, don't state)
- **Vispero** = "I can build anything" — Pure IC, raw engineering. First hire, built from scratch.
- **ThreatX** = "I know what to build" — Started looking outward. Created pro services, mentored SOC→SRE, connected across teams.
- **A10** = "I know why to build it" — German government commitment, market gap identification, product absorption, business-driven engineering.

The arc should be felt in the timeline entries, NOT stated explicitly with arrows or labels like "the arc is..."

### How Nick Works (philosophy)
He starts on the inside helping people ship. That gives him an accelerated tour of the company. He works outward — customers, business, market. Everything is built to hand off from day one. "There are no Jira tickets for what I do." He builds consensus without needing authority.

## Content Accuracy Rules

**CRITICAL — get these wrong and Nick looks like a liar in interviews:**

### Platform Count
- **Four platforms across three companies** (not four in 11 months):
  1. Vispero — internal developer platform (build DSL, 600+ pipelines, $50M/year)
  2. ThreatX — sensor fleet management platform  
  3. A10 — edge protection platform (Synapse sensor + Signal Horizon fleet mgmt + collective defense)
  4. A10 — sales/validation tooling platform
- The 11-month A10 story is: edge platform + endpoint agents + sales tooling (not "4 platforms")

### AI Firewall Story (get this right)
- The AI Firewall team built protections against **AI agent abuse and data exfiltration** (NOT "AI-powered threat detection")
- Nick's edge sensor (Synapse) is the **threat detection platform** — completely different product
- Nick wrote v1 endpoint agents to bridge the gap between their prototype and production
- Then he integrated their detections into Synapse, consolidating at the edge
- Synapse already provided sensitive data detection capabilities the AI Firewall needed
- The endpoint agents were for: Windows, Linux, macOS, iOS, Android (always name all five)

### The German Government / Product Repositioning
- A10 had committed to the German government for GDPR-compliant on-prem deployment by end of year
- The legacy SaaS architecture couldn't do it
- This also aligned with A10's 7,700 existing customers who needed on-prem
- Result: replaced a dozen networked services with a single binary + command plane
- DO NOT say "runs on an A10 device" — nobody outside A10 knows what that means

### API Authorization Intelligence
- Market gap Nick identified: every WAF vendor detects auth attacks, none provide continuous visibility into which endpoints enforce auth
- Built the MVP: authorization coverage map, zero-config, auto-discovers from live traffic
- Designed local LLM feedback loop for per-customer behavioral learning
- This shows product instinct, not just engineering

## Tone Rules

### Collaborative, Not Combative
- ✅ "bridged the gap between prototype and production"
- ✅ "needed a different skillset"  
- ✅ "integrated their detections"
- ✅ "consolidating everything at the edge"
- ❌ "absorbed their product"
- ❌ "couldn't ship" / "get stuck at the last mile"
- ❌ "replaced their product"
- ❌ "eliminated the need for"

### Bullet Writing Rules
- **ALWAYS lead with impact, not task** in the bold lead
- ✅ "Gave sales the ability to close deals they were losing."
- ✅ "Unblocked the company's P1 priority"
- ✅ "Eliminated a 3-day turnaround and single point of failure"
- ❌ "Built sales tooling"
- ❌ "Wrote endpoint agents"
- ❌ "Automated release engineering"

### No insider jargon without context
- Don't say "built the" unless the reader already knows what "the" is
- Use "built a" with enough context: "built a demo platform where sales engineers tailor scenarios..."
- Name specific platforms: "Windows, Linux, macOS, iOS, and Android" not "all 5 target platforms"

## Resume Design System (DOCX)

### Typography & Colors
- Font: Arial throughout
- Name: 28pt, spaced out (`N I C H O L A S   F E R G U S O N`)
- Section headings: 22pt, bold, dark navy (#1e3a5f), spaced out, with integrated bottom border (no separate rule paragraph)
- Body: 19pt (9.5pt), color #444444
- Bold leads: 19pt bold, color #1A1A1A
- Dates: 17pt (8.5pt), color #666666, right-aligned via tab stop
- Links: #2563EB with underline

### Layout
- US Letter (12240 x 15840 DXA)
- Margins: 720 top/bottom, 900 left/right
- Section heading: spacing 200 before, 60 after, bottom border (size 4, color #CCCCCC, space 4)
- Bullets: spacing 30 before, 60 after
- Job header: company bold at BODY+1, subtitle italic in LIGHT color
- Title + dates on same line: title left, dates right-aligned via tab stop at position 10440

### Structure
- Header (centered): Name, contact line, links line
- Profile (paragraph, not bullets)
- Skills (4 compact lines: Languages, Infrastructure, Data, Also)
- Professional Experience (company headers + bullets)
- Projects (intro line + bullets + portfolio link)
- Education (one line, no year)

## Portfolio Site Design

### Fonts
- Newsreader (serif): hero name, section headings
- DM Sans: body text, hero intro, nav tabs, dive titles
- DM Mono: labels, tech tags, hero subtitle

### Color System
- Background: #080b12
- Surface: #0d1219
- Accent: #5ba4d9
- Text: #c8d2dc
- Text muted: #7a8fa6

### Structure
- Hero: Name (Newsreader) → "Engineer" (DM Mono) → intro paragraph (DM Sans)
- Nav: Experience | Deep Dives | How I Work
- Experience: timeline with arc-reinforcing descriptions
- Deep Dives: expandable sections, business context FIRST then technical depth
- Philosophy: "There are no Jira tickets for what I do"
- Footer: tech line + links (including "How I Job Search")

### Deep Dive Pattern
Every deep dive should lead with business context ("The business problem:") before technical detail. The pattern:
1. Why this needed to exist (business/customer/market driver)
2. What was built and the result (business outcome)
3. Technical decisions and trade-offs (for the engineers who click to expand)

## Target Audience

### Primary: Non-technical domain-expert founders at seed-stage companies
- Recently raised seed rounds
- Zero or minimal engineering team
- Need "the person who makes everything work"
- Care about: breadth, shipping, customer empathy, autonomy
- Don't care about: OWASP CRS coverage percentages, HMAC-SHA256 details

### Secondary: Technical co-founders / VPs of Eng at small companies
- Care about the technical depth (which is why the deep dives exist)
- But still need the business framing to understand why it matters

### Resume ↔ Portfolio Relationship
- Resume is the skim (2 pages, impact-first bullets)
- Portfolio has the stories (expandable deep dives, full technical narratives)
- They should not duplicate — resume bullets reference the portfolio for depth
- Profile/hero should be aligned in tone but not identical word-for-word

## When Generating Variant Resumes

For per-listing variants:
1. Read this skill first
2. Search basic-memory for `vector-resume-seed-data` if it exists
3. The base resume is the starting point — variants adjust emphasis, not content
4. Keep all content accuracy rules (platform counts, AI Firewall story, tone)
5. Adjust which bullets are prominent based on the target role
6. Never add claims that aren't in the base resume without confirming with Nick
