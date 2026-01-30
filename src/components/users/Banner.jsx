import React, { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Banner.css";

export default function Banner() {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    fetchSlides();
  }, []);

  const fetchSlides = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/banner");
      const data = await res.json();

      // prevent empty carousel crash
      if (Array.isArray(data)) {
        setSlides(data);
      } else {
        setSlides([]);
      }
    } catch (err) {
      console.error("Banner fetch error:", err);
    }
  };

  // Prevent render if no slides
  if (!slides.length) return null;

  return (
    <main>
      <Carousel fade interval={4000} controls indicators>
        {slides.map((s) => (
          <Carousel.Item key={s.id}>
            <div className="banner-slide">

              {/* IMAGE */}
              <img
                src={`http://localhost:5000${s.image_url}`}
                alt=""
                className="banner-img"
              />

              {/* TEXT BLOCK */}
              <div
                className="banner-text-block"
                style={{
                  position: "absolute",
                  top: s.position_top || "20%",
                  left: s.position_left || undefined,
                  right: s.position_right || undefined,
                  textAlign: s.text_align || "left",
                  width: s.width || "40%",
                  fontSize: "3.2vw"
                }}
              >
                {s.title || ""}

                <div
                  className="banner-sub"
                  style={{ fontSize: "1.6vw" }}
                >
                  {s.subtitle || ""}
                </div>
              </div>

            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </main>
  );
}
