
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function OrderSuccess() {
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);

  useEffect(() => {
    const savedOrder = localStorage.getItem("lastOrder");

    if (savedOrder) {
      setOrder(JSON.parse(savedOrder));
    }
  }, []);

  if (!order) {
    return (
      <div className="auth-page">
        <div className="auth-card">
          <h1>No Order Found</h1>

          <p className="auth-subtitle">
            We couldn't find your recent order.
          </p>

          <button
            className="auth-btn"
            onClick={() => navigate("/products")}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="order-success-page">

      <div className="order-success-card">

        <div className="success-icon">
          ✅
        </div>

        <h1>Order Placed Successfully!</h1>

        <p className="success-message">
          Thank you for shopping with QuantumShop 🎉
        </p>

        <div className="order-success-info">

          <div>
            <strong>Order ID</strong>

            <p>
              #{order._id?.slice(-8) || order.id}
            </p>
          </div>

          <div>
            <strong>Order Status</strong>

            <p>
              {order.status || "Pending"}
            </p>
          </div>

          <div>
            <strong>Payment Method</strong>

            <p>
              {order.paymentMethod || "COD"}
            </p>
          </div>

          <div>
            <strong>Total Amount</strong>

            <p>
              ₹
              {(
                order.totalAmount ||
                order.total ||
                0
              ).toLocaleString("en-IN")}
            </p>
          </div>

        </div>

        <div className="success-actions">

          <button
            className="auth-btn"
            onClick={() => navigate("/orders")}
          >
            📦 View My Orders
          </button>

          <button
            className="secondary-btn"
            onClick={() => navigate("/products")}
          >
            Continue Shopping
          </button>

        </div>

      </div>

    </div>
  );
}

export default OrderSuccess;