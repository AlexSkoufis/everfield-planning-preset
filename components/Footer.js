import Logo from "./Logo";
import site from "@/content/site.json";
import Icon from "./Icon";
import CtaLink from "./CtaLink";
import styles from "./Footer.module.css";

const { footer, logo } = site;

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          <div className={styles.brand}>
            <a href="/" className={styles.logo} aria-label={`${logo.alt}, home`}>
              <Logo />
            </a>
            <p className={styles.tagline}>{footer.tagline}</p>
            <p className={styles.summary}>{footer.summary}</p>
            <CtaLink href={footer.cta.href} label={footer.cta.label} variant="light" />
          </div>

          <nav className={styles.columns} aria-label="Footer">
            {footer.columns.map((col) => (
              <div key={col.title}>
                <h2 className={styles.colTitle}>{col.title}</h2>
                <ul>
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a href={link.href} className={styles.link}>
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className={styles.bottom}>
          <ul className={styles.social}>
            {footer.social.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className={styles.socialLink}>
                  <Icon name={s.icon} />
                </a>
              </li>
            ))}
          </ul>
          <p className={styles.legal}>
            © {year} {footer.copyright}
          </p>
          <p className={styles.credit}>
            {footer.credit.prefix}{" "}
            <a href={footer.credit.href} target="_blank" rel="noopener noreferrer">
              {footer.credit.label}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
