<div align="center">

# ⚖️ UnDenied
### *The AI-Powered Legal Translator & Appeal Strategist*

**Built in 20 days · Solo student founder · Zero budget**

[![Live](https://img.shields.io/badge/🌐_Live_App-undenied.vercel.app-000000?style=for-the-badge)](https://undenied.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-Iceman--Dann%2FUnDenied-181717?style=for-the-badge&logo=github)](https://github.com/Iceman-Dann/UnDenied)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![AI](https://img.shields.io/badge/AI-Gemini_2.5_Flash-8E75B2?style=for-the-badge&logo=google)](https://deepmind.google/technologies/gemini/)
[![Status](https://img.shields.io/badge/Status-Live_Beta-brightgreen?style=for-the-badge)]()

---

*Submitted to*
[⚡ Quantum Sprint](https://quantumsprint.devpost.com/) · [🌍 ImpactHacks](https://impacthacks.devpost.com/) · [🏛️ Creator Colosseum](https://creatorcolosseumcompetition26.devpost.com/)

</div>

---

## 📌 The Problem — In 3 Numbers

<div align="center">

| 200,000,000+ | 80% | 80% |
|:---:|:---:|:---:|
| Wrongful denial letters sent every year¹ | Of recipients never appeal² | Of those who appeal **win**³ |

</div>

> The letter wasn't confusing by accident. It was written by corporate lawyers whose job is to make you give up.
> **UnDenied was built to end that.**

---

## ⚡ What It Does — In 30 Seconds

Paste any legal letter. Get back:

```
✅  Plain-English explanation of what the letter actually means
✅  Exact legal violations flagged (ERISA §503, 45 CFR §147.136, FCRA §1681i...)
✅  Appeal deadline calculated from the letter date
✅  Ready-to-send appeal letter citing specific federal law
✅  Insurer denial rates by state — The Denial Machine
```

**Supported:** Insurance Denials · Eviction Notices · Benefits Rejections · School Suspensions · Medical Bills · Credit Disputes

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────┐
│                  Browser (Client Only)              │
│                                                     │
│   Vanilla JS · GSAP · Lenis · D3.js · TopoJSON      │
│                                                     │
│   ┌──────────────┐        ┌───────────────────┐     │
│   │   Analyzer   │        │  Denial Machine   │     │
│   │  PDF · Text  │        │  D3 Choropleth    │     │
│   │  6 Doc Types │        │  50-State Dataset │     │
│   └──────┬───────┘        └───────────────────┘     │
│          │ fetch()                                   │
└──────────┼──────────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────────────┐
│            Google Gemini 2.5 Flash API              │
│                                                     │
│  6 Custom Prompt Chains — one per document type     │
│  Output: Structured JSON → rendered per field       │
│                                                     │
│  Insurance  │  Eviction  │  Benefits               │
│  School     │  Medical   │  Credit                 │
└─────────────────────────────────────────────────────┘
```

> **Why client-side only?** A tool for sensitive legal documents must be zero-trust by design. No server = no breach. Privacy isn't a feature — it's the architecture.

---

## 🔬 Prompt Engineering — The Real Technical Work

Six custom prompt chains. 30+ documented iterations. Each chain enforces:

| Rule | What It Prevents |
|------|-----------------|
| Extract verbatim claim numbers, dates, dollar amounts | Hallucinated reference numbers |
| Map findings to exact federal citations | Vague "you have rights" output |
| Calculate deadline from letter date; flag if undated | Wrong appeal windows |
| Never claim treatments not stated in letter | Fabricated medical history |
| Dynamic badge classification per denial type | Wrong Medical Necessity vs Prior Auth labels |
| Structured JSON output, all fields rendered independently | Template bleed between letter types |

---

## 📊 The Denial Machine

A first-of-its-kind civic data tool built inside UnDenied:

- 🗺️ Interactive US choropleth — all 50 states by denial rate
- 📍 Click any state → top denied procedures, worst insurers, appeal win rate
- 🏆 Sortable insurer rankings table
- 📌 TX leads at **29.4%** denied · MN best appeals at **84% win rate**

*No other free tool shows this data in this format.*

---

## 📅 20-Day Build Log

| Days | Shipped |
|------|---------|
| 1–3 | Legal domain research · ERISA/ACA mapping · prompt architecture |
| 4–8 | Cinematic frontend — Vanilla JS/CSS, GSAP, Lenis, custom cursor |
| 9–11 | Gemini API integration · 6 prompt chains · JSON parsing |
| 12–15 | The Denial Machine — D3.js map · 50-state dataset · insurer table |
| 16–18 | 5 additional pages — Analyzer · Know Your Rights · Stories · About |
| 19–20 | Vercel deploy · QA · prompt refinement |

*Every commit timestamped. Git history is the proof.*

---

## 💥 Real-World Impact

| Who It Helps | Scale | Source |
|---|---|---|
| Patients — wrongful medical denials | $88B in wrongful medical debt/year | Kaiser Family Foundation, 2023⁴ |
| Tenants — defective eviction notices | 50% of notices contain legal defects | Eviction Lab, Princeton, 2023⁵ |
| Benefits applicants — SNAP/Unemployment | 80% win when properly appealed | USDA FNS Data, 2022⁶ |
| Anyone — 200M+ letters/year | 80% never fight back | CFPB Annual Report, 2022¹ |

**Disproportionate victims:** low-income families · immigrants · elderly · first-generation students

---

## 🚀 Business Model

```
Phase 1 ── NOW ────────────────────────────────────────────
  Free public tool. Build trust. Reach people who need it.

Phase 2 ── B2C Freemium ($5–10/mo) ────────────────────────
  Core analysis free forever.
  Premium: certified-mail-ready packages + state commissioner contacts.

Phase 3 ── B2B API Licensing ───────────────────────────────
  White-label API to patient advocacy orgs, labor unions,
  hospital billing depts, employer benefits portals.
  Recurring enterprise revenue. Near-zero marginal cost.

The moat: privacy-first architecture competitors can't replicate
          + first-mover in consumer legal translation
          + proprietary denial pattern dataset at scale
```

**TAM: $50B+ in wrongfully denied claims annually⁷**

---

## 🛠️ Tech Stack

**Frontend**
`HTML5` `CSS3` `Vanilla JavaScript` `GSAP 3` `Lenis` `SplitType` `D3.js v7` `TopoJSON`

**AI**
`Google Gemini 2.5 Flash` — via client-side fetch, structured JSON output

**Infrastructure**
`Vercel` — static deployment, zero backend servers, zero databases

---

## ✅ Submission Checklist

- [x] Live deployed application
- [x] Public GitHub — full commit history
- [x] AI integration — Gemini 2.5 Flash
- [x] 6 document types with custom prompt chains
- [x] Interactive data visualization — The Denial Machine
- [x] Business model — 3-phase roadmap
- [x] Solo student founder · 20 days · zero budget
- [ ] Demo video *(add before submitting)*

---

## 📚 Sources

¹ CFPB Annual Report on Consumer Complaints, 2022 — [consumerfinance.gov](https://www.consumerfinance.gov/data-research/research-reports/consumer-response-annual-report-2022/)
² Kaiser Family Foundation — "Few Consumers Appeal Denials" — [kff.org](https://www.kff.org/private-insurance/issue-brief/claims-denials-and-appeals-in-aca-marketplace-plans/)
³ American Medical Association — Prior Authorization Survey, 2022 — [ama-assn.org](https://www.ama-assn.org/practice-management/sustainability/prior-authorization-research)
⁴ Kaiser Family Foundation — Medical Debt in the US, 2023 — [kff.org](https://www.kff.org/health-costs/issue-brief/the-burden-of-medical-debt-in-the-united-states/)
⁵ Eviction Lab, Princeton University — [evictionlab.org](https://evictionlab.org)
⁶ USDA Food and Nutrition Service — SNAP Fair Hearing Data, 2022 — [fns.usda.gov](https://www.fns.usda.gov/snap/appeals)
⁷ ProPublica — "How Insurers Deny Coverage" — [propublica.org](https://www.propublica.org/series/denied)

---

<div align="center">

*UnDenied provides information only, not legal advice.*
*Built by a student founder, ages 13–18, for civic purposes.*

**© 2026 UnDenied · MIT License**

</div>
