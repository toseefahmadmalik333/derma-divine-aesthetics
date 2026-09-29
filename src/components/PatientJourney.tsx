import React from 'react';
import { patientJourneySteps } from '../data/patientJourney';
import { Sparkles, Compass, ShieldCheck } from 'lucide-react';

export const PatientJourney: React.FC = () => {
  return (
    <section id="journey" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-emerald-darkest overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-dark/80 border border-champagne/30 text-champagne text-xs uppercase tracking-ultra mb-4 shadow-sm">
            <Compass className="w-3.5 h-3.5" />
            <span>The Pathway</span>
          </div>
          <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-ivory font-normal tracking-wide max-w-3xl leading-tight">
            An Unhurried, Ethical Patient Journey
          </h2>
          <p className="font-sans text-sm sm:text-base text-ivory/70 font-light max-w-2xl mt-4 leading-relaxed">
            From the initial conversation to long-term post-procedural harmony, every step is deliberate, medically transparent, and focused on your comfort.
          </p>
        </div>

        {/* 7-Step Horizontal / Grid Progression */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {patientJourneySteps.map((step, idx) => (
            <div
              key={step.number}
              className={`relative rounded-3xl p-6 sm:p-7 flex flex-col justify-between border transition-all duration-300 hover:border-champagne/50 hover:-translate-y-1 ${
                idx === 6
                  ? 'md:col-span-2 lg:col-span-3 xl:col-span-2 bg-gradient-to-r from-emerald-dark via-emerald to-emerald-darkest border-champagne/40 shadow-xl'
                  : 'bg-emerald-dark/70 border-ivory/10'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-champagne font-bold px-2.5 py-1 rounded-full bg-champagne/10 border border-champagne/20">
                    {step.step}
                  </span>
                  <span className="font-editorial text-2xl text-ivory/30 font-bold">
                    {step.number}
                  </span>
                </div>

                <h3 className="font-editorial text-2xl text-ivory font-medium mb-3">
                  {step.title}
                </h3>
                <p className="font-sans text-xs text-ivory/70 font-light leading-relaxed mb-5">
                  {step.description}
                </p>
              </div>

              <div className="pt-3 border-t border-ivory/10 flex items-center gap-2 text-[10px] text-champagne-light/80">
                <ShieldCheck className="w-3.5 h-3.5 text-champagne shrink-0" />
                <span className="italic">{step.clinicalNote}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-xs text-ivory/40 font-light italic">
            *This outline represents our standard clinical roadmap. Each patient's actual protocol is personalized following an individualized assessment.
          </p>
        </div>
      </div>
    </section>
  );
};
