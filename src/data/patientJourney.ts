import { PatientJourneyStep } from '../types';

export const patientJourneySteps: PatientJourneyStep[] = [
  {
    step: 'Phase 01',
    number: '01',
    title: 'Understand Your Concern',
    description: 'We listen attentively to your aesthetic desires, concerns, and clinical history in an unhurried, private environment.',
    clinicalNote: 'Patient-led discussion respecting individual preferences and emotional comfort.'
  },
  {
    step: 'Phase 02',
    number: '02',
    title: 'Comprehensive Consultation',
    description: 'A direct medical evaluation with Dr. Hamza Malik, Dr. Anam Afzal, or Ms. Sunzal Kamran to examine skin, follicular, or metabolic state.',
    clinicalNote: 'Clinical diagnostic evaluation prioritizing safety and anatomical candidacy.'
  },
  {
    step: 'Phase 03',
    number: '03',
    title: 'Personalised Assessment',
    description: 'Detailed microscopic vector analysis, skin barrier assessment, or donor density evaluation to determine precise biological parameters.',
    clinicalNote: 'Objective medical metrics rather than standardized assumptions.'
  },
  {
    step: 'Phase 04',
    number: '04',
    title: 'Customised Treatment Plan',
    description: 'A transparent, collaborative roadmap outlining procedural stages, realistic expectations, timeline, and recovery guidance.',
    clinicalNote: 'Full informed consent with clear procedural boundaries.'
  },
  {
    step: 'Phase 05',
    number: '05',
    title: 'Precision Treatment',
    description: 'Execution of your procedure using sterile surgical theaters, single-crystal sapphire micro-punches, or certified medical energy devices.',
    clinicalNote: 'Rigorous medical protocols with utmost attention to comfort and sterility.'
  },
  {
    step: 'Phase 06',
    number: '06',
    title: 'Dedicated Follow-Up & Aftercare',
    description: 'Scheduled post-treatment reviews, barrier recovery management, and ongoing clinical support to ensure seamless healing.',
    clinicalNote: 'Continuous post-procedure care and accessible clinician guidance.'
  },
  {
    step: 'Phase 07',
    number: '07',
    title: 'Natural Confidence',
    description: 'Enjoying natural, harmonious results that reflect your inherent vitality and beauty without appearing altered or artificial.',
    clinicalNote: 'Long-term anatomical harmony that looks and feels genuinely like you.'
  }
];
