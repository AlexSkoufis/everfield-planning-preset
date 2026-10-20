import home from "@/content/home.json";
import CtaLink from "../CtaLink";
import Icon from "../Icon";
import HeroPlan from "./HeroPlan";
import styles from "./Hero.module.css";

const { hero } = home;

export default function Hero() {
  const [lineOne, lineTwo] = hero.titleLines;

  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={`container ${styles.top}`}>
        <div className={styles.heading}>
          <p className={`eyebrow ${styles.eyebrow}`}>{hero.eyebrow}</p>
          <h1 id="hero-title" className={`h-display ${styles.title}`}>
            <span className={styles.line}>
              <span>{lineOne}</span>
            </span>
            <span className={styles.line}>
              <em>{lineTwo}</em>
            </span>
          </h1>
        </div>

        <div className={styles.side}>
          <p className={styles.lead}>{hero.lead}</p>
          <div className={styles.actions}>
            <div className={styles.ctas}>
              <CtaLink href={hero.primaryCta.href} label={hero.primaryCta.label} />
              <CtaLink href={hero.secondaryCta.href} label={hero.secondaryCta.label} variant="ghost" />
            </div>
            <ul className={styles.assurances}>
              {hero.assurances.map((item) => (
                <li key={item}>
                  <Icon name="check" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="container">
        <HeroPlan plan={hero.plan} />
      </div>
    </section>
  );
}
