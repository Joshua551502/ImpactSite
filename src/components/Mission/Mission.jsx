import React, { useEffect, useRef } from "react";
import styles from "./Mission.module.css";
import linkicon from "../../../public/medias/linkicon.png";

const rippleSettings = {
  maxSize: 250,
  animationSpeed: 2,
  strokeColor: [102, 255, 102], // Light blue water color
};

const canvasSettings = {
  blur: 12, // Slight blur to mimic water
  ratio: 0.5,
};

export default function Mission() {
  const canvasRef = useRef(null);
  const ripples = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const missionSection = document.getElementById("missionSection");
    const paragraph = document.querySelector(`.${styles.paragraph}`);

    const resizeCanvas = () => {
      canvas.width = missionSection.clientWidth * canvasSettings.ratio;
      canvas.height = missionSection.clientHeight * canvasSettings.ratio;
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
        this.opacity -= 0.02;
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

    paragraph.addEventListener("mousemove", handleMouseMove);

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

  return (
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
      <div className={styles.EarthText}>
        EARTH EXCHANGE & CLIMATE CREDIT IMPACT
      </div>
    </div>
  );
}
