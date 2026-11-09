import { AssessmentQuestion } from '@/types/ayurveda';

export const AGNI_QUESTIONS: AssessmentQuestion[] = [
  {
    id: 'aq-1',
    category: 'Hunger Consistency & Meal Predictability',
    categoryHindi: 'भूख की नियमितता एवं समयबद्धता',
    title: 'How predictably and consistently do you feel hungry at meal times?',
    titleHindi: 'भोजन के समय आपकी भूख कितनी नियमित और निश्चित रूप से लगती है?',
    classicalContext: 'Charaka Chikitsa 15:50 - Kshudha-pravritti',
    options: [
      {
        id: 'aq-1-sama',
        text: 'Reliable and regular: sharp hunger appears at proper meal times like clockwork and vanishes once fed',
        textHindi: 'नियमित एवं समयबद्ध: उचित समय पर स्पष्ट भूख लगना और तृप्ति के बाद शांत होना',
        weights: { vata: 0, pitta: 0, kapha: 0 },
        explanation: 'Sama Agni: Normal digestive rhythm'
      },
      {
        id: 'aq-1-vishama',
        text: 'Highly irregular: sometimes famished early, other days no hunger at all despite long intervals',
        textHindi: 'अत्यधिक अनियमित: कभी बहुत जल्दी भूख लग जाना, तो कभी पूरे दिन भूख न लगना',
        weights: { vata: 4, pitta: 0, kapha: 0 },
        explanation: 'Vishama Agni: Vata instability'
      },
      {
        id: 'aq-1-tikshna',
        text: 'Insatiable and ravenous: intense burning hunger quickly recurrs, even 1-2 hours after full meals',
        textHindi: 'तीव्र एवं भयंकर भूख: भोजन के 1-2 घंटे बाद ही दोबारा तेज भूख और बेचैनी लगना',
        weights: { vata: 0, pitta: 4, kapha: 0 },
        explanation: 'Tikshna Agni: Pitta hyper-metabolism'
      },
      {
        id: 'aq-1-manda',
        text: 'Dull, weak, absent: rarely feel truly hungry; eat mostly out of duty or social routine',
        textHindi: 'मंद, शिथिल या अनुपस्थित: सच्ची भूख बहुत कम लगना; केवल नियम के कारण खाना',
        weights: { vata: 0, pitta: 0, kapha: 4 },
        explanation: 'Manda Agni: Kapha hypo-metabolism'
      }
    ]
  },
  {
    id: 'aq-2',
    category: 'Time Taken for Full Gastric Digestion',
    categoryHindi: 'भोजन पाचन में लगने वाला समय (जारण काल)',
    title: 'How many hours does it typically take for your stomach to feel completely light and empty after a meal?',
    titleHindi: 'एक संतुलित भोजन करने के बाद आपका पेट पूरी तरह हल्का होने में सामान्यतः कितने घंटे लेता है?',
    classicalContext: 'Charaka Samhita Grahani Chikitsa - Jarana Kala',
    options: [
      {
        id: 'aq-2-sama',
        text: 'Normal: 3.5 to 4.5 hours, leaving feeling light, refreshed, and naturally ready for the next meal',
        textHindi: 'सामान्य: 3.5 से 4.5 घंटे, जिसके बाद पेट हल्का व स्फूर्तिदायक महसूस होता है',
        weights: { vata: 0, pitta: 0, kapha: 0 },
        explanation: 'Sama Agni: Optimal Jarana-Kala'
      },
      {
        id: 'aq-2-vishama',
        text: 'Erratic: one day digests quickly in 2 hours, next day remains churning and gassy for 6 hours',
        textHindi: 'अस्थिर: कभी 2 घंटे में ही पच जाना, तो कभी 6 घंटे तक पेट में गुड़गुड़ व गैस रहना',
        weights: { vata: 4, pitta: 0, kapha: 0 },
        explanation: 'Vishama Agni: Fluctuating digestive transit'
      },
      {
        id: 'aq-2-tikshna',
        text: 'Unusually fast: less than 2 hours; food clears rapidly, followed by epigastric irritation or nausea',
        textHindi: 'अति-तीव्र: 2 घंटे से भी कम समय में भोजन पच जाना, उसके बाद पेट में मरोड़ या दाह होना',
        weights: { vata: 0, pitta: 4, kapha: 0 },
        explanation: 'Tikshna Agni: Accelerated gastric emptying'
      },
      {
        id: 'aq-2-manda',
        text: 'Prolonged & delayed: 6 to 8+ hours; still feeling food heavy in the epigastrium even after half a day',
        textHindi: 'अत्यधिक विलंबित: 6 से 8+ घंटे तक पेट में भोजन जस का तस भारी पड़ा रहना',
        weights: { vata: 0, pitta: 0, kapha: 4 },
        explanation: 'Manda Agni: Gastroparesis-like delay'
      }
    ]
  },
  {
    id: 'aq-3',
    category: 'Post-Prandial Abdominal Sensation',
    categoryHindi: 'भोजनोपरांत उदर में होने वाली अनुभूति',
    title: 'What sensation predominantly arises within 30 to 90 minutes after eating a normal meal?',
    titleHindi: 'सामान्य भोजन करने के 30 से 90 मिनट के भीतर आपके पेट में कौन सा प्रमुख लक्षण उत्पन्न होता है?',
    classicalContext: 'Ashtanga Hridaya Sutrasthana 13 - Ahara Parinama',
    options: [
      {
        id: 'aq-3-sama',
        text: 'Pleasant comfort, sustained alertness, mental calm, no bloating, burning or nausea',
        textHindi: 'सुखद तृप्ति, मानसिक स्पष्टता, न कोई गैस, न जलन, न भारीपन',
        weights: { vata: 0, pitta: 0, kapha: 0 },
        explanation: 'Sama Agni: Samyak Jarna Lakshana'
      },
      {
        id: 'aq-3-vishama',
        text: 'Abdominal distension, dry flatulence, cramping twinges, sound of gurgling in intestines',
        textHindi: 'पेट फूलना, शुष्क गैस, पेट में मरोड़ और आंतों में गड़गड़ाहट की आवाज',
        weights: { vata: 4, pitta: 0, kapha: 0 },
        explanation: 'Vishama Agni: Vata Adhmana'
      },
      {
        id: 'aq-3-tikshna',
        text: 'Heartburn, sour belches, burning in chest or throat, flushed face, hot sweat',
        textHindi: 'सीने में जलन, खट्टी डकारें, गले में दाह, चेहरे पर गर्मी या पसीना आना',
        weights: { vata: 0, pitta: 4, kapha: 0 },
        explanation: 'Tikshna Agni: Vidagdha & Amla-parinama'
      },
      {
        id: 'aq-3-manda',
        text: 'Severe heavy stupor, drowsiness, thick salivation, nausea, desire to immediately lie down and sleep',
        textHindi: 'पेट में पत्थर सा भारीपन, तेज सुस्ती, मुंह में लार आना, जी मिचलाना, तुरंत सोने की इच्छा',
        weights: { vata: 0, pitta: 0, kapha: 4 },
        explanation: 'Manda Agni: Tandra & Alasya'
      }
    ]
  },
  {
    id: 'aq-4',
    category: 'Eructation & Belching Characteristics',
    categoryHindi: 'उद्गार (डकार) का स्वरूप एवं स्वाद',
    title: 'What are the quality, taste, and odor of your post-meal belches?',
    titleHindi: 'भोजन के बाद आने वाली डकारों का स्वाद और गंध कैसी होती है?',
    classicalContext: 'Charaka Chikitsa 15 - Udgara Lakshana',
    options: [
      {
        id: 'aq-4-sama',
        text: 'Clean and odorless: pure eructation (Shuddha Udgara) with no taste or unpleasant odor',
        textHindi: 'शुद्ध एवं गंधहीन: बिना किसी दुर्गंध या खटास के सामान्य शुद्ध डकार',
        weights: { vata: 0, pitta: 0, kapha: 0 },
        explanation: 'Sama Agni: Shuddha Udgara'
      },
      {
        id: 'aq-4-vishama',
        text: 'Frequent loud dry belches with air, occasionally tasting of the food eaten hours ago',
        textHindi: 'बार-बार जोर की हवा वाली डकारें, कभी-कभी कई घंटे पहले खाए खाने का स्वाद आना',
        weights: { vata: 4, pitta: 0, kapha: 0 },
        explanation: 'Vishama Agni: Vatodgara'
      },
      {
        id: 'aq-4-tikshna',
        text: 'Hot, acrid, sour, acid or bitter tasting belches that irritate the throat lining',
        textHindi: 'गर्म, तीखी, खट्टी या कड़वी डकारें जो गले और सीने को छीलती हुई प्रतीत हों',
        weights: { vata: 0, pitta: 4, kapha: 0 },
        explanation: 'Tikshna Agni: Amlodgara'
      },
      {
        id: 'aq-4-manda',
        text: 'Sweetish, slimy, stale belches with smell of undigested fat, accompanied by thick mucus',
        textHindi: 'मीठी, चिपचिपी, बासी डकारें जिसमें अपक्व भोजन की महक और कफ आए',
        weights: { vata: 0, pitta: 0, kapha: 4 },
        explanation: 'Manda Agni: Madhurodgara'
      }
    ]
  },
  {
    id: 'aq-5',
    category: 'Food Tolerance & Reaction to Heavy Meals',
    categoryHindi: 'गुरु (भारी) आहार पचाने की क्षमता',
    title: 'How does your digestive system handle a richer, heavier feast (e.g., dairy, sweets, fried items)?',
    titleHindi: 'दूध, मिठाई या गरिष्ठ भोजन करने पर आपका पाचन तंत्र कैसा व्यवहार करता है?',
    classicalContext: 'Charaka Vimanasthana 1 - Jaranashakti Pariksha',
    options: [
      {
        id: 'aq-5-sama',
        text: 'Digests smoothly if taken in reasonable moderation; no lingering digestive hangover',
        textHindi: 'उचित मात्रा में लेने पर बिना किसी परेशानी के सुचारू रूप से पच जाता है',
        weights: { vata: 0, pitta: 0, kapha: 0 },
        explanation: 'Sama Agni'
      },
      {
        id: 'aq-5-vishama',
        text: 'Completely hits and misses: sometimes digests fine, other times gives painful spasms and constipation',
        textHindi: 'कभी पच जाता है, तो कभी असहनीय गैस, पेट दर्द और कब्ज पैदा कर देता है',
        weights: { vata: 4, pitta: 0, kapha: 0 },
        explanation: 'Vishama Agni'
      },
      {
        id: 'aq-5-tikshna',
        text: 'Burns right through it; in fact, heavy/ghee rich food feels more soothing than light spicy food',
        textHindi: 'गरिष्ठ व घी युक्त भोजन से बल्कि राहत मिलती है, जबकि तीखा/हल्का भोजन और जलन करता है',
        weights: { vata: 0, pitta: 4, kapha: 0 },
        explanation: 'Tikshna Agni'
      },
      {
        id: 'aq-5-manda',
        text: 'Completely halts digestion; causes severe nausea, vomiting sensation, white coated tongue and headache',
        textHindi: 'पाचन पूरी तरह ठप; जी मिचलाना, उल्टी जैसा लगना, जीभ पर सफेद मैल और सिरदर्द होना',
        weights: { vata: 0, pitta: 0, kapha: 4 },
        explanation: 'Manda Agni'
      }
    ]
  }
];

export const AAMA_DIAGNOSTIC_MARKERS = [
  {
    id: 'aama-1',
    feature: 'Thick, white, greasy coating on the dorsal tongue surface in morning',
    sanskrit: 'Jihwa Lepa / Picchila Jihwa (जिह्वा लेप)',
    points: 3
  },
  {
    id: 'aama-2',
    feature: 'Morning general body stiffness, sluggish joints, inability to move freely upon waking',
    sanskrit: 'Stambha / Angamarda (स्तम्भ / अङ्गमर्द)',
    points: 3
  },
  {
    id: 'aama-3',
    feature: 'Heavy, foul-smelling, sticky stool that adheres persistently to the toilet pan or sinks',
    sanskrit: 'Gurutva & Durgandha Mala / Nimajjana (गुरु व दुर्गन्ध मल)',
    points: 3
  },
  {
    id: 'aama-4',
    feature: 'Lack of taste sensation, altered appetite, metallic or sweet-coated taste',
    sanskrit: 'Aruchi / Asyavairasya (अरुचि / आस्यवैरस्य)',
    points: 2
  },
  {
    id: 'aama-5',
    feature: 'Subjective feeling of clogged passages, sinus fullness, heavy chest or head',
    sanskrit: 'Srotorodha (स्रोतोरोध)',
    points: 2
  },
  {
    id: 'aama-6',
    feature: 'Persistent unexplained mental fog, apathy, lethargy, drop in physical enthusiasm',
    sanskrit: 'Balabhramsha / Alasya (बलभ्रंश / आलस्य)',
    points: 2
  }
];
