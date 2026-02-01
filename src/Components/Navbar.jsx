import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";

export default function Navbar() {
  const {
    user,
    cartCount,
    setUser,
    signOut,
    setSelectedCategory,
    selectedCategory,
  } = useContext(AppContext);

  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="navbar">
      <div className="nav-left">
        <h1 className="logo">ShopLite</h1>
      </div>

      {/* Desktop */}
      <div className="nav-links">
        <Link to="/">
          <i className="fa-solid fa-house"></i>
        </Link>
        <Link to="/product">Products</Link>
        <Link to="/admindashboard">
          <i className="fa-solid fa-users"></i>
        </Link>
        <Link to="/negociate">Negociate</Link>

        <div className="search-box">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input type="search" placeholder="Search products…" />
        </div>

        <div className="filter-box">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="All">All</option>
            <option value="beauty">Beauty</option>
            <option value="fragrances">Fragrances</option>
            <option value="furniture">Furniture</option>
            <option value="groceries">Groceries</option>
          </select>
        </div>

        {/* <div className="cart-edit">
          <Link to="/cartpage">
            <i className="fa-solid fa-cart-shopping"></i>
            <span className="cart-count">{cartCount}</span>
          </Link>
        </div> */}
      </div>

      <div className={`cart-edit ${isOpen ? "show" : ""}`}>
        <Link to="/cartpage">
          <i className="fa-solid fa-cart-shopping"></i>
          <span className="cart-count">{cartCount}</span>
        </Link>
      </div>

      {/* Sign out button (desktop) */}
      {user && (
        <div className="signout-desktop">
          <button
            onClick={() => {
              if (typeof signOut === "function") signOut();
              else {
                localStorage.removeItem("token");
                setUser(null);
              }
              navigate("/");
            }}
            className="signout-btn"
          >
            Sign Out
          </button>
        </div>
      )}

      {/* Hamburger */}
      <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        <i className={isOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars"}></i>
      </div>

      {/* Mobile */}
      <div className={`mobile-menu ${isOpen ? "show" : ""}`}>
        <Link to="/">Home</Link>
        <Link to="/product">Products</Link>
        <Link to="/admindashboard">Admin</Link>
        <Link to="/setting">Settings</Link>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="All">All</option>
          <option value="beauty">Beauty</option>
          <option value="fragrances">Fragrances</option>
          <option value="furniture">Furniture</option>
          <option value="groceries">Groceries</option>
        </select>
      </div>
    </div>
  );
}
// "fa-solid fa-bars"S
// "fa-solid fa-xmark"
