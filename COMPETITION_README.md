<div align="center">
  <img src="https://api.iconify.design/fa6-solid/scale-balanced.svg?color=white" width="100" alt="Scale of Justice" />
  <h1>UnDenied</h1>
  <h3>The AI-Powered Legal Translator & Appeal Strategist</h3>
  <p><em>Official Submission for the <strong>Creator Colosseum Startup Competition</strong></em></p>

  <!-- Badges -->
  <p>
    <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge" alt="License: MIT"></a>
    <img src="https://img.shields.io/badge/Status-Beta_Live-brightgreen.svg?style=for-the-badge" alt="Status">
    <img src="https://img.shields.io/badge/AI-Google_Gemini-blue.svg?style=for-the-badge" alt="AI Engine">
    <img src="https://img.shields.io/badge/Focus-Civic_Tech-ff69b4.svg?style=for-the-badge" alt="Impact">
  </p>

  <p>
    <strong>Built by a solo student founder to level the playing field against billion-dollar corporations.</strong><br>
    <em>"They expect you to give up. I make sure you don't."</em>
  </p>
  <br />
</div>

---

## <img src="https://api.iconify.design/bi/rocket.svg?color=white" width="28" height="28" align="center"> The Pitch in 30 Seconds

> **The Problem:** 80% of people never appeal wrongful determinations (insurance, medical, eviction) because corporate lawyers intentionally write them in confusing, intimidating legalese. 
> **The Solution:** UnDenied takes that jargon and instantly translates it into a plain-language, step-by-step tactical appeal strategy using cutting-edge AI.

### The Hustle Behind the Code
I didn't use a drag-and-drop website builder. I didn't rely on existing frameworks. Driven by the mission to stop vulnerable people from being bullied by bureaucracy, I spent countless late nights teaching myself to hand-code a cinematic UI in pure Vanilla JS and CSS, integrating it with a custom Python backend and Google's Gemini API from absolute scratch.

---

## <img src="https://api.iconify.design/bi/file-earmark-text.svg?color=white" width="28" height="28" align="center"> Competition Questionnaire 

### <img src="https://api.iconify.design/bi/lightbulb.svg?color=white" width="20" height="20" align="center" style="margin-right:8px;"> What is your startup idea?
**UnDenied** is a civic-tech web application that instantly translates intimidating legal documents—like predatory medical bills, wrongful eviction notices, and bad-faith insurance denials—into actionable, jargon-free appeal strategies using AI.

### <img src="https://api.iconify.design/bi/exclamation-triangle.svg?color=white" width="20" height="20" align="center" style="margin-right:8px;"> What is the problem you are solving and why it matters?
Corporations rely on "Appeal Fatigue." They know if they make the paperwork confusing enough, people will just pay the bill or walk away. 
* <img src="https://api.iconify.design/bi/graph-down-arrow.svg?color=white" width="16" height="16" align="center" style="margin-right:6px;"> **The Reality:** 80% of people give up immediately because they don't understand the letter.
* <img src="https://api.iconify.design/bi/graph-up-arrow.svg?color=white" width="16" height="16" align="center" style="margin-right:6px;"> **The Shocking Truth:** Of the 20% who *do* fight back, **up to 80% win their cases.** 
* <img src="https://api.iconify.design/bi/journal-text.svg?color=white" width="16" height="16" align="center" style="margin-right:6px;"> *(Sources backed by: ProPublica Healthcare Investigations, Kaiser Family Foundation (KFF), and the Consumer Financial Protection Bureau).*

This information asymmetry disproportionately hurts low-income families, immigrants, and the elderly. UnDenied exists to arm them.

### <img src="https://api.iconify.design/bi/gear.svg?color=white" width="20" height="20" align="center" style="margin-right:8px;"> What is your solution and how does it work?
We automate the legal discovery and strategy phase for the average consumer. 

**The UnDenied Workflow:**
1. **Upload:** User securely drops in a PDF or image of their denial letter.
2. **AI Parse:** The Gemini engine parses the document, extracting the core legal grounds and hidden deadlines.
3. **Translate:** Outputs a highly-digestible, plain-language explanation of what the letter *actually* means.
4. **Strategize:** Generates a custom, step-by-step tactical playbook on exactly how to fight back and win the appeal.

### <img src="https://api.iconify.design/bi/cash-stack.svg?color=white" width="20" height="20" align="center" style="margin-right:8px;"> What is your execution and business plan?
My roadmap scales value from individuals up to enterprise organizations with zero friction:
* **Phase 1: Validation & Data (Current):** A live, free public beta. The goal is to gather proprietary, anonymized data on systemic regional denial patterns while building massive consumer trust.
* **Phase 2: B2C Freemium:** Translation remains permanently free. I will introduce a $5-$10 premium tier that auto-generates formally formatted, ready-to-mail legal complaint drafts.
* **Phase 3: B2B Enterprise Licensing:** White-label the UnDenied API and license my anonymized denial data to consumer advocacy groups, labor unions, and NGOs for recurring B2B revenue.

### <img src="https://api.iconify.design/bi/bullseye.svg?color=white" width="20" height="20" align="center" style="margin-right:8px;"> Identification of your target market
* **Primary Focus:** Patients fighting predatory medical debt (an **$88 Billion** market in the US alone).
* **Secondary:** Tenants facing complex lease disputes, unjust fines, or evictions.
* **Tertiary:** Citizens navigating wrongful government benefit rejections (Unemployment, SNAP).

---

## <img src="https://api.iconify.design/bi/diagram-3.svg?color=white" width="28" height="28" align="center"> System Architecture

```mermaid
graph TD
    A[User Uploads Denial Letter] -->|Image/PDF| B(Frontend UI - Vanilla JS)
    B -->|Secure Content| C{Python/Flask Backend}
    C -->|Extracts Text & Context| D[Google Gemini API]
    D -->|NLP Analysis & Matching| C
    C -->|Structured JSON| B
    B --> E[Displays Plain-Language Translation]
    E --> F[Generates Step-by-Step Strategy]
    
    style A fill:#2e2e2e,stroke:#fff,stroke-width:2px,color:#fff
    style D fill:#1a73e8,stroke:#fff,stroke-width:2px,color:#fff
    style F fill:#28a745,stroke:#fff,stroke-width:2px,color:#fff
```

---

## <img src="https://api.iconify.design/bi/bar-chart-line.svg?color=white" width="28" height="28" align="center"> The Hard Proof: The "Denial Machine"

```mermaid
pie title The Reality of Wrongful Denials (Source: ProPublica / KFF)
    "Give up due to confusing jargon" : 80
    "Actually fight the appeal" : 20
```

```mermaid
pie title If You Actually Fight Back...
    "Patient Wins the Appeal" : 80
    "Corporate Wins" : 20
```

---

## <img src="https://api.iconify.design/bi/laptop.svg?color=white" width="28" height="28" align="center"> Technical Stack

### Frontend (Award-Winning Cinematic UI)
<img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" /> <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" /> <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" /> <img src="https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white" /> <img src="https://img.shields.io/badge/D3.js-F9A03C?style=for-the-badge&logo=d3.js&logoColor=white" />

### Backend & AI Engine
<img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" /> <img src="https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white" /> <img src="https://img.shields.io/badge/Google_Gemini-8E75B2?style=for-the-badge&logo=google&logoColor=white" />

*(Built entirely without drag-and-drop builders or bloated frameworks to maximize performance and demonstrate technical mastery).*

---

## <img src="https://api.iconify.design/bi/camera-video.svg?color=white" width="28" height="28" align="center"> Pitch & Demo

* <img src="https://api.iconify.design/bi/display.svg?color=white" width="16" height="16" align="center" style="margin-right:6px;"> **[Watch my 5-Minute Pitch Video Here]** *(Replace with actual link)*
* <img src="https://api.iconify.design/bi/rocket-takeoff.svg?color=white" width="16" height="16" align="center" style="margin-right:6px;"> **[View the Deployed Web App Here]** *(Replace with actual link)*
* <img src="https://api.iconify.design/bi/pc-display.svg?color=white" width="16" height="16" align="center" style="margin-right:6px;"> **[Link to GitHub Repository]** *(Replace with actual link)*

---

## <img src="https://api.iconify.design/bi/trophy.svg?color=white" width="28" height="28" align="center"> Alignment with Competition Criteria

| Core Competencies | Why UnDenied Maximizes the Rubric |
| :--- | :--- |
| **Effort and Work Ethic (40%)** | Built entirely from scratch by a solo student founder. I hand-coded the cinematic UI (bypassing templates), engineered a custom Python backend, and natively integrated live AI. The code density and complexity serve as highly measurable proof of effort. |
| **Feasibility & Execution (25%)** | This is a live, functioning application—not a Figma prototype. The 3-phase execution roadmap requires incredibly low overhead while simultaneously scaling into a highly viable Enterprise SaaS model. |
| **Potential Impact (25%)** | Directly attacks the massive "$88 Billion Med Debt" asymmetry. UnDenied provides fast, free, actionable translation that literally saves the most vulnerable users thousands of dollars and immense emotional distress. |
| **Communication & Clarity (10%)** | The entire product thesis *is* clarity. Both the application's clean UX and this pitch documentation are designed to instantly communicate complex systemic problems to non-experts. |
