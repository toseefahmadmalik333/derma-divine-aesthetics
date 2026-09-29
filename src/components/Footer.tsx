import React from 'react';
import { clinicInfo } from '../data/clinicInfo';
import { ShieldCheck, Phone, MapPin, Clock, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#051915] text-ivory border-t border-champagne/20 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-16 border-b border-ivory/10">
          {/* Brand Column */}
          <div className="lg:col-span-4 flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full border border-champagne flex items-center justify-center bg-emerald-dark">
                <span className="font-editorial text-2xl font-bold text-champagne tracking-wider">DD</span>
              </div>
              <div className="flex flex-col">
                <span className="font-editorial text-xl tracking-widest text-[#F8F5ED] font-semibold leading-tight">
                  DERMA DIVINE
                </span>
                <span className="text-[10px] uppercase tracking-ultra text-champagne font-medium">
                  Aesthetics By DMAC
                </span>
              </div>
            </div>

            <p className="font-sans text-xs text-ivory/70 font-light leading-relaxed max-w-sm mb-6">
              Derma Divine Medical & Aesthetic Centre. A multidisciplinary clinical sanctuary where dermatology, plastic surgery, advanced hair restoration, and metabolic wellness unite.
            </p>

            <span className="text-[11px] text-champagne/80 font-mono tracking-wider">
              Dermatology • Aesthetic Medicine • Plastic Surgery • Wellness
            </span>
          </div>

          {/* Quick Navigation */}
          <div className="lg:col-span-2 flex flex-col">
            <h4 className="text-xs uppercase tracking-ultra text-champagne mb-4 font-semibold">
              Navigation
            </h4>
            <div className="flex flex-col gap-2.5 text-xs text-ivory/80 font-light">
              <a href="#story" className="hover:text-champagne transition-colors">Cinematic Film</a>
              <a href="#treatments" className="hover:text-champagne transition-colors">Treatments</a>
              <a href="#doctors" className="hover:text-champagne transition-colors">Medical Specialists</a>
              <a href="#results" className="hover:text-champagne transition-colors">Clinical Results</a>
              <a href="#clinic" className="hover:text-champagne transition-colors">The Clinic Sanctuary</a>
              <a href="#journey" className="hover:text-champagne transition-colors">Patient Pathway</a>
              <a href="#faq" className="hover:text-champagne transition-colors">FAQ</a>
            </div>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3 flex flex-col">
            <h4 className="text-xs uppercase tracking-ultra text-champagne mb-4 font-semibold">
              Johar Town Clinic
            </h4>
            <div className="space-y-3 text-xs text-ivory/80 font-light">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-champagne shrink-0 mt-0.5" />
                <span>
                  {clinicInfo.address},<br />
                  {clinicInfo.city}
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-champagne shrink-0" />
                <a href={`tel:${clinicInfo.phoneRaw}`} className="hover:text-champagne font-mono">
                  {clinicInfo.phone}
                </a>
              </div>

              <div className="pt-2 text-[11px] text-ivory/60 space-y-1">
                <div>Oladoc Direct: <span className="text-ivory font-mono">{clinicInfo.oladoc}</span></div>
                <div>Marham Direct: <span className="text-ivory font-mono">{clinicInfo.marham}</span></div>
              </div>
            </div>
          </div>

          {/* Opening Hours */}
          <div className="lg:col-span-3 flex flex-col justify-between">
            <div>
              <h4 className="text-xs uppercase tracking-ultra text-champagne mb-4 font-semibold">
                Clinical Schedule
              </h4>
              <div className="space-y-1.5 text-xs font-mono text-ivory/70">
                <div className="flex justify-between">
                  <span>Mon – Thu:</span>
                  <span className="text-champagne">1 PM – 10 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Friday:</span>
                  <span className="text-champagne">2 PM – 10 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday:</span>
                  <span className="text-champagne">1 PM – 10 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday:</span>
                  <span className="text-champagne">11 AM – 10 PM</span>
                </div>
              </div>
            </div>

            <button
              onClick={scrollToTop}
              className="mt-6 self-start inline-flex items-center gap-2 text-xs uppercase tracking-wider text-ivory/60 hover:text-champagne transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Responsible Medical Disclaimer */}
        <div className="py-8 border-b border-ivory/5 text-xs text-ivory/40 leading-relaxed font-light">
          <p>
            <strong className="text-ivory/60">Medical Disclaimer:</strong> The clinical information provided on this website is for educational and informational purposes only and does not substitute for individualized medical consultation, diagnosis, or surgical evaluation. All surgical and non-surgical procedures carry specific indications, considerations, and potential variations in outcome. Suitability is evaluated in person at Derma Divine Medical & Aesthetic Centre in Lahore.
          </p>
        </div>

        {/* Copyright & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ivory/50 font-light">
          <p>
            © {new Date().getFullYear()} Derma Divine Aesthetics by DMAC. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span>Discreet Healthcare</span>
            <span>Ethical Aesthetics</span>
            <span>Verified Credentials</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
