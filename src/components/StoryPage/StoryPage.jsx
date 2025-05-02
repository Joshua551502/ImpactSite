"use client"; // Ensures dynamic execution
import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import styles from "./StoryPage.module.css";
import Intro from "../Intro/Intro";

const Scene = dynamic(() => import("../../components/Scene/Index"), {
  ssr: false,
});

export default function StoryPage({ scrollY }) {
  const cursorRef = useRef(null);
  const contentContainerRef = useRef(null);
  const canvasRef = useRef(null);
  const [isInside, setIsInside] = useState(false);
  const [daysTill2030, setDaysTill2030] = useState(0);
  const [countdown, setCountdown] = useState("00.00.00");
  const [isHovered, setIsHovered] = useState(false);
  const [loadingPercentage, setLoadingPercentage] = useState(0);
  const [loadingText, setLoadingText] = useState("Loading");
  const [isLoaded, setIsLoaded] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("black");
  const [glowing, setGlowing] = useState(false);
  const [textColor, setTextColor] = useState("black");

  useEffect(() => {
    const scene = document.querySelector(".scenePage");
    if (scene) {
      scene.style.transform = "scale(1.5)";
    }
  }, []); // Empty dependency array ensures this runs only once

  useEffect(() => {
    let progress = 0;

    // Keyframes for a smooth 3-second load
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
        if (loadingPercentage >= 100) return "Complete"; // Stops when fully loaded
        return dots[index];
      });
      index = (index + 1) % dots.length;
    }, 500);

    return () => clearInterval(interval);
  }, [loadingPercentage]);

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

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!cursorRef.current || !contentContainerRef.current) return;
      const { left, top } = contentContainerRef.current.getBoundingClientRect();
      const x = e.clientX - left - 12;
      const y = e.clientY - top - 12;
      cursorRef.current.style.transform = `translate(${x}px, ${y}px)`;
      cursorRef.current.style.display = "block";
      setIsInside(true);
    };

    const handleMouseLeave = () => {
      if (cursorRef.current) {
        cursorRef.current.style.display = "none";
      }
      setIsInside(false);
    };

    const container = contentContainerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  useEffect(() => {
    let canvas = canvasRef.current;
    let ctx = canvas.getContext("2d");
    let vertexes = [];
    let diffPt = [];
    const verNum = 30;
    let waveDamping = 0.98;
    let waveStrength = 20;
    let autoDiff = 50;
  
    function initCanvas() {
      let parent = canvas.parentElement;
      canvas.width = parent.clientWidth;
      canvas.height = 200;
  
      vertexes = [];
      diffPt = [];
  
      for (let i = 0; i < verNum; i++) {
        vertexes[i] = new Vertex((canvas.width / (verNum - 1)) * i, canvas.height / 4, canvas.height / 4);
        diffPt[i] = 0;
      }
    }
  
    function update() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      autoDiff *= 0.98;
  
      for (let i = 1; i < verNum - 1; i++) {
        diffPt[i] += (diffPt[i - 1] + diffPt[i + 1]) / 2 - diffPt[i];
        diffPt[i] *= waveDamping;
      }
  
      for (let i = 0; i < vertexes.length; i++) {
        vertexes[i].updateY(diffPt[i]);
      }
  
      draw();
    }
  
    function draw() {
      ctx.beginPath();
      ctx.moveTo(0, canvas.height);
  
      let gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, "rgba(102, 102, 102, 0.1)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0.9)");
      ctx.fillStyle = gradient;
  
      ctx.lineTo(vertexes[0].x, vertexes[0].y);
  
      for (let i = 1; i < vertexes.length - 1; i++) {
        const midX = (vertexes[i].x + vertexes[i + 1].x) / 2;
        const midY = (vertexes[i].y + vertexes[i + 1].y) / 2;
        ctx.quadraticCurveTo(vertexes[i].x, vertexes[i].y, midX, midY);
      }
  
      ctx.lineTo(vertexes[vertexes.length - 1].x, vertexes[vertexes.length - 1].y);
      ctx.lineTo(canvas.width, canvas.height);
      ctx.fill();
    }
  
    function Vertex(x, y, baseY) {
      this.baseY = baseY;
      this.x = x;
      this.y = y;
      this.vy = 0;
      this.targetY = 0;
      this.friction = 0.05;
      this.deceleration = 0.99;
    }
  
    Vertex.prototype.updateY = function (diffVal) {
      this.targetY = diffVal + this.baseY;
      this.vy += this.targetY - this.y;
      this.y += this.vy * this.friction;
      this.vy *= this.deceleration;
    };
  
    canvas.addEventListener("mousemove", (e) => {
      let mouseX = e.offsetX;
      let index = Math.floor(((verNum - 1) * mouseX) / canvas.width);
      if (index > 0 && index < verNum - 1) {
        diffPt[index] = waveStrength;
      }
    });
  
    // 🆕 Handle resize
    const handleResize = () => {
      initCanvas(); // Re-initialize everything on resize
    };
  
    window.addEventListener("resize", handleResize);
  
    initCanvas();
    const interval = setInterval(update, 1000 / 60);
  
    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  

  useEffect(() => {
    if (loadingPercentage >= 100) {
      setTimeout(() => {
        setIsLoaded(true);
        setBackgroundColor("black"); // Start transition immediately when fade begins
      }, 1000);
    }
  }, [loadingPercentage]);

  return (
    <div
      className={`${styles.StoryPage} ${isLoaded ? styles.fadeOut : ""}`}
      style={{ backgroundColor }}
    >
      <div className={styles.navContainer}>
        <div className={styles.navWrapper}>
          <div className={styles.navBar}>
            <div className={styles.countDown}>
              <div className={styles.sunMoonContainer}>
                <div className={styles.sun}></div>
                <div className={styles.moon}></div>
              </div>
              <div className={styles.daysTill}>
                <br />
              </div>
              <div className={styles.numberValues} style={{ color: textColor }}>
                {countdown}
              </div>
            </div>
            <div className={styles.countDown2}>
              <div className={styles.daysTill}>
                {daysTill2030} DAYS TILL 2030
              </div>
            </div>
          </div>
          <div className={styles.navOptionsLeft}>
            <div className={styles.navOption}>
              <div className={styles.navItem}>MISSION</div>
            </div>
            <div className={styles.navOption}>
              <div className={styles.navItem}>INVEST</div>
            </div>
            <div className={styles.navOption}>
              <div className={styles.navItem}>WEB3</div>
            </div>
            <div className={styles.navOption}>
              <div className={styles.navItem}>PRIVACY</div>
            </div>
          </div>
          <div className={styles.navOptionsRight}>
            <div className={styles.navOption}>
              <div className={styles.navItem}>MERCH</div>
            </div>
            <div className={styles.navOption}>
              <div className={styles.navItem}>DISCORD</div>
            </div>
            <div className={styles.navOption}>
              <div className={styles.navItem}>ACCOUNT</div>
            </div>
            <div className={styles.navOption}>
              <div className={styles.navItem}>LIGHTPAPER</div>
            </div>
          </div>
        </div>
      </div>
      <div ref={contentContainerRef} className={styles.contentContainer}>
        {/* <div ref={cursorRef} className={styles.customCursor} /> */}

        <div className={`${styles.loading} ${isLoaded ? styles.fadeOut : ""}`}>
          <svg className={styles.progressCircle} viewBox="0 0 100 100">
            <circle
              className={styles.circleBackground}
              cx="50"
              cy="50"
              r="45"
            />
            <circle
              className={styles.circleProgress}
              cx="50"
              cy="50"
              r="45"
              strokeDasharray="282.74"
              strokeDashoffset={`${
                282.74 - (loadingPercentage / 100) * 282.74
              }`}
            />
          </svg>

          <div className={styles.loadText}>{loadingText}</div>
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
              font-size="17"
              fill="url(#textGradient)"
              mask="url(#waveMask)"
            >
              {loadingPercentage}%
            </text>
          </svg>
        </div>
        <div className={`${styles.scenePage} ${isLoaded ? styles.fadeIn : ""}`}>
          <Intro scrollY={scrollY} />
        </div>
        <div className={styles.socials}>
          <ul>
            <li>
              <a href="#">
                <i className={`fab fa-facebook-f ${styles.icon}`}></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i className={`fab fa-x-twitter ${styles.icon}`}></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i className={`fab fa-linkedin-in ${styles.icon}`}></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.liquidEffect}>
        <canvas ref={canvasRef} className={styles.canvas}></canvas>
      </div>
      <div className={styles.waterText}>
        <div className={styles.textScroller}>
          <div className={styles.scrollingText}>
            &quot;We have a choice: We can enhance life and come to know the
            universe that made us, or we can squander our 15 billion-year
            heritage in meaningless self-destruction.&quot; - Carl Sagan
            &nbsp;&nbsp;&nbsp;<span className={styles.orbitDot}>•</span>
            &nbsp;&nbsp;&nbsp; &quot;We have a choice: We can enhance life and
            come to know the universe that made us, or we can squander our 15
            billion-year heritage in meaningless self-destruction.&quot; - Carl
            Sagan &nbsp;&nbsp;&nbsp;<span className={styles.orbitDot}>•</span>
            &nbsp;&nbsp;&nbsp;
          </div>
        </div>
      </div>
    </div>
  );
}
