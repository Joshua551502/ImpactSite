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
import TextSlide from "@/components/TextSlide/TextSlide";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import OkayModal from "@/components/OkayModal/OkayModal";
import Intro from "@/components/Intro/Intro";
import Invest from "@/components/Invest/Invest";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const smoothCursor = useRef({ x: 0, y: 0 });
  const cursorRef = useRef(null);
  const [scrollPercent, setScrollPercent] = useState(0);
  const [showModal, setShowModal] = useState(true);
  const mainRef = useRef(null);
  const maxScrollbarTrackHeight = 150 - 20; // container height - thumb height
  const scrollbarRef = useRef(null); // ✅ separate from cursorRef
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const main = mainRef.current;
    if (!main) return;

    const handleScroll = () => {
      const scrollTop = main.scrollTop;
      const maxScroll = main.scrollHeight - main.clientHeight;

      setScrollY(scrollTop);
      setScrollPercent((scrollTop / maxScroll) * 100);
    };

    main.addEventListener("scroll", handleScroll);
    return () => main.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollbarPosition = `${
    (scrollPercent / 100) * maxScrollbarTrackHeight
  }px`;

  const handleCloseModal = () => {
    setShowModal(false);
  };
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

    // ✅ Use 'pointermove' on document instead of 'mousemove' on window
    document.addEventListener("pointermove", moveCursor);

    // Attach hover events to clickables
    const clickables = document.querySelectorAll("a, button, [role='button']");
    clickables.forEach((el) => {
      el.addEventListener("mouseenter", handleHover);
      el.addEventListener("mouseleave", handleLeave);
    });

    return () => {
      document.removeEventListener("pointermove", moveCursor);
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

  useEffect(() => {
    const main = mainRef.current;
    if (!main) return;

    const handleScroll = () => {
      const scrollY = main.scrollTop;
      const maxScroll = main.scrollHeight - main.clientHeight;
      if (maxScroll <= 0) return;

      setScrollPercent((scrollY / maxScroll) * 100);
    };

    main.addEventListener("scroll", handleScroll);
    return () => main.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    const scrollbar = scrollbarRef.current;
    const main = mainRef.current;
    if (!scrollbar || !main) return;

    let isDragging = false;
    let startY = 0;
    let startScroll = 0;

    const handleMouseDown = (e) => {
      const rect = scrollbar.getBoundingClientRect();
      if (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      ) {
        isDragging = true;
        startY = e.clientY;
        startScroll = main.scrollTop;
        e.preventDefault(); // Prevent text selection
      }
    };

    const handleMouseMove = (e) => {
      if (!isDragging) return;

      const deltaY = e.clientY - startY;
      const maxScroll = main.scrollHeight - main.clientHeight;
      const scrollAmount = (deltaY / maxScrollbarTrackHeight) * maxScroll;

      main.scrollTop = startScroll + scrollAmount;
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <>
      <div className={styles.blendWrapper}>
        <main className={styles.main} ref={mainRef}>
          {/* Custom Cursor */}
          <div ref={cursorRef} className={styles.cursor} />
          <div className={styles.scrollEffect}>
            <div
              ref={scrollbarRef}
              className={styles.scrollbar}
              style={{
                top: scrollbarPosition,
              }}
            />

            <div className={styles.scrollBarLine} />
          </div>
          {/* Navigation */}
          <Nav scrollPercent={scrollPercent} />

          {/* Main Content */}

          {showModal && <OkayModal onClose={handleCloseModal} />}
          <StoryPage scrollY={scrollY} />

          <div className={styles.Mission}>
            <Mission />
          </div>

          <GlobeInterface />

          <Invest />
          <div className={styles.Footer}>
            <Footer />
          </div>
        </main>
      </div>
    </>
  );
}
