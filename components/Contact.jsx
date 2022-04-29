import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import EmailIcon from "@mui/icons-material/Email";
import styles from "../styles/Contact.module.scss";

const Contact = () => {
  return (
    <div id="contact" className={styles.contactContainer}>
      <div className={styles.contactContent}>
        <h3>Introspective Images</h3>
        <h4>Photogropher in New Castle, PA</h4>
        <h4>
          <a className={styles.email} href="mailto: moondogwp20@aol.com">
            moondogwp20@aol.com
          </a>
        </h4>
        <div className={styles.iconContainer}>
          <a
            className={`${styles.icon} ${styles.emailIcon}`}
            href="mailto: moondogwp20@aol.com"
          >
            <EmailIcon fontSize="large" />
          </a>
          <a
            className={`${styles.icon} ${styles.facebookIcon}`}
            href="https://www.facebook.com/Moondogwp20/"
            target="_blank"
            rel="noreferrer"
          >
            <FacebookIcon fontSize="large" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
