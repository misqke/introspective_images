import React from "react";
import Image from "next/image";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import styles from "../styles/Hero.module.scss";

const Hero = ({ cover }) => {
  if (!cover) {
    return <div></div>;
  }
  return (
    <div className={styles.heroContainer}>
      <div className={styles.heroImg}>
        <Image
          src={cover.url}
          layout="fill"
          objectFit="cover"
          objectPosition="bottom"
          quality={100}
          alt=""
        />
      </div>
      <div className={styles.heroContent}>
        <Image src={"/logo.png"} width="3196" height="2238" alt="logo" />
      </div>
      <a href="#about" className={styles.arrowBtn}>
        <ArrowDownwardIcon fontSize="large" className={styles.arrow} />
      </a>
    </div>
  );
};

export default Hero;
