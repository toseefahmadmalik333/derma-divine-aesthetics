import React from 'react';
import { clinicInfo } from '../data/clinicInfo';
import { MapPin, Clock, Phone, Sparkles, Navigation as NavIcon, Calendar, CheckCircle2 } from 'lucide-react';

interface ClinicSectionProps {
  onOpenBooking: () => void;
}

export const ClinicSection: React.FC<ClinicSectionProps> = ({ onOpenBooking }) => {
  return (
    <section id="clinic" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-emerald-darkest via-[#092D27] to-emerald-darkest">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-dark/80 border border-champagne/30 text-champagne text-xs uppercase tracking-ultra mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Medical Sanctuary</span>
          </div>
          <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-ivory font-normal tracking-wide max-w-3xl leading-tight">
            Derma Divine Medical & Aesthetic Centre
          </h2>
          <p className="font-sans text-sm sm:text-base text-ivory/70 font-light max-w-2xl mt-4 leading-relaxed">
            Located in Phase 2, Johar Town, Lahore. A sanctuary engineered for absolute patient privacy, sterile clinical rigor, and welcoming warmth.
          </p>
        </div>

        {/* Real Clinic Photography Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Main Reception Photo */}
          <div className="lg:col-span-8 rounded-3xl overflow-hidden border border-champagne/40 bg-black/30 shadow-2xl relative group">
            <img
              src="/clinic/clinic-reception.png"
              alt="Derma Divine Medical and Aesthetic Centre reception in Johar Town Lahore"
              loading="lazy"
              decoding="async"
              className="w-full h-full min-h-[380px] lg:min-h-[500px] object-cover group-hover:scale-102 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-darkest/90 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-emerald-darkest/85 backdrop-blur-md border border-champagne/20">
              <span className="text-[10px] uppercase tracking-ultra text-champagne font-semibold block mb-1">
                Sanctuary Reception & Patient Lounge
              </span>
              <p className="font-editorial text-xl sm:text-2xl text-ivory font-light">
                Deep emerald marble, acoustic discretion, and individualized consultation rooms.
              </p>
            </div>
          </div>

          {/* Exterior / Consultation Entrance */}
          <div className="lg:col-span-4 rounded-3xl overflow-hidden border border-champagne/30 bg-black/30 shadow-xl relative group flex flex-col justify-between">
            <div className="h-64 sm:h-72 overflow-hidden">
              <img
                src="/clinic/clinic-exterior-consultation.png"
                alt="Clinic entrance and welcome area"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="p-6 bg-emerald-dark/90 flex flex-col justify-between flex-1">
              <div>
                <span className="text-[10px] uppercase tracking-ultra text-champagne font-semibold block mb-2">
                  Clinical Standards
                </span>
                <h4 className="font-editorial text-2xl text-ivory mb-2">Discreet & Accessible</h4>
                <p className="font-sans text-xs text-ivory/70 font-light leading-relaxed mb-4">
                  Complimentary valet parking and private intake suites designed to maintain complete confidentiality.
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-ivory/10 text-xs text-ivory/80">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-champagne" />
                  <span>Surgical Grade Sterilization</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-champagne" />
                  <span>US FDA-Approved Energy Devices</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Location, Hours & Direct Contact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Address Card */}
          <div className="rounded-3xl bg-emerald-dark/70 border border-ivory/10 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-champagne/15 border border-champagne/30 flex items-center justify-center text-champagne mb-4">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="font-editorial text-2xl text-ivory mb-2">Clinic Address</h3>
              <p className="font-sans text-sm text-ivory/80 leading-relaxed font-light mb-4">
                {clinicInfo.address},<br />
                {clinicInfo.city}
              </p>
            </div>
            <a
              href="https://maps.google.com/?q=House+No.+1167+Block+Q+Phase+2+Johar+Town+Lahore"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-champagne hover:text-white transition-colors"
            >
              <NavIcon className="w-3.5 h-3.5" />
              <span>Get Driving Directions</span>
            </a>
          </div>

          {/* Hours Card */}
          <div className="rounded-3xl bg-emerald-dark/70 border border-ivory/10 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-champagne/15 border border-champagne/30 flex items-center justify-center text-champagne mb-4">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-editorial text-2xl text-ivory mb-3">Operating Hours</h3>
              <div className="space-y-2 font-sans text-xs">
                {clinicInfo.hours.map((h, i) => (
                  <div key={i} className="flex justify-between items-center border-b border-ivory/5 pb-1.5">
                    <span className="text-ivory/70">{h.days}</span>
                    <span className="text-champagne font-mono font-medium">{h.hours}</span>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-[10px] text-ivory/40 uppercase tracking-widest mt-4">
              Sunday Consultations: 11 AM – 10 PM
            </p>
          </div>

          {/* Contact & Portals */}
          <div className="rounded-3xl bg-emerald-dark/70 border border-ivory/10 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-champagne/15 border border-champagne/30 flex items-center justify-center text-champagne mb-4">
                <Phone className="w-5 h-5" />
              </div>
              <h3 className="font-editorial text-2xl text-ivory mb-2">Direct Booking Lines</h3>
              <p className="font-sans text-xs text-ivory/70 mb-4 font-light">
                Call front desk directly or schedule through registered healthcare portals:
              </p>
              <div className="space-y-2 text-xs font-sans">
                <a
                  href={`tel:${clinicInfo.phoneRaw}`}
                  className="flex justify-between items-center p-2 rounded-xl bg-black/20 hover:bg-black/40 border border-ivory/10 transition-colors"
                >
                  <span className="text-ivory/80 font-medium">Front Desk Mobile:</span>
                  <span className="text-champagne font-mono font-semibold">{clinicInfo.phone}</span>
                </a>
                <a
                  href={`tel:${clinicInfo.oladoc}`}
                  className="flex justify-between items-center p-2 rounded-xl bg-black/20 hover:bg-black/40 border border-ivory/10 transition-colors"
                >
                  <span className="text-ivory/80">Oladoc Booking:</span>
                  <span className="text-ivory font-mono">{clinicInfo.oladoc}</span>
                </a>
                <a
                  href={`tel:${clinicInfo.marham}`}
                  className="flex justify-between items-center p-2 rounded-xl bg-black/20 hover:bg-black/40 border border-ivory/10 transition-colors"
                >
                  <span className="text-ivory/80">Marham Booking:</span>
                  <span className="text-ivory font-mono">{clinicInfo.marham}</span>
                </a>
              </div>
            </div>

            <button
              onClick={onOpenBooking}
              className="mt-4 w-full py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold text-emerald-darkest bg-gradient-to-r from-champagne-light via-champagne to-champagne-dark hover:from-white hover:to-champagne flex items-center justify-center gap-2 shadow-md transition-all"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Schedule In-Person Visit</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
