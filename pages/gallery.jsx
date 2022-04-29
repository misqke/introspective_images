import React from "react";
import Head from "next/head";
import Nav from "../components/Nav";
import GalleryImage from "../components/Gallery/GalleryImage";
import styles from "../styles/Gallery.module.scss";
import axios from "axios";

const Gallery = ({ gallery, tags }) => {
  return (
    <div className={styles.galleryContainer}>
      <Head>
        <title>Introspective Images - Gallery</title>
      </Head>
      <Nav />
      {tags.map((tag) => (
        <div key={tag} className={styles.galleryRow}>
          <h3>{tag.toUpperCase()}</h3>
          <div className={styles.rowBox}>
            {gallery
              .filter((img) => img.tags.includes(tag))
              .map((img) => (
                <GalleryImage key={img._id} img={img} />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Gallery;

export const getStaticProps = async () => {
  const { data } = await axios.get(`/api/admin`);
  return {
    props: {
      gallery: data.data.gallery,
      tags: data.data.tags,
    },
  };
};
