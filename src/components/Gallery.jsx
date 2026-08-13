import { useState, useEffect, useMemo, useCallback } from "react";
import config from "../config";
import "./Gallery.css";

const UNCATEGORIZED = "未分类";

export default function Gallery() {
  const { photos = [], title = "我的相册", subtitle = "记录生活的美好瞬间" } =
    config.gallery || {};

  // 从照片中自动提取分类（保持出现顺序）
  const categories = useMemo(() => {
    const seen = [];
    photos.forEach((p) => {
      const c = p.category || UNCATEGORIZED;
      if (!seen.includes(c)) seen.push(c);
    });
    return seen;
  }, [photos]);

  const [active, setActive] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filtered = useMemo(
    () =>
      active === "all"
        ? photos
        : photos.filter((p) => (p.category || UNCATEGORIZED) === active),
    [active, photos]
  );

  const close = useCallback(() => setLightboxIndex(null), []);
  const step = useCallback(
    (dir) => {
      setLightboxIndex((i) => {
        if (i === null || filtered.length === 0) return i;
        return (i + dir + filtered.length) % filtered.length;
      });
    },
    [filtered.length]
  );

  // 灯箱键盘操作：Esc 关闭、← → 切换
  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") step(-1);
      else if (e.key === "ArrowRight") step(1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightboxIndex, close, step]);

  if (photos.length === 0) {
    return (
      <section id="gallery" className="section gallery-section">
        <div className="container">
          <h2 className="section-title">{title}</h2>
          <p className="placeholder-msg">
            还没有照片，去 <code>src/config.js</code> 的 <code>gallery.photos</code> 里添加吧
          </p>
        </div>
      </section>
    );
  }

  const current = lightboxIndex === null ? null : filtered[lightboxIndex];

  return (
    <section id="gallery" className="section gallery-section">
      <div className="container">
        <h2 className="section-title">{title}</h2>
        <p className="section-subtitle">{subtitle}</p>

        {/* 分类筛选 */}
        {categories.length > 0 && (
          <div className="gallery-filters">
            <button
              className={`filter-btn${active === "all" ? " active" : ""}`}
              onClick={() => setActive("all")}
            >
              全部
            </button>
            {categories.map((c) => (
              <button
                key={c}
                className={`filter-btn${active === c ? " active" : ""}`}
                onClick={() => setActive(c)}
              >
                {c}
              </button>
            ))}
          </div>
        )}

        {/* 照片网格 */}
        <div className="gallery-grid">
          {filtered.map((photo, i) => (
            <figure
              key={`${photo.src}-${i}`}
              className="gallery-item card"
              onClick={() => setLightboxIndex(i)}
            >
              <img src={photo.src} alt={photo.title || "照片"} loading="lazy" />
              {photo.title && <figcaption>{photo.title}</figcaption>}
            </figure>
          ))}
        </div>
      </div>

      {/* 灯箱 */}
      {current && (
        <div className="lightbox" onClick={close} role="dialog" aria-modal="true">
          <button className="lightbox-close" onClick={close} aria-label="关闭">
            &times;
          </button>
          <button
            className="lightbox-prev"
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
            aria-label="上一张"
          >
            &lsaquo;
          </button>
          <div className="lightbox-body" onClick={(e) => e.stopPropagation()}>
            <img src={current.src} alt={current.title || "照片"} />
            {current.title && <p className="lightbox-caption">{current.title}</p>}
          </div>
          <button
            className="lightbox-next"
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            aria-label="下一张"
          >
            &rsaquo;
          </button>
        </div>
      )}
    </section>
  );
}
