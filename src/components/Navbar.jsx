import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

function Navbar() {
  const { totalItems } = useCart();
  const { wishlistItems } = useWishlist();

  const navigate = useNavigate();

  const isLoggedIn =
    localStorage.getItem("token") &&
    localStorage.getItem("isLoggedIn") === "true";

  const handleLogout = () => {
    // Remove authentication data
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");

    alert("Logged out successfully! 👋");

    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">

        {/* Logo */}
        <Link to="/" className="logo">
          QuantumShop
        </Link>

        {/* Navigation Links */}
        <div className="nav-links">

          <Link to="/">
            Home
          </Link>

          <Link to="/products">
            Products
          </Link>

          <Link to="/wishlist">
            ❤️ Wishlist

            {wishlistItems.length > 0 && (
              <span className="nav-count">
                {wishlistItems.length}
              </span>
            )}
          </Link>

          <Link to="/cart">
            🛒 Cart

            {totalItems > 0 && (
              <span className="nav-count">
                {totalItems}
              </span>
            )}
          </Link>

          <Link to="/orders">
            📦 Orders
          </Link>

          {isLoggedIn ? (
            <>
              <Link to="/profile">
                👤 Account
              </Link>

              <button
                type="button"
                className="logout-btn"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                Login
              </Link>

              <Link to="/register">
                Register
              </Link>
            </>
          )}

        </div>
      </div>
    </nav>
  );
}

export default Navbar;