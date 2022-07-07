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
          layout="responsive"
          width={img.width}
          height={img.height}
        />
      </OverlayImage>
      <CloseBox onClick={() => click(null)}>
        <AiFillCloseCircle />
      </CloseBox>
    </OverlayContainer>
  );
};

export default Overlay;
