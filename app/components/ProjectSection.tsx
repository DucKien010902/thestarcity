"use client";

import "./ProjectSection.module.css";

import { useEffect, useState } from "react";

const projectImage =
  "https://res.cloudinary.com/da6f4dmql/image/upload/v1780626738/b%E1%BA%A3n_%C4%91%E1%BB%93_d%E1%BB%B1_%C3%A1n_CH%C3%88N_th%C3%B4ng_s%E1%BB%91_file_%E1%BA%A3nh-01_gpjv5n.jpg";

type ProjectSectionProps = {
  isActive?: boolean;
};

export function ProjectSection({ isActive = false }: ProjectSectionProps) {
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
      className={`home-section project-section ${
        animate ? "project-section--animate" : ""
      }`}
      id="du-an"
      data-section
      aria-label="Dự án"
    >
      <img
        className="project-section__image"
        src={projectImage}
        alt="Phối cảnh dự án The Star City"
        fetchPriority="high"
      />
      <div className="project-section__veil" aria-hidden="true" />

      <a className="project-section__cta" href="#tong-mat-bang">
        <span>Mặt bằng dự án</span>
      </a>
    </section>
  );
}
