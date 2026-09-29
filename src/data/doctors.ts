import { Doctor } from '../types';

export const doctorsData: Doctor[] = [
  {
    id: 'dr-hamza-malik',
    name: 'Dr. Hamza Malik',
    role: 'Plastic & Aesthetic Surgeon',
    title: 'Lead Plastic & Aesthetic Surgeon',
    biography: 'Specializing in surgical precision, reconstructive aesthetics, and advanced hair restoration. Dr. Hamza Malik leads the surgical and aesthetic department at Derma Divine Aesthetics by DMAC with a philosophy rooted in anatomical harmony and patient safety.',
    verifiedSpecialties: [
      'Plastic & Aesthetic Surgery',
      'Advanced FUE Hair Restoration',
      'Facial Contouring & Aesthetics',
      'Surgical Consultation & Planning'
    ],
    image: '/doctors/dr-hamza-malik.jpg',
    cinematicImage: '/doctors/dr-hamza-malik-cinematic.png',
    consultationDays: 'Monday – Saturday (By Appointment)',
  },
  {
    id: 'dr-anam-afzal',
    name: 'Dr. Anam Afzal',
    role: 'Plastic & Aesthetic Surgeon',
    title: 'Plastic & Aesthetic Surgeon',
    biography: 'Dedicated to nuanced aesthetic refinement, non-surgical facial rejuvenation, and specialized plastic surgery procedures tailored to individual patient contours.',
    verifiedSpecialties: [
      'Plastic & Aesthetic Surgery',
      'Facial Aesthetics & Rejuvenation',
      'Non-Surgical Anti-Aging Therapies',
      'Surgical Consultation'
    ],
    image: '/results/macro-portrait-emerald.png', // verified aesthetic visual
    consultationDays: 'Consultation by Appointment',
  },
  {
    id: 'sunzal-kamran',
    name: 'Ms. Sunzal Kamran',
    role: 'Consultant Nutritionist & Dietitian',
    title: 'Consultant Nutritionist & Dietitian',
    biography: 'Overseeing clinical nutrition, metabolic health, and weight management. Working closely with dermatological and surgical patients to optimize internal biological health and post-procedure recovery.',
    verifiedSpecialties: [
      'Clinical Nutrition & Dietetics',
      'PCOS & Metabolic Weight Management',
      'Nutritional Hair & Skin Support',
      'Personalized Dietary Planning'
    ],
    image: '/results/radiance-confidence.png', // verified wellness visual
    consultationDays: 'Consultation by Appointment',
  }
];
