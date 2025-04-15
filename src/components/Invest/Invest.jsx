import React from "react";
import styles from "./Invest.module.css";

export default function Invest() {
  return (
    <section className={styles.fancy} id="invest" data-section="invest">
      <div className={styles.container} data-container>
        <div className={styles.panel} data-panel="web3">WEB3</div>
        <div className={styles.panel} data-panel="invest">INVEST</div>
        <div className={styles.panel} data-panel="safety">SAFETY</div>
      </div>
    </section>
  );
}
