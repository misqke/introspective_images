import React from "react";
import Image from "next/image";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import styles from "../styles/Hero.module.scss";

const Hero = ({ cover }) => {
  return (
    <div className={styles.heroContainer}>
      <div className={styles.heroImg}>
        <Image
          src={cover.url}
          layout="fill"
          objectFit="cover"
          objectPosition="bottom"
          quality={100}
        />
      </div>
      <div className={styles.heroContent}>
        <div className={styles.heroContentImg}>
          <Image src={"/icon2.png"} width="300" height="300" />
        </div>
        <h1>INTROSPECTIVE IMAGES</h1>
      </div>
      <a href="#aboutContainer" className={styles.arrowBtn}>
        <ArrowDownwardIcon fontSize="large" className={styles.arrow} />
      </a>
    </div>
  );
};

export default Hero;
