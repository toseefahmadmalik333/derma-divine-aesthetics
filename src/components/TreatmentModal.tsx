import React from 'react';
import { Treatment } from '../types';
import { X, CheckCircle, Sparkles, Calendar, ShieldCheck, ArrowRight } from 'lucide-react';

interface TreatmentModalProps {
  treatment: Treatment | null;
  onClose: () => void;
  onBookTreatment: (treatmentName: string) => void;
}

export const TreatmentModal: React.FC<TreatmentModalProps> = ({
  treatment,
  onClose,
  onBookTreatment,
}) => {
  if (!treatment) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-emerald-darkest/80 backdrop-blur-xl animate-fadeIn">
      {/* Modal Card */}
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-to-b from-[#123F35] to-[#092D27] rounded-3xl border border-champagne/30 shadow-2xl p-6 sm:p-8 text-ivory">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-ivory/80 hover:text-champagne transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Category & Badge */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[10px] uppercase tracking-ultra px-3 py-1 rounded-full bg-champagne/15 text-champagne border border-champagne/30 font-semibold">
            {treatment.category.toUpperCase()}
          </span>
          {treatment.isPopular && (
            <span className="text-[10px] uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-emerald-accent/40 text-sage border border-sage/30">
              Signature Protocol
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="font-editorial text-2xl sm:text-3xl font-normal text-ivory mb-2">
          {treatment.name}
        </h3>
        <p className="font-sans text-sm text-champagne-light/90 font-light mb-6">
          {treatment.tagline}
        </p>

        {/* Image if available */}
        {treatment.featuredImage && (
          <div className="w-full h-48 sm:h-56 rounded-2xl overflow-hidden mb-6 border border-champagne/20 bg-emerald-darkest/50">
            <img
              src={treatment.featuredImage}
              alt={treatment.name}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Description */}
        <div className="space-y-4 mb-6">
          <div>
            <h4 className="text-xs uppercase tracking-widest text-champagne mb-1 font-semibold">
              Clinical Overview
            </h4>
            <p className="text-xs sm:text-sm text-ivory/80 font-light leading-relaxed">
              {treatment.description}
            </p>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-champagne mb-1 font-semibold">
              Scientific Mechanism
            </h4>
            <p className="text-xs sm:text-sm text-ivory/80 font-light leading-relaxed">
              {treatment.scientificApproach}
            </p>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-champagne mb-2 font-semibold">
              Clinical Indications
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {treatment.indications.map((ind, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-ivory/85">
                  <CheckCircle className="w-3.5 h-3.5 text-champagne shrink-0 mt-0.5" />
                  <span>{ind}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-emerald-darkest/50 border border-ivory/10">
            <h4 className="text-[11px] uppercase tracking-wider text-champagne mb-1 font-semibold">
              Patient Candidacy & Suitability
            </h4>
            <p className="text-xs text-ivory/70 font-light">
              {treatment.suitableFor}
            </p>
          </div>
        </div>

        {/* Medical disclaimer */}
        <div className="flex items-start gap-2 p-3 rounded-lg bg-emerald-darkest/40 border border-ivory/5 text-[11px] text-ivory/50 mb-6">
          <ShieldCheck className="w-4 h-4 text-champagne/60 shrink-0 mt-0.5" />
          <p>
            Suitability must be evaluated in person by our clinicians. Individual results vary based on biological response and physiological baseline. No medical guarantees are implied.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={() => {
              onBookTreatment(treatment.name);
              onClose();
            }}
            className="w-full sm:flex-1 py-3 px-5 rounded-full text-xs uppercase tracking-wider font-semibold text-emerald-darkest bg-gradient-to-r from-champagne-light via-champagne to-champagne-dark hover:from-white hover:to-champagne flex items-center justify-center gap-2 shadow-lg transition-all"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Consultation For This Protocol</span>
          </button>

          <button
            onClick={onClose}
            className="w-full sm:w-auto py-3 px-6 rounded-full text-xs uppercase tracking-wider font-medium text-ivory/80 hover:text-ivory bg-white/5 hover:bg-white/10 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
