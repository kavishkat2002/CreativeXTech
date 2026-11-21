"use client";

import { useEffect, useState } from "react";

export function LoaderVisual({
  route = false,
  progress = 0,
  word = "LOADING",
}: {
  route?: boolean;
  progress?: number;
  word?: string;
}) {
  const getStatusMessage = (p: number) => {
    if (route) return "LOADING VIEW ...";
    if (p < 25) return "CONNECTING SECURE GATEWAY ...";
    if (p < 55) return "LOADING ENTERPRISE PLATFORM ...";
    if (p < 85) return "VERIFYING PRODUCTION ASSETS ...";
    return "CREATIVEX SYSTEM READY ...";
  };

  const statusText = getStatusMessage(progress);
  const formattedPercent = String(Math.min(100, Math.max(0, progress))).padStart(3, "0");

  return (
    <div
      className={`cx-loader${route ? " cx-route-loader" : ""}`}
      role="status"
      aria-live="polite"
      aria-label="Creativex Technology website loading"
    >
      <div className="cx-hud-grid" aria-hidden="true" />

      {/* 4 Precision Corner Reticles */}
      <div className="cx-corner cx-tl" aria-hidden="true" />
      <div className="cx-corner cx-tr" aria-hidden="true" />
      <div className="cx-corner cx-bl" aria-hidden="true" />
      <div className="cx-corner cx-br" aria-hidden="true" />

      {/* Side Crosshair Reticles */}
      <div className="cx-side-tick cx-tick-left" aria-hidden="true">
        <span>+ 01</span>
      </div>
      <div className="cx-side-tick cx-tick-right" aria-hidden="true">
        <span>02 +</span>
      </div>

      {/* Technical Metadata in Corners */}
      <div className="cx-hud-meta cx-meta-tl" aria-hidden="true">
        <span>SYS.01 // COLOMBO.HQ</span>
      </div>
      <div className="cx-hud-meta cx-meta-tr" aria-hidden="true">
        <span className="cx-dot-live" />
        <span>STATUS: ONLINE</span>
      </div>
      <div className="cx-hud-meta cx-meta-bl" aria-hidden="true">
        <span>CREATIVEX // ENTERPRISE ARCHITECTURE</span>
      </div>
      <div className="cx-hud-meta cx-meta-br" aria-hidden="true">
        <span>SECURE PROTOCOL</span>
      </div>

      {/* Center Cybernetic Wordmark with Animated Wave Sweep */}
      <div className="cx-center-stage">
        <div className="cx-word-container" aria-hidden="true">
          <div className="cx-word-base">{word}</div>
          <div className="cx-word-wave">{word}</div>
        </div>

        {/* Sub-brand Label */}
        <div className="cx-brand-sub" aria-hidden="true">
          CREATIVEX <strong>TECHNOLOGY</strong>
        </div>

        {/* High-Tech Progress Bar */}
        <div className="cx-progress-frame" aria-hidden="true">
          <div
            className="cx-progress-fill"
            style={route ? undefined : { width: `${progress}%` }}
          />
        </div>

        {/* Technical Status & Readout */}
        <div className="cx-status-line">
          <span>{statusText}</span>
          <strong className="cx-percent-display">
            {route ? "[ ··· ]" : `[ ${formattedPercent}% ]`}
          </strong>
        </div>
      </div>

      <span className="sr-only">Loading Creativex Technology Website</span>
    </div>
  );
}

export function SiteLoader() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (window.sessionStorage.getItem("creativex-loader-seen") === "true") {
      document.documentElement.classList.add("cx-loader-seen");
      const skip = window.setTimeout(() => setVisible(false), 0);
      return () => window.clearTimeout(skip);
    }

    window.sessionStorage.setItem("creativex-loader-seen", "true");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = reducedMotion ? 200 : 1600;
    const startedAt = performance.now();
    document.body.classList.add("cx-is-loading");

    const interval = window.setInterval(() => {
      const elapsed = performance.now() - startedAt;
      const next = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(next);
    }, reducedMotion ? 40 : 24);

    const unlock = window.setTimeout(() => {
      document.body.classList.remove("cx-is-loading");
    }, duration);

    const remove = window.setTimeout(() => {
      setVisible(false);
      document.documentElement.classList.add("cx-loader-seen");
    }, duration + (reducedMotion ? 80 : 500));

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(unlock);
      window.clearTimeout(remove);
      document.body.classList.remove("cx-is-loading");
    };
  }, []);

  return visible ? <LoaderVisual progress={progress} /> : null;
}
