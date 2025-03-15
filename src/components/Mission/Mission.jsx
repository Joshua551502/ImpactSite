"use client"; // Ensure this runs on the client side in Next.js
import React, { useEffect, useRef } from "react";
import styles from "./Mission.module.css";
import linkicon from "../../../public/medias/linkicon.png";
import { useLayoutEffect } from "react";

const rippleSettings = {
  maxSize: 250,
  animationSpeed: 5,
  strokeColor: [102, 255, 102], 
};

const canvasSettings = {
  blur: 20, // Slight blur to mimic water
  ratio: 0.9,
};

export default function Mission() {
  const canvasRef = useRef(null);
  const ripples = useRef([]);
  const earthTextRef = useRef(null); // Reference for EarthText div

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const missionSection = document.getElementById("missionSection");
    const paragraph = document.querySelector(`.${styles.paragraph}`);

    const resizeCanvas = () => {
      canvas.width = missionSection.offsetWidth * canvasSettings.ratio;
      canvas.height = missionSection.offsetHeight * canvasSettings.ratio;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    canvas.style.filter = `blur(${canvasSettings.blur}px)`;

    class Ripple {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 0;
        this.opacity = 1;
      }

      update() {
        this.radius += rippleSettings.animationSpeed;
        this.opacity -= 0.04;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.strokeStyle = `rgba(${rippleSettings.strokeColor[0]},
            ${rippleSettings.strokeColor[1]},
            ${rippleSettings.strokeColor[2]},
            ${this.opacity})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    }

    const addRipple = (x, y) => {
      const rect = missionSection.getBoundingClientRect();
      const scaledX = (x - rect.left) * canvasSettings.ratio;
      const scaledY = (y - rect.top) * canvasSettings.ratio;
      ripples.current.unshift(new Ripple(scaledX, scaledY));
    };

    const handleMouseMove = (e) => addRipple(e.clientX, e.clientY);

    missionSection.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ripples.current.forEach((ripple, index) => {
        ripple.update();
        ripple.draw();

        if (ripple.opacity <= 0) {
          ripples.current.splice(index, 1);
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      paragraph.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      if (earthTextRef.current) {
        const newRight = `${Math.max(0, 700 - window.scrollY * 0.8)}px`;
        earthTextRef.current.style.right = newRight;

        console.log(`ScrollY: ${window.scrollY}, Right: ${newRight}`);
      }
    };

    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  

  return (
    <div id="missionSection" className={styles.missionContainer}>
      <div id="missionSection" className={styles.mission}>
        <canvas ref={canvasRef} className={styles.rippleCanvas}></canvas>
        <div className={styles.title}>
          <h1>Mission</h1>
          <img src="/medias/linkicon.png" alt="icon" />
        </div>
        <div className={styles.paragraph}>
          We’re on a mission to help put back what we have broken and support
          those who believe in the same vision.
        </div>
        <div className={styles.subParagraph}>
          An earth exchange centre for global impact causes and climate credits
          offsetting through carbon capture. <br />
          <br />
          The platform provides the climate ecosystem with enterprise-grade
          middleware, enabling high-integrity, interoperable, and efficient
          climate markets. <br />
          <br />
          The industry standard for on-chain democratized and decentralized
          climate data showing the transparent traceability.
        </div>
        <div className={styles.earthTextContainer}>
          <div ref={earthTextRef} className={styles.EarthText}>
            EARTH EXCHANGE & CLIMATE CREDIT IMPACT
          </div>
        </div>
      </div>
    </div>
  );
}
