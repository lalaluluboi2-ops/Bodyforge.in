import { ChatMessage, SupportedLanguage, UserFitnessProfile, WorkoutMediaItem, CreatorProfile } from '../types';

export const DEBOJYOTI_CREATOR_PROFILE: CreatorProfile = {
  name: 'Debojyoti Karmakar',
  role: 'Creator & Lead Developer of BODYFORGE',
  image: '/assets/aistudio/1793189785291_447b1826.png',
  tagline: 'Architect of BODYFORGE & BodyBuddy AI • Calisthenics & Tech Enthusiast',
  badge: 'Verified Creator ✨'
};

export function isCreatorQuery(query: string): boolean {
  const p = (query || '').toLowerCase().trim();
  return (
    p.includes('who made') || 
    p.includes('who created') || 
    p.includes('who built') || 
    p.includes('who developed') || 
    p.includes('who programmed') || 
    p.includes('who designed') || 
    p.includes('who coded') || 
    p.includes('who is your creator') || 
    p.includes('who is your maker') || 
    p.includes('who is the creator') || 
    p.includes('who is the developer') || 
    p.includes('who is debojyoti') || 
    p.includes('who is debajyoti') || 
    p.includes('creator of this') || 
    p.includes('developer of this') || 
    p.includes('creator of bodyforge') || 
    p.includes('creator of bodybuddy') || 
    p.includes('made you') || 
    p.includes('created you') || 
    p.includes('built you') || 
    p.includes('developed you')
  );
}

export interface ChatResponse {
  message: string;
  isEmergencyAlert?: boolean;
  suggestedAction?: {
    label: string;
    tabTarget?: string;
    routineId?: string;
  };
  mediaContent?: WorkoutMediaItem;
  creatorProfile?: CreatorProfile;
  isLiveAI: boolean;
}

export function buildMediaItem(
  type: 'video' | 'image',
  exerciseType: 'pushup' | 'squat' | 'plank' | 'chin-tuck' | 'cat-cow' | 'glute-stretch',
  title: string
): WorkoutMediaItem {
  switch (exerciseType) {
    case 'squat':
      return {
        type,
        exerciseType,
        title: title || 'Air Squat Biomechanics',
        muscles: ['Quadriceps', 'Gluteus Maximus', 'Hamstrings', 'Adductors'],
        cues: [
          'Feet shoulder-width apart with toes flared 15° outward',
          'Break at hips and knees simultaneously; keep chest proud',
          'Descend until thighs reach parallel with ground; drive through mid-foot'
        ]
      };
    case 'plank':
      return {
        type,
        exerciseType,
        title: title || 'Isometric Plank Bracing',
        muscles: ['Transverse Abdominis', 'Gluteus Maximus', 'Serratus Anterior', 'Spinal Erectors'],
        cues: [
          'Elbows stacked directly underneath shoulders',
          'Tuck pelvis into posterior tilt (no arching or sagging hips)',
          'Squeeze glutes and quads; breathe calmly into the diaphragm'
        ]
      };
    case 'chin-tuck':
      return {
        type,
        exerciseType,
        title: title || 'Cervical Retraction & Jawline Plumb Line',
        muscles: ['Deep Cervical Flexors (Longus Colli)', 'Platysma Fascia', 'Lower Trapezius'],
        cues: [
          'Glide cranium backward horizontally without tilting chin down',
          'Align earlobes directly over the clavicular shoulder joints',
          'Rest tongue gently on palate with teeth unclenched'
        ]
      };
    case 'cat-cow':
      return {
        type,
        exerciseType,
        title: title || 'Cat-Cow Spinal Mobilization',
        muscles: ['Thoracolumbar Fascia', 'Erector Spinae', 'Rhomboids', 'Rectus Abdominis'],
        cues: [
          'Inhale: tilt pelvis anteriorly and open chest forward',
          'Exhale: tuck tailbone under and dome spine upward smoothly',
          'Coordinate movement with gentle breath rhythm'
        ]
      };
    case 'pushup':
    default:
      return {
        type,
        exerciseType: 'pushup',
        title: title || 'Calisthenics Push-Up Form',
        muscles: ['Pectoralis Major', 'Triceps Brachii', 'Anterior Deltoids', 'Core / Serratus'],
        cues: [
          'Palms just outside shoulder-width; fingers splayed for stability',
          'Elbows tracking at 45° angle back toward torso (avoid 90° flare)',
          'Lower chest until 2 inches from floor with rigid body plank'
        ]
      };
  }
}

export function extractMediaContent(text: string, prompt?: string): { 
  cleanText: string; 
  media?: WorkoutMediaItem;
  creatorProfile?: CreatorProfile;
} {
  let cleaned = text || '';
  let creatorProfile: CreatorProfile | undefined;

  // Detect and strip [CREATOR_CARD]
  if (cleaned.includes('[CREATOR_CARD]')) {
    cleaned = cleaned.replace(/\[CREATOR_CARD\]/g, '').trim();
    creatorProfile = DEBOJYOTI_CREATOR_PROFILE;
  }

  if (isCreatorQuery(prompt || '') || isCreatorQuery(cleaned) || cleaned.includes('Debojyoti Karmakar')) {
    creatorProfile = DEBOJYOTI_CREATOR_PROFILE;
  }

  // Regex to match [MEDIA: type="...", exercise="...", title="..."]
  const mediaRegex = /\[MEDIA:\s*type="?([^",]+)"?,\s*exercise="?([^",]+)"?,\s*title="?([^"\]]+)"?\]/i;
  const match = cleaned.match(mediaRegex);

  if (match) {
    const rawType = match[1].toLowerCase().trim();
    const type = rawType.includes('video') ? 'video' : 'image';
    const rawExercise = match[2].toLowerCase().trim();
    let exerciseType: 'pushup' | 'squat' | 'plank' | 'chin-tuck' | 'cat-cow' = 'pushup';
    if (rawExercise.includes('squat')) exerciseType = 'squat';
    else if (rawExercise.includes('plank')) exerciseType = 'plank';
    else if (rawExercise.includes('chin') || rawExercise.includes('jaw') || rawExercise.includes('neck')) exerciseType = 'chin-tuck';
    else if (rawExercise.includes('cat') || rawExercise.includes('cow') || rawExercise.includes('spine')) exerciseType = 'cat-cow';

    const cleanText = cleaned.replace(mediaRegex, '').trim();
    const media = buildMediaItem(type, exerciseType, match[3].trim());
    return { cleanText, media, creatorProfile };
  }

  // Smart Detection: If user explicitly asked for video, image, diagram, photo, or visual demo
  const combined = ((prompt || '') + ' ' + cleaned).toLowerCase();
  const wantsVideo = combined.includes('video') || combined.includes('clip') || combined.includes('moving') || combined.includes('animation');
  const wantsImage = combined.includes('image') || combined.includes('picture') || combined.includes('photo') || combined.includes('diagram') || combined.includes('infographic') || combined.includes('draw') || combined.includes('make a') || combined.includes('generate a');

  if (wantsVideo || wantsImage) {
    const type: 'video' | 'image' = wantsVideo ? 'video' : 'image';
    if (combined.includes('squat')) {
      return { cleanText: cleaned, media: buildMediaItem(type, 'squat', 'Air Squat Biomechanics'), creatorProfile };
    }
    if (combined.includes('plank') || combined.includes('core') || combined.includes('abs')) {
      return { cleanText: cleaned, media: buildMediaItem(type, 'plank', 'Isometric Plank Bracing'), creatorProfile };
    }
    if (combined.includes('chin') || combined.includes('jawline') || combined.includes('neck') || combined.includes('posture') || combined.includes('glow')) {
      return { cleanText: cleaned, media: buildMediaItem(type, 'chin-tuck', 'Cervical Retraction & Jawline Plumb Line'), creatorProfile };
    }
    if (combined.includes('cat') || combined.includes('cow') || combined.includes('spine') || combined.includes('back')) {
      return { cleanText: cleaned, media: buildMediaItem(type, 'cat-cow', 'Spinal Flexion-Extension Rhythm'), creatorProfile };
    }
    if (combined.includes('pushup') || combined.includes('push up') || combined.includes('chest') || combined.includes('workout') || combined.includes('exercise')) {
      return { cleanText: cleaned, media: buildMediaItem(type, 'pushup', 'Standard Calisthenics Push-Up'), creatorProfile };
    }
  }

  return { cleanText: cleaned, creatorProfile };
}

// Emergency red flag terms that trigger immediate urgent-care guidance
const EMERGENCY_KEYWORDS = [
  'chest pain', 'heart attack', 'shortness of breath', 'cannot breathe', 'can\'t breathe',
  'stroke', 'face drooping', 'arm weakness', 'slurred speech',
  'loss of bladder', 'loss of bowel', 'cauda equina',
  'coughing blood', 'severe fracture', 'bone sticking out',
  'fainted', 'unconscious', 'loss of consciousness', 'severe burn',
  'छाती में दर्द', 'सांस लेने में तकलीफ', 'बुखार और गर्दन अकड़ना',
  'বুকে ব্যথা', 'শ্বাসকষ্ট', 'মারাত্মক আঘাত'
];

export const checkEmergencyIntent = (text: string): boolean => {
  const lower = text.toLowerCase();
  return EMERGENCY_KEYWORDS.some(kw => lower.includes(kw));
};

export const streamChatMessage = async (
  prompt: string,
  history: ChatMessage[],
  language: SupportedLanguage,
  userProfile: UserFitnessProfile | null | undefined,
  onChunk: (textChunk: string) => void,
  onComplete: (
    suggestedAction?: { label: string; tabTarget?: string; routineId?: string },
    isLiveAI?: boolean,
    media?: WorkoutMediaItem,
    creatorProfile?: CreatorProfile
  ) => void,
  onError: (err: unknown) => void
): Promise<void> => {
  // 1. Triage Safety Check
  if (checkEmergencyIntent(prompt)) {
    const alertMsg = language === 'hi'
      ? "⚠️ आपातकालीन चेतावनी: आपके द्वारा वर्णित लक्षण (जैसे सीने में दर्द, सांस लेने में अत्यधिक कठिनाई, या अचानक सुन्नता) किसी गंभीर चिकित्सीय स्थिति के संकेत हो सकते हैं। कृपया तुरंत स्थानीय आपातकालीन चिकित्सा सेवा (112 / एम्बुलेंस) से संपर्क करें या निकटतम अस्पताल जाएँ।"
      : language === 'bn'
      ? "⚠️ জরুরি সতর্কতা: আপনার বর্ণিত লক্ষণগুলি (যেমন বুকে তীব্র ব্যথা, শ্বাসকষ্ট বা হঠাৎ অনুভূতিহীনতা) একটি জরুরি চিকিৎসা সমস্যার লক্ষণ হতে পারে। দয়া করে অবিলম্বে স্থানীয় জরুরি স্বাস্থ্যসেবা কেন্দ্রে যোগাযোগ করুন বা নিকটস্থ হাসপাতালে যান।"
      : "⚠️ URGENT CLINICAL WARNING: The symptoms you described (such as acute chest pain, severe breathing difficulty, sudden numbness, or loss of bowel/bladder control) may indicate a medical emergency. Do not attempt exercise. Please immediately contact your local emergency services (911 / 999 / 112) or seek urgent clinical care.";
    onChunk(alertMsg);
    onComplete(undefined, false);
    return;
  }

  // 2. High-speed SSE stream
  try {
    const res = await fetch('/api/chat/stream', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt,
        history: history.slice(-6).map(h => ({
          role: h.sender === 'user' ? 'user' : 'model',
          text: h.text
        })),
        language,
        userContext: userProfile?.wellnessGoalsConsent ? {
          experience: userProfile.experienceLevel,
          goal: userProfile.mainGoal,
          streak: userProfile.streakDays
        } : undefined
      })
    });

    if (!res.ok || !res.body) {
      // Fallback to standard chat endpoint if streaming is not supported
      const fallback = await sendChatMessage(prompt, history, language, userProfile);
      onChunk(fallback.message);
      onComplete(fallback.suggestedAction, fallback.isLiveAI, fallback.mediaContent, fallback.creatorProfile);
      return;
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';
    let accumulated = '';

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const parts = buffer.split('\n\n');
      buffer = parts.pop() || '';

      for (const part of parts) {
        const trimmed = part.trim();
        if (trimmed.startsWith('data: ')) {
          try {
            const data = JSON.parse(trimmed.slice(6));
            if (data.text) {
              accumulated += data.text;
              onChunk(data.text);
            }
            if (data.done) {
              const { media, creatorProfile: extractedCreator } = extractMediaContent(accumulated, prompt);
              const creator = data.showCreator ? DEBOJYOTI_CREATOR_PROFILE : extractedCreator;
              onComplete(data.suggestedAction, data.isLiveAI ?? true, media, creator);
            }
          } catch {
            // ignore partial json
          }
        }
      }
    }
  } catch (err) {
    onError(err);
  }
};

export const sendChatMessage = async (
  prompt: string,
  history: ChatMessage[],
  language: SupportedLanguage,
  userProfile?: UserFitnessProfile | null
): Promise<ChatResponse> => {
  // 1. Triage Safety Check
  if (checkEmergencyIntent(prompt)) {
    return {
      message: language === 'hi'
        ? "⚠️ आपातकालीन चेतावनी: आपके द्वारा वर्णित लक्षण (जैसे सीने में दर्द, सांस लेने में अत्यधिक कठिनाई, या अचानक सुन्नता) किसी गंभीर चिकित्सीय स्थिति के संकेत हो सकते हैं। कृपया तुरंत स्थानीय आपातकालीन चिकित्सा सेवा (112 / एम्बुलेंस) से संपर्क करें या निकटतम अस्पताल जाएँ।"
        : language === 'bn'
        ? "⚠️ জরুরি সতর্কতা: আপনার বর্ণিত লক্ষণগুলি (যেমন বুকে তীব্র ব্যথা, শ্বাসকষ্ট বা হঠাৎ অনুভূতিহীনতা) একটি জরুরি চিকিৎসা সমস্যার লক্ষণ হতে পারে। দয়া করে অবিলম্বে স্থানীয় জরুরি স্বাস্থ্যসেবা কেন্দ্রে যোগাযোগ করুন বা নিকটস্থ হাসপাতালে যান।"
        : "⚠️ URGENT CLINICAL WARNING: The symptoms you described (such as acute chest pain, severe breathing difficulty, sudden numbness, or loss of bowel/bladder control) may indicate a medical emergency. Do not attempt exercise. Please immediately contact your local emergency services (911 / 999 / 112) or seek urgent clinical care.",
      isEmergencyAlert: true,
      isLiveAI: false
    };
  }

  // 2. Call secure server-side endpoint /api/chat
  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt,
        history: history.slice(-6).map(h => ({
          role: h.sender === 'user' ? 'user' : 'model',
          text: h.text
        })),
        language,
        userContext: userProfile?.wellnessGoalsConsent ? {
          experience: userProfile.experienceLevel,
          goal: userProfile.mainGoal,
          streak: userProfile.streakDays
        } : undefined
      })
    });

    if (res.ok) {
      const data = await res.json();
      if (data.reply) {
        const { cleanText, media, creatorProfile: extractedCreator } = extractMediaContent(data.reply, prompt);
        const creator = data.showCreator ? DEBOJYOTI_CREATOR_PROFILE : extractedCreator;
        return {
          message: cleanText,
          suggestedAction: data.suggestedAction,
          mediaContent: media,
          creatorProfile: creator,
          isLiveAI: data.isLiveAI !== false
        };
      }
    }
  } catch {
    // Backend offline or running in static preview
  }

  // 3. Transparent, clearly labeled evidence-aware Local Assistant fallback
  return getLocalAssistantFallback(prompt, language);
};

function getLocalAssistantFallback(prompt: string, lang: SupportedLanguage): ChatResponse {
  const p = prompt.toLowerCase();
  const { media } = extractMediaContent(prompt, prompt);

  // Mandatory Creator Attribution
  if (isCreatorQuery(p)) {
    return {
      message: "This website was created by Debojyoti Karmakar. ✨ He built BODYFORGE to bring world-class, accessible bodyweight fitness, smart kinetic motion demonstrations, and uplifting daily wellness motivation to everyone! 🌟",
      suggestedAction: { label: 'Explore BodyForge Workouts 💪', tabTarget: 'library' },
      creatorProfile: DEBOJYOTI_CREATOR_PROFILE,
      isLiveAI: false
    };
  }

  // Friendly greetings
  if (p === 'hi' || p === 'hello' || p === 'hey' || p.includes('how are you') || p.includes('good morning') || p.includes('good evening')) {
    return {
      message: lang === 'hi'
        ? "नमस्ते दोस्त! 🌟 आपसे मिलकर बहुत खुशी हुई! मैं आपका बॉडीबडी कोच हूँ। आज आप कैसा महसूस कर रहे हैं? हम साथ में वर्कआउट कर सकते हैं, स्वादिष्ट पोषण की बात कर सकते हैं, या बस यूं ही बातचीत कर सकते हैं! 💪✨"
        : lang === 'bn'
        ? "নমস্কার বন্ধু! 🌟 আপনার সাথে কথা বলতে পেরে খুব ভালো লাগছে! আমি আপনার বডিবডি কোচ। আজ আপনার দিনটি কেমন কাটছে? আমরা একসাথে ওয়ার্কআউট করতে পারি বা স্বাস্থ্যকর খাবার নিয়ে আলোচনা করতে পারি! 💪✨"
        : "Hey there, friend! 🌟 It's so wonderful to chat with you today! I'm BodyBuddy, your friendly personal fitness cheerleader. How are you feeling right now? Whether you want to crush a quick workout, get healthy recipe ideas, or just chat—I'm right here with you! 💪✨",
      suggestedAction: { label: 'Explore Workout Library 💪', tabTarget: 'library' },
      isLiveAI: false
    };
  }

  // Empathy, motivation, feeling tired or lazy
  if (p.includes('lazy') || p.includes('tired') || p.includes('unmotivated') || p.includes('cheer') || p.includes('motivate') || p.includes('sad') || p.includes('burnout')) {
    return {
      message: lang === 'hi'
        ? "बड़ा सा वर्चुअल हग आपके लिए! 💛 थकान महसूस होना बिल्कुल सामान्य और स्वाभाविक है। आपको हमेशा 100% परफेक्ट होने की जरूरत नहीं है—बस 2 मिनट का हल्का स्ट्रेच या एक गिलास पानी पीना भी अपने आप में एक बड़ी जीत है! मुझे आप पर गर्व है कि आप यहाँ आए। 🌟"
        : lang === 'bn'
        ? "আপনার জন্য রইল একটি উষ্ণ আলিঙ্গন! 💛 ক্লান্ত বা অনুৎসাহী বোধ করা একদম স্বাভাবিক। নিজেকে নিয়ে কঠোর হবেন না—মাত্র ৫ মিনিটের মৃদু স্ট্রেচিং বা এক গ্লাস জল খাওয়াও আজকের জন্য দারুণ একটি পদক্ষেপ! 🌟"
        : "Sending you the biggest virtual hug! 💛 First off, it is 100% normal and okay to feel tired or low on energy. You're human, not a robot!\n\nHere's a gentle, zero-pressure reminder:\n• Even 2 minutes of gentle stretching counts as a genuine win.\n• Drink a tall glass of refreshing water and breathe deeply.\n• Consistency isn't about being intense every day—it's about being kind to yourself!\n\nI'm so proud of you for checking in. Would you like a gentle 5-minute stretch or just a fun chat? 🌟",
      suggestedAction: { label: 'Gentle Mobility Guide 🧘', tabTarget: 'wellness' },
      isLiveAI: false
    };
  }

  // Glow-Up, Jawline, Posture, V-Taper, Skin Radiance
  if (p.includes('glow') || p.includes('jawline') || p.includes('face') || p.includes('posture') || p.includes('v-taper') || p.includes('chin tuck') || p.includes('skin')) {
    const message = lang === 'hi'
      ? "✨ आपका एथलेटिक ग्लो-अप ब्लूप्रिंट:\n\n• जबड़ा और गर्दन (Jawline Definition): दिन में 30 सेकंड का चिन-टक (Cervical Retraction) करें। इससे फॉरवर्ड-हेड पोस्चर ठीक होता है और जबड़े की रेखा प्राकृतिक रूप से स्पष्ट होती है।\n• वी-टेपर बॉडी: चौड़े पुश-अप और प्लैंक से कंधों को चौड़ा और कमर को पतला बनाएं।\n• स्किनकेयर: पसीने के 15 मिनट के अंदर चेहरा साफ पानी से धोएं ताकि मुहासे न हों।\n• नींद: गहरी नींद त्वचा के कोलेजन को पुनर्जीवित करती है! 🌙"
      : lang === 'bn'
      ? "✨ আপনার অ্যাথলেটিক গ্লো-আপ গাইড:\n\n• স্পষ্ট চোয়াল (Jawline): দিনে ৩০ সেকেন্ড চিন-টাক করুন। এটি ঘাড়ের ভঙ্গি শুধরে চোয়ালকে তীক্ষ্ণ করে তোলে।\n• ভি-টেপার শরীর: ওয়াইড পুশ-আপ ও প্ল্যাঙ্ক দিয়ে চওড়া কাঁধ ও নির্মেদ কোমর তৈরি করুন।\n• ত্বকের যত্ন: ঘাম শুকানোর ১৫ মিনিটের মধ্যে মুখ ধুয়ে ফেলুন।\n• ঘুম: গভীর ঘুম ত্বকের স্বাভাবিক উজ্জ্বলতা বৃদ্ধি করে! 🌙"
      : "✨ Your Athletic Glow-Up Blueprint:\n\n1. Cervical Plumb-Line & Jawline: Counteract 'tech-neck' with gentle horizontal chin retractions. Gliding the head back into alignment pulls the hyoid bone upward, tightening the submental tissue for a naturally sculpted jawline without damaging TMJ clenching.\n2. V-Taper Calisthenics: Wide push-ups, scapular squeezes, and hollow planks expand shoulder width while tapering the waist.\n3. Athlete Skincare: Rinse perspiration within 15 minutes to prevent acne mechanica, and support barrier hydration with light moisturizer.\n4. Circadian Radiance: 15-min morning sunlight and deep stage-3 sleep drive 90% of growth hormone skin regeneration. You're going to glow! 🌟";

    return {
      message,
      suggestedAction: { label: 'Explore Glow-Up Blueprint ✨', tabTarget: 'wellness' },
      mediaContent: media || buildMediaItem('image', 'chin-tuck', 'Cervical Retraction & Jawline Plumb Line'),
      isLiveAI: false
    };
  }

  if (p.includes('pushup') || p.includes('chest') || p.includes('push up')) {
    return {
      message: lang === 'hi'
        ? "पुश-अप बहुत ही शानदार एक्सरसाइज है! 💪 अपनी हथेलियों को कंधों की चौड़ाई से थोड़ा बाहर रखें, कोहनियों को 45 डिग्री के कोण पर रखें और कमर को सीधा तानकर रखें। आप कमाल करेंगे! हमारे 'Pectoral Armor' वर्कआउट से शुरुआत करें।"
        : lang === 'bn'
        ? "পুশ-আপ একটি অসাধারণ শক্তি বৃদ্ধিকারী ব্যায়াম! 💪 হাত কাঁধের চেয়ে একটু প্রশস্ত রাখুন এবং কনুই ৪৫ ডিগ্রি কোণে রাখুন। পেট শক্ত রাখুন। আপনি খুব ভালো পারবেন! আমাদের 'Pectoral Armor' রুটিন দেখুন।"
        : "I love push-ups! They are such a fantastic, empowering movement! 💪✨ Place palms just outside shoulder width with elbows tracking back at 45 degrees. Keep your glutes and core clamped tight so your whole body moves like a strong plank. Give our 'Pectoral Armor' routine a shot—you've got this!",
      suggestedAction: { label: 'Open Pectoral Armor Routine 💪', tabTarget: 'library' },
      mediaContent: media,
      isLiveAI: false
    };
  }

  if (p.includes('back') || p.includes('spine') || p.includes('lower back') || p.includes('दर्द') || p.includes('ব্যথা')) {
    return {
      message: lang === 'hi'
        ? "पीठ की हल्की जकड़न के लिए कैट-काउ (Cat-Cow) और ग्लूट ब्रिज बहुत ही आरामदायक और सुरक्षित हैं। 💛 अपने शरीर की सुनें और कभी भी तेज दर्द में जोर न लगाएं।"
        : lang === 'bn'
        ? "পিঠের সাধারণ ক্লান্তির জন্য মৃদু ক্যাট-কাউ স্ট্রেচ খুব আরামদায়ক। 💛 শরীরের কথা শুনুন এবং তীব্র ব্যথা হলে ব্যায়াম বন্ধ করে বিশ্রাম নিন।"
        : "For mild postural back stiffness, gentle quadruped Cat-Cow and glute activation bridge movements relieve tension so beautifully! 💛 Always listen to your body and never push through sharp pain. Take a peek at our dedicated Body Pain & Mobility Library for gentle relief!",
      suggestedAction: { label: 'Explore Back Mobility Guide 🧘', tabTarget: 'wellness' },
      mediaContent: media,
      isLiveAI: false
    };
  }

  if (p.includes('fat') || p.includes('weight') || p.includes('belly') || p.includes('diet')) {
    return {
      message: lang === 'hi'
        ? "याद रखें, स्वस्थ वजन प्रबंधन एक लंबी, खूबसूरत यात्रा है! 🥗 किसी एक हिस्से से चर्बी कम करना संभव नहीं होता, लेकिन दैनिक 8,000 कदम चलना, संतुलित प्रोटीन और भरपूर नींद आपको ऊर्जावान और फिट बनाएगी। आप बहुत अच्छा कर रहे हैं!"
        : lang === 'bn'
        ? "মনে রাখবেন, স্বাস্থ্যকর ওজন নিয়ন্ত্রণ একটি সুন্দর ধারাবাহিক প্রক্রিয়া! 🥗 দৈনিক হাঁটা, পুষ্টিকর খাবার এবং পর্যাপ্ত ঘুম আপনাকে সুস্থ রাখবে। নিজেকে ভালোবাসুন এবং ধারাবাহিক থাকুন! 💛"
        : "Remember, sustainable fitness is a journey of self-care, not punishment! 🥗 Spot-reducing fat isn't biologically possible, but consistent daily walks (8,000-10,000 steps), colorful balanced meals with good protein, and deep restorative sleep create vibrant health. Check out our Healthy Weight Management guide!",
      suggestedAction: { label: 'View Weight & Metabolic Health Guide 🥗', tabTarget: 'wellness' },
      isLiveAI: false
    };
  }

  if (p.includes('hair') || p.includes('dandruff') || p.includes('scalp')) {
    return {
      message: lang === 'hi'
        ? "दैनिक 50-100 बालों का गिरना सामान्य चक्र है। रूसी (Dandruff) के लिए भारी तेलों से बचें। अपने बालों और सिर की त्वचा के लिए हमारा हेयर केयर गाइड पढ़ें! 💆"
        : lang === 'bn'
        ? "প্রতিদিন ৫০-১০০টি চুল পড়া সাধারণ চক্রের অংশ। খুশকির জন্য অতিরিক্ত তেল এড়িয়ে চলুন। আমাদের হেয়ার অ্যান্ড স্ক্যাল্প গাইড দেখুন! 💆"
        : "Losing 50 to 100 hairs daily is completely natural shedding! 💆 For dandruff, avoid heavy oils which can aggravate fungus, and focus on gentle cleansing. Explore our full Hair & Scalp Health guide for evidence-based tips!",
      suggestedAction: { label: 'Read Hair & Scalp Guide 💆', tabTarget: 'wellness' },
      isLiveAI: false
    };
  }

  return {
    message: lang === 'hi'
      ? "नमस्ते! मैं आपका दोस्त BodyBuddy AI हूँ। 🌟 मैं आपके बॉडीवेट वर्कआउट, मोबिलिटी, स्वादिष्ट पोषण और ग्लो-अप को आसान और मजेदार बनाने के लिए यहाँ हूँ। आज हम साथ में क्या शुरू करें?"
      : lang === 'bn'
      ? "নমস্কার! আমি আপনার বিশ্বস্ত বন্ধু BodyBuddy AI। 🌟 আপনার ক্যালিসথেনিক্স, পুষ্টি এবং সুস্থ জীবনের যাত্রাকে আনন্দময় করে তুলতে আমি আছি আপনার পাশে। আজ আপনাকে কীভাবে সাহায্য করতে পারি?"
      : "Hey there, superstar! 🌟 I'm BodyBuddy AI, your fitness bestie and wellness cheerleader on BODYFORGE! I can guide your workouts with interactive 60FPS video demos, suggest delicious healthy meals, share glow-up tips, or just chat. How can I brighten your day today? 💪✨",
    mediaContent: media,
    isLiveAI: false
  };
}
