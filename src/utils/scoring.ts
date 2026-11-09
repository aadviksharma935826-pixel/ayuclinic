import { 
  PrakritiScoreResult, 
  PrakritiType, 
  DoshaType, 
  VikritiResult, 
  AgniResult, 
  KosthaResult, 
  AamaStatus,
  AgniType,
  KosthaType
} from '@/types/ayurveda';
import { VIKRITI_SYMPTOMS_LIST } from '@/data/vikritiQuestions';

export function calculatePrakriti(answers: Record<string, string>, questions: any[]): PrakritiScoreResult {
  let vata = 0;
  let pitta = 0;
  let kapha = 0;

  questions.forEach((q) => {
    const selectedOptionId = answers[q.id];
    if (selectedOptionId) {
      const option = q.options.find((opt: any) => opt.id === selectedOptionId);
      if (option) {
        vata += option.weights.vata;
        pitta += option.weights.pitta;
        kapha += option.weights.kapha;
      }
    }
  });

  const total = Math.max(vata + pitta + kapha, 1);
  const vataPercentage = Math.round((vata / total) * 100);
  const pittaPercentage = Math.round((pitta / total) * 100);
  const kaphaPercentage = 100 - (vataPercentage + pittaPercentage); // ensure sum is 100%

  // Sort scores to determine dominant doshas
  const scores: { dosha: DoshaType; score: number; pct: number }[] = [
    { dosha: 'Vata' as DoshaType, score: vata, pct: vataPercentage },
    { dosha: 'Pitta' as DoshaType, score: pitta, pct: pittaPercentage },
    { dosha: 'Kapha' as DoshaType, score: kapha, pct: kaphaPercentage },
  ].sort((a, b) => b.score - a.score);

  const primary = scores[0];
  const secondary = scores[1];
  const tertiary = scores[2];

  let classification: PrakritiType;
  let explanation = '';
  let citation = 'Charaka Samhita Vimanasthana 8:95-99; Sushruta Samhita Sharirasthana 4:64-76';

  // Check for Sama Prakriti (Tridoshaja) if all three are within 6% of each other
  if (Math.abs(primary.pct - secondary.pct) <= 6 && Math.abs(secondary.pct - tertiary.pct) <= 6) {
    classification = 'Sama Prakriti (Tridoshaja)';
    explanation = 'Exceptional baseline constitutional balance. All three Doshas (Vata, Pitta, and Kapha) are proportionally distributed, conferring supreme physiological resilience (Bala), metabolic stability, and longevity.';
  } else if (primary.pct - secondary.pct >= 14) {
    // Single dosha dominant (Eka-Doshaja)
    classification = `${primary.dosha}ja` as PrakritiType;
    explanation = `Marked constitutional dominance of ${primary.dosha} Dosha (${primary.pct}%). Your lifelong physical stature, metabolic rate, thermal response, and psychological traits are predominantly governed by the qualities of ${primary.dosha}.`;
  } else {
    // Dual dosha dominant (Dvandvaja)
    classification = `${primary.dosha}-${secondary.dosha}` as PrakritiType;
    explanation = `Dual constitutional dominance (Dvandvaja Prakriti) of ${primary.dosha} (${primary.pct}%) and ${secondary.dosha} (${secondary.pct}%). You embody a dynamic combination of ${primary.dosha}'s kinetic/energetic characteristics and ${secondary.dosha}'s physiological qualities.`;
  }

  // Construct classical traits based on dominant doshas
  const physicalTraits: string[] = [];
  const physiologicalTraits: string[] = [];
  const psychologicalTraits: string[] = [];

  if (vataPercentage >= 30) {
    physicalTraits.push('Slender or lighter bone frame; prominent joints or superficial veins (Charaka Vimana 8:95)');
    physiologicalTraits.push('Variable appetite and digestive pace; propensity towards dryness and light sleep');
    psychologicalTraits.push('Fast-acting mind, rapid grasping of ideas, heightened creativity and mobility');
  }
  if (pittaPercentage >= 30) {
    physicalTraits.push('Medium athletic frame, warm radiant complexion, sensitivity to direct sun');
    physiologicalTraits.push('Sharp punctual hunger (Tikshnagni), robust sweating, high heat generation');
    psychologicalTraits.push('Sharp analytical discernment, articulate communication, purposeful goal orientation');
  }
  if (kaphaPercentage >= 30) {
    physicalTraits.push('Sturdy, dense skeletal build, thick lustrous hair, excellent natural joint cushioning');
    physiologicalTraits.push('Steady endurance, deep sound sleep, stable long-term tissue hydration');
    psychologicalTraits.push('Calm emotional temperament, high patience, exceptional long-term memory retention');
  }

  return {
    vataScore: vata,
    pittaScore: pitta,
    kaphaScore: kapha,
    totalScore: total,
    vataPercentage,
    pittaPercentage,
    kaphaPercentage,
    primaryDosha: primary.dosha,
    secondaryDosha: secondary.pct >= 28 ? secondary.dosha : undefined,
    classification,
    explanation,
    classicalCitation: citation,
    characteristics: {
      physical: physicalTraits.slice(0, 3),
      physiological: physiologicalTraits.slice(0, 3),
      psychological: psychologicalTraits.slice(0, 3),
    }
  };
}

export function calculateVikriti(
  selectedSymptomIds: string[], 
  kriyaKalaStage: any = 'Prakopa (Aggravation)'
): VikritiResult {
  let vataScore = 0;
  let pittaScore = 0;
  let kaphaScore = 0;

  const selectedSymptoms: string[] = [];
  const clinicalObservations: string[] = [];

  selectedSymptomIds.forEach((id) => {
    const item = VIKRITI_SYMPTOMS_LIST.find((s) => s.id === id);
    if (item) {
      selectedSymptoms.push(`${item.symptom} (${item.symptomSanskrit})`);
      clinicalObservations.push(`Imbalance in ${item.system}: ${item.symptom}`);
      if (item.dosha === 'Vata') vataScore += item.severityWeight;
      if (item.dosha === 'Pitta') pittaScore += item.severityWeight;
      if (item.dosha === 'Kapha') kaphaScore += item.severityWeight;
    }
  });

  const dominantImbalance: DoshaType[] = [];
  const maxScore = Math.max(vataScore, pittaScore, kaphaScore);

  if (maxScore > 0) {
    if (vataScore >= maxScore * 0.75) dominantImbalance.push('Vata');
    if (pittaScore >= maxScore * 0.75) dominantImbalance.push('Pitta');
    if (kaphaScore >= maxScore * 0.75) dominantImbalance.push('Kapha');
  }

  const totalScore = vataScore + pittaScore + kaphaScore;
  let severity: 'Mild' | 'Moderate' | 'Severe' = 'Mild';
  if (totalScore >= 16) severity = 'Severe';
  else if (totalScore >= 8) severity = 'Moderate';

  let explanation = '';
  if (dominantImbalance.length === 0) {
    explanation = 'No significant acute Dosha aggravation reported at this time. Physiological homeostasis is well preserved.';
  } else if (dominantImbalance.length === 1) {
    explanation = `Clear acute manifestation of ${dominantImbalance[0]} Vriddhi (aggravation). Clinical presentation is characterized by ${dominantImbalance[0]}-specific functional disturbances in target Srotas.`;
  } else {
    explanation = `Combined acute disturbance involving ${dominantImbalance.join(' and ')} (Dvisamsarga / Sannipata). Multi-system involvement requiring coordinated Shamana management.`;
  }

  return {
    vataScore,
    pittaScore,
    kaphaScore,
    dominantImbalance,
    kriyaKalaStage,
    severity,
    selectedSymptoms,
    clinicalObservations,
    explanation
  };
}

export function calculateAgni(
  answers: Record<string, string>, 
  questions: any[],
  selectedAamaMarkers: string[] = []
): AgniResult {
  let vataCount = 0;
  let pittaCount = 0;
  let kaphaCount = 0;
  let samaCount = 0;

  questions.forEach((q) => {
    const selectedOptionId = answers[q.id];
    if (selectedOptionId) {
      if (selectedOptionId.includes('vishama')) vataCount += 1;
      else if (selectedOptionId.includes('tikshna')) pittaCount += 1;
      else if (selectedOptionId.includes('manda')) kaphaCount += 1;
      else if (selectedOptionId.includes('sama')) samaCount += 1;
    }
  });

  const supportingSymptoms: string[] = [];
  const contradictorySymptoms: string[] = [];
  let classification: AgniType = 'Sama Agni';
  let classicalExplanation = '';
  let managementConsiderations: string[] = [];

  const maxCount = Math.max(samaCount, vataCount, pittaCount, kaphaCount);

  if (maxCount === samaCount) {
    classification = 'Sama Agni';
    classicalExplanation = 'Charaka Samhita Chikitsa 15:51 describes Sama Agni as balanced digestion where food is assimilated within optimal Jarana Kala without flatulence, heartburn, or sluggishness. Indicates Tridosha harmony.';
    supportingSymptoms.push('Regular punctual hunger', 'Clean odorless eructation', 'Comfortable complete post-meal digestion');
    managementConsiderations = [
      'Preserve current wholesome dietary timings (Samashana)',
      'Avoid sudden overeating or unnecessary strict fasting',
      'Follow seasonal Ritucharya modifications to sustain Agni'
    ];
  } else if (maxCount === vataCount) {
    classification = 'Vishama Agni';
    classicalExplanation = 'Charaka Samhita Chikitsa 15:50: "विषमो वाततः" — Under Vata vitiation, digestive fire becomes erratic, unpredictable, and easily blown like a flickering flame in wind. Produces alternating digestion and gas.';
    supportingSymptoms.push('Unpredictable hunger patterns', 'Post-prandial abdominal flatulence & distension (Adhmana)', 'Variable digestion speed');
    if (pittaCount > 0) contradictorySymptoms.push('Occasional heartburn symptoms');
    managementConsiderations = [
      'Warm, unctuous (Snigdha), grounding meals taken at strictly fixed hours',
      'Mild Vata-pacifying carminatives: Hingvashtak Churna, Trikatu with ghee, Ajwain with rock salt',
      'Avoid raw cold salads, carbonated drinks, dry crackers, and erratic meal skips'
    ];
  } else if (maxCount === pittaCount) {
    classification = 'Tikshna Agni';
    classicalExplanation = 'Charaka Samhita Chikitsa 15:50: "पित्तात्तीक्ष्णो" — Excessive Ushna and Tikshna attributes of Pitta hyper-stimulate gastric secretion, causing rapid digestion, mucosal burning, and Atyagni tendency.';
    supportingSymptoms.push('Ravenous hunger recurring rapidly', 'Retrosternal burning / heartburn (Vidaha)', 'Sour or acrid belching (Amlodgara)');
    if (kaphaCount > 0) contradictorySymptoms.push('Occasional heavy morning fullness');
    managementConsiderations = [
      'Cooling, unctuous, sweet (Madhura) and bitter (Tikta) foods to pacify Pitta',
      'Formulations: Avipattikar Churna, Kamadudha Rasa, Shatavari Ghrita, Coriander-Fennel infusion',
      'Strictly minimize chili, mustard, fermented foods, alcohol, vinegar, and late-night dinners'
    ];
  } else {
    classification = 'Manda Agni';
    classicalExplanation = 'Charaka Samhita Chikitsa 15:50: "मन्दः कफेन तु" — Excessive cold, heavy, and unctuous qualities of Kapha dampen the digestive fire, causing prolonged gastric transit and toxic Aama formation.';
    supportingSymptoms.push('Dull or absent hunger', 'Post-meal stupor and heaviness (Gaurava)', 'Delayed gastric emptying exceeding 6-8 hours');
    managementConsiderations = [
      'Warm, light (Laghu), dry (Ruksha) and pungent/bitter foods (Pachana-Deepana)',
      'Formulations: Chitrakadi Vati, Trikatu with honey, Shunthi water, Pippali Churna',
      'Avoid chilled dairy, ice water, heavy oily sweets, and day sleeping (Divaswapna)'
    ];
  }

  // Calculate Aama Status
  const aamaScore = selectedAamaMarkers.length;
  let aamaStatus: AamaStatus = 'Nirama (No toxic metabolic debris)';
  const aamaIndicators: string[] = [];

  if (aamaScore >= 4) {
    aamaStatus = 'Saama (Significant Aama presence)';
    aamaIndicators.push('Multiple cardinal Aama markers present: Requires therapeutic Deepana-Pachana and Langhana before any heavy nourishment (Brimhana).');
  } else if (aamaScore >= 2) {
    aamaStatus = 'Alpa Aama (Mild sluggishness/coating)';
    aamaIndicators.push('Mild metabolic stagnation detected: Warm ginger water, light fasting, and gentle carminatives indicated.');
  }

  const confidence = Math.min(95, Math.round((maxCount / (questions.length || 1)) * 100));

  return {
    classification,
    confidence,
    supportingSymptoms,
    contradictorySymptoms,
    classicalExplanation,
    classicalCitation: 'Charaka Samhita Chikitsasthana 15 (Grahani Chikitsa Adhyaya)',
    managementConsiderations,
    aamaStatus,
    aamaIndicators
  };
}

export function calculateKostha(answers: Record<string, string>, questions: any[]): KosthaResult {
  let mridu = 0;
  let madhyama = 0;
  let krura = 0;

  questions.forEach((q) => {
    const selected = answers[q.id];
    if (selected) {
      if (selected.includes('mridu')) mridu += 4;
      else if (selected.includes('madhyama')) madhyama += 4;
      else if (selected.includes('krura')) krura += 4;
    }
  });

  const max = Math.max(mridu, madhyama, krura);
  let classification: KosthaType = 'Madhyama Kostha';
  const supportingFeatures: string[] = [];
  let classicalRationale = '';

  if (max === mridu) {
    classification = 'Mridu Kostha';
    supportingFeatures.push('Soft/loose stool consistency', 'Rapid bowel evacuation', 'Sensitive to milk, grapes, or warm water laxation');
    classicalRationale = 'Ashtanga Hridaya Sutrasthana 1:8 designates Mridu Kostha as Pitta-predominant bowel motility. Colonic mucosal transit is swift and highly responsive to gentle lubricants.';
  } else if (max === krura) {
    classification = 'Krura Kostha';
    supportingFeatures.push('Hard, dry, pellet-like stools', 'Prolonged evacuation time with straining', 'Refractory to mild laxatives like warm milk');
    classicalRationale = 'Ashtanga Hridaya Sutrasthana 1:8 attributes Krura Kostha to dominant Vata dryness in Pakvashaya. Mucosal secretions are depleted, causing stubborn fecal retention.';
  } else {
    classification = 'Madhyama Kostha';
    supportingFeatures.push('Regular, well-formed cylindrical stool once daily', 'Comfortable spontaneous evacuation without straining', 'Balanced colonic mucosal tone');
    classicalRationale = 'Ashtanga Hridaya Sutrasthana 1:8 characterizes Madhyama Kostha as harmonious Kapha-Tridosha balance with ideal enteric transit time and stool moisture.';
  }

  const confidence = Math.min(96, Math.round((max / ((questions.length || 1) * 4)) * 100));

  return {
    classification,
    supportingFeatures,
    confidence,
    classicalRationale,
    clinicalCaveat: 'CLINICAL SAFETY MANDATE: Kostha assessment is an index of enteric sensitivity and colonic transit time. It must NEVER be used to autonomously administer strong purgatives (Virechana) or Panchakarma without in-person physician examination.'
  };
}
