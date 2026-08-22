import { useState } from "react";
import AUTH_API from "../api/authApi";

function Login({ onLogin, goToSignup }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  async function handleLogin(e) {

    e.preventDefault();

    setError("");
    setLoading(true);

    try {

      const response = await AUTH_API.post("/login", {
        email,
        password,
      });

      sessionStorage.setItem("token", response.data.token);
      sessionStorage.setItem("user", JSON.stringify(response.data.user));

      onLogin(response.data.user);

    } catch (error) {

      setError(
        error.response?.data?.message ||
        "Login failed"
      );

    } finally {

      setLoading(false);

    }
  }


  return (
    <div className="auth-container">

      <div className="auth-box">

        <h1>🔐 Login</h1>

        {error && (
          <p className="error-message">
            {error}
          </p>
        )}

        <form onSubmit={handleLogin}>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
          />

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />

          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>

        </form>


        <p className="auth-switch">
          Don't have an account?
        </p>

        <button
          className="switch-button"
          onClick={goToSignup}
        >
          Create Account
        </button>

      </div>

    </div>
  );
}

export default Login;