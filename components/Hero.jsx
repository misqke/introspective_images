import React from "react";
import Image from "next/image";
import styles from "../styles/Hero.module.scss";

const Hero = ({ cover }) => {
  return (
    <div className={styles.heroContainer}>
      <Image
        src={cover.url}
        layout="fill"
        objectFit="cover"
        objectPosition="bottom"
        quality={100}
      />
    </div>
  );
};

export default Hero;
