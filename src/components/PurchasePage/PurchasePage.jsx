import React from "react";
import { useState } from "react";

import styles from "./PurchasePage.module.css";
import { X } from "lucide-react"; // Optional: use an icon if you're using lucide or similar
import Card from "../Card/Card";

export default function PurchasePage({ onClose }) {
  const [openDropdowns, setOpenDropdowns] = useState({
    location: true,
    sdg: true,
    impact: true,
    org: true,
    address: true,
  });
  

  const toggleDropdown = (key) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className={styles.purchasePage}>
      <div className={styles.title}>
        <div className={styles.titleText}>
          Impact Projects & Climate Credits
        </div>
        <div className={styles.uprightArrow} onClick={onClose}>
          {" "}
         x
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.cardInfo}>
          <Card />
          <div className={styles.mapSection}>
            <div className={styles.map}>
              <img src="/medias/map-image.png" />
            </div>
          </div>
        </div>
        <div className={styles.stats}>
          {/* 1. Guatemala */}
          <div className={styles.dropdown}>
            <div
              className={styles.dropdownTitle}
              onClick={() => toggleDropdown("location")}
            >
              <div className={styles.dropdownText}>
                Guatemala, Latin America
              </div>
              <div className={styles.dropdownButton}>
                {openDropdowns["location"] ? "-" : "+"}
              </div>
            </div>
            {openDropdowns["location"] && (
              <div className={styles.dropdownContent}>
                <div className={styles.dropTitle}>
                  <div className={styles.dropDownText}>
                    Indigenous Friends
                    <br />
                    Association
                  </div>
                  <div className={styles.loveText}>LOVE</div>
                </div>
                <div className={styles.contentDropdown}>
                  <div className={styles.description}>
                    Bridge the digital divide for Indigenous <br /> communities.
                    Join us in a meaningful <br />
                    investment with our IndigiTECH ...
                  </div>
                  <div className={styles.tags}>
                    <br />
                    Tags
                  </div>
                  <div className={styles.gradientBar}>
                    <div className={styles.gradientTitle}>
                      {" "}
                      <br />
                      Toronto,CA
                    </div>
                    <div className={styles.gradientLine}></div>
                    <div className={styles.gradientfunds}>
                      $0 raised of $18,500
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 2. SDGs */}
          <div className={styles.dropdown}>
            <div
              className={styles.dropdownTitle}
              onClick={() => toggleDropdown("sdg")}
            >
              <div className={styles.dropdownText}>
                Sustainable Development Goals
              </div>
              <div className={styles.dropdownButton}>
                {openDropdowns["sdg"] ? "-" : "+"}
              </div>
            </div>
            {openDropdowns["sdg"] && (
              <div className={styles.dropdownContent}>
                <div className={styles.unsdgContainer}>
                  <div className={styles.unsdg}>
                    <div className={styles.unsdgImage}>
                      <img src="/medias/carousel-card/carousel-card-sdgs/13.png" />
                    </div>
                    <div className={styles.unsdgText}>
                      <div className={styles.unsdgTextTop}>CLIMATE ACTION</div>
                      <div className={styles.unsdgTextBottom}>
                        1.1: Take urgent action to combat climate change and its
                        impacts
                      </div>
                    </div>
                  </div>
                  <div className={styles.unsdg}>
                    <div className={styles.unsdgImage}>
                      <img src="/medias/carousel-card/carousel-card-sdgs/14.png" />
                    </div>
                    <div className={styles.unsdgText}>
                      <div className={styles.unsdgTextTop}>
                        INDUSTRY, INNOVATION AND INFRASTRUCTURE
                      </div>
                      <div className={styles.unsdgTextBottom}>
                        1.1: Build resilient infrastructure, promote inclusive
                        and sustainable industrialization and foster innovation
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 3. Co-benefits */}
          <div className={styles.dropdown}>
            <div
              className={styles.dropdownTitle}
              onClick={() => toggleDropdown("impact")}
            >
              <div className={styles.dropdownText}>Impact Co-Benefits</div>
              <div className={styles.dropdownButton}>
                {openDropdowns["impact"] ? "-" : "+"}
              </div>
            </div>
            {openDropdowns["impact"] && (
              <div className={styles.dropdownContent}>
                <div className={styles.specialContainer}>
                  <div className={styles.unsdg} id={styles.specialUNSDG}>
                    <div className={styles.unsdgImage}>
                    <img src="/medias/PurchasePage/eyeicon.png" />
                    </div>
                    <div className={styles.unsdgText}>
                      <div className={styles.unsdgTextTop}>Environmental</div>
                      <div
                        className={styles.unsdgTextBottom}
                        id={styles.specialBottom}
                      >
                        Air
                      </div>
                    </div>
                  </div>
                  <div className={styles.unsdg} id={styles.specialUNSDG}>
                    <div className={styles.unsdgImage}>
                    <img src="/medias/PurchasePage/peopleicon.png" />
                    </div>
                    <div className={styles.unsdgText}>
                      <div className={styles.unsdgTextTop}>Social</div>
                      <div
                        className={styles.unsdgTextBottom}
                        id={styles.specialBottom}
                      >
                        Health & Safety
                        <br />
                        Jobs
                        <br />
                        Welfare
                      </div>
                    </div>
                  </div>
                  <div className={styles.unsdg} id={styles.specialUNSDG}>
                    <div className={styles.unsdgImage}>
                      <img src="/medias/PurchasePage/treeicon.png" />
                    </div>
                    <div className={styles.unsdgText}>
                      <div className={styles.unsdgTextTop}>Economic</div>
                      <div
                        className={styles.unsdgTextBottom}
                        id={styles.specialBottom}
                      >
                        Air
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 4. Org */}
          <div className={styles.dropdown}>
            <div
              className={styles.dropdownTitle}
              onClick={() => toggleDropdown("org")}
            >
              <div className={styles.dropdownText}>Project Organization</div>
              <div className={styles.dropdownButton}>
                {openDropdowns["org"] ? "-" : "+"}
              </div>
            </div>
            {openDropdowns["org"] && (
              <div className={styles.dropdownContent}>
                <div className={styles.organizationText}>Song Giang</div>
                <div className={styles.organizationText}>Hydropower Joint</div>
                <div className={styles.organizationText}>Stock Company</div>
              </div>
            )}
          </div>

          {/* 5. Address */}
          <div className={styles.dropdown}>
            <div
              className={styles.dropdownTitle}
              onClick={() => toggleDropdown("address")}
            >
              <div className={styles.dropdownText}>Project Address</div>
              <div className={styles.dropdownButton}>
                {openDropdowns["address"] ? "-" : "+"}
              </div>
            </div>
            {openDropdowns["address"] && (
              <div className={styles.dropdownContent}>
                <div className={styles.organizationText}>Song Giang</div>
                <div className={styles.organizationText}>Hydropower Joint</div>
                <div className={styles.organizationText}>Stock Company</div>
                <div className={styles.organizationText}>VNPT building, 50</div>
                <div className={styles.organizationText}>
                  Le Thanh Ton street, Loc Tho ward, Nha Trang{" "}
                </div>
                <div className={styles.organizationText}>
                  city, Khanh Hoa province, Vietnam,
                </div>
                <div className={styles.organizationText}>650000 Nha Trang,</div>
                <div className={styles.organizationText}>Khanh Hoa Vietnam</div>
              </div>
            )}
          </div>
        </div>

        <div className={styles.qrcode}>
          <div className={styles.logo}>
            <img src="/medias/rainbow.png" />
          </div>
          <div className={styles.qrcodeImg}>
            <img src="/medias/carousel-card/qrcode.png" />
          </div>
        </div>
        <div className={styles.payment}>
          <div className={styles.screen}>
            <div className={styles.LeftRightValue}>
              <div className={styles.leftValue}>Pricing</div>
              <div className={styles.rightValue}>
                $1.80<span className={styles.greyText}>/tCO2e</span>
              </div>
            </div>
            <br />
            <div className={styles.LeftRightValue}>
              <div className={styles.leftValue}>Vintage</div>
              <div className={styles.rightValue}>2019</div>
            </div>
            <div className={styles.greyLine} />
            <div className={styles.LeftRightValue}>
              <div className={styles.leftValue}>Amount ⓘ</div>
              <div className={styles.rightValue}>10,000</div>
            </div>
            <div className={styles.greyLine} />
            <br />
            <div className={styles.LeftRightValue}>
              <div className={styles.leftValue}>Available Stock</div>
              <div className={styles.rightValue}>70,000</div>
            </div>
            <br />
            <div className={styles.LeftRightValue}>
              <div className={styles.leftValue}>Minimum Purchases</div>
              <div className={styles.rightValue}>10,000</div>
            </div>
            <br />
            <br />
            <br />
            <br />

            <div className={styles.LeftRightValue}>
              <div className={styles.leftValue}>Discount</div>
              <div className={styles.rightValue}>
                <span className={styles.greentext}>-$2,206.65</span>
              </div>
            </div>
            <br />
            <div className={styles.LeftRightValue}>
              <div className={styles.leftValue}>Transaction Fee</div>
              <div className={styles.rightValue}>$0.30</div>
            </div>
            <br />
            <div className={styles.LeftRightValue}>
              <div className={styles.leftValue}>VAT</div>
              <div className={styles.rightValue}>$0.00</div>
            </div>
            <br />
            <div className={styles.LeftRightValue}>
              <div className={styles.leftValue}>Total</div>
              <div className={styles.rightValue}>$15,830.68</div>
            </div>
            <br />
            <div className={styles.screenButtons}>
              <div className={styles.greenButton}>
                <div className={styles.LeftRightButton}>
                  <div className={styles.leftButtonText}>Buy Now</div>
                  <div className={styles.rightButtonText}>
                    <span className={styles.smallStyle}>$</span> 15,830.68
                  </div>
                </div>
              </div>
              <div className={styles.greenButton}>
                <div className={styles.backgroundButton}></div>
                <div className={styles.LeftRightButton}>
                  <div className={styles.leftButtonText}>Add to Cart</div>
                  <div className={styles.rightButtonText}>+</div>
                </div>
              </div>
              <div className={styles.greenButton}>
                <div className={styles.backgroundButton}></div>
                <div className={styles.LeftRightButton}>
                  <div className={styles.leftButtonText}>Make an offer</div>
                  <div className={styles.rightButtonText}>+</div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.infoTab}>
            <div className={styles.infoItem}>
              <div className={styles.infoBox}>60K</div>
              <div className={styles.infoText}>
                The equivalent of <br /> planting these trees
              </div>
            </div>
            <div className={styles.infoItem}>
              {" "}
              <div className={styles.infoBox}>7293</div>
              <div className={styles.infoText}>
                The equivalent of <br />
                removing these cars
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
        </div>
      </div>
    </div>
  );
}
