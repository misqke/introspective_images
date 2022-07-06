import React from "react";
import { ImageBox, HeroContainer } from "./heroStyles";
import Image from "next/image";

const Hero = () => {
  return (
    <HeroContainer>
      <ImageBox>
        <Image
          src={"/logo.png"}
          width={2447}
          height={1713}
          objectFit="contain"
        />
      </ImageBox>
    </HeroContainer>
  );
};

export default Hero;
