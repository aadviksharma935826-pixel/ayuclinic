import { AssessmentQuestion } from '@/types/ayurveda';

export const KOSTHA_QUESTIONS: AssessmentQuestion[] = [
  {
    id: 'kq-1',
    category: 'Stool Consistency & Hardness',
    categoryHindi: 'मल की बनावट एवं कठोरता',
    title: 'What is the usual consistency, texture, and density of your bowel evacuation?',
    titleHindi: 'आपके मल का स्वाभाविक रूप, कठोरता और बनावट कैसी होती है?',
    classicalContext: 'Ashtanga Hridaya Sutrasthana 1:8 - Mala Swarupa',
    options: [
      {
        id: 'kq-1-mridu',
        text: 'Soft, semi-solid to loose, evacuates effortlessly without any resistance, multiple times a day',
        textHindi: 'नरम, पतला या ढीला मल, बिना किसी जोर के तुरंत साफ, दिन में 2 से 3 बार',
        weights: { vata: 0, pitta: 4, kapha: 0 },
        explanation: 'Mridu Kostha: High fluid content, rapid colonic transit'
      },
      {
        id: 'kq-1-madhyama',
        text: 'Well-formed, cylindrical, sausage-like, smooth and easy to pass, once (or twice) daily at regular time',
        textHindi: 'सुगठित, मध्यम, चिकना, बिना किसी कष्ट के दिन में एक निश्चित समय पर सहज शौच',
        weights: { vata: 0, pitta: 0, kapha: 4 },
        explanation: 'Madhyama Kostha: Balanced moisture and transit'
      },
      {
        id: 'kq-1-krura',
        text: 'Hard, dry, lumpy, fragmented or pellet-like; requires persistent physical straining to expel',
        textHindi: 'कड़ा, सूखा, गांठदार या बकरी की मींगनी जैसा; अत्यधिक जोर लगाना पड़ता है',
        weights: { vata: 4, pitta: 0, kapha: 0 },
        explanation: 'Krura Kostha: Excessive dehydration of faecal matter, Vata dryness'
      }
    ]
  },
  {
    id: 'kq-2',
    category: 'Response to Mild Dietary Laxatives (Milk, Grapes, Ghee)',
    categoryHindi: 'दुग्ध, द्राक्षा या घृत जैसे सौम्य आहार पर आंतों की प्रतिक्रिया',
    title: 'How does your bowel respond when you consume a glass of warm milk, fresh grapes, or sugarcane juice?',
    titleHindi: 'गर्म दूध, अंगूर या गन्ने का रस पीने पर आपकी आंतों में क्या प्रभाव होता है?',
    classicalContext: 'Charaka Kalpasthana - Kostha Pariksha for Shodhana',
    options: [
      {
        id: 'kq-2-mridu',
        text: 'Immediate laxation: causes immediate loose stool or urgent urge to evacuate within an hour or two',
        textHindi: 'त्वरित विरेचन: 1-2 घंटे के भीतर तुरंत पेट साफ या पतले दस्त लग जाना',
        weights: { vata: 0, pitta: 4, kapha: 0 },
        explanation: 'Mridu Kostha: Extremely sensitive mucosal motility'
      },
      {
        id: 'kq-2-madhyama',
        text: 'Comfortable digestion: digests well, promotes smooth normal morning evacuation next day without diarrhea',
        textHindi: 'सामान्य पाचन: अच्छी तरह पच जाता है, अगले दिन प्रातः बिना दस्त के स्वाभाविक शौच होता है',
        weights: { vata: 0, pitta: 0, kapha: 4 },
        explanation: 'Madhyama Kostha: Regulated physiological response'
      },
      {
        id: 'kq-2-krura',
        text: 'Zero effect: produces no bowel movement at all; may even cause gas distension or bloating',
        textHindi: 'कोई असर नहीं: पेट पर कोई प्रभाव नहीं पड़ता; उल्टे पेट में गैस या भारीपन हो सकता है',
        weights: { vata: 4, pitta: 0, kapha: 0 },
        explanation: 'Krura Kostha: Refractory to mild lubricants, requires deep unctuous therapy'
      }
    ]
  },
  {
    id: 'kq-3',
    category: 'Response to Travel & Dietary Change',
    categoryHindi: 'यात्रा एवं खानपान में बदलाव पर प्रभाव',
    title: 'What happens to your bowel movement when you travel, change cities, or alter your regular diet?',
    titleHindi: 'यात्रा करने, स्थान बदलने या खानपान में परिवर्तन होने पर आपकी शौच क्रिया पर क्या प्रभाव पड़ता है?',
    classicalContext: 'Sushruta Chikitsasthana 33 - Kostha Bheda',
    options: [
      {
        id: 'kq-3-mridu',
        text: 'Prone to loose motions or traveller\'s diarrhea at the slightest change of food or water',
        textHindi: 'जरा सा पानी या भोजन बदलने पर तुरंत पतले दस्त या बार-बार शौच जाना पड़ता है',
        weights: { vata: 0, pitta: 4, kapha: 0 },
        explanation: 'Mridu Kostha'
      },
      {
        id: 'kq-3-madhyama',
        text: 'Adapts smoothly within a day without significant gastrointestinal upheaval',
        textHindi: '1-2 दिन में आसानी से ढल जाता है, कोई विशेष परेशानी नहीं होती',
        weights: { vata: 0, pitta: 0, kapha: 4 },
        explanation: 'Madhyama Kostha'
      },
      {
        id: 'kq-3-krura',
        text: 'Severe constipation: bowel movement completely shuts down for 2 to 4 days during travel',
        textHindi: 'गंभीर कब्ज: यात्रा के दौरान 2 से 4 दिनों तक पेट बिल्कुल साफ नहीं होता',
        weights: { vata: 4, pitta: 0, kapha: 0 },
        explanation: 'Krura Kostha'
      }
    ]
  },
  {
    id: 'kq-4',
    category: 'Defecation Urgency & Effort',
    categoryHindi: 'मल त्याग का वेग एवं प्रयास',
    title: 'How long do you usually spend in the restroom to accomplish defecation?',
    titleHindi: 'शौच क्रिया पूर्ण करने में आपको सामान्यतः कितना समय लगता है?',
    classicalContext: 'Charaka Siddhisthana - Vega Pravartana',
    options: [
      {
        id: 'kq-4-mridu',
        text: 'Under 2 minutes: rapid, urgent, virtually no effort needed',
        textHindi: '2 मिनट से भी कम: तीव्र वेग, बिना किसी प्रयास के तुरंत निष्कासन',
        weights: { vata: 0, pitta: 4, kapha: 0 },
        explanation: 'Mridu Kostha'
      },
      {
        id: 'kq-4-madhyama',
        text: '3 to 7 minutes: comfortable, normal, complete evacuation with natural gentle peristalsis',
        textHindi: '3 से 7 मिनट: आरामदायक, स्वाभाविक, बिना जोर लगाए संतोषजनक पेट साफ',
        weights: { vata: 0, pitta: 0, kapha: 4 },
        explanation: 'Madhyama Kostha'
      },
      {
        id: 'kq-4-krura',
        text: '15 to 30+ minutes: prolonged sitting, straining, unsatisfied feeling of incomplete evacuation',
        textHindi: '15 से 30+ मिनट: देर तक बैठना, अत्यधिक जोर, और फिर भी पेट पूरी तरह साफ न होने की भावना',
        weights: { vata: 4, pitta: 0, kapha: 0 },
        explanation: 'Krura Kostha'
      }
    ]
  }
];
