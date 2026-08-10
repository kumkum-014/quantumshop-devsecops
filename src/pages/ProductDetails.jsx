import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import ProductCard from "../components/ProductCard";
import products from "../data/products";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { addToCart } = useCart();

  const {
    isInWishlist,
    addToWishlist,
    removeFromWishlist,
  } = useWishlist();

  const product = products.find(
    (item) => item.id === Number(id)
  );

  // Product not found
  if (!product) {
    return (
      <div className="product-not-found">
        <h1>Product Not Found 😔</h1>

        <button onClick={() => navigate("/products")}>
          Back to Products
        </button>
      </div>
    );
  }

  // Add to Cart
  const handleAddToCart = () => {
    addToCart(product);

    alert(`${product.name} added to cart! 🛒`);
  };

  // Wishlist
  const handleWishlist = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);

      alert(`${product.name} removed from wishlist`);
    } else {
      addToWishlist(product);

      alert(`${product.name} added to wishlist ❤️`);
    }
  };

  // Related Products
  const relatedProducts = products
    .filter(
      (item) =>
        item.category === product.category &&
        item.id !== product.id
    )
    .slice(0, 4);

  const wishlisted = isInWishlist(product.id);

  return (
    <div className="product-details-page">

      {/* Back Button */}

      <button
        className="back-btn"
        onClick={() => navigate("/products")}
      >
        ← Back to Products
      </button>


      {/* =========================
          PRODUCT DETAILS
      ========================= */}

      <div className="product-details">

        {/* Product Emoji */}

        <div className="product-details-image">
          {product.emoji}
        </div>


        {/* Product Information */}

        <div className="product-details-info">

          <p className="product-category">
            {product.category}
          </p>

          <h1>
            {product.name}
          </h1>

          <div className="product-rating">
            ⭐ {product.rating}
          </div>

          <h2 className="product-details-price">
            ₹{product.price.toLocaleString("en-IN")}
          </h2>

          <p className="product-description">
            {product.description ||
              "High-quality product from QuantumShop. Designed to provide excellent value, quality and performance."}
          </p>


          {/* Buttons */}

          <div className="details-actions">

            {/* Add To Cart */}

            <button
              className="details-cart-btn"
              onClick={handleAddToCart}
            >
              🛒 Add to Cart
            </button>


            {/* Wishlist */}

            <button
              className={`wishlist-btn ${
                wishlisted ? "wishlisted" : ""
              }`}
              onClick={handleWishlist}
            >
              {wishlisted
                ? "❤️ Wishlisted"
                : "♡ Add to Wishlist"}
            </button>

          </div>

        </div>

      </div>


      {/* =========================
          RELATED PRODUCTS
      ========================= */}

      {relatedProducts.length > 0 && (
        <section className="related-products">

          <div className="related-heading">

            <h2>
              Related Products
            </h2>

            <p>
              You may also like these products
            </p>

          </div>


          <div className="related-grid">

            {relatedProducts.map((item) => (
              <ProductCard
                key={item.id}
                product={item}
              />
            ))}

          </div>

        </section>
      )}

    </div>
  );
}

export default ProductDetails;