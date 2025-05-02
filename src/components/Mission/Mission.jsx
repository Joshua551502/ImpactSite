"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Mission.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function Mission() {
  const containerRef = useRef(null);
  const earthTextRef = useRef(null);
  const canvasRef = useRef(null);
  const ripples = useRef([]);

  const paragraphRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  // 🔥 Fluid simulation effect

  // 🌍 Earth text scroll animation
  useEffect(() => {
    const mainElement = document.querySelector("main");

    const handleScroll = () => {
      if (!earthTextRef.current) return;
      const scrollY = mainElement.scrollTop;
      const moveAmount = -scrollY * 0.45;
      earthTextRef.current.style.left = `${moveAmount}px`;
    };

    mainElement.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      mainElement.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // ✨ GSAP staggered fade for mission text
  useEffect(() => {
    const spans = containerRef.current.querySelectorAll("span");

    requestAnimationFrame(() => {
      ScrollTrigger.refresh();

      gsap
        .timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%",
            end: "top 20%",
            scrub: 0.3,
            scroller: document.querySelector("main"),
          },
        })
        .to(spans, {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          ease: "none",
        });
    });

    return () => ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }, []);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const missionSection = document.getElementById("missionSection");

    const resizeCanvas = () => {
      canvas.width = missionSection.offsetWidth;
      canvas.height = missionSection.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    canvas.style.filter = `blur(20px)`;

    class Ripple {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 0;
        this.opacity = 1;
      }

      update() {
        this.radius += 5;
        this.opacity -= 0.04;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.strokeStyle = `rgba(102, 255, 102, ${this.opacity})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    }

    const addRipple = (x, y) => {
      const rect = missionSection.getBoundingClientRect();
      const scaledX = x - rect.left;
      const scaledY = y - rect.top;
      ripples.current.unshift(new Ripple(scaledX, scaledY));
    };

    const handleMouseMove = (e) => addRipple(e.clientX, e.clientY);
    missionSection.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ripples.current.forEach((ripple, index) => {
        ripple.update();
        ripple.draw();
        if (ripple.opacity <= 0) ripples.current.splice(index, 1);
      });
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      missionSection.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const words =
    "We’re on a mission to help put back what we have broken and support those who believe in the same vision.".split(
      " "
    );

  return (
    <div id="missionSection" className={styles.missionContainer}>
      <div className={styles.mission}>
        <canvas ref={canvasRef} className={styles.rippleCanvas}></canvas>

        <div className={styles.title}>
          <h1>Mission</h1>
          <img src="/medias/linkicon.png" alt="icon" role="button" />
        </div>

        <div
          style={{
            backgroundColor: "transparent",
            color: "white",
            fontFamily: "'Playfair Display', serif",
          }}
        >
          <div
            id={styles.missionText}
            ref={containerRef}
            style={{
              fontWeight: "bold",
              lineHeight: "1.5",
            }}
          >
            {words.map((word, i) => (
              <span
                key={i}
                style={{
                  opacity: 0,
                  transform: "translateY(20px)",
                  display: "inline-block",
                  marginRight: "15px",
                  transition: "opacity 0.3s ease, transform 0.3s ease",
                }}
              >
                {word}
              </span>
            ))}
          </div>
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
