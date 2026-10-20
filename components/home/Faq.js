import home from "@/content/home.json";
import Icon from "../Icon";
import CtaLink from "../CtaLink";
import styles from "./Faq.module.css";

const { faq } = home;

export default function Faq() {
  return (
    <section id="faq" className={`section ${styles.faq}`} aria-labelledby="faq-title">
      <div className={`container ${styles.grid}`}>
        <header className={styles.head}>
          <p className="eyebrow" data-reveal>
            {faq.eyebrow}
          </p>
          <h2 id="faq-title" className="h-section" data-reveal>
            {faq.title}
          </h2>
          <p className="lead" data-reveal>
            {faq.lead}
          </p>
          <div data-reveal>
            <CtaLink href={faq.cta.href} label={faq.cta.label} />
          </div>
        </header>

        <div className={styles.list} data-reveal-stagger>
          {faq.items.map((item, i) => (
            <details key={item.q} className={styles.item} name="faq" open={i === 0}>
              <summary className={styles.summary}>
                <span>{item.q}</span>
                <span className={styles.toggle} aria-hidden="true">
                  <Icon name="plus" />
                </span>
              </summary>
              <p className={styles.answer}>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
