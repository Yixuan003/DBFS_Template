import { Link } from "react-router-dom";
import PageShell from "../components/PageShell";
import PageHeader from "../components/PageHeader";

const PRODUCTS = [
  {
    to: "/stocks",
    title: "Stocks & Shares",
    description: "U.S. equities — INTC, GOOG, and NVDA.",
  },
  {
    to: "/foreign-exchange",
    title: "Foreign Exchange",
    description: "EUR/SGD, GBP/SGD, and USD/SGD.",
  },
  {
    to: "/precious-metals",
    title: "Precious Metals",
    description: "Platinum, Gold, and Silver.",
  },
  {
    to: "/crypto",
    title: "Cryptocurrency",
    description: "BTC, ETH, and XRP.",
  },
];

export default function Home() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Welcome back"
        title="What would you like to buy today?"
        description="Straits Digital Bank lets you buy stocks, foreign currency, precious metals, and crypto from one account, funded through PayPal."
      />

      <div className="card-grid">
        {PRODUCTS.map((p) => (
          <Link key={p.to} to={p.to} className="card" style={{ textDecoration: "none" }}>
            <div className="text-title" style={{ marginBottom: "0.4rem" }}>
              {p.title}
            </div>
            <div className="text-soft" style={{ fontSize: "0.9rem" }}>
              {p.description}
            </div>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}
