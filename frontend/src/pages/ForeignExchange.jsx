import PageShell from "../components/PageShell";
import PageHeader from "../components/PageHeader";

// Owner: whoever is building Foreign Exchange.
// Blank on purpose — build your rate table / buy form here once your
// Open Banking API calls are ready. See backend/app/routes/fx.py
// for where the matching API calls live.

export default function ForeignExchange() {
  return (
    <PageShell>
      <PageHeader eyebrow="Investments" title="Foreign Exchange" />
    </PageShell>
  );
}