import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Sparkles,
  ChevronDown,
  Maximize2,
  Minimize2,
  Subtitles,
  Film
} from 'lucide-react';
import { sceneTimeline } from '../data/sceneTimeline';
import { FilmExperienceOverlay } from './FilmExperienceOverlay';

interface CinematicCanvasScrollerProps {
  onOpenBooking: () => void;
}

const TOTAL_FRAMES = 70;

// Format frame index to frame_001.png etc.
const getFrameUrl = (index: number): string => {
  // If index is 68, frame_068 is omitted in sequence, use 069 or clamp
  let frameNum = index + 1;
  if (frameNum >= 68) frameNum += 1; // map 68->69, 69->70, 70->71
  const padded = String(frameNum).padStart(3, '0');
  return `/video-frames/frame_${padded}.png`;
};

export const CinematicCanvasScroller: React.FC<CinematicCanvasScrollerProps> = ({ onOpenBooking }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loadProgress, setLoadProgress] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [activeSceneIndex, setActiveSceneIndex] = useState<number>(0);

  // Video Mode State
  const [isVideoMode, setIsVideoMode] = useState<boolean>(false);
  const [isPlayingVideo, setIsPlayingVideo] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [videoTime, setVideoTime] = useState<number>(0);
  const [videoDuration, setVideoDuration] = useState<number>(98);
  const [showCaptionsInVideo, setShowCaptionsInVideo] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isBuffering, setIsBuffering] = useState<boolean>(false);

  const currentFrameRef = useRef<number>(0);
  const targetFrameRef = useRef<number>(0);
  const animationFrameId = useRef<number | null>(null);
  const playPromiseRef = useRef<Promise<void> | null>(null);

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
      if (!isVideoMode && images.length > 0) {
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
  }, [images, isVideoMode, drawFrameToCanvas]);

  // Scroll listener to compute scroll progress along the track
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container || isVideoMode) return;

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
  }, [isVideoMode]);

  // Video playback time updates and scene synchronization
  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;

    setVideoTime(video.currentTime);
    const dur = video.duration || 98;
    setVideoDuration(dur);

    // Sync narrative scene to the film's playback position
    if (isVideoMode) {
      const progress = Math.max(0, Math.min(1, video.currentTime / dur));
      let activeIndex = 0;
      for (let i = 0; i < sceneTimeline.length; i++) {
        const isLast = i === sceneTimeline.length - 1;
        if (progress >= sceneTimeline[i].start && (progress < sceneTimeline[i].end || isLast)) {
          activeIndex = i;
          break;
        }
      }
      setActiveSceneIndex(activeIndex);
    }
  };

  // Robust, Promise-safe play function
  const playVideo = async () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = isMuted;

    try {
      const promise = video.play();
      playPromiseRef.current = promise;
      await promise;
      setIsPlayingVideo(true);
      setIsBuffering(false);
    } catch (err: any) {
      if (err.name === 'AbortError') {
        // Ignored: play interrupted by pause
        return;
      }
      if (err.name === 'NotAllowedError') {
        // Autoplay policy prevented unmuted playback, fallback to muted
        console.warn("Autoplay policy required muted playback:", err);
        video.muted = true;
        setIsMuted(true);
        try {
          const retryPromise = video.play();
          playPromiseRef.current = retryPromise;
          await retryPromise;
          setIsPlayingVideo(true);
          setIsBuffering(false);
        } catch (retryErr) {
          console.error("Muted playback failed:", retryErr);
          setIsPlayingVideo(false);
        }
      } else {
        console.error("Video play error:", err);
        setIsPlayingVideo(false);
      }
    } finally {
      playPromiseRef.current = null;
    }
  };

  // Robust, Promise-safe pause function
  const pauseVideo = async () => {
    const video = videoRef.current;
    if (!video) return;

    if (playPromiseRef.current) {
      try {
        await playPromiseRef.current;
      } catch {
        // ignore
      }
    }

    video.pause();
    setIsPlayingVideo(false);
    setIsBuffering(false);
  };

  // Switch between Scroll Camera Mode and Live Master Film Mode
  const toggleVideoMode = (enableVideo: boolean) => {
    setIsVideoMode(enableVideo);
    const video = videoRef.current;
    if (!video) return;

    if (enableVideo) {
      // Synchronize video time with the current frame if scrolled past opening
      const currentRatio = currentFrameRef.current / (TOTAL_FRAMES - 1);
      const targetTime = currentRatio * (video.duration || 98);
      if (targetTime > 0.5 && !isNaN(targetTime)) {
        if (video.readyState >= 1) {
          video.currentTime = targetTime;
          setVideoTime(targetTime);
        } else {
          const onMeta = () => {
            video.currentTime = targetTime;
            setVideoTime(targetTime);
            video.removeEventListener('loadedmetadata', onMeta);
          };
          video.addEventListener('loadedmetadata', onMeta);
        }
      } else {
        setVideoTime(video.currentTime || 0);
      }

      playVideo();
    } else {
      pauseVideo();

      // When switching back to scroll mode, sync currentFrame to where video paused
      const progress = video.currentTime / (video.duration || 98);
      const targetFrame = progress * (TOTAL_FRAMES - 1);
      currentFrameRef.current = targetFrame;
      targetFrameRef.current = targetFrame;
      const img = images[Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.round(targetFrame)))];
      if (img) drawFrameToCanvas(img);
    }
  };

  // Seek video timeline
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;
    const time = Number(e.target.value);
    video.currentTime = time;
    setVideoTime(time);

    // Immediately update canvas to corresponding frame for instant visual feedback
    const dur = videoDuration || 98;
    const ratio = Math.max(0, Math.min(1, time / dur));
    const frameIdx = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.round(ratio * (TOTAL_FRAMES - 1))));
    currentFrameRef.current = frameIdx;
    targetFrameRef.current = frameIdx;
    const img = images[frameIdx];
    if (img) drawFrameToCanvas(img);
  };

  // Replay from start
  const handleRestartVideo = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    setVideoTime(0);
    playVideo();
  };

  // Mute / Unmute toggle
  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    const nextMuted = !isMuted;
    video.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  // Fullscreen toggle
  const toggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    const elem = containerRef.current;
    if (!elem) return;

    if (!document.fullscreenElement) {
      elem.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  // Format seconds to mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const activeScene = sceneTimeline[activeSceneIndex] || sceneTimeline[0];
  const activeProgress = isVideoMode
    ? videoTime / (videoDuration || 98)
    : scrollProgress;

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

        {/* Video Mode Fallback / Continuous Player */}
        <video
          ref={videoRef}
          src="/video/derma-divine-film.mp4"
          playsInline
          preload="auto"
          loop
          onPlay={() => {
            setIsPlayingVideo(true);
            setIsBuffering(false);
          }}
          onPlaying={() => {
            setIsPlayingVideo(true);
            setIsBuffering(false);
          }}
          onPause={() => setIsPlayingVideo(false)}
          onWaiting={() => setIsBuffering(true)}
          onCanPlay={() => setIsBuffering(false)}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={() => {
            if (videoRef.current) setVideoDuration(videoRef.current.duration || 98);
          }}
          onClick={isVideoMode ? () => (isPlayingVideo ? pauseVideo() : playVideo()) : undefined}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 cursor-pointer ${
            isVideoMode ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        />

        {/* Atmospheric Vignette & Color Grading Overlays (softer in video mode) */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-emerald-darkest/90 via-transparent to-emerald-darkest/60 pointer-events-none transition-opacity duration-700 ${
            isVideoMode && !showCaptionsInVideo ? 'opacity-40' : 'opacity-100'
          }`}
        />
        <div
          className={`absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#092D27]/30 to-[#051915]/85 pointer-events-none transition-opacity duration-700 ${
            isVideoMode && !showCaptionsInVideo ? 'opacity-40' : 'opacity-100'
          }`}
        />

        {/* Big Centered Play Button when paused in Video Mode */}
        {isVideoMode && !isPlayingVideo && !isBuffering && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              playVideo();
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 p-6 sm:p-8 rounded-full bg-emerald-darkest/90 border-2 border-champagne text-champagne backdrop-blur-xl shadow-2xl hover:scale-110 hover:bg-emerald-dark transition-all cursor-pointer pointer-events-auto group"
            aria-label="Play Master Film"
          >
            <Play className="w-10 h-10 sm:w-12 sm:h-12 ml-1 text-champagne group-hover:scale-105 transition-transform" />
          </button>
        )}

        {/* Buffering Indicator */}
        {isVideoMode && isBuffering && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 flex items-center gap-3 px-5 py-2.5 rounded-full bg-emerald-darkest/90 border border-champagne/40 text-champagne backdrop-blur-md shadow-2xl animate-pulse">
            <Sparkles className="w-4 h-4 animate-spin text-champagne" />
            <span className="text-xs uppercase tracking-wider font-medium text-ivory">Buffering Film...</span>
          </div>
        )}

        {/* Loading Progress Bar (Before all frames loaded) */}
        {!isLoaded && !isVideoMode && (
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
        <div
          className={`absolute inset-0 w-full h-full pointer-events-none transition-all duration-700 ${
            isVideoMode && !showCaptionsInVideo
              ? 'opacity-0 scale-95'
              : 'opacity-100 scale-100'
          }`}
        >
          <FilmExperienceOverlay
            scene={activeScene}
            sceneIndex={activeSceneIndex}
            totalScenes={sceneTimeline.length}
            scrollProgress={activeProgress}
            onOpenBooking={onOpenBooking}
          />
        </div>

        {/* Minimal Floating Subtitle in Clean Cinema View */}
        {isVideoMode && !showCaptionsInVideo && (
          <div className="absolute top-20 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 px-4 py-1.5 rounded-full bg-emerald-darkest/80 backdrop-blur-md border border-champagne/25 text-xs text-ivory/90 animate-fadeIn pointer-events-none">
            <Film className="w-3.5 h-3.5 text-champagne" />
            <span className="text-[10px] uppercase font-mono tracking-widest text-champagne font-semibold">
              Act {String(activeSceneIndex + 1).padStart(2, '0')}:
            </span>
            <span className="font-editorial text-sm tracking-wide text-ivory truncate max-w-xs sm:max-w-md">
              {activeScene.title}
            </span>
          </div>
        )}

        {/* Cinema Controls Bar (Bottom) */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2.5 w-[94%] max-w-2xl">
          {/* Seekbar when in video mode */}
          {isVideoMode && (
            <div className="w-full flex items-center gap-3 px-4 py-2 rounded-full bg-emerald-darkest/90 backdrop-blur-xl border border-champagne/30 shadow-2xl animate-fadeIn">
              <span className="text-[11px] font-mono text-champagne shrink-0">
                {formatTime(videoTime)}
              </span>
              <input
                type="range"
                min="0"
                max={videoDuration || 98}
                step="0.1"
                value={videoTime}
                onChange={handleSeek}
                className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-champagne"
                aria-label="Seek video timeline"
              />
              <span className="text-[11px] font-mono text-ivory/60 shrink-0">
                {formatTime(videoDuration || 98)}
              </span>
            </div>
          )}

          {/* Action buttons bar */}
          <div className="flex flex-wrap items-center justify-center gap-3 bg-emerald-dark/90 backdrop-blur-xl px-5 py-2.5 rounded-full border border-champagne/30 shadow-2xl">
            {/* Mode Switcher: Scroll Scrub vs Live Film */}
            <div className="flex items-center gap-1.5 p-1 bg-emerald-darkest/70 rounded-full border border-ivory/10 text-[11px] font-sans">
              <button
                type="button"
                onClick={() => toggleVideoMode(false)}
                className={`px-3 py-1 rounded-full transition-all duration-300 ${
                  !isVideoMode
                    ? 'bg-champagne text-emerald-darkest font-semibold shadow-sm'
                    : 'text-ivory/60 hover:text-ivory'
                }`}
              >
                Scroll Camera
              </button>
              <button
                type="button"
                onClick={() => toggleVideoMode(true)}
                className={`px-3 py-1 rounded-full transition-all duration-300 ${
                  isVideoMode
                    ? 'bg-champagne text-emerald-darkest font-semibold shadow-sm'
                    : 'text-ivory/60 hover:text-ivory'
                }`}
              >
                Play Master Film
              </button>
            </div>

            {/* Video Mode Playback Controls */}
            {isVideoMode && (
              <div className="flex items-center gap-2 border-l border-champagne/20 pl-3">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (isPlayingVideo) {
                      pauseVideo();
                    } else {
                      playVideo();
                    }
                  }}
                  className="p-2 rounded-full bg-champagne text-emerald-darkest hover:bg-white transition-all shadow-md cursor-pointer"
                  title={isPlayingVideo ? 'Pause Film' : 'Play Film'}
                  aria-label={isPlayingVideo ? 'Pause Film' : 'Play Film'}
                >
                  {isPlayingVideo ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                </button>

                <button
                  type="button"
                  onClick={handleRestartVideo}
                  className="p-1.5 rounded-full bg-champagne/15 text-champagne hover:bg-champagne hover:text-emerald-darkest transition-all"
                  title="Replay from Beginning"
                  aria-label="Replay from Beginning"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={toggleMute}
                  className="p-1.5 rounded-full bg-champagne/15 text-champagne hover:bg-champagne hover:text-emerald-darkest transition-all"
                  title={isMuted ? 'Unmute' : 'Mute'}
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowCaptionsInVideo(!showCaptionsInVideo);
                  }}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] uppercase font-mono tracking-wider transition-all border ${
                    showCaptionsInVideo
                      ? 'bg-champagne/25 text-champagne border-champagne'
                      : 'bg-white/5 text-ivory/50 border-ivory/10 hover:text-ivory'
                  }`}
                  title="Toggle Editorial Captions"
                >
                  <Subtitles className="w-3 h-3" />
                  <span>{showCaptionsInVideo ? 'Captions ON' : 'Captions OFF'}</span>
                </button>

                <button
                  type="button"
                  onClick={toggleFullscreen}
                  className="p-1.5 rounded-full bg-champagne/15 text-champagne hover:bg-champagne hover:text-emerald-darkest transition-all"
                  title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
                  aria-label="Toggle Fullscreen"
                >
                  {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                </button>
              </div>
            )}

            {/* Scroll Prompt Indicator */}
            {!isVideoMode && (
              <div className="hidden sm:flex items-center gap-2 text-[11px] text-ivory/70 border-l border-champagne/20 pl-3 font-sans">
                <ChevronDown className="w-3.5 h-3.5 text-champagne animate-bounce" />
                <span>Scroll to navigate narrative</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
