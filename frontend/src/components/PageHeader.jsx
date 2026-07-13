export default function PageHeader({ eyebrow, title, description }) {
  return (
    <header className="page-header">
      {eyebrow && <p>{eyebrow}</p>}

      <h1>{title}</h1>

      {description && <p>{description}</p>}
    </header>
  );
}