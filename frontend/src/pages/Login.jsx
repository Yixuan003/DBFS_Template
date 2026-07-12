import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) throw new Error("Login failed");
      navigate("/home");
    } catch {
      setError("Could not reach the backend yet.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="auth-screen">
      <div className="auth-card">
        <div className="auth-brand">Straits Digital Bank</div>

        <form className="card elevated" onSubmit={handleSubmit}>
          <h1 className="text-title" style={{ marginBottom: "1.25rem" }}>
            Log in
          </h1>

          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className="input"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button className="btn btn-primary btn-block" type="submit" disabled={submitting}>
            {submitting ? "Logging in…" : "Log in"}
          </button>

          <div className="divider">or</div>

          <button
            type="button"
            className="btn btn-ghost btn-block"
            onClick={() => (window.location.href = "/api/auth/paypal/login")}
          >
            Log in with PayPal
          </button>

          {error && (
            <p className="text-soft" style={{ marginTop: "0.75rem" }}>
              {error}
            </p>
          )}
        </form>

        <div className="auth-footer-link">
          New here? <Link to="/signup">Create an account</Link>
        </div>
      </div>
    </div>
  );
}