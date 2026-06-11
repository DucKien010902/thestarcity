"use client";

import "./NewsSection.module.css";

import { useEffect, useRef, useState, type CSSProperties } from "react";

const newsArticles = [
  {
    date: { day: "29", month: "Th1" },
    image:
      "https://res.cloudinary.com/da6f4dmql/image/upload/v1780645795/z7853448996805_3c465d5bb6abdcdf053c7a095c328db9_rwvm3c.jpg",
    title: "Không gian biệt thự nghệ thuật mở ra chuẩn sống nghỉ dưỡng mới",
    description:
      "Thiết kế mặt tiền, khoảng lùi và sân vườn được tiết chế như một bản phối kiến trúc, tạo nên nhịp sống sang trọng mà vẫn riêng tư.",
  },
  {
    date: { day: "05", month: "Th11" },
    image:
      "https://thestarcity.vn/wp-content/uploads/2024/12/DUONG-TU-TREN-CAO.png",
    title: "Giải mã ngôn ngữ hình khối trong bộ sưu tập villa The Star City",
    description:
      "Mỗi đường nét, mảng đặc rỗng và vật liệu được lựa chọn để tôn lên cảm giác sưu tầm, khác biệt và có chiều sâu thẩm mỹ.",
  },
  {
    date: { day: "25", month: "Th9" },
    image:
      "https://res.cloudinary.com/da6f4dmql/image/upload/v1780562901/z7849734841430_cabf0a2feb7ef9661ebc298f6ef85ff4_yr1xhz.jpg",
    title: "Ánh sáng, mặt nước và cảnh quan cùng kiến tạo trải nghiệm sống an nhiên",
    description:
      "Từ sảnh đón đến hiên nhà, mọi điểm chạm đều được tính toán để ánh sáng tự nhiên trở thành một phần của nghệ thuật sống.",
  },
  {
    date: { day: "21", month: "Th7" },
    image:
      "https://thestarcity.vn/wp-content/uploads/2024/12/KHU-CONG-VIEN.png",
    title: "Khoảng xanh nội khu trở thành phông nền cho những buổi gặp gỡ đẳng cấp",
    description:
      "Không chỉ là nơi dạo bộ, hệ cảnh quan còn được tổ chức như một gallery ngoài trời, tăng cảm xúc cho từng khoảnh khắc thường nhật.",
  },
  {
    date: { day: "21", month: "Th6" },
    image:
      "https://res.cloudinary.com/da6f4dmql/image/upload/v1780627665/z7849720490764_965c3010a058b06d06a1ab5ffc3922db_onorlw.jpg",
    title: "Biệt thự như tác phẩm sưu tầm dành cho chủ nhân yêu giá trị bền vững",
    description:
      "Tỷ lệ không gian, tầm nhìn và lớp tiện ích được kết nối mạch lạc để mỗi căn biệt thự vừa mang cá tính riêng vừa giữ chuẩn sống lâu dài.",
  },
  {
    date: { day: "17", month: "Th6" },
    image:
      "https://res.cloudinary.com/da6f4dmql/image/upload/v1780565180/z7849719360521_8ecd4b42eb7c5a26ab042700e9a19302_k0zecn.jpg",
    title: "Một nhịp sống nghệ thuật được hoàn thiện từ chi tiết nhỏ nhất",
    description:
      "Từ cổng vào, hiên đón đến chất liệu hoàn thiện, mọi lớp thiết kế đều hướng đến cảm giác thanh lịch, tinh tuyển và đáng nhớ.",
  },
];

type NewsImageStyle = CSSProperties & {
  "--news-card-image"?: string;
};

type NewsSectionProps = {
  isActive?: boolean;
};

export function NewsSection({ isActive = false }: NewsSectionProps) {
  const [animate, setAnimate] = useState(false);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    let frameOne = 0;
    let frameTwo = 0;

    if (!isActive) {
      frameOne = window.requestAnimationFrame(() => {
        setAnimate(false);
      });

      return () => window.cancelAnimationFrame(frameOne);
    }

    const timer = window.setTimeout(() => {
      frameOne = window.requestAnimationFrame(() => {
        frameTwo = window.requestAnimationFrame(() => {
          setAnimate(true);
        });
      });
    }, 140);

    return () => {
      window.clearTimeout(timer);
      window.cancelAnimationFrame(frameOne);
      window.cancelAnimationFrame(frameTwo);
    };
  }, [isActive]);

  useEffect(() => {
    const scroller = scrollerRef.current;

    if (!scroller) return;

    const updateScrollState = () => {
      const maxScrollLeft = scroller.scrollWidth - scroller.clientWidth;
      const nextCanScrollPrev = scroller.scrollLeft > 8;
      const nextCanScrollNext = scroller.scrollLeft < maxScrollLeft - 8;

      setCanScrollPrev(nextCanScrollPrev);
      setCanScrollNext(nextCanScrollNext);
    };

    updateScrollState();

    scroller.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      scroller.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const animateScrollTo = (element: HTMLDivElement, nextLeft: number) => {
    if (animationFrameRef.current !== null) {
      window.cancelAnimationFrame(animationFrameRef.current);
    }

    const startLeft = element.scrollLeft;
    const distance = nextLeft - startLeft;
    const duration = 560;
    const startTime = performance.now();

    const easeInOutCubic = (progress: number) => {
      return progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
    };

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeInOutCubic(progress);

      element.scrollLeft = startLeft + distance * easedProgress;

      if (progress < 1) {
        animationFrameRef.current = window.requestAnimationFrame(step);
        return;
      }

      animationFrameRef.current = null;
    };

    animationFrameRef.current = window.requestAnimationFrame(step);
  };

  const handleScroll = (direction: "prev" | "next") => {
  const scroller = scrollerRef.current;
  if (!scroller) return;

  const firstCard = scroller.querySelector<HTMLElement>(".news-section__card");
  const track = scroller.querySelector<HTMLElement>(".news-section__track");

  if (!firstCard || !track) return;

  const trackStyle = window.getComputedStyle(track);
  const gap = Number.parseFloat(trackStyle.columnGap || trackStyle.gap || "0");

  const amount = firstCard.offsetWidth + gap;

  scroller.scrollBy({
    left: direction === "next" ? amount : -amount,
    behavior: "smooth",
  });
};  

  return (
    <section
      className={`home-section news-section ${
        animate ? "news-section--animate" : ""
      }`}
      id="tin-tuc"
      data-section
    >
      <div className="news-section__glow news-section__glow--top" aria-hidden="true" />
      <div className="news-section__glow news-section__glow--bottom" aria-hidden="true" />

      <span className="news-section__firework news-section__firework--one" aria-hidden="true" />
      <span className="news-section__firework news-section__firework--two" aria-hidden="true" />
      <span className="news-section__firework news-section__firework--three" aria-hidden="true" />
      <span className="news-section__firework news-section__firework--four" aria-hidden="true" />

      <div className="news-section__shell">
        <div className="news-section__topbar">
          <div className="news-section__heading">
            <span aria-hidden="true" />
            <h2>Tin tức nổi bật</h2>
            <span aria-hidden="true" />
          </div>

          <div className="news-section__controls">
            <button
              className="news-section__arrow"
              type="button"
              onClick={() => handleScroll("prev")}
              disabled={!canScrollPrev}
              aria-label="Xem bài viết trước"
            >
              <span aria-hidden="true">←</span>
            </button>

            <button
              className="news-section__arrow"
              type="button"
              onClick={() => handleScroll("next")}
              disabled={!canScrollNext}
              aria-label="Xem bài viết tiếp theo"
            >
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>

        <div className="news-section__viewport" ref={scrollerRef}>
          <div className="news-section__track">
          {newsArticles.map((article, index) => {
            const imageStyle: NewsImageStyle = {
              "--news-card-image": `url("${article.image}")`,
            };

            return (
              <article
                className="news-section__card"
                key={article.title}
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <div className="news-section__media" style={imageStyle}>
                  <div className="news-section__media-overlay" />
                  <div className="news-section__date">
                    <strong>{article.date.day}</strong>
                    <span>{article.date.month}</span>
                  </div>
                </div>

                <div className="news-section__content">
                  <h3>{article.title}</h3>
                  <p>{article.description}</p>
                  <a href="#lien-he">Khám phá thêm</a>
                </div>
              </article>
            );
          })}
          </div>
        </div>
      </div>
    </section>
  );
}
