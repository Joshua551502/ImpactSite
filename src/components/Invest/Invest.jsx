import React, { useState } from "react";
import styles from "./Invest.module.css";

export default function Invest() {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  return (
    <div className={styles.invest}>
      <div className={styles.options}>
        {/* WEB3 Section */}
        <div className={styles.optionContainer}>
          <div className={styles.option} onClick={() => toggleDropdown(0)}>
            <div className={styles.optionText}>WEB3</div>
            <div
              className={`${styles.arrow} ${
                openDropdown === 0 ? styles.arrowOpen : ""
              }`}
            >
              <img src="/medias/uprightarrow.png" alt="arrow" />
            </div>
          </div>
          {openDropdown === 0 && (
            <div className={styles.dropdownContent}>
              <div className={styles.impactText}>
                <div className={styles.blockChainText}>
                  Technology isn’t a feature but another{" "}
                  <span className={styles.gradientText}>invisible system</span>{" "}
                  like tree routes that spans the planet -{" "}
                  <span className={styles.gradientText}>a sixth sense.</span>
                </div>
                <div className={styles.safetypara}>
                  Our platform is designed for suppliers of climate/carbon
                  credits, whether you have one or many carbon projects you are
                  involved in.
                  <br />
                  <br /> In the global voluntary carbon market, is a trusted
                  solution for companies on their path to net-zero emissions.
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Invest Section */}
        <div className={styles.optionContainer}>
          <div className={styles.option} onClick={() => toggleDropdown(1)}>
            <div className={styles.optionText}>Invest</div>
            <div
              className={`${styles.arrow} ${
                openDropdown === 1 ? styles.arrowOpen : ""
              }`}
            >
              <img src="/medias/uprightarrow.png" alt="arrow" />
            </div>
          </div>
          {openDropdown === 1 && (
            <div className={styles.dropdownContent}>
              <div className={styles.impactText}>
                <div className={styles.safetypara}>
                  Our platform is designed for suppliers of carbon credits,
                  whether you have one or many carbon projects you are involved
                  in.
                  <br />
                  <br />
                  In the global voluntary carbon market, is a trusted solution
                  for companies on their path to net-zero emissions.
                </div>
                <div className={styles.blockChainText}>
                  we have put together an{" "}
                  <span className={styles.gradientText}>earth exchange</span> to
                  support sustainability and promote{" "}
                  <span className={styles.gradientText}>
                    opacity offsetting
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Safety Section */}
        <div className={styles.optionContainer}>
          <div className={styles.option} onClick={() => toggleDropdown(2)}>
            <div className={styles.optionText}>Safety</div>
            <div
              className={`${styles.arrow} ${
                openDropdown === 2 ? styles.arrowOpen : ""
              }`}
            >
              <img src="/medias/uprightarrow.png" alt="arrow" />
            </div>
          </div>
          {openDropdown === 2 && (
            <div className={styles.dropdownContent}>
              <div className={styles.impactText}>
                <div className={styles.blockChainText}>
                  we utilize the{" "}
                  <span className={styles.gradientText}>blockchain</span>{" "}
                  network and{" "}
                  <span className={styles.gradientText}>AI for good</span> and
                  support
                  <span className={styles.gradientText}>
                    {" "}
                    impact clarity
                  </span>{" "}
                  for people, planet and prosperity…
                </div>
                <div className={styles.safetypara} id={styles.safetyText}>
                  we’re about democratizing data and empowering users through
                  education and a magnetic experience.
                  <br />
                  <br /> To this point we use blockchain not to track
                  individuals or encroach on privacy but with consent to build
                  opacity for offsetting to further help build customer clarity
                  on this topic.
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
