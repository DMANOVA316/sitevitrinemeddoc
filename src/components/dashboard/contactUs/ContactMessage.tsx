import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface ContactMessageProps {
  contact: contactez_nous;
}

const MAX_HEIGHT = 100;

export default function ContactMessage({ contact }: ContactMessageProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [shouldShowButton, setShouldShowButton] = useState(false);
  const messageRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (messageRef.current) {
      setShouldShowButton(messageRef.current.scrollHeight > MAX_HEIGHT);
    }
  }, [contact.message]);

  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="relative">
        <p
          ref={messageRef}
          style={{ maxHeight: isExpanded ? 'none' : `${MAX_HEIGHT}px` }}
          className={`text-sm sm:text-base text-gray-700 whitespace-pre-wrap break-words transition-all duration-200 ${
            !isExpanded && shouldShowButton ? "overflow-hidden" : ""
          }`}
        >
          {contact.message}
        </p>
        {!isExpanded && shouldShowButton && (
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none" />
        )}
        {shouldShowButton && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center text-sm text-meddoc-primary hover:text-meddoc-primary/80 mt-2 cursor-pointer"
          >
            {isExpanded ? (
              <>
                Voir moins <ChevronUp className="ml-1 w-4 h-4" />
              </>
            ) : (
              <>
                Voir plus <ChevronDown className="ml-1 w-4 h-4" />
              </>
            )}
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600 bg-gray-50 p-3 sm:p-4 rounded-lg">
        {contact.vous_ete && (
          <div className="flex flex-col sm:flex-row sm:items-center gap-1">
            <span className="font-semibold whitespace-nowrap">Vous êtes:</span>
            <span className="ml-0 sm:ml-2 break-words">{contact.vous_ete}</span>
          </div>
        )}
        {contact.service && (
          <div className="flex flex-col sm:flex-row sm:items-center gap-1">
            <span className="font-semibold whitespace-nowrap">Service:</span>
            <span className="ml-0 sm:ml-2 break-words">{contact.service}</span>
          </div>
        )}
        {contact.contact && (
          <div className="flex flex-col sm:flex-row sm:items-center gap-1">
            <span className="font-semibold whitespace-nowrap">Téléphone:</span>
            <span className="ml-0 sm:ml-2">{contact.contact}</span>
          </div>
        )}
        <div className="flex flex-col sm:flex-row sm:items-center gap-1">
          <span className="font-semibold whitespace-nowrap">Email:</span>
          <span className="ml-0 sm:ml-2 break-all">{contact.email}</span>
        </div>
      </div>
    </div>
  );
}
