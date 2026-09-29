import React from 'react';
import { doctorsData } from '../data/doctors';
import { Sparkles, Calendar, ShieldCheck, Award, Stethoscope } from 'lucide-react';

interface DoctorSectionProps {
  onOpenBooking: () => void;
}

export const DoctorSection: React.FC<DoctorSectionProps> = ({ onOpenBooking }) => {
  const leadDoctor = doctorsData[0]; // Dr. Hamza Malik
  const otherDoctors = doctorsData.slice(1);

  return (
    <section id="doctors" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-emerald-darkest overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/4 -right-40 w-96 h-96 bg-champagne/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-40 w-96 h-96 bg-emerald/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-dark/80 border border-champagne/30 text-champagne text-xs uppercase tracking-ultra mb-4 shadow-sm">
            <Stethoscope className="w-3.5 h-3.5" />
            <span>Surgical & Clinical Leadership</span>
          </div>
          <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-ivory font-normal tracking-wide max-w-3xl leading-tight">
            The Medical Expertise Behind Every Decision
          </h2>
          <p className="font-sans text-sm sm:text-base text-ivory/70 font-light max-w-2xl mt-4 leading-relaxed">
            Our practice is led by board-qualified surgeons and clinical specialists. We uphold the strictest standards of anatomical precision, sterile safety, and ethical medicine.
          </p>
        </div>

        {/* Lead Doctor Feature: Dr. Hamza Malik */}
        <div className="mb-20 rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-dark/90 via-emerald/80 to-emerald-darkest border border-champagne/30 shadow-2xl p-6 sm:p-12 lg:p-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Dr. Hamza Malik Actual Portrait */}
            <div className="lg:col-span-5 relative group">
              <div className="relative rounded-2xl overflow-hidden border border-champagne/40 bg-black/30 shadow-2xl aspect-[4/5]">
                <img
                  src={leadDoctor.image}
                  alt={leadDoctor.name}
                  className="w-full h-full object-cover object-top filter contrast-[1.02] group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-darkest/90 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-emerald-darkest/80 backdrop-blur-md border border-champagne/20 text-center">
                  <span className="text-[11px] uppercase tracking-ultra text-champagne font-semibold block">
                    Verified Practitioner
                  </span>
                  <span className="text-xs text-ivory/80">Plastic & Aesthetic Surgery Lead</span>
                </div>
              </div>
            </div>

            {/* Dr. Hamza Malik Bio & Verified Qualifications */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 mb-2 text-champagne text-xs uppercase tracking-ultra font-semibold">
                <span>{leadDoctor.title}</span>
              </div>
              <h3 className="font-editorial text-3xl sm:text-5xl text-ivory font-normal leading-tight mb-4">
                {leadDoctor.name}
              </h3>
              <p className="font-sans text-sm sm:text-base text-ivory/80 font-light leading-relaxed mb-6">
                {leadDoctor.biography}
              </p>

              {/* Verified Specialties Grid */}
              <div className="mb-8">
                <h4 className="text-xs uppercase tracking-widest text-champagne mb-3 font-semibold">
                  Verified Clinical Focus Areas
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {leadDoctor.verifiedSpecialties.map((spec, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2.5 p-3 rounded-xl bg-emerald-darkest/60 border border-ivory/10 text-xs text-ivory/90"
                    >
                      <ShieldCheck className="w-4 h-4 text-champagne shrink-0" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Consultation availability */}
              <div className="p-4 rounded-xl bg-black/20 border border-champagne/20 mb-8 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-champagne font-semibold block">
                    Consultation Schedule
                  </span>
                  <span className="text-xs text-ivory/80">{leadDoctor.consultationDays}</span>
                </div>
                <span className="text-xs text-sage font-mono">By Appointment</span>
              </div>

              {/* CTA */}
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={onOpenBooking}
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-xs uppercase tracking-wider font-semibold text-emerald-darkest bg-gradient-to-r from-champagne-light via-champagne to-champagne-dark hover:from-white hover:to-champagne transition-all shadow-xl hover:shadow-champagne/20"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Private Consultation with Dr. Hamza</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Associated Medical Specialists (Dr. Anam Afzal & Ms. Sunzal Kamran) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {otherDoctors.map((doc) => (
            <div
              key={doc.id}
              className="rounded-3xl bg-gradient-to-b from-emerald-dark/70 to-emerald-darkest/90 border border-ivory/10 p-6 sm:p-8 flex flex-col justify-between hover:border-champagne/40 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] uppercase tracking-ultra text-champagne font-semibold px-2.5 py-0.5 rounded-full bg-champagne/10 border border-champagne/20">
                    Clinical Team
                  </span>
                  <span className="text-[10px] text-ivory/50 uppercase tracking-widest">
                    Derma Divine Medical
                  </span>
                </div>

                <div className="flex items-center gap-4 mb-5">
                  <div className="w-16 h-16 rounded-full overflow-hidden border border-champagne/30 bg-emerald-darkest shrink-0">
                    <img
                      src={doc.image}
                      alt={doc.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-editorial text-2xl text-ivory font-medium">
                      {doc.name}
                    </h3>
                    <p className="font-sans text-xs text-champagne/80">{doc.role}</p>
                  </div>
                </div>

                <p className="font-sans text-xs text-ivory/70 font-light leading-relaxed mb-6">
                  {doc.biography}
                </p>

                <div className="space-y-2 mb-6">
                  {doc.verifiedSpecialties.map((spec, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-ivory/80">
                      <ShieldCheck className="w-3.5 h-3.5 text-champagne shrink-0" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={onOpenBooking}
                className="w-full py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold text-ivory bg-white/5 hover:bg-white/10 border border-ivory/20 hover:border-champagne/40 transition-colors flex items-center justify-center gap-2"
              >
                <Calendar className="w-3.5 h-3.5 text-champagne" />
                <span>Request Consultation</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
