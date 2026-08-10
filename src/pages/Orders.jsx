import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Orders() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login to view your orders.");
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:5000/api/orders/my-orders",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          alert(data.message || "Failed to fetch orders.");
          return;
        }

        setOrders(data.orders || []);
      } catch (error) {
        console.error("Orders error:", error);

        alert(
          "Unable to connect to server."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [navigate]);

  if (loading) {
    return (
      <div className="orders-page">
        <h1>My Orders</h1>
        <p>Loading your orders...</p>
      </div>
    );
  }

  return (
    <div className="orders-page">

      <div className="orders-container">

        <h1>My Orders 📦</h1>

        <p className="orders-subtitle">
          View your QuantumShop orders
        </p>

        {orders.length === 0 ? (
          <div className="empty-orders">

            <h2>No Orders Yet</h2>

            <p>
              You haven't placed any orders yet.
            </p>

            <button
              onClick={() => navigate("/products")}
            >
              Start Shopping
            </button>

          </div>
        ) : (
          <div className="orders-list">

            {orders.map((order) => (
              <div
                className="order-card"
                key={order._id}
              >

                <div className="order-header">

                  <div>
                    <strong>
                      Order #{order._id.slice(-6)}
                    </strong>

                    <p>
                      {new Date(
                        order.createdAt
                      ).toLocaleString()}
                    </p>
                  </div>

                  <span className="order-status">
                    {order.status}
                  </span>

                </div>

                <div className="order-items">

                  {order.items.map((item, index) => (
                    <div
                      className="order-item"
                      key={index}
                    >

                      <span className="order-item-emoji">
                        {item.emoji || "📦"}
                      </span>

                      <div>
                        <strong>
                          {item.name}
                        </strong>

                        <p>
                          ₹{item.price.toLocaleString("en-IN")}
                          {" × "}
                          {item.quantity}
                        </p>
                      </div>

                    </div>
                  ))}

                </div>

                <div className="order-footer">

                  <strong>
                    Total: ₹
                    {order.totalAmount.toLocaleString("en-IN")}
                  </strong>

                  <span>
                    {order.shippingAddress.city},{" "}
                    {order.shippingAddress.pincode}
                  </span>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

    </div>
  );
}

export default Orders;