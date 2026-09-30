import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ChevronDown, Sparkles } from 'lucide-react';
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

  // High-performance image cache via ref to avoid unnecessary re-renders during high-speed scrubbing
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  const [isReady, setIsReady] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [activeSceneIndex, setActiveSceneIndex] = useState<number>(0);

  const currentFrameRef = useRef<number>(0);
  const targetFrameRef = useRef<number>(0);
  const animationFrameId = useRef<number | null>(null);

  // Helper to draw an image centered and scaled with "cover" behavior onto canvas
  const drawFrameToCanvas = useCallback((img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas || !img) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const imgWidth = img.naturalWidth || 1440;
    const imgHeight = img.naturalHeight || 810;

    const scale = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight);
    const x = (canvasWidth - imgWidth * scale) / 2;
    const y = (canvasHeight - imgHeight * scale) / 2;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(img, x, y, imgWidth * scale, imgHeight * scale);
  }, []);

  // Nearest-neighbor frame fallback ensuring zero blank flashes
  const getLoadedFrame = useCallback((index: number): HTMLImageElement | null => {
    const frames = imagesRef.current;
    if (frames[index]) return frames[index];

    // Search outward for closest available cached frame
    for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
      if (index - offset >= 0 && frames[index - offset]) {
        return frames[index - offset];
      }
      if (index + offset < TOTAL_FRAMES && frames[index + offset]) {
        return frames[index + offset];
      }
    }
    return null;
  }, []);

  // 1. Progressive Milestone Loader (Instant LCP & zero-wait scrolling)
  useEffect(() => {
    let isCancelled = false;

    // Load a single frame and store in cache
    const loadSingleFrame = (idx: number): Promise<HTMLImageElement> => {
      return new Promise((resolve) => {
        if (imagesRef.current[idx]) {
          return resolve(imagesRef.current[idx]!);
        }
        const img = new Image();
        img.decoding = 'async';
        img.src = getFrameUrl(idx);
        img.onload = () => {
          if (!isCancelled) {
            imagesRef.current[idx] = img;
          }
          resolve(img);
        };
        img.onerror = () => {
          // If a frame fails, reuse frame 0 or fallback
          if (!isCancelled && imagesRef.current[0]) {
            imagesRef.current[idx] = imagesRef.current[0];
          }
          resolve(img);
        };
      });
    };

    // Phase 1: Load Hero Frame 0 immediately for instant paint
    loadSingleFrame(0).then((heroImg) => {
      if (isCancelled) return;
      drawFrameToCanvas(heroImg);
      setIsReady(true);

      // Phase 2: Load milestone keyframes (spaced across the 70 frames)
      const milestones: number[] = [];
      const step = 7;
      for (let i = step; i < TOTAL_FRAMES; i += step) {
        milestones.push(i);
      }
      if (!milestones.includes(TOTAL_FRAMES - 1)) {
        milestones.push(TOTAL_FRAMES - 1);
      }

      // Load all keyframe milestones in parallel
      Promise.all(milestones.map((idx) => loadSingleFrame(idx))).then(() => {
        if (isCancelled) return;

        // Phase 3: Polite background queue for remaining intermediate frames
        const remaining: number[] = [];
        for (let i = 1; i < TOTAL_FRAMES; i++) {
          if (!milestones.includes(i)) {
            remaining.push(i);
          }
        }

        // Process in small micro-batches of 4 to leave network free for user interaction
        let batchIndex = 0;
        const batchSize = 4;

        const processNextBatch = () => {
          if (isCancelled || batchIndex >= remaining.length) return;
          const chunk = remaining.slice(batchIndex, batchIndex + batchSize);
          batchIndex += batchSize;

          Promise.all(chunk.map((idx) => loadSingleFrame(idx))).then(() => {
            if (!isCancelled) {
              // Yield execution before next batch
              if ('requestIdleCallback' in window) {
                (window as any).requestIdleCallback(processNextBatch);
              } else {
                setTimeout(processNextBatch, 30);
              }
            }
          });
        };

        processNextBatch();
      });
    });

    return () => {
      isCancelled = true;
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [drawFrameToCanvas]);

  // Resize canvas to match display DPI
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      // Redraw current frame
      const frameIdx = Math.round(currentFrameRef.current);
      const img = getLoadedFrame(frameIdx);
      if (img) {
        drawFrameToCanvas(img);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [drawFrameToCanvas, getLoadedFrame]);

  // Smooth frame interpolation loop (lerp for buttery 60fps motion)
  useEffect(() => {
    const renderLoop = () => {
      const diff = targetFrameRef.current - currentFrameRef.current;
      if (Math.abs(diff) > 0.01) {
        currentFrameRef.current += diff * 0.18; // responsive lerp
        const frameIndex = Math.min(
          TOTAL_FRAMES - 1,
          Math.max(0, Math.round(currentFrameRef.current))
        );
        const img = getLoadedFrame(frameIndex);
        if (img) {
          drawFrameToCanvas(img);
        }
      }
      animationFrameId.current = requestAnimationFrame(renderLoop);
    };

    animationFrameId.current = requestAnimationFrame(renderLoop);
    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, [drawFrameToCanvas, getLoadedFrame]);

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
        {/* Canvas for Scroll-Scrubbed Frame Sequence */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Atmospheric Vignette & Color Grading Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-darkest/90 via-transparent to-emerald-darkest/60 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#092D27]/30 to-[#051915]/85 pointer-events-none" />

        {/* Minimal Initial Mount Loader (Only visible for ~150ms before frame 0 appears) */}
        {!isReady && (
          <div className="absolute top-20 sm:top-24 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 bg-emerald-darkest/90 backdrop-blur-md px-4 py-1.5 rounded-full border border-champagne/30 text-xs shadow-2xl animate-pulse">
            <Sparkles className="w-3.5 h-3.5 text-champagne animate-spin shrink-0" />
            <span className="text-ivory font-sans font-medium">Entering Sanctuary...</span>
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
