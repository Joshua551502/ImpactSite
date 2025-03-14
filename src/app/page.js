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
    <>
     <Head>
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.6.3/css/all.css"
          integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/"
          crossOrigin="anonymous"
        />
      </Head>
      
    <main className={styles.main}>
      <div className={styles.GlassPage}>
        <Scene />
      </div>
      <div className={styles.SpherePage}>
        <iframe
          key={iframeLoaded} // Forces a reload when iframeLoaded changes
          src="/slideshow.html"
          width="100%"
          height="470px"
          frameBorder="0"
          onLoad={() => setIframeLoaded(true)}
        ></iframe>
      </div>

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
