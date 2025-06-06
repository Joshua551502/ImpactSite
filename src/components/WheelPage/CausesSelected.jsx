import React, { useEffect, useCallback, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import styles from "./CausesSelected.module.css";
import Autoplay from "embla-carousel-autoplay";
export default function CauseSelected({ nextPage }) {
const [emblaRef, emblaApi] = useEmblaCarousel(
  { loop: true, align: "center" },
  [Autoplay({ delay: 3000, stopOnInteraction: false })] // 👈 3s delay, keep playing after interaction
);

  const [selectedIndex, setSelectedIndex] = useState(0);

  const causes = [
    {
      title: "Indigenous Friends Association",
      timeLeft: "2 Months Left",
      funded: "0% Funded",
      description: "Bridge the digital divide for Indigenous communities...",
      location: "Toronto, CA",
      raised: "$0 raised of $1,500",
      image: "/medias/cause-selected/first-image.png",
      rarity: "UNCOMMON",
    },
    {
      title: "Ocean Cleanup Initiative",
      timeLeft: "1 Month Left",
      funded: "25% Funded",
      description: "Help us clean our oceans and protect marine life...",
      location: "Vancouver, CA",
      raised: "$375 raised of $1,500",
      image: "/medias/cause-selected/first-image.png",
      rarity: "SPECIAL",
    },
    {
      title: "Youth Tech Empowerment",
      timeLeft: "3 Weeks Left",
      funded: "50% Funded",
      description: "Empowering youth with essential tech skills...",
      location: "Montreal, CA",
      raised: "$750 raised of $1,500",
      image: "/medias/cause-selected/first-image.png",
      rarity: "UNCOMMON",
    },
    {
      title: "Climate Action Now",
      timeLeft: "1 Week Left",
      funded: "80% Funded",
      description: "Join the fight against climate change...",
      location: "Calgary, CA",
      raised: "$1,200 raised of $1,500",
      image: "/medias/cause-selected/first-image.png",
      rarity: "SPECIAL",
    },
  ];

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

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

            <div className={styles.embla} ref={emblaRef}>
              <div className={styles.emblaContainer}>
                {causes.map((cause, index) => (
                  <div
                    className={`${styles.emblaSlide} ${
                      index === selectedIndex ? styles.active : ""
                    }`}
                    key={index}
                    style={{
                      backgroundImage:
                        cause.rarity === "SPECIAL"
                          ? `linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.85)), url(/medias/carousel-card/aurora-bg.png)`
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

                      <div className={styles.uncommon}>{cause.rarity}</div>
                      <div className={styles.boxes}>
                        <img
                          src="/medias/carousel-card/carousel-card-sdgs/13.png"
                          alt="SDG 13"
                        />
                        <img
                          src="/medias/carousel-card/carousel-card-sdgs/14.png"
                          alt="SDG 14"
                        />
                        <img
                          src="/medias/carousel-card/qrcode.png"
                          alt="QR Code"
                          className={styles.qrcode}
                        />
                      </div>
                    </div>

                    <div className={styles.profilePicture}>
                      <img
                        src="/medias/carousel-card/profilePicture.png"
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
                        alt={cause.rarity}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

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
