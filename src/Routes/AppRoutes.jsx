//import
import { Routes, Route } from "react-router-dom";
import AdminDashboard from "../Pages/AdminDashboard";
import CartPage from "../Pages/CartPage";
import ProductCheckout from "../Pages/ProductCheckout";
import HomePage from "../Pages/HomePage";
import Negociate from "../Pages/Negociate";
import ProductDetail from "../Pages/ProductDetail";
import Signinform from "../Authentication/Component/Signinform";
import Signupform from "../Authentication/Component/Signupform";
import Product from "../Components/Product";

export default function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/cartpage" element={<CartPage />} />
        <Route path="/negociate" element={<Negociate />} />
        <Route path="/product" element={<Product />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/product/:id/checkout/" element={<ProductCheckout />} />
        <Route path="/signin" element={<Signinform />}></Route>
        <Route path="/signup" element={<Signupform />}></Route>
      </Routes>
    </>
  );
}
