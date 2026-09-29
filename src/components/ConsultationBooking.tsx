import React, { useState, useEffect } from 'react';
import { clinicInfo } from '../data/clinicInfo';
import { treatmentsData } from '../data/treatments';
import { Sparkles, Calendar, Clock, Phone, MessageSquare, Check, ShieldCheck, ArrowRight } from 'lucide-react';

interface ConsultationBookingProps {
  initialTreatment?: string;
}

export const ConsultationBooking: React.FC<ConsultationBookingProps> = ({ initialTreatment }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    treatment: initialTreatment || '',
    preferredDate: '',
    preferredTime: 'afternoon',
    notes: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (initialTreatment) {
      setFormData((prev) => ({ ...prev, treatment: initialTreatment }));
    }
  }, [initialTreatment]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Derma Divine Aesthetics! I would like to book a consultation regarding ${
      formData.treatment || 'an aesthetic/dermatological concern'
    }. My name is ${formData.fullName || 'Patient'}.`
  );

  return (
    <section id="consultation" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-emerald-darkest via-emerald-dark to-emerald-darkest overflow-hidden">
      {/* Background Hero Montage Watermark */}
      <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-screen bg-center bg-cover" style={{ backgroundImage: "url('/results/hero-montage.png')" }} />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-dark/80 border border-champagne/30 text-champagne text-xs uppercase tracking-ultra mb-4 shadow-sm">
            <Calendar className="w-3.5 h-3.5" />
            <span>Private Intake</span>
          </div>
          <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-ivory font-normal tracking-wide max-w-3xl leading-tight">
            Your Next Chapter Starts With a Consultation
          </h2>
          <p className="font-sans text-sm sm:text-base text-ivory/70 font-light max-w-2xl mt-4 leading-relaxed">
            Reserve your confidential diagnostic assessment with our surgical and aesthetic medical specialists at Derma Divine Medical & Aesthetic Centre.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Direct Communication Channels */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Quick Contact Card */}
            <div className="rounded-3xl bg-emerald-darkest/90 border border-champagne/30 p-6 sm:p-8 shadow-xl">
              <span className="text-[10px] uppercase tracking-ultra text-champagne font-semibold block mb-2">
                Immediate Assistance
              </span>
              <h3 className="font-editorial text-3xl text-ivory mb-4 font-normal">
                Prefer Immediate Scheduling?
              </h3>
              <p className="font-sans text-xs text-ivory/70 font-light leading-relaxed mb-6">
                Our front desk coordinators can assist you immediately with schedule availability, physician coordination, and clinic directions.
              </p>

              <div className="space-y-3">
                {/* WhatsApp Direct */}
                <a
                  href={`https://wa.me/${clinicInfo.whatsapp}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-emerald-light/40 hover:bg-emerald-light/70 border border-champagne/30 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-champagne text-emerald-darkest flex items-center justify-center font-bold">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-ivory block">Chat on WhatsApp</span>
                      <span className="text-[11px] text-champagne/80 font-mono">{clinicInfo.phone}</span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-champagne group-hover:translate-x-1 transition-transform" />
                </a>

                {/* Direct Phone */}
                <a
                  href={`tel:${clinicInfo.phoneRaw}`}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-black/20 hover:bg-black/40 border border-ivory/10 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-white/10 text-ivory flex items-center justify-center">
                      <Phone className="w-4 h-4 text-champagne" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-ivory block">Direct Front Desk</span>
                      <span className="text-[11px] text-ivory/70 font-mono">{clinicInfo.phone}</span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-ivory/60 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

            {/* Operating Hours summary */}
            <div className="rounded-3xl bg-emerald-darkest/70 border border-ivory/10 p-6">
              <span className="text-[10px] uppercase tracking-wider text-champagne font-semibold block mb-2">
                Consultation Hours
              </span>
              <div className="space-y-1.5 text-xs font-sans text-ivory/80">
                <div className="flex justify-between">
                  <span>Mon – Thu:</span>
                  <span className="font-mono text-champagne">1:00 PM – 10:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Friday:</span>
                  <span className="font-mono text-champagne">2:00 PM – 10:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday:</span>
                  <span className="font-mono text-champagne">1:00 PM – 10:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday:</span>
                  <span className="font-mono text-champagne">11:00 AM – 10:00 PM</span>
                </div>
              </div>
            </div>

            {/* Privacy Promise */}
            <div className="flex items-start gap-3 p-4 rounded-2xl bg-black/20 border border-ivory/5 text-xs text-ivory/50">
              <ShieldCheck className="w-4 h-4 text-champagne shrink-0 mt-0.5" />
              <p>
                All personal and clinical inquiries are handled under strict doctor-patient confidentiality. We never share your data.
              </p>
            </div>
          </div>

          {/* Consultation Booking Form */}
          <div className="lg:col-span-7 rounded-3xl bg-gradient-to-b from-emerald-dark/95 to-emerald-darkest border border-champagne/30 p-6 sm:p-10 shadow-2xl">
            {isSubmitted ? (
              <div className="text-center py-12 animate-fadeIn">
                <div className="w-16 h-16 rounded-full bg-champagne/20 border border-champagne text-champagne flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8" />
                </div>
                <span className="text-xs uppercase tracking-ultra text-champagne font-semibold block mb-1">
                  Request Received
                </span>
                <h3 className="font-editorial text-3xl sm:text-4xl text-ivory mb-3 font-normal">
                  Thank You, {formData.fullName || 'Valued Patient'}
                </h3>
                <p className="font-sans text-sm text-ivory/70 max-w-md mx-auto leading-relaxed mb-6 font-light">
                  Our clinical patient coordinator will contact you at <strong className="text-ivory">{formData.phone}</strong> shortly to confirm your consultation schedule.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-2.5 rounded-full text-xs uppercase tracking-wider font-medium text-ivory bg-white/10 hover:bg-white/20 transition-colors"
                >
                  Submit Another Inpatient Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="mb-6 pb-3 border-b border-ivory/10">
                  <span className="text-xs uppercase tracking-ultra text-champagne font-semibold block">
                    Online Reservation
                  </span>
                  <h3 className="font-editorial text-2xl text-ivory font-normal">
                    Schedule Your Assessment
                  </h3>
                </div>

                {/* Full Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-ivory/70 mb-1.5 font-medium">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      placeholder="e.g. Ayesha Khan"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-black/20 border border-ivory/15 focus:border-champagne focus:outline-none text-ivory placeholder-ivory/30 text-xs font-sans transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-ivory/70 mb-1.5 font-medium">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="e.g. +92 300 1234567"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-black/20 border border-ivory/15 focus:border-champagne focus:outline-none text-ivory placeholder-ivory/30 text-xs font-sans transition-colors"
                    />
                  </div>
                </div>

                {/* Email (Optional) & Treatment Interest */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-ivory/70 mb-1.5 font-medium">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="name@domain.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-black/20 border border-ivory/15 focus:border-champagne focus:outline-none text-ivory placeholder-ivory/30 text-xs font-sans transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-ivory/70 mb-1.5 font-medium">
                      Area of Clinical Focus *
                    </label>
                    <select
                      name="treatment"
                      required
                      value={formData.treatment}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-emerald-darkest border border-ivory/15 focus:border-champagne focus:outline-none text-ivory text-xs font-sans transition-colors"
                    >
                      <option value="">Select a procedure or concern</option>
                      <option value="Sapphire Micro-Punch FUE Hair Transplant">Sapphire Micro-Punch FUE Hair Transplant</option>
                      <option value="Hair PRP Rejuvenation">Hair PRP Rejuvenation</option>
                      <option value="Medical-Grade HydraFacial MD">Medical-Grade HydraFacial MD</option>
                      <option value="Carbon Laser Peel">Carbon Laser Peel</option>
                      <option value="Microneedling & Vampire Facial">Microneedling & Vampire Facial</option>
                      <option value="Dermatological Chemical Peel">Dermatological Chemical Peel</option>
                      <option value="Botox Expression Smoothing">Botox Expression Smoothing</option>
                      <option value="Dermal Fillers & Contouring">Dermal Fillers & Contouring</option>
                      <option value="PDO Thread Lift">PDO Thread Lift</option>
                      <option value="Plastic Surgery Consultation">Plastic Surgery Consultation (Dr. Hamza Malik)</option>
                      <option value="Clinical Nutrition & PCOS (Ms. Sunzal Kamran)">Clinical Nutrition & PCOS (Ms. Sunzal Kamran)</option>
                      <option value="General Dermatological Consultation">General Dermatological Consultation</option>
                    </select>
                  </div>
                </div>

                {/* Preferred Date & Time Slot */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-ivory/70 mb-1.5 font-medium">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-black/20 border border-ivory/15 focus:border-champagne focus:outline-none text-ivory text-xs font-sans transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-ivory/70 mb-1.5 font-medium">
                      Preferred Time Window
                    </label>
                    <select
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-emerald-darkest border border-ivory/15 focus:border-champagne focus:outline-none text-ivory text-xs font-sans transition-colors"
                    >
                      <option value="afternoon">Afternoon (1:00 PM – 4:00 PM)</option>
                      <option value="evening">Late Afternoon (4:00 PM – 7:00 PM)</option>
                      <option value="night">Evening (7:00 PM – 10:00 PM)</option>
                      <option value="sunday">Sunday Morning (11:00 AM – 2:00 PM)</option>
                    </select>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-ivory/70 mb-1.5 font-medium">
                    Additional Notes / Previous Interventions (Optional)
                  </label>
                  <textarea
                    name="notes"
                    rows={3}
                    placeholder="Describe any particular areas of concern, previous procedures, or specific queries..."
                    value={formData.notes}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-black/20 border border-ivory/15 focus:border-champagne focus:outline-none text-ivory placeholder-ivory/30 text-xs font-sans transition-colors resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-4 rounded-full text-xs uppercase tracking-wider font-semibold text-emerald-darkest bg-gradient-to-r from-champagne-light via-champagne to-champagne-dark hover:from-white hover:to-champagne transition-all shadow-xl hover:shadow-champagne/20 flex items-center justify-center gap-2 mt-4"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Request Private Clinical Consultation</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
