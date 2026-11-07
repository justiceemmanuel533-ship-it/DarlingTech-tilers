import React, { useState, useRef, useCallback } from 'react';
import { Sparkles, SlidersHorizontal, ArrowLeftRight } from 'lucide-react';

export const BeforeAfterSlider: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef<boolean>(false);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.min(100, Math.max(0, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleMouseDown = () => {
    isDragging.current = true;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  return (
    <section className="py-20 bg-neutral-950 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-2 max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Transformation Comparison</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              From Rough Builder’s Screed to Mirror-Gloss Porcelain
            </h2>
            <p className="text-sm text-neutral-400">
              Drag the interactive slider to see how Darlingtech Tilers levels uneven builder slabs and installs razor-sharp porcelain tiles.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-neutral-400">
            <ArrowLeftRight className="w-4 h-4 text-amber-400" />
            <span>Drag slider horizontally</span>
          </div>
        </div>

        {/* Interactive Comparison Viewport */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchMove={handleTouchMove}
          className="relative w-full h-[450px] sm:h-[520px] rounded-2xl overflow-hidden select-none cursor-ew-resize border border-neutral-800 shadow-2xl bg-neutral-900"
        >
          {/* AFTER IMAGE (Finished Darlingtech Porcelain Floor) */}
          <div className="absolute inset-0">
            <img
              src="/src/assets/images/hero_luxury_tiling_1794068865341.jpg"
              alt="After Darlingtech Tilers installation - Mirror finish Italian porcelain"
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-4 right-4 bg-emerald-950/85 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-emerald-500/40 text-emerald-300 text-xs font-bold tracking-wide shadow-md">
              AFTER: Darlingtech Precision Slabs
            </div>
          </div>

          {/* BEFORE IMAGE (Simulated Raw Screed Texture using CSS Filter & Pattern) */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${sliderPosition}%` }}
          >
            <div className="relative w-[100vw] max-w-7xl h-full">
              <img
                src="/src/assets/images/tiler_craftsman_at_work_1794068866647.jpg"
                alt="Before Darlingtech Tilers - Raw screed and layout preparation"
                className="w-full h-full object-cover object-center grayscale contrast-125 brightness-75"
                referrerPolicy="no-referrer"
              />
              {/* Overlay tint representing raw concrete screed */}
              <div className="absolute inset-0 bg-stone-900/60 mix-blend-multiply" />
              <div className="absolute top-4 left-4 bg-neutral-950/85 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-neutral-700 text-neutral-300 text-xs font-bold tracking-wide shadow-md">
                BEFORE: Raw Builder Screed & Prep
              </div>
            </div>
          </div>

          {/* Divider Line & Handle */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-amber-400 z-30 pointer-events-none"
            style={{ left: `${sliderPosition}%` }}
          >
            <div
              onMouseDown={handleMouseDown}
              onTouchStart={handleMouseDown}
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-amber-500 text-neutral-950 flex items-center justify-center shadow-xl shadow-amber-500/50 pointer-events-auto cursor-grab active:cursor-grabbing border-2 border-white"
            >
              <SlidersHorizontal className="w-4 h-4 rotate-90" />
            </div>
          </div>
        </div>

        {/* Technical Explanatory Notes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="p-4 rounded-xl bg-neutral-900/40 border border-neutral-800 text-xs">
            <span className="font-semibold text-white block mb-1">1. Laser Screed Correction</span>
            <p className="text-neutral-400 leading-relaxed">
              We check the builder's concrete slab with cross-line lasers to eliminate high points and fill hollow hollows prior to laying expensive tiles.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-neutral-900/40 border border-neutral-800 text-xs">
            <span className="font-semibold text-white block mb-1">2. 100% Back-Butter Coverage</span>
            <p className="text-neutral-400 leading-relaxed">
              Every porcelain tile receives a flat coat of C2TE polymer adhesive on its back to prevent hollow tapping sounds and stress cracks.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-neutral-900/40 border border-neutral-800 text-xs">
            <span className="font-semibold text-white block mb-1">3. Mechanical Leveling Clips</span>
            <p className="text-neutral-400 leading-relaxed">
              Precision leveling wedges lock tile corners completely flat while the adhesive cures, guaranteeing zero edge lippage across large rooms.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
