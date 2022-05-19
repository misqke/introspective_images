import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";
import { authenticate } from "../controllers/auth";
import {
  handleCoverUpdate,
  handleGalleryAdd,
  handleDeleteImage,
  handleUpdateImage,
} from "../controllers/images";
import AdminImage from "../components/Admin/AdminImage";
import LoadingBar from "../components/Admin/LoadingBar";
import styles from "../styles/Admin.module.scss";
import CloudUploadSharpIcon from "@mui/icons-material/CloudUploadSharp";
import Image from "next/image";
import Link from "next/link";
import Router from "next/router";
import { sendToCloudinary } from "../controllers/images";
import axios from "axios";

const Admin = () => {
  const canvasRef = useRef();
  const imgRef = useRef();
  const [availableTags, setAvailableTags] = useState([]);
  const [coverImage, setCoverImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [coverPosition, setCoverPosition] = useState("");
  const [galleryFile, setGalleryFile] = useState("");
  const [galleryImages, setGalleryImages] = useState(null);
  const [filteredGalleryImages, setFilteredGalleryImages] = useState([]);
  const [filter, setFilter] = useState("all");
  const [caption, setCaption] = useState("");
  const [tags, setTags] = useState("");
  const [tab, setTab] = useState("cover");
  const [loading, setLoading] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [about, setAbout] = useState("");
  const [email, setEmail] = useState("");
  const [infoID, setInfoID] = useState(0);

  const handleFileChange = (e, cover) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onloadend = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const myImg = imgRef.current;
      myImg.src = reader.result;

      myImg.onload = () => {
        let ratio = 1;
        if (myImg.width > 2000) {
          ratio = 2000 / myImg.width;
        } else if (myImg.height > 1200) {
          ratio = 1200 / myImg.height;
        }
        const newWidth = Math.floor(myImg.width * ratio);
        const newHeight = Math.floor(myImg.height * ratio);
        canvas.width = newWidth;
        canvas.height = newHeight;
        ctx.drawImage(
          myImg,
          0,
          0,
          myImg.width,
          myImg.height,
          0,
          0,
          canvas.width,
          canvas.height
        );
        const dataURL = canvas.toDataURL();
        if (cover === true) {
          setPreviewImage(dataURL);
        } else if (cover === false) {
          setGalleryFile(dataURL);
        }
      };
    };
  };

  const handleLogout = async () => {
    const { data } = await axios.get(`/api/auth/logout`);
    if (data.message === "logout successful") {
      Router.push("/");
    }
  };

  const handleDelete = async (img) => {
    setLoading(true);
    const { newGallery, newTags } = await handleDeleteImage(img);
    setGalleryImages(newGallery);
    setAvailableTags(newTags);
    setLoading(false);
  };

  const handleUpdate = async (img, caption, tags) => {
    setLoading(true);
    const { newGallery, newTags } = await handleUpdateImage(img, caption, tags);
    setGalleryImages(newGallery);
    setAvailableTags(newTags);
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (tab === "info") {
      const { data } = await axios.patch("/api/admin/info", {
        id: infoID,
        about,
        email,
      });

      setLoading(false);
      return;
    }
    const { url, id, width, height } = await sendToCloudinary(
      tab === "cover" ? previewImage : galleryFile
    );
    if (tab === "cover") {
      const newCoverImage = await handleCoverUpdate(
        url,
        id,
        width,
        height,
        coverPosition
      );
      setCoverImage(newCoverImage);
      setPreviewImage(newCoverImage.url);
      setCoverPosition(newCoverImage.position);
    } else if (tab === "gallery") {
      if (galleryFile === "") {
        setLoading(false);
        return;
      }
      const newGalleryImage = await handleGalleryAdd(
        url,
        id,
        width,
        height,
        tags,
        caption
      );
      setGalleryImages((prev) => [newGalleryImage, ...prev]);
      setGalleryFile("");
      setCaption("");
      setTags("");
    }
    setLoading(false);
  };

  // check for authentication
  useEffect(() => {
    const checkAuthentication = async () => {
      const isAuthenticated = await authenticate();
      if (isAuthenticated) {
        setAuthenticated(true);
      } else {
        Router.push("/login");
      }
    };
    checkAuthentication();
  }, []);

  // get data
  useEffect(() => {
    const getCurrentImageData = async () => {
      const { data } = await axios.get(`/api/admin/images`);
      setCoverImage(data.data.cover);
      setPreviewImage(data.data.cover.url);
      setGalleryImages(data.data.gallery);
      setAvailableTags(data.data.tags);
      setCoverPosition(data.data.cover.position);
      setFilteredGalleryImages(data.data.gallery);
    };
    const getCurrentInfoData = async () => {
      const { data } = await axios.get(`/api/admin/info`);
      setAbout(data.data.about);
      setEmail(data.data.email);
      setInfoID(data.data._id);
    };
    getCurrentImageData();
    getCurrentInfoData();
  }, []);

  // update on filter change
  useEffect(() => {
    if (filter === "all") {
      setFilteredGalleryImages(galleryImages);
    } else {
      const filteredImages = galleryImages.filter((img) =>
        img.tags.includes(filter)
      );
      setFilteredGalleryImages(filteredImages);
    }
  }, [filter, galleryImages, tags]);

  // while loading or authenticating
  if (!authenticated || !coverImage || !galleryImages) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Introspective Images - Admin</title>
      </Head>
      <canvas ref={canvasRef} hidden></canvas>
      <img hidden ref={imgRef} src="" alt="" />
      <div className={styles.adminNav}>
        <Link href="/" passHref>
          <a className={styles.navBtn}>Back to Home Page</a>
        </Link>
        <button onClick={handleLogout} className={styles.navBtn} type="button">
          Log Out
        </button>
      </div>
      {/* tabs and forms */}
      <div className={styles.interactive}>
        <div className={styles.tabs}>
          <button
            type="button"
            className={`${styles.tab} ${
              tab === "cover" ? styles.currentTab : null
            }`}
            onClick={() => setTab("cover")}
          >
            Cover
          </button>
          <button
            type="button"
            className={`${styles.tab} ${
              tab === "gallery" ? styles.currentTab : null
            }`}
            onClick={() => setTab("gallery")}
          >
            Gallery
          </button>
          <button
            type="button"
            className={`${styles.tab} ${
              tab === "info" ? styles.currentTab : null
            }`}
            onClick={() => setTab("info")}
          >
            Info
          </button>
        </div>
        <div className={`${styles.form} ${!tab ? styles.galleryForm : null}`}>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className={styles.formLeft}>
              {tab === "cover" ? (
                <>
                  <label className={styles.fileInput} htmlFor="coverFile">
                    <input
                      type="file"
                      id="coverFile"
                      onChange={(e) => handleFileChange(e, true)}
                    />
                  </label>
                  <label className={styles.fileInput} htmlFor="coverPosition">
                    position
                    <select
                      value={coverPosition}
                      onChange={(e) => setCoverPosition(e.target.value)}
                    >
                      <option value="center">center</option>
                      <option value="top">top</option>
                      <option value="bottom">bottom</option>
                    </select>
                  </label>
                </>
              ) : tab === "gallery" ? (
                <>
                  <label className={styles.fileInput} htmlFor="galleryFile">
                    <input
                      type="file"
                      id="galleryFile"
                      onChange={(e) => handleFileChange(e, false)}
                    />
                  </label>
                  <label className={styles.fileInput} htmlFor="caption">
                    caption
                    <textarea
                      type="text"
                      value={caption}
                      cols={2}
                      onChange={(e) => setCaption(e.target.value)}
                      placeholder="add a caption"
                    />
                  </label>
                  <label className={styles.fileInput} htmlFor="tags">
                    tags
                    <input
                      type="text"
                      id="tags"
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                      placeholder="add tags seperated by ,"
                    />
                  </label>
                  <label className={styles.fileInput} htmlFor="filter">
                    filter
                    <select
                      id="filter"
                      value={filter}
                      onChange={(e) => setFilter(e.target.value)}
                    >
                      <option value="all">all</option>
                      {availableTags.map((tag) => (
                        <option value={tag} key={tag}>
                          {tag}
                        </option>
                      ))}
                    </select>
                  </label>
                </>
              ) : (
                <></>
              )}
            </div>
            <div className={styles.formRight}>
              <button className={styles.submit}>
                <CloudUploadSharpIcon fontSize="large" />
              </button>
            </div>
          </form>
        </div>

        <div className={styles.loadingContainer}>
          {loading === true && <LoadingBar />}
        </div>
      </div>
      {/* images display */}
      <div className={styles.display}>
        {tab === "cover" ? (
          <div className={styles.coverImgContainer}>
            <Image
              src={previewImage}
              layout="fill"
              objectFit="cover"
              objectPosition={coverPosition}
              quality={100}
              alt=""
              priority
            />
          </div>
        ) : tab === "gallery" ? (
          <div className={styles.galleryImgContainer}>
            {filteredGalleryImages.map((img) => (
              <AdminImage
                key={img._id}
                img={img}
                handleDelete={handleDelete}
                handleUpdate={handleUpdate}
              />
            ))}
          </div>
        ) : (
          <div className={styles.infoContainer}>
            <label>About</label>
            <textarea
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              cols={5}
            />
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
