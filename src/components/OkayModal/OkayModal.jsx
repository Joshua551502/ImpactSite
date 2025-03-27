// components/OkayModal/OkayModal.jsx
import React, { useState, useEffect } from "react";
import styles from "./OkayModal.module.css";

export default function OkayModal({ onClose }) {
  const [isClosing, setIsClosing] = useState(false);

  const handleClick = () => {
    setIsClosing(true);
  };

  useEffect(() => {
    if (isClosing) {
      const timer = setTimeout(() => {
        onClose(); // notify parent after fade-out
      }, 300); // match duration in CSS
      return () => clearTimeout(timer);
    }
  }, [isClosing, onClose]);

  return (
    <div
      className={`${styles.okayModal} ${
        isClosing ? styles.fadeOut : styles.fadeIn
      }`}
    >
      <div className={styles.textContainer}>
        <div className={styles.text}>
          TO ENSURE THE BEST EXPERIENCE WE USE <span>COOKIES</span> COOKIES TO HELP RUN THE WEBSITE
        </div>
        <div className={styles.button} onClick={handleClick}>
          OKAY
        </div>
      </div>
    </div>
  );
}
