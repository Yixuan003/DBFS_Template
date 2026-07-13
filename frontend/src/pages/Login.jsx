export default function Login() {
  const loginWithPayPal = () => {
    window.location.href = "/api/auth/paypal/login";
  };

  return (
    <div className="auth-screen">
      <div className="auth-card">
        <div className="auth-brand">Straits Digital Bank</div>

        <div className="card">
          <div className="page-header">
            <h1>Log in</h1>
            <p>
              Sign in with your PayPal account to access Straits Digital Bank.
            </p>
          </div>

          <button
            type="button"
            className="btn btn-primary btn-block"
            onClick={loginWithPayPal}
          >
            Log in with PayPal
          </button>
        </div>
      </div>
    </div>
  );
}