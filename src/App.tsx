import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// Components
import Navbar from "./components/Navbar";
import CartButton from "./components/CartButton";
// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProductListPage from "./pages/ProductListPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import BlogPage from "./pages/BlogPage";
import Article from "./components/Article";
import CheckoutPage from "./pages/CheckoutPage"; // Fixed naming consistency
import CustomProduct from "./pages/CustomProduct";
import Cart from "./pages/Cart";
import OrderCompletePage from "./pages/OrderComplete"; // Add this page

// Context
import { CartProvider } from "./context/CartContext"; // Cart state management

const App: React.FC = () => {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <div className="content app-content">
          <CartButton />
          <Routes>
            {/* General Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/custom-product" element={<CustomProduct />} />

            {/* Product Routes */}
            <Route path="/products" element={<ProductListPage />} />
            <Route path="/products/:id" element={<ProductDetailPage />} />

            {/* Blog Routes */}
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/article/:id" element={<Article />} />

            {/* Cart Routes */}
            <Route path="/cart" element={<Cart />} />

            {/* Checkout */}
            <Route path="/checkout" element={<CheckoutPage />} />

            {/* Order Complete Page */}
            <Route path="/order-complete" element={<OrderCompletePage />} /> {/* New route for the complete order page */}
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
};

export default App;
