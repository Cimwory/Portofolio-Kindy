import React, { useState, useEffect, useRef, useMemo } from 'react';

export interface DecryptedTextProps {
  text: string;
  speed?: number;
  maxIterations?: number;
  sequential?: boolean;
  revealDirection?: 'start' | 'end' | 'center';
  characters?: string;
  className?: string;
  encryptedClassName?: string;
  animateOn?: 'view' | 'hover';
}

const DEFAULT_CHARS = '0123456789ABCDEF!@#$%&*<>[]{}~/\\;:+=-_?';

export const DecryptedText: React.FC<DecryptedTextProps> = ({
  text,
  speed = 40,
  maxIterations = 12,
  sequential = true,
  revealDirection = 'start',
  characters = DEFAULT_CHARS,
  className = '',
  encryptedClassName = 'text-cyan-400 opacity-70',
  animateOn = 'view',
}) => {
  const [displayText, setDisplayText] = useState(text);
  const [isAnimating, setIsAnimating] = useState(false);
  const [revealedIndices, setRevealedIndices] = useState<Set<number>>(new Set());
  const containerRef = useRef<HTMLSpanElement>(null);
  const hasAnimatedRef = useRef(false);

  const availableChars = useMemo(() => characters.split(''), [characters]);

  const triggerAnimation = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setRevealedIndices(new Set());

    let iteration = 0;
    const len = text.length;
    let currentRevealed = new Set<number>();

    const interval = setInterval(() => {
      iteration++;

      if (sequential) {
        const revealCount = Math.floor((iteration / maxIterations) * len);
        const nextRevealed = new Set<number>();
        for (let i = 0; i < revealCount; i++) {
          nextRevealed.add(i);
        }
        currentRevealed = nextRevealed;
      }

      const scrambled = text
        .split('')
        .map((char, idx) => {
          if (char === ' ') return ' ';
          if (currentRevealed.has(idx) || iteration >= maxIterations) {
            return text[idx];
          }
          return availableChars[Math.floor(Math.random() * availableChars.length)];
        })
        .join('');

      setDisplayText(scrambled);
      setRevealedIndices(new Set(currentRevealed));

      if (iteration >= maxIterations) {
        clearInterval(interval);
        setDisplayText(text);
        setIsAnimating(false);
      }
    }, speed);
  };

  useEffect(() => {
    if (animateOn !== 'view') return;
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          triggerAnimation();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [text, animateOn]);

  return (
    <span
      ref={containerRef}
      onMouseEnter={animateOn === 'hover' ? triggerAnimation : undefined}
      className={`inline-block font-mono ${className}`}
    >
      {displayText.split('').map((char, index) => {
        const isRevealed = revealedIndices.has(index) || !isAnimating;
        return (
          <span
            key={index}
            className={!isRevealed ? encryptedClassName : undefined}
          >
            {char}
          </span>
        );
      })}
    </span>
  );
};

export default DecryptedText;
