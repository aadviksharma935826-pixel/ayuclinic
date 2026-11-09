# AYUCLINIC AI 🌿
### *Bridging Classical Ayurveda with Intelligent Clinical Assessment*

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Ayurveda](https://img.shields.io/badge/Ayurveda-Classical_Samhitas-1c4d36?style=for-the-badge)](https://en.wikipedia.org/wiki/Ayurveda)

An evidence-informed, professional **Ayurvedic Clinical Assessment & Clinical Decision Support System (CDSS)** grounded in the classical literature of the Brihat-Trayi (*Charaka Samhita*, *Sushruta Samhita*, *Ashtanga Hridaya*) and Laghu-Trayi (*Madhava Nidana*, *Sharangadhara*, *Bhavaprakasha*). Designed for Ayurvedic physicians (BAMS/MD), scholars, practitioners, and patients.

---

## 🌟 Key Features

1. **Constitutional Deha Prakriti Assessment**:
   - 14 validated classical MCQ domains (*Charaka Vimana 8:95-99*, *Sushruta Sharira 4:64-76*).
   - Accurate Vata, Pitta, and Kapha scoring percentages.
   - Detects single-Dosha (*Eka-Doshaja*), dual-Dosha (*Dvandvaja*), and *Sama Prakriti* (Tridoshaja balance).
   - Strictly separated from acute present-day symptoms.

2. **Dosha Vikriti Assessment**:
   - 24-point cardinal symptom checklist across Vata, Pitta, and Kapha axes.
   - 5-stage *Shat-Kriyakala* progression (*Sanchaya, Prakopa, Prasara, Sthana-Samshraya, Vyakti*) from *Sushruta Sutrasthana 21:36*.
   - Severity scoring (Mild, Moderate, Severe) with comparative Prakriti-Vikriti delta gauges.

3. **Jatharagni & Aama Assessment**:
   - 4-type classification (*Sama, Vishama, Tikshna, Manda Agni*) per *Charaka Chikitsasthana 15:50*.
   - Clinical screening for metabolic endotoxins (*Aama*) via tongue coating (*Jihwa Lepa*), foul stool, and stiffness.

4. **Kostha Pariksha Module**:
   - *Mridu, Madhyama, and Krura Kostha* evaluation (*Ashtanga Hridaya Sutra 1:8*).
   - Built-in safety directive prohibiting autonomous purgative prescriptions.

5. **Doctor's CDSS Workstation**:
   - Comprehensive **Ashtavidha Pariksha** (*Nadi, Mutra, Mala, Jihwa, Shabda, Sparsha, Drik, Akriti*).
   - Evidence-weighted differential diagnosis generator (*Amavata* vs *Vatarakta* vs *Sandhigatavata*; *Amlapitta* vs *Grahani Roga*) with supporting vs opposing evidence.
   - Red-flag screening protocol for emergency escalation (ACS, stroke, acute abdomen, melena).
   - Electronic physician sign-off workflow with AYUSH council registration numbers.

6. **AYU AI — Clinical Assistant**:
   - Bilingual (English & हिन्दी) conversational assistant powered by a verified classical RAG retrieval engine.
   - Context-aware analysis of active patient reports. Zero hallucinated verses guarantee.

7. **Personalized Health Protocol (Ahara & Vihara)**:
   - *Ahara*: *Pathya* vs *Apathya* foods, meal timings, Agni-tuned advice (*Charaka Vimana 1:24*).
   - *Vihara*: Sleep hygiene, physical exercise (*Vyayama* to *Ardha-Shakti*), stress reduction (*Sattvavajaya*).
   - *Dinacharya* & *Ritucharya* seasonal regimen.
   - *Chikitsa Principles* for clinician review.

8. **Medical-Grade PDF Report Generator**:
   - Official letterhead, unique report ID (e.g., `AYU-2026-1001`), patient vitals, Tridosha distribution, and doctor digital signature block.

9. **Classical Samhita Searchable Library**:
   - Authentic Sanskrit shlokas, IAST transliterations, Hindi/English translations, and modern correlations.

10. **Admin Dashboard**:
    - Scoring algorithm calibration, question weights, and version-controlled audit logs.

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v18.0.0 or higher
- [Git](https://git-scm.com/)

### Installation

```bash
# Clone the repository
git clone https://github.com/<your-username>/ayuclinic-ai.git

# Navigate to project directory
cd ayuclinic-ai

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

---

## 🛡️ Medical Safety & Statutory Notice

**AYUCLINIC AI** is designed exclusively as an evidence-informed clinical decision-support and educational tool. It does **not** autonomously prescribe medications or replace in-person diagnostic examination by a qualified registered Ayurvedic practitioner (BAMS / MD). All treatment decisions remain the responsibility of the treating clinician.

---

## 📜 License
MIT License. Free for educational and clinical research use.
