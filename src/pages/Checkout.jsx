import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Checkout() {
  const navigate = useNavigate();

  const {
    cartItems,
    totalPrice,
    clearCart,
  } = useCart();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [payment, setPayment] = useState("COD");

  const [loading, setLoading] = useState(false);

  const handleOrder = async (e) => {
    e.preventDefault();

    // Check cart
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      navigate("/products");
      return;
    }

    // Check login
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login before placing an order.");
      navigate("/login");
      return;
    }

    setLoading(true);

    try {
      // Prepare cart items
      const orderItems = cartItems.map((item) => ({
        productId: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity || 1,
        emoji: item.emoji || "",
      }));

      // Prepare order data
      const orderData = {
        items: orderItems,

        totalAmount: totalPrice,

        shippingAddress: {
          name: name.trim(),
          address: address.trim(),
          city: city.trim(),
          state: "Uttar Pradesh",
          pincode: pincode.trim(),
        },

        paymentMethod: payment,
      };

      console.log("Sending order:", orderData);

      // Send order to backend
      const response = await fetch(
        "http://localhost:5000/api/orders",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify(orderData),
        }
      );

      const data = await response.json();

      console.log("Order response:", data);

      // Backend error
      if (!response.ok) {
        alert(
          data.message ||
            "Failed to place order."
        );

        return;
      }

      // Save latest order for success page
      localStorage.setItem(
        "lastOrder",
        JSON.stringify(data.order)
      );

      // Clear cart only after successful order
      clearCart();

      alert(
        "Order placed successfully! 🎉"
      );

      // Go to success page
      navigate("/order-success");

    } catch (error) {
      console.error(
        "Order error:",
        error
      );

      alert(
        "Unable to connect to server. Please make sure backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-page">

      <div className="checkout-card">

        <h1>Checkout</h1>

        <p className="checkout-subtitle">
          Complete your order
        </p>

        <form onSubmit={handleOrder}>

          {/* Name */}

          <label>Full Name</label>

          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            required
          />

          {/* Address */}

          <label>Address</label>

          <textarea
            placeholder="Enter your full address"
            value={address}
            onChange={(e) =>
              setAddress(e.target.value)
            }
            required
          />

          {/* City */}

          <label>City</label>

          <input
            type="text"
            placeholder="Enter your city"
            value={city}
            onChange={(e) =>
              setCity(e.target.value)
            }
            required
          />

          {/* PIN */}

          <label>PIN Code</label>

          <input
            type="text"
            placeholder="Enter PIN code"
            value={pincode}
            onChange={(e) =>
              setPincode(e.target.value)
            }
            maxLength={6}
            pattern="[0-9]{6}"
            required
          />

          {/* Payment */}

          <label>Payment Method</label>

          <select
            value={payment}
            onChange={(e) =>
              setPayment(e.target.value)
            }
          >
            <option value="COD">
              Cash on Delivery
            </option>

            <option value="UPI">
              UPI
            </option>

            <option value="Card">
              Credit / Debit Card
            </option>
          </select>

          {/* Total */}

          <div className="checkout-total">

            <span>
              Total Amount
            </span>

            <strong>
              ₹
              {totalPrice.toLocaleString(
                "en-IN"
              )}
            </strong>

          </div>

          {/* Place Order */}

          <button
            type="submit"
            className="place-order-btn"
            disabled={loading}
          >
            {loading
              ? "Placing Order..."
              : "🛍️ Place Order"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default Checkout;