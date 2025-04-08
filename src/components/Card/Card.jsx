// Card.jsx
import React from "react";
import styles from "../CardList/CardList.module.css";

export default function Card({ index = 0 }) {
  return (
    <div className={styles.page}>
      <div className={styles.cardInner}>
        {/* Front Side */}
        <div className={styles.front}>
          <img
            src="/medias/carousel-card/common.svg"
            className={styles.border}
            alt="Border"
          />
          <div className={styles.frontCard}>
            <div className={styles.image}>
              <img
                src="/medias/carousel-card/first-image.png"
                className={styles.cardImage}
                alt="Card"
              />
            </div>
            <div className={styles.cardContext}>
              <div className={styles.cardH1}>2 Months Left • 0% Funded</div>
              <div className={styles.cardH2}>
                Indigenous Friends Association
              </div>
              <div className={styles.cardH3}>
                Bridge the digital divide for Indigenous communities. Join us in
                a meaningful investment with our IndigiTECH ...
              </div>
              <div className={styles.cardH4}>Toronto, CA</div>
              <div className={styles.gradientBar}></div>
              <div className={styles.cardH5}>$0 raised of $1,500</div>
            </div>
            <div className={styles.profilePicture}>
              <img
                src="/medias/carousel-card/profilePicture.png"
                alt="Profile"
              />
            </div>
            <div className={styles.rarity}>UNCOMMON</div>
            <div className={styles.values}>
              <img
                src="/medias/carousel-card/carousel-card-sdgs/13.png"
                className={styles.unsdg}
                alt="SDG 13"
              />
              <img
                src="/medias/carousel-card/carousel-card-sdgs/14.png"
                className={styles.unsdg}
                alt="SDG 14"
              />
              <img
                src="/medias/carousel-card/qrcode.png"
                className={styles.qrcode}
                alt="QR Code"
              />
            </div>
          </div>
        </div>

        {/* Back Side */}
        <div className={styles.back}>
          <img
            src="/medias/carousel-card/common.svg"
            className={styles.border}
            alt="Border"
          />
          <div className={styles.rarity}>UNCOMMON</div>
          <div className={styles.values}>
            <img
              src="/medias/carousel-card/carousel-card-sdgs/13.png"
              className={styles.unsdg}
              alt="SDG 13"
            />
            <img
              src="/medias/carousel-card/carousel-card-sdgs/14.png"
              className={styles.unsdg}
              alt="SDG 14"
            />
            <img
              src="/medias/carousel-card/qrcode.png"
              className={styles.qrcode}
              alt="QR Code"
            />
          </div>
          <div className={styles.backCard}>
            <div className={styles.reciptDescription}>
              <div className={styles.reciptLeft}>
                <div className={styles.label}>Receipt issued:</div>
                <div className={styles.label}>Receipt Number:</div>
                <div className={styles.label}>Charity Number:</div>
              </div>
              <div className={styles.reciptRight}>
                <div className={styles.label}>20th DEC. 2025</div>
                <div className={styles.label}>
                  <span id={styles.number1}>(0000)</span>
                  <span id={styles.number2}>(000)</span>
                  <span id={styles.number3}>(00)</span>
                  <span id={styles.number4}>(00)</span>
                  <span id={styles.number5}>(00)</span>
                </div>
                <div className={styles.label}>795484286RR0001</div>
              </div>
            </div>
            <div className={styles.charityName}>
              Charity or qualified donee name: <br />
              <span>Indigenous Friends Association (IFA) 2021.</span>
            </div>
            <div className={styles.charityInfo}>
              Indigenous Friends Association
              <br />
              <span>
                Bridge the digital divide for Indigenous communities. Join us in
                a meaningful investment with our IndigiTECH ...
              </span>
            </div>
            <div className={styles.blurInfo}>
              <div className={styles.creditExtraContainer}>
                <div className={styles.creditCardBlur}>
                  <div className={styles.creditInfo}>
                    <div className={styles.creditInfoDetails}>
                      Credit Card Number <br></br>
                      <div className={styles.cardNumber}>
                        2T1 231 41232 14123 123 144 112
                      </div>
                    </div>
                  </div>

                  <div className={styles.creditExtra}>
                    <div className={styles.creditExtraLeft}>
                      <div className={styles.label}>Request by:</div>
                      <div className={styles.label}>Receipt Number:</div>
                      <div className={styles.label}>Name of gift:</div>
                    </div>
                    <div className={styles.creditExtraRight}>
                      <div className={styles.label}>John. Doe. R</div>
                      <div className={styles.label}>13323 12</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>{" "}
            <div className={styles.cardContext} id={styles.cardCont}>
              <div className={styles.cardH4}>Toronto,CA</div>
              <div className={styles.gradientBar}></div>
              <div className={styles.cardH5}>$0 raised of $1,500</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
