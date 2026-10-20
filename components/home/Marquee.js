import home from "@/content/home.json";
import styles from "./Marquee.module.css";

const { marquee } = home;

function Row({ hidden }) {
  return (
    <ul className={styles.row} aria-hidden={hidden || undefined}>
      {marquee.items.map((item) => (
        <li key={item}>
          <span className={styles.glyph} aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function Marquee() {
  return (
    <section className={styles.marquee} aria-label={marquee.label}>
      <div className={styles.track}>
        <Row />
        <Row hidden />
      </div>
    </section>
  );
}
