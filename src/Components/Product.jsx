// import { useContext, useState } from "react";
// import { AppContext } from "../context/AppContext";
// import Card from "./Card";
// import "./Product.css";

// export default function Product() {
//   const {
//     setCartCount,
//     cartCount,
//     setCartItems,
//     cartItems,
//     selectedCategory,
//     product,
//   } = useContext(AppContext);

//   const [favItem, setFavItem] = useState([]);

//   // toggle favorite status for a product id
//   function handleFavButton(id) {
//     setFavItem((prev) => {
//       if (prev.includes(id)) return prev.filter((i) => i !== id);
//       return [...prev, id];
//     });
//   }

//   const filteredProduct =
//     selectedCategory === "All"
//       ? product
//       : product.filter((p) => p.category === selectedCategory);

//   return (
//     <>
//       <h1
//         style={{
//           textAlign: "center",
//           marginTop: "15px",
//           textTransform: "uppercase",
//         }}
//       >
//         {selectedCategory}
//       </h1>
//       <div className="products">
//         {filteredProduct.map((item) => (
//           <Card
//             key={item.id}
//             itemId={item.id}
//             Image={item.thumbnail}
//             productTitle={item.title}
//             productDescription={item.description}
//             productPrice={item.price}
//             productDiscountPercentage={item.discountPercentage}
//             productStock={item.stock}
//             productRating={item.rating}
//             productBrand={item.brand}
//             productCategory={item.category}
//             id={item.id}
//           />
//         ))}
//       </div>
//     </>
//   );
// }

import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import Card from "./Card";
import "./Product.css";

export default function Product() {
  const { selectedCategory, product } = useContext(AppContext);
  const [favItem, setFavItem] = useState([]);

  function handleFavButton(id) {
    setFavItem((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  }

  const filteredProduct =
    selectedCategory === "All"
      ? product
      : product.filter((p) => p.category === selectedCategory);

  return (
    <div className="product-page">
      <h1 className="category-title">{selectedCategory}</h1>

      <div className="product-grid">
        {filteredProduct.map((item) => (
          <Card
            key={item.id}
            itemId={item.id}
            Image={item.thumbnail}
            productTitle={item.title}
            productDescription={item.description}
            productPrice={item.price}
            productDiscountPercentage={item.discountPercentage}
            productStock={item.stock}
            productRating={item.rating}
            productBrand={item.brand}
            productCategory={item.category}
            id={item.id}
          />
        ))}
      </div>
    </div>
  );
}
