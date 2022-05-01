import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import ChevronLeftSharpIcon from "@mui/icons-material/ChevronLeftSharp";
import ChevronRightSharpIcon from "@mui/icons-material/ChevronRightSharp";
import styles from "../../styles/GalleryBar.module.scss";

const GalleryBar = ({ imgs, tags }) => {
  const [currentImg, setCurrentImg] = useState(imgs[0]);
  const [prevImg, setPrevImg] = useState(imgs[0]);
  const [nextImg, setNextImg] = useState(imgs[0]);
  const [filter, setFilter] = useState("ALL");
  const [filteredImgs, setFilteredImgs] = useState(imgs);
  const currentRef = useRef();

  const handleArrowClick = (dir) => {
    if (dir === -1) {
      setCurrentImg(prevImg);
    } else if (dir === 1) {
      setCurrentImg(nextImg);
    }
    currentRef.current.classList.add(`${styles.animate}`);
    setTimeout(() => {
      currentRef.current.classList.remove(`${styles.animate}`);
    }, 400);
  };

  useEffect(() => {
    const index = filteredImgs.indexOf(currentImg);
    if (filteredImgs.length < 2) {
      setNextImg(filteredImgs[0]);
      setPrevImg(filteredImgs[0]);
    } else {
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
    }
  }, [currentImg, filteredImgs]);

  useEffect(() => {
    if (filter === "ALL") {
      setFilteredImgs(imgs);
      setCurrentImg(imgs[0]);
    } else {
      const newImgList = imgs.filter((img) =>
        img.tags.includes(filter.toLowerCase())
      );
      setFilteredImgs(newImgList);
      setCurrentImg(newImgList[0]);
    }
  }, [filter, imgs]);

  return (
    <div className={styles.galleryContainer} id="slideshow">
      <div className={styles.galleryTagsContainer}>
        <p
          className={`${styles.tag} ${filter === "ALL" && styles.active}`}
          onClick={(e) => setFilter(e.target.innerText)}
        >
          ALL
        </p>
        {tags.map((tag) => (
          <p
            key={tag}
            className={`${styles.tag} ${
              filter === tag.toUpperCase() && styles.active
            }`}
            onClick={(e) => setFilter(e.target.innerText)}
          >
            {tag.toUpperCase()}
          </p>
        ))}
      </div>
      <div className={styles.galleryImgBox}>
        <button
          type="button"
          onClick={() => handleArrowClick(-1)}
          className={`${styles.arrowBtn} ${styles.arrowLeft}`}
        >
          <ChevronLeftSharpIcon fontSize="large" className={styles.arrow} />
        </button>
        {imgs.length >= 1 && (
          <>
            <span className={`${styles.imgBox} ${styles.box1}`}>
              <Image
                src={prevImg.url}
                width={prevImg.width}
                height={prevImg.height}
                alt={prevImg.caption}
              />
            </span>
            <span className={`${styles.imgBox} ${styles.box2}`}>
              <Image
                src={currentImg.url}
                width={currentImg.width}
                height={currentImg.height}
                alt={currentImg.caption}
              />
              <div ref={currentRef} className={styles.overlay}></div>
            </span>
            <span className={`${styles.imgBox} ${styles.box3}`}>
              <Image
                src={nextImg.url}
                width={nextImg.width}
                height={nextImg.height}
                alt={nextImg.caption}
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
        <i className={styles.caption}>{currentImg.caption}</i>
      </div>
    </div>
  );
};

export default GalleryBar;
