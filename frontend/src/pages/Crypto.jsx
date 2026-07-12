import PageShell from "../components/PageShell";
import PageHeader from "../components/PageHeader";

// Owner: whoever is building Cryptocurrency.
// Blank on purpose — build your price table / buy form here once your
// Open Banking API calls are ready. See backend/app/routes/crypto.py
// for where the matching API calls live.

export default function Crypto() {
  return (
    <PageShell>
      <PageHeader eyebrow="Investments" title="Cryptocurrency" />
    </PageShell>
  );
}