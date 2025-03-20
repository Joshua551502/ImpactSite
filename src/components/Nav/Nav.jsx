import React from "react";
import styles from "./Nav.module.css";

export default function Nav({ scrollPercent }) {
  const scrollbarPosition = `calc(50% + ${scrollPercent * 0.5}%)`; 

  return (
    <>
      <nav className={styles.nav}>
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
     <div className={styles.sidebar} id={styles.leftSideBar}>
        <div className={styles.scrollbarContainer}>
          <div
            className={styles.scrollbar}
            style={{ top: scrollbarPosition }}
          />
        </div>
      </div>

      <div className={styles.sidebar} id={styles.rightSideBar}></div>
    </>
  );
}
