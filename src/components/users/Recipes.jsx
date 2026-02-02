// src/components/Recipes.jsx
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Recipes() {
  const base =
    typeof process !== "undefined" && process.env && process.env.PUBLIC_URL
      ? process.env.PUBLIC_URL
      : "";
const [recipes, setRecipes] = useState([]);
useEffect(() => {
  const fetchRecipes = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/recipes");
      setRecipes(res.data);
    } catch (err) {
      console.error("Error fetching recipes:", err);
    }
  };

  fetchRecipes();
}, []);



  return (
    <section style={{ padding: "2rem 0", background: "#f8f8f8" }}>
      <Container>
        <h3 className="text-center mb-4" style={{ fontWeight: "700" }}>
          Recipes
        </h3>

        <Row className="justify-content-center g-4">
          {recipes.map((recipe, i) => (
            <Col
              key={i}
              xs={12}
              sm={6}
              md={4}
              lg={3}
              className="d-flex justify-content-center"
            >
              <Card
                style={{
                  width: "100%",
                  border: "none",
                  borderRadius: "15px",
                  overflow: "hidden",
                  boxShadow: "0 10px 35px rgba(0,0,0,0.12)",
                  transition: "0.3s ease",
                }}
                className="recipe-card"
              >
               <Card.Img src={`http://localhost:5000${recipe.image_url}`} 
                  style={{
                    height: "320px",
                    width: "100%",
                    objectFit: "cover",
                  }}
                />

                <Card.Body style={{ padding: "1rem" }}>
                  <Card.Title
                    style={{ fontWeight: "600", fontSize: "1.05rem" }}
                  >
                    {recipe.title}
                  </Card.Title>

                  <Card.Text style={{ fontSize: "0.9rem", color: "#666" }}>
                    {recipe.description}
                  </Card.Text>

                  {/* <a href={recipe.href} style={{ textDecoration: "none" }}>
                    <button
                      className="btn btn-success"
                      style={{
                        width: "100%",
                        borderRadius: "8px",
                        fontWeight: "600",
                      }}
                    >
                      View Recipe
                    </button>
                  </a> */}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* CSS Inside Component */}
      <style>{`
        .recipe-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 18px 45px rgba(0,0,0,0.18);
        }

        @media (max-width: 576px) {
          .recipe-card img {
            height: 260px !important;
          }
        }
      `}</style>
    </section>
  );
}