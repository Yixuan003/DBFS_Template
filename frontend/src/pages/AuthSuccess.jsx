import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { saveUser } from "../utils/auth";

export default function AuthSuccess() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const name = params.get("paypal_name");
    const email = params.get("paypal_email");

    if (!name && !email) {
      navigate("/login", { replace: true });
      return;
    }

    saveUser({ name, email });
    navigate("/home", { replace: true });
  }, [params, navigate]);

  return (
    <div className="auth-screen">
      <p>Signing you in...</p>
    </div>
  );
}