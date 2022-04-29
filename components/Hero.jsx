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
        <Image src={"/logoColumn.png"} width="2501" height="1676" alt="logo" />
      </div>
      <a href="#aboutContainer" className={styles.arrowBtn}>
        <ArrowDownwardIcon fontSize="large" className={styles.arrow} />
      </a>
    </div>
  );
};

export default Hero;
