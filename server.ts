import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = parseInt(process.env.PORT || '3000', 10);
const isProd = process.env.NODE_ENV === 'production';

app.use(express.json());

// Helper to obtain an initialized GoogleGenAI instance with current API key
function getGenAI(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return null;
  }
  try {
    return new GoogleGenAI({ 
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });
  } catch (err) {
    console.warn('[BODYFORGE] Warning: Failed to initialize GoogleGenAI SDK', err);
    return null;
  }
}

// Health check endpoint
app.get('/api/health', (_req, res) => {
  const ai = getGenAI();
  res.json({
    status: 'ok',
    liveAI: Boolean(ai),
    timestamp: new Date().toISOString()
  });
});

// Explicit sitemap.xml endpoint for SEO crawlers and Cloudflare Workers proxy
app.get('/sitemap.xml', (_req, res) => {
  res.header('Content-Type', 'application/xml');
  res.sendFile(path.resolve(__dirname, 'public', 'sitemap.xml'));
});

// Explicit robots.txt endpoint for search crawlers
app.get('/robots.txt', (_req, res) => {
  res.header('Content-Type', 'text/plain');
  res.sendFile(path.resolve(__dirname, 'public', 'robots.txt'));
});

// Build system instruction for BodyBuddy AI
function buildSystemInstruction(language: string, userContext?: { experience?: string; goal?: string; streak?: number }): string {
  return `You are BodyBuddy AI, an exceptionally warm, friendly, encouraging, empathetic, and caring fitness, nutrition, and wellness companion for BODYFORGE.
LANGUAGE: Respond strictly in ${language === 'hi' ? 'Hindi (हिन्दी)' : language === 'bn' ? 'Bengali (বাংলা)' : 'English'}.

CREATOR ATTRIBUTION & VERIFIED PORTRAIT (MANDATORY):
If anyone asks who created, built, coded, or developed this website or chatbot (e.g. "who made you", "who created you", "who built this"):
You MUST ALWAYS answer:
"This website was created by Debojyoti Karmakar."
Warmly celebrate Debojyoti Karmakar who created BODYFORGE to bring accessible bodyweight fitness, smart kinetic demonstrations, and positive daily wellness motivation to everyone!
Always include the special tag [CREATOR_CARD] in your response so the platform automatically displays his verified portrait photograph alongside your answer.

SUPER FRIENDLY PERSONALITY & VOICE:
- Be remarkably warm, cheerful, positive, empathetic, and uplifting at all times! Speak like an enthusiastic, caring personal coach and best friend.
- Greet users warmly and affectionately (e.g., "Hey friend! 🌟", "You've got this! 💪", "I'm so thrilled you're here today! ✨").
- Celebrate every effort, big or small. Use uplifting, friendly emojis naturally (💪, ✨, 🌟, 💛, 🙌, 🎉, 🥑, 🚀).
- Normalize having off-days, fatigue, soreness, or low motivation with genuine empathy: validate their feelings ("It's completely okay to take it slow today! Listening to your body is a true superpower 💛").
- Never be cold, harsh, robotic, strict, judgmental, or overly clinical. Never talk down to the user.
- VERSATILITY & CONVERSATIONAL MASTERY: You are happy to chat about ANY topic under the sun—general life, science, stress relief, healthy habits, movies, jokes, cooking, study habits, motivation, daily questions—with kindness, humor, and curiosity.
- Never claim to be ChatGPT, OpenAI, Claude, or any other AI service. You are BodyBuddy AI, the friendly fitness and wellness coach created by Debojyoti Karmakar for BODYFORGE.

SPECIAL CAPABILITIES & RULES:
1. WORKOUT VIDEO & IMAGE DEMONSTRATIONS:
   You have access to BODYFORGE's on-demand kinetic visual generation engine! You can and MUST generate interactive workout videos and anatomical diagrams for users when requested.
   NEVER say you cannot show videos or images.
   Instead say with enthusiasm: "I've got you covered! Here is your interactive 60FPS video demonstration below with step-by-step form cues:" or "Here is your anatomical form diagram below showing target muscle activations:"
   And ALWAYS include this exact media tag in your response:
   [MEDIA: type="video"|"image", exercise="pushup"|"squat"|"plank"|"chin-tuck"|"cat-cow", title="Exercise Title"]
   - type="video" for video, motion demo, moving clip, or animated workout.
   - type="image" for picture, diagram, photo, infographic.
   - exercise="pushup" | "squat" | "plank" | "chin-tuck" | "cat-cow"

2. FOOD & NUTRITION WITH LOVE:
   Suggest delicious, balanced, accessible meals and snacks with practical protein sources (vegetarian and non-veg), hydration tips, and gentle habit guidance. Never prescribe extreme crash diets or restrictive calorie counting.

3. GLOW-UP & POSTURE:
   Provide safe, science-backed guidance: chin retractions for natural jawline definition & posture, calisthenics for an athletic taper, post-workout sweat rinsing for clear skin, and restorative sleep.

4. HEALTH & SAFETY:
   Provide friendly safety warnings. If someone reports acute chest pain, trouble breathing, or emergency symptoms, kindly and urgently urge them to contact emergency medical care immediately.
5. NO SPOT REDUCTION: Warmly clarify that body fat reduces across the entire body as a healthy whole.

${userContext ? `Athlete details: Experience level: ${userContext.experience || 'Intermediate'}, Main goal: ${userContext.goal || 'General health & fitness'}, Workout streak: ${userContext.streak || 0} days.` : ''}`;
}

// Helper to deduce quick action buttons from model response or query
function detectSuggestedAction(query: string, reply: string) {
  const text = (query + ' ' + reply).toLowerCase();
  if (text.includes('glow') || text.includes('jawline') || text.includes('skin') || text.includes('v-taper')) {
    return { label: 'Explore Glow-Up Blueprint ✨', tabTarget: 'wellness' };
  }
  if (text.includes('pushup') || text.includes('chest') || text.includes('pectoral')) {
    return { label: 'Open Pectoral Armor Routine 💪', tabTarget: 'library' };
  }
  if (text.includes('back') || text.includes('spine') || text.includes('knee') || text.includes('hip') || text.includes('stiff')) {
    return { label: 'Open Body Pain & Mobility Guide 🧘', tabTarget: 'wellness' };
  }
  if (text.includes('hair') || text.includes('scalp') || text.includes('dandruff')) {
    return { label: 'Read Hair & Scalp Health Guide 💆', tabTarget: 'wellness' };
  }
  if (text.includes('weight') || text.includes('fat') || text.includes('walk') || text.includes('neat')) {
    return { label: 'View Weight Management Guide 🥗', tabTarget: 'wellness' };
  }
  if (text.includes('sleep') || text.includes('circadian') || text.includes('recovery')) {
    return { label: 'Explore Sleep & Recovery Guide 🌙', tabTarget: 'wellness' };
  }
  return undefined;
}

function isCreatorQuery(prompt: string): boolean {
  const p = (prompt || '').toLowerCase();
  return (
    p.includes('who made') || 
    p.includes('who created') || 
    p.includes('who built') || 
    p.includes('who developed') || 
    p.includes('who programmed') || 
    p.includes('who designed') || 
    p.includes('who coded') || 
    p.includes('who is your creator') || 
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

function generateIntelligentFallback(prompt: string, language: string = 'en'): { reply: string; action?: { label: string; tabTarget: string }; showCreator?: boolean } {
  const p = prompt.toLowerCase();
  
  // Explicit creator query handling
  if (isCreatorQuery(p)) {
    return {
      reply: "This website was created by Debojyoti Karmakar. ✨ He built BODYFORGE to bring world-class, accessible bodyweight fitness, smart kinetic motion demonstrations, and uplifting daily wellness motivation to everyone! 🌟\n\n[CREATOR_CARD]",
      action: { label: 'Explore BodyForge Workouts 💪', tabTarget: 'library' },
      showCreator: true
    };
  }

  // Friendly greetings
  if (p === 'hi' || p === 'hello' || p === 'hey' || p.includes('how are you') || p.includes('good morning') || p.includes('good evening')) {
    return {
      reply: `Hey there, friend! 🌟 It's so wonderful to chat with you today! I'm BodyBuddy, your friendly personal fitness cheerleader. How is your day going, and how are you feeling right now? We can do a quick workout, chat about delicious meals, or talk through whatever's on your mind! 💪✨`,
      action: { label: 'Browse Workout Library', tabTarget: 'library' }
    };
  }

  // Empathy, motivation, feeling tired/lazy
  if (p.includes('lazy') || p.includes('tired') || p.includes('unmotivated') || p.includes('cheer') || p.includes('motivate') || p.includes('sad') || p.includes('burnout')) {
    return {
      reply: `Big virtual hug to you! 💛 First off: it is 100% normal and okay to feel low energy or unmotivated. You are human, not a machine! \n\nHere is a gentle, zero-pressure idea:\n• Even just 2 minutes of gentle stretching or a quick walk around your room counts as a huge win.\n• Drink a tall, refreshing glass of water.\n• Remember that showing up for yourself doesn't have to mean breaking world records—just taking one mindful breath is enough.\n\nI'm super proud of you for checking in. Would you like to try a light 5-minute stretch or just chat? 🌟`,
      action: { label: 'Gentle Mobility & Stretching 🧘', tabTarget: 'wellness' }
    };
  }

  // Workouts / Pushup
  if (p.includes('pushup') || p.includes('push-up') || p.includes('chest') || p.includes('pectoral')) {
    const isVideo = p.includes('video') || p.includes('motion') || p.includes('animation') || p.includes('clip') || p.includes('show');
    const mediaTag = isVideo ? '\n\n[MEDIA: type="video", exercise="pushup", title="Standard Calisthenics Push-Up Biomechanics"]' : '';
    return {
      reply: `I love push-ups! They are such a fantastic, empowering movement! 💪✨\n\nHere are 3 friendly cues to keep your joints happy and muscles strong:\n1. Hand placement: Set your palms just outside shoulder width with fingers spread wide for a solid base.\n2. Elbow angle: Let your elbows glide back like an arrow (around 45°), keeping your shoulders safe and happy!\n3. Core power: Squeeze your glutes and brace your tummy so your body moves like a smooth, solid plank.\n\nReady to give it a try? You've got this!${mediaTag}`,
      action: { label: 'Open Pectoral Armor Routine 💪', tabTarget: 'library' }
    };
  }

  // Squat
  if (p.includes('squat') || p.includes('quad') || p.includes('leg') || p.includes('thigh')) {
    const isVideo = p.includes('video') || p.includes('motion') || p.includes('animation') || p.includes('clip') || p.includes('show');
    const mediaTag = isVideo ? '\n\n[MEDIA: type="video", exercise="squat", title="Air Squat 3D Biomechanics"]' : '';
    return {
      reply: `Squats are the king of lower-body strength! 🦵🌟 Let's make every rep feel amazing:\n\n• Stand tall with feet shoulder-width apart and toes angled slightly outward (10-15°).\n• Sit back like you're aiming for a comfy chair, keeping your chest proud and smiling!\n• Push through your mid-foot as you rise up and give your glutes a friendly squeeze at the top.\n\nTake it slow and enjoy the burn!${mediaTag}`,
      action: { label: 'Open Living Room Routine 🛋️', tabTarget: 'library' }
    };
  }

  // Core / Plank / Six pack
  if (p.includes('plank') || p.includes('core') || p.includes('abs') || p.includes('six pack') || p.includes('six-pack') || p.includes('crunch')) {
    const isVideo = p.includes('video') || p.includes('motion') || p.includes('animation') || p.includes('clip') || p.includes('show');
    const mediaTag = isVideo ? '\n\n[MEDIA: type="video", exercise="plank", title="Isometric Plank 3D Core Bracing"]' : '';
    return {
      reply: `You're building an unbreakable foundation! 🔥 For planks, quality always wins over quantity:\n\n• Stack your elbows directly under your shoulders.\n• Gently tuck your tailbone and squeeze your glutes (imagine pulling your belly button gently toward your spine).\n• Breathe smoothly into your belly—no holding your breath!\n\nEven a clean 20-second plank does wonders! Keep up that incredible energy!${mediaTag}`,
      action: { label: 'Open Six-Pack Matrix Routine 🔥', tabTarget: 'library' }
    };
  }

  // Glow-up / Jawline / Posture
  if (p.includes('glow') || p.includes('jawline') || p.includes('posture') || p.includes('mewing') || p.includes('chin tuck') || p.includes('skin')) {
    const isVideo = p.includes('video') || p.includes('motion') || p.includes('animation') || p.includes('clip') || p.includes('show');
    const mediaTag = isVideo ? '\n\n[MEDIA: type="video", exercise="chin-tuck", title="Cervical Retraction & Jawline Plumb Line"]' : '';
    return {
      reply: `Here is your glow-up sunshine blueprint! ✨ Radiant posture and glowing health look amazing on you:\n\n1. Posture & Jawline: Counteract looking at screens with gentle chin retractions. Gently glide your head back over your shoulders—this instantly opens your chest and elongates your jawline contour safely!\n2. Calisthenics V-Taper: Broad push-ups and posture holds give you that confident, athletic stance.\n3. Skin Radiance: Rinse off sweat within 15 minutes of working out, and hydrate with water throughout the day.\n4. Restful Sleep: Quality deep sleep is your body's natural beauty and recovery superpower! 🌙${mediaTag}`,
      action: { label: 'Explore Glow-Up Blueprint ✨', tabTarget: 'wellness' }
    };
  }

  // Nutrition / Food / Diet
  if (p.includes('food') || p.includes('nutrition') || p.includes('diet') || p.includes('eat') || p.includes('protein') || p.includes('meal')) {
    return {
      reply: `Eating well should be enjoyable and nourishing, never miserable! 🥑🥗\n\nHere are friendly, tasty guidelines to fuel your day:\n• Protein Power: Try including wholesome protein in your meals—like eggs, chicken, fish, paneer, tofu, lentils, or Greek yogurt to support your muscles.\n• Colorful Fuel: Add vibrant veggies and fruits for natural energy, vitamins, and gut health.\n• Stay Hydrated: Keep a water bottle nearby; sipping throughout the day keeps your energy buzzing!\n• Balance Over Perfection: Enjoy your favorite treats without guilt. Consistency beats strictness every single time! 💛`,
      action: { label: 'Open Food & Nutrition Tab 🥑', tabTarget: 'nutrition' }
    };
  }

  // General or other topics
  return {
    reply: `I'm right here with you, cheering you on every step of the way! 🌟 Whether you want to master bodyweight workouts, find tasty healthy recipes, relieve muscle stiffness, or just chat about life—I'm here for you with a smile. What would you like to explore together right now? ✨`,
    action: { label: 'View Workout Library 💪', tabTarget: 'library' }
  };
}

// Ultra-fast streaming endpoint via Server-Sent Events (SSE)
app.post('/api/chat/stream', async (req, res) => {
  const userText = req.body.prompt || req.body.message;
  const { history, language = 'en', userContext } = req.body;

  if (!userText || typeof userText !== 'string') {
    return res.status(400).json({ error: 'Valid prompt or message string is required' });
  }
  const prompt = userText;

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders?.();

  // Explicit creator query handling
  if (isCreatorQuery(prompt)) {
    const creatorReply = "This website was created by Debojyoti Karmakar. ✨ He built BODYFORGE to bring world-class, accessible bodyweight fitness, smart kinetic motion demonstrations, and uplifting daily wellness motivation to everyone! 🌟\n\n[CREATOR_CARD]";
    res.write(`data: ${JSON.stringify({ 
      text: creatorReply, 
      done: true, 
      suggestedAction: { label: 'Explore BodyForge Workouts 💪', tabTarget: 'library' },
      isLiveAI: true,
      showCreator: true,
      creatorImage: '/assets/aistudio/1793189785291_447b1826.png'
    })}\n\n`);
    return res.end();
  }

  const ai = getGenAI();
  if (!ai) {
    const fallback = generateIntelligentFallback(prompt, language);
    res.write(`data: ${JSON.stringify({ text: fallback.reply, done: true, suggestedAction: fallback.action, isLiveAI: false })}\n\n`);
    return res.end();
  }

  try {
    const systemInstruction = buildSystemInstruction(language, userContext);
    
    // Assemble recent messages
    let formattedPrompt = prompt;
    if (Array.isArray(history) && history.length > 0) {
      const pastContext = history.slice(-4).map((h: { role: string; text: string }) => `${h.role === 'user' ? 'User' : 'Assistant'}: ${h.text}`).join('\n');
      formattedPrompt = `Previous chat:\n${pastContext}\n\nUser Question: ${prompt}`;
    }

    // Modern recommended flagship model: gemini-3.8-flash
    const stream = await ai.models.generateContentStream({
      model: 'gemini-3.8-flash',
      contents: formattedPrompt,
      config: {
        systemInstruction,
        temperature: 0.7,
        maxOutputTokens: 600
      }
    });

    let fullReply = '';
    for await (const chunk of stream) {
      const chunkText = chunk.text;
      if (chunkText) {
        fullReply += chunkText;
        res.write(`data: ${JSON.stringify({ text: chunkText, done: false })}\n\n`);
      }
    }

    const action = detectSuggestedAction(prompt, fullReply);
    const showCreator = isCreatorQuery(prompt) || fullReply.includes('Debojyoti') || fullReply.includes('[CREATOR_CARD]');
    res.write(`data: ${JSON.stringify({ 
      done: true, 
      suggestedAction: action, 
      isLiveAI: true,
      showCreator,
      creatorImage: showCreator ? '/assets/aistudio/1793189785291_447b1826.png' : undefined
    })}\n\n`);
    res.end();
  } catch (error) {
    console.warn('[BODYFORGE] Live Gemini stream notice:', error);
    // Provide a rich, seamless answer without awkward connection delay complaints
    const fallback = generateIntelligentFallback(prompt, language);
    res.write(`data: ${JSON.stringify({ 
      text: fallback.reply, 
      done: true, 
      suggestedAction: fallback.action, 
      isLiveAI: false,
      showCreator: fallback.showCreator,
      creatorImage: fallback.showCreator ? '/assets/aistudio/1793189785291_447b1826.png' : undefined
    })}\n\n`);
    res.end();
  }
});

// Standard JSON Chat Endpoint (with gemini-3.8-flash)
app.post('/api/chat', async (req, res) => {
  const userText = req.body.prompt || req.body.message;
  const { history, language = 'en', userContext } = req.body;

  if (!userText || typeof userText !== 'string') {
    return res.status(400).json({ error: 'Valid prompt or message string is required' });
  }
  const prompt = userText;

  // Explicit creator query handling
  if (isCreatorQuery(prompt)) {
    return res.json({
      reply: "This website was created by Debojyoti Karmakar. ✨ He built BODYFORGE to bring world-class, accessible bodyweight fitness, smart kinetic motion demonstrations, and uplifting daily wellness motivation to everyone! 🌟\n\n[CREATOR_CARD]",
      suggestedAction: { label: 'Explore BodyForge Workouts 💪', tabTarget: 'library' },
      showCreator: true,
      creatorImage: '/assets/aistudio/1793189785291_447b1826.png',
      isConfigured: true,
      isLiveAI: true
    });
  }

  const ai = getGenAI();
  if (!ai) {
    const fallback = generateIntelligentFallback(prompt, language);
    return res.json({
      reply: fallback.reply,
      suggestedAction: fallback.action,
      isConfigured: false,
      isLiveAI: false
    });
  }

  try {
    const systemInstruction = buildSystemInstruction(language, userContext);
    let formattedPrompt = prompt;
    if (Array.isArray(history) && history.length > 0) {
      const pastContext = history.slice(-4).map((h: { role: string; text: string }) => `${h.role === 'user' ? 'User' : 'Assistant'}: ${h.text}`).join('\n');
      formattedPrompt = `Previous chat:\n${pastContext}\n\nUser Question: ${prompt}`;
    }

    // Safety timeout increased to 12 seconds
    const timeoutPromise = new Promise<{ text: string }>((_, reject) => {
      setTimeout(() => reject(new Error('TIMEOUT')), 12000);
    });

    const generatePromise = ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: formattedPrompt,
      config: {
        systemInstruction,
        temperature: 0.7,
        maxOutputTokens: 600
      }
    });

    const response = await Promise.race([generatePromise, timeoutPromise]);
    const replyText = response.text || generateIntelligentFallback(prompt, language).reply;
    const suggestedAction = detectSuggestedAction(prompt, replyText);
    const showCreator = isCreatorQuery(prompt) || replyText.includes('Debojyoti') || replyText.includes('[CREATOR_CARD]');

    return res.json({
      reply: replyText,
      suggestedAction,
      showCreator,
      creatorImage: showCreator ? '/assets/aistudio/1793189785291_447b1826.png' : undefined,
      isConfigured: true,
      isLiveAI: true
    });
  } catch (error) {
    console.warn('[BODYFORGE] Gemini generation notice:', error);
    const fallback = generateIntelligentFallback(prompt, language);
    return res.json({
      reply: fallback.reply,
      suggestedAction: fallback.action,
      showCreator: fallback.showCreator,
      creatorImage: fallback.showCreator ? '/assets/aistudio/1793189785291_447b1826.png' : undefined,
      isConfigured: true,
      isLiveAI: false
    });
  }
});

// Dev server or Production static serving
async function startServer() {
  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`[BODYFORGE] Server running at http://0.0.0.0:${port} (${isProd ? 'production' : 'development'})`);
  });
}

startServer();
