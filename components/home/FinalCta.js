import home from "@/content/home.json";
import CtaLink from "../CtaLink";
import Icon from "../Icon";
import styles from "./FinalCta.module.css";

const { finalCta } = home;

export default function FinalCta() {
  return (
    <section id="start" className={styles.wrap} aria-labelledby="final-cta-title">
      <div className="container">
        <div className={styles.card} data-reveal>
          <div className={styles.shapes} aria-hidden="true">
            <span className={styles.q1} />
            <span className={styles.q2} />
            <span className={styles.q3} />
            <span className={styles.q4} />
          </div>

          <div className={styles.main}>
            <p className={`eyebrow ${styles.eyebrow}`}>{finalCta.eyebrow}</p>
            <h2 id="final-cta-title" className={`h-section ${styles.title}`}>
              {finalCta.title}
            </h2>
            <p className={styles.body}>{finalCta.body}</p>
            <div className={styles.ctas}>
              <CtaLink href={finalCta.primaryCta.href} label={finalCta.primaryCta.label} variant="light" />
              <CtaLink href={finalCta.secondaryCta.href} label={finalCta.secondaryCta.label} variant="outline-light" />
            </div>
            <p className={styles.note}>{finalCta.note}</p>
          </div>
        </div>

        <a href={finalCta.newsletter.cta.href} className={styles.resources} data-reveal>
          <span>
            <strong className={styles.resTitle}>{finalCta.newsletter.title}</strong>
            <span className={styles.resBody}>{finalCta.newsletter.body}</span>
          </span>
          <span className={styles.resCta}>
            {finalCta.newsletter.cta.label}
            <Icon name="arrow" />
          </span>
        </a>
      </div>
    </section>
  );
}
