const paths = {
  arrow: <path d="M3 8h10M9 4l4 4-4 4" />,
  arrowUpRight: <path d="M5 11l6-6M6 5h5v5" />,
  check: <path d="M3.5 8.5l3 3 6-7" />,
  close: <path d="M4 4l8 8M12 4l-8 8" />,
  plus: <path d="M8 3v10M3 8h10" />,
  chevron: <path d="M4 6l4 4 4-4" />,
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M15.5 8.5l-2 5-5 2 2-5z" />
    </>
  ),
  receipt: (
    <>
      <path d="M6 3h12v18l-3-2-3 2-3-2-3 2z" />
      <path d="M9 8h6M9 12h6M9 16h3" />
    </>
  ),
  chart: (
    <>
      <path d="M4 20h16" />
      <path d="M6 16l4-5 3 3 5-7" />
      <path d="M15 7h3v3" />
    </>
  ),
  sun: (
    <>
      <path d="M4 18h16" />
      <path d="M7 18a5 5 0 0110 0" />
      <path d="M12 6v3M5.6 9.6l2 2M18.4 9.6l-2 2" />
    </>
  ),
  building: (
    <>
      <path d="M4 21V7l8-4 8 4v14" />
      <path d="M9 21v-5h6v5M9 10h.01M15 10h.01" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  umbrella: (
    <>
      <path d="M3 12a9 9 0 0118 0z" />
      <path d="M12 12v6a2 2 0 01-4 0" />
    </>
  ),
  home: (
    <>
      <path d="M4 11l8-7 8 7" />
      <path d="M6 9.5V20h12V9.5" />
      <path d="M10 20v-5h4v5" />
    </>
  ),
  facebook: <path d="M14 8h3V4h-3a4 4 0 00-4 4v2H7v4h3v7h4v-7h3l1-4h-4V8z" />,
  x: <path d="M4 4l16 16M20 4L4 20" />,
  linkedin: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 014 0v4M12 10v7" />
    </>
  ),
  youtube: (
    <>
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
      <path d="M10 9.5l5 2.5-5 2.5z" />
    </>
  ),
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.5 6.5v.01" />
    </>
  ),
};

const small = new Set(["arrow", "arrowUpRight", "check", "close", "plus", "chevron"]);

export default function Icon({ name, className, strokeWidth }) {
  const box = small.has(name) ? 16 : 24;
  return (
    <svg
      className={className}
      viewBox={`0 0 ${box} ${box}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth ?? (box === 16 ? 1.8 : 1.6)}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {paths[name]}
    </svg>
  );
}
