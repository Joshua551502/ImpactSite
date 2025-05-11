import React from "react";
import styles from "./GamePage.module.css";
import MobileDisplay from "../MobileDisplay/MobileDisplay";

export default function GamePage() {
  return (
    <div className={styles.gamePage}>
      <div className={styles.mobileGrid}>
        <div className={styles.mobileGame}>
          <div className={styles.mobileBackground}>
            <MobileDisplay />
          </div>
          <div className={styles.screenArea}>
            <div className={styles.contentWrapper}>
              <div className={styles.gameTitle}>CLIMATE CRUSH</div>
              <div className={styles.statusGrid}>
                <div className={styles.level}>
                  <div className={styles.levelLabel}>LEVEL</div>
                  <div className={styles.levelNumber}>25</div>
                </div>
                <div className={styles.progressBar}>
                  <div className={styles.progress}></div>
                </div>
                <div className={styles.score}>
                  <div className={styles.levelLabel}>SCORE</div>
                  <div className={styles.levelNumber}>00001</div>
                </div>
              </div>
              <div className={styles.gameInterface}>
                <img src="/medias/game-page/game-background.png" className={styles.gameImage}/>
              </div>
              <div className={styles.climateSection}>
                <div className={styles.climateCoins}>
                  <div className={styles.climateText}>
                    CLIMATE <br /> COINS
                  </div>
                  <div className={styles.climateValue}>25,000</div>
                </div>
                <div className={styles.menuButtons}>
                  <img src="/medias/game-page/buttons.png"></img>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.mobileGame}>
          <div className={styles.mobileBackground}>
            <MobileDisplay />
          </div>
          <div className={styles.screenArea}>
            <div className={styles.contentWrapper}>
              <div className={styles.gameTitle}>
                IM<span className={styles.goldText}>PAC</span>T{" "}
                <span className={styles.goldTextTwo}>ZERO</span>
              </div>
              <div className={styles.statusGrid}>
                <div className={styles.level}>
                  <div className={styles.levelLabel}>LEVEL</div>
                  <div className={styles.levelNumber}>25</div>
                </div>
                <div className={styles.progressBar}>
                  <div className={styles.progress}></div>
                </div>
                <div className={styles.score}>
                  <div className={styles.levelLabel}>SCORE</div>
                  <div className={styles.levelNumber}>00001</div>
                </div>
              </div>
              <div className={styles.gameInterface}></div>
              <div className={styles.climateSection}>
                <div className={styles.climateCoins}>
                  <div className={styles.climateText}>COINS</div>
                  <div className={styles.climateValue}>25</div>
                </div>
                <div className={styles.menuButtons}>
                  <img src="/medias/game-page/buttons.png"></img>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
