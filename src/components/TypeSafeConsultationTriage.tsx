import React, { useState } from 'react';
import { triageQuestions, computeTypeSafeTriage } from '../lib/typesafeAssessment';
import { TreatmentCategory, TriageAssessmentResult } from '../types';
import { Sparkles, BrainCircuit, CheckCircle2, ArrowRight, RotateCcw, ShieldCheck } from 'lucide-react';

interface TypeSafeConsultationTriageProps {
  onApplyRecommendation: (category: TreatmentCategory, procedure: string) => void;
}

export const TypeSafeConsultationTriage: React.FC<TypeSafeConsultationTriageProps> = ({
  onApplyRecommendation,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, TreatmentCategory>>({});
  const [result, setResult] = useState<TriageAssessmentResult | null>(null);

  const handleSelectOption = (questionId: string, category: TreatmentCategory) => {
    const updated = { ...selectedAnswers, [questionId]: category };
    setSelectedAnswers(updated);

    if (currentStep < triageQuestions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Completed triage questions -> compute TypeSafe result
      const computed = computeTypeSafeTriage(updated);
      setResult(computed);
    }
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setCurrentStep(0);
    setResult(null);
  };

  const currentQuestion = triageQuestions[currentStep];

  return (
    <section id="triage" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-emerald-darkest">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-dark/80 border border-champagne/30 text-champagne text-xs uppercase tracking-ultra mb-4 shadow-sm">
            <BrainCircuit className="w-3.5 h-3.5" />
            <span>TypeSafe Aesthetic Triage</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-5xl text-ivory font-normal tracking-wide">
            Calibrate Your Clinical Recommendation
          </h2>
          <p className="font-sans text-xs sm:text-sm text-ivory/70 font-light max-w-xl mx-auto mt-3 leading-relaxed">
            Answer three structured diagnostic indicators to determine which clinical division and preparation protocol aligns best with your physiological baseline.
          </p>
        </div>

        {/* Interactive Triage Card */}
        <div className="rounded-3xl bg-gradient-to-b from-emerald-dark/90 to-emerald-darkest border border-champagne/30 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          {!result ? (
            <div>
              {/* Step indicator */}
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-ivory/10">
                <span className="text-xs uppercase tracking-widest text-champagne font-semibold font-mono">
                  Indicator {currentStep + 1} of {triageQuestions.length}
                </span>
                <div className="flex gap-2">
                  {triageQuestions.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i === currentStep
                          ? 'w-8 bg-champagne'
                          : i < currentStep
                          ? 'w-4 bg-champagne/40'
                          : 'w-4 bg-white/10'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Question */}
              <h3 className="font-editorial text-2xl sm:text-3xl text-ivory mb-2 font-normal">
                {currentQuestion.prompt}
              </h3>
              <p className="font-sans text-xs sm:text-sm text-ivory/60 font-light mb-6">
                {currentQuestion.subtitle}
              </p>

              {/* Options */}
              <div className="space-y-3">
                {currentQuestion.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(currentQuestion.id, opt.category)}
                    className="w-full text-left p-4 rounded-2xl bg-black/20 hover:bg-emerald-light/40 border border-ivory/10 hover:border-champagne/50 transition-all duration-200 flex items-center justify-between group"
                  >
                    <span className="font-sans text-xs sm:text-sm text-ivory/90 group-hover:text-white font-light">
                      {opt.label}
                    </span>
                    <ArrowRight className="w-4 h-4 text-champagne/40 group-hover:text-champagne shrink-0 ml-4 transition-transform group-hover:translate-x-1" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Result Panel */
            <div className="animate-fadeIn">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-champagne/20">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-champagne" />
                  <span className="text-xs uppercase tracking-ultra text-champagne font-semibold">
                    Calibrated Clinical Profile
                  </span>
                </div>
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1.5 text-xs text-ivory/60 hover:text-champagne transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Recalibrate</span>
                </button>
              </div>

              <span className="text-[10px] uppercase tracking-wider text-sage font-mono block mb-1">
                Primary Specialty
              </span>
              <h3 className="font-editorial text-3xl sm:text-4xl text-ivory font-normal mb-4">
                {result.categoryTitle}
              </h3>

              {/* Clinical Rationale */}
              <div className="p-4 rounded-2xl bg-black/20 border border-ivory/10 mb-6">
                <span className="text-[10px] uppercase tracking-wider text-champagne font-semibold block mb-1">
                  Physiological Rationale
                </span>
                <p className="font-sans text-xs sm:text-sm text-ivory/80 font-light leading-relaxed">
                  {result.clinicalRationale}
                </p>
              </div>

              {/* Recommended Protocols */}
              <div className="mb-6">
                <span className="text-xs uppercase tracking-widest text-champagne font-semibold block mb-3">
                  Recommended Clinical Protocols
                </span>
                <div className="space-y-2">
                  {result.recommendedProcedures.map((proc, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-3 rounded-xl bg-emerald-darkest/60 border border-champagne/20 text-xs text-ivory"
                    >
                      <CheckCircle2 className="w-4 h-4 text-champagne shrink-0" />
                      <span>{proc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Preparation Advice */}
              <div className="p-4 rounded-2xl bg-emerald-darkest/40 border border-ivory/10 mb-8 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-champagne shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-champagne font-semibold block mb-0.5">
                    Pre-Consultation Clinical Advice
                  </span>
                  <p className="font-sans text-xs text-ivory/70 font-light leading-relaxed">
                    {result.preparationAdvice}
                  </p>
                </div>
              </div>

              {/* Apply Action */}
              <button
                onClick={() =>
                  onApplyRecommendation(
                    result.primaryCategory,
                    result.recommendedProcedures[0]
                  )
                }
                className="w-full py-3.5 px-6 rounded-full text-xs uppercase tracking-wider font-semibold text-emerald-darkest bg-gradient-to-r from-champagne-light via-champagne to-champagne-dark hover:from-white hover:to-champagne flex items-center justify-center gap-2 shadow-xl transition-all"
              >
                <span>Proceed with {result.recommendedProcedures[0]}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
