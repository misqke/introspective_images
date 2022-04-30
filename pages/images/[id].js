import React from "react";
import Image from "next/image";
import Nav from "../../components/Nav";
import axios from "axios";
import styles from "../../styles/FullImg.module.scss";

const FullImg = ({ img }) => {
  return (
    <div className={styles.container}>
      <Nav />
      <div className={styles.imgContainer}>
        <Image
          className={styles.img}
          src={img.url}
          alt={img.caption}
          width={img.width}
          height={img.height}
          objectFit="contain"
        />
        <i>{img.caption}</i>
      </div>
    </div>
  );
};

export default FullImg;

export const getServerSideProps = async ({ params }) => {
  const { data } = await axios.get(`/api/images/?id=${params.id}`);
  return {
    props: {
      img: data.data,
    },
  };
};
