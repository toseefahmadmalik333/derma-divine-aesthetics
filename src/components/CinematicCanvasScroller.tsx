import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Sparkles, ChevronDown } from 'lucide-react';
import { sceneTimeline } from '../data/sceneTimeline';
import { FilmExperienceOverlay } from './FilmExperienceOverlay';

interface CinematicCanvasScrollerProps {
  onOpenBooking: () => void;
}

const TOTAL_FRAMES = 70;

// Format frame index to frame_001.jpg etc.
const getFrameUrl = (index: number): string => {
  let frameNum = index + 1;
  if (frameNum >= 68) frameNum += 1; // map 68->69, 69->70, 70->71
  const padded = String(frameNum).padStart(3, '0');
  return `/video-frames/frame_${padded}.jpg`;
};

export const CinematicCanvasScroller: React.FC<CinematicCanvasScrollerProps> = ({ onOpenBooking }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loadProgress, setLoadProgress] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [activeSceneIndex, setActiveSceneIndex] = useState<number>(0);

  const currentFrameRef = useRef<number>(0);
  const targetFrameRef = useRef<number>(0);
  const animationFrameId = useRef<number | null>(null);

  // 1. Preload frame images progressively
  useEffect(() => {
    let loadedCount = 0;
    const loadedImages: HTMLImageElement[] = new Array(TOTAL_FRAMES);

    // First load frame 0 immediately
    const firstImg = new Image();
    firstImg.src = getFrameUrl(0);
    firstImg.onload = () => {
      loadedImages[0] = firstImg;
      loadedCount++;
      setLoadProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));

      // Draw initial frame right away
      if (canvasRef.current) {
        drawFrameToCanvas(firstImg);
      }

      // Load remaining frames
      for (let i = 1; i < TOTAL_FRAMES; i++) {
        const img = new Image();
        img.src = getFrameUrl(i);
        img.onload = () => {
          loadedImages[i] = img;
          loadedCount++;
          setLoadProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
          if (loadedCount >= TOTAL_FRAMES) {
            setImages(loadedImages);
            setIsLoaded(true);
          }
        };
        img.onerror = () => {
          // Graceful fallback to first image if any frame fails
          loadedImages[i] = firstImg;
          loadedCount++;
          if (loadedCount >= TOTAL_FRAMES) {
            setImages(loadedImages);
            setIsLoaded(true);
          }
        };
      }
    };

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  // Helper to draw an image centered and scaled with "cover" behavior onto canvas
  const drawFrameToCanvas = useCallback((img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas || !img) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const imgWidth = img.naturalWidth || 1920;
    const imgHeight = img.naturalHeight || 1080;

    const scale = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight);
    const x = (canvasWidth - imgWidth * scale) / 2;
    const y = (canvasHeight - imgHeight * scale) / 2;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(img, x, y, imgWidth * scale, imgHeight * scale);
  }, []);

  // Resize canvas to match display DPI
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const dpr = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      // Redraw current frame
      const currentImg = images[Math.round(currentFrameRef.current)];
      if (currentImg) {
        drawFrameToCanvas(currentImg);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [images, drawFrameToCanvas]);

  // Smooth frame interpolation loop (lerp for buttery motion)
  useEffect(() => {
    const renderLoop = () => {
      if (images.length > 0) {
        const diff = targetFrameRef.current - currentFrameRef.current;
        if (Math.abs(diff) > 0.01) {
          currentFrameRef.current += diff * 0.15; // smooth lerp factor
          const frameIndex = Math.min(
            TOTAL_FRAMES - 1,
            Math.max(0, Math.round(currentFrameRef.current))
          );
          const img = images[frameIndex];
          if (img) {
            drawFrameToCanvas(img);
          }
        }
      }
      animationFrameId.current = requestAnimationFrame(renderLoop);
    };

    animationFrameId.current = requestAnimationFrame(renderLoop);
    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, [images, drawFrameToCanvas]);

  // Scroll listener to compute scroll progress along the track
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const scrollableDist = container.scrollHeight - window.innerHeight;
      if (scrollableDist <= 0) return;

      // Progress from 0 (top of section) to 1 (bottom of section)
      const currentScroll = -rect.top;
      const rawProgress = Math.max(0, Math.min(1, currentScroll / scrollableDist));

      setScrollProgress(rawProgress);

      // Target frame
      const targetFrame = rawProgress * (TOTAL_FRAMES - 1);
      targetFrameRef.current = targetFrame;

      // Map progress to active scene in sceneTimeline
      let activeIndex = 0;
      for (let i = 0; i < sceneTimeline.length; i++) {
        const isLast = i === sceneTimeline.length - 1;
        if (rawProgress >= sceneTimeline[i].start && (rawProgress < sceneTimeline[i].end || isLast)) {
          activeIndex = i;
          break;
        }
      }
      setActiveSceneIndex(activeIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const activeScene = sceneTimeline[activeSceneIndex] || sceneTimeline[0];

  return (
    <section
      id="story"
      ref={containerRef}
      className="relative w-full h-[650vh] bg-emerald-darkest"
    >
      {/* Sticky viewport container */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center">
        {/* Canvas for Scroll-Scrubbed Frame Sequence (Always active as instant visual layer) */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Atmospheric Vignette & Color Grading Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-darkest/90 via-transparent to-emerald-darkest/60 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#092D27]/30 to-[#051915]/85 pointer-events-none" />

        {/* Loading Progress Bar (Before all frames loaded) */}
        {!isLoaded && (
          <div className="absolute top-20 sm:top-24 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2.5 bg-emerald-darkest/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-champagne/30 text-[11px] sm:text-xs shadow-2xl">
            <Sparkles className="w-3 h-3 text-champagne animate-spin shrink-0" />
            <span className="text-ivory font-sans font-medium whitespace-nowrap">
              Loading Film Frames ({loadProgress}%)
            </span>
            <div className="w-16 sm:w-20 h-1 bg-white/20 rounded-full overflow-hidden shrink-0">
              <div
                className="h-full bg-champagne transition-all duration-300"
                style={{ width: `${loadProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Synchronized Typographic & Narrative Overlay */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <FilmExperienceOverlay
            scene={activeScene}
            sceneIndex={activeSceneIndex}
            totalScenes={sceneTimeline.length}
            scrollProgress={scrollProgress}
            onOpenBooking={onOpenBooking}
          />
        </div>

        {/* Scroll Navigation Indicator (Bottom) */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center justify-center pointer-events-none">
          <div className="flex items-center gap-2 bg-emerald-darkest/90 backdrop-blur-xl px-5 py-2.5 rounded-full border border-champagne/30 shadow-2xl text-[11px] sm:text-xs text-ivory/80 font-sans">
            <ChevronDown className="w-3.5 h-3.5 text-champagne animate-bounce" />
            <span>Scroll to explore the clinical journey</span>
          </div>
        </div>
      </div>
    </section>
  );
};
