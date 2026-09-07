import React, { useRef, useEffect, useState } from 'react';

interface ScrollVelocityProps {
  texts: string[];
  velocity?: number;
  className?: string;
  numCopies?: number;
  textClassName?: string;
}

export const ScrollVelocity: React.FC<ScrollVelocityProps> = ({
  texts,
  velocity = 40,
  className = '',
  numCopies = 4,
  textClassName = '',
}) => {
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const lastScrollY = useRef(0);
  const lastScrollTime = useRef(performance.now());
  const xOffsetRef1 = useRef(0);
  const xOffsetRef2 = useRef(0);
  const scrollerRef1 = useRef<HTMLDivElement>(null);
  const scrollerRef2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const now = performance.now();
      const currentScrollY = window.scrollY;
      const dt = Math.max(now - lastScrollTime.current, 16);
      const dy = currentScrollY - lastScrollY.current;
      const calculatedVel = (dy / dt) * 80;

      lastScrollY.current = currentScrollY;
      lastScrollTime.current = now;
      setScrollVelocity(calculatedVel);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    let animationId: number;
    let lastTime = performance.now();

    const loop = (currentTime: number) => {
      const delta = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      // Decay scroll velocity smoothly
      const activeVel = velocity + scrollVelocity;

      xOffsetRef1.current -= activeVel * delta * 1.5;
      xOffsetRef2.current += activeVel * delta * 1.2;

      // Keep within bounds
      if (scrollerRef1.current) {
        const width = scrollerRef1.current.scrollWidth / (numCopies * 2);
        if (Math.abs(xOffsetRef1.current) >= width) {
          xOffsetRef1.current = 0;
        }
        scrollerRef1.current.style.transform = `translateX(${xOffsetRef1.current}px)`;
      }

      if (scrollerRef2.current) {
        const width = scrollerRef2.current.scrollWidth / (numCopies * 2);
        if (Math.abs(xOffsetRef2.current) >= width) {
          xOffsetRef2.current = 0;
        }
        scrollerRef2.current.style.transform = `translateX(${-xOffsetRef2.current}px)`;
      }

      animationId = requestAnimationFrame(loop);
    };

    animationId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationId);
  }, [velocity, scrollVelocity, numCopies]);

  return (
    <div className={`overflow-hidden py-4 select-none bg-[#050912]/80 border-y border-cyan-950/60 ${className}`}>
      {/* Row 1 - Moves Left */}
      <div className="flex whitespace-nowrap overflow-hidden">
        <div ref={scrollerRef1} className="flex whitespace-nowrap items-center will-change-transform">
          {Array.from({ length: numCopies * 2 }).map((_, i) => (
            <div key={i} className="flex items-center gap-6 px-4">
              <span className={`text-sm sm:text-base md:text-lg font-mono font-bold tracking-widest text-cyan-400/90 ${textClassName}`}>
                {texts[0]}
              </span>
              <span className="text-cyan-500/40 text-xs">◆</span>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 - Moves Right */}
      {texts.length > 1 && (
        <div className="flex whitespace-nowrap overflow-hidden mt-2">
          <div ref={scrollerRef2} className="flex whitespace-nowrap items-center will-change-transform">
            {Array.from({ length: numCopies * 2 }).map((_, i) => (
              <div key={i} className="flex items-center gap-6 px-4">
                <span className={`text-xs sm:text-sm font-mono font-semibold tracking-wider text-emerald-400/80 ${textClassName}`}>
                  {texts[1]}
                </span>
                <span className="text-emerald-500/40 text-xs">■</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
