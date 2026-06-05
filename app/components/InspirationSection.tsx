"use client";

import "./InspirationSection.module.css";
import { useEffect, useState } from "react";

const inspirationBackground =
  "https://res.cloudinary.com/da6f4dmql/image/upload/v1780562901/z7849734841430_cabf0a2feb7ef9661ebc298f6ef85ff4_yr1xhz.jpg";

type InspirationSectionProps = {
  isActive?: boolean;
};

export function InspirationSection({
  isActive = false,
}: InspirationSectionProps) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (!isActive) {
      setAnimate(false);
      return;
    }

    setAnimate(false);

    const timer = window.setTimeout(() => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setAnimate(true);
        });
      });
    }, 120);

    return () => window.clearTimeout(timer);
  }, [isActive]);

  return (
    <section
      className="home-section inspiration-section"
      id="cam-hung"
      aria-label="Cảm hứng"
      data-section
    >
      <img
        className={`inspiration-section__background ${
          animate ? "inspiration-section__background--animate" : ""
        }`}
        src={inspirationBackground}
        alt=""
        aria-hidden="true"
        fetchPriority="high"
      />
      <div className="inspiration-section__shade" aria-hidden="true" />
    </section>
  );
}
