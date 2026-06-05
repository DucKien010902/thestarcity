"use client";

import "./IntroSection.module.css";
import { useEffect, useState } from "react";

const introBackground =
  "https://thestarcity.vn/wp-content/uploads/2024/12/KHU-CONG-VIEN.png";

type IntroSectionProps = {
  isActive?: boolean;
};

export function IntroSection({ isActive = false }: IntroSectionProps) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (!isActive) {
      setAnimate(false);
      return;
    }

  // Khôi phục lại trạng thái animate để kích hoạt hiệu ứng CSS khi section active
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
    <section className="home-section intro-section" id="gioi-thieu" data-section>
      <img
        className={`intro-section__background ${
          animate ? "intro-section__background--animate" : ""
        }`}
        src={introBackground}
        alt=""
        aria-hidden="true"
        fetchPriority="high"
      />

      <div className="intro-section__shade" />

      <div
        className={`intro-section__content ${
          animate ? "intro-section__content--animate" : ""
        }`}
      >
        <div className="intro-section__brand">
          <p className="intro-section__kicker">Đô thị trung tâm</p>
          <h2>The Star City</h2>
        </div>

        <div className="intro-section__columns">
          <p>
            Khu đô thị The Star City - Biểu tượng mới tại Bắc Đông Quan, Hưng Yên
            (Thái Bình cũ) nơi kết nối giá trị truyền thống với nhịp sống hiện
            đại. Với tổng diện tích 6,89 hecta và 250 lô đất rộng rãi, chúng tôi
            mang đến một môi trường sống đẳng cấp, lý tưởng cho mọi gia đình.
          </p>

          <div className="intro-section__divider" aria-hidden="true" />

          <div className="intro-section__highlights">
            <strong>Điểm nhấn của The Star City:</strong>
            <p>
              Không gian sống cao cấp: Thiết kế hiện đại, tối ưu hóa ánh sáng và
              không gian xanh.
            </p>
            <p>
              Trung tâm thương mại sôi động: Nơi hội tụ các dịch vụ mua sắm,
              giải trí hàng đầu.
            </p>
            <p>
              Tiện ích đa dạng: Công viên, khu vui chày trẻ em, hệ thống giáo
              dục và y tế ngay trong tầm tay.
            </p>
            <p>
              Kết nối hoàn hảo: Vị trí vàng ngay trung tâm Bắc Đông Quan, dễ
              dàng di chuyển tới các thành phố lớn.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
