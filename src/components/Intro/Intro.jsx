"use client"; // Ensures dynamic execution
import React, { useEffect, useRef, useState } from "react";
import styles from "./Intro.module.css";
import dynamic from "next/dynamic";

const Scene = dynamic(() => import("../../components/Scene/Index"), {
  ssr: false,
});

export default function Intro({ scrollY = 0 }) {
  const icebergRef = useRef(null);
  const [hasScrolled, setHasScrolled] = useState(false);

  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();

    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const iceberg = icebergRef.current; // ✅ move this up
    const backdrop = container.querySelector(`.${styles.backdrop}`);
    const circle = container.querySelector(`.${styles.impactionCircle}`);

    if (!hasScrolled && iceberg) {
      // Apply parallax movement when user hasn't scrolled yet
      iceberg.style.transform = `translate(${x * 0.06}px, ${y * 0.06}px)`;
    }

    if (backdrop) {
      backdrop.style.transform = `translate(${x * 0.01}px, ${y * 0.01}px)`;
    }

    if (circle) {
      circle.style.transform = `translate(${x * 0.03}px, ${
        y * 0.03
      }px) translateX(50%)`;
    }
  };

  const handleMouseLeave = () => {
    const container = containerRef.current;
    const iceberg = icebergRef.current;
    const backdrop = container.querySelector(`.${styles.backdrop}`);
    const circle = container.querySelector(`.${styles.impactionCircle}`);

    if (!hasScrolled && iceberg) {
      iceberg.style.transform = `translate(0px, 0px)`;
    }

    if (backdrop) {
      backdrop.style.transform = `translate(0px, 0px)`;
    }

    if (circle) {
      circle.style.transform = `translate(0px, 0px) translateX(50%)`;
    }
  };

  useEffect(() => {
    const iceberg = icebergRef.current;
    if (!iceberg) return;

    const offsetY = scrollY * 0.3;
    iceberg.style.transform = `translateY(${offsetY}px)`;
  }, [scrollY]);

  useEffect(() => {
    // If scroll is very close to the top, re-enable parallax
    if (scrollY <= 10 && hasScrolled) {
      setHasScrolled(false);
    }

    // If user scrolls down enough, disable parallax
    if (scrollY > 10 && !hasScrolled) {
      setHasScrolled(true);
    }
  }, [scrollY]);
  const backgroundRef = useRef(null);
  const [fadeToBlack, setFadeToBlack] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeToBlack(true);
    }, 200); // start fade shortly after mount
    return () => clearTimeout(timer);
  }, []);

  const sceneRef = useRef(null);
  const [fadeInScene, setFadeInScene] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeInScene(true);
    }, 500); // 10 seconds delay

    return () => clearTimeout(timer);
  }, []);

  

  return (
    <div
      className={styles.intro}
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.impactionCircle}>
        <div className={styles.eclipseRays} />

        <div className={styles.ImpactionFrontCircle}>
          <div
            className={`${styles.sceneFadeWrapper} ${
              fadeInScene ? styles.sceneVisible : ""
            }`}
            ref={sceneRef}
          >
            <Scene scrollY={scrollY} />
          </div>
        </div>
      </div>
      <div className={styles.skyMountain}>
        <div
          className={`${styles.backgroundDay} ${styles.backgroundDayStart}`}
          ref={backgroundRef}
        ></div>
        <div
          className={`${styles.backgroundDay} ${styles.backgroundDayEnd}`}
          style={{ opacity: fadeToBlack ? 1 : 0 }}
        ></div>

        <img
          src="medias/intro-images/backdrop.jpg"
          className={styles.backdrop}
        />
        <div className={styles.iceburg} ref={icebergRef}>
          <img
            src="medias/intro-images/iceberg.png"
            className={styles.iceburgImage}
          />
        </div>
      </div>
    </div>
  );
}
