"use client"; // Ensures dynamic execution
import Head from "next/head";

import Mission from "@/components/Mission/Mission";
import styles from "./page.module.css";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Footer from "@/components/Footer/Footer";
import GlobeInterface from "@/components/GlobeInterface/GlobeInterface";
import StoryPage from "@/components/StoryPage/StoryPage";

const Scene = dynamic(() => import("@/components/Scene"), { ssr: false });

export default function Home() {
  const [iframeLoaded, setIframeLoaded] = useState(false);

  return (
    <main className={styles.main}>
      <div className={styles.GlassPage}>
        <Scene />
      </div>
      <div className={styles.SpherePage}>
        {/* Embed the Slideshow as an Iframe */}
        <iframe
          key={iframeLoaded} // Forces a reload when iframeLoaded changes
          src="/slideshow.html"
          width="100%"
          height="470px"
          frameBorder="0"
          onLoad={() => setIframeLoaded(true)}
        ></iframe>
      </div>
      <div className={styles.StoryPage}>
        <StoryPage />
      </div>

      <div className={styles.Mission}>
        <Mission />
      </div>

      <div className={styles.GlobeContainer}>
        <GlobeInterface />
      </div>
      <div className={styles.Footer}>
        <Footer />
      </div>
    </main>
  );
}
