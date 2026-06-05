"use client";

import "./ValueSection.module.css";

import { useEffect, useState } from "react";

const valueImage =
  "https://res.cloudinary.com/da6f4dmql/image/upload/v1780632758/z7853397497283_98ae41fda570fea32e3bf178c92feec6_rj11hb.jpg";

type ValueSectionProps = {
  isActive?: boolean;
};

export function ValueSection({ isActive = false }: ValueSectionProps) {
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
      className={`home-section value-section ${
        animate ? "value-section--animate" : ""
      }`}
      id="gia-tri"
      data-section
      aria-label="Giá trị"
    >
      <img
        className="value-section__image"
        src={valueImage}
        alt="Hình ảnh giá trị dự án The Star City"
        fetchPriority="high"
      />
    </section>
  );
}
