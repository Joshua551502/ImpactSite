import React, { useEffect, useState } from "react";
import styles from "./GlobeInterface.module.css";
import CardList from "../CardList/CardList";
import Monitor from "../Monitor/Monitor";

export default function GlobeInterface() {
  const [daysTill2030, setDaysTill2030] = useState(0);
  const [countdown, setCountdown] = useState("00.00.00.00");
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isMonitorOpen, setIsMonitorOpen] = useState(false);
  const [isMonitorPanelOpen, setIsMonitorPanelOpen] = useState(false);

  const toggleMonitorPanel = () => {
    setIsMonitorPanelOpen((prev) => !prev);
  };

  const toggleMonitor = () => {
    setIsMonitorOpen((prev) => !prev);
  };

  useEffect(() => {
    const targetDate = new Date("January 1, 2030 00:00:00").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const timeLeft = targetDate - now;

      if (timeLeft <= 0) {
        setDaysTill2030(0);
        setCountdown("00.00.00.00");
        return;
      }

      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

      setDaysTill2030(days);
      setCountdown(
        `${String(hours).padStart(2, "0")}.${String(minutes).padStart(
          2,
          "0"
        )}.${String(seconds).padStart(2, "0")}`
      );
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className={styles.globeInterfaceContainer}>
      <div className={styles.GlobeInterface}>
        <div className={styles.topNav}>
          <button className={styles.navButton} onClick={toggleMonitor}>
            <img src="/medias/globe-interface/button.svg" alt="Monitor" />
            <div className={styles.buttonText}>MARKET</div>
          </button>
        </div>
        <div className={styles.rightNav}>
          <button className={styles.navButton}>
            <img src="/medias/globe-interface/button.svg" alt="Info" />
            <div className={styles.buttonText}>INFO</div>
          </button>
        </div>
        <div className={styles.bottomNav}>
          <button className={styles.navButton}>
            <img src="/medias/globe-interface/button.svg" alt="Market" />
            <div className={styles.buttonText} id={styles.buttonTextBottom}>
              MONITOR
            </div>
          </button>
        </div>
        <div className={styles.leftNav}>
          <button className={styles.navButton}>
            <img src="/medias/globe-interface/button.svg" alt="Trading" />
            <div className={styles.buttonText}>TRADING</div>
          </button>
        </div>
        <div
          className={`${styles.monitorPanel} ${
            isMonitorOpen ? styles.open : ""
          }`}
        >
          <div className={styles.monitorContent}>
            <div className={styles.missionTitle}>MISSION MARKET</div>
            <div className={styles.missionLine}></div>
            <div className={styles.missionFilters}>
              <button>Clear</button>
              <button>Search</button>
              <button>UNSDG Impact</button>
              <button>Location</button>
              <button>Price</button>
              <button>Date</button>
            </div>

            <div className={styles.featuredCause}>Featured Cause Campaigns</div>

            <div className={styles.causeCampaigns}>
              <CardList />
            </div>
          </div>
        </div>

        <div className={styles.bottomNav}>
          <button className={styles.navButton} onClick={toggleMonitorPanel}>
            <img src="/medias/globe-interface/button.svg" alt="Monitor" />
            <div className={styles.buttonText} id={styles.buttonTextBottom}>
              MONITOR
            </div>
          </button>
        </div>

        {/* NEW Monitor Sliding Panel */}
        <div
          className={`${styles.monitorSlidePanel} ${
            isMonitorPanelOpen ? styles.open : ""
          }`}
        >
          <div className={styles.monitorContentContainer}>
            <Monitor/>
          </div>
        </div>

        <div className={styles.mapContainer}>
          <iframe
            width="104%"
            height="1170px"
            frameBorder="0"
            className={isModalOpen ? styles.dimmed : ""}
            title="Map"
            src="https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v12.html?title=true&access_token=pk.eyJ1IjoiZXhhbXBsZXMiLCJhIjoiY2xxeTBib3pyMGsxcTJpbXQ3bmo4YXU0ZiJ9.wvqlBMQSxTHgvAh6l9OXXw#2.16/6.48/69.82"
          ></iframe>
          <div className={styles.countDown}>
            <div className={styles.daysTill}>{daysTill2030} DAYS TILL 2030</div>
            <div className={styles.numberValues}>{countdown}</div>
          </div>
          <div className={styles.creditsIssued}>
            <div className={styles.circleDot}>
              <div className={styles.bigCircle}>
                <div className={styles.bigCircleText}>
                  <div className={styles.bigCircleTopText}>
                    5.7<span> BILLION</span>
                  </div>
                  <div className={styles.bigCircleBottomText}>
                    CREDITS ISSUED
                    <span className={styles.tooltipContainer}>
                      ⓘ
                      <span className={styles.tooltipText}>
                        Total number of credits issued.
                      </span>
                    </span>
                  </div>
                </div>
              </div>
              <div className={styles.smallContainer} id={styles.corp}>
                <div className={styles.smallCircle}>
                  <div className={styles.smallCircleValue}>
                    3.3 <span>B</span>
                  </div>
                </div>
                <div className={styles.smallCircledescription}>
                  CORPORATIONS
                  <span className={styles.tooltipContainer}>
                    ⓘ
                    <span className={styles.tooltipText}>
                      Credits issued by corporations.
                    </span>
                  </span>
                </div>
              </div>
              <div className={styles.smallContainer} id={styles.phil}>
                <div className={styles.smallCircle}>
                  <div className={styles.smallCircleValue}>
                    3.3 <span>B</span>
                  </div>
                </div>
                <div className={styles.smallCircledescription}>
                  VOLUNTARY
                  <span className={styles.tooltipContainer}>
                    ⓘ
                    <span className={styles.tooltipText}>
                      Credits donated through philanthropy.
                    </span>
                  </span>
                </div>
              </div>
              <div className={styles.smallContainer} id={styles.gov}>
                <div className={styles.smallCircle}>
                  <div className={styles.smallCircleValue}>
                    450 <span>M</span>
                  </div>
                </div>
                <div className={styles.smallCircledescription}>
                  GOVERNMENTS
                  <span className={styles.tooltipContainer}>
                    ⓘ
                    <span className={styles.tooltipText}>
                      Credits issued by government bodies.
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.globaltemp}>
            <div className={styles.behindMeter}>
              <div className={styles.fillBar} id={styles.fill1}></div>
              <div className={styles.fillBar} id={styles.fill2}></div>
              <div className={styles.fillBar} id={styles.fill3}></div>
              <div className={styles.fillBar} id={styles.fill4}></div>
              <div className={styles.fillBar} id={styles.fill5}></div>
            </div>
            <div className={styles.meter}>
              <div className={styles.bar}></div>
              <div className={styles.bar}></div>
              <div className={styles.bar}></div>
              <div className={styles.bar}></div>
              <div className={styles.bar}></div>
            </div>
            <div className={styles.meterValues}>
              <div className={styles.meterNumber}>30</div>
              <div className={styles.meterNumber}>40</div>
              <div className={styles.meterNumber}>50</div>
            </div>
            <div className={styles.meterBox}>
              <div className={styles.meterBoxText}>
                <div className={styles.meterBoxTopText}>
                  73% <span>YEAR OVER YEAR DECLINE</span>
                </div>
                <div className={styles.meterBoxBottomText}>
                  ANIMALS & PLANTS EXTINCT{" "}
                  <span className={styles.tooltipContainer}>
                    ⓘ
                    <span className={styles.tooltipText}>
                      Plants and animals gone extinct.
                    </span>
                  </span>
                </div>
              </div>
            </div>
            <div className={styles.meterBox}>
              <div className={styles.meterBoxText}>
                <div className={styles.meterBoxTopText}>+1.5°C</div>
                <div className={styles.meterBoxBottomText}>
                  GLOBAL AVERAGE TEMP{" "}
                  <span className={styles.tooltipContainer}>
                    ⓘ
                    <span className={styles.tooltipText}>
                      Global temperature average.
                    </span>
                  </span>
                </div>
              </div>
            </div>
            <div className={styles.meterBox}>
              <div className={styles.meterBoxText}>
                <div className={styles.meterBoxTopText}>+103 MM</div>
                <div className={styles.meterBoxBottomText}>
                  SEA LEVEL SINCE 1993{" "}
                  <span className={styles.tooltipContainer}>
                    ⓘ
                    <span className={styles.tooltipText}>
                      Sea level throughout time.
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.contrib}>
            <div className={styles.contribText}>
              Recent Countries Contributions
            </div>
            <div className={styles.listItem}>
              <div clasName={styles.date}>3/1/2025</div>
              <div clasName={styles.listIcon}>
                <div className={styles.iconShape}>
                  <img src="/medias/globe-interface/image1.png" />
                </div>
              </div>
              <div clasName={styles.amountT}>16 t</div>
            </div>
            <div className={styles.listItem}>
              <div clasName={styles.date}>3/1/2025</div>
              <div clasName={styles.listIcon}>
                <div className={styles.iconShape}>
                  <img src="/medias/globe-interface/image2.png" />
                </div>
              </div>
              <div clasName={styles.amountT}>14 t</div>
            </div>
            <div className={styles.listItem}>
              <div clasName={styles.date}>3/1/2025</div>
              <div clasName={styles.listIcon}>
                <div className={styles.iconShape}>
                  <img src="/medias/globe-interface/image3.png" />
                </div>
              </div>
              <div clasName={styles.amountT}>14 t</div>
            </div>
            <div className={styles.listItem}>
              <div clasName={styles.date}>3/1/2025</div>
              <div clasName={styles.listIcon}>
                <div className={styles.iconShape}>
                  <img src="/medias/globe-interface/image4.png" />
                </div>
              </div>
              <div clasName={styles.amountT}>11 t</div>
            </div>
            <div className={styles.listItem}>
              <div clasName={styles.date}>3/1/2025</div>
              <div clasName={styles.listIcon}>
                <div className={styles.iconShape}>
                  <img src="/medias/globe-interface/image5.png" />
                </div>
              </div>
              <div clasName={styles.amountT}>10 t</div>
            </div>

            <div className={styles.viewAll}>View All 47</div>
          </div>
          {isModalOpen && (
            <div className={styles.warningModal}>
              <h3>ABOUT</h3>
              <p>
                Our platform aggregates high value impact credits and carbon
                markets into one place, and democratizes the sustainable economy
                between charity causes, corporate engagement, and philanthropic
                giving.
              </p>
              <div className={styles.cookieOptions}>
                <span>Accept Basic Cookies</span>
                <div className={styles.buttons}>
                  <button onClick={closeModal}>YES</button>
                  <div
                    className={styles.xButton}
                    onClick={closeModal}
                    role="button"
                  ></div>
                  <button onClick={closeModal}>NO</button>
                </div>
              </div>
            </div>
          )}
          <div className={styles.card}>
            <img
              src="/medias/carousel-card/common.svg"
              className={styles.border}
            ></img>
            <div className={styles.content}>
              <img
                src="/medias/carousel-card/first-image.png"
                className={styles.cardImage}
              />
              <div className={styles.rarity}>UNCOMMON</div>
              <div className={styles.values}>
                <img
                  src="/medias/carousel-card/carousel-card-sdgs/13.png"
                  className={styles.unsdg}
                />
                <img
                  src="/medias/carousel-card/carousel-card-sdgs/14.png"
                  className={styles.unsdg}
                />
                <img
                  src="/medias/carousel-card/qrcode.png"
                  className={styles.qrcode}
                />
              </div>
              <div className={styles.cardContext}>
                <div className={styles.cardH1}>2 Months Left • 0% Funded</div>
                <div className={styles.cardH2}>
                  Indigenous Friends Association
                </div>
                <div className={styles.cardH3}>
                  Bridge the digital divide for Indigenous communities. Join us
                  in a meaningful investment with our IndigiTECH ...
                </div>
                <div className={styles.cardH4}>Toronto,CA</div>
                <div className={styles.gradientBar}></div>
                <div className={styles.cardH5}>$0 raised of $1,500</div>
              </div>
              <div className={styles.profilePicture}>
                <img src="/medias/carousel-card/profilePicture.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
