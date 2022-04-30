import React from "react";
import Image from "next/image";
import styles from "../../styles/GalleryImage.module.scss";
import Router from "next/router";

const GalleryImage = ({ img }) => {
  const handleClick = (img) => {
    Router.push(`/images/${img._id}`);
  };

  return (
    <div className={styles.imgContainer} onClick={() => handleClick(img)}>
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
