import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function PageShell({ width = "wide", children }) {
  const navigate = useNavigate();

  function handleLogout() {
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