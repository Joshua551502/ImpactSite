import React from "react";
import styles from "./Footer.module.css";


export default function Footer() {
  return (
    <div className={styles.footer}>
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
            <div className={styles.form } id={styles.contactFormInput}>
              Name:
              <input type="email" className={styles.formInput}></input>
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
            <div className={styles.labelText}>MISSION</div>
            <div className={styles.labelText}>LITEPAPER</div>
            <div className={styles.labelText}>DOCUMENTATION</div>
            <div className={styles.labelText}>INVEST</div>
            <div className={styles.labelText}>MERCH</div>
            <div className={styles.labelText}>FUNDAMENTALS</div>
            <div className={styles.labelText}>WEB3</div>
            <div className={styles.labelText}>DISCORD</div>
            <div className={styles.labelText}>ECO-SYSTEM</div>
            <div className={styles.labelText}>PRIVACY</div>
            <div className={styles.labelText}>ACCOUNT</div>
            <div className={styles.labelText}>GUIDELINES</div>
          </div>
        </div>
        <div className={styles.copyright}>
          Copyright © 2025 Impaction Foundation Inc. All rights reserved.
        </div>
      </div>
      <div className={styles.mediaIcons}>
        <img src="/medias/shareicon.png"/>
        <img src="/medias/facebook.png"/>
        <img src="/medias/twitter.png"/>
        <img src="/medias/linkedin.png"/>
        <img src="/medias/share2.png"/>
      </div>
    </div>
  );
}
