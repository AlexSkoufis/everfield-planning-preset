"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import home from "@/content/home.json";
import CtaLink from "../CtaLink";
import styles from "./Investing.module.css";

gsap.registerPlugin(ScrollTrigger);

const { investing } = home;

export default function Investing() {
  const root = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.from(`.${styles.fill}`, {
        scaleY: 0,
        duration: 1.4,
        ease: "power4.out",
        stagger: 0.15,
        scrollTrigger: { trigger: `.${styles.chart}`, start: "top 75%", once: true },
      });

      gsap.fromTo(
        `.${styles.media}`,
        { clipPath: "inset(12% 12% 12% 12% round 32px)" },
        {
          clipPath: "inset(0% 0% 0% 0% round 32px)",
          ease: "none",
          scrollTrigger: { trigger: `.${styles.media}`, start: "top 90%", end: "top 40%", scrub: true },
        }
      );
      gsap.fromTo(
        `.${styles.media} img`,
        { scale: 1.15 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: { trigger: `.${styles.media}`, start: "top bottom", end: "bottom top", scrub: true },
        }
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section id="investing" ref={root} className={`section ${styles.investing}`} aria-labelledby="investing-title">
      <div className="container">
        <header className={styles.head}>
          <div>
            <p className="eyebrow" data-reveal>
              {investing.eyebrow}
            </p>
            <h2 id="investing-title" className={`h-section ${styles.title}`} data-reveal>
              {investing.title}
            </h2>
          </div>
          <p className="lead" data-reveal>
            {investing.lead}
          </p>
        </header>

        <div className={styles.showcase}>
          <figure className={styles.chart} data-reveal>
            <div className={styles.bars}>
              {investing.tranches.map((t) => (
                <div key={t.label} className={`${styles.bar} ${styles[t.tone]}`}>
                  <span className={styles.column}>
                    <span className={styles.fill} style={{ height: `${t.height}%` }} />
                  </span>
                  <span className={styles.barLabel}>{t.label}</span>
                  <span className={styles.barRange}>{t.range}</span>
                </div>
              ))}
            </div>
            <figcaption className={styles.caption}>{investing.trancheCaption}</figcaption>
          </figure>

          <figure className={styles.media} aria-label={investing.dashboard.label}>
            <div className={styles.dash}>
              <div className={styles.dashHead}>
                <span className={styles.dashAccount}>{investing.dashboard.account}</span>
                <span className={styles.dashBalance}>{investing.dashboard.balance}</span>
                <span className={styles.dashChange}>{investing.dashboard.change}</span>
              </div>
              <svg className={styles.dashChart} viewBox="0 0 300 90" preserveAspectRatio="none" aria-hidden="true">
                <path className={styles.dashArea} d="M0 72 C30 70 40 58 70 60 S110 44 140 48 S190 30 220 34 S270 14 300 12 L300 90 L0 90Z" />
                <path className={styles.dashLine} d="M0 72 C30 70 40 58 70 60 S110 44 140 48 S190 30 220 34 S270 14 300 12" />
              </svg>
              <ul className={styles.dashRows}>
                {investing.dashboard.holdings.map((h) => (
                  <li key={h.label}>
                    <span>{h.label}</span>
                    <span className={styles.dashTrack}>
                      <span style={{ width: `${h.weight}%` }} />
                    </span>
                    <span>{h.weight}%</span>
                  </li>
                ))}
              </ul>
            </div>
            <ul className={styles.dashChips} aria-hidden="true">
              {investing.dashboard.events.map((e) => (
                <li key={e}>
                  <svg viewBox="0 0 16 16"><path d="M3.5 8.5l3 3 6-7" /></svg>
                  {e}
                </li>
              ))}
            </ul>
          </figure>
        </div>

        <ul className={styles.pillars} data-reveal-stagger>
          {investing.pillars.map((p, i) => (
            <li key={p.title} className={styles.pillar}>
              <span className={styles.pillarShape} data-i={i} aria-hidden="true" />
              <h3 className={styles.pillarTitle}>{p.title}</h3>
              <p>{p.body}</p>
            </li>
          ))}
        </ul>

        <div className={styles.foot} data-reveal>
          <p className={styles.fee}>{investing.feeNote}</p>
          <CtaLink href={investing.cta.href} label={investing.cta.label} variant="ghost" />
        </div>
      </div>
    </section>
  );
}
