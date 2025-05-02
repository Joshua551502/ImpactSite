import React, { useState, useEffect } from "react";
import styles from "./Nav.module.css";
import { gsap } from "gsap"; // Make sure gsap is imported

export default function Nav({ scrollPercent }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Auto close menu if screen resized larger than 800px
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1000 && menuOpen) {
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

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    const scroller = document.querySelector("main"); // Your custom scroller
    if (section && scroller) {
      // Only Mission section should have the -40 offset
      const yOffset = id === "missionSection" ? -40 : 0;
      const y =
        section.getBoundingClientRect().top + scroller.scrollTop + yOffset;

      gsap.to(scroller, {
        scrollTop: y,
        duration: 1, // seconds
        ease: "power3.out",
      });

      setMenuOpen(false); // (optional) close mobile menu after click
    }
  };

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
          <li
            className={styles.menuItem}
            id={styles.mission}
            role="button"
            onClick={() => scrollToSection("missionSection")}
          >
            MISSION
          </li>

          <li
            className={styles.menuItem}
            role="button"
            onClick={() => scrollToSection("web3Section")}
          >
            WEB3
          </li>

          <li
            className={styles.menuItem}
            role="button"
            onClick={() => scrollToSection("investSection")}
          >
            INVEST
          </li>

          <li
            className={styles.menuItem}
            role="button"
            onClick={() => scrollToSection("privacySection")}
          >
            PRIVACY
          </li>
        </ul>
        <ul className={styles.menu} id={styles.menuRight}>
          <li className={styles.menuItem} role="button" id={styles.comingSoon}>
            MERCH
          </li>
          <li className={styles.menuItem} role="button" id={styles.comingSoon}>
            DISCORD
          </li>
          <li className={styles.menuItem} role="button" id={styles.comingSoon}>
            ACCOUNT
          </li>
          <li className={styles.menuItem} role="button" id={styles.comingSoon}>
            LIGHTPAPER
          </li>
        </ul>
      </nav>

      <div
        className={`${styles.mobileMenu} ${
          menuOpen ? styles.open : styles.closed
        }`}
      >
        <button
          className={styles.mobileMenuItem}
          id={styles.mission}
          role="button"
          onClick={() => scrollToSection("missionSection")}
        >
          MISSION
        </button>
        <button
          className={styles.mobileMenuItem}
          onClick={() => scrollToSection("web3Section")}
        >
          WEB3
        </button>
        <button
          className={styles.mobileMenuItem}
          onClick={() => scrollToSection("investSection")}
        >
          INVEST
        </button>
        <button
          className={styles.mobileMenuItem}
          onClick={() => scrollToSection("privacySection")}
        >
          PRIVACY
        </button>
        <button className={styles.mobileMenuItem} id={styles.comingSoon}>
          MERCH
        </button>
        <button className={styles.mobileMenuItem} id={styles.comingSoon}>
          DISCORD
        </button>
        <button className={styles.mobileMenuItem} id={styles.comingSoon}>
          ACCOUNT
        </button>
        <button className={styles.mobileMenuItem} id={styles.comingSoon}>
          LIGHTPAPER
        </button>
      </div>

      <div className={styles.sidebar} id={styles.leftSideBar}></div>
      <div className={styles.sidebar} id={styles.rightSideBar}></div>
    </>
  );
}
