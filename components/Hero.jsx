import React from "react";
import Image from "next/image";
import styles from "../styles/Hero.module.scss";

const Hero = () => {
  return (
    <div className={styles.heroContainer}>
      <Image
        src={"/cover.jpg"}
        layout="fill"
        objectFit="cover"
        objectPosition="bottom"
      />
    </div>
  );
};

export default Hero;
