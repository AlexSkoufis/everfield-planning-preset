import home from "@/content/home.json";
import styles from "./Problem.module.css";

const { problem } = home;

export default function Problem() {
  return (
    <section className={`section ${styles.problem}`} aria-labelledby="problem-title">
      <div className="container">
        <header className={styles.head}>
          <div>
            <p className="eyebrow" data-reveal>
              {problem.eyebrow}
            </p>
            <h2 id="problem-title" className={`h-section ${styles.title}`} data-reveal>
              {problem.title}
            </h2>
          </div>
          <p className="lead" data-reveal>
            {problem.lead}
          </p>
        </header>

        <ol className={styles.items} data-reveal-stagger>
          {problem.items.map((item) => (
            <li key={item.number} className={`${styles.item} ${styles[item.tone]}`}>
              <span className={styles.number} aria-hidden="true">
                {item.number}
              </span>
              <p className={styles.question}>{item.question}</p>
              <h3 className={styles.itemTitle}>{item.title}</h3>
              <p className={styles.body}>{item.body}</p>
            </li>
          ))}
        </ol>

        <div className={styles.resolution} data-reveal>
          <p className={styles.statement}>
            {problem.resolution.title.split(" ").map((word, i) => (
              <span key={i} className={styles.word}>
                {word}{" "}
              </span>
            ))}
          </p>
          <p className={styles.resolutionBody}>{problem.resolution.body}</p>
        </div>
      </div>
    </section>
  );
}
