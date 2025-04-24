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
      end: () => `+=${window.innerHeight * 3}`, // enough scroll room
      pin: true,
      scrub: true,
      scroller,
      pinType: "fixed",
    });

    // Slide yellow up to 40px below red
    gsap.fromTo(
      yellow,
      { y: window.innerHeight }, // off screen
      {
        y: 100 + 40, // 40px below red's bottom (assuming red text starts ~100px down)
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: () => `+=${window.innerHeight}`,
          scrub: true,
          scroller,
        },
      }
    );

    // Slide green up to 40px below yellow
    gsap.fromTo(
      green,
      { y: window.innerHeight * 2 },
      {
        y: 100 + 90 * 2, // stacks 40px below yellow
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          start: () => `top top`,
          end: () => `+=${window.innerHeight * 2}`,
          scrub: true,
          scroller,
        },
      }
    );
  }, []);

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <section ref={redRef} className={styles.red}>
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
                  like tree routes that spans the planet -{" "}
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
              <img src="/medias/invest/web3.png" />
            </div>
          </div>
        </div>
      </section>
      <section ref={yellowRef} className={styles.yellow}>
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
              <img src="/medias/invest/invest.png" />
            </div>
          </div>
        </div>
      </section>
      <section ref={greenRef} className={styles.green}>
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
              <img src="/medias/invest/privacy.png" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Invest;
