import PageShell from "../components/PageShell";
import PageHeader from "../components/PageHeader";

// Owner: whoever is building Precious Metals.
// Blank on purpose — build your price table / buy form here once your
// Open Banking API calls are ready. See backend/app/routes/metals.py
// for where the matching API calls live.

export default function PreciousMetals() {
  return (
    <PageShell>
      <PageHeader eyebrow="Investments" title="Precious Metals" />
    </PageShell>
  );
}