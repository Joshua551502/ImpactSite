import React, { useState } from "react";
import { Carousel } from "@mantine/carousel";
import "@mantine/core/styles.css";
import styles from "./CausesSelected.module.css";

import bulletpoints from "@/assets/images/carousel-card/bulletpoints.png";
import firstImage from "@/assets/images/carousel-card/first-image.png";

import heart from "@/assets/images/carousel-card/heart.png";
import thirteen from "@/assets/images/carousel-card/carousel-card-sdgs/13.png";
import fourteen from "@/assets/images/carousel-card/carousel-card-sdgs/14.png";
import qrcode from "@/assets/images/carousel-card/qrcode.png";
import common from "@/assets/images/carousel-card/common.svg";
import auora from "@/assets/images/carousel-card/auora.svg";
import auorabg from "@/assets/images/carousel-card/aurora-bg.png";
import profilePicture from "@/assets/images/carousel-card/profilePicture.png";
export default function CauseSelected({ nextPage }) {
  const [activeSlide, setActiveSlide] = useState(0);

  const causes = [
    {
      title: "Indigenous Friends Association",
      timeLeft: "2 Months Left",
      funded: "0% Funded",
      description:
        "Bridge the digital divide for Indigenous communities. Join us in a meaningful investment with our IndigiTECH...",
      location: "Toronto, CA",
      raised: "$0 raised of $1,500",
      image: "/medias/cause-selected/first-image.png",
      rarity: "UNCOMMON", // Add rarity property
    },
    {
      title: "Ocean Cleanup Initiative",
      timeLeft: "1 Month Left",
      funded: "25% Funded",
      description:
        "Help us clean our oceans and protect marine life. Every contribution makes a difference!",
      location: "Vancouver, CA",
      raised: "$375 raised of $1,500",
      image: "/medias/cause-selected/first-image.png",
      rarity: "SPECIAL", // Mark as special
    },
    {
      title: "Youth Tech Empowerment",
      timeLeft: "3 Weeks Left",
      funded: "50% Funded",
      description:
        "Empowering youth with essential tech skills for a brighter future. Support our workshops today!",
      location: "Montreal, CA",
      raised: "$750 raised of $1,500",
      image: "/medias/cause-selected/first-image.png",
      rarity: "UNCOMMON",
    },
    {
      title: "Climate Action Now",
      timeLeft: "1 Week Left",
      funded: "80% Funded",
      description:
        "Join the fight against climate change. Your donation helps fund renewable energy projects.",
      location: "Calgary, CA",
      raised: "$1,200 raised of $1,500",
      image: "/medias/cause-selected/first-image.png",
      rarity: "SPECIAL",
    },
  ];

  return (
    <div className={styles.wheelPage2Container}>
      <div className={styles.wheelContainer}>
        <div className={styles.wheelBackground}>
          <div className={styles.wheelBorder}>
            <div className={styles.frontContent}></div>
          </div>
          <div className={styles.shape}></div>
          <div className={styles.shape2}></div>

          <div className={styles.wheelContent}>
            <div className={styles.wheelHeading}>CAUSES SELECTED</div>
            <div className={styles.gradientLine}></div>
            <div
              className={styles.gradientLine2}
              id={styles.gradientLineRight}
            ></div>
            <Carousel
              slideSize="65%"
              slideGap="xl"
              loop
              align="center"
              withControls={false}
              withIndicators={false}
              styles={{
                container: { height: "400px", width: "100%" },
                slide: {
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                },
              }}
              initialSlide={0}
              onSlideChange={setActiveSlide}
            >
              {causes.map((cause, index) => (
                <Carousel.Slide key={index}>
                  <div
                    className={styles.carouselCard}
                    style={{
                      marginLeft: "30px",
                      filter:
                        index === activeSlide
                          ? "brightness(100%)"
                          : "brightness(30%)",
                      transition: "filter 0.3s ease-in-out",
                      backgroundImage:
                        cause.rarity === "SPECIAL"
                          ? `linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.85)), url(${"/medias/carousel-card/aurora-bg.png"})`
                          : "linear-gradient(230deg, #66666680 0%, #00000080 100%)",

                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <div className={styles.cardBorder}>
                      <div className={styles.cardContent}>
                        <img
                          src={cause.image}
                          className={styles.cardImage}
                          alt={cause.title}
                        />
                        <div className={styles.cardInfo}>
                          <h1>
                            {cause.timeLeft} • {cause.funded}
                          </h1>
                          <h2>{cause.title}</h2>
                          <h3>{cause.description}</h3>
                          <h4>{cause.location}</h4>
                          <div className={styles.progressBar}></div>
                          <h5>{cause.raised}</h5>
                        </div>
                      </div>

                      <div className={styles.uncommon}>
                        {cause.rarity === "SPECIAL" ? "SPECIAL" : "UNCOMMON"}
                      </div>
                      <div className={styles.boxes}>
                        <img
                          src={
                            "/medias/carousel-card/carousel-card-sdgs/13.png"
                          }
                          alt="SDG 13"
                        />
                        <img
                          src={
                            "/medias/carousel-card/carousel-card-sdgs/14.png"
                          }
                          alt="SDG 14"
                        />
                        <img
                          src={"/medias/carousel-card/qrcode.png"}
                          alt="QR Code"
                          className={styles.qrcode}
                        />
                      </div>
                    </div>
                    <div className={styles.profilePicture}>
                      <img
                        src={"/medias/carousel-card/profilePicture.png"}
                        className={styles.profile}
                      />
                    </div>
                    <div className={styles.borderOfCard}>
                      <img
                        src={
                          cause.rarity === "SPECIAL"
                            ? "/medias/carousel-card/auora.svg"
                            : "/medias/carousel-card/common.svg"
                        }
                        className={styles.borderCard}
                        alt={
                          cause.rarity === "SPECIAL"
                            ? "Aurora Border"
                            : "Common Border"
                        }
                      />
                    </div>

                    {/* <div className={styles.cardbullet}>
                      <img
                        src={bulletpoints}
                        className={styles.bullet}
                        alt="Bullet Points"
                      />
                      <img src={heart} className={styles.heart} alt="Heart" />
                    </div> */}
                  </div>
                </Carousel.Slide>
              ))}
            </Carousel>
            <div className={styles.wheelSubheading}>
              Congratulations Your Support Matters!
            </div>
            <button className={styles.buttonSelect} onClick={nextPage}>
              CLICK TO DONATE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
