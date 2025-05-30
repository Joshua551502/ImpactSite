"use client"; // Ensures dynamic execution
import React, { useEffect, useRef, useState } from "react";
import styles from "./Intro.module.css";
import dynamic from "next/dynamic";

const Scene = dynamic(() => import("../../components/Scene/Index"), {
  ssr: false,
});

export default function Intro({ scrollY = 0 }) {
  const iceberg2Ref = useRef(null);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [loadingPercentage, setLoadingPercentage] = useState(0);
  const [loadingText, setLoadingText] = useState("Loading");

  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();

    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const iceberg2 = iceberg2Ref.current; // ✅ move this up
    const backdrop = container.querySelector(`.${styles.backdrop}`);
    const circle = container.querySelector(`.${styles.impactionCircle}`);

    if (!hasScrolled && iceberg2) {
      // Apply parallax movement when user hasn't scrolled yet
      iceberg2.style.transform = `translate(${x * 0.06}px, ${y * 0.06}px)`;
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
    const iceberg2 = iceberg2Ref.current;
    const backdrop = container.querySelector(`.${styles.backdrop}`);
    const circle = container.querySelector(`.${styles.impactionCircle}`);

    if (!hasScrolled && iceberg2) {
      iceberg2.style.transform = `translate(0px, 0px)`;
    }

    if (backdrop) {
      backdrop.style.transform = `translate(0px, 0px)`;
    }

    if (circle) {
      circle.style.transform = `translate(0px, 0px) translateX(50%)`;
    }
  };

  useEffect(() => {
    const iceberg2 = iceberg2Ref.current;
    if (!iceberg2) return;

    const offsetY = scrollY * 0.3;
    iceberg2.style.transform = `translateY(${offsetY}px)`;
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
    }, 300); // 10 seconds delay

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let progress = 0;
    const keyframes = [
      { target: 30, duration: 400 },
      { target: 50, duration: 500 },
      { target: 65, duration: 400 },
      { target: 85, duration: 500 },
      { target: 95, duration: 600 },
      { target: 100, duration: 600 },
    ];

    function animateStep(index) {
      if (index >= keyframes.length) return;

      const { target, duration } = keyframes[index];
      const startTime = performance.now();
      const startValue = progress;

      function step(currentTime) {
        const elapsed = currentTime - startTime;
        const t = Math.min(elapsed / duration, 1);
        progress = startValue + (target - startValue) * t;
        setLoadingPercentage(Math.floor(progress));

        if (t < 1) {
          requestAnimationFrame(step);
        } else {
          progress = target;
          setLoadingPercentage(target);
          if (target < 100) {
            setTimeout(() => animateStep(index + 1), 100);
          }
        }
      }

      requestAnimationFrame(step);
    }

    animateStep(0);
  }, []);

  useEffect(() => {
    const dots = ["Loading", "Loading.", "Loading..", "Loading..."];
    let index = 0;

    const interval = setInterval(() => {
      setLoadingText((prev) => {
        if (loadingPercentage >= 100) return "Complete";
        return dots[index];
      });
      index = (index + 1) % dots.length;
    }, 500);

    return () => clearInterval(interval);
  }, [loadingPercentage]);

  return (
    <div
      className={styles.intro}
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.impactionCircle}>
        <div className={styles.whiteCircle}>
          <div className={styles.loadingAnimation}>
            {" "}
            <div className={styles.loadText}>{loadingText}</div>
          </div>
          <svg
            viewBox="0 0 100 20"
            xmlns="http://www.w3.org/2000/svg"
            className={styles.percentTextContainer}
          >
            <defs>
              <linearGradient id="textGradient" gradientTransform="rotate(90)">
                <stop offset="0%" stop-color="#0DA388" />
                <stop offset="100%" stop-color="#4289BF" />
              </linearGradient>

              <mask id="waveMask">
                <rect width="100" height="20" fill="black" />
                <g>
                  <path
                    id="wavePath"
                    d="M-40 20 Q-30 18 -20 20 T0 20 T20 20 T40 20 T60 20 T80 20 T100 20 T120 20 V20 H-40z"
                    fill="white"
                  >
                    <animate
                      attributeName="d"
                      begin="0s"
                      dur="4s"
                      values="
           M-40 20 Q-30 18 -20 20 T0 20 T20 20 T40 20 T60 20 T80 20 T100 20 T120 20 V20 H-40z;
           M-40 15 Q-30 13 -20 15 T0 15 T20 15 T40 15 T60 15 T80 15 T100 15 T120 15 V20 H-40z;
           M-40 10 Q-30 8 -20 10 T0 10 T20 10 T40 10 T60 10 T80 10 T100 10 T120 10 V20 H-40z;
           M-40 5 Q-30 4 -20 5 T0 5 T20 5 T40 5 T60 5 T80 5 T100 5 T120 5 V20 H-40z;
           M-40 0 Q-30 0 -20 0 T0 0 T20 0 T40 0 T60 0 T80 0 T100 0 T120 0 V20 H-40z"
                      fill="freeze"
                    />
                  </path>

                  <animateTransform
                    attributeName="transform"
                    type="translate"
                    from="0,0"
                    to="40,0"
                    dur="1.5s"
                    repeatCount="indefinite"
                  />
                </g>
              </mask>
            </defs>

            <text
              text-anchor="middle"
              x="50"
              y="15"
              font-size="16"
              fill="url(#textGradient)"
              mask="url(#waveMask)"
            >
              {loadingPercentage}%
            </text>
          </svg>
        </div>
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
      </div>
      <div className={styles.iceburg2} ref={iceberg2Ref}>
        <img
          src="medias/intro-images/iceberg.png"
          className={styles.iceburgImage2}
        />
      </div>
    </div>
  );
}
