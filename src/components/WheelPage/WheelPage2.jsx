import React, { useState } from "react";
import { Wheel } from "react-custom-roulette";
import dynamic from "next/dynamic";

const Confetti = dynamic(() => import("react-confetti"), { ssr: false });
import styles from "./WheelPage2.module.css";
import ungloablcompact from "@/assets/images/spin-wheel/worldPicture.png";

// SDG Images
import nopoverty from "@/assets/images/spin-wheel-sdg-icons/SDG.png";
import zerohunger from "@/assets/images/spin-wheel-sdg-icons/SDG-1.png";
import goodhealth from "@/assets/images/spin-wheel-sdg-icons/SDG-2.png";
import qualityeducation from "@/assets/images/spin-wheel-sdg-icons/SDG-3.png";
import genderequality from "@/assets/images/spin-wheel-sdg-icons/SDG-4.png";
import cleanwater from "@/assets/images/spin-wheel-sdg-icons/SDG-5.png";
import affordableenergy from "@/assets/images/spin-wheel-sdg-icons/SDG-6.png";
import decentwork from "@/assets/images/spin-wheel-sdg-icons/SDG-7.png";
import innovation from "@/assets/images/spin-wheel-sdg-icons/SDG-8.png";
import reducedinequality from "@/assets/images/spin-wheel-sdg-icons/SDG-9.png";
import sustainablecities from "@/assets/images/spin-wheel-sdg-icons/SDG-10.png";
import responsibleconsumption from "@/assets/images/spin-wheel-sdg-icons/SDG-11.png";
import climateaction from "@/assets/images/spin-wheel-sdg-icons/SDG-12.png";
import lifebelowwater from "@/assets/images/spin-wheel-sdg-icons/SDG-13.png";
import lifeonland from "@/assets/images/spin-wheel-sdg-icons/SDG-14.png";
import peacejustice from "@/assets/images/spin-wheel-sdg-icons/SDG-15.png";
import partnerships from "@/assets/images/spin-wheel-sdg-icons/SDG-16.png";

import one from "@/assets/images/sdg-results/1.png";
import two from "@/assets/images/sdg-results/2.png";
import three from "@/assets/images/sdg-results/3.png";
import four from "@/assets/images/sdg-results/4.png";
import five from "@/assets/images/sdg-results/5.png";
import six from "@/assets/images/sdg-results/6.png";
import seven from "@/assets/images/sdg-results/7.png";
import eight from "@/assets/images/sdg-results/8.png";
import nine from "@/assets/images/sdg-results/9.png";
import ten from "@/assets/images/sdg-results/10.png";
import eleven from "@/assets/images/sdg-results/11.png";
import twelve from "@/assets/images/sdg-results/12.png";
import thirteen from "@/assets/images/sdg-results/13.png";
import fourteen from "@/assets/images/sdg-results/14.png";
import fifteen from "@/assets/images/sdg-results/15.png";
import sixteen from "@/assets/images/sdg-results/16.png";
import seventeen from "@/assets/images/sdg-results/17.png";

export default function WheelPage2({ nextPage }) {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedImage, setSelectedImage] = useState(null); // For displaying the corresponding image
  const [showConfetti, setShowConfetti] = useState(false);

  const imageMapping = {
    "No Poverty": "/medias/sdg-results/1.png",
    "Zero Hunger": "/medias/sdg-results/2.png",
    "Good Health": "/medias/sdg-results/3.png",
    "Quality Education": "/medias/sdg-results/4.png",
    "Gender Equality": "/medias/sdg-results/5.png",
    "Clean Water": "/medias/sdg-results/6.png",
    "Affordable Energy": "/medias/sdg-results/7.png",
    "Decent Work": "/medias/sdg-results/8.png",
    Innovation: "/medias/sdg-results/9.png",
    "Reduced Inequalities": "/medias/sdg-results/10.png",
    "Sustainable Cities": "/medias/sdg-results/11.png",
    "Responsible Consumption": "/medias/sdg-results/12.png",
    "Climate Action": "/medias/sdg-results/13.png",
    "Life Below Water": "/medias/sdg-results/14.png",
    "Life on Land": "/medias/sdg-results/15.png",
    "Peace and Justice": "/medias/sdg-results/16.png",
    Partnerships: "/medias/sdg-results/17.png",
  };

  const [data, setData] = useState([
    {
      option: "No Poverty",
      image: {
        uri: "/medias/spin-wheel-sdg-icons/SDG.png",
        sizeMultiplier: 0.5,
      },
      style: { backgroundColor: "#000000", borderRadius: "12px" },
    },
    {
      option: "Zero Hunger",
      image: {
        uri: "/medias/spin-wheel-sdg-icons/SDG-1.png",
        sizeMultiplier: 0.5,
      },
      style: { backgroundColor: "#000000", borderRadius: "12px" },
    },
    {
      option: "Good Health",
      image: {
        uri: "/medias/spin-wheel-sdg-icons/SDG-2.png",
        sizeMultiplier: 0.5,
      },
      style: { backgroundColor: "#000000", borderRadius: "12px" },
    },
    {
      option: "Quality Education",
      image: {
        uri: "/medias/spin-wheel-sdg-icons/SDG-3.png",
        sizeMultiplier: 0.5,
      },
      style: { backgroundColor: "#000000", borderRadius: "12px" },
    },
    {
      option: "Gender Equality",
      image: {
        uri: "/medias/spin-wheel-sdg-icons/SDG-4.png",
        sizeMultiplier: 0.5,
      },
      style: { backgroundColor: "#000000", borderRadius: "12px" },
    },
    {
      option: "Clean Water",
      image: {
        uri: "/medias/spin-wheel-sdg-icons/SDG-5.png",
        sizeMultiplier: 0.5,
      },
      style: { backgroundColor: "#000000" },
    },
    {
      option: "Affordable Energy",
      image: {
        uri: "/medias/spin-wheel-sdg-icons/SDG-6.png",
        sizeMultiplier: 0.5,
      },
      style: { backgroundColor: "#000000" },
    },
    {
      option: "Decent Work",
      image: {
        uri: "/medias/spin-wheel-sdg-icons/SDG-7.png",
        sizeMultiplier: 0.5,
      },
      style: { backgroundColor: "#000000" },
    },
    {
      option: "Innovation",
      image: {
        uri: "/medias/spin-wheel-sdg-icons/SDG-8.png",
        sizeMultiplier: 0.5,
      },
      style: { backgroundColor: "#000000" },
    },
    {
      option: "Reduced Inequalities",
      image: {
        uri: "/medias/spin-wheel-sdg-icons/SDG-9.png",
        sizeMultiplier: 0.5,
      },
      style: { backgroundColor: "#000000" },
    },
    {
      option: "Sustainable Cities",
      image: {
        uri: "/medias/spin-wheel-sdg-icons/SDG-10.png",
        sizeMultiplier: 0.5,
      },
      style: { backgroundColor: "#000000" },
    },
    {
      option: "Responsible Consumption",
      image: {
        uri: "/medias/spin-wheel-sdg-icons/SDG-11.png",
        sizeMultiplier: 0.5,
      },
      style: { backgroundColor: "#000000" },
    },
    {
      option: "Climate Action",
      image: {
        uri: "/medias/spin-wheel-sdg-icons/SDG-12.png",
        sizeMultiplier: 0.5,
      },
      style: { backgroundColor: "#000000" },
    },
    {
      option: "Life Below Water",
      image: {
        uri: "/medias/spin-wheel-sdg-icons/SDG-13.png",
        sizeMultiplier: 0.5,
      },
      style: { backgroundColor: "#000000" },
    },
    {
      option: "Life on Land",
      image: {
        uri: "/medias/spin-wheel-sdg-icons/SDG-14.png",
        sizeMultiplier: 0.5,
      },
      style: { backgroundColor: "#000000" },
    },
    {
      option: "Peace and Justice",
      image: {
        uri: "/medias/spin-wheel-sdg-icons/SDG-15.png",
        sizeMultiplier: 0.5,
      },
      style: { backgroundColor: "#000000" },
    },
    {
      option: "Partnerships",
      image: {
        uri: "/medias/spin-wheel-sdg-icons/SDG-16.png",
        sizeMultiplier: 0.5,
      },
      style: { backgroundColor: "#000000" },
    },
  ]);

  const handleSpinClick = () => {
    if (!mustSpin) {
      setShowConfetti(false);
      setSelectedImage(null); // Clear the previous image
      setSelectedOption(""); // Clear the previous option

      // Reset all segment colors to black
      const resetData = data.map((item) => ({
        ...item,
        style: { ...item.style, backgroundColor: "#000000" },
      }));
      setData(resetData);

      const newPrizeNumber = Math.floor(Math.random() * data.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
    }
  };

  const handleStopSpin = () => {
    setMustSpin(false);
    const landedOption = data[prizeNumber].option; // Get the landed option directly
    setSelectedOption(landedOption);
    setSelectedImage(imageMapping[landedOption]); // Use landedOption to get the image
    setShowConfetti(true);

    // Update the background color of the landed segment
    const updatedData = data.map((item, index) => {
      if (index === prizeNumber) {
        return {
          ...item,
          style: { ...item.style, backgroundColor: "#313131" },
        };
      }
      return item;
    });

    setData(updatedData);

    setTimeout(() => {
      setShowConfetti(false);
    }, 3000);
  };

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
            <div className={styles.wheelHeading}>SPIN FOR GOOD</div>
            <div className={styles.spinWheel}>
              <div className={styles.wheel}>
                <Wheel
                  mustStartSpinning={mustSpin}
                  prizeNumber={prizeNumber}
                  data={data}
                  radiusLineWidth={4}
                  radiusLineColor="#313131"
                  outerBorderColor="#313131"
                  outerBorderWidth={4}
                  innerRadius={55}
                  textDistance={90}
                  fontSize={10}
                  onStopSpinning={handleStopSpin}
                  style={{ transform: "rotate(90deg)" }}
                  pointerProps={{
                    style: { display: "none" },
                  }}
                />
              </div>

              <div className={styles.wheelCenter}>
                <img
                  src={"/medias/spin-wheel/worldPicture.png"}
                  alt="UN Global Compact"
                  className={styles.unglobalCompact}
                />
              </div>
              <div className={styles.wheelItem}>
                {selectedImage && (
                  <img
                    src={selectedImage}
                    alt={selectedOption}
                    className={styles.resultImage}
                  />
                )}
              </div>
            </div>
            <div className={styles.wheelSubheading}>
              Which Causes Can
              <br />
              You Help Today?
            </div>
            {selectedOption && (
              <div className={styles.selectedOption}>
                {/* <h2>{selectedOption}</h2> */}
              </div>
            )}
            {!selectedOption ? (
              <button onClick={handleSpinClick} className={styles.buttonSelect}>
                CLICK TO SELECT
              </button>
            ) : (
              <button onClick={nextPage} className={styles.buttonSelect}>
                NEXT
              </button>
            )}

            {showConfetti && (
              <Confetti colors={["#0FBF89", "#4289BF", "#1F4059"]} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
