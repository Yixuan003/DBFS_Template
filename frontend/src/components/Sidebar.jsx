import { NavLink } from "react-router-dom";

const NAV_ITEMS = [
  { to: "/home", label: "Home", icon: "home", end: true },
  { to: "/stocks", label: "Stocks & Shares", icon: "trending-up" },
  { to: "/foreign-exchange", label: "Foreign Exchange", icon: "repeat" },
  { to: "/precious-metals", label: "Precious Metals", icon: "circle" },
  { to: "/crypto", label: "Cryptocurrency", icon: "hexagon" },
];

function Icon({ name }) {
  // Minimal inline line-icons so the template has no external icon
  // dependency. Swap for lucide-react or similar if the team prefers.
  const common = {
    className: "sidebar-icon",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };

  switch (name) {
    case "home":
      return (
        <svg {...common}>
          <path d="M3 11.5 12 4l9 7.5" />
          <path d="M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9" />
        </svg>
      );
    case "trending-up":
      return (
        <svg {...common}>
          <path d="M3 17 9 11l4 4 8-8" />
          <path d="M15 6h6v6" />
        </svg>
      );
    case "repeat":
      return (
        <svg {...common}>
          <path d="M17 2 21 6l-4 4" />
          <path d="M3 12V9a3 3 0 0 1 3-3h15" />
          <path d="M7 22 3 18l4-4" />
          <path d="M21 12v3a3 3 0 0 1-3 3H3" />
        </svg>
      );
    case "circle":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8" />
        </svg>
      );
    case "hexagon":
      return (
        <svg {...common}>
          <path d="M12 2 21 7v10l-9 5-9-5V7z" />
        </svg>
      );
    default:
      return null;
  }
}

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">Straits Digital Bank</div>

      <nav className="sidebar-nav">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              "sidebar-link" + (isActive ? " active" : "")
            }
          >
            <Icon name={item.icon} />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        Straits-FX template
        <br />
        v0.1
      </div>
    </aside>
  );
}
