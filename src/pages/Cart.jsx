import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

function Cart() {
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    totalItems,
    totalPrice,
  } = useCart();

  return (
    <div className="cart-page">

      <h1>Shopping Cart 🛒</h1>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <h2>Your cart is empty</h2>
          <p>Add some products to your cart.</p>
        </div>
      ) : (
        <>
          <p className="total-items">
            Total Items: {totalItems}
          </p>

          <div className="cart-items">

            {cartItems.map((item) => (
              <div className="cart-item" key={item.id}>

                <div className="cart-item-image">
                  {item.emoji}
                </div>

                <div className="cart-item-details">

                  <h3>{item.name}</h3>

                  <p>
                    Category: {item.category}
                  </p>

                  <p>
                    Price: ₹{item.price.toLocaleString("en-IN")}
                  </p>

                  {/* Quantity Controls */}
                  <div className="quantity-controls">

                    <button
                      onClick={() => decreaseQuantity(item.id)}
                    >
                      −
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() => increaseQuantity(item.id)}
                    >
                      +
                    </button>

                  </div>

                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>

                </div>

              </div>
            ))}

          </div>

          {/* Cart Summary */}
          <div className="cart-summary">

            <h2>
              Total: ₹{totalPrice.toLocaleString("en-IN")}
            </h2>

            <button
              className="clear-cart-btn"
              onClick={clearCart}
            >
              Clear Cart
            </button>

            <Link to="/checkout" className="checkout-btn">
              Proceed to Checkout
            </Link>

          </div>
        </>
      )}

    </div>
  );
}

export default Cart;