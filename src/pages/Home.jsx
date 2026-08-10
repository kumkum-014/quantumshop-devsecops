import ProductCard from "../components/ProductCard";
import products from "../data/products";

function Home() {
  return (
    <div className="home">

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <p className="hero-small">WELCOME TO QUANTUMSHOP</p>

          <h1>
            Shop Smart.
            <br />
            Shop Better.
          </h1>

          <p>
            Discover quality products at amazing prices.
            Everything you need, all in one place.
          </p>

          <button className="shop-btn">
            Shop Now
          </button>
        </div>
      </section>

      {/* Categories */}
      <section className="categories-section">
        <h2>Shop by Category</h2>

        <div className="categories">

          <div className="category-card">
            <div className="category-icon">💻</div>
            <h3>Electronics</h3>
            <p>Latest gadgets & devices</p>
          </div>

          <div className="category-card">
            <div className="category-icon">👗</div>
            <h3>Fashion</h3>
            <p>Trendy clothes & accessories</p>
          </div>

          <div className="category-card">
            <div className="category-icon">👟</div>
            <h3>Shoes</h3>
            <p>Comfortable & stylish shoes</p>
          </div>

          <div className="category-card">
            <div className="category-icon">🎒</div>
            <h3>Accessories</h3>
            <p>Complete your everyday style</p>
          </div>

        </div>
      </section>

      {/* Featured Products */}
      <section className="products-section">

        <div className="section-heading">
          <h2>Featured Products</h2>
          <p>Our most popular products</p>
        </div>

        <div className="products-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>

      </section>

    </div>
  );
}

export default Home;