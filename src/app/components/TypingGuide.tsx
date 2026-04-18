// src/components/TypingGuide.tsx
import React, { useState, useEffect } from 'react';

interface TypingGuideProps {
  text: string;        // The full paragraph text
  speed?: number;      // milliseconds per character (default 30)
  onComplete?: () => void;
}

export const TypingGuide: React.FC<TypingGuideProps> = ({ text, speed = 30, onComplete }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[index]);
        setIndex(prev => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    } else if (!isComplete) {
      setIsComplete(true);
      onComplete?.();
    }
  }, [index, text, speed, onComplete, isComplete]);

  return (
    <div className="text-sm text-blue-100 leading-relaxed">
      {displayedText}
      {!isComplete && (
        <span className="inline-block w-0.5 h-4 bg-blue-300 ml-0.5 animate-pulse"> </span>
      )}
    </div>
  );
};