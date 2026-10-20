import home from "@/content/home.json";
import Icon from "../Icon";
import CtaLink from "../CtaLink";
import styles from "./Services.module.css";

const { services } = home;

export default function Services() {
  return (
    <section id="services" className={`section ${styles.services}`} aria-labelledby="services-title">
      <div className={`container ${styles.layout}`}>
        <header className={styles.head}>
          <p className="eyebrow" data-reveal>
            {services.eyebrow}
          </p>
          <h2 id="services-title" className={`h-section ${styles.title}`} data-reveal>
            {services.title}
          </h2>
          <p className={styles.lead} data-reveal>
            {services.lead}
          </p>
          <div className={styles.cta} data-reveal>
            <p className={styles.ctaText}>{services.ctaText}</p>
            <CtaLink href={services.cta.href} label={services.cta.label} variant="ghost" />
          </div>
        </header>

        <ol className={styles.list} data-reveal-stagger>
          {services.items.map((item, i) => (
            <li key={item.title}>
              <a href={item.href} className={styles.row}>
                <span className={styles.index} aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className={styles.rowBody}>
                  <span className={styles.rowTitle}>{item.title}</span>
                  <span className={styles.text}>{item.body}</span>
                </span>
                <span className={styles.go} aria-hidden="true">
                  <Icon name="arrowUpRight" />
                </span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
