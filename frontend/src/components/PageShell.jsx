import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

/**
 * Wraps any authenticated page with the persistent sidebar, a top-right
 * logout button, and a content column. Use width="narrow" for reading-heavy
 * pages, "wide" for tables and dashboards.
 */
export default function PageShell({ width = "wide", children }) {
  const navigate = useNavigate();

  function handleLogout() {
    // TODO: once real PayPal sessions/tokens are stored, clear them here
    // (e.g. localStorage.removeItem("token")) before navigating away.
    navigate("/login");
  }

  return (
    <div className="app-shell">
      <Sidebar />
      <main className={`content-column ${width}`}>
        <div className="page-topbar">
          <button className="btn btn-ghost" onClick={handleLogout}>
            Log out
          </button>
        </div>
        {children}
      </main>
    </div>
  );
}