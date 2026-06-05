"use client";

import "./OverviewSection.module.css";
import { useEffect, useState, type CSSProperties } from "react";

const overviewVisualImage = "https://thestarcity.vn/wp-content/uploads/2024/12/DUONG-TU-TREN-CAO.png";

type OverviewVisualStyle = CSSProperties & {
  "--overview-visual-image"?: string;
};

const overviewRows = [
  {
    label: "Vị trí",
    value:
      "Thôn Lương Đồng, xã Bắc Đông Quan, tỉnh Hưng Yên (huyện Đông Hưng, tỉnh Thái Bình cũ)",
  },
  { label: "Quy mô", value: "6.89ha" },
  { label: "Diện tích công viên - cây xanh", value: "7567 m2" },
  { label: "Mật độ xây dựng", value: "27,4% với tổng 177 lô đất nhà ở" },
  { label: "Mật độ hạ tầng, giao thông", value: "18.551,1 m2 | 28%" },
  {
    label: "Tiện ích",
    value:
      "Công viên cây xanh, thác nước điều hòa, cafe ngoài trời, bể bơi, nhà cộng đồng, khu vui chơi trẻ em...",
  },
  {
    label: "Trục đại lộ thương mại",
    value: "Rộng 16m - chạy hướng Đông Tây, với 42 căn villa mặt tiền",
  },
  { label: "Đường nội bộ", value: "Rộng 9,5 - 12m kết nối khu đô thị" },
  { label: "Diện tích lô", value: "Trung bình 160m2/lô, các lô từ 100-400m2" },
];

type OverviewSectionProps = {
  isActive?: boolean;
};

export function OverviewSection({ isActive = false }: OverviewSectionProps) {
  const [animate, setAnimate] = useState(false);

  const visualStyle: OverviewVisualStyle | undefined = overviewVisualImage
    ? { "--overview-visual-image": `url("${overviewVisualImage}")` }
    : undefined;

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
      className={`home-section overview-section ${
        animate ? "overview-section--animate" : ""
      }`}
      id="tong-quan"
      data-section
    >
      <div className="overview-section__panel">
        <span className="overview-section__firework overview-section__firework--left" aria-hidden="true" />
        <span className="overview-section__firework overview-section__firework--right" aria-hidden="true" />

        <div className="overview-section__heading">
          <h2>Tổng quan dự án</h2>
        </div>

        <div className="overview-section__table">
          {overviewRows.map((row, index) => (
            <div
              className="overview-section__row"
              key={row.label}
              style={{ transitionDelay: `${index * 75}ms` }}
            >
              <dt>{row.label}</dt>
              <dd>{row.value}</dd>
            </div>
          ))}
        </div>
      </div>

      <div
        className="overview-section__visual"
        style={visualStyle}
      >
        <div className="overview-section__visual-overlay" />
        <div className="overview-section__visual-copy">
          <span>Phối cảnh minh họa</span>
        </div>
      </div>
    </section>
  );
}
