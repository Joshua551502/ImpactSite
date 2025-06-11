"use client";
import React, { useEffect, useRef } from "react";
import styles from "./Invest.module.css";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Invest = () => {
  const wrapperRef = useRef(null);
  const redRef = useRef(null);
  const yellowRef = useRef(null);
  const greenRef = useRef(null);

  useEffect(() => {
    const scroller = document.querySelector("main");

    const red = redRef.current;
    const yellow = yellowRef.current;
    const green = greenRef.current;
    const wrapper = wrapperRef.current;

    // Pin the whole wrapper while animations happen
    ScrollTrigger.create({
      trigger: wrapper,
      start: "top top",
      end: () => `+=${window.innerHeight * 3}`,
      pin: true,
      scrub: true,
      scroller,
      pinType: "fixed",
      anticipatePin: 1, // <-- makes it react earlier to avoid the jump
      onUpdate: (self) => {
        // Forces update on wheel tick "snap-back"
        gsap.set(wrapper, { force3D: true });
      },
    });

    // Slide yellow up to 40px below red
    gsap.fromTo(
      yellow,
      { y: window.innerHeight },
      {
        y: 100 + 40,
        ease: "none",
        force3D: true,
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: () => `+=${window.innerHeight}`,
          scrub: true,
          scroller,
        },
      }
    );

    gsap.fromTo(
      green,
      { y: window.innerHeight * 2 },
      {
        y: 100 + 90 * 2,
        ease: "none",
        force3D: true,
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: () => `+=${window.innerHeight * 2}`,
          scrub: true,
          scroller,
        },
      }
    );
  }, []);
  useEffect(() => {
    let ticking = false;

    const handleWheel = (e) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          ScrollTrigger.refresh(); // Refresh to re-sync positions
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("wheel", handleWheel);
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);
  const investScrollTrigger = useRef(null);

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <section id="web3Section" ref={redRef} className={styles.red}>
        <div className={styles.item}>
          <div className={styles.topItem}>
            <div className={styles.topText}>WEB3</div>
            <img src="/medias/uprightarrow.png" />
          </div>
          <div className={styles.content}>
            <div className={`${styles.contentText} ${styles.leftToRight}`}>
              <div className={styles.bigText}>
                Technology isn’t a feature but another{" "}
                <span className={styles.gradientContainer}>
                  <span className={styles.topGradient}>invisible system</span>{" "}
                  like tree roots that spans the planet -{" "}
                  <span className={styles.topGradient}>a sixth sense.</span>
                </span>
              </div>

              <div className={styles.smallText}>
                Our platform is designed for suppliers of climate/carbon
                credits, whether you have one or many carbon projects you are
                involved in.
                <br /> <br />
                In the global voluntary carbon market, is a trusted solution for
                companies on their path to net-zero emissions.
              </div>
            </div>
            <div className={styles.contentImage} id={styles.img1}>
              <img src="/medias/Invest/web3.png" />
            </div>
          </div>
        </div>
      </section>
      <section id="investSection" ref={yellowRef} className={styles.yellow}>
        {" "}
        <div className={styles.item}>
          <div className={styles.topItem}>
            <div className={styles.topText}>Invest</div>
            <img src="/medias/uprightarrow.png" />
          </div>
          <div className={styles.content}>
            <div
              className={`${styles.contentText} ${styles.leftToRight} ${styles.reverse}`}
            >
              <div className={styles.bigText}>
                we have put together an{" "}
                <span className={styles.gradientContainer}>
                  <span className={styles.topGradient}>earth exchange</span> to
                  support sustainability and promote{" "}
                  <span className={styles.topGradient}>opacity offsetting</span>
                </span>
              </div>

              <div className={styles.smallText}>
                Our platform is designed for suppliers of climate/carbon
                credits, whether you have one or many carbon projects you are
                involved in.
                <br /> <br />
                In the global voluntary carbon market, is a trusted solution for
                companies on their path to net-zero emissions.
              </div>
            </div>
            <div className={styles.contentImage} id={styles.img2}>
              <img src="/medias/Invest/invest.png" />
            </div>
          </div>
        </div>
      </section>
      <section id="privacySection" ref={greenRef} className={styles.green}>
        {" "}
        <div className={styles.item}>
          <div className={styles.topItem}>
            <div className={styles.topText}>Privacy</div>
            <img src="/medias/uprightarrow.png" />
          </div>
          <div className={styles.content}>
            <div className={`${styles.contentText} ${styles.leftToRight}`}>
              <div className={styles.bigText}>
                we utilize the{" "}
                <span className={styles.gradientContainer}>
                  <span className={styles.topGradient}>blockchain</span> network
                  and <span className={styles.topGradient}>AI for good </span>{" "}
                  and support{" "}
                  <span className={styles.topGradient}>impact clarity </span>{" "}
                  for people, planet and prosperity…
                </span>
              </div>

              <div className={styles.smallText}>
                Our platform is designed for suppliers of climate/carbon
                credits, whether you have one or many carbon projects you are
                involved in.
                <br /> <br />
                In the global voluntary carbon market, is a trusted solution for
                companies on their path to net-zero emissions.
              </div>
            </div>
            <div className={styles.contentImage} id={styles.img3}>
              <img src="/medias/Invest/privacy.png" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Invest;
