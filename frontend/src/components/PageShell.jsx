import Sidebar from "./Sidebar";

export default function PageShell({ children }) {
  return (
    <div className="app-shell">
      <Sidebar />

      <main className="content">
        {children}
      </main>
    </div>
  );
}