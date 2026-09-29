import React from 'react';
import { SceneData } from '../types';
import { ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';

interface FilmExperienceOverlayProps {
  scene: SceneData;
  sceneIndex: number;
  totalScenes: number;
  scrollProgress: number;
  onOpenBooking: () => void;
}

export const FilmExperienceOverlay: React.FC<FilmExperienceOverlayProps> = ({
  scene,
  sceneIndex,
  totalScenes,
  scrollProgress,
  onOpenBooking,
}) => {
  // Compute position classes based on overlayPosition
  const getPositionClasses = (position: SceneData['overlayPosition']) => {
    switch (position) {
      case 'left':
        return 'items-start text-left justify-center pr-4 sm:pr-0 pl-0 sm:pl-8 lg:pl-16 max-w-xl lg:max-w-2xl pb-24 sm:pb-28';
      case 'right':
        return 'items-end text-right justify-center ml-auto pl-4 sm:pl-0 pr-0 sm:pr-8 lg:pr-16 max-w-xl lg:max-w-2xl pb-24 sm:pb-28';
      case 'center':
        return 'items-center text-center justify-center mx-auto max-w-2xl lg:max-w-3xl px-2 sm:px-6 pb-24 sm:pb-28';
      case 'bottom-left':
        return 'items-start text-left justify-end pb-28 sm:pb-32 pr-4 sm:pr-0 pl-0 sm:pl-8 lg:pl-16 max-w-xl lg:max-w-2xl';
      case 'bottom-right':
        return 'items-end text-right justify-end pb-28 sm:pb-32 ml-auto pl-4 sm:pl-0 pr-0 sm:pr-8 lg:pr-16 max-w-xl lg:max-w-2xl';
      default:
        return 'items-start text-left justify-center pr-4 sm:pr-0 pl-0 sm:pl-8 max-w-xl pb-24 sm:pb-28';
    }
  };

  return (
    <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between p-4 sm:p-8 lg:p-12 overflow-hidden">
      {/* Top Scene Tracker */}
      <div className="flex items-center justify-between w-full max-w-7xl mx-auto pt-16 sm:pt-20">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <span className="text-[11px] sm:text-xs uppercase tracking-widest text-champagne font-mono font-semibold whitespace-nowrap">
            Act {String(sceneIndex + 1).padStart(2, '0')} / {String(totalScenes).padStart(2, '0')}
          </span>
          <div className="h-3 w-px bg-champagne/40 hidden md:block shrink-0" />
          <span className="text-[11px] uppercase tracking-wider text-ivory/70 hidden md:inline whitespace-nowrap truncate max-w-xs">
            {scene.kicker}
          </span>
        </div>

        {/* Minimal Progress Bar */}
        <div className="flex items-center gap-2 shrink-0 ml-auto">
          <div className="w-20 sm:w-36 h-[2px] bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-champagne transition-all duration-300"
              style={{ width: `${Math.round(scrollProgress * 100)}%` }}
            />
          </div>
          <span className="text-[10px] sm:text-[11px] font-mono text-champagne/90 shrink-0 whitespace-nowrap">
            {Math.round(scrollProgress * 100)}%
          </span>
        </div>
      </div>

      {/* Main Dynamic Typographic Narrative */}
      <div
        key={scene.id}
        className={`w-full flex flex-col transition-all duration-700 ${getPositionClasses(
          scene.overlayPosition
        )}`}
      >
        {/* Kicker badge */}
        <div className="inline-flex items-center gap-2 mb-2.5 sm:mb-3 px-3 py-1 rounded-full bg-emerald-darkest/80 border border-champagne/30 backdrop-blur-md shadow-lg max-w-full">
          <Sparkles className="w-3 h-3 text-champagne shrink-0" />
          <span className="text-[10px] sm:text-xs uppercase tracking-wider text-champagne font-medium whitespace-nowrap truncate">
            {scene.kicker}
          </span>
        </div>

        {/* Headline */}
        <h2 className="font-editorial text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-normal tracking-wide text-ivory leading-[1.12] mb-2.5 sm:mb-4 drop-shadow-lg">
          {scene.title}
        </h2>

        {/* Subtitle */}
        <p className="font-sans text-xs sm:text-sm lg:text-base text-ivory/85 font-light leading-relaxed max-w-xl mb-2.5 sm:mb-4 drop-shadow">
          {scene.subtitle}
        </p>

        {/* Supporting Narrative */}
        <p className="font-editorial italic text-sm sm:text-base lg:text-lg xl:text-xl text-champagne-light/90 max-w-lg mb-4 sm:mb-6 drop-shadow">
          "{scene.narrativeText}"
        </p>

        {/* Interactive Action Buttons */}
        <div className="pointer-events-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
          <button
            onClick={onOpenBooking}
            className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold text-emerald-darkest bg-gradient-to-r from-champagne-light via-champagne to-champagne-dark hover:from-white hover:to-champagne transition-all duration-300 shadow-xl hover:shadow-champagne/25"
          >
            <span>Book Consultation</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <a
            href="#treatments"
            className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs uppercase tracking-wider font-medium text-ivory bg-emerald-dark/70 hover:bg-emerald-dark/95 border border-ivory/20 hover:border-champagne/50 backdrop-blur-md transition-all duration-300"
          >
            <span>Explore Treatments</span>
          </a>
        </div>
      </div>

      {/* Bottom Spacer / Medical Integrity Note */}
      <div className="max-w-7xl mx-auto w-full hidden md:flex items-center justify-between text-[10px] text-ivory/40 uppercase tracking-widest pointer-events-none pb-1">
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-champagne/60 shrink-0" />
          Clinical Precision • Ethical Care • Individualized Outcomes
        </span>
        <span className="hidden lg:inline text-ivory/40">Al-Hafeez Heights, Gulberg III, Lahore</span>
      </div>
    </div>
  );
};
