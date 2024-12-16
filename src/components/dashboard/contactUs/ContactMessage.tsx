import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface ContactMessageProps {
  message: string;
}

const MAX_HEIGHT = 100; // hauteur maximale en pixels

export default function ContactMessage({ message }: ContactMessageProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [shouldShowButton, setShouldShowButton] = useState(false);
  const messageRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (messageRef.current) {
      setShouldShowButton(messageRef.current.scrollHeight > MAX_HEIGHT);
    }
  }, [message]);

  return (
    <div className="relative">
      <div
        className={`relative ${
          !isExpanded && shouldShowButton ? "max-h-[100px] overflow-hidden" : ""
        }`}
      >
        <p
          ref={messageRef}
          className="text-sm sm:text-base text-gray-700 whitespace-pre-wrap break-words"
        >
          {message}
        </p>
        {!isExpanded && shouldShowButton && (
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent" />
        )}
      </div>
      {shouldShowButton && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-2 flex items-center gap-1 text-meddoc-primary hover:text-meddoc-primary/80 text-sm font-medium transition-colors"
        >
          {isExpanded ? (
            <>
              <ChevronUp className="w-4 h-4" />
              Voir moins
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4" />
              Voir plus
            </>
          )}
        </button>
      )}
    </div>
  );
}
