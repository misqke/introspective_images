import React, { useState, useEffect } from "react";
import Image from "next/image";
import ChevronLeftSharpIcon from "@mui/icons-material/ChevronLeftSharp";
import ChevronRightSharpIcon from "@mui/icons-material/ChevronRightSharp";
import styles from "../../styles/Gallery.module.scss";

const Gallery = ({ imgs }) => {
  const [currentImg, setCurrentImg] = useState(imgs[0]);
  const [prevImg, setPrevImg] = useState(imgs[0]);
  const [nextImg, setNextImg] = useState(imgs[1]);
  const [filter, setFilter] = useState("all");
  const [filteredImgs, setFilteredImgs] = useState(imgs);

  const handleArrowClick = (dir) => {
    const index = filteredImgs.indexOf(currentImg);
    if (dir === -1) {
      setCurrentImg(prevImg);
    } else if (dir === 1) {
      setCurrentImg(nextImg);
    }
  };

  useEffect(() => {
    const index = filteredImgs.indexOf(currentImg);
    if (index === 0) {
      setPrevImg(filteredImgs[filteredImgs.length - 1]);
      setNextImg(filteredImgs[1]);
    } else if (index === filteredImgs.length - 1) {
      setPrevImg(filteredImgs[index - 1]);
      setNextImg(filteredImgs[0]);
    } else {
      setNextImg(filteredImgs[index + 1]);
      setPrevImg(filteredImgs[index - 1]);
    }
  }, [currentImg, filteredImgs]);

  useEffect(() => {
    if (filter === "all") {
      setFilteredImgs(imgs);
    } else {
      const newImgList = imgs.filter((img) => img.tags.includes(filter));
      setFilteredImgs(newImgList);
    }
  }, [filter]);

  return (
    <div className={styles.galleryContainer}>
      <div className={styles.galleryImgBox}>
        <button
          type="button"
          onClick={() => handleArrowClick(-1)}
          className={`${styles.arrowBtn} ${styles.arrowLeft}`}
        >
          <ChevronLeftSharpIcon fontSize="large" className={styles.arrow} />
        </button>
        {imgs && (
          <>
            <span className={`${styles.imgBox} ${styles.box1}`}>
              <Image
                src={prevImg.url}
                width={prevImg.width}
                height={prevImg.height}
              />
            </span>
            <span className={`${styles.imgBox} ${styles.box2}`}>
              <Image
                src={currentImg.url}
                width={currentImg.width}
                height={currentImg.height}
              />
            </span>
            <span className={`${styles.imgBox} ${styles.box3}`}>
              <Image
                src={nextImg.url}
                width={nextImg.width}
                height={nextImg.height}
              />
            </span>
          </>
        )}
        <button
          type="button"
          onClick={() => handleArrowClick(1)}
          className={`${styles.arrowBtn} ${styles.arrowRight}`}
        >
          <ChevronRightSharpIcon fontSize="large" className={styles.arrow} />
        </button>
        {currentImg.caption && (
          <i className={styles.caption}>{currentImg.caption}</i>
        )}
      </div>
    </div>
  );
};

export default Gallery;