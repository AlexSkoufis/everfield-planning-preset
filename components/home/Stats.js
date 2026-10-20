"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import home from "@/content/home.json";
import styles from "./Stats.module.css";

gsap.registerPlugin(ScrollTrigger);

const { stats } = home;
const format = (n) => Math.round(n).toLocaleString("en-US");

export default function Stats() {
  const root = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray("[data-count]", root.current).forEach((el) => {
        const target = parseFloat(el.dataset.count);
        if (!target) return;
        const counter = { v: 0 };
        el.textContent = format(0);
        gsap.to(counter, {
          v: target,
          duration: 2,
          ease: "power3.out",
          onUpdate: () => (el.textContent = format(counter.v)),
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className={styles.stats} aria-label="Everfield at a glance">
      <div className="container">
        <ul className={styles.grid} data-reveal-stagger>
          {stats.items.map((s) => (
            <li key={s.label} className={styles.item}>
              <span className={styles.value}>
                {s.prefix}
                <span data-count={s.value}>{format(s.value)}</span>
                {s.suffix}
              </span>
              <span className={styles.label}>{s.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
