export type TreatmentCategory = 'hair' | 'skin' | 'aesthetics' | 'surgery' | 'wellness';

export interface SceneData {
  id: string;
  start: number; // 0 to 1 scroll position
  end: number;
  kicker: string;
  title: string;
  subtitle: string;
  narrativeText: string;
  overlayPosition: 'left' | 'right' | 'center' | 'bottom-left' | 'bottom-right';
  visualNote: string;
  theme: 'deep-emerald' | 'gold-accent' | 'microscopic' | 'clinical' | 'radiance';
}

export interface Treatment {
  id: string;
  category: TreatmentCategory;
  name: string;
  tagline: string;
  description: string;
  indications: string[];
  scientificApproach: string;
  suitableFor: string;
  featuredImage?: string;
  isPopular?: boolean;
}

export interface Doctor {
  id: string;
  name: string;
  role: string;
  title: string;
  biography: string;
  verifiedSpecialties: string[];
  image: string;
  cinematicImage?: string;
  consultationDays: string;
}

export interface ClinicHours {
  days: string;
  hours: string;
}

export interface ClinicContactInfo {
  name: string;
  subtitle: string;
  address: string;
  city: string;
  phone: string;
  phoneRaw: string;
  oladoc: string;
  marham: string;
  hours: ClinicHours[];
  whatsapp: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'consultation' | 'hair' | 'skin' | 'safety';
}

export interface PatientJourneyStep {
  step: string;
  number: string;
  title: string;
  description: string;
  clinicalNote: string;
}

// TypeSafe AI Assessment Types
export interface TriageOption {
  label: string;
  category: TreatmentCategory;
  weight: number;
}

export interface TriageQuestion {
  id: string;
  prompt: string;
  subtitle: string;
  options: TriageOption[];
}

export interface TriageAssessmentResult {
  primaryCategory: TreatmentCategory;
  categoryTitle: string;
  recommendedProcedures: string[];
  clinicalRationale: string;
  preparationAdvice: string;
}
