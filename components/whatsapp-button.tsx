"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

let globalAudioCtx: any = null;
let isAudioInitialized = false;

function initAudio() {
  if (isAudioInitialized) return;
  const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
  if (!AudioContextClass) return;
  try {
    globalAudioCtx = new AudioContextClass();
    // Play silent buffer to unlock audio
    const buffer = globalAudioCtx.createBuffer(1, 1, 22050);
    const source = globalAudioCtx.createBufferSource();
    source.buffer = buffer;
    source.connect(globalAudioCtx.destination);
    source.start(0);
    isAudioInitialized = true;
  } catch (e) {}

  window.removeEventListener("mousedown", initAudio);
  window.removeEventListener("touchstart", initAudio);
  window.removeEventListener("keydown", initAudio);
}

export function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHopping, setIsHopping] = useState(false);
  const pathname = usePathname();

  const isAdmin = pathname?.startsWith("/admin");

  useEffect(() => {
    if (isAdmin) return;

    // Listen for first interaction to unlock audio
    window.addEventListener("mousedown", initAudio);
    window.addEventListener("touchstart", initAudio);
    window.addEventListener("keydown", initAudio);

    // Show after a slight delay
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 1500);

    // Audio synthesis function for a clean "pop" notification
    const playPopSound = () => {
      if (!globalAudioCtx || globalAudioCtx.state === "suspended") return;
      try {
        const osc = globalAudioCtx.createOscillator();
        const gain = globalAudioCtx.createGain();

        osc.connect(gain);
        gain.connect(globalAudioCtx.destination);

        osc.type = "sine";
        osc.frequency.setValueAtTime(600, globalAudioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1200, globalAudioCtx.currentTime + 0.05);

        gain.gain.setValueAtTime(0, globalAudioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(0.2, globalAudioCtx.currentTime + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, globalAudioCtx.currentTime + 0.1);

        osc.start(globalAudioCtx.currentTime);
        osc.stop(globalAudioCtx.currentTime + 0.1);
      } catch (e) {
        // Ignore errors if audio is unavailable
      }
    };

    // Trigger animation and sound every 3 seconds
    const interval = setInterval(() => {
      setIsHopping(true);
      playPopSound();

      // Reset animation class so it can trigger again
      setTimeout(() => {
        setIsHopping(false);
      }, 400); // 400ms matches the CSS animation duration
    }, 3000);

    return () => {
      clearTimeout(showTimer);
      clearInterval(interval);
    };
  }, [isAdmin]);

  // If we are in the admin section, do not render the WhatsApp button
  if (isAdmin) {
    return null;
  }

  return (
    <a
      href="https://wa.me/94762345336"
      target="_blank"
      rel="noopener noreferrer"
      className={`whatsapp-fab ${isVisible ? "visible" : ""} ${isHopping ? "hop" : ""}`}
      aria-label="Chat with us on WhatsApp"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="whatsapp-icon"
        fill="currentColor"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.66-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
      </svg>
    </a>
  );
}
