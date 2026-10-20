"use client";

import { useEffect, useRef, useState } from "react";
import Logo from "./Logo";
import site from "@/content/site.json";
import Icon from "./Icon";
import CtaLink from "./CtaLink";
import styles from "./Header.module.css";

const { header, logo } = site;

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileSub, setMobileSub] = useState(null);
  const navRef = useRef(null);
  const burgerRef = useRef(null);
  const closeTimer = useRef(null);

  // Solid background after leaving the top, hide while scrolling down.
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 12);
      setHidden(y > 320 && y > last + 2);
      if (y < last - 2) setHidden(false);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close desktop dropdowns on outside click or Escape.
  useEffect(() => {
    const onDown = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setOpenIndex(null);
    };
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      setOpenIndex(null);
      if (menuOpen) {
        setMenuOpen(false);
        burgerRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  // Lock page scroll while the mobile menu is open.
  useEffect(() => {
    const lenis = window.__lenis;
    if (menuOpen) {
      lenis?.stop();
      document.documentElement.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.documentElement.style.overflow = "";
    }
  }, [menuOpen]);

  // Close the mobile menu if the viewport grows to desktop.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1101px)");
    const onChange = () => mq.matches && setMenuOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const openOnHover = (i) => {
    clearTimeout(closeTimer.current);
    setOpenIndex(i);
  };
  const closeOnLeave = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenIndex(null), 160);
  };

  const onNavBlur = (e) => {
    if (!navRef.current?.contains(e.relatedTarget)) setOpenIndex(null);
  };

  const headerClass = [
    styles.header,
    scrolled || menuOpen ? styles.scrolled : "",
    hidden && !menuOpen && openIndex === null ? styles.hidden : "",
    menuOpen ? styles.menuOpen : "",
  ].join(" ");

  return (
    <header className={headerClass}>
      <div className={`container ${styles.bar}`}>
        <a href="/" className={styles.logo} aria-label={`${logo.alt}, home`}>
          <Logo />
        </a>

        <nav ref={navRef} className={styles.nav} aria-label="Main" onBlur={onNavBlur}>
          <ul className={styles.navList}>
            {header.nav.map((item, i) =>
              item.children ? (
                <li
                  key={item.label}
                  className={styles.navItem}
                  onPointerEnter={(e) => e.pointerType === "mouse" && openOnHover(i)}
                  onPointerLeave={(e) => e.pointerType === "mouse" && closeOnLeave()}
                >
                  <button
                    type="button"
                    className={styles.navLink}
                    aria-expanded={openIndex === i}
                    aria-controls={`nav-panel-${i}`}
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  >
                    {item.label}
                    <Icon name="chevron" className={styles.chevron} />
                  </button>
                  <div
                    id={`nav-panel-${i}`}
                    className={`${styles.panel} ${openIndex === i ? styles.panelOpen : ""}`}
                  >
                    <ul className={styles.panelList}>
                      {item.children.map((child) => (
                        <li key={child.label}>
                          <a href={child.href} className={styles.panelLink}>
                            <span className={styles.panelTitle}>
                              {child.label}
                              <Icon name="arrow" />
                            </span>
                            <span className={styles.panelDesc}>{child.description}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ) : (
                <li key={item.label} className={styles.navItem}>
                  <a href={item.href} className={styles.navLink}>
                    {item.label}
                  </a>
                </li>
              )
            )}
          </ul>
        </nav>

        <div className={styles.actions}>
          <a href={header.signIn.href} className={styles.signIn}>
            {header.signIn.label}
          </a>
          <CtaLink href={header.cta.href} label={header.cta.label} className={styles.cta} />
          <button
            ref={burgerRef}
            type="button"
            className={styles.burger}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? header.menuCloseLabel : header.menuOpenLabel}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      <div id="mobile-menu" className={styles.mobile} inert={!menuOpen} data-lenis-prevent>
        <nav className={`container ${styles.mobileInner}`} aria-label="Mobile">
          <ul className={styles.mobileList}>
            {header.nav.map((item, i) => (
              <li key={item.label} className={styles.mobileItem} style={{ "--i": i }}>
                {item.children ? (
                  <>
                    <button
                      type="button"
                      className={styles.mobileLink}
                      aria-expanded={mobileSub === i}
                      onClick={() => setMobileSub(mobileSub === i ? null : i)}
                    >
                      {item.label}
                      <Icon name="plus" className={styles.mobilePlus} />
                    </button>
                    <div className={`${styles.mobileSub} ${mobileSub === i ? styles.mobileSubOpen : ""}`}>
                      <ul>
                        {item.children.map((child) => (
                          <li key={child.label}>
                            <a href={child.href} onClick={() => setMenuOpen(false)}>
                              {child.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                ) : (
                  <a href={item.href} className={styles.mobileLink} onClick={() => setMenuOpen(false)}>
                    {item.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
          <div className={styles.mobileFooter}>
            <CtaLink href={header.cta.href} label={header.cta.label} />
            <a href={header.signIn.href} className={styles.mobileSignIn}>
              {header.signIn.label}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
