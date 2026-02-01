import { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // initialize product with the products array (not a nested array)
  const [product, setProduct] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All");

  // IMPORTANT: do NOT automatically mark the user as signed-in just because a
  // token exists in localStorage. That causes the UI (Navbar) to appear before
  // an explicit sign-in in this session. The app sets user when the user
  // successfully signs in or signs up (see Signupform/Signinform). Keep the
  // token in localStorage for optional persistence, but restoring it should
  // be an explicit action (e.g. token validation) — so we avoid silently
  // granting access on load.

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => setProduct(data.products))
      .catch((err) => console.error("Error while fetching products:", err));
  }, []);

  return (
    <AppContext.Provider
      value={{
        cartItems,
        setCartItems,
        user,
        setUser,
        // helper to clear auth from both context and localStorage
        signOut: () => {
          localStorage.removeItem("token");
          setUser(null);
        },
        cartCount,
        setCartCount,
        selectedCategory,
        setSelectedCategory,
        setProduct,
        product,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
