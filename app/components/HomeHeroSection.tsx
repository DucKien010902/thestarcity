"use client";

import "./HomeHeroSection.module.css";
import { useEffect, useState } from "react";

const heroBackground =
  "https://res.cloudinary.com/da6f4dmql/image/upload/v1780565180/z7849719360521_8ecd4b42eb7c5a26ab042700e9a19302_k0zecn.jpg";

type HomeHeroSectionProps = {
  isActive?: boolean;
};

export function HomeHeroSection({ isActive = false }: HomeHeroSectionProps) {
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
    <section className="home-section hero-section" id="trang-chu" data-section>
      <img
        className={`hero-section__background ${
          animate ? "hero-section__background--animate" : ""
        }`}
        src={heroBackground}
        alt=""
        aria-hidden="true"
        fetchPriority="high"
      />

      <div className="hero-section__shade" />

      <div className="hero-section__content">
        <p className="hero-section__kicker">Đô thị trung tâm</p>
        <h1>The Star City</h1>
        <p className="hero-section__slogan">
          MỞ LỐI THỊNH VƯỢNG - KẾT NỐI TINH HOA
        </p>
        <p className="hero-section__place">
          Bắc Đông Quan, Hưng Yên (Thái Bình cũ)
        </p>
      </div>
    </section>
  );
}
