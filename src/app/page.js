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

const Scene = dynamic(() => import("@/components/Scene"), { ssr: false });

export default function Home() {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const smoothCursor = useRef({ x: 0, y: 0 });
  const cursorRef = useRef(null);

  useEffect(() => {
    const moveCursor = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  useEffect(() => {
    let animationFrameId;
    const smoothMove = () => {
      // Smooth movement interpolation
      smoothCursor.current.x += (cursorPos.x - smoothCursor.current.x) * 0.1;
      smoothCursor.current.y += (cursorPos.y - smoothCursor.current.y) * 0.1;

      cursorRef.current?.style.setProperty(
        "transform",
        `translate3d(${smoothCursor.current.x - 10}px, 
                      ${smoothCursor.current.y - 10}px, 0)`
      );

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
        <Nav />

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
