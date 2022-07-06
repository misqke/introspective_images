import React from "react";
import { Container, ImageBox } from "./heroStyles";
import Image from "next/image";

const Hero = () => {
  return (
    <Container>
      <ImageBox>
        <Image
          src={"/logo.png"}
          width={2447}
          height={1713}
          objectFit="contain"
        />
      </ImageBox>
    </Container>
  );
};

export default Hero;
