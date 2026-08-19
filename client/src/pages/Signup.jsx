import { useState } from "react";
import AUTH_API from "../api/authApi";

function Signup({ onSignup, goToLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignup(e) {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      await AUTH_API.post("/signup", {
        name,
        email,
        password,
      });

      alert("Signup successful! Please login.");

      goToLogin();

    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Signup failed"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-container">

      <div className="auth-box">

        <h1>📝 Signup</h1>

        {error && (
          <p className="error-message">
            {error}
          </p>
        )}

        <form onSubmit={handleSignup}>

          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Signup"}
          </button>

        </form>

        <p className="auth-switch">
          Already have an account?
        </p>

        <button
          className="switch-button"
          onClick={goToLogin}
        >
          Login
        </button>

      </div>

    </div>
  );
}

export default Signup;