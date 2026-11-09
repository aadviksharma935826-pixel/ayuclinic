import { NextRequest, NextResponse } from 'next/server';
import { CLASSICAL_KNOWLEDGE_BASE } from '@/data/classicalKnowledgeBase';
import { DIFFERENTIAL_KNOWLEDGE_BASE } from '@/data/differentialRules';

export async function POST(req: NextRequest) {
  try {
    const { messages, currentAssessment, language = 'en' } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Messages array is required' }, { status: 400 });
    }

    const latestMessage = messages[messages.length - 1]?.content || '';
    const queryLower = latestMessage.toLowerCase();

    // 1. Classical RAG Retrieval: Search classical knowledge base for relevant verses
    const relevantReferences = CLASSICAL_KNOWLEDGE_BASE.filter((ref) => {
      const q = queryLower;
      return (
        ref.tags.some(t => q.includes(t.toLowerCase())) ||
        ref.englishTranslation.toLowerCase().includes(q) ||
        ref.hindiTranslation.includes(latestMessage) ||
        ref.sanskritDevanagari.includes(latestMessage) ||
        (q.includes('prakriti') && ref.category === 'Prakriti') ||
        (q.includes('agni') && ref.category === 'Agni') ||
        (q.includes('kostha') && ref.category === 'Kostha') ||
        (q.includes('aama') && ref.category === 'Agni') ||
        (q.includes('dinacharya') && ref.category === 'Ahara-Vihara') ||
        (q.includes('kriyakala') && ref.category === 'Samprapti')
      );
    }).slice(0, 3);

    // 2. Differential RAG Retrieval
    const relevantDifferentials = DIFFERENTIAL_KNOWLEDGE_BASE.filter((diff) => {
      const q = queryLower;
      return (
        q.includes(diff.id) ||
        q.includes(diff.ayurvedicDisease.toLowerCase()) ||
        q.includes(diff.modernEquivalent.toLowerCase()) ||
        (q.includes('joint') && (diff.id === 'amavata' || diff.id === 'sandhigatavata' || diff.id === 'vatarakta')) ||
        (q.includes('reflux') && diff.id === 'amlapitta') ||
        (q.includes('ibs') && diff.id === 'grahani_roga')
      );
    }).slice(0, 2);

    // Check for Gemini API key
    const geminiApiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    if (geminiApiKey) {
      try {
        const ragContextText = relevantReferences.map(r => 
          `[${r.samhita} ${r.sthana} Ch.${r.chapter}:${r.shlokaNumber}]\n"${r.sanskritDevanagari}"\nHindi: ${r.hindiTranslation}\nEnglish: ${r.englishTranslation}\nClinical Relevance: ${r.clinicalSignificance}`
        ).join('\n\n');

        const assessmentContext = currentAssessment ? `
Current Patient Clinical Assessment in Context:
- Name: ${currentAssessment.patientProfile?.fullName || 'Patient'}
- Prakriti (Constitutional): ${currentAssessment.prakriti?.classification} (Vata: ${currentAssessment.prakriti?.vataPercentage}%, Pitta: ${currentAssessment.prakriti?.pittaPercentage}%, Kapha: ${currentAssessment.prakriti?.kaphaPercentage}%)
- Current Vikriti: ${currentAssessment.vikriti?.dominantImbalance?.join('-') || 'Balanced'} (${currentAssessment.vikriti?.severity})
- Jatharagni: ${currentAssessment.agni?.classification} (Aama: ${currentAssessment.agni?.aamaStatus})
- Kostha: ${currentAssessment.kostha?.classification}
- Reported Symptoms: ${currentAssessment.vikriti?.selectedSymptoms?.join(', ') || 'None recorded'}
` : 'No current patient assessment active.';

        const systemPrompt = `You are AYU AI, the Ayurvedic Clinical Assistant for the AYUCLINIC AI platform.
You are grounded in authentic classical Ayurvedic literature: Charaka Samhita, Sushruta Samhita, Ashtanga Hridaya, and Madhava Nidana.
CRITICAL SAFETY & MEDICAL INTEGRITY RULES:
1. Never fabricate Sanskrit shlokas, verse numbers, chapters, or authors. Only quote genuine verses from the provided RAG context or state clearly that a citation requires manual samhita verification.
2. Clearly distinguish between constitutional baseline (Prakriti) and present-day acute imbalance (Vikriti).
3. Distinguish classical Ayurvedic concepts from modern medical differential diagnosis.
4. If the user presents red-flag symptoms (severe chest pain, dyspnea, focal neurology, high fever with neck rigidity, melena), advise immediate Emergency Medical Services (112) triage.
5. Provide bilingual assistance (Hindi and English) as requested by the user. Understand Sanskrit terminology (Agni, Aama, Srotas, Dhatu, Kostha).
6. Never issue autonomous medical prescriptions. Frame all treatments as educational considerations for a registered Ayurvedic doctor (BAMS/MD).

VERIFIED RAG REFERENCES:
${ragContextText || 'Standard Brihat-Trayi definitions apply.'}

PATIENT CONTEXT:
${assessmentContext}
`;

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiApiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [{ text: `${systemPrompt}\n\nUser Question:\n${latestMessage}` }]
              }
            ],
            generationConfig: {
              temperature: 0.3,
              maxOutputTokens: 1000
            }
          })
        });

        if (response.ok) {
          const data = await response.json();
          const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (replyText) {
            return NextResponse.json({
              reply: replyText,
              citations: relevantReferences,
              differentials: relevantDifferentials,
              source: 'gemini-2.5-flash-grounded-rag'
            });
          }
        }
      } catch (geminiError) {
        console.warn('Gemini API call failed, falling back to verified local Ayurvedic clinical reasoning engine:', geminiError);
      }
    }

    // 3. High-Quality Deterministic Classical Ayurvedic Engine (Offline / Local Verified RAG)
    let reply = '';
    const isHindi = /[\u0900-\u097F]/.test(latestMessage) || queryLower.includes('hindi') || queryLower.includes('नमस्ते');

    if (queryLower.includes('prakriti') || queryLower.includes('प्रकृति') || queryLower.includes('constitution')) {
      if (isHindi) {
        reply = `प्रकृति (Prakriti) व्यक्ति की जन्मजात देह-प्रकृति है, जो गर्भाधान के समय शुक्र-शोणित के संयोग से निर्धारित होती है (चरक शरीरस्थान 8:96)। यह आजीवन अपरिवर्तित रहती है।

• **वात प्रकृति**: हल्का शरीर, चंचल मन, शुष्क त्वचा, हल्की नींद (चरक विमानस्थान 8:95)।
• **पित्त प्रकृति**: मध्यम सुडौल शरीर, तीक्ष्ण जठराग्नि, उष्णता के प्रति असहिष्णुता, प्रखर बुद्धि (चरक विमानस्थान 8:97)।
• **कफ प्रकृति**: सुदृढ़ अस्थि-संधियां, उत्तम बल, स्निग्ध त्वचा, गंभीर धैर्य (चरक विमानस्थान 8:99)।

${currentAssessment ? `वर्तमान रोगी की प्रकृति: **${currentAssessment.prakriti.classification}** (वात: ${currentAssessment.prakriti.vataPercentage}%, पित्त: ${currentAssessment.prakriti.pittaPercentage}%, कफ: ${currentAssessment.prakriti.kaphaPercentage}%)।` : ''}`;
      } else {
        reply = `In classical Ayurveda, **Deha Prakriti** represents an individual's innate congenital constitution, established irreversibly at conception through the parental gametic Dosha state (Charaka Sharirasthana 8:96-98).

Classical distinction:
• **Vata Prakriti**: Slender frame, quick movement, cold intolerance, variable appetite, light sleep (Charaka Vimana 8:95).
• **Pitta Prakriti**: Medium symmetrical build, sharp digestion (Tikshnagni), heat sensitivity, assertive mind (Charaka Vimana 8:97).
• **Kapha Prakriti**: Robust compact build, supreme physical endurance (Mahabala), unctuous skin, steady calm disposition (Charaka Vimana 8:99).

${currentAssessment ? `For the currently active patient assessment, the constitutional baseline is **${currentAssessment.prakriti.classification}** (Vata: ${currentAssessment.prakriti.vataPercentage}%, Pitta: ${currentAssessment.prakriti.pittaPercentage}%, Kapha: ${currentAssessment.prakriti.kaphaPercentage}%).` : ''}`;
      }
    } else if (queryLower.includes('agni') || queryLower.includes('अग्नि') || queryLower.includes('digestion')) {
      if (isHindi) {
        reply = `जठराग्नि (Digestive Fire) शरीर का मुख्य जीवन आधार है। चरक चिकित्सा 15:3 के अनुसार — "शान्तेऽग्नौ म्रियते, युक्ते चिरं जीवत्यनामयः" (अग्नि शांत होने पर मृत्यु हो जाती है, अग्नि सम रहने पर व्यक्ति नीरोग होकर दीर्घायु होता है)।

अग्नि के 4 प्रकार हैं (चरक चिकित्सा 15:50):
1. **सम अग्नि (Sama Agni)**: तीनों दोषों के संतुलन से उत्तम पाचन।
2. **विषम अग्नि (Vishama Agni)**: वात के प्रभाव से कभी तेज, कभी मंद पाचन और पेट में गैस।
3. **तीक्ष्ण अग्नि (Tikshna Agni)**: पित्त के प्रभाव से अति-तीव्र पाचन, सीने में जलन और खट्टी डकारें।
4. **मंद अग्नि (Manda Agni)**: कफ के प्रभाव से धीमा पाचन, भारीपन और "आम" (Aama) का निर्माण।

${currentAssessment ? `वर्तमान रोगी का अग्नि वर्गीकरण: **${currentAssessment.agni.classification}** (Aama स्थिति: ${currentAssessment.agni.aamaStatus})।` : ''}`;
      } else {
        reply = `**Jatharagni** (digestive and metabolic fire) is the central pivot of health. Charaka Samhita Chikitsasthana 15:3 affirms:
*"Longevity, complexion, strength, vitality, cellular nutrition, and Ojas all depend upon internal Agni."*

The 4 Classical States of Agni (Charaka Chikitsa 15:50):
1. **Sama Agni**: Balanced Tridosha metabolism; timely digestion without gas or heartburn.
2. **Vishama Agni**: Governed by Vata; erratic appetite, unpredictable digestion time, and flatulence.
3. **Tikshna Agni**: Driven by Pitta; hyperactive rapid digestion, acid reflux, and mucosal burning.
4. **Manda Agni**: Dampened by Kapha; sluggish transit, heaviness, post-prandial stupor, and accumulation of toxic **Aama**.

${currentAssessment ? `Active Assessment Status: **${currentAssessment.agni.classification}** with **${currentAssessment.agni.aamaStatus}**.` : ''}`;
      }
    } else if (queryLower.includes('kostha') || queryLower.includes('कोष्ठ') || queryLower.includes('bowel') || queryLower.includes('constipation')) {
      reply = `**Kostha Pariksha** (Ashtanga Hridaya Sutrasthana 1:8) assesses enteric sensitivity and colonic transit:
1. **Mridu Kostha**: Pitta-dominant; rapid transit, loose soft stools, easily evacuates even with warm milk or sugarcane juice.
2. **Madhyama Kostha**: Kapha/Tridosha balanced; comfortable, regular cylindrical bowel movements once daily.
3. **Krura Kostha**: Vata-dominant; hard, dry, pellet-like stools with straining, refractory to mild lubricants.

*Clinical Safety Caveat:* Kostha reflects bowel responsiveness and must never be used alone to prescribe strong Virechana or Panchakarma without direct physician examination.`;
    } else if (queryLower.includes('differential') || queryLower.includes('diagnos') || queryLower.includes('amavata') || queryLower.includes('joint')) {
      reply = `**Ayurvedic Differential Diagnosis Support:**
When assessing inflammatory joint pathologies, classical literature distinguishes:

1. **Amavata (Madhava Nidana 25)**: Vata + Kapha + Aama. Cardinal signs: Morning stiffness (Stambha) > 1 hr, migratory symmetrical joint pain, coated tongue, heaviness. Modern correlation: *Rheumatoid Arthritis*.
2. **Vatarakta (Charaka Chikitsa 29)**: Vata + Rakta Dhatu. Excruciating throbbing pain classically starting in the great toe (Angusthamoola), intense erythema, burning. Modern correlation: *Gouty Arthritis*.
3. **Sandhigatavata (Charaka Chikitsa 28)**: Vata without Aama (Dhatukshaya). Pain on weight-bearing, palpable crepitus (Vatapurna Driti), minimal morning stiffness. Modern correlation: *Osteoarthritis*.

*Doctor Directive:* Recommend CBC, ESR, hs-CRP, RF, and Serum Uric Acid for laboratory correlation.`;
    } else if (currentAssessment && (queryLower.includes('report') || queryLower.includes('patient') || queryLower.includes('summary'))) {
      reply = `**Clinical Summary for Patient: ${currentAssessment.patientProfile.fullName}**
• **Constitutional Prakriti:** ${currentAssessment.prakriti.classification} (Vata ${currentAssessment.prakriti.vataPercentage}%, Pitta ${currentAssessment.prakriti.pittaPercentage}%, Kapha ${currentAssessment.prakriti.kaphaPercentage}%)
• **Present Vikriti Imbalance:** ${currentAssessment.vikriti.dominantImbalance.join('-') || 'Balanced'} (${currentAssessment.vikriti.severity} severity)
• **Digestive Fire (Jatharagni):** ${currentAssessment.agni.classification}
• **Aama Status:** ${currentAssessment.agni.aamaStatus}
• **Kostha:** ${currentAssessment.kostha.classification}
• **Active Symptoms:** ${currentAssessment.vikriti.selectedSymptoms.slice(0, 4).join(', ')}

**Recommended Clinical Next Step:** Review the personalized Ahara-Vihara protocol and finalize the doctor's assessment report.`;
    } else {
      reply = `Welcome to **AYU AI – Your Ayurvedic Clinical Assistant**.

I am grounded in authentic classical literature: Charaka Samhita, Sushruta Samhita, Ashtanga Hridaya, and Madhava Nidana.

I can assist you with:
1. **Prakriti & Vikriti Analysis**: Understanding congenital constitution vs. current acute Dosha imbalance.
2. **Jatharagni & Aama Status**: Classifying Sama, Vishama, Tikshna, or Manda Agni, and identifying metabolic endotoxins.
3. **Kostha Evaluation**: Analyzing colonic transit patterns (Mridu, Madhyama, Krura).
4. **Differential Diagnosis Support (CDSS)**: Juxtaposing classical Nidana Panchaka criteria for conditions like Amavata, Vatarakta, Amlapitta, and Grahani Roga.
5. **Authentic Classical Citations**: Explaining genuine Sanskrit verses with Hindi and English translations.

How may I assist your clinical inquiry today? (You may ask in English or हिन्दी).`;
    }

    return NextResponse.json({
      reply,
      citations: relevantReferences,
      differentials: relevantDifferentials,
      source: 'classical-rag-engine'
    });
  } catch (error: any) {
    console.error('Chat API error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
