import Icon from "./Icon";

// Pill button link. External URLs open in the same tab on purpose:
// they are the client's own pages until the rest of the site is rebuilt.
export default function CtaLink({ href, label, variant, className = "" }) {
  const variantClass = variant ? `btn--${variant}` : "";
  return (
    <a href={href} className={`btn ${variantClass} ${className}`.trim()}>
      <span>{label}</span>
      <span className="btn-arrow">
        <Icon name="arrow" />
      </span>
    </a>
  );
}
