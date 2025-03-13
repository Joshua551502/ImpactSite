import React, { useEffect, useRef, useState } from "react";
import styles from "./StoryPage.module.css";

export default function StoryPage() {
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
      for (let i = 1; i < vertexes.length; i++) {
        ctx.lineTo(vertexes[i].x, vertexes[i].y);
      }
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

  return (
    <div className={styles.storyPageContainer}>
      <div className={styles.storyPage}>
        <div className={styles.border}>
          <div className={styles.navContainer}>
            <div className={styles.navWrapper}>
              <div className={styles.navBar}>
                <div className={styles.sunMoonContainer}>
                  <div className={styles.sun}></div>
                  <div className={styles.moon}></div>
                </div>
                <div className={styles.countDown}>
                  <div className={styles.daysTill}>
                    {daysTill2030} DAYS TILL 2030
                  </div>
                  <div className={styles.numberValues}>{countdown}</div>
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
            <div ref={cursorRef} className={styles.customCursor} />
          </div>
          <div className={styles.liquidEffect}>
            <canvas ref={canvasRef} className={styles.canvas}></canvas>
          </div>
          <div className={styles.waterText}>
            <div className={styles.textWater}>
              "We have a choice: We can enhance life and come to know the
              universe that made us, or we can squander our 15 billion-year
              heritage in meaningless self-destruction." - Carl Sagan
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
