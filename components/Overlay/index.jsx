import React from "react";
import { OverlayContainer, OverlayImage, CloseBox } from "./overlayStyles";
import Image from "next/image";
import { AiFillCloseCircle } from "react-icons/ai";

const Overlay = ({ img, click }) => {
  if (img === null) return;
  return (
    <OverlayContainer img={img}>
      <OverlayImage>
        <Image
          src={img.url}
          width={img.width}
          height={img.height}
          objectFit="contain"
        />
      </OverlayImage>
      <CloseBox onClick={() => click(null)}>
        <AiFillCloseCircle />
      </CloseBox>
    </OverlayContainer>
  );
};

export default Overlay;
