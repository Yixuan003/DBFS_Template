import { useEffect, useState } from "react";

/**
 * Generic "price list + buy form" panel shared by all four investment pages.
 * Each page passes its own API paths and column config — the page file
 * itself stays tiny, and swapping mock data for a real Open Banking API
 * only means editing the matching backend/app/routes/<yours>.py file.
 *
 * columns: [{ key, label, format? }]  — format receives the raw row value
 * buyFields: [{ name, label, placeholder }]
 */
export default function InvestmentPanel({
  pricesEndpoint,
  buyEndpoint,
  rowsKey,
  columns,
  buyFields,
  buyLabel = "Buy",
}) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [buyState, setBuyState] = useState({ submitting: false, message: null });
  const [form, setForm] = useState(
    Object.fromEntries(buyFields.map((f) => [f.name, ""]))
  );

  useEffect(() => {
    let cancelled = false;

    fetch(pricesEndpoint)
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) setRows(data[rowsKey] || []);
      })
      .catch(() => {
        if (!cancelled) setError("Could not reach the backend yet.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [pricesEndpoint, rowsKey]);

  function handleChange(name, value) {
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setBuyState({ submitting: true, message: null });

    try {
      const res = await fetch(buyEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setBuyState({ submitting: false, message: data.message || "Done." });
    } catch {
      setBuyState({
        submitting: false,
        message: "Could not reach the backend yet.",
      });
    }
  }

  return (
    <div className="stack-md">
      <div className="card">
        <h2 className="text-title" style={{ marginBottom: "1rem" }}>
          Latest prices
        </h2>

        {loading && <p className="text-soft">Loading prices…</p>}
        {error && <p className="text-soft">{error}</p>}

        {!loading && !error && (
          <table className="price-table">
            <thead>
              <tr>
                {columns.map((col) => (
                  <th key={col.key}>{col.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i}>
                  {columns.map((col) => (
                    <td key={col.key} className={col.figure ? "figure" : ""}>
                      {col.format ? col.format(row[col.key], row) : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <form className="card" onSubmit={handleSubmit}>
        <h2 className="text-title" style={{ marginBottom: "1rem" }}>
          {buyLabel}
        </h2>

        {buyFields.map((f) => (
          <div className="field" key={f.name}>
            <label htmlFor={f.name}>{f.label}</label>
            <input
              id={f.name}
              className="input"
              placeholder={f.placeholder}
              value={form[f.name]}
              onChange={(e) => handleChange(f.name, e.target.value)}
            />
          </div>
        ))}

        <button className="btn btn-primary" type="submit" disabled={buyState.submitting}>
          {buyState.submitting ? "Submitting…" : buyLabel}
        </button>

        {buyState.message && (
          <p className="text-soft" style={{ marginTop: "0.75rem" }}>
            {buyState.message}
          </p>
        )}
      </form>
    </div>
  );
}
