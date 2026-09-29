import React, { useState } from 'react';
import { faqsData } from '../data/faqs';
import { HelpCircle, ChevronDown, Sparkles } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(faqsData[0].id);

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-emerald-darkest">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-dark/80 border border-champagne/30 text-champagne text-xs uppercase tracking-ultra mb-4 shadow-sm">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Clinical Clarity</span>
          </div>
          <h2 className="font-editorial text-4xl sm:text-5xl text-ivory font-normal tracking-wide max-w-2xl leading-tight">
            Frequently Addressed Questions
          </h2>
          <p className="font-sans text-sm text-ivory/70 font-light max-w-xl mt-3 leading-relaxed">
            Transparent insights regarding clinical appointments, surgical consultations, procedure expectations, and individualized candidacy.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-3">
          {faqsData.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="rounded-2xl border border-ivory/10 bg-emerald-dark/60 overflow-hidden transition-all duration-300 hover:border-champagne/40"
              >
                <button
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-editorial text-xl sm:text-2xl text-ivory font-medium">
                    {faq.question}
                  </span>
                  <div className={`p-1.5 rounded-full bg-white/5 text-champagne transition-transform duration-300 shrink-0 ${
                    isOpen ? 'rotate-180 bg-champagne/20' : ''
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 sm:pb-6 pt-1 text-xs sm:text-sm text-ivory/80 font-sans font-light leading-relaxed border-t border-ivory/5 animate-fadeIn">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
