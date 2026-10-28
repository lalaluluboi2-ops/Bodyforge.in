import { WellnessArticle, GlowUpHabit } from '../types';

export const GLOW_UP_HABITS: GlowUpHabit[] = [
  {
    id: 'habit-cervical-posture',
    title: 'Cervical Retraction (Ear Over Shoulder)',
    category: 'posture',
    description: '30 seconds of gentle chin tucks to counteract tech-neck and visibly sharpen jawline-to-neck definition.',
    completed: false
  },
  {
    id: 'habit-morning-sunlight',
    title: '15-Min Morning Circadian Light',
    category: 'sleep',
    description: 'Natural outdoor photons into the retina anchor cortisol timing, reducing under-eye puffiness and elevating energy.',
    completed: false
  },
  {
    id: 'habit-hydration-electrolytes',
    title: 'Cellular Hydration Goal (2.5L - 3L)',
    category: 'hydration',
    description: 'Adequate hydration plumps skin tissue, supports collagen synthesis, and flushes lymphatic metabolic waste.',
    completed: false
  },
  {
    id: 'habit-sweat-cleanse',
    title: 'Immediate Post-Sweat Face Rinse',
    category: 'skin',
    description: 'Lukewarm water rinse within 15 minutes of training to clear sodium crystals and prevent acne mechanica.',
    completed: false
  },
  {
    id: 'habit-calisthenics-v-taper',
    title: 'Daily Postural Movement & Scapular Pull',
    category: 'movement',
    description: 'Scapular retractions and bodyweight push-ups to expand chest width and develop an athletic V-taper frame.',
    completed: false
  }
];

export const WELLNESS_ARTICLES: WellnessArticle[] = [
  {
    id: 'glow-up-blueprint-science',
    category: 'glow-up',
    title: 'The Athletic Glow-Up Blueprint: Posture, Recomposition & Symmetry',
    subtitle: 'The Science of V-Taper Calisthenics, Cervical Plumb Lines, and Facial Aesthetic Balance',
    summary: 'A comprehensive, evidence-grounded self-care framework for elevating physical aesthetics: improving neck-to-jaw definition through posture, developing broad athletic shoulders without weights, and cultivating glowing athletic skin.',
    readingMinutes: 7,
    reviewDate: 'October 2026',
    reviewedBy: 'BODYFORGE Aesthetic Biomechanics & Dermatology Panel',
    heroGradient: 'from-forge-lime/25 via-charcoal-900 to-charcoal-950',
    motionType: 'chin-tuck',
    keyTakeaways: [
      'Forward head posture pushes the hyoid bone forward, creating the illusion of submental fullness ("double chin") even at low body fat.',
      'Cervical spinal retraction instantly aligns the jawline with the neck, creating crisp definition without painful clenching.',
      'A true athletic "V-taper" is built at home by developing rear deltoids, upper back (rhomboids), and wide-grip push-ups while keeping a lean core.',
      'Sleep is the primary engine of cellular skin regeneration; deep stage-3 slow-wave sleep drives 90% of daily human growth hormone pulses.',
      'Glow-ups are compound lifestyle shifts, not overnight cosmetic gimmicks. Sustainable changes deliver visible results within 4 to 8 weeks.'
    ],
    sections: [
      {
        heading: '1. The Biomechanical Glow-Up: Restoring the Head Plumb Line',
        paragraphs: [
          'Many people believe their jawline appearance is strictly determined by genetic fate or excess weight. However, modern screen use causes chronic forward head posture (FHP), where the head drifts 2 to 3 inches in front of the shoulders.',
          'Biophysically, this slackens the platysma muscle and submental fascia beneath the jaw, obscuring the mandibular angle and creating visible skin drooping. By performing gentle horizontal chin retractions and strengthening deep cervical flexors, the jawline is pulled taut against the neck, immediately improving facial aesthetic balance.'
        ],
        calloutNotice: {
          type: 'clinical',
          text: 'Safety Note: Never forcefully clench your teeth or bite hard objects. Aesthetic jawline health comes from upright cervical posture, nasal breathing, and natural palate tongue rest—not destructive TMJ jaw strain.'
        }
      },
      {
        heading: '2. Physique Recomposition: Building the Bodyweight V-Taper',
        paragraphs: [
          'The classic athletic physique is characterized by broad shoulders, an upright upper back, and a firm, tapered core. You do not need expensive gym machines or heavy barbells to develop this aesthetic ratio.'
        ],
        bulletPoints: [
          'Decline & Diamond Push-Ups: Target upper pectoral clavicular heads and outer tricep sweep, creating a muscular athletic chest.',
          'Scapular Retraction & Prone Cobras: Strengthen rhomboids and middle trapezius, pulling the shoulders back and instantly adding width to the upper torso.',
          'Hollow Body & Plank Progressions: Build transverse abdominis tension, creating a tight waistline that naturally flattens the lower abdomen.'
        ]
      },
      {
        heading: '3. Athlete Skincare & The Post-Sweat Glow',
        paragraphs: [
          'Intense training increases blood microcirculation, delivering oxygen and nutrients to dermal fibroblasts. However, leaving dried sweat, bacteria, and sebum on the skin for hours after a workout is the primary cause of exercise-induced acne (acne mechanica).'
        ],
        bulletPoints: [
          'Rinse within 15 minutes: Wash with lukewarm water and a gentle non-stripping cleanser immediately post-training.',
          'Protect the lipid barrier: Use a lightweight moisturizer containing ceramides or hyaluronic acid to lock in hydration.',
          'Daily broad-spectrum SPF: UV radiation breaks down dermal collagen faster than any other environmental factor. Daily sunscreen preserves skin elasticity.'
        ]
      },
      {
        heading: '4. Circadian Radiance: Why Sleep Creates the Glow',
        paragraphs: [
          'During deep non-REM sleep, the brain activates the glymphatic system, clearing neurotoxic waste and rebalancing fluid retention to alleviate peri-orbital dark circles and under-eye puffiness. Simultaneously, dermal blood flow surges, initiating DNA repair in collagen fibrils.'
        ]
      }
    ],
    sources: [
      { sourceName: 'Harvard Health Publishing', organization: 'The Biomechanics of Upright Posture & Aesthetic Alignment', year: 2025 },
      { sourceName: 'American Academy of Dermatology (AAD)', organization: 'Exercise and Skin Health: Preventing Acne Mechanica', year: 2024 },
      { sourceName: 'Journal of Clinical Sleep Medicine', organization: 'Sleep Quality and Dermatological Regeneration', year: 2024 }
    ]
  },
  {
    id: 'skin-care-sweat-barrier',
    category: 'skin-care',
    title: 'Athlete Skin Care & Barrier Health',
    subtitle: 'Cleansing Protocols, Hydration Science, and Acne Prevention for Active Lifestyles',
    summary: 'A dermatologist-backed protocol for maintaining clear, radiant skin while training intensely. Protect your skin barrier from sweat irritation, friction, and environmental damage.',
    readingMinutes: 5,
    reviewDate: 'October 2026',
    reviewedBy: 'BODYFORGE Dermatology Advisory',
    heroGradient: 'from-teal-600/30 via-charcoal-900 to-charcoal-950',
    motionType: 'face-stretch',
    keyTakeaways: [
      'Sweat itself is virtually sterile; breakouts occur when sweat mixes with surface bacteria, makeup, and dead keratinocytes.',
      'Over-washing with harsh, foaming sulfates strips lipid ceramides, causing rebound oiliness and inflamed breakouts.',
      'Hyaluronic acid draws atmospheric water into stratum corneum cells, imparting immediate skin fullness and vitality.'
    ],
    sections: [
      {
        heading: '1. The Pre- and Post-Workout Skin Protocol',
        paragraphs: [
          'Before exercising, cleanse away heavy foundation or pore-clogging cosmetics. While training, pat sweat with a clean, dry microfiber towel rather than wiping aggressively across the skin surface.',
          'Post-workout, rinse promptly with cool or lukewarm water. Hot water damages the acid mantle, accelerating transepidermal water loss.'
        ]
      },
      {
        heading: '2. Foundational 3-Step Routine',
        paragraphs: [
          'Simplicity produces the highest consistency and healthiest skin barrier:'
        ],
        bulletPoints: [
          'Gentle Cleanser: pH-balanced (5.5) gentle gel cleanser morning and post-workout.',
          'Hydration & Barrier Moisturizer: Ceramides, glycerin, or niacinamide to calm exercise-induced erythema.',
          'Mineral or Chemical SPF 30+: Essential for protecting cellular collagen and preventing hyperpigmentation.'
        ]
      }
    ],
    sources: [
      { sourceName: 'American Academy of Dermatology', organization: 'Skin Care for Active Adults and Athletes', year: 2024 },
      { sourceName: 'British Journal of Dermatology', organization: 'Transepidermal Water Loss and Exercise Mechanics', year: 2024 }
    ]
  },
  {
    id: 'hair-scalp-care-science',
    category: 'hair-scalp',
    title: 'Hair & Scalp Health: Evidence vs. Myths',
    subtitle: 'Scalp Hygiene, Follicular Health, and When to Consult a Dermatologist',
    summary: 'A science-grounded guide to understanding hair shedding cycles, gentle washing frequencies, dandruff mechanisms, and the clear distinction between cosmetic maintenance and medical hair loss.',
    readingMinutes: 6,
    reviewDate: 'October 2026',
    reviewedBy: 'BODYFORGE Clinical Advisory & Evidence Board',
    heroGradient: 'from-amber-600/30 via-charcoal-900 to-charcoal-950',
    motionType: 'face-stretch',
    keyTakeaways: [
      'Normal hair shedding ranges between 50 to 100 hairs daily due to natural follicular telogen cycles.',
      'Cosmetic scalp massage can improve subjective relaxation and localized microcirculation, but cannot reliably reverse androgenetic alopecia or regrow dormant follicles.',
      'Dandruff is primarily linked to Malassezia yeast overgrowth and sebum breakdown, requiring targeted anti-fungal washing rather than heavy pore-clogging oils.',
      'Sudden patchy hair loss, scalp redness, burning, or rapid shedding requires prompt assessment by a licensed dermatologist.'
    ],
    sections: [
      {
        heading: '1. Understanding Hair Cycles: Shedding vs. True Loss',
        paragraphs: [
          'Every human hair follicle progresses independently through three distinct phases: anagen (active growth lasting 2 to 7 years), catagen (brief regression lasting 2 to 3 weeks), and telogen (resting and shedding phase lasting 2 to 4 months). Because thousands of follicles cycle asynchronously, losing 50 to 100 hairs per day in your brush or shower drain is physiologically normal.',
          'True hair loss (alopecia) occurs when follicles progressively miniaturize under hormonal influence (such as dihydrotestosterone in androgenetic alopecia) or when autoimmune, nutritional, or systemic medical conditions disrupt the follicular bulb.'
        ],
        calloutNotice: {
          type: 'clinical',
          text: 'Cosmetic Distinction: Shampoo, scalp oils, massages, and serums are designed for fiber cleanliness, cuticle smoothing, and scalp barrier comfort. They do not alter underlying genetic follicle sensitivity or substitute for prescription medical care.'
        }
      },
      {
        heading: '2. Scalp Hygiene and Dandruff Realities',
        paragraphs: [
          'The scalp has one of the highest concentrations of sebaceous glands on the human body. Infrequent washing can allow oxidized sebum and cellular debris to accumulate, creating an ideal environment for Malassezia, a yeast naturally resident on the scalp.',
          'When Malassezia feeds on excess sebum, it produces irritating fatty acids that trigger rapid epidermal cell turnover, producing classic visible flakes (dandruff or seborrheic dermatitis). Applying heavy vegetable or essential oils directly to an inflamed scalp can feed the yeast and exacerbate flaking.'
        ],
        bulletPoints: [
          'Wash frequency: Cleanse your scalp as often as needed based on personal sebum production and sweat volume after exercise.',
          'Water temperature: Use lukewarm water; boiling hot showers strip natural lipid barriers and inflame hair bulbs.',
          'Active cleansers: For persistent flaking, look for clinically studied active ingredients like zinc pyrithione, ketoconazole, or selenium sulfide.'
        ]
      },
      {
        heading: '3. Minimizing Physical Hair Breakage',
        paragraphs: [
          'Often, what appears to be "falling hair" is actually mechanical hair fiber breakage along the shaft rather than loss at the root. Wet hair fibers can stretch and break under tension far more easily than dry hair.'
        ],
        bulletPoints: [
          'Avoid aggressive towel-rubbing; instead, gently squeeze excess moisture with a microfiber cloth or cotton fabric.',
          'Use wide-tooth combs starting from hair ends upward toward roots rather than forcing a brush from the crown.',
          'Avoid continuous tight ponytails, high-tension braids, or rigid headwear that cause chronic traction alopecia.'
        ]
      },
      {
        heading: '4. When to Seek Medical Assessment',
        paragraphs: [
          'Never start unregulated oral supplements, high-dose biotin, or prescription medications without clinical diagnosis. Excess unmonitored supplementation can interfere with laboratory testing (e.g. troponin and thyroid blood tests).'
        ],
        calloutNotice: {
          type: 'warning',
          text: 'Consult a dermatologist or primary physician if you notice: sudden patchy coin-shaped bald spots (possible alopecia areata), scalp tenderness, pus or scabbing, rapid shedding following systemic illness, or eyebrow/eyelash loss.'
        }
      }
    ],
    sources: [
      { sourceName: 'American Academy of Dermatology (AAD)', organization: 'AAD Guidelines on Hair Loss Types & Scalp Care', year: 2025 },
      { sourceName: 'National Health Service (NHS)', organization: 'NHS UK Health A-Z: Hair Loss and Dandruff Management', year: 2024 },
      { sourceName: 'British Association of Dermatologists', organization: 'Evidence-Based Patient Information: Androgenetic Alopecia', year: 2024 }
    ]
  },
  {
    id: 'healthy-weight-management-foundations',
    category: 'weight-management',
    title: 'Sustainable Weight Management & Metabolic Health',
    subtitle: 'Habits Over Deprivation: Calisthenics, Walking, and Whole-Food Nutrition',
    summary: 'An empowering, non-restrictive approach to body composition, energy balance, sleep regulation, and daily NEAT activity. Free from crash dieting, body shaming, and spot-reduction myths.',
    readingMinutes: 7,
    reviewDate: 'October 2026',
    reviewedBy: 'BODYFORGE Exercise Science & Nutrition Working Group',
    heroGradient: 'from-emerald-600/30 via-charcoal-900 to-charcoal-950',
    motionType: 'squat',
    keyTakeaways: [
      'Sustainable weight management is driven by manageable daily consistency, not rapid restriction or exhausting punishment workouts.',
      'Non-Exercise Activity Thermogenesis (NEAT)—such as daily walking and standing—often burns more cumulative daily calories than a 30-minute workout.',
      'Muscle tissue is metabolically protective. Bodyweight calisthenics preserves lean mass during caloric deficits.',
      'Spot reduction is physiologically impossible: your body draws lipid fuel systemically based on genetics and hormones.'
    ],
    sections: [
      {
        heading: '1. The Pitfalls of Crash Diets and Extreme Deficits',
        paragraphs: [
          'Drastic calorie slashing triggers potent evolutionary survival defenses: active thyroid hormone levels down-regulate, leptin (the satiety hormone) plummets, and ghrelin (the hunger hormone) surges. Concurrently, rapid weight drops predominantly reflect lost water and metabolically valuable skeletal muscle.',
          'When normal eating inevitably resumes, metabolic rate is lower and hunger is heightened, causing frustrating rebound weight gain. BODYFORGE advocates a gradual, nourishing approach that preserves lean tissue and mental well-being.'
        ],
        calloutNotice: {
          type: 'clinical',
          text: 'Age-Appropriate Safety: Caloric restriction must never be prescribed to growing children or adolescents. Youth fitness should celebrate play, strength, bone density, and relationship with movement.'
        }
      },
      {
        heading: '2. The Power of NEAT & Daily Walking',
        paragraphs: [
          'Most people overestimate the caloric impact of an isolated 20-minute workout and underestimate the power of daily low-intensity movement. Non-Exercise Activity Thermogenesis (NEAT) encompasses every movement that is not formal sleep or intentional sports.',
          'Accumulating 7,000 to 10,000 daily steps via purposeful brisk walks improves insulin sensitivity, accelerates recovery by flushing metabolic byproducts, and gently enhances caloric expenditure without triggering voracious compensatory appetite spikes.'
        ],
        bulletPoints: [
          'Post-meal walks: A gentle 10-minute walk after meals blunts postprandial glucose and insulin peaks.',
          'Pacing habits: Walk while taking telephone calls or listening to podcasts.',
          'Stairs over elevators: Small daily compound actions establish identity as an active person.'
        ]
      },
      {
        heading: '3. Nutritional Anchors for Satiety',
        paragraphs: [
          'Rather than focusing on what to obsessively eliminate, focus on foundational foods to add to your plate for satiety and recovery.'
        ],
        bulletPoints: [
          'Prioritize lean protein: Aim for a palm-sized portion with main meals to stimulate muscle protein synthesis and promote peptide YY satiety signals.',
          'Fiber richness: Fill half your plate with leafy vegetables, legumes, berries, and whole grains to slow gastric emptying and foster healthy gut microbiota.',
          'Hydration awareness: Mild dehydration frequently masquerades as lethargy or hunger cravings. Drink water consistently throughout the day.'
        ]
      },
      {
        heading: '4. The Sleep & Stress Connection',
        paragraphs: [
          'Sleeping under 6 hours reliably spikes systemic cortisol and increases cravings for ultra-processed foods rich in sugar and saturated fats. Prioritizing 7 to 9 hours of restorative sleep is as vital to body composition as your physical workout.'
        ]
      }
    ],
    sources: [
      { sourceName: 'World Health Organization (WHO)', organization: 'WHO Physical Activity & Healthy Diets Guidelines', year: 2025 },
      { sourceName: 'Centers for Disease Control and Prevention (CDC)', organization: 'Healthy Weight, Nutrition, and Physical Activity Resources', year: 2024 },
      { sourceName: 'The Lancet Diabetes & Endocrinology', organization: 'Clinical Review: Energy Balance & Long-Term Weight Maintenance', year: 2024 }
    ]
  },
  {
    id: 'sleep-optimization-recovery',
    category: 'sleep',
    title: 'Sleep Architecture & Athletic Recovery',
    subtitle: 'Circadian Hygiene, Growth Hormone Pulses, and Nighttime Reset',
    summary: 'How deep slow-wave sleep and REM cycles repair micro-tears in muscle tissue, restore central nervous system drive, and sharpen mental focus.',
    readingMinutes: 5,
    reviewDate: 'October 2026',
    reviewedBy: 'BODYFORGE Sleep Science Panel',
    heroGradient: 'from-indigo-600/30 via-charcoal-900 to-charcoal-950',
    motionType: 'diaphragm-breath',
    keyTakeaways: [
      'Over 90% of daily human growth hormone (HGH) release occurs during stages 3 and 4 of deep slow-wave sleep.',
      'Caffeine has an average half-life of 5 to 7 hours and quarter-life of up to 12 hours, impairing sleep spindle density even if you fall asleep easily.',
      'Maintaining a consistent morning wake-up time anchors your master suprachiasmatic circadian clock.',
      'A cooler bedroom temperature (around 65°F / 18°C) facilitates the natural core body temperature drop required for sleep initiation.'
    ],
    sections: [
      {
        heading: '1. Why Sleep Is Your Number One Performance Enhancer',
        paragraphs: [
          'Training provides the stimulus; sleep delivers the actual physical adaptation. During deep non-REM sleep, blood pressure decreases, breathing slows, and blood supply to muscles increases, delivering extra oxygen and amino acids to facilitate cellular repair.',
          'Chronic sleep deprivation elevates catabolic stress hormones and significantly increases sports injury risk, while impairing motor skill consolidation learned during workout sessions.'
        ]
      },
      {
        heading: '2. Actionable Circadian Protocol',
        paragraphs: [
          'Your sleep at night is determined by your actions starting the moment you wake in the morning.'
        ],
        bulletPoints: [
          'Morning light exposure: View natural sunlight within 30 minutes of waking to trigger cortisol awakening response and start your 14-hour melatonin timer.',
          'Caffeine curfew: Discontinue coffee, pre-workouts, and energy drinks 8 to 10 hours before your intended bedtime.',
          'Dark & cool sanctuary: Keep the bedroom dark and cool, and remove illuminated screens from the immediate sleeping area.',
          'Wind-down buffer: Dedicate 30 minutes before sleep to screen-free reading, stretching, or slow diaphragmatic breathing.'
        ]
      }
    ],
    sources: [
      { sourceName: 'National Sleep Foundation', organization: 'Sleep Quality Metrics and Health Recommendations', year: 2025 },
      { sourceName: 'Journal of Sports Sciences', organization: 'Sleep and Athletic Performance: Evidence-Based Systematic Review', year: 2024 }
    ]
  },
  {
    id: 'posture-ergonomics-spine',
    category: 'posture',
    title: 'Spinal Decompression & Modern Ergonomics',
    subtitle: 'Countering Tech Neck, Posterior Chain Awakening, and Desk Longevity',
    summary: 'Practical biomechanics to reverse rounded shoulders, anterior pelvic tilt, and thoracic stiffness caused by sedentary screen time.',
    readingMinutes: 5,
    reviewDate: 'October 2026',
    reviewedBy: 'BODYFORGE Physical Therapy Review',
    heroGradient: 'from-blue-600/30 via-charcoal-900 to-charcoal-950',
    motionType: 'chin-tuck',
    keyTakeaways: [
      'There is no single "perfect" static posture; the healthiest posture is your next posture. Regular movement snacks beat rigid stillness.',
      'Every inch of forward head tilt doubles the effective gravitational load experienced by cervical spine muscles.',
      'Strengthening rhomboids, lower trapezius, and glutes counteracts adaptive muscle shortening in chest and hip flexors.',
      'Simple hourly posture resets dramatically reduce end-of-day tension headaches.'
    ],
    sections: [
      {
        heading: '1. The Biomechanics of Forward Head Carriage',
        paragraphs: [
          'In neutral alignment, an adult head weighs approximately 10 to 12 pounds. Tilting the head forward 30 degrees to glance down at a smartphone increases the effective gravitational strain on the posterior neck musculature to roughly 40 pounds.',
          'Over months, suboccipital muscles contract chronically while deep cervical neck flexors become inhibited and weak, leading to chronic tension at the base of the skull.'
        ]
      },
      {
        heading: '2. The 30-Second Micro-Reset',
        paragraphs: [
          'Set a reminder to perform this micro-break every 60 minutes while working at a desk:'
        ],
        bulletPoints: [
          'Perform 5 gentle chin tucks (retracting skull backward in line without tilting down).',
          'Squeeze shoulder blades together and down, rotating thumbs backward to open chest.',
          'Stand up, squeeze both glutes firmly for 5 seconds to open anterior hip capsules.'
        ]
      }
    ],
    sources: [
      { sourceName: 'Occupational Safety and Health Administration (OSHA)', organization: 'Computer Workstation Ergonomics Guidelines', year: 2024 },
      { sourceName: 'Spine Journal', organization: 'Cervical Spine Biomechanics and Postural Strain Analysis', year: 2024 }
    ]
  },
  {
    id: 'stress-vagus-nerve-recovery',
    category: 'stress',
    title: 'Stress Regulation & Nervous System Down-Regulation',
    subtitle: 'Vagal Tone, Physiological Sighs, and Cortisol Equilibrium',
    summary: 'Learn how to consciously switch your autonomic nervous system from sympathetic fight-or-flight into parasympathetic rest-and-digest using evidence-based breath mechanics.',
    readingMinutes: 4,
    reviewDate: 'October 2026',
    reviewedBy: 'BODYFORGE Behavioral Health & Stress Sciences',
    heroGradient: 'from-purple-600/30 via-charcoal-900 to-charcoal-950',
    motionType: 'diaphragm-breath',
    keyTakeaways: [
      'Stress is a physiological response mediated by adrenaline and cortisol, not just a mental sensation.',
      'The "Physiological Sigh" (two quick nasal inhales followed by one prolonged oral exhale) is the fastest known real-time method to lower autonomic arousal.',
      'Chronic stress impairs muscular glycogen resynthesis and delays workout recovery.',
      'Physical calisthenics is a positive hormetic stressor that increases stress resilience when paired with adequate rest.'
    ],
    sections: [
      {
        heading: '1. The Autonomic Lever: Breathing Mechanics',
        paragraphs: [
          'When you inhale, your diaphragm moves down, creating more space in your chest cavity. Your heart expands slightly and blood flow slows, prompting your brain to accelerate heart rate.',
          'Conversely, when you exhale slowly, your diaphragm moves up, heart volume contracts, and the vagus nerve releases acetylcholine to slow heart rate. Lengthening your exhales is a direct, hardwired brake pedal for your heart rate.'
        ]
      },
      {
        heading: '2. The 2-Minute Physiological Sigh Protocol',
        paragraphs: [
          'Whenever you feel acute stress, racing thoughts, or post-workout agitation:'
        ],
        bulletPoints: [
          'Take a deep breath in through your nose to ~80% lung capacity.',
          'At the top, take a second sharp sip of air through your nose to fully pop open collapsed lung alveoli.',
          'Exhale all air slowly and gently through your mouth with soft lips over 5 to 7 seconds.',
          'Repeat 3 to 5 times for immediate autonomic down-regulation.'
        ]
      }
    ],
    sources: [
      { sourceName: 'Cell Reports Medicine', organization: 'Brief Structured Respiration Practices Enhance Mood & Autonomic Tone', year: 2024 },
      { sourceName: 'Harvard Health Publishing', organization: 'Understanding the Stress Response and Relaxation Techniques', year: 2025 }
    ]
  }
];
