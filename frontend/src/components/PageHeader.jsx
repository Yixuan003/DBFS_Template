export default function PageHeader({ eyebrow, title, description }) {
  return (
    <div className="page-header">
      {eyebrow && <div className="text-label eyebrow">{eyebrow}</div>}
      <h1 className="text-display">{title}</h1>
      {description && (
        <p className="text-soft" style={{ marginTop: "0.5rem", maxWidth: "62ch" }}>
          {description}
        </p>
      )}
    </div>
  );
}
