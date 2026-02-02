

import React, { useRef, useEffect, useState } from "react";
import axios from "axios";

export default function DailyBestSells() {
  const sliderRef = useRef(null);

  const [hero, setHero] = useState(null);
  const [products, setProducts] = useState([]);

  // FETCH DATA
  useEffect(() => {
    const fetchData = async () => {
      try {
        const heroRes = await axios.get(
          "http://localhost:5000/api/daily-best/hero"
        );
        setHero(heroRes.data);

        const prodRes = await axios.get(
          "http://localhost:5000/api/daily-best/products"
        );
        setProducts(prodRes.data);
      } catch (err) {
        console.error("Error fetching daily best sells:", err);
      }
    };
    fetchData();
  }, []);

  // AUTO SLIDE
  useEffect(() => {
    const interval = setInterval(() => {
      scrollRight();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const scrollLeft = () => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollBy({ left: -350, behavior: "smooth" });
  };

  const scrollRight = () => {
    if (!sliderRef.current) return;

    sliderRef.current.scrollBy({ left: 350, behavior: "smooth" });

    if (
      sliderRef.current.scrollLeft + sliderRef.current.offsetWidth >=
      sliderRef.current.scrollWidth - 5
    ) {
      sliderRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  };

  const renderStars = (rating) => {
    const full = Math.floor(rating);
    const half = rating - full >= 0.5;
    const stars = [];

    for (let i = 0; i < full; i++) {
      stars.push(
        <i key={i} className="bi bi-star-fill text-warning"></i>
      );
    }

    if (half) {
      stars.push(
        <i key="half" className="bi bi-star-half text-warning"></i>
      );
    }

    while (stars.length < 5) {
      stars.push(
        <i
          key={"e" + stars.length}
          className="bi bi-star text-warning opacity-50"
        ></i>
      );
    }

    return stars;
  };

  return (
    <section style={{ marginTop: "4rem", marginBottom: "3rem" }}>
      <div className="container">
        {/* HEADER */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3>Daily Best Sells</h3>

          <div>
            <button
              className="btn btn-light me-2 shadow-sm rounded-circle"
              onClick={scrollLeft}
              style={{ width: 42, height: 42 }}
            >
              <i className="bi bi-chevron-left"></i>
            </button>

            <button
              className="btn btn-light shadow-sm rounded-circle"
              onClick={scrollRight}
              style={{ width: 42, height: 42 }}
            >
              <i className="bi bi-chevron-right"></i>
            </button>
          </div>
        </div>

        {/* SLIDER */}
        <div className="slider" ref={sliderRef}>
          {/* HERO BANNER */}
          {hero && (
            <div
              className="banner-small"
              style={{
                backgroundImage: `url(http://localhost:5000${hero.image_url})`,
              }}
            >
              <h4 className="banner-text">{hero.title}</h4>
              <p className="banner-sub">{hero.description}</p>
              <a
                href="/products"
                className="btn btn-success btn-sm banner-btn"
              >
                {hero.cta_label || "Shop Now"}
              </a>
            </div>
          )}

          {/* PRODUCTS */}
          {products.map((p, idx) => (
            <div className="product-card" key={idx}>
              <div className="product-image-frame">
                <img
                  src={`http://localhost:5000${p.image_url}`}
                  alt={p.title}
                />
              </div>

              <h6 className="mt-2 fw-bold">{p.title}</h6>

              <p className="product-description">{p.description}</p>

              <div className="mt-auto text-end">
                {p.rating && (
                  <>
                    {renderStars(p.rating)}
                    <small className="text-muted">{p.rating}</small>
                  </>
                )}
              </div>

              <a href="/products" className="btn btn-success btn-sm mt-2">
                Add to Cart
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* CSS (UNCHANGED) */}
      <style>{`
        .slider {
          display: flex;
          gap: 1.6rem;
          overflow-x: hidden;
          scroll-behavior: smooth;
          white-space: nowrap;
        }

        .slider::-webkit-scrollbar {
          display: none;
        }

        .banner-small {
          flex: 0 0 380px;
          height: 480px;
          background-size: cover;
          background-position: center;
          border-radius: 16px;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          position: relative;
          color: #fff;
        }

        .banner-small::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(0,0,0,0.55),
            rgba(0,0,0,0.15)
          );
          border-radius: 16px;
        }

        .banner-text {
          position: relative;
          font-size: 1.8rem;
          font-weight: 700;
          line-height: 1.3;
          margin-bottom: 5px;
          text-shadow: 0 3px 6px rgba(0,0,0,0.7);
          z-index: 5;
        }

        .banner-sub {
          position: relative;
          font-size: 1rem;
          opacity: 0.95;
          text-shadow: 0 2px 4px rgba(0,0,0,0.6);
          z-index: 5;
        }

        .banner-btn {
          position: relative;
          margin-top: 12px;
          margin-bottom: 15px;
          background-color: #28a745 !important;
          border: 2px solid white !important;
          font-weight: 600;
          z-index: 6;
        }

        .product-card {
          flex: 0 0 280px;
          height: 480px;
          padding: 20px;
          border: 1px solid #eee;
          border-radius: 14px;
          background: #fff;
          display: inline-flex;
          flex-direction: column;
        }

        .product-image-frame {
          width: 100%;
          height: 200px;
          background: #f7f7f7;
          border-radius: 12px;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
        }

        .product-image-frame img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .product-description {
          margin-top: 10px;
          font-size: 0.9rem;
        }
      `}</style>
    </section>
  );
}