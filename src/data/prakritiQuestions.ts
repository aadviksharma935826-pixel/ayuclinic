import { AssessmentQuestion } from '@/types/ayurveda';

export const PRAKRITI_QUESTIONS: AssessmentQuestion[] = [
  {
    id: 'pq-1',
    category: 'Body Frame & Physical Build',
    categoryHindi: 'शारीरिक गठन एवं अस्थि संरचना',
    title: 'How would you describe your natural lifelong body frame and skeletal build?',
    titleHindi: 'आपकी स्वाभाविक जन्मजात शारीरिक संरचना और अस्थि ढांचा कैसा है?',
    classicalContext: 'Charaka Sharirasthana 8:95-99 - Sharira Pramana & Samhanana',
    options: [
      {
        id: 'pq-1-v',
        text: 'Slender, thin, narrow-framed; prominent joints, tendons or veins; difficulty gaining weight',
        textHindi: 'पतला, छरहरा, संकीर्ण अस्थि ढांचा; नसें व संधियां स्पष्ट दिखती हैं; वजन बढ़ाना कठिन',
        weights: { vata: 4, pitta: 0, kapha: 0 },
        classicalIndicator: 'Vata: Krisha, Alpasamhanana, Vyakta-sira-snayu'
      },
      {
        id: 'pq-1-p',
        text: 'Medium, symmetrical, athletic build; moderate muscle development; maintains weight steadily',
        textHindi: 'मध्यम, सुडौल, संतुलित गठन; मध्यम मांसपेशियां; वजन सामान्य रूप से स्थिर रहता है',
        weights: { vata: 0, pitta: 4, kapha: 0 },
        classicalIndicator: 'Pitta: Madhya-samhanana, Sukumara'
      },
      {
        id: 'pq-1-k',
        text: 'Broad, sturdy, well-developed bone structure; deep-set joints; tendency to gain weight easily',
        textHindi: 'चौड़ा, भारी, सुदृढ़ अस्थि ढांचा; संधियां मांस से ढकी हुई; वजन आसानी से बढ़ता है',
        weights: { vata: 0, pitta: 0, kapha: 4 },
        classicalIndicator: 'Kapha: Mahasharira, Dridhasamhanana, Ghuudhasandhi'
      }
    ]
  },
  {
    id: 'pq-2',
    category: 'Skin Characteristics & Complexion',
    categoryHindi: 'त्वचा की प्रकृति एवं वर्ण',
    title: 'What has been your lifelong natural skin texture, oiliness, and sensitivity?',
    titleHindi: 'आजीवन आपकी त्वचा का स्वाभाविक स्पर्श, तैलीयता और संवेदनशीलता कैसी रही है?',
    classicalContext: 'Sushruta Sharirasthana 4:64-76 - Sparsha & Tvacha Lakshana',
    options: [
      {
        id: 'pq-2-v',
        text: 'Dry, rough, thin, easily chapped, cool to touch, prone to cracking in dry weather',
        textHindi: 'रूखी, खुरदरी, पतली, जल्दी फटने वाली, स्पर्श में शीतल, शुष्क मौसम में अत्यधिक खिंचाव',
        weights: { vata: 4, pitta: 0, kapha: 0 },
        classicalIndicator: 'Vata: Ruksha, Parusha, Sheetala tvacha'
      },
      {
        id: 'pq-2-p',
        text: 'Warm to touch, soft, reddish/pinkish tint, prone to moles, freckles, flushing or rashes',
        textHindi: 'स्पर्श में उष्ण, कोमल, रक्तिम या पीताभ आभा, तिल-मस्से, लाली या फुंसियां जल्दी होना',
        weights: { vata: 0, pitta: 4, kapha: 0 },
        classicalIndicator: 'Pitta: Ushna, Snigdha-rakta, Tilapilakadhika'
      },
      {
        id: 'pq-2-k',
        text: 'Smooth, soft, cool, thick, naturally well-hydrated, oily, clear, glowing and resilient',
        textHindi: 'चिकनी, कोमल, शीतल, मोटी, स्वाभाविक रूप से तैलीय, चमकदार एवं सहनशील',
        weights: { vata: 0, pitta: 0, kapha: 4 },
        classicalIndicator: 'Kapha: Snigdha, Shlakshna, Sandra, Sheetala tvacha'
      }
    ]
  },
  {
    id: 'pq-3',
    category: 'Hair Quality & Characteristics',
    categoryHindi: 'केश स्वरूप एवं गुण',
    title: 'How are the natural texture, density, and color of your scalp hair?',
    titleHindi: 'आपके बालों की स्वाभाविक बनावट, घनत्व और रंग कैसा है?',
    classicalContext: 'Charaka Vimanasthana 8:95-99 - Kesha Pariksha',
    options: [
      {
        id: 'pq-3-v',
        text: 'Dry, coarse, thin, dull, curly or frizzy, prone to split ends and breakage',
        textHindi: 'रूखे, पतले, बेजान, घुंघराले, दोमुंहे होने वाले तथा आसानी से टूटने वाले',
        weights: { vata: 4, pitta: 0, kapha: 0 },
        classicalIndicator: 'Vata: Ruksha, Parusha, Sphutitagra kesha'
      },
      {
        id: 'pq-3-p',
        text: 'Fine, silky, soft, reddish, blondish or brownish tint; prone to early graying or thinning',
        textHindi: 'मुलायम, रेशमी, बारीक, भूरे/हल्के लाल रंग की आभा; समय से पूर्व सफेद या झड़ने की प्रवृत्ति',
        weights: { vata: 0, pitta: 4, kapha: 0 },
        classicalIndicator: 'Pitta: Pingala, Sukumara, Akala palitya/khalitya'
      },
      {
        id: 'pq-3-k',
        text: 'Thick, abundant, lustrous, dark black, wavy, strong roots with minimal hair fall',
        textHindi: 'घने, भारी, चमकदार, गहरे काले, मजबूत जड़ों वाले तथा बहुत कम झड़ने वाले',
        weights: { vata: 0, pitta: 0, kapha: 4 },
        classicalIndicator: 'Kapha: Sandra, Snigdha, Krishna, Dridha-moola kesha'
      }
    ]
  },
  {
    id: 'pq-4',
    category: 'Appetite & Eating Pattern',
    categoryHindi: 'भूख का स्वभाव एवं खानपान प्रवृत्ति',
    title: 'How does your baseline natural hunger and appetite behave on ordinary days?',
    titleHindi: 'सामान्य दिनों में आपकी भूख और भोजन करने की स्वाभाविक इच्छा कैसी रहती है?',
    classicalContext: 'Charaka Chikitsasthana 15 - Agni & Kshudha Pravritti',
    options: [
      {
        id: 'pq-4-v',
        text: 'Erratic and unpredictable: starving at times, completely uninterested at other times',
        textHindi: 'अनियमित एवं अप्रत्याशित: कभी बहुत तेज भूख, तो कभी भोजन का कोई मन नहीं (विषम भूख)',
        weights: { vata: 4, pitta: 0, kapha: 0 },
        classicalIndicator: 'Vata: Vishama kshudha'
      },
      {
        id: 'pq-4-p',
        text: 'Intense and punctual: cannot tolerate skipping meals, becomes irritable or shaky if delayed',
        textHindi: 'तीव्र एवं समयबद्ध: भोजन में देरी सहन नहीं होती, भूख लगने पर बेचैनी या क्रोध आना',
        weights: { vata: 0, pitta: 4, kapha: 0 },
        classicalIndicator: 'Pitta: Tikshna kshudha, Kshudhasahatva'
      },
      {
        id: 'pq-4-k',
        text: 'Steady, mild, easily postponable; can skip meals comfortably without discomfort',
        textHindi: 'धीमी, स्थिर, सहनशील; भोजन में देरी होने पर भी कोई परेशानी नहीं, उपवास आसानी से संभव',
        weights: { vata: 0, pitta: 0, kapha: 4 },
        classicalIndicator: 'Kapha: Manda kshudha, Dhairya'
      }
    ]
  },
  {
    id: 'pq-5',
    category: 'Digestion & Gastrointestinal Metabolism',
    categoryHindi: 'पाचन क्षमता एवं जठराग्नि',
    title: 'How does your stomach usually digest a standard wholesome meal?',
    titleHindi: 'एक सामान्य पौष्टिक भोजन करने के बाद आपका पाचन तंत्र आमतौर पर कैसा व्यवहार करता है?',
    classicalContext: 'Charaka Vimanasthana 8 - Jatharagni Prakriti',
    options: [
      {
        id: 'pq-5-v',
        text: 'Variable digestion: frequent gas, post-prandial bloating, abdominal rumbling, alternating speed',
        textHindi: 'अस्थिर पाचन: पेट फूलना, गैस बनना, गुड़गुड़ाहट, कभी जल्दी तो कभी देर से पचना',
        weights: { vata: 4, pitta: 0, kapha: 0 },
        classicalIndicator: 'Vata: Vishamagni, Adhmana, Udara-vata'
      },
      {
        id: 'pq-5-p',
        text: 'Rapid, burning digestion: digests quickly, prone to hyperacidity, sourness, burning sensations',
        textHindi: 'द्रुत एवं तीव्र पाचन: भोजन जल्दी पचना, सीने में जलन, खट्टी डकारें, अत्यधिक प्यास लगना',
        weights: { vata: 0, pitta: 4, kapha: 0 },
        classicalIndicator: 'Pitta: Tikshnagni, Amlodgara, Vidaha'
      },
      {
        id: 'pq-5-k',
        text: 'Slow, prolonged digestion: takes many hours; feeling of fullness, heaviness, or sluggishness',
        textHindi: 'धीमा व विलंबित पाचन: कई घंटों तक पेट भारी रहना, आलस्य व सुस्ती महसूस होना',
        weights: { vata: 0, pitta: 0, kapha: 4 },
        classicalIndicator: 'Kapha: Mandagni, Gaurava, Utklesha'
      }
    ]
  },
  {
    id: 'pq-6',
    category: 'Sleep Pattern & Dreams',
    categoryHindi: 'निद्रा स्वरूप एवं स्वप्न प्रवृत्ति',
    title: 'What is your typical natural sleep duration, depth, and dream quality?',
    titleHindi: 'आपकी स्वाभाविक नींद की गहराई, अवधि और स्वप्नों की प्रकृति कैसी होती है?',
    classicalContext: 'Charaka Sharirasthana 8 - Nidra & Svapna Pariksha',
    options: [
      {
        id: 'pq-6-v',
        text: 'Light, interrupted, 4-6 hours; easily awakened by minor noises; dreams of flying, running, or fear',
        textHindi: 'हल्की, टूटती हुई, 4-6 घंटे; जरा सी आवाज से नींद खुलना; हवा में उड़ने, दौड़ने या भय के स्वप्न',
        weights: { vata: 4, pitta: 0, kapha: 0 },
        classicalIndicator: 'Vata: Alpa-nidra, Chala-nidra, Akashagamana svapna'
      },
      {
        id: 'pq-6-p',
        text: 'Moderate, sound, 6-7 hours; easily refreshed; colorful, vivid, fiery, or confrontational dreams',
        textHindi: 'मध्यम, 6-7 घंटे; जागने पर ताजगी; रंगीन, स्पष्ट, अग्नि, युद्ध या तर्क-वितर्क वाले स्वप्न',
        weights: { vata: 0, pitta: 4, kapha: 0 },
        classicalIndicator: 'Pitta: Madhyama-nidra, Agni-vidyut svapna'
      },
      {
        id: 'pq-6-k',
        text: 'Deep, sound, heavy, 8+ hours; hard to awaken early; calm dreams of water, lakes, clouds, or snow',
        textHindi: 'गहरी, प्रगाढ़, 8+ घंटे; सुबह उठने में भारीपन; शांत जलाशय, नदियां, बादल या बर्फ के स्वप्न',
        weights: { vata: 0, pitta: 0, kapha: 4 },
        classicalIndicator: 'Kapha: Sandra-nidra, Atinidra, Jala-sarovara svapna'
      }
    ]
  },
  {
    id: 'pq-7',
    category: 'Thermal & Weather Preference',
    categoryHindi: 'तापमान एवं मौसमी अनुकूलता (सात्म्यता)',
    title: 'Which ambient temperature and weather conditions are most comfortable for you?',
    titleHindi: 'कौन सा मौसम और तापमान आपके शरीर के लिए सबसे अनुकूल और आरामदायक रहता है?',
    classicalContext: 'Charaka Vimanasthana 8 - Sheeta-Ushna Satmyata',
    options: [
      {
        id: 'pq-7-v',
        text: 'Loves warmth, sun, and warm rooms; strongly dislikes cold, dry drafts, and windy weather',
        textHindi: 'धूप, गर्म कमरे और गर्म पानी पसंद; ठंड, तेज हवा और शुष्क मौसम बिल्कुल सहन नहीं होता',
        weights: { vata: 4, pitta: 0, kapha: 0 },
        classicalIndicator: 'Vata: Sheetāsahatva, Ushnakamita'
      },
      {
        id: 'pq-7-p',
        text: 'Craves cool, breezy environments; strongly dislikes hot sun, humid summers, and heat waves',
        textHindi: 'ठंडी हवा व शीतल वातावरण पसंद; तेज धूप, उमस और ग्रीष्म ऋतु में अत्यधिक असहजता',
        weights: { vata: 0, pitta: 4, kapha: 0 },
        classicalIndicator: 'Pitta: Ushnāsahatva, Sheetakamita'
      },
      {
        id: 'pq-7-k',
        text: 'Prefers warm, dry weather; dislikes damp, cloudy, humid chill; overall tolerant to weather',
        textHindi: 'गर्म व सूखा मौसम पसंद; सीलन, बादल और नम ठंड नापसंद; सामान्यतः मौसम सहने की अच्छी क्षमता',
        weights: { vata: 0, pitta: 0, kapha: 4 },
        classicalIndicator: 'Kapha: Kledāsahatva, Sushka-priyata'
      }
    ]
  },
  {
    id: 'pq-8',
    category: 'Bowel Habits & Evacuation',
    categoryHindi: 'मल त्याग एवं कोष्ठ स्वभाव',
    title: 'What has been your lifelong baseline bowel evacuation pattern?',
    titleHindi: 'आजीवन आपका स्वाभाविक शौच और पेट साफ होने का ढर्रा कैसा रहा है?',
    classicalContext: 'Ashtanga Hridaya Sutrasthana 1:8 - Kostha Bheda',
    options: [
      {
        id: 'pq-8-v',
        text: 'Dry, hard, pellet-like stools; frequent constipation; irregular timings, straining needed',
        textHindi: 'कड़ा, सूखा, गांठदार मल; कब्ज की बार-बार शिकायत; अनियमित समय, जोर लगाना पड़ता है (क्रूर कोष्ठ)',
        weights: { vata: 4, pitta: 0, kapha: 0 },
        classicalIndicator: 'Vata: Krura Kostha, Vibandha'
      },
      {
        id: 'pq-8-p',
        text: 'Soft, loose, yellow/orange stools; 2-3 times daily; evacuates quickly after milk or fruit',
        textHindi: 'नरम, पतला, पीला मल; दिन में 2-3 बार; दूध या फल लेने पर भी पेट तुरंत साफ (मृदु कोष्ठ)',
        weights: { vata: 0, pitta: 4, kapha: 0 },
        classicalIndicator: 'Pitta: Mridu Kostha, Bhedana'
      },
      {
        id: 'pq-8-k',
        text: 'Well-formed, solid, regular once daily; predictable timing, smooth and complete evacuation',
        textHindi: 'सुगठित, नियमित, दिन में एक बार निश्चित समय पर; बिना किसी कष्ट के सहज शौच (मध्य कोष्ठ)',
        weights: { vata: 0, pitta: 0, kapha: 4 },
        classicalIndicator: 'Kapha: Madhyama Kostha, Niyama'
      }
    ]
  },
  {
    id: 'pq-9',
    category: 'Mind, Memory & Grasping Power',
    categoryHindi: 'स्मृति, बुद्धि एवं ग्रहण शक्ति',
    title: 'How do you naturally learn, grasp new information, and recall it later?',
    titleHindi: 'नई जानकारी सीखने, ग्रहण करने और बाद में याद रखने में आपका स्वाभाविक स्वभाव कैसा है?',
    classicalContext: 'Charaka Sharirasthana 8 - Medha & Smriti Pariksha',
    options: [
      {
        id: 'pq-9-v',
        text: 'Grasps new concepts very rapidly, but tends to forget quickly; wandering mind',
        textHindi: 'नई बातें बहुत तेजी से सीखता है, परंतु जल्दी भूल भी जाता है; चंचल मन',
        weights: { vata: 4, pitta: 0, kapha: 0 },
        classicalIndicator: 'Vata: Shighragrahi, Shighravismarana'
      },
      {
        id: 'pq-9-p',
        text: 'Sharp, analytical, logical comprehension; excellent retention and precise recall',
        textHindi: 'तीक्ष्ण, तार्किक व विश्लेषणात्मक बुद्धि; सटीक स्मरण और व्यवस्थित सोच',
        weights: { vata: 0, pitta: 4, kapha: 0 },
        classicalIndicator: 'Pitta: Medhavi, Nipunamati, Yuktijna'
      },
      {
        id: 'pq-9-k',
        text: 'Takes longer time to grasp new ideas, but once learned, retains permanently for lifetime',
        textHindi: 'सीखने में अधिक समय लेता है, परंतु एक बार याद हो जाने पर जीवन भर कभी नहीं भूलता',
        weights: { vata: 0, pitta: 0, kapha: 4 },
        classicalIndicator: 'Kapha: Chiragrahi, Dridhasmriti'
      }
    ]
  },
  {
    id: 'pq-10',
    category: 'Speech & Communication Style',
    categoryHindi: 'वाणी, सम्भाषण एवं बोलने की शैली',
    title: 'How do you naturally speak in conversation?',
    titleHindi: 'बातचीत के दौरान आपका स्वाभाविक बोलने का ढंग और स्वर कैसा रहता है?',
    classicalContext: 'Charaka Vimanasthana 8 - Vak & Shabda Pariksha',
    options: [
      {
        id: 'pq-10-v',
        text: 'Fast, animated, talkative, wandering between topics; raspy or variable pitch voice',
        textHindi: 'तीव्र गति, अत्यधिक बोलने वाला, बातों में कूदने वाला; हल्का भारी या रूखा स्वर',
        weights: { vata: 4, pitta: 0, kapha: 0 },
        classicalIndicator: 'Vata: Bahubhashi, Shighravak, Parushasvara'
      },
      {
        id: 'pq-10-p',
        text: 'Crisp, articulate, sharp, persuasive, direct; forceful and commanding tone',
        textHindi: 'स्पष्ट, तार्किक, प्रभावशाली, सीधा बोलने वाला; तीखा व स्पष्ट स्वर',
        weights: { vata: 0, pitta: 4, kapha: 0 },
        classicalIndicator: 'Pitta: Spashtavak, Prabhuta-pada, Tejasvi-dhvani'
      },
      {
        id: 'pq-10-k',
        text: 'Calm, measured, gentle, low-pitched, deep, resonant; speaks only when necessary',
        textHindi: 'शांत, नपा-तुला, गंभीर, गहरा व मधुर स्वर; आवश्यकता पड़ने पर ही कम बोलना',
        weights: { vata: 0, pitta: 0, kapha: 4 },
        classicalIndicator: 'Kapha: Gambhirasvara, Mandavak, Snigdhasvara'
      }
    ]
  },
  {
    id: 'pq-11',
    category: 'Physical Activity & Gait',
    categoryHindi: 'शारीरिक गतिशीलता, चाल एवं चेष्टा',
    title: 'How do you walk and carry out physical movements?',
    titleHindi: 'आपकी चाल, शारीरिक फुर्ती और काम करने की शारीरिक शैली कैसी है?',
    classicalContext: 'Charaka Vimanasthana 8 - Cheshta & Gati Pariksha',
    options: [
      {
        id: 'pq-11-v',
        text: 'Quick, brisk walker, restless, constantly moving fingers, feet or changing positions',
        textHindi: 'तेज चाल, चंचल, लगातार हाथ-पैर हिलाने वाला, एक स्थान पर शांत बैठना कठिन',
        weights: { vata: 4, pitta: 0, kapha: 0 },
        classicalIndicator: 'Vata: Shighragati, Chala-cheshta'
      },
      {
        id: 'pq-11-p',
        text: 'Purposeful, medium-paced, confident, determined, athletic and goal-oriented',
        textHindi: 'उद्देश्यपूर्ण, मध्यम गति, आत्मविश्वास से परिपूर्ण, लक्ष्य-केंद्रित चाल',
        weights: { vata: 0, pitta: 4, kapha: 0 },
        classicalIndicator: 'Pitta: Madhyamagati, Utsahi'
      },
      {
        id: 'pq-11-k',
        text: 'Graceful, slow, steady, grounded; dislikes unnecessary physical rush or haste',
        textHindi: 'धीमी, स्थिर, गरिमामयी, शांत चाल; अनावश्यक हड़बड़ाहट बिल्कुल नापसंद',
        weights: { vata: 0, pitta: 0, kapha: 4 },
        classicalIndicator: 'Kapha: Mandagati, Sthiracheshta, Hamsagati'
      }
    ]
  },
  {
    id: 'pq-12',
    category: 'Stress & Emotional Response',
    categoryHindi: 'तनाव एवं मानसिक प्रतिक्रिया',
    title: 'Under unexpected pressure, confrontation, or emotional stress, how do you initially react?',
    titleHindi: 'अचानक तनाव, विवाद या दबाव की स्थिति में आपकी पहली मानसिक प्रतिक्रिया क्या होती है?',
    classicalContext: 'Charaka Sharirasthana 8 - Manasa Prakriti & Bhava',
    options: [
      {
        id: 'pq-12-v',
        text: 'Worry, anxiety, nervousness, fearful overthinking, racing thoughts, panic tendency',
        textHindi: 'चिंता, घबराहट, अत्यधिक सोच-विचार, मन में भय, अनिश्चितता की भावना',
        weights: { vata: 4, pitta: 0, kapha: 0 },
        classicalIndicator: 'Vata: Bhaya, Shoka, Chittodvega'
      },
      {
        id: 'pq-12-p',
        text: 'Irritation, anger, impatience, frustration, critical judgment, argumentative fight mode',
        textHindi: 'चिड़चिड़ापन, क्रोध, असहनशीलता, आलोचनात्मक रुख, तुरंत बहस या विरोध करना',
        weights: { vata: 0, pitta: 4, kapha: 0 },
        classicalIndicator: 'Pitta: Krodha, Amarsha, Tikshnabhava'
      },
      {
        id: 'pq-12-k',
        text: 'Calm, patient, emotionally grounded; may withdraw, procrastinate or become complacent',
        textHindi: 'शांत, धैर्यवान, अविचलित; कभी-कभी टालमटोल, उदास या अंतर्मुखी हो जाना',
        weights: { vata: 0, pitta: 0, kapha: 4 },
        classicalIndicator: 'Kapha: Dhriti, Kshama, Alasya-pravritti'
      }
    ]
  },
  {
    id: 'pq-13',
    category: 'Physical Stamina & Endurance',
    categoryHindi: 'शारीरिक बल एवं सहनशक्ति (ओज व व्यायाम बल)',
    title: 'How is your sustained stamina and capacity for vigorous physical exertion?',
    titleHindi: 'कठिन शारीरिक परिश्रम और व्यायाम करने में आपकी सहनशक्ति और टिकाऊपन कैसा है?',
    classicalContext: 'Charaka Vimanasthana 8 - Bala Pariksha',
    options: [
      {
        id: 'pq-13-v',
        text: 'Low to variable: bursts of energy followed by rapid exhaustion and long recovery time',
        textHindi: 'अल्प या अस्थिर: अचानक ऊर्जा का उभार, फिर तुरंत थकान व लंबा रिकवरी समय (अल्प बल)',
        weights: { vata: 4, pitta: 0, kapha: 0 },
        classicalIndicator: 'Vata: Alpabala, Shighrashrama'
      },
      {
        id: 'pq-13-p',
        text: 'Moderate: strong willpower and drive, but overheats easily and sweats heavily',
        textHindi: 'मध्यम: प्रबल इच्छाशक्ति, परंतु शरीर जल्दी गर्म होना व अत्यधिक पसीना आना (मध्य बल)',
        weights: { vata: 0, pitta: 4, kapha: 0 },
        classicalIndicator: 'Pitta: Madhyamabala, Svedadhikya'
      },
      {
        id: 'pq-13-k',
        text: 'High & sustained: extraordinary stamina, slow to fatigue, excellent endurance over long periods',
        textHindi: 'उत्तम व दीर्घकालिक: असाधारण सहनशक्ति, बहुत देर से थकना, लंबी दौड़/कठिन काम में सक्षम (महा बल)',
        weights: { vata: 0, pitta: 0, kapha: 4 },
        classicalIndicator: 'Kapha: Uttamabala, Mahotsaha'
      }
    ]
  },
  {
    id: 'pq-14',
    category: 'Perspiration & Body Odor',
    categoryHindi: 'स्वेद (पसीना) एवं शारीरिक गंध',
    title: 'How much do you naturally sweat under ordinary activity and moderate warmth?',
    titleHindi: 'सामान्य कामकाज और मध्यम गर्मी में आपको पसीना कितना और कैसा आता है?',
    classicalContext: 'Sushruta Sharirasthana 4 - Sweda Pariksha',
    options: [
      {
        id: 'pq-14-v',
        text: 'Minimal sweating, dry body surface even in warm conditions, hardly any odor',
        textHindi: 'बहुत कम पसीना, गर्म मौसम में भी त्वचा सूखी रहना, कोई गंध नहीं',
        weights: { vata: 4, pitta: 0, kapha: 0 },
        classicalIndicator: 'Vata: Alpasveda, Sushkata'
      },
      {
        id: 'pq-14-p',
        text: 'Profuse sweating, especially on chest, face, palms; strong distinct warm odor',
        textHindi: 'अत्यधिक पसीना, विशेषकर चेहरे व हथेलियों पर; तीक्ष्ण व विशिष्ट शारीरिक गंध',
        weights: { vata: 0, pitta: 4, kapha: 0 },
        classicalIndicator: 'Pitta: Prabhutasveda, Daurgandhya'
      },
      {
        id: 'pq-14-k',
        text: 'Moderate, steady sweating during hard exercise; pleasant or mild sweetish odor',
        textHindi: 'मध्यम पसीना, केवल कठिन परिश्रम पर ही आना; सामान्य या मंद गंध',
        weights: { vata: 0, pitta: 0, kapha: 4 },
        classicalIndicator: 'Kapha: Madhyama sveda, Snigdha'
      }
    ]
  }
];
