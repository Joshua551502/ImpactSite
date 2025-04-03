"use client"; // Ensures dynamic execution
import React, { useEffect, useRef, useState } from "react";
import styles from "./Intro.module.css";
import dynamic from "next/dynamic";

const Scene = dynamic(() => import("../../components/Scene/Index"), {
  ssr: false,
});

export default function Intro() {
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
  
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
  
    const iceberg = container.querySelector(`.${styles.iceburg}`);
    const backdrop = container.querySelector(`.${styles.backdrop}`);
    const circle = container.querySelector(`.${styles.impactionCircle}`);
  
    // Realistic parallax: far (moves least) → near (moves most)
    backdrop.style.transform = `translate(${x * 0.01}px, ${y * 0.01}px)`;   // least movement
    circle.style.transform = `translate(${x * 0.03}px, ${y * 0.03}px) translateX(50%)`;
    iceberg.style.transform = `translate(${x * 0.06}px, ${y * 0.06}px)`;   // most movement
  };
  

  const handleMouseLeave = () => {
    const container = containerRef.current;
    const iceberg = container.querySelector(`.${styles.iceburg}`);
    const backdrop = container.querySelector(`.${styles.backdrop}`);
    const circle = container.querySelector(`.${styles.impactionCircle}`);
  
    iceberg.style.transform = `translate(0px, 0px)`;
    backdrop.style.transform = `translate(0px, 0px)`;
    circle.style.transform = `translate(0px, 0px) translateX(50%)`;
  };
  

  return (
    <div
      className={styles.intro}
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
       <div className={styles.impactionCircle}>

<div className={styles.ImpactionFrontCircle}> <Scene/></div>

</div>
      <div className={styles.skyMountain}>
       
        <img
          src="medias/intro-images/backdrop.png"
          className={styles.backdrop}
        />
        <div className={styles.iceburg}>
          <img
            src="medias/intro-images/iceburg.png"
            className={styles.iceburg}
          />
        </div>
      </div>
    </div>
  );
}
