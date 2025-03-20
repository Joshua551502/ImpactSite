"use client"; // Ensures dynamic execution
import Head from "next/head";
import dynamic from "next/dynamic";
import React, { useEffect, useRef, useState } from "react";
import Nav from "@/components/Nav/Nav";
import StoryPage from "@/components/StoryPage/StoryPage";
import Mission from "@/components/Mission/Mission";
import GlobeInterface from "@/components/GlobeInterface/GlobeInterface";
import Footer from "@/components/Footer/Footer";
import styles from "./page.module.css";




export default function Home() {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const smoothCursor = useRef({ x: 0, y: 0 });
  const cursorRef = useRef(null);
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) return;
  
      setScrollPercent((scrollY / maxScroll) * 100);
    };
  
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  


  useEffect(() => {
    const moveCursor = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    const handleHover = () => {
      cursorRef.current?.classList.add(styles.cursorHover);
    };

    const handleLeave = () => {
      cursorRef.current?.classList.remove(styles.cursorHover);
    };

    window.addEventListener("mousemove", moveCursor);

    // Attach event listeners to clickable elements
    const clickables = document.querySelectorAll("a, button, [role='button']");
    clickables.forEach((el) => {
      el.addEventListener("mouseenter", handleHover);
      el.addEventListener("mouseleave", handleLeave);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      clickables.forEach((el) => {
        el.removeEventListener("mouseenter", handleHover);
        el.removeEventListener("mouseleave", handleLeave);
      });
    };
  }, []);

  useEffect(() => {
    let animationFrameId;

    const smoothMove = () => {
      const cursorElement = cursorRef.current;
      if (!cursorElement) return;

      const cursorSize = cursorElement.offsetWidth;

      // Delay factor: Adjust the 0.05 to control the lag (lower = more delayed)
      const delayFactor = 0.04; // Small delay makes it trail behind naturally
      const distanceFactor = 1.3; // Makes it "cut corners" and move efficiently

      // Calculate difference in position
      const dx = cursorPos.x - smoothCursor.current.x;
      const dy = cursorPos.y - smoothCursor.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Apply easing effect with a mix of delay and efficiency
      smoothCursor.current.x +=
        dx * delayFactor * (distance > 50 ? distanceFactor : 1);
      smoothCursor.current.y +=
        dy * delayFactor * (distance > 50 ? distanceFactor : 1);

      // Apply transformation with the correct centering
      cursorElement.style.transform = `translate3d(${
        smoothCursor.current.x - cursorSize / 2
      }px, 
                                                    ${
                                                      smoothCursor.current.y -
                                                      cursorSize / 2
                                                    }px, 0)`;

      animationFrameId = requestAnimationFrame(smoothMove);
    };

    smoothMove();

    return () => cancelAnimationFrame(animationFrameId);
  }, [cursorPos]);

  return (
    <>
      <main className={styles.main}>
        {/* Custom Cursor */}
        <div ref={cursorRef} className={styles.cursor} />

        {/* Navigation */}
        <Nav scrollPercent={scrollPercent}/>

        {/* Main Content */}
        <StoryPage />
        <div className={styles.Mission}>
          <Mission />
        </div>

        <GlobeInterface />
        <div className={styles.Footer}>
          <Footer />
        </div>
      </main>
    </>
  );
}
