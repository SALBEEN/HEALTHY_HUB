import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import "./Card.css";
import { Link } from "react-router-dom";

export default function ({
  productTitle,
  productPrice,
  removeFromCart,
  Image,
  productDiscountPercentage,
  productStock,
  productRating,
  productBrand,
  itemId,
  checkOutCartProduct,
  idForRouting,
}) {
  // const { setCartCount, cartCount, setCartItems, cartItems } =
  //   useContext(AppContext);

  return (
    <>
      <div className="card">
        <Link to={`/product/${itemId}`} className="card-link">
          <div className="card-image-wrapper">
            <img src={Image} alt={productTitle} loading="lazy" />
            {productDiscountPercentage && (
              <span className="discount-badge">
                {productDiscountPercentage}% OFF
              </span>
            )}
          </div>

          <div className="card-content">
            {productTitle && <h3 className="card-title">{productTitle}</h3>}

            {productPrice && productRating && (
              <div className="card-price-row">
                <span className="card-price">$ {productPrice}</span>
                <span className="card-rating">⭐ {productRating}</span>
              </div>
            )}

            <div className="card-info-row">
              {productBrand && (
                <span className="card-brand">{productBrand}</span>
              )}
              {productStock && (
                <span className="card-stock">Stock: {productStock}</span>
              )}
            </div>
          </div>
        </Link>

        {removeFromCart && (
          <button className="card-btn danger" onClick={removeFromCart}>
            Remove
          </button>
        )}
        {checkOutCartProduct && (
          <Link to={`/product/${idForRouting}/checkout/`}>
            <button className="card-btn danger">Check Out</button>
          </Link>
        )}
      </div>
    </>
  );
}
