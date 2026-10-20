// Everfield mark: a rising sun over three field rows, with the wordmark set in
// the display serif. Drawn in currentColor so it works on light and dark.
export default function Logo({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 220 44" aria-hidden="true">
      <path d="M12 25a10 10 0 0 1 20 0z" fill="var(--gold)" />
      <path d="M4 29.5h36M8 35h28M13 40.5h18" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <text x="52" y="31" fill="currentColor" className="logo-word">
        Everfield
      </text>
    </svg>
  );
}
