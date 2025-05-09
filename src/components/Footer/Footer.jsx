import React from "react";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.innerFooter}>
        <div className={styles.signContact}>
          <div className={styles.signUp}>
            <h1>SIGN UP</h1>
            <div className={styles.form}>
              email:
              <input type="email" className={styles.formInput}></input>
              [Submit]
            </div>
          </div>
          <div className={styles.contactUs}>
            <h1>CONTACT US</h1>
            <div className={styles.contactForm}>
              <div className={styles.form} id={styles.contactFormInput}>
                Name:
                <input type="text" className={styles.formInput}></input>
              </div>
              <div className={styles.form} id={styles.contactFormInput}>
                Email:
                <input type="email" className={styles.formInput}></input>
              </div>
              <div className={styles.messageContainer}>
                <label className={styles.messageLabel}>Message:</label>
                <textarea className={styles.message}></textarea>
              </div>
              [Submit]
            </div>
          </div>
        </div>
        <div className={styles.webCopy}>
          <div className={styles.website}>
            <h1>WEBSITE</h1>
            <div className={styles.websiteLabels}>
              <div className={styles.labelText} role="button">
                MISSION
              </div>
              <div className={styles.labelText} role="button">
                LITEPAPER
              </div>
              <div className={styles.labelText} role="button">
                DOCUMENTATION
              </div>
              <div className={styles.labelText} role="button">
                INVEST
              </div>
              <div className={styles.labelText} role="button">
                MERCH
              </div>
              <div className={styles.labelText} role="button">
                FUNDAMENTALS
              </div>
              <div className={styles.labelText} role="button">
                WEB3
              </div>
              <div className={styles.labelText} role="button">
                DISCORD
              </div>
              <div className={styles.labelText} role="button">
                ECO-SYSTEM
              </div>
              <div className={styles.labelText} role="button">
                PRIVACY
              </div>
              <div className={styles.labelText} role="button">
                ACCOUNT
              </div>
              <div className={styles.labelText} role="button">
                GUIDELINES
              </div>
            </div>
          </div>
          <div className={styles.copyright}>
            Copyright © 2025 Impaction Foundation Inc. All rights reserved.
          </div>
        </div>

        {/* Social Media Icons with Proper CSS Modules */}
        {/* <ul className={styles.mediaIcons}>
          <li>
            <a href="#" className={styles.iconLink}>
              <i className={`fas fa-link ${styles.icon}`}></i>
            </a>
          </li>

          <li>
            <a href="#" className={styles.iconLink}>
              <i className={`fab fa-facebook-f ${styles.icon}`}></i>
            </a>
          </li>
          <li>
            <a href="#" className={styles.iconLink}>
              <i className={`fab fa-x-twitter ${styles.icon}`}></i>
            </a>
          </li>
          <li>
            <a href="#" className={styles.iconLink}>
              <i className={`fab fa-linkedin-in ${styles.icon}`}></i>
            </a>
          </li>
          <li>
            <a href="#" className={styles.iconLink}>
              <i className={`fas fa-share-alt ${styles.icon}`}></i>
            </a>
          </li>
        </ul> */}
      </div>
    </div>
  );
}
