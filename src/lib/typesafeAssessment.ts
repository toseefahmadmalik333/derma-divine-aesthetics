import { TreatmentCategory, TriageAssessmentResult, TriageQuestion } from '../types';

export const triageQuestions: TriageQuestion[] = [
  {
    id: 'primary-concern',
    prompt: 'What is your primary area of focus?',
    subtitle: 'Select the primary physiological domain you wish to address.',
    options: [
      { label: 'Hair Thinning, Crown Recession or Hairline Restoration', category: 'hair', weight: 4 },
      { label: 'Acne Scars, Active Breakouts or Dull Skin Texture', category: 'skin', weight: 4 },
      { label: 'Facial Symmetry, Jawline Definition or Volume Restoration', category: 'aesthetics', weight: 4 },
      { label: 'Surgical Structural Refinement (Nose, Eyelids, Facial Contouring)', category: 'surgery', weight: 4 },
      { label: 'Weight Management, PCOS Nutrition & Metabolic Harmony', category: 'wellness', weight: 4 },
    ],
  },
  {
    id: 'timeline-goal',
    prompt: 'What is your intended therapeutic outcome?',
    subtitle: 'This helps our clinicians calibrate invasive vs non-invasive recommendations.',
    options: [
      { label: 'Permanent structural restoration with precision micro-grafts', category: 'hair', weight: 3 },
      { label: 'Deep cellular rejuvenation and collagen matrix remodeling', category: 'skin', weight: 3 },
      { label: 'Subtle rejuvenation preserving natural facial expressions', category: 'aesthetics', weight: 3 },
      { label: 'Definitive surgical correction performed by a Plastic Surgeon', category: 'surgery', weight: 3 },
      { label: 'Sustainable internal lifestyle and dietary metabolic balance', category: 'wellness', weight: 3 },
    ],
  },
  {
    id: 'downtime-tolerance',
    prompt: 'What is your availability for recovery time?',
    subtitle: 'Clinical options are tailored to fit your professional and personal schedule.',
    options: [
      { label: 'Zero downtime (lunchtime clinical procedures)', category: 'skin', weight: 2 },
      { label: 'Minimal recovery (1–2 days of mild redness)', category: 'aesthetics', weight: 2 },
      { label: 'Structured healing window (5–10 days post-procedure)', category: 'hair', weight: 2 },
      { label: 'Full surgical recovery supervised by surgeon', category: 'surgery', weight: 2 },
      { label: 'No procedural downtime (nutritional & lifestyle guidance)', category: 'wellness', weight: 2 },
    ],
  },
];

export function computeTypeSafeTriage(selectedAnswers: Record<string, TreatmentCategory>): TriageAssessmentResult {
  const scores: Record<TreatmentCategory, number> = {
    hair: 0,
    skin: 0,
    aesthetics: 0,
    surgery: 0,
    wellness: 0,
  };

  Object.values(selectedAnswers).forEach((cat) => {
    if (scores[cat] !== undefined) {
      scores[cat] += 1;
    }
  });

  // Determine highest scored category
  let topCategory: TreatmentCategory = 'hair';
  let maxScore = -1;
  (Object.keys(scores) as TreatmentCategory[]).forEach((cat) => {
    if (scores[cat] > maxScore) {
      maxScore = scores[cat];
      topCategory = cat;
    }
  });

  const categoryProfiles: Record<TreatmentCategory, {
    categoryTitle: string;
    recommendedProcedures: string[];
    clinicalRationale: string;
    preparationAdvice: string;
  }> = {
    hair: {
      categoryTitle: 'Hair Restoration & Follicular Medicine',
      recommendedProcedures: [
        'Sapphire Micro-Punch FUE Hair Transplant',
        'Platelet-Rich Plasma (PRP) Follicular Infusions',
        'Micro-Vascular Scalp Stabilization Protocol'
      ],
      clinicalRationale: 'Your responses indicate follicular miniaturization or hairline thinning that responds optimally to precise graft micro-placement and autologous growth factor support.',
      preparationAdvice: 'Avoid blood-thinning supplements for 48 hours prior to your consultation. Come with clean, un-gelled hair for high-magnification dermoscopy.'
    },
    skin: {
      categoryTitle: 'Clinical Dermatology & Dermal Matrix Remodeling',
      recommendedProcedures: [
        'Medical-Grade HydraFacial MD',
        'Percutaneous Collagen Induction (Microneedling + PRP)',
        'Carbon Laser Porcelain Peel'
      ],
      clinicalRationale: 'Your dermal focus points toward cellular turnover, pore decongestion, and neocollagenesis to rebuild smooth epidermal texture.',
      preparationAdvice: 'Discontinue active retinoids or intensive alpha-hydroxy acids 3 days prior to your skin assessment.'
    },
    aesthetics: {
      categoryTitle: 'Facial Aesthetics & Volume Architecture',
      recommendedProcedures: [
        'Botulinum Toxin Natural Expression Smoothing',
        'Hyaluronic Acid Vector Contouring',
        'PDO Vector Collagen Thread Lift'
      ],
      clinicalRationale: 'Your goals emphasize structural volume balance and softening dynamic expression lines while preserving authentic facial dynamics.',
      preparationAdvice: 'Avoid anti-inflammatory pain medications and alcohol for 24 hours prior to prevent minor bruising at injection vectors.'
    },
    surgery: {
      categoryTitle: 'Plastic & Reconstructive Surgery',
      recommendedProcedures: [
        'Comprehensive Plastic Surgery Consultation',
        'Facial Vector & Proportion Analysis',
        'Surgical Blepharoplasty / Contouring Evaluation'
      ],
      clinicalRationale: 'Your objectives require definitive anatomical adjustment best evaluated in an in-depth surgical roadmap with Dr. Hamza Malik.',
      preparationAdvice: 'Compile any prior surgical history or diagnostic imaging for review in the private consultation suite.'
    },
    wellness: {
      categoryTitle: 'Metabolic Health & Clinical Dietetics',
      recommendedProcedures: [
        'Clinical Nutrition Consultation with Ms. Sunzal Kamran',
        'PCOS & Metabolic Dietary Calibration',
        'Nutritional Hair & Skin Support Roadmap'
      ],
      clinicalRationale: 'Your profile prioritizes systemic balance, addressing hormonal pathways that directly influence weight, skin clarity, and follicular vitality.',
      preparationAdvice: 'Bring any recent laboratory blood panels (hormonal, lipid, or metabolic) from the past 6 months to your dietary assessment.'
    }
  };

  const profile = categoryProfiles[topCategory];

  return {
    primaryCategory: topCategory,
    categoryTitle: profile.categoryTitle,
    recommendedProcedures: profile.recommendedProcedures,
    clinicalRationale: profile.clinicalRationale,
    preparationAdvice: profile.preparationAdvice,
  };
}
