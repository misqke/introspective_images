import React from "react";
import Image from "next/image";
import styles from "../../styles/GalleryImage.module.scss";

const GalleryImage = ({ img }) => {
  return (
    <div className={styles.imgContainer}>
      <Image
        src={img.url}
        width={img.width}
        height={img.height}
        alt={img.caption}
      />
      <i>{img.caption}</i>
    </div>
  );
};

export default GalleryImage;
