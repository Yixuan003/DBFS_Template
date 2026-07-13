export default function Login() {
  return (
    <div className="auth-screen">
      <div className="auth-card">
        <div className="auth-brand">Straits Digital Bank</div>

        <div className="card elevated">
          <h1 className="text-title" style={{ marginBottom: "0.75rem" }}>
            Log in
          </h1>
          <p className="text-soft" style={{ fontSize: "0.9rem", marginBottom: "1.25rem" }}>
            Straits Digital Bank uses PayPal to verify your identity and manage
            your account.
          </p>

          <button
            type="button"
            className="btn btn-primary btn-block"
            onClick={() => (window.location.href = "/api/auth/paypal/login")}
          >
            Log in with PayPal
          </button>
        </div>
      </div>
    </div>
  );
}