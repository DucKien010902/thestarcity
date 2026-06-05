"use client";

import Image from "next/image";
import { useState } from "react";

const menuItems = [
  { id: "trang-chu", label: "Trang chủ" },
  { id: "cam-hung", label: "Cảm hứng" },
  { id: "tong-quan", label: "Tổng quan" },
  { id: "vi-tri", label: "Vị trí" },
  { id: "tong-mat-bang", label: "Tổng mặt bằng" },
  { id: "thanh-phan-du-an", label: "Thành phần dự án" },
  { id: "tien-ich-cong-vien", label: "Tiện ích công viên" },
  { id: "tien-ich-he-sinh-thai", label: "Tiện ích hệ sinh thái" },
  { id: "loai-hinh-san-pham", label: "Loại hình sản phẩm" },
  { id: "cao-tang", label: "Cao tầng" },
  { id: "tin-tuc", label: "Tin tức" },
  { id: "lien-he", label: "Liên hệ" },
];

function BrandLogo({ compact = false }: { compact?: boolean }) {
  return (
    <a className={`brand-logo ${compact ? "brand-logo--compact" : ""}`} href="#trang-chu">
      <Image
        className="brand-logo__image"
        src="/logo.png"
        alt="The Star City"
        width={184}
        height={110}
        priority
      />
    </a>
  );
}

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="site-header">
        <BrandLogo />

        <nav className="site-actions" aria-label="Liên hệ nhanh">
          <a className="pill-button pill-button--dark" href="tel:0969881919">
            096 988 1919
          </a>
          <a className="pill-button pill-button--dark" href="#lien-he">
            NHẬN TƯ VẤN
          </a>
          <button
            className="pill-button pill-button--gold menu-trigger"
            type="button"
            aria-expanded={isMenuOpen}
            aria-controls="site-menu"
            onClick={() => setIsMenuOpen(true)}
          >
            <span className="hamburger" aria-hidden="true" />
            MENU
          </button>
        </nav>
      </header>

      <div
        aria-hidden={!isMenuOpen}
        className={`menu-scrim ${isMenuOpen ? "menu-scrim--open" : ""}`}
        onClick={() => setIsMenuOpen(false)}
      />

      <aside
        id="site-menu"
        className={`menu-panel ${isMenuOpen ? "menu-panel--open" : ""}`}
        aria-hidden={!isMenuOpen}
      >
        <button
          className="menu-panel__close"
          type="button"
          aria-label="Đóng menu"
          onClick={() => setIsMenuOpen(false)}
        >
          <span aria-hidden="true">x</span>
        </button>

        <BrandLogo compact />

        <div className="menu-panel__links">
          {menuItems.map((item) => (
            <a href={`#${item.id}`} key={item.id} onClick={() => setIsMenuOpen(false)}>
              {item.label}
            </a>
          ))}
        </div>

        <a className="menu-panel__login" href="#dang-nhap">
          ĐĂNG NHẬP
        </a>
      </aside>
    </>
  );
}