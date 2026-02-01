import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import "./productDetail.css";
import { Link } from "react-router-dom";
import Card from "../Components/Card";

export default function ProductDetail() {
  const { product, setCartItems, setCartCount, cartItems, cartCount } =
    useContext(AppContext);
  const { id } = useParams();

  // product may be empty while data is loading, so guard access
  const productForDetail = product.find((p) => String(p.id) === String(id));

  if (!productForDetail) {
    return (
      <div className="main">
        <h1>Loading product...</h1>
      </div>
    );
  }

  function addToCart() {
    setCartItems((prev) => {
      // avoid duplicates by id
      if (prev.find((p) => p.id === productForDetail.id)) {
        alert("item already selected");
        return prev;
      }
      return [...prev, productForDetail];
    });
    if (cartItems.find((p) => p.id === productForDetail.id)) return cartCount;
    return setCartCount((prev) => prev + 1);
  }

  //   function checkOutProduct() {
  //     alert("Item processed for check out");
  //   }
  const allImage = [productForDetail.thumbnail, ...productForDetail.images];
  const [current, setCurrent] = useState(0);

  const nextImage = () => {
    setCurrent((prev) => (prev === allImage.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrent((prev) => (prev === 0 ? allImage.length - 1 : prev - 1));
  };

  return (
    <div className="main">
      <div className="content">
        <div className="image">
          <button onClick={prevImage}>
            <i id="image-slider-arrow" class="fa-solid fa-arrow-left"></i>
          </button>
          <img src={allImage[current]} alt={productForDetail.title} />
          <button onClick={nextImage}>
            <i id="image-slider-arrow" class="fa-solid fa-arrow-right-long"></i>
          </button>
        </div>
        <div className="product-detail-container">
          <p className="title">{productForDetail.title}</p>
          <p className="description">{productForDetail.description}</p>
          <div className="price-discount">
            <span>Price</span>
            <p className="price">${productForDetail.price}</p>
            <span>Discount</span>
            <p className="discount">{productForDetail.discountPercentage}</p>
          </div>
          <div className="stock-rating">
            <span>Stock</span>
            <p className="stock">{productForDetail.stock}</p>
            <span>Rating</span>
            <p className="rating">{productForDetail.rating}</p>
          </div>
          <div className="brand-category">
            <span>Brand</span>
            <p className="brand">{productForDetail.brand}</p>
            <span>Category</span>
            <p className="category">{productForDetail.category}</p>
          </div>

          <div className="buttons">
            <button onClick={addToCart}>Add to Cart</button>

            <Link to={`/product/${id}/checkout/`}>
              <button>Check Out</button>
            </Link>
          </div>
          {/* <Card idForRouting={id} /> */}
        </div>
      </div>
    </div>
  );
}
