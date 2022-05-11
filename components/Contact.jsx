import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import EmailIcon from "@mui/icons-material/Email";
import InstagramIcon from "@mui/icons-material/Instagram";
import styles from "../styles/Contact.module.scss";

const Contact = ({ email }) => {
  return (
    <div id="contact" className={styles.contactContainer}>
      <div className={styles.contactContent}>
        <h3>Introspective Images</h3>
        <h4>Photogropher in New Castle, PA</h4>
        <h4>
          <a className={styles.email} href={`mailto: ${email}`}>
            {email}
          </a>
        </h4>
        <div className={styles.iconContainer}>
          <a
            className={`${styles.icon} ${styles.emailIcon}`}
            href={`mailto: ${email}`}
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
          <a
            className={`${styles.icon} ${styles.instagramIcon}`}
            href="https://www.instagram.com/Introspective.images/"
            target="_blank"
            rel="noreferrer"
          >
            <InstagramIcon fontSize="large" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
