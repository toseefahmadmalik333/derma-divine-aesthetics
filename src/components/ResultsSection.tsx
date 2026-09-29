import React, { useState } from 'react';
import { Sparkles, ShieldAlert, ArrowLeftRight, CheckCircle2 } from 'lucide-react';

export const ResultsSection: React.FC = () => {
  // Slider position from 0 to 100%
  const [sliderPosition, setSliderPosition] = useState<number>(50);

  return (
    <section id="results" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-emerald-darkest via-[#092D27] to-emerald-darkest">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-dark/80 border border-champagne/30 text-champagne text-xs uppercase tracking-ultra mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Clinical Evidence</span>
          </div>
          <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-ivory font-normal tracking-wide max-w-3xl leading-tight">
            Real Patients. Verifiable Outcomes.
          </h2>
          <p className="font-sans text-sm sm:text-base text-ivory/70 font-light max-w-2xl mt-4 leading-relaxed">
            Authentic, un-retouched case documentation from our clinical archives. We believe in visual transparency without exaggerated promises or artificial alteration.
          </p>
        </div>

        {/* Featured Interactive Before & After Showcase */}
        <div className="mb-20 rounded-3xl overflow-hidden bg-gradient-to-b from-emerald-dark to-emerald-darkest border border-champagne/30 p-6 sm:p-10 shadow-2xl">
          <div className="flex flex-col items-center text-center mb-8">
            <span className="text-xs uppercase tracking-ultra text-champagne font-semibold mb-2">
              Case Study: Follicular Unit Extraction & Density Restoration
            </span>
            <h3 className="font-editorial text-2xl sm:text-4xl text-ivory font-normal">
              Hairline Reconstruction & Crown Density
            </h3>
            <p className="text-xs text-ivory/60 mt-1 max-w-xl">
              Drag the interactive slider horizontally to examine the before-and-after graft integration and hair thickness.
            </p>
          </div>

          {/* Interactive Split Slider Container */}
          <div className="relative max-w-4xl mx-auto rounded-2xl overflow-hidden border border-champagne/40 bg-black/40 shadow-2xl select-none aspect-video sm:aspect-[16/9]">
            {/* The Before/After image is 512e47bb (hair-restoration-before-after.png), which is an editorial side-by-side presentation */}
            <img
              src="/results/hair-restoration-before-after.png"
              alt="Hair restoration before and after outcome"
              className="w-full h-full object-cover"
            />

            {/* Split Comparison Overlay */}
            <div
              className="absolute top-0 bottom-0 left-0 overflow-hidden border-r-2 border-champagne bg-black/10 backdrop-contrast-[1.05]"
              style={{ width: `${sliderPosition}%` }}
            >
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-emerald-darkest/90 backdrop-blur-md border border-champagne/30 text-[10px] uppercase tracking-ultra text-champagne font-bold">
                Baseline (Pre-Treatment)
              </div>
            </div>

            <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-emerald-darkest/90 backdrop-blur-md border border-champagne/30 text-[10px] uppercase tracking-ultra text-champagne font-bold">
              Restored Density (Post-Treatment)
            </div>

            {/* Center Drag Divider Indicator */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-champagne pointer-events-none -translate-x-1/2 flex items-center justify-center"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="w-9 h-9 rounded-full bg-champagne text-emerald-darkest flex items-center justify-center shadow-lg border-2 border-white">
                <ArrowLeftRight className="w-4 h-4" />
              </div>
            </div>

            {/* Invisible Range Input for dragging */}
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPosition}
              onChange={(e) => setSliderPosition(Number(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
              aria-label="Drag to compare before and after"
            />
          </div>

          {/* Clinical Case Notes */}
          <div className="max-w-4xl mx-auto mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="p-4 rounded-xl bg-emerald-darkest/50 border border-ivory/10">
              <span className="text-[10px] uppercase tracking-wider text-champagne font-semibold block">Procedure</span>
              <span className="text-xs text-ivory/90 font-medium">Sapphire Micro-Punch FUE</span>
            </div>
            <div className="p-4 rounded-xl bg-emerald-darkest/50 border border-ivory/10">
              <span className="text-[10px] uppercase tracking-wider text-champagne font-semibold block">Target Zone</span>
              <span className="text-xs text-ivory/90 font-medium">Frontal Hairline & Mid-Scalp</span>
            </div>
            <div className="p-4 rounded-xl bg-emerald-darkest/50 border border-ivory/10">
              <span className="text-[10px] uppercase tracking-wider text-champagne font-semibold block">Adjunctive Therapy</span>
              <span className="text-xs text-ivory/90 font-medium">PRP Follicular Infusion</span>
            </div>
          </div>
        </div>

        {/* Real Patient Clinical Evolution Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Patient Journey Card */}
          <div className="rounded-3xl bg-gradient-to-b from-emerald-dark/80 to-emerald-darkest border border-ivory/10 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-ultra text-champagne font-semibold mb-2 block">
                Comprehensive Treatment Pathway
              </span>
              <h4 className="font-editorial text-2xl sm:text-3xl text-ivory mb-3 font-normal">
                From Assessment to Natural Styling
              </h4>
              <p className="font-sans text-xs text-ivory/70 font-light leading-relaxed mb-6">
                Step-by-step documentation of graft harvesting, hairline mapping, surgical micro-placement, and post-procedural recovery.
              </p>
              <div className="rounded-2xl overflow-hidden border border-champagne/20 bg-black/20">
                <img
                  src="/results/patient-journey-steps.png"
                  alt="Patient journey through procedural stages"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>

          {/* Radiance & Confidence Card */}
          <div className="rounded-3xl bg-gradient-to-b from-emerald-dark/80 to-emerald-darkest border border-ivory/10 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-ultra text-champagne font-semibold mb-2 block">
                Restoring Biological Vitality
              </span>
              <h4 className="font-editorial text-2xl sm:text-3xl text-ivory mb-3 font-normal">
                Skin Radiance & Structural Harmony
              </h4>
              <p className="font-sans text-xs text-ivory/70 font-light leading-relaxed mb-6">
                Stimulating collagen remodeling and cellular turnover reveals smooth, naturally illuminated skin that retains authentic emotional expression.
              </p>
              <div className="rounded-2xl overflow-hidden border border-champagne/20 bg-black/20">
                <img
                  src="/results/radiance-confidence.png"
                  alt="Natural radiant skin outcome"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Mandatory Medical Disclaimer Banner */}
        <div className="max-w-4xl mx-auto p-5 rounded-2xl bg-emerald-darkest/90 border border-champagne/30 flex items-start sm:items-center gap-4 shadow-lg">
          <ShieldAlert className="w-6 h-6 text-champagne shrink-0" />
          <p className="font-sans text-xs text-ivory/70 leading-relaxed font-light">
            <strong className="text-champagne font-semibold">Important Medical Notice:</strong> Individual results may vary. Before-and-after images are presented for informational purposes and do not guarantee a particular outcome. Candidacy and therapeutic expectations are evaluated during a dedicated clinical consultation.
          </p>
        </div>
      </div>
    </section>
  );
};
