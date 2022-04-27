import React, { useState, useEffect, useRef } from "react";
import Nav from "../components/Nav";
import styles from "../styles/Admin.module.scss";
import Image from "next/image";
import axios from "axios";

const admin = () => {
  const [coverPhoto, setCoverPhoto] = useState();
  const [galleryImages, setGalleryImages] = useState();
  const [loading, setLoading] = useState(false);
  const coverInputRef = useRef();
  const coverSelectRef = useRef();
  const galleryInputRef = useRef();
  const galleryCaptionRef = useRef();

  const handleCoverUpdateClick = async () => {
    setLoading(true);
    const reader = new FileReader();
    reader.readAsDataURL(coverInputRef.current.files[0]);
    reader.onloadend = async () => {
      const { data } = await axios.post("http://localhost:3000/api/admin", {
        newImg: reader.result,
        cover: true,
        position: coverSelectRef.current.value,
      });
      setCoverPhoto(data.data);
      setLoading(false);
    };
  };

  const handleGalleryAdd = async () => {
    setLoading(true);
    const reader = new FileReader();
    reader.readAsDataURL(coverInputRef.current.files[0]);
    reader.onloadend = async () => {
      const { data } = await axios.post("http://localhost:3000/api/admin", {
        newImg: reader.result,
        cover: false,
        position: "center",
        caption: galleryCaptionRef.current.value,
      });
      setCoverPhoto(data.data);
      setLoading(false);
    };
  };

  useEffect(() => {
    const getCurrentData = async () => {
      const { data } = await axios.get("http://localhost:3000/api/admin");
      setCoverPhoto(data.data.cover);
      setGalleryImages(data.data.gallery);
    };
    getCurrentData();
  }, []);

  return (
    <div className={styles.container}>
      <Nav />

      <div className={styles.coverContainer}>
        {coverPhoto && (
          <div
            className={styles.coverImgContainer}
            style={{
              width: `${window.innerWidth / 2}px`,
              height: `${window.innerHeight / 2}px`,
            }}
          >
            <Image
              priority
              src={coverPhoto.url}
              layout="fill"
              objectFit="cover"
              objectPosition={coverPhoto.position}
            />
          </div>
        )}
        <div className={styles.form}>
          <h3>COVER PHOTO</h3>
          <span className={styles.formBox}>
            <label htmlFor="coverInput">Select new image</label>
            <input ref={coverInputRef} id="coverInput" type="file" />
          </span>
          <span id="coverPosition" className={styles.formBox}>
            <label htmlFor="coverPosition">Select image positioning</label>
            <select ref={coverSelectRef}>
              <option value="center">center</option>
              <option value="top">top</option>
              <option value="bottom">bottom</option>
              <option value="left">left</option>
              <option value="right">right</option>
              <option value="center">center</option>
            </select>
          </span>
          <button type="button" onClick={handleCoverUpdateClick}>
            Update
          </button>
        </div>
      </div>
      {loading === true && <p>loading...</p>}
      <div className={styles.galleryContainer}>
        <div className={styles.form}>
          <h3>GALLERY PHOTOS</h3>
          <span className={styles.formBox}>
            <label htmlFor="galleryInput">Select new image</label>
            <input ref={galleryInputRef} id="galleryInput" type="file" />
          </span>
          <span className={styles.formBox}>
            <label htmlFor="galleryCaption">Add a caption</label>
            <textarea
              id="galleryCaption"
              ref={galleryCaptionRef}
              rows={3}
              placeholder="Add a caption"
            />
          </span>
          <button type="button" onClick={handleCoverUpdateClick}>
            Add Image
          </button>
        </div>
      </div>
    </div>
  );
};

export default admin;
