"use client";

import "./EcosystemSection.module.css";

import { useEffect, useMemo, useState, type CSSProperties } from "react";

type EcosystemAmenity = {
  id: number;
  title: string;
  image: string;
};

const ecosystemAmenities: EcosystemAmenity[] = [
  {
    id: 1,
    title: "Spa massage - xông hơi",
    image:
      "https://res.cloudinary.com/da6f4dmql/image/upload/v1780645795/z7853448996805_3c465d5bb6abdcdf053c7a095c328db9_rwvm3c.jpg",
  },
  {
    id: 2,
    title: "Nhà hàng ẩm thực đồng quê",
    image:
      "https://res.cloudinary.com/da6f4dmql/image/upload/v1780649303/z7853732229953_e2371abda2154c718453817cc5ab7f5b_vpj31v.jpg",
  },
  {
    id: 3,
    title: "Siêu thị tiện ích",
    image:
      "https://res.cloudinary.com/da6f4dmql/image/upload/v1780565180/z7849719360521_8ecd4b42eb7c5a26ab042700e9a19302_k0zecn.jpg",
  },
  {
    id: 4,
    title: "Khu café thư giãn",
    image:
      "https://res.cloudinary.com/da6f4dmql/image/upload/v1780562901/z7849734841430_cabf0a2feb7ef9661ebc298f6ef85ff4_yr1xhz.jpg",
  },
  {
    id: 5,
    title: "Phòng gym hiện đại",
    image:
      "https://res.cloudinary.com/da6f4dmql/image/upload/v1780627665/z7849720490764_965c3010a058b06d06a1ab5ffc3922db_onorlw.jpg",
  },
  {
    id: 6,
    title: "Khu yoga ngoài trời",
    image:
      "https://thestarcity.vn/wp-content/uploads/2024/12/DUONG-TU-TREN-CAO.png",
  },
  {
    id: 7,
    title: "Sân chơi trẻ em",
    image:
      "https://res.cloudinary.com/da6f4dmql/image/upload/v1780565180/z7849719360521_8ecd4b42eb7c5a26ab042700e9a19302_k0zecn.jpg",
  },
  {
    id: 8,
    title: "Khu BBQ sân vườn",
    image:
      "https://res.cloudinary.com/da6f4dmql/image/upload/v1780562901/z7849734841430_cabf0a2feb7ef9661ebc298f6ef85ff4_yr1xhz.jpg",
  },
  {
    id: 9,
    title: "Vườn cảnh quan bốn mùa",
    image:
      "https://res.cloudinary.com/da6f4dmql/image/upload/v1780627665/z7849720490764_965c3010a058b06d06a1ab5ffc3922db_onorlw.jpg",
  },
  {
    id: 10,
    title: "Quảng trường sinh hoạt cộng đồng",
    image:
      "https://thestarcity.vn/wp-content/uploads/2024/12/DUONG-TU-TREN-CAO.png",
  },
  {
    id: 11,
    title: "Sân thể thao đa năng",
    image:
      "https://res.cloudinary.com/da6f4dmql/image/upload/v1780565180/z7849719360521_8ecd4b42eb7c5a26ab042700e9a19302_k0zecn.jpg",
  },
  {
    id: 12,
    title: "Vườn thiền tĩnh tại",
    image:
      "https://res.cloudinary.com/da6f4dmql/image/upload/v1780562901/z7849734841430_cabf0a2feb7ef9661ebc298f6ef85ff4_yr1xhz.jpg",
  },
  {
    id: 13,
    title: "Khu đọc sách ngoài trời",
    image:
      "https://res.cloudinary.com/da6f4dmql/image/upload/v1780627665/z7849720490764_965c3010a058b06d06a1ab5ffc3922db_onorlw.jpg",
  },
  {
    id: 14,
    title: "Sân pickleball",
    image:
      "https://thestarcity.vn/wp-content/uploads/2024/12/DUONG-TU-TREN-CAO.png",
  },
  {
    id: 15,
    title: "Bể bơi ngoài trời",
    image:
      "https://res.cloudinary.com/da6f4dmql/image/upload/v1780565180/z7849719360521_8ecd4b42eb7c5a26ab042700e9a19302_k0zecn.jpg",
  },
];

const AUTO_ADVANCE_DELAY = 5000;

type EcosystemSectionProps = {
  isActive?: boolean;
};

function normalizeIndex(index: number) {
  const length = ecosystemAmenities.length;
  return ((index % length) + length) % length;
}

export function EcosystemSection({ isActive = false }: EcosystemSectionProps) {
  const [animate, setAnimate] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!isActive) {
      setAnimate(false);
      return;
    }

    const timer = window.setTimeout(() => {
      setAnimate(true);
    }, 140);

    return () => window.clearTimeout(timer);
  }, [isActive]);

  useEffect(() => {
    if (!isActive) return;

    const interval = window.setInterval(() => {
      setActiveIndex((current) => normalizeIndex(current + 1));
    }, AUTO_ADVANCE_DELAY);

    return () => window.clearInterval(interval);
  }, [isActive]);

  const visibleAmenities = useMemo(() => {
    return [-2, -1, 0, 1, 2].map((offset) => {
      const index = normalizeIndex(activeIndex + offset);

      return {
        amenity: ecosystemAmenities[index],
        index,
        offset,
      };
    });
  }, [activeIndex]);

  const curveOffsets: Record<number, string> = {
    [-2]: "54px",
    [-1]: "26px",
    0: "-18px",
    1: "18px",
    2: "46px",
  };

  return (
    <section
      className={`home-section ecosystem-section ${
        animate ? "ecosystem-section--animate" : ""
      }`}
      id="he-sinh-thai"
      data-section
    >
      <div className="ecosystem-section__bg">
        {ecosystemAmenities.map((amenity, index) => (
          <img
            key={amenity.id}
            className={`ecosystem-section__image ${
              index === activeIndex ? "ecosystem-section__image--active" : ""
            }`}
            src={amenity.image}
            alt={amenity.title}
          />
        ))}
      </div>

      <div className="ecosystem-section__shade" aria-hidden="true" />

      <div className="ecosystem-section__headline">
        <h2>
          <span>Các tiện ích nội khu và hệ</span>
          <span>sinh thái công viên</span>
        </h2>
      </div>

      <div className="ecosystem-section__circle" aria-hidden="true" />

      <div className="ecosystem-section__arc" aria-hidden="true">
        <span className="ecosystem-section__arc-dot ecosystem-section__arc-dot--1" />
        <span className="ecosystem-section__arc-dot ecosystem-section__arc-dot--2" />
        <span className="ecosystem-section__arc-dot ecosystem-section__arc-dot--3" />
        <span className="ecosystem-section__arc-dot ecosystem-section__arc-dot--4" />
        <span className="ecosystem-section__arc-dot ecosystem-section__arc-dot--5" />
      </div>

      <div className="ecosystem-section__list">
        {visibleAmenities.map(({ amenity, index, offset }) => {
          const active = offset === 0;

          return (
            <button
              key={`${amenity.id}-${offset}`}
              type="button"
              className={`ecosystem-section__item ${
                active ? "ecosystem-section__item--active" : ""
              }`}
              onClick={() => setActiveIndex(index)}
              style={
                {
                  "--ecosystem-item-offset": curveOffsets[offset] ?? "0px",
                } as CSSProperties
              }
            >
              <span className="ecosystem-section__number">
                {String(amenity.id).padStart(2, "0")}
              </span>

              <span className="ecosystem-section__line" />

              <span className="ecosystem-section__title">{amenity.title}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
