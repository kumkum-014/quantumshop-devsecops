import { useWishlist } from "../context/WishlistContext";
import { useNavigate } from "react-router-dom";

function Wishlist() {
  const {
    wishlistItems,
    removeFromWishlist,
  } = useWishlist();

  const navigate = useNavigate();

  if (wishlistItems.length === 0) {
    return (
      <div className="wishlist-page empty-wishlist">
        <h1>My Wishlist ❤️</h1>

        <p>
          Your wishlist is empty.
        </p>

        <button
          onClick={() => navigate("/products")}
        >
          Browse Products
        </button>
      </div>
    );
  }

  return (
    <div className="wishlist-page">

      <h1>My Wishlist ❤️</h1>

      <p className="wishlist-subtitle">
        Your saved products
      </p>

      <div className="wishlist-grid">

        {wishlistItems.map((product) => (

          <div
            className="wishlist-card"
            key={product.id}
          >

            <div className="wishlist-image">
              {product.emoji}
            </div>

            <h3>{product.name}</h3>

            <p>
              {product.category}
            </p>

            <p className="wishlist-rating">
              ⭐ {product.rating}
            </p>

            <h3 className="wishlist-price">
              ₹{product.price.toLocaleString("en-IN")}
            </h3>

            <div className="wishlist-actions">

              <button
                onClick={() =>
                  navigate(`/product/${product.id}`)
                }
              >
                View Details
              </button>

              <button
                className="remove-wishlist"
                onClick={() =>
                  removeFromWishlist(product.id)
                }
              >
                Remove ❤️
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Wishlist;