"use client"; // Ensures dynamic execution
import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import styles from "./StoryPage.module.css";

const Scene = dynamic(() => import("@/components/Scene"), { ssr: false });

export default function StoryPage() {
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
  const [backgroundColor, setBackgroundColor] = useState("white");
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

    // Ensure the canvas fills its parent
    let parent = canvas.parentElement;
    canvas.width = parent.clientWidth;
    canvas.height = parent.clientHeight; // Ensure it takes the full height

    let vertexes = [];
    let diffPt = [];
    const verNum = 30;
    let waveDamping = 0.98;
    let waveStrength = 20;
    let autoDiff = 50;

    function initCanvas() {
      let cW = canvas.width;
      let cH = canvas.height;
      for (let i = 0; i < verNum; i++) {
        vertexes[i] = new Vertex((cW / (verNum - 1)) * i, cH / 4, cH / 4);
      }
      initDiffPt();
    }

    function initDiffPt() {
      for (let i = 0; i < verNum; i++) diffPt[i] = 0;
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
      gradient.addColorStop(0, "#666666");
      gradient.addColorStop(1, "#000000");

      ctx.fillStyle = gradient;
      ctx.lineTo(vertexes[0].x, vertexes[0].y);

      for (let i = 1; i < vertexes.length - 1; i++) {
        const midX = (vertexes[i].x + vertexes[i + 1].x) / 2;
        const midY = (vertexes[i].y + vertexes[i + 1].y) / 2;
        ctx.quadraticCurveTo(vertexes[i].x, vertexes[i].y, midX, midY);
      }

      ctx.lineTo(
        vertexes[vertexes.length - 1].x,
        vertexes[vertexes.length - 1].y
      );
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

    initCanvas();
    const interval = setInterval(update, 1000 / 60);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
  if (loadingPercentage >= 100) {
    setTimeout(() => {
      setIsLoaded(true);
      setBackgroundColor("black");  // Start transition immediately when fade begins
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
            <div className={styles.sunMoonContainer}>
              <div className={styles.sun}></div>
              <div className={styles.moon}></div>
            </div>
            <div className={styles.countDown}>
              <div className={styles.daysTill}>
                <br/>
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
          <div className={styles.percentText}>
            <svg viewBox="0 0 100 20" className={styles.waveText}>
              <defs>
                <linearGradient id="gradient">
                  <stop stopColor="#0DA388" />
                </linearGradient>
                <pattern
                  id="wave"
                  x="0"
                  y="-0.5"
                  width="100%"
                  height="100%"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    id="wavePath"
                    d="M-40 9 Q-30 7 -20 9 T0 9 T20 9 T40 9 T60 9 T80 9 T100 9 T120 9 V20 H-40z"
                    mask="url(#mask)"
                    fill="url(#gradient)"
                  >
                    <animateTransform
                      attributeName="transform"
                      begin="0s"
                      dur="1.5s"
                      type="translate"
                      from="0,0"
                      to="40,0"
                      repeatCount="indefinite"
                    />
                  </path>
                </pattern>
              </defs>
              {/* Background Text */}
              <text
                textAnchor="middle"
                x="50"
                y="15"
                fontSize="35"
                fill="white"
                fillOpacity="0.1"
              >
                {loadingPercentage}%
              </text>
              {/* Wave Effect Text */}
              <text
                textAnchor="middle"
                x="50"
                y="15"
                fontSize="35"
                fill="url(#wave)"
                fillOpacity="1"
              >
                {loadingPercentage}%
              </text>
            </svg>
          </div>
        </div>
        <div className={`${styles.scenePage} ${isLoaded ? styles.fadeIn : ""}`}>
          <Scene />
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
        <div className={styles.textWater}>
          "We have a choice: We can enhance life and come to know the universe
          that made us, or we can squander our 15 billion-year heritage in
          meaningless self-destruction." - Carl Sagan
        </div>
      </div>
    </div>
  );
}
