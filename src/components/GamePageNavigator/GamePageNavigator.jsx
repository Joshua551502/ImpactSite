// GamePageNavigator.jsx
import React, { useState } from "react";
import styles from "./GamePageNavigator.module.css";
import MobileDisplay from "../MobileDisplay/MobileDisplay";
import GamePage from "../GamePage/GamePage";
import WheelPage from "../WheelPage/WheelPage2";
import CauseSelected from "../WheelPage/CausesSelected";

export default function GamePageNavigator() {
  const [page, setPage] = useState(1);

  const nextPage = () => {
    setPage((prev) => Math.min(prev + 1, 4));
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
                <div className={styles.menuItem}>
                  <span>CLIMATE CRUSH</span>
                  <span className={styles.emoji}>🫧</span>
                </div>
                <div className={styles.menuItem}>
                  <span>IMPACT ZERO</span>
                  <span className={styles.emoji}>👾</span>
                </div>
                <div className={styles.menuItem}>
                  <span>SPIN WHEEL</span>
                  <span className={styles.emoji}>🎡</span>
                </div>
                <div className={styles.menuItem}>
                  <span>TOKENS</span>
                  <span className={styles.emoji}>🀄</span>
                </div>
                <div className={styles.menuItem}>
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

        {page === 2 && <GamePage />}
        {page === 3 && (
          <div className={styles.mobileGame}>
            <WheelPage />
          </div>
        )}
        {page === 4 && (
          <div className={styles.mobileGame}>
            <CauseSelected />
          </div>
        )}
      </div>

      <div className={styles.buttonNav}>
        <button onClick={prevPage} disabled={page === 1}>
          ←
        </button>
        <button onClick={nextPage} disabled={page === 4}>
          →
        </button>
      </div>
    </div>
  );
}
