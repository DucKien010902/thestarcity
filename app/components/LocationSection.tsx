"use client";

import "./LocationSection.module.css";

import { useEffect, useState } from "react";

const locationImage =
  "https://res.cloudinary.com/da6f4dmql/image/upload/v1780627665/z7849720490764_965c3010a058b06d06a1ab5ffc3922db_onorlw.jpg";

const locationPoints = [
  {
    body: "Từ The Star City, cư dân có thể nhanh chóng kết nối tới khu hành chính, trường học, chợ trung tâm và các trục giao thương quan trọng của khu vực.",
  },
  {
    body: "Vị trí dự án tạo nên thế cân bằng giữa sự thuận tiện mỗi ngày và cảm giác sống thoáng đãng, phù hợp cho cả nhu cầu an cư lẫn khai thác thương mại.",
  },
  {
    body: "Khi hạ tầng khu vực tiếp tục hoàn thiện, lợi thế kết nối này sẽ là nền tảng bền vững cho giá trị ở thực cũng như tiềm năng gia tăng dài hạn.",
  },
];

type LocationSectionProps = {
  isActive?: boolean;
};

export function LocationSection({ isActive = false }: LocationSectionProps) {
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
    }, 140);

    return () => window.clearTimeout(timer);
  }, [isActive]);

  return (
    <section
      className={`home-section location-section ${
        animate ? "location-section--animate" : ""
      }`}
      id="vi-tri"
      data-section
    >
      <div className="location-section__visual">
        <img
          className="location-section__image"
          src={locationImage}
          alt="Vị trí dự án The Star City"
          fetchPriority="high"
        />
        <div className="location-section__visual-shade" aria-hidden="true" />
        <div className="location-section__badge">
          <span>Tọa độ chiến lược</span>
          <strong>Bắc Đông Quan, Hưng Yên</strong>
        </div>
      </div>

      <div className="location-section__content">
        <p className="location-section__eyebrow">Vị trí dự án</p>
        <h2>Tâm điểm kết nối của một nhịp sống mới</h2>

        <p className="location-section__lead">
          The Star City được định vị như một tâm điểm giao thoa giữa nhịp sống
          đô thị hiện đại và hệ tiện ích bản địa quen thuộc, tạo ra lợi thế rõ
          rệt cho cả an cư lẫn đầu tư dài hạn.
        </p>

        <div className="location-section__story-grid">
          {locationPoints.map((point, index) => (
            <p
              className="location-section__story"
              key={`${index}-${point.body.slice(0, 24)}`}
              style={{ transitionDelay: `${index * 90}ms` }}
            >
              {point.body}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
