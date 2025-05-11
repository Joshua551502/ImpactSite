import React from "react";
import styles from "./MobileDisplay.module.css";

export default function MobileDisplay(){
  return (
    <div className={styles.MobileDisplay}>
        <img src="/mobile.svg"></img>
    </div>
  );
}