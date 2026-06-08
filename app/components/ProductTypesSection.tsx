"use client";

import "./ProductTypesSection.module.css";

import { useEffect, useState } from "react";

type ProductType = {
  id: string;
  number: string;
  title: string;
  description: string;
  images: string[];
};

const productTypes: ProductType[] = [
  {
    id: "khu-villa",
    number: "01",
    title: "Khu villa",
    description:
      "Với phong cách hiện đại và phóng khoáng, dãy villa trở thành điểm nhấn đại diện cho nhịp sống sôi động của toàn khu đô thị. Không gian được định hướng để kết hợp trải nghiệm sống, mua sắm và sinh hoạt đẳng cấp.",
    images: [
      "https://res.cloudinary.com/da6f4dmql/image/upload/v1780883479/z7853541056469_4b62049a6ea59a8221f170fc7b1d991e_ajzcif.jpg",
    ],
  },
  {
    id: "dat-nen-biet-thu",
    number: "02",
    title: "Đất nền biệt thự",
    description:
      "Quỹ sản phẩm đa dạng mở ra nhiều lựa chọn đầu tư và an cư. Nằm trong hệ tiện ích đồng bộ cùng không gian xanh mát, dòng sản phẩm này hướng tới giá trị thực bền vững và dư địa tăng trưởng dài hạn.",
    images: [
      "https://res.cloudinary.com/da6f4dmql/image/upload/v1780883631/z7853541728218_e98d36e444b942194c3eee277182474a_pztxut.jpg",
      "https://res.cloudinary.com/da6f4dmql/image/upload/v1780883633/z7853541517918_0bb55cd543fc39167ec5719a51540260_i7rg8q.jpg",
      "https://res.cloudinary.com/da6f4dmql/image/upload/v1780883636/z7853541299520_cb68c9346c55627df2cebfa62d59fd98_ecdg5v.jpg",
      "https://res.cloudinary.com/da6f4dmql/image/upload/v1780883630/z7853541056470_49fd6669bd45c522e17f9fcc5d5009e8_thnqfe.jpg",
      "https://res.cloudinary.com/da6f4dmql/image/upload/v1780883629/z7853541954415_ff27563c91749b8191ac4c3fc4c17284_kzrdxt.jpg",
    ],
  },
];

const AUTO_ADVANCE_DELAY = 6000;

type ProductTypesSectionProps = {
  isActive?: boolean;
};

export function ProductTypesSection({
  isActive = false,
}: ProductTypesSectionProps) {
  const [activeTypeIndex, setActiveTypeIndex] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const activeType = productTypes[activeTypeIndex];

  useEffect(() => {
    if (!isActive || activeType.images.length <= 1) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveImageIndex((current) => (current + 1) % activeType.images.length);
    }, AUTO_ADVANCE_DELAY);

    return () => window.clearInterval(interval);
  }, [activeType.images, isActive]);

  const totalImages = activeType.images.length;

  const goToPreviousImage = () => {
    setActiveImageIndex((current) =>
      (current - 1 + totalImages) % totalImages
    );
  };

  const goToNextImage = () => {
    setActiveImageIndex((current) => (current + 1) % totalImages);
  };

  return (
    <section
      className={`home-section product-types-section ${
        isActive ? "product-types-section--animate" : ""
      }`}
      id="loai-hinh-san-pham"
      data-section
    >
      <div className="product-types-section__panel">
        <div className="product-types-section__intro">
          <h2>Hiện đại &amp; tiềm năng</h2>
        </div>

        <div className="product-types-section__items">
          {productTypes.map((productType, index) => {
            const isCurrent = index === activeTypeIndex;

            return (
              <button
                key={productType.id}
                type="button"
                className={`product-types-section__item ${
                  isCurrent ? "product-types-section__item--active" : ""
                }`}
                onClick={() => {
                  setActiveTypeIndex(index);
                  setActiveImageIndex(0);
                }}
              >
                <span className="product-types-section__itemHeader">
                  <span className="product-types-section__badge">
                    {productType.number}
                  </span>
                  <span className="product-types-section__itemTitle">
                    {productType.title}
                  </span>
                </span>

                <span className="product-types-section__itemLine" />

                <span className="product-types-section__itemDescription">
                  {productType.description}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="product-types-section__visual">
        <div className="product-types-section__imageStack">
          {activeType.images.map((image, index) => (
            <div
              key={`${activeType.id}-${index}`}
              className={`product-types-section__imageFrame ${
                index === activeImageIndex
                  ? "product-types-section__imageFrame--active"
                  : ""
              }`}
            >
              <img
                className="product-types-section__image"
                src={image}
                alt={activeType.title}
              />
            </div>
          ))}
        </div>

        <div className="product-types-section__visualGlow" aria-hidden="true" />
        <div className="product-types-section__visualShade" aria-hidden="true" />
        <div className="product-types-section__visualSweep" aria-hidden="true" />

        <div className="product-types-section__controls">
          <button
            type="button"
            className="product-types-section__navButton"
            onClick={goToPreviousImage}
            aria-label="Ảnh trước"
          >
            <span className="product-types-section__navArrow product-types-section__navArrow--prev" />
          </button>

          <div className="product-types-section__counter" aria-live="polite">
            {activeImageIndex + 1}/{totalImages}
          </div>

          <button
            type="button"
            className="product-types-section__navButton"
            onClick={goToNextImage}
            aria-label="Ảnh tiếp theo"
          >
            <span className="product-types-section__navArrow" />
          </button>
        </div>
      </div>
    </section>
  );
}
