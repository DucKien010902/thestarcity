"use client";

import "./ContactFooterSection.module.css";

import { useEffect, useState } from "react";

const contactItems = [
  {
    icon: "⌖",
    text: "Thôn Lương Đống, xã Bắc Đông Quan, tỉnh Hưng Yên (Huyện Đông Hưng, Tỉnh Thái Bình cũ)",
  },
  {
    icon: "✉",
    text: "mkt.tranphat@gmail.com",
  },
  {
    icon: "✆",
    text: "0969 881 919",
  },
];

type ContactFooterSectionProps = {
  isActive?: boolean;
};

export function ContactFooterSection({
  isActive = false,
}: ContactFooterSectionProps) {
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
      className={`home-section contact-footer ${
        animate ? "contact-footer--animate" : ""
      }`}
      id="lien-he"
      data-section
    >
      <div className="contact-footer__paint" aria-hidden="true" />
      <span
        className="contact-footer__firework contact-footer__firework--left"
        aria-hidden="true"
      />
      <span
        className="contact-footer__firework contact-footer__firework--right"
        aria-hidden="true"
      />

      <div className="contact-footer__shell">
        <div className="contact-footer__left">
          <div className="contact-footer__block contact-footer__block--main">
            <h2>Thông tin liên hệ</h2>

            <div className="contact-footer__contacts">
              {contactItems.map((item) => (
                <div className="contact-footer__contact" key={item.text}>
                  <span className="contact-footer__icon" aria-hidden="true">
                    {item.icon}
                  </span>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="contact-footer__block">
            <h3>Văn phòng</h3>
            <p>Trụ sở công ty Cổ phần Đầu Tư Hưng Thái Property:</p>
            <p>
              Thôn Lương Đống, xã Bắc Đông Quan, tỉnh Hưng Yên (Huyện Đông
              Hưng, Tỉnh Thái Bình cũ).
            </p>
          </div>
        </div>

        <div className="contact-footer__center">
          <div className="contact-footer__form-card">
            <p className="contact-footer__script">Đăng ký nhận tin</p>
            <div className="contact-footer__divider" aria-hidden="true" />

            <form className="contact-footer__form">
              <input type="text" placeholder="Họ và tên*" />
              <input type="email" placeholder="Email*" />
              <input type="tel" placeholder="Số điện thoại*" />
              <button type="button">Gửi yêu cầu</button>
            </form>

            <p className="contact-footer__note">
              (*) Khách hàng vui lòng nhập đầy đủ thông tin
            </p>
          </div>
        </div>

        <div className="contact-footer__right">
          <div className="contact-footer__block">
            <h3>Đơn vị phát triển dự án:</h3>
            <p>| Công ty Cổ phần Đầu Tư Hưng Thái Property.</p>
          </div>

          <div className="contact-footer__block">
            <h3>Tổng thầu:</h3>
            <p>| Công ty Cổ phần Tập đoàn BGI</p>
            <p>VINACONEX7.</p>
          </div>
        </div>
      </div>

      <div className="contact-footer__bottom">
        <p>Một sản phẩm của Hưng Thái Property.</p>
        <p>© 2026 The Star City. All Rights Reserved.</p>
      </div>
    </section>
  );
}
