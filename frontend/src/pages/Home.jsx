import { NavLink, useNavigate } from "react-router-dom";
import PageShell from "../components/PageShell";
import PageHeader from "../components/PageHeader";
import { getUser, clearUser } from "../utils/auth";

export default function Home() {
  const user = getUser();
  const navigate = useNavigate();

  function handleLogout() {
    clearUser();
    navigate("/login");
  }

  return (
    <PageShell>
      <div className="home-header">
        <PageHeader
          title={user?.name ? `Welcome, ${user.name}` : "Welcome"}
        />
        <button className="btn btn-danger" onClick={handleLogout}>
          Log Out
        </button>
      </div>

      <nav className="category-nav">
        <NavLink to="/stocks" className="category-link">
          Stocks & Shares
        </NavLink>

        <NavLink to="/foreign-exchange" className="category-link">
          Foreign Exchange
        </NavLink>

        <NavLink to="/precious-metals" className="category-link">
          Precious Metals
        </NavLink>

        <NavLink to="/crypto" className="category-link">
          Cryptocurrency
        </NavLink>
      </nav>
    </PageShell>
  );
}