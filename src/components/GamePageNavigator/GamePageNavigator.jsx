// GamePageNavigator.jsx
"use client";

import React, { useState } from "react";
import styles from "./GamePageNavigator.module.css";
import MobileDisplay from "../MobileDisplay/MobileDisplay";
import GamePage from "../GamePage/GamePage";
import WheelPage from "../WheelPage/WheelPage2";
import CauseSelected from "../WheelPage/CausesSelected";
import PacmanEmbed from "../PacmanEmbed/PacmanEmbed";

export default function GamePageNavigator() {
  const [page, setPage] = useState(1);

  const nextPage = () => {
    setPage((prev) => Math.min(prev + 1, 5));
  };

  const prevPage = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div className={styles.navigatorWrapper}>
      <div className={styles.pageContainer}>
        {page === 1 && (
          <div className={styles.mobileGame}>
            <MobileDisplay />
            <div className={styles.mobileOverlay}>
              <h1 className={styles.mobileClubTitle}>CLIMATE CLUB</h1>
              <div className={styles.gridMenu}>
                <div className={styles.menuItem} onClick={nextPage}>
                  <span>CLIMATE CRUSH</span>
                  <span className={styles.emoji}>🫧</span>
                </div>
                <div className={`${styles.menuItem} ${styles.disabled}`}>
                  <span>IMPACT ZERO</span>
                  <span className={styles.emoji}>👾</span>
                </div>
                <div className={`${styles.menuItem} ${styles.disabled}`}>
                  <span>SPIN WHEEL</span>
                  <span className={styles.emoji}>🎡</span>
                </div>
                <div className={`${styles.menuItem} ${styles.disabled}`}>
                  <span>TOKENS</span>
                  <span className={styles.emoji}>🀄</span>
                </div>
                <div className={`${styles.menuItem} ${styles.disabled}`}>
                  <span>TRACKER</span>
                  <span className={styles.emoji}>🧮</span>
                </div>
                <div className={`${styles.menuItem} ${styles.disabled}`}>
                  <span>SETTINGS</span>
                  <span className={styles.emoji}>💼</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {page === 2 && <GamePage nextPage={nextPage} />}

        {page === 3 && (
          <div className={styles.mobileGame}>
            <WheelPage nextPage={nextPage} />
          </div>
        )}

        {page === 4 && (
          <div className={styles.mobileGame}>
            <CauseSelected nextPage={nextPage} />
          </div>
        )}

        {page === 5 && (
          <div className={styles.mobileGame}>
            <div className={styles.climateSavings}>
              <h2 className={styles.savingsTitle}>CLIMATE SAVINGS</h2>
              <div className={styles.circleContainer}>
                <svg className={styles.progressCircle} viewBox="0 0 36 36">
                  <defs>
                    <linearGradient id="gradient" x1="1" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0DA388" />
                      <stop offset="100%" stopColor="#00689D" />
                    </linearGradient>
                  </defs>

                  <path
                    className={styles.circleBg}
                    d="M18 2.0845
       a 15.9155 15.9155 0 0 1 0 31.831
       a 15.9155 15.9155 0 0 1 0 -31.831"
                  />

                  <path
                    className={styles.circleProgress}
                    d="M18 2.0845
       a 15.9155 15.9155 0 0 1 0 31.831
       a 15.9155 15.9155 0 0 1 0 -31.831"
                  />

                  <text
                    x="18"
                    y="18"
                    textAnchor="middle"
                    dy="0.3em"
                    className={styles.percentText}
                  >
                    125%
                  </text>
                </svg>

                <p className={styles.footprintNote}>
                  of your footprint
                  <br />
                  Way to go!
                </p>
              </div>
              <p className={styles.description}>
                Calculate your Climate
                <br />
                Credit and Tax Offsets
              </p>
              <button className={styles.updateButton}>UPDATE IMPACT</button>
            </div>
          </div>
        )}
      </div>

      <div className={styles.buttonNav}>
        <button onClick={prevPage} disabled={page === 1}>
          ←
        </button>
        <button onClick={nextPage} disabled={page === 5}>
          →
        </button>
      </div>

      <PacmanEmbed/>
    </div>
  );
}
