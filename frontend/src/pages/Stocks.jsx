import PageShell from "../components/PageShell";
import PageHeader from "../components/PageHeader";

// Owner: whoever is building U.S. Equities.
// Blank on purpose — build your price table / buy form here once your
// Open Banking API calls are ready. See backend/app/routes/stocks.py
// for where the matching API calls live.

export default function Stocks() {
  return (
    <PageShell>
      <PageHeader eyebrow="Investments" title="Stocks & Shares" />
    </PageShell>
  );
}