"use client";

import { useState } from "react";
import styles from "./Hero.module.css";

// Milestone positions on the chart, in percent of the plot area.
const POINTS = [
  [7, 80],
  [24, 68],
  [41, 60],
  [58, 44],
  [75, 32],
  [92, 20],
];

// Smooth line through the points (Catmull-Rom to cubic Bezier).
function curve(points) {
  const pts = [[0, 88], ...points, [100, 12]];
  let d = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] || p2;
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${c1[0]},${c1[1]} ${c2[0]},${c2[1]} ${p2[0]},${p2[1]}`;
  }
  return d;
}

const LINE = curve(POINTS);
const AREA = `${LINE} L100,100 L0,100 Z`;

export default function HeroPlan({ plan }) {
  const [active, setActive] = useState(3);
  const activeAreas = plan.milestones[active].areas;

  return (
    <div className={styles.plan}>
      <div className={styles.planBar}>
        <p className={styles.planLabel}>{plan.label}</p>
        <p className={styles.planStatus}>
          <span className={styles.pulse} aria-hidden="true" />
          {plan.status}
        </p>
      </div>

      <div className={styles.chart}>
        <svg className={styles.chartSvg} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="hero-plan-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="var(--sky)" stopOpacity="0.22" />
              <stop offset="1" stopColor="var(--sky)" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[25, 50, 75].map((y) => (
            <line key={y} x1="0" x2="100" y1={y} y2={y} className={styles.gridLine} vectorEffect="non-scaling-stroke" />
          ))}
          <g className={styles.chartDraw}>
            <path d={AREA} fill="url(#hero-plan-fill)" />
            <path d={LINE} className={styles.chartLine} vectorEffect="non-scaling-stroke" />
          </g>
        </svg>

        <ol className={styles.milestones}>
          {plan.milestones.map((m, i) => (
            <li
              key={m.title}
              className={styles.milestone}
              style={{ "--x": `${POINTS[i][0]}%`, "--y": `${POINTS[i][1]}%`, "--d": `${0.9 + i * 0.12}s` }}
            >
              <button
                type="button"
                className={styles.milestoneBtn}
                aria-pressed={i === active}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
              >
                <span className={styles.dot} aria-hidden="true" />
                <span className={styles.milestoneTitle}>{m.title}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>

      <div className={styles.planFoot}>
        <div>
          <p className={styles.hint}>{plan.hint}</p>
          <ul className={styles.areas}>
            {plan.areas.map((a) => (
              <li key={a.id} data-on={activeAreas.includes(a.id)}>
                {a.label}
              </li>
            ))}
          </ul>
        </div>
        <p className={styles.proof}>
          <strong>{plan.proof.value}</strong> {plan.proof.label}
        </p>
      </div>
      <p className={styles.note}>{plan.note}</p>
    </div>
  );
}
