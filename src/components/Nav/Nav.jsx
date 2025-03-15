import React, { useEffect, useRef, useState } from "react";
import styles from "./Nav.module.css";

export default function Nav() {

      const cursorRef = useRef(null);
      const contentContainerRef = useRef(null);
      const canvasRef = useRef(null);
      const [isInside, setIsInside] = useState(false);
      const [daysTill2030, setDaysTill2030] = useState(0);
      const [countdown, setCountdown] = useState("00.00.00.00");
      const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
      const targetDate = new Date("January 1, 2030 00:00:00").getTime();

      const updateCountdown = () => {
        const now = new Date().getTime();
        const timeLeft = targetDate - now;
  
        if (timeLeft <= 0) {
          setDaysTill2030(0);
          setCountdown("00.00.00.00");
          return;
        }
  
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
  
        setDaysTill2030(days);
        setCountdown(
          `${String(hours).padStart(2, "0")}.${String(minutes).padStart(
            2,
            "0"
          )}.${String(seconds).padStart(2, "0")}`
        );
      };
  
      updateCountdown();
      const interval = setInterval(updateCountdown, 1000);
  
      return () => clearInterval(interval);
    }, []);
    

  return (
    <>
      <nav className={styles.nav}>
        
        <ul className={styles.menu} id={styles.menuLeft}>
  
          <li className={styles.menuItem} id={styles.mission}>MISSION</li>
          <li className={styles.menuItem}>INVEST</li>
          <li className={styles.menuItem}>WEB3</li>
          <li className={styles.menuItem}>PRIVACY</li>
        </ul>
        <ul className={styles.menu} id={styles.menuRight}>
          <li className={styles.menuItem}>MERCH</li>
          <li className={styles.menuItem}>DISCORD</li>
          <li className={styles.menuItem}>ACCOUNT</li>
          <li className={styles.menuItem}>LIGHTPAPER</li>
        </ul>
      </nav>
      <div className={styles.sidebar} id={styles.leftSideBar}></div>
      <div className={styles.sidebar} id={styles.rightSideBar}></div>
      
        <div className={styles.navBar}>
            <div className={styles.sunMoonContainer}>
              <div className={styles.sun}></div>
              <div className={styles.moon}></div>
            </div>
           
          </div>
    </>
  );
}
