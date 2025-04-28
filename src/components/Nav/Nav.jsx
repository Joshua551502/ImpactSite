import React, { useState, useEffect } from "react";
import styles from "./Nav.module.css";

export default function Nav({ scrollPercent }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Auto close menu if screen resized larger than 800px
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 800 && menuOpen) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [menuOpen]);

  const maxScrollbarTrackHeight = 150 - 20;
  const scrollbarPosition = `${
    (scrollPercent / 100) * maxScrollbarTrackHeight
  }px`;

  return (
    <>
      <nav className={styles.nav}>
        <div
          className={`${styles.hamburger} ${menuOpen ? styles.open : ""}`}
          onClick={toggleMenu}
        >
          <div className={styles.bar}></div>
          <div className={styles.bar}></div>
          <div className={styles.bar}></div>
        </div>

        <ul className={styles.menu} id={styles.menuLeft}>
          <li className={styles.menuItem} id={styles.mission} role="button">
            MISSION
          </li>
          <li className={styles.menuItem} role="button">
            INVEST
          </li>
          <li className={styles.menuItem} role="button">
            WEB3
          </li>
          <li className={styles.menuItem} role="button">
            PRIVACY
          </li>
        </ul>
        <ul className={styles.menu} id={styles.menuRight}>
          <li className={styles.menuItem} role="button">
            MERCH
          </li>
          <li className={styles.menuItem} role="button">
            DISCORD
          </li>
          <li className={styles.menuItem} role="button">
            ACCOUNT
          </li>
          <li className={styles.menuItem} role="button">
            LIGHTPAPER
          </li>
        </ul>
      </nav>

      <div
        className={`${styles.mobileMenu} ${
          menuOpen ? styles.open : styles.closed
        }`}
      >
        <button className={styles.mobileMenuItem}>MISSION</button>
        <button className={styles.mobileMenuItem}>INVEST</button>
        <button className={styles.mobileMenuItem}>WEB3</button>
        <button className={styles.mobileMenuItem}>PRIVACY</button>
        <button className={styles.mobileMenuItem}>MERCH</button>
        <button className={styles.mobileMenuItem}>DISCORD</button>
        <button className={styles.mobileMenuItem}>ACCOUNT</button>
        <button className={styles.mobileMenuItem}>LIGHTPAPER</button>
      </div>

      <div className={styles.sidebar} id={styles.leftSideBar}></div>
      <div className={styles.sidebar} id={styles.rightSideBar}></div>
    </>
  );
}
