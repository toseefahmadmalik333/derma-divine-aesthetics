import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { Navigation } from './components/Navigation';
import { CinematicCanvasScroller } from './components/CinematicCanvasScroller';
import { TreatmentExplorer } from './components/TreatmentExplorer';
import { TreatmentModal } from './components/TreatmentModal';
import { DoctorSection } from './components/DoctorSection';
import { ResultsSection } from './components/ResultsSection';
import { PatientJourney } from './components/PatientJourney';
import { ClinicSection } from './components/ClinicSection';
import { TypeSafeConsultationTriage } from './components/TypeSafeConsultationTriage';
import { ConsultationBooking } from './components/ConsultationBooking';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { Treatment, TreatmentCategory } from './types';

export const App: React.FC = () => {
  const [selectedTreatment, setSelectedTreatment] = useState<Treatment | null>(null);
  const [prefilledBookingTreatment, setPrefilledBookingTreatment] = useState<string>('');

  // Initialize Lenis smooth scroll
  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const handleOpenBooking = () => {
    const el = document.getElementById('consultation');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenBookingForTreatment = (treatmentName: string) => {
    setPrefilledBookingTreatment(treatmentName);
    handleOpenBooking();
  };

  const handleApplyTriageRecommendation = (category: TreatmentCategory, procedureName: string) => {
    setPrefilledBookingTreatment(procedureName);
    handleOpenBooking();
  };

  return (
    <div className="relative min-h-screen bg-[#092D27] text-[#F8F5ED] selection:bg-[#C6A15B]/30 selection:text-[#FFFFFF]">
      {/* Subtle Luxury Cursor */}
      <CustomCursor />

      {/* Fixed Luxury Navigation */}
      <Navigation onOpenBooking={handleOpenBooking} />

      {/* Master Cinematic Canvas Scroller (Film + 70 Frames Sequence Scrub) */}
      <CinematicCanvasScroller onOpenBooking={handleOpenBooking} />

      {/* Editorial Disciplines & Treatment Explorer */}
      <TreatmentExplorer
        onSelectTreatment={(t) => setSelectedTreatment(t)}
        onOpenBookingForTreatment={handleOpenBookingForTreatment}
      />

      {/* Surgical Leadership & Doctor Section */}
      <DoctorSection onOpenBooking={handleOpenBooking} />

      {/* Verified Clinical Results & Interactive Before/After Slider */}
      <ResultsSection />

      {/* 7-Step Illustrative Patient Journey */}
      <PatientJourney />

      {/* The Medical Sanctuary & Clinic Details */}
      <ClinicSection onOpenBooking={handleOpenBooking} />

      {/* TypeSafe Aesthetic Consultation Triage */}
      <TypeSafeConsultationTriage onApplyRecommendation={handleApplyTriageRecommendation} />

      {/* Consultation Booking & Immediate Intake */}
      <ConsultationBooking initialTreatment={prefilledBookingTreatment} />

      {/* Medical & Aesthetic FAQ Accordion */}
      <FAQSection />

      {/* Full Luxury Footer */}
      <Footer />

      {/* Treatment Detail Modal */}
      <TreatmentModal
        treatment={selectedTreatment}
        onClose={() => setSelectedTreatment(null)}
        onBookTreatment={handleOpenBookingForTreatment}
      />
    </div>
  );
};

export default App;
