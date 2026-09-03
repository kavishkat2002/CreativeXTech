"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show after a slight delay to allow entrance animations
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <a
      href="https://wa.me/94762345336"
      target="_blank"
      rel="noopener noreferrer"
      className={`whatsapp-fab ${isVisible ? "visible" : ""}`}
      aria-label="Chat with us on WhatsApp"
    >
      <MessageCircle className="whatsapp-icon" fill="currentColor" size={28} strokeWidth={1} />
    </a>
  );
}
