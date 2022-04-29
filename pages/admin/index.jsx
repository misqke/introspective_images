import React, { useState, useEffect, useRef } from "react";
import AdminImage from "../../components/Admin/AdminImage";
import Spinner from "../../components/Admin/Spinner";
import styles from "../../styles/Admin.module.scss";
import Image from "next/image";
import Link from "next/link";
import Router from "next/router";
import axios from "axios";

const Admin = ({ cover, gallery }) => {
  const [coverPhoto, setCoverPhoto] = useState(cover);
  const [galleryImages, setGalleryImages] = useState(gallery);
  const [loading, setLoading] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const coverInputRef = useRef();
  const coverSelectRef = useRef();
  const galleryInputRef = useRef();
  const galleryCaptionRef = useRef();
  const galleryTagsRef = useRef();

  const handleCoverUpdateClick = async () => {
    setLoading(true);
    const reader = new FileReader();
    reader.readAsDataURL(coverInputRef.current.files[0]);
    reader.onloadend = async () => {
      const { data } = await axios.post(`/api/admin`, {
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
    const preTags = galleryTagsRef.current.value.split(",");
    const trimmedTags = [];
    preTags.forEach((tag) => {
      trimmedTags.push(tag.trim());
    });
    reader.readAsDataURL(galleryInputRef.current.files[0]);
    reader.onloadend = async () => {
      const { data } = await axios.post(`/api/admin`, {
        newImg: reader.result,
        cover: false,
        position: "center",
        caption: galleryCaptionRef.current.value,
        tags: trimmedTags,
      });
      setGalleryImages((prev) => [...prev, data.data]);
      galleryCaptionRef.current.value = "";
      galleryTagsRef.current.value = "";
      setLoading(false);
    };
  };

  const handleUpdateImage = async (img, caption, tags) => {
    setLoading(true);
    const { data } = await axios.patch(
      `/api/admin`,
      {
        img,
        caption,
        tags,
      },
      { withCredentials: true }
    );
    setGalleryImages(data.data);
    setLoading(false);
  };

  const handleDeleteImage = async (img) => {
    setLoading(true);
    const { data } = await axios.delete(`/api/admin`, {
      data: img,
    });
    setGalleryImages(data.data);
    setLoading(false);
  };

  const handleLogout = async () => {
    const { data } = await axios.get(`/api/auth/logout`);
    if (data.message === "logout successful") {
      Router.push("/");
    }
  };

  useEffect(() => {
    const authenticate = async () => {
      const { data } = await axios.get(`/api/auth/authenticate`);
      if (data.error) {
        Router.push("/login");
      } else {
        setAuthenticated(true);
      }
    };
    authenticate();
  }, []);

  useEffect(() => {
    const getCurrentData = async () => {
      const { data } = await axios.get(`/api/admin`);
      setCoverPhoto(data.data.cover);
      setGalleryImages(data.data.gallery);
    };
    getCurrentData();
  }, []);

  if (!authenticated) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.adminNav}>
        <Link href="/" passHref>
          <a className={styles.homeBtn}>Back to Home Page</a>
        </Link>
        <button onClick={handleLogout} className={styles.homeBtn} type="button">
          Log Out
        </button>
      </div>
      <div className={styles.coverContainer}>
        {coverPhoto && (
          <div className={styles.coverImgContainer}>
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
            </select>
          </span>
          <button
            className={styles.btn}
            type="button"
            onClick={handleCoverUpdateClick}
          >
            Update
          </button>
        </div>
      </div>
      <div className={styles.spinnerContainer}>
        {loading === true && <Spinner />}
      </div>
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
              rows={4}
              placeholder="Add a caption"
            />
          </span>
          <span className={styles.formBox}>
            <label htmlFor="galleryTags">Add tags</label>
            <input
              type="text"
              ref={galleryTagsRef}
              id="galleryTags"
              placeholder="add tags seperated by ,"
            />
          </span>
          <button
            className={styles.btn}
            type="button"
            onClick={handleGalleryAdd}
          >
            Add Image
          </button>
        </div>
        <div className={styles.galleryImgContainer}>
          {galleryImages.length > 0 &&
            galleryImages.map((img) => (
              <AdminImage
                img={img}
                key={img._id}
                handleDelete={handleDeleteImage}
                handleUpdateImage={handleUpdateImage}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;

export const getStaticProps = async () => {
  const { data } = await axios.get(`/api/admin`);
  return {
    props: {
      cover: data.data.cover,
      gallery: data.data.gallery,
    },
  };
};
