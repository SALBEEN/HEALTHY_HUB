import { isValidElement, useState } from "react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import Card from "../Components/Card";

export default function () {
  const { setCartCount, cartCount, setCartItems, cartItems } =
    useContext(AppContext);


  return (
    <>
      <div className="CartItemContainer">
        <h1>Cart Items</h1>
        {cartItems && cartItems.length > 0 ? (
          cartItems.map((item) => (
            <Card
              key={item.id}
              Image={item.thumbnail}
              productTitle={item.title}
              productPrice={item.price}
              productDiscountPercentage={item.discountPercentage}
              productStock={item.stock}
              productCategory={item.category}
              itemId={item.id}
              id={item.id}
              removeFromCart={() => {
                const FakeCartItem = cartItems.filter((p) => p.id != item.id);
                setCartItems(FakeCartItem);
                setCartCount((prev) => prev - 1);
                alert("Item removed from cart");
              }}
              checkOutCartProduct={() => {
                alert("Thanks for choosing ShopLite.....!!!");
              }}
            />
          ))
        ) : (
          <>
            <h1>Cart Is Empty</h1>
          </>
        )}
      </div>
    </>
  );
}
