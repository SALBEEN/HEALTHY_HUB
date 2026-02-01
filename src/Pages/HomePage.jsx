import { useState, useEffect } from "react";
import "./Home.css";
import { Link } from "react-router-dom";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products?limit=8")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div className="home">
      {/* HERO */}
      <section className="hero">
        <div className="hero-overlay" />
        <div className="hero-content">
          <h1>Upgrade Your Style & Tech</h1>
          <p>Smart products. Clean design. Futuristic prices.</p>

          <Link to="/product" className="hero-btn">
            Shop Now
          </Link>
        </div>
      </section>

      {/* FEATURED */}
      <section className="featured">
        <h2>Featured Products</h2>

        <div className="products-grid">
          {products.map((product) => (
            <div className="product-preview" key={product.id}>
              <img src={product.image} alt={product.title} loading="lazy" />
              <h3>{product.title}</h3>
              <span>${product.price}</span>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">© 2025 ShopLite. Built for the future.</footer>
    </div>
  );
}
