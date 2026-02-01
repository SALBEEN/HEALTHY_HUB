import { use, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useParams } from "react-router-dom";
import { useState } from "react";
import "./checkout.css";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
export default function ProductCheckout() {
  // guard if AppContext or product isn't ready yet
  const context = useContext(AppContext) || {};
  const { product = [] } = context;
  const { id } = useParams();

  // if product list isn't loaded yet
  if (!product || product.length === 0) {
    return (
      <div className="checkout-main">
        <div className="checkout-content">Loading product...</div>
      </div>
    );
  }

  const productForCheckout = product.find((p) => String(p.id) === String(id));

  // if product with id not found
  if (!productForCheckout) {
    return (
      <div className="checkout-main">
        <div className="checkout-content">Product not found.</div>
      </div>
    );
  }

  const allImage = [
    productForCheckout.thumbnail,
    ...(productForCheckout.images || []),
  ];
  const [current, setCurrent] = useState(0);

  const nextImage = () => {
    setCurrent((prev) => (prev === allImage.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrent((prev) => (prev === 0 ? allImage.length - 1 : prev - 1));
  };

  //   extracting product price and discount percentage

  const ProductPrice = productForCheckout.price;

  const [currentQuantity, setCurrentQuantity] = useState(1);
  const [productPrice, setProductPrice] = useState(ProductPrice);

  function IncreseQuantity() {
    setCurrentQuantity((prev) => prev + 1);
    setProductPrice(productPrice + ProductPrice);
  }
  function DecreaseQuantity() {
    if (currentQuantity === 1) {
      return currentQuantity;
    } else {
      setCurrentQuantity((prev) => prev - 1);
      setProductPrice(productPrice - ProductPrice);
    }
  }

  const discountAmount =
    productPrice * (productForCheckout.discountPercentage / 100);

  const NetAmountAfterDiscount = productPrice - discountAmount;

  function ClearInputField() {}
  function ConfirmOrder() {}

  const [formData, setFormData] = useState({
    address: "",
    contact: "",
    payment: "",
  });

  const [isConfirm, setIsConfirm] = useState(false);
  // const [isBlur, setIsBlur] = useState(false);

  function handleConfirmButton() {
    if (formData.contact == "" && formData.address == "") {
      alert("Please fill out the form there");
    } else {
      // setIsConfirm(!isConfirm);
      // setIsBlur(!isBlur);
      if (formData.payment == "") {
        alert("fill the payment mode");
      } else {
        setIsConfirm(!isConfirm);
      }
    }
  }

  function handleFinalConfirmation() {
    toast.success("Order placed successfully!");
  }

  return (
    // main container
    <div className="checkout-main">
      {/* // inner container having image and detail on both side */}
      <div className="checkout-container">
        {/* // for image in left side */}
        <div className="checkout-image-container">
          <button onClick={prevImage}>
            <i class="fa-solid fa-angle-left"></i>
          </button>
          <img
            src={allImage[current]}
            alt={productForCheckout.title || "product image"}
          />
          <button onClick={nextImage}>
            <i class="fa-solid fa-chevron-right"></i>
          </button>
        </div>
        {/* //for content on right side */}
        <div className="checkout-content">
          <div className="checkout-title">{productForCheckout.title}</div>
          <div className="checkout-description">
            {productForCheckout.description}
          </div>
          <div className="conten-price-container">
            <span className="checkout-price-heading">Cost Per Item</span>
            <div className="checkout-price">${productForCheckout.price}</div>
          </div>
          <div className="checkout-quantity-container">
            <span className="quantity-heading">No of product</span>
            <button onClick={DecreaseQuantity}>-</button>
            <span className="checkout-current-quantity">{currentQuantity}</span>
            <button onClick={IncreseQuantity}>+</button>
          </div>
          <div className="checkout-product-billing">
            <div className="checkout-price-per-item">
              <span className="price-per-item-heading">
                Price before Discount
              </span>
              <span className="checkout-price-nodiscount">
                ${productPrice.toFixed(2)}
              </span>
            </div>
            <div className="checkout-discount">
              <span className="discount-heading">Discount</span>
              <span className="discount-amount">
                ${discountAmount.toFixed(2)}
              </span>
            </div>
            <div className="checkout-product-net-amount">
              <span className="product-net-amount-heading">Net Price</span>
              <span className="product-net-amount">
                ${NetAmountAfterDiscount.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* options for payment  */}

      <div className="checkout-user-choice-detail">
        <div className="checkout-main-header-user-choice">
          <p className="heading-delivery-detail">User Detail for Delivery</p>
        </div>
        <div className="checkout-delivery-location">
          <span className="checkout-delivery-location-heading">
            Delivery Location
          </span>
          <input
            type="text"
            value={formData.contact}
            onChange={(e) =>
              setFormData({ ...formData, contact: e.target.value })
            }
            className="user-delivery-location"
            placeholder="Contact Number"
          />
          <input
            type="text"
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
            className="user-delivery-location"
            placeholder="Enter Your location"
          />
        </div>
        {/* user payment type  */}
        <div className="checkout-payment-type">
          <p className="payment-type-heading">Payment Type</p>
          <div className="checkout-paymanr-options">
            <label htmlFor="cashondelivery">Cash on Delivery</label>
            <input
              name="payment"
              value="cashondelivery"
              checked={formData.payment === "cashondelivery"}
              onChange={(e) =>
                setFormData({ ...formData, payment: e.target.value })
              }
              type="radio"
            />
            <label htmlFor="Card">Card</label>
            <input
              name="payment"
              value="card"
              checked={formData.payment === "card"}
              onChange={(e) =>
                setFormData({ ...formData, payment: e.target.value })
              }
              type="radio"
            />
            <label htmlFor="Banking">Banking</label>
            <input
              name="payment"
              value="banking"
              checked={formData.payment === "banking"}
              onChange={(e) =>
                setFormData({ ...formData, payment: e.target.value })
              }
              type="radio"
            />
            <label htmlFor="Wallet">Wallet</label>
            <input
              name="payment"
              value="wallet"
              checked={formData.payment === "wallet"}
              onChange={(e) =>
                setFormData({ ...formData, payment: e.target.value })
              }
              type="radio"
            />
          </div>
        </div>
      </div>
      <div className="checkout-buttons">
        <button
          onClick={() => setFormData({ contact: "", address: "" })}
          className="Reset-checkout-detail"
        >
          Reset
        </button>
        <button className="Confirm-checkout" onClick={handleConfirmButton}>
          Confirm
        </button>
        {isConfirm && (
          <>
            <div className="final-confirmation-detail">
              <div className="final-delivery-contact">
                <label htmlFor="" id="final-delivery-contact-heading">
                  Customer Contact
                </label>
                <span id="final-delivery-contact-value">
                  {formData.contact}
                </span>
              </div>
              <div className="final-delivery-location">
                <label htmlFor="" id="final-delivery-location-heading">
                  Delivery Address
                </label>
                <span id="final-delivery-location-value">
                  {formData.address}
                </span>
              </div>
              <div className="unit-price">
                <div className="final-unit">
                  <label htmlFor="" id="final-unit-heading">
                    Quantity
                  </label>
                  <span id="final-unit-value">{currentQuantity}</span>
                </div>
                <div className="final-price">
                  <label htmlFor="" id="final-price-heading">
                    Total Price
                  </label>
                  <span id="final-price-amount">
                    ${NetAmountAfterDiscount.toFixed(2)}
                  </span>
                </div>
              </div>
              <div className="final-buttons">
                <div className="final-cancel-button-container">
                  <button
                    className="final-cancel-button-container"
                    onClick={() => setIsConfirm(!isConfirm)}
                  >
                    Cancle
                  </button>
                </div>
                <div className="final-confirm-button-container">
                  <Link to="/product">
                    <button
                      id="final-confirm-button"
                      onClick={handleFinalConfirmation}
                    >
                      Confirm
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
