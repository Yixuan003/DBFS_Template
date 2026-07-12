import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      if (!res.ok) throw new Error("Signup failed");
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
          <h1 className="text-title" style={{ marginBottom: "0.4rem" }}>
            Create an account
          </h1>
          <p className="text-soft" style={{ fontSize: "0.9rem", marginBottom: "1.25rem" }}>
            You'll connect PayPal next to fund your purchases.
          </p>

          <div className="field">
            <label htmlFor="name">Full name</label>
            <input
              id="name"
              className="input"
              placeholder="Alex Tan"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

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
            {submitting ? "Creating account…" : "Create account"}
          </button>

          <div className="divider">or</div>

          <button type="button" className="btn btn-ghost btn-block" onClick={() => (window.location.href = "/api/auth/paypal/login")}>
          Sign up with PayPal
          </button>

          {error && (
            <p className="text-soft" style={{ marginTop: "0.75rem" }}>
              {error}
            </p>
          )}
        </form>

        <div className="auth-footer-link">
          Already have an account? <Link to="/login">Log in</Link>
        </div>
      </div>
    </div>
  );
}
