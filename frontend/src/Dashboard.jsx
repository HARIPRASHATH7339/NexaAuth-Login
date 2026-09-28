import "./Dashboard.css";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.assign("/");
  };

  return (
    <div className="dashboard">
      <div className="dashboard-card">
        <div className="dashboard-icon">✓</div>

        <h1>Welcome to NexaAuth</h1>

        <p className="success-message">
          Login successful!
        </p>

        <div className="user-box">
          <p>Logged in as</p>

          <strong>
            {user?.email}
          </strong>
        </div>

        <button
          className="logout-button"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard;