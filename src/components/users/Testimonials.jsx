import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function FeedbackCarousel() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [index, setIndex] = useState(0);
  const itemsPerSlide = 2; // number of feedbacks per slide

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  // Helper function to get full product image URL or fallback
  const getProductImage = (filename) =>
    filename ? `${API_URL}/uploads/products/${filename}` : "/placeholder.png";

  // Fetch feedbacks from backend
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await fetch(`${API_URL}/api/feedback`);
        const data = await res.json();
        if (data.success) setFeedbacks(data.feedbacks);
      } catch (err) {
        console.error("Failed to fetch feedbacks:", err);
      }
    };
    fetchFeedbacks();
  }, []);

  // Carousel navigation
  const next = () => {
    setIndex((prev) =>
      prev + itemsPerSlide >= feedbacks.length ? 0 : prev + itemsPerSlide
    );
  };

  const prev = () => {
    setIndex((prev) =>
      prev === 0 ? Math.max(feedbacks.length - itemsPerSlide, 0) : prev - itemsPerSlide
    );
  };

  // Auto slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [feedbacks]);

  const visibleItems = feedbacks.slice(index, index + itemsPerSlide);

  return (
    <section className="py-5" style={{ backgroundColor: "#faf7f2" }}>
      <div className="container">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-semibold mb-0">From Our Customers</h2>
          <div className="d-flex gap-2">
            <button
              onClick={prev}
              className="btn btn-outline-secondary rounded-circle"
              style={{ width: 40, height: 40 }}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={next}
              className="btn btn-outline-secondary rounded-circle"
              style={{ width: 40, height: 40 }}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Feedback Cards */}
        <div className="row g-4">
          {visibleItems.length > 0 ? (
            visibleItems.map((item, i) => (
              <div className="col-12 col-lg-6" key={i}>
                <div className="row g-4 h-100 align-items-center">
                  {/* Product Image */}
                  <div className="col-12 col-md-6">
                    <div className="bg-white rounded-4 shadow-sm h-100 d-flex align-items-center justify-content-center p-4">
                      <img
                        src={getProductImage(item.product_image)}
                        alt={item.product_name || item.productName || "Product"}
                        className="img-fluid"
                        style={{ maxHeight: 260, objectFit: "contain" }}
                      />
                    </div>
                  </div>

                  {/* Feedback Card */}
                  <div className="col-12 col-md-6">
                    <div className="bg-white rounded-4 shadow-sm h-100 p-4 d-flex flex-column justify-content-center">
                      <Quote size={22} className="text-secondary mb-2" />
                      <h5 className="fw-semibold">
                        {item.product_name || item.productName || "Product"}
                      </h5>
                      <p className="text-muted mb-2">{item.message}</p>
                      <p className="fw-semibold mb-0">— {item.name}</p>
                      <p className="mb-0">
                        Rating: {"⭐".repeat(item.rating || 0)}
                        {"☆".repeat(5 - (item.rating || 0))}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-muted text-center">No feedbacks available.</p>
          )}
        </div>
      </div>
    </section>
  );
}
