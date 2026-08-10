import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const token = localStorage.getItem("token");

  if (!token || !user) {
    return (
      <div className="auth-page">
        <div className="auth-card">
          <h1>Please Login</h1>

          <p className="auth-subtitle">
            You need to login to view your profile.
          </p>

          <button
            className="auth-btn"
            onClick={() => navigate("/login")}
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <div className="auth-card">

        <h1>My Profile 👤</h1>

        <p className="auth-subtitle">
          Welcome to your QuantumShop account
        </p>

        <div className="profile-info">

          <div>
            <strong>Name</strong>
            <p>{user.name}</p>
          </div>

          <div>
            <strong>Email</strong>
            <p>{user.email}</p>
          </div>

          <div>
            <strong>Account Status</strong>
            <p>Active ✅</p>
          </div>

        </div>

        <button
          className="auth-btn"
          onClick={() => navigate("/")}
        >
          Continue Shopping
        </button>

      </div>
    </div>
  );
}

export default Profile;