import React, { useEffect, useState } from "react";
import "./whychoose.css";

export default function WhyChooseVitalimes() {
  const [companyName, setCompanyName] = useState("");
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    fetchWhyChoose();
  }, []);

  const fetchWhyChoose = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/why-choose");
      const data = await res.json();

      // Company name from DB
      setCompanyName(data.company_name || "");

      // Images from DB, labels static
      const featureList = [
        { img: data.image1, label: "Pure & Natural Ingredients" },
        { img: data.image2, label: "Chemical-Free Processing" },
        { img: data.image3, label: "Cold-Pressed Extraction" },
        { img: data.image4, label: "Rich Nutrients & Vitamins" },
        { img: data.image5, label: "Farm-Fresh & Locally Sourced" },
        { img: data.image6, label: "Sustainable Farming Support" },
        { img: data.image7, label: "Trusted by 250+ Farmers" },
        { img: data.image8, label: "Quality Tested & Verified" },
      ].filter(item => item.img);

      setFeatures(featureList);
    } catch (err) {
      console.error("Why choose fetch error:", err);
    }
  };

  return (
    <section className="why-vitalimes">
      {/* Hardcoded + DB company */}
      <h2 className="why-title">
        Why Choose {companyName}
      </h2>

      <div className="why-grid">
        {features.map((item, index) => (
          <div className="why-item" key={index}>
            <img
              src={`http://localhost:5000${item.img}`}
              alt={item.label}
            />
            <p>{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
