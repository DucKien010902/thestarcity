"use client";

import "./ParkSection.module.css";

import { useEffect, useMemo, useState } from "react";

type ParkSlide = {
  image: string;
  title: string;
};

type ParkCategory = {
  id: "park-ecosystem" | "inner-amenities";
  buttonLabel: string;
  displayTitle: string;
  description: string;
  slides: ParkSlide[];
};

const parkCategories: ParkCategory[] = [
  {
    id: "park-ecosystem",
    buttonLabel: "Hệ sinh thái công viên",
    displayTitle: "Hệ sinh thái công viên",
    description:
      "Hệ sinh thái công viên và tiện ích nội khu tại The Star City được kiến tạo theo định hướng sống xanh hiện đại, hội tụ không gian cảnh quan trong lành cùng chuỗi tiện ích đồng bộ, mang đến trải nghiệm an cư thư thái, tiện nghi và nâng tầm chất lượng sống cho cộng đồng cư dân.",
    slides: [
      {
        image:
          "https://res.cloudinary.com/da6f4dmql/image/upload/v1780564487/z7853432715642_dd05af2bbb3585083f479b106d4b0928_kmts3k.jpg",
        title: "Hệ sinh thái công viên",
      },
      {
        image:
          "https://res.cloudinary.com/da6f4dmql/image/upload/v1780645597/z7853432197192_319eb66b849ce23e101170181cec1989_ysu3b8.jpg",
        title: "Hệ sinh thái công viên",
      },
      {
        image:
          "https://res.cloudinary.com/da6f4dmql/image/upload/v1780645665/z7853432443128_88b4b59f2b9909f9deeda392b43bb74f_wnjc0l.jpg",
        title: "Hệ sinh thái công viên",
      },
      {
        image:
          "https://res.cloudinary.com/da6f4dmql/image/upload/v1780645676/z7853431509774_c6ecd65255ff0806526d3b7d53206637_dqtnvq.jpg",
        title: "Hệ sinh thái công viên",
      },
    ],
  },
  {
    id: "inner-amenities",
    buttonLabel: "Tiện ích nội khu",
    displayTitle: "Tiện ích nội khu",
    description:
      "Chuỗi tiện ích nội khu được quy hoạch đồng bộ, giúp cư dân dễ dàng tận hưởng các trải nghiệm thư giãn, vận động, vui chơi, kết nối cộng đồng và dịch vụ thường nhật chỉ trong vài bước chân.",
    slides: [
      {
        image:
          "https://res.cloudinary.com/da6f4dmql/image/upload/v1780645794/z7853443576802_164448aeab48ee70d28b4fdcf3dd44b9_qozglg.jpg",
        title: "Tiện ích nội khu",
      },
      {
        image:
          "https://res.cloudinary.com/da6f4dmql/image/upload/v1780645803/z7853448959388_8417a2277f8756fb037ab3d3aff1fea0_yqptru.jpg",
        title: "Tiện ích nội khu",
      },
      {
        image:
          "https://res.cloudinary.com/da6f4dmql/image/upload/v1780645796/z7853448980185_18c363b7a997ec2a5607561c51576f89_u6oe4u.jpg",
        title: "Tiện ích nội khu",
      },
      {
        image:
          "https://res.cloudinary.com/da6f4dmql/image/upload/v1780645795/z7853448996805_3c465d5bb6abdcdf053c7a095c328db9_rwvm3c.jpg",
        title: "Tiện ích nội khu",
      },
    ],
  },
];

const AUTOPLAY_DELAY = 6000;

type ParkSectionProps = {
  isActive?: boolean;
};

export function ParkSection({ isActive = false }: ParkSectionProps) {
  const [animate, setAnimate] = useState(false);

  const [activeCategoryId, setActiveCategoryId] =
    useState<ParkCategory["id"]>("park-ecosystem");

  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const activeCategory = useMemo(
    () =>
      parkCategories.find((category) => category.id === activeCategoryId) ??
      parkCategories[0],
    [activeCategoryId]
  );

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
    }, 100);

    return () => window.clearTimeout(timer);
  }, [isActive]);

  useEffect(() => {
    setActiveSlideIndex(0);
  }, [activeCategoryId]);

  useEffect(() => {
    if (!isActive) return;

    const interval = window.setInterval(() => {
      setActiveSlideIndex((currentIndex) =>
        currentIndex + 1 >= activeCategory.slides.length
          ? 0
          : currentIndex + 1
      );
    }, AUTOPLAY_DELAY);

    return () => window.clearInterval(interval);
  }, [activeCategory.slides.length, isActive]);

  const goToSlide = (nextIndex: number) => {
    const total = activeCategory.slides.length;
    setActiveSlideIndex((nextIndex + total) % total);
  };

  return (
    <section
      className={`home-section park-section ${
        animate ? "park-section--animate" : ""
      }`}
      id="tien-ich-cong-vien"
      data-section
    >
      <div className="park-section__content">
        <div className="park-section__decor park-section__decor--bottom" />

        <div className="park-section__inner">
          <div className="park-section__headline">
            <span className="park-section__number">2</span>

            <div className="park-section__headline-text">
              <p className="park-section__script">Đô thị trung tâm</p>
              <h2>
                Mở lối thịnh vượng
                <br />- Kết nối tinh hoa
              </h2>
            </div>
          </div>

          <p className="park-section__description">
            {activeCategory.description}
          </p>

          <div
            className="park-section__tabs"
            role="tablist"
            aria-label="Tiện ích công viên"
          >
            {parkCategories.map((category) => {
              const isSelected = category.id === activeCategory.id;

              return (
                <button
                  key={category.id}
                  className={`park-section__tab ${
                    isSelected ? "park-section__tab--active" : ""
                  }`}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveCategoryId(category.id)}
                >
                  <span>{category.buttonLabel}</span>

                  <span className="park-section__tab-icon" aria-hidden="true">
                    →
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="park-section__visual">
        <div className="park-section__slides">
          {activeCategory.slides.map((slide, index) => (
            <img
              key={`${activeCategory.id}-${index}-${slide.image}`}
              className={`park-section__slide ${
                index === activeSlideIndex ? "park-section__slide--active" : ""
              }`}
              src={slide.image}
              alt={slide.title}
            />
          ))}

          <div className="park-section__visual-shade" aria-hidden="true" />
        </div>

        <div className="park-section__controls">
          <button
            className="park-section__nav"
            type="button"
            aria-label="Ảnh trước"
            onClick={() => goToSlide(activeSlideIndex - 1)}
          >
            <span className="park-section__navArrow park-section__navArrow--prev" />
          </button>

          <span className="park-section__counter">
            {activeSlideIndex + 1}/{activeCategory.slides.length}
          </span>

          <button
            className="park-section__nav"
            type="button"
            aria-label="Ảnh tiếp theo"
            onClick={() => goToSlide(activeSlideIndex + 1)}
          >
            <span className="park-section__navArrow" />
          </button>
        </div>

        <div className="park-section__caption">
          {activeCategory.displayTitle}
        </div>
      </div>
    </section>
  );
}