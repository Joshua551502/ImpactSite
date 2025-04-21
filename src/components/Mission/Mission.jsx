"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Mission.module.css";
import FluidSimulation from "fluid-simulation-react";
gsap.registerPlugin(ScrollTrigger);

export default function Mission() {
  const containerRef = useRef(null);
  const earthTextRef = useRef(null);
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

  const words =
    "We’re on a mission to help put back what we have broken and support those who believe in the same vision.".split(
      " "
    );

  return (
    <div id="missionSection" className={styles.missionContainer}>
     
         
      <div className={styles.mission}>
     

        <div className={styles.title}>
          <h1>Mission</h1>
          <img src="/medias/linkicon.png" alt="icon" role="button" />
        </div>

        <div
          style={{
            backgroundColor: "black",
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
