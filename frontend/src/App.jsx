import { useState } from "react";
import Dashboard from "./Dashboard.jsx";
import "./App.css";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Show dashboard when the URL is /dashboard
  if (window.location.pathname === "/dashboard") {
    return <Dashboard />;
  }

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Invalid email or password.");
        setLoading(false);
        return;
      }

      // Save the logged-in user
      localStorage.setItem("user", JSON.stringify(data.user));

      // Navigate to dashboard
      window.location.assign("/dashboard");
    } catch (error) {
      console.error(error);
      setError("Cannot connect to backend. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="login-card">

        {/* Brand */}
        <div className="brand">
          <div className="brand-icon">N</div>

          <h1>NexaAuth</h1>
        </div>

        {/* Welcome */}
        <div className="welcome">
          <h2>Welcome back</h2>

          <p>
            Sign in to continue to your dashboard
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin}>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email">
              Email Address
            </label>

            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="form-group">
            <label htmlFor="password">
              Password
            </label>

            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Backend Error */}
          {error && (
            <div className="server-error">
              {error}
            </div>
          )}

          {/* Login Button */}
          <button
            type="submit"
            className="login-button"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

        </form>

        {/* Footer */}
        <p className="footer-text">
          © 2026 NexaAuth. Built for learning.
        </p>

      </div>
    </div>
  );
}

export default App;