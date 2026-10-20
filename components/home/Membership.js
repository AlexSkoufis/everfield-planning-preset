"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import home from "@/content/home.json";
import Icon from "../Icon";
import CtaLink from "../CtaLink";
import styles from "./Membership.module.css";

const { membership } = home;
const [, usLabel, themLabel] = membership.compare.columns;
const TABS = ["included", "promises", "compare"];
const noop = () => () => {};

export default function Membership() {
  const [active, setActive] = useState(0);
  // Until hydration every panel stays visible, so the content works without JavaScript.
  const ready = useSyncExternalStore(noop, () => true, () => false);
  const tabRefs = useRef([]);

  const onKeyDown = (e) => {
    const step = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
    if (!step) return;
    e.preventDefault();
    const next = (active + step + TABS.length) % TABS.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  const panelProps = (i) => ({
    id: `membership-panel-${TABS[i]}`,
    role: ready ? "tabpanel" : undefined,
    "aria-labelledby": ready ? `membership-tab-${TABS[i]}` : undefined,
    hidden: ready && i !== active,
    className: styles.panel,
  });

  return (
    <section id="membership" className={`section ${styles.membership}`} aria-labelledby="membership-title">
      <span className={styles.glow} aria-hidden="true" />
      <div className="container">
        <header className={styles.head}>
          <div>
            <p className={`eyebrow ${styles.eyebrow}`} data-reveal>
              {membership.eyebrow}
            </p>
            <h2 id="membership-title" className={`h-section ${styles.title}`} data-reveal>
              {membership.title}
            </h2>
          </div>
          <div className={styles.headSide} data-reveal>
            <p className={styles.lead}>{membership.lead}</p>
            <div className={styles.ctas}>
              <CtaLink href={membership.secondaryCta.href} label={membership.secondaryCta.label} variant="light" />
              <CtaLink href={membership.cta.href} label={membership.cta.label} variant="outline-light" />
            </div>
          </div>
        </header>

        <div className={styles.box} data-reveal>
          {ready && (
            <div className={styles.tabs} role="tablist" aria-label={membership.eyebrow}>
              {TABS.map((key, i) => (
                <button
                  key={key}
                  ref={(el) => (tabRefs.current[i] = el)}
                  id={`membership-tab-${key}`}
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  aria-controls={`membership-panel-${key}`}
                  tabIndex={i === active ? 0 : -1}
                  className={styles.tab}
                  onClick={() => setActive(i)}
                  onKeyDown={onKeyDown}
                >
                  {membership.tabs[key]}
                </button>
              ))}
            </div>
          )}

          <div {...panelProps(0)}>
            <h3 className={styles.panelTitle}>{membership.includedTitle}</h3>
            <ul className={styles.included}>
              {membership.included.map((item) => (
                <li key={item}>
                  <Icon name="check" className={styles.tick} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div {...panelProps(1)}>
            <h3 className={styles.panelTitle}>{membership.promisesTitle}</h3>
            <ul className={styles.promises}>
              {membership.promises.map((p) => (
                <li key={p.title}>
                  <span className={styles.cross} aria-hidden="true">
                    <Icon name="close" />
                  </span>
                  <span>
                    <strong className={styles.promiseTitle}>{p.title}</strong>
                    <span className={styles.promiseBody}>{p.body}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div {...panelProps(2)}>
            <h3 className={styles.panelTitle}>{membership.compare.title}</h3>
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <td />
                    <th scope="col" className={styles.us}>
                      {usLabel}
                    </th>
                    <th scope="col">{themLabel}</th>
                  </tr>
                </thead>
                <tbody>
                  {membership.compare.rows.map((row) => (
                    <tr key={row.label}>
                      <th scope="row">{row.label}</th>
                      <td className={styles.us}>
                        <span className={styles.usCell}>
                          <Icon name="check" />
                          {row.us}
                        </span>
                      </td>
                      <td>{row.them}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
