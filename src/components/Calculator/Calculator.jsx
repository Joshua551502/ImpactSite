import React from "react";
import styles from "./Calculator.module.css";
import Card from "../Card/Card";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";

export default function Calculator() {
  return (
    <div id="calculatorSection" className={styles.calculatorContainer}>
      <div className={styles.calculator}>
        <div className={styles.title}>
          <h1>Tools</h1>
          <img src="/medias/linkicon.png" alt="icon" role="button" />
        </div>

        <div className={styles.calculatorContent}>
          <div className={styles.calculate}>
            <div className={styles.calculateText}>CALCULATE</div>
            <div className={styles.calculateGrid}>
              <div className={styles.gridItem}>
                <div className={styles.itemTitle}>TRAVEL</div>
                <div className={styles.itemIcon}>✈️</div>
              </div>
              <div className={styles.gridItem}>
                <div className={styles.itemTitle}>PROPERTY</div>
                <div className={styles.itemIcon}>🏡</div>
              </div>
              <div className={styles.gridItem}>
                <div className={styles.itemTitle}>NUTRITION</div>
                <div className={styles.itemIcon}>🥘</div>
              </div>
              <div className={styles.gridItem}>
                <div className={styles.itemTitle}>PETS</div>
                <div className={styles.itemIcon}>🐴</div>
              </div>
              <div className={styles.gridItem}>
                <div className={styles.itemTitle}>SOFTWARE</div>
                <div className={styles.itemIcon}>🖥</div>
              </div>
              <div className={styles.gridItem}>
                <div className={styles.itemTitle}>business</div>
                <div className={styles.itemIcon}>💼</div>
              </div>
            </div>
            <div className={styles.calculateSelect}>
              Select a theme you would like to measure
            </div>
            <div className={styles.calculateButton}>
              <button className={styles.comingSoonButton}>COMING SOON</button>
            </div>
          </div>
          <div className={styles.result}>
            <div className={styles.circle}>
              <div className={styles.backCircle}>
                <div className={styles.frontCircle}>
                  <div className={styles.circleContent}>
                    <div className={styles.circleNumber}>900</div>
                    <div className={styles.circleValue}>tonnes CO2e</div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.estimate}>
              <div className={styles.estimateText}>Estimated Emissions</div>
              <div className={styles.recommended}>
                <div className={styles.recommendedFront}>
                  Recommended<span>$15,830.68</span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.offset}>
            <div className={styles.calculateText}>OFFSET</div>
            <div className={styles.offsetContent}>
              <Swiper
                modules={[Autoplay, EffectCoverflow]}
                effect="coverflow"
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={1.2}
                loop={true}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                coverflowEffect={{
                  rotate: 0,
                  stretch: 0,
                  depth: 100,
                  modifier: 2.5,
                  slideShadows: false,
                }}
                style={{
                  width: "100%",
                  height: "450px", // make sure this fits your card!
                  marginTop: "0px", // stick to top
                  paddingTop: "10px",
                  paddingBottom: "30px", // leave breathing room at bottom
                  boxSizing: "border-box",
                  overflow: "visible",
                }}
              >
                {[...Array(4)].map((_, index) => (
                  <SwiperSlide
                    key={index}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "start", // move card up
                      paddingTop: "0px",
                      paddingBottom: "0px",
                      boxSizing: "border-box",
                      overflow: "visible",
                    }}
                  >
                    <div style={{ maxHeight: "100%", maxWidth: "100%" }}>
                      <Card />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className={styles.calculateSelect}>
              We Recommend These Causes to Help
            </div>
            <div className={styles.calculateButton}>
              <button className={styles.comingSoonButton}>COMING SOON</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
