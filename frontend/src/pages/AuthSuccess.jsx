import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { saveUser } from "../utils/auth";

export default function AuthSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const name = searchParams.get("paypal_name");
    const email = searchParams.get("paypal_email");

    if (name || email) {
      saveUser({ name, email });
    }

    navigate("/home", { replace: true });
  }, [searchParams, navigate]);

  return null; // brief flash, redirects immediately
}