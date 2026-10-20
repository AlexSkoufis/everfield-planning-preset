"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import home from "@/content/home.json";
import Icon from "../Icon";
import CtaLink from "../CtaLink";
import styles from "./Audiences.module.css";

const { audiences } = home;

export default function Audiences() {
  const [active, setActive] = useState(0);
  const tabsRef = useRef([]);
  const panelRef = useRef(null);

  const select = (i, focus = false) => {
    if (i === active) return;
    setActive(i);
    if (focus) tabsRef.current[i]?.focus();
    if (panelRef.current && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.fromTo(
        panelRef.current.querySelectorAll("[data-animate]"),
        { y: 24, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.7, ease: "power3.out", stagger: 0.05, overwrite: true }
      );
    }
  };

  const onKeyDown = (e) => {
    const last = audiences.items.length - 1;
    const keys = {
      ArrowDown: active === last ? 0 : active + 1,
      ArrowRight: active === last ? 0 : active + 1,
      ArrowUp: active === 0 ? last : active - 1,
      ArrowLeft: active === 0 ? last : active - 1,
      Home: 0,
      End: last,
    };
    if (e.key in keys) {
      e.preventDefault();
      select(keys[e.key], true);
    }
  };

  const item = audiences.items[active];

  return (
    <section id="audiences" className={`section ${styles.audiences}`} aria-labelledby="audiences-title">
      <div className="container">
        <header className={styles.head}>
          <p className="eyebrow" data-reveal>
            {audiences.eyebrow}
          </p>
          <h2 id="audiences-title" className="h-section" data-reveal>
            {audiences.title}
          </h2>
          <p className="lead" data-reveal>
            {audiences.lead}
          </p>
        </header>

        <div className={styles.layout} data-reveal>
          <div className={styles.tabs} role="tablist" aria-label={audiences.eyebrow} aria-orientation="vertical" onKeyDown={onKeyDown}>
            {audiences.items.map((tab, i) => (
              <button
                key={tab.id}
                ref={(el) => (tabsRef.current[i] = el)}
                type="button"
                role="tab"
                id={`tab-${tab.id}`}
                aria-selected={active === i}
                aria-controls={`panel-${tab.id}`}
                tabIndex={active === i ? 0 : -1}
                className={`${styles.tab} ${styles[tab.tone]}`}
                onClick={() => select(i)}
              >
                <span className={styles.tabIndex}>0{i + 1}</span>
                <span className={styles.tabLabel}>{tab.label}</span>
                <Icon name="arrow" className={styles.tabArrow} />
              </button>
            ))}
          </div>

          <div
            ref={panelRef}
            id={`panel-${item.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${item.id}`}
            className={`${styles.panel} ${styles[item.tone]}`}
            tabIndex={0}
          >
            <span className={styles.shape} aria-hidden="true" />
            <div className={styles.panelMain}>
              <h3 className={styles.panelTitle} data-animate>
                {item.title}
              </h3>
              <p className={styles.panelBody} data-animate>
                {item.body}
              </p>
            </div>
            <div className={styles.focus}>
              <ul>
                {item.focus.map((f) => (
                  <li key={f} data-animate>
                    <Icon name="check" />
                    {f}
                  </li>
                ))}
              </ul>
              <div data-animate>
                <CtaLink href={item.cta.href} label={item.cta.label} variant="light" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
