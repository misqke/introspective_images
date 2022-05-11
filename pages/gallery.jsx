import React, { useEffect } from "react";
import Head from "next/head";
import Nav from "../components/Nav";
import GalleryImage from "../components/Gallery/GalleryImage";
import styles from "../styles/Gallery.module.scss";
import axios from "axios";

const Gallery = ({ gallery, tags }) => {
  useEffect(() => {
    const imgs = document.querySelectorAll("span");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle(
            `${styles.visible}`,
            entry.isIntersecting
          );
        });
      },
      {
        threshold: 0.5,
      }
    );
    imgs.forEach((img) => {
      obs.observe(img);
    });

    return () => {
      imgs.forEach((img) => {
        obs.unobserve(img);
      });
    };
  });

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
                <span key={img._id} className={styles.imgBox}>
                  <GalleryImage img={img} />
                </span>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Gallery;

export const getServerSideProps = async () => {
  const { data } = await axios.get(`/api/admin/images`);
  return {
    props: {
      gallery: data.data.gallery,
      tags: data.data.tags,
    },
  };
};
