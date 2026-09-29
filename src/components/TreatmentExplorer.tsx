import React, { useState } from 'react';
import { TreatmentCategory, Treatment } from '../types';
import { treatmentsData } from '../data/treatments';
import { Sparkles, ArrowRight, CheckCircle2, Eye, ShieldAlert } from 'lucide-react';

interface TreatmentExplorerProps {
  onSelectTreatment: (treatment: Treatment) => void;
  onOpenBookingForTreatment: (treatmentName: string) => void;
}

export const TreatmentExplorer: React.FC<TreatmentExplorerProps> = ({
  onSelectTreatment,
  onOpenBookingForTreatment,
}) => {
  const [activeCategory, setActiveCategory] = useState<TreatmentCategory>('hair');

  const categories: { key: TreatmentCategory; label: string; count: number; tag: string }[] = [
    { key: 'hair', label: 'Hair Restoration', count: 3, tag: 'Follicular Surgery & PRP' },
    { key: 'skin', label: 'Dermatology & Skin', count: 5, tag: 'HydraFacial, Lasers & Peels' },
    { key: 'aesthetics', label: 'Facial Aesthetics', count: 3, tag: 'Botox, Fillers & Threads' },
    { key: 'surgery', label: 'Plastic Surgery', count: 1, tag: 'Surgical Consultations' },
    { key: 'wellness', label: 'Metabolic & Wellness', count: 1, tag: 'Nutrition & PCOS Care' },
  ];

  const currentTreatments = treatmentsData.filter((t) => t.category === activeCategory);

  return (
    <section id="treatments" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-emerald-darkest via-emerald-dark to-emerald-darkest">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-dark/80 border border-champagne/30 text-champagne text-xs uppercase tracking-ultra mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Clinical Disciplines</span>
          </div>
          <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-ivory font-normal tracking-wide max-w-3xl leading-tight">
            Curated Protocols for Hair, Skin & Anatomical Harmony
          </h2>
          <p className="font-sans text-sm sm:text-base text-ivory/70 font-light max-w-2xl mt-4 leading-relaxed">
            Every clinical intervention at Derma Divine is designed to respect individual biological parameters. No standardized treatments—only calibrated medical excellence.
          </p>
        </div>

        {/* Category Navigation Bar */}
        <div className="flex items-center justify-start lg:justify-center overflow-x-auto pb-4 mb-12 gap-3 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`flex flex-col items-start px-6 py-3.5 rounded-2xl border transition-all duration-300 shrink-0 text-left ${
                activeCategory === cat.key
                  ? 'bg-gradient-to-r from-emerald to-emerald-light border-champagne text-white shadow-xl shadow-champagne/10 scale-[1.02]'
                  : 'bg-emerald-darkest/60 border-ivory/10 text-ivory/70 hover:text-ivory hover:border-champagne/40'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="font-editorial text-lg tracking-wide font-medium">
                  {cat.label}
                </span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-semibold ${
                  activeCategory === cat.key ? 'bg-champagne text-emerald-darkest' : 'bg-white/10 text-ivory/60'
                }`}>
                  {cat.count}
                </span>
              </div>
              <span className="text-[10px] tracking-wider uppercase text-champagne/80 font-sans mt-0.5">
                {cat.tag}
              </span>
            </button>
          ))}
        </div>

        {/* Sapphire Blade Micro-Punch Spotlight (When 'hair' is selected) */}
        {activeCategory === 'hair' && (
          <div className="mb-14 rounded-3xl overflow-hidden bg-gradient-to-r from-emerald-dark via-emerald to-emerald-darkest border border-champagne/30 p-6 sm:p-10 shadow-2xl flex flex-col lg:flex-row items-center gap-8">
            <div className="w-full lg:w-1/2 rounded-2xl overflow-hidden border border-champagne/20 bg-black/40">
              <img
                src="/results/micro-punch-sapphire.png"
                alt="Sapphire Blade Hair Micro-Punch Tool"
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="w-full lg:w-1/2 flex flex-col">
              <div className="flex items-center gap-2 mb-2 text-champagne text-xs uppercase tracking-ultra font-semibold">
                <span>Technological Innovation</span>
              </div>
              <h3 className="font-editorial text-3xl sm:text-4xl text-ivory font-normal leading-tight mb-4">
                Single-Crystal Sapphire Micro-Punch FUE
              </h3>
              <p className="font-sans text-sm text-ivory/80 leading-relaxed font-light mb-6">
                Unlike standard steel blades that cause tissue micro-tearing and crusting, our surgical team uses V-shaped single-crystal sapphire blades. This allows ultra-precise microscopic incisions, reduced trauma, accelerated scalp healing, and superior graft angle density.
              </p>
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="p-3 rounded-xl bg-emerald-darkest/60 border border-champagne/20">
                  <span className="text-[10px] uppercase tracking-wider text-champagne font-semibold block">V-Cut Sapphire Blade</span>
                  <span className="text-xs text-ivory/70">Minimizes tissue trauma</span>
                </div>
                <div className="p-3 rounded-xl bg-emerald-darkest/60 border border-champagne/20">
                  <span className="text-[10px] uppercase tracking-wider text-champagne font-semibold block">Titanium Micro-Handle</span>
                  <span className="text-xs text-ivory/70">Knurled surgical grip</span>
                </div>
              </div>
              <button
                onClick={() => onOpenBookingForTreatment('Sapphire Micro-Punch FUE Hair Transplant')}
                className="self-start inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold text-emerald-darkest bg-gradient-to-r from-champagne-light via-champagne to-champagne-dark hover:from-white hover:to-champagne transition-all shadow-md"
              >
                <span>Book Hair Transplant Consultation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Editorial Treatment Showcase Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentTreatments.map((treatment) => (
            <div
              key={treatment.id}
              className="group relative flex flex-col justify-between rounded-3xl bg-gradient-to-b from-emerald-dark/90 to-emerald-darkest/95 border border-ivory/10 hover:border-champagne/50 p-6 sm:p-8 transition-all duration-500 hover:shadow-2xl hover:shadow-champagne/10 hover:-translate-y-1"
            >
              <div>
                {/* Top Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] uppercase tracking-ultra text-champagne font-semibold px-2.5 py-0.5 rounded-full bg-champagne/10 border border-champagne/20">
                    {treatment.category}
                  </span>
                  {treatment.isPopular && (
                    <span className="text-[10px] uppercase tracking-wider text-sage font-medium">
                      Verified Protocol
                    </span>
                  )}
                </div>

                {/* Treatment Image Preview if Available */}
                {treatment.featuredImage && (
                  <div className="w-full h-44 rounded-2xl overflow-hidden mb-5 border border-champagne/15 bg-black/20">
                    <img
                      src={treatment.featuredImage}
                      alt={treatment.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                )}

                {/* Headline & Tagline */}
                <h3 className="font-editorial text-2xl text-ivory group-hover:text-champagne-light transition-colors mb-2 font-medium leading-snug">
                  {treatment.name}
                </h3>
                <p className="font-sans text-xs text-champagne/80 font-light mb-4">
                  {treatment.tagline}
                </p>

                {/* Short Description */}
                <p className="font-sans text-xs text-ivory/70 font-light leading-relaxed line-clamp-3 mb-5">
                  {treatment.description}
                </p>

                {/* Key Indications */}
                <div className="space-y-1.5 mb-6">
                  {treatment.indications.slice(0, 2).map((ind, i) => (
                    <div key={i} className="flex items-center gap-2 text-[11px] text-ivory/80">
                      <CheckCircle2 className="w-3 h-3 text-champagne shrink-0" />
                      <span className="truncate">{ind}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-4 border-t border-ivory/10">
                <button
                  onClick={() => onSelectTreatment(treatment)}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-2 px-3 rounded-full text-xs uppercase tracking-wider font-semibold text-ivory bg-white/5 hover:bg-white/10 border border-ivory/20 hover:border-champagne/50 transition-all"
                >
                  <Eye className="w-3.5 h-3.5 text-champagne" />
                  <span>Protocol Details</span>
                </button>

                <button
                  onClick={() => onOpenBookingForTreatment(treatment.name)}
                  className="p-2 rounded-full bg-champagne text-emerald-darkest hover:bg-white transition-colors"
                  title="Book consultation for this treatment"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Ethical Medical Disclaimer */}
        <div className="mt-12 p-4 rounded-2xl bg-emerald-darkest/60 border border-ivory/5 flex items-center justify-center gap-3 text-center">
          <ShieldAlert className="w-4 h-4 text-champagne/70 shrink-0" />
          <p className="text-xs text-ivory/50 font-light">
            Medical notice: Treatment candidacy, expected outcomes, and recovery protocols are verified during in-person physician consultation.
          </p>
        </div>
      </div>
    </section>
  );
};
