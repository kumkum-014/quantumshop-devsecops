import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    e.stopPropagation();

    addToCart(product);
    alert(product.name + " added to cart!");
  };

  const handleViewDetails = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="product-card">

      <div className="product-image">
        {product.emoji}
      </div>

      <h3>{product.name}</h3>

      <p className="category">
        {product.category}
      </p>

      <p className="rating">
        ⭐ {product.rating}
      </p>

      <p className="price">
        ₹{product.price.toLocaleString("en-IN")}
      </p>

      <div className="product-buttons">

        <button
          className="details-btn"
          onClick={handleViewDetails}
        >
          View Details
        </button>

        <button
          className="add-cart-btn"
          onClick={handleAddToCart}
        >
          🛒 Add to Cart
        </button>

      </div>

    </div>
  );
}

export default ProductCard;