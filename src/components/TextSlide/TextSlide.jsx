"use client";
import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./TextSlide.module.css";

gsap.registerPlugin(ScrollTrigger);

const TEXT = [
  "Silky smooth animation is the hallmark of any library.",
  "Silky smooth animation?",
  "GSAP has you covered."
];

export default function TextSlide() {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const spans = gsap.utils.toArray("#texto1 span");

      gsap.timeline({
        scrollTrigger: {
          trigger: "#texto1",
          scrub: 0.3,
          start: "top 60%",
          end: "top 20%",
          // markers: true,
        }
      })
      .to(spans, {
        opacity: 1,
        duration: 1,
        ease: "none",
        stagger: 0.25
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className={styles.textSlideWrapper} ref={containerRef}>
      <div className={styles.wrap}>
        <div className={styles.wrapContainer}>
          <h3>Following text works as desired. Animated word by word</h3>
          <div id="texto1" className={styles.working}>
            {TEXT.map((line, lineIndex) => (
              <div key={lineIndex} className={styles.line}>
                {line.split(" ").map((word, wordIndex) => (
                  <div key={wordIndex} className={styles.wordWrapper}>
                    <span>{word}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div style={{ height: "200vh" }} /> {/* Ensures scroll trigger actually happens */}
        </div>
      </div>
    </div>
  );
}
