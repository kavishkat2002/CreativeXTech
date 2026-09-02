"use client";

import { useEffect, useState } from "react";

export function LoaderVisual({ route = false, progress = 0 }: { route?: boolean; progress?: number }) {
  return (
    <div className={`cx-loader${route ? " cx-route-loader" : ""}`} role="status" aria-live="polite" aria-label="CreativeX website loading">
      <div className="cx-loader-grid" aria-hidden="true" />
      <div className="cx-loader-top">
        <span>CREATIVEX / SYSTEM</span>
        <span>INTELLIGENCE IN MOTION</span>
      </div>

      <div className="cx-loader-core" aria-hidden="true">
        <div className="cx-loader-orbit cx-loader-orbit-one" />
        <div className="cx-loader-orbit cx-loader-orbit-two" />
        <div className="cx-loader-cross"><i /><i /></div>
        <div className="cx-loader-scan" />
        <span className="cx-loader-node cx-loader-node-one" />
        <span className="cx-loader-node cx-loader-node-two" />
        <span className="cx-loader-node cx-loader-node-three" />
      </div>

      <div className="cx-loader-brand" aria-hidden="true">CREATIVE<span>X</span></div>

      <div className="cx-loader-bottom">
        <div className="cx-loader-status"><i /><span>{route ? "Preparing next view" : "Connecting intelligence"}</span></div>
        <div className="cx-loader-progress"><i style={route ? undefined : { width: `${progress}%` }} /></div>
        <span>{route ? "···" : String(progress).padStart(3, "0")} / 100</span>
      </div>
      <span className="sr-only">Loading CreativeX Technology AI</span>
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
    const duration = reducedMotion ? 180 : 1220;
    const startedAt = performance.now();
    document.body.classList.add("cx-is-loading");

    const interval = window.setInterval(() => {
      const elapsed = performance.now() - startedAt;
      const next = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(next);
    }, reducedMotion ? 40 : 28);

    const unlock = window.setTimeout(() => document.body.classList.remove("cx-is-loading"), duration);
    const remove = window.setTimeout(() => {
      setVisible(false);
      document.documentElement.classList.add("cx-loader-seen");
    }, duration + (reducedMotion ? 60 : 430));

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(unlock);
      window.clearTimeout(remove);
      document.body.classList.remove("cx-is-loading");
    };
  }, []);

  return visible ? <LoaderVisual progress={progress} /> : null;
}
