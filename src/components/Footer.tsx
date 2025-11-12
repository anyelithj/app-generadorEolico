export default function Footer() {
  return (
    <footer className="bg-white shadow-inner mt-8 py-4">
      <div className="container mx-auto text-center text-slate-600 text-sm">
        © {new Date().getFullYear()} Eólico Simulator.
      </div>
    </footer>
  );
}
