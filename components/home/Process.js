"use client";

import { useEffect, useRef, useState } from "react";
import home from "@/content/home.json";
import CtaLink from "../CtaLink";
import Icon from "../Icon";
import styles from "./Process.module.css";

const { process } = home;
const { cycle } = process;
const COUNT = cycle.quarters.length;
const AUTOPLAY_MS = 3600;

// Dial geometry: one arc per quarter around a 400x400 box.
const R = 172;
const GAP = 4;
const polar = (deg) => {
  const a = ((deg - 90) * Math.PI) / 180;
  return [200 + R * Math.cos(a), 200 + R * Math.sin(a)];
};
const ARCS = cycle.quarters.map((_, i) => {
  const [x1, y1] = polar(i * 90 + GAP);
  const [x2, y2] = polar((i + 1) * 90 - GAP);
  return `M${x1.toFixed(2)},${y1.toFixed(2)} A${R},${R} 0 0 1 ${x2.toFixed(2)},${y2.toFixed(2)}`;
});
const NODES = cycle.quarters.map((_, i) => {
  const a = ((i * 90 + 45 - 90) * Math.PI) / 180;
  return [50 + 43 * Math.cos(a), 50 + 43 * Math.sin(a)];
});

export default function Process() {
  const dialRef = useRef(null);
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);

  // Walk through the quarters while the dial is on screen, until the visitor picks one.
  useEffect(() => {
    if (!auto || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer;
    const io = new IntersectionObserver(
      ([entry]) => {
        clearInterval(timer);
        if (entry.isIntersecting) {
          timer = setInterval(() => setActive((a) => (a + 1) % COUNT), AUTOPLAY_MS);
        }
      },
      { threshold: 0.5 }
    );
    io.observe(dialRef.current);
    return () => {
      clearInterval(timer);
      io.disconnect();
    };
  }, [auto]);

  const choose = (i) => {
    setAuto(false);
    setActive(i);
  };

  const current = cycle.quarters[active];

  return (
    <section id="process" className={`section ${styles.process}`} aria-labelledby="process-title">
      <div className="container">
        <header className={styles.head}>
          <p className="eyebrow" data-reveal>
            {process.eyebrow}
          </p>
          <h2 id="process-title" className="h-section" data-reveal>
            {process.title}
          </h2>
        </header>

        <ol className={styles.steps} data-reveal-stagger>
          {process.steps.map((step) => (
            <li key={step.number} className={styles.step}>
              <span className={styles.stepNumber}>{step.number}</span>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>

        <div className={styles.cycle}>
          <div className={styles.cycleCopy}>
            <h3 className={styles.cycleTitle}>{cycle.title}</h3>
            <p className={styles.cycleBody}>{cycle.body}</p>

            <ul className={styles.quarterList}>
              {cycle.quarters.map((q, i) => (
                <li key={q.label}>
                  <button
                    type="button"
                    className={styles.quarter}
                    aria-pressed={i === active}
                    onClick={() => choose(i)}
                  >
                    <span className={styles.qLabel}>{q.label}</span>
                    <span className={styles.qTopics}>{q.topics.join(", ")}</span>
                    <span className={styles.qBar} aria-hidden="true">
                      {i === active && auto && <span key={active} className={styles.qBarFill} />}
                    </span>
                  </button>
                </li>
              ))}
            </ul>

            <p className={styles.note}>{cycle.note}</p>
            <CtaLink href={process.cta.href} label={process.cta.label} />
          </div>

          <div ref={dialRef} className={styles.dial}>
            <svg className={styles.dialSvg} viewBox="0 0 400 400" aria-hidden="true">
              <circle cx="200" cy="200" r="132" className={styles.inner} />
              {ARCS.map((d, i) => (
                <path key={i} d={d} className={styles.arc} data-on={i === active} />
              ))}
            </svg>

            {cycle.quarters.map((q, i) => (
              <button
                key={q.label}
                type="button"
                className={styles.node}
                style={{ left: `${NODES[i][0]}%`, top: `${NODES[i][1]}%` }}
                data-on={i === active}
                onClick={() => choose(i)}
                tabIndex={-1}
                aria-hidden="true"
              >
                {q.label}
              </button>
            ))}

            <div className={styles.center} key={active}>
              <span className={styles.centerLabel}>{current.label}</span>
              <ul className={styles.centerTopics}>
                {current.topics.map((t) => (
                  <li key={t}>
                    <Icon name="check" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
