import React from "react";
import styles from "../styles/About.module.scss";

const About = ({ about }) => {
  return (
    <div id="about" className={styles.aboutContainer}>
      <h3>{about}</h3>
    </div>
  );
};

export default About;
