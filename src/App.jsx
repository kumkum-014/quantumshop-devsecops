import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductDetails from "./pages/ProductDetails";
import OrderSuccess from "./pages/OrderSuccess";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import Wishlist from "./pages/Wishlist";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import "./App.css";

function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <BrowserRouter>

          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />

            <Route
              path="/products"
              element={<Products />}
            />

            <Route
              path="/product/:id"
              element={<ProductDetails />}
            />

            <Route
              path="/cart"
              element={<Cart />}
            />

            <Route
              path="/checkout"
              element={<Checkout />}
            />

            <Route
              path="/login"
              element={<Login />}
            />

            <Route
              path="/register"
              element={<Register />}
            />

            <Route
              path="/Wishlist"
              element={<Wishlist />}
              />


            <Route
              path="/profile"
              element={<Profile />}
            />

            <Route
              path="/order-success"
              element={<OrderSuccess />}
            />

            <Route
              path="/orders"
              element={<Orders />}
            />

          </Routes>

        </BrowserRouter>
      </WishlistProvider>
    </CartProvider>
  );
}

export default App;