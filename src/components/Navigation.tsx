import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Calendar, Sparkles } from 'lucide-react';
import { clinicInfo } from '../data/clinicInfo';

interface NavigationProps {
  onOpenBooking: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onOpenBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Cinematic Story', href: '#story' },
    { label: 'Treatments', href: '#treatments' },
    { label: 'Doctors', href: '#doctors' },
    { label: 'Real Results', href: '#results' },
    { label: 'The Clinic', href: '#clinic' },
    { label: 'Patient Journey', href: '#journey' },
    { label: 'FAQ', href: '#faq' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#092D27]/90 backdrop-blur-lg border-b border-[#C6A15B]/20 py-3 shadow-xl'
            : 'bg-gradient-to-b from-[#092D27]/80 via-[#092D27]/40 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#story"
            onClick={(e) => handleLinkClick(e, '#story')}
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-full border border-champagne/40 flex items-center justify-center bg-emerald-dark/60 group-hover:border-champagne transition-all duration-300">
              <span className="font-editorial text-xl font-bold text-champagne tracking-wider">DD</span>
            </div>
            <div className="flex flex-col">
              <span className="font-editorial text-lg tracking-widest text-[#F8F5ED] font-semibold leading-tight group-hover:text-champagne transition-colors">
                DERMA DIVINE
              </span>
              <span className="text-[9px] uppercase tracking-ultra text-champagne/80 font-medium">
                Aesthetics By DMAC
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-xs uppercase tracking-widest text-ivory/80 hover:text-champagne transition-colors duration-200 relative py-1 group font-medium"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-champagne transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Desktop CTA & Phone */}
          <div className="hidden sm:flex items-center gap-4">
            <a
              href={`tel:${clinicInfo.phoneRaw}`}
              className="hidden xl:flex items-center gap-2 text-xs text-ivory/70 hover:text-champagne transition-colors py-2 px-3 rounded-full border border-ivory/10 hover:border-champagne/40"
            >
              <Phone className="w-3.5 h-3.5 text-champagne" />
              <span className="font-sans text-[11px] tracking-wider">{clinicInfo.phone}</span>
            </a>

            <button
              onClick={onOpenBooking}
              className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-emerald-darkest bg-gradient-to-r from-champagne-light via-champagne to-champagne-dark hover:from-white hover:to-champagne transition-all duration-300 shadow-md hover:shadow-champagne/20 transform hover:-translate-y-0.5"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Consultation</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-ivory/90 hover:text-champagne transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-30 bg-[#092D27]/98 backdrop-blur-2xl transition-all duration-500 lg:hidden flex flex-col justify-between p-8 pt-28 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col gap-6">
          <p className="text-xs uppercase tracking-ultra text-champagne">Navigation</p>
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="font-editorial text-2xl text-ivory hover:text-champagne transition-colors tracking-wide flex items-center justify-between border-b border-ivory/10 pb-3"
              >
                <span>{link.label}</span>
                <span className="text-xs font-sans uppercase tracking-widest text-champagne/50">Explore</span>
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-6 border-t border-champagne/20">
          <a
            href={`tel:${clinicInfo.phoneRaw}`}
            className="flex items-center justify-center gap-3 py-3 rounded-full border border-champagne/30 text-champagne text-xs uppercase tracking-widest font-semibold"
          >
            <Phone className="w-4 h-4" />
            <span>Call Clinic: {clinicInfo.phone}</span>
          </a>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenBooking();
            }}
            className="w-full py-3.5 rounded-full text-xs uppercase tracking-wider font-semibold text-emerald-darkest bg-gradient-to-r from-champagne-light to-champagne flex items-center justify-center gap-2 shadow-lg"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Consultation Now</span>
          </button>
        </div>
      </div>
    </>
  );
};
