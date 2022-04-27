import React from "react";
import styles from "../../styles/AdminImage.module.scss";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Image from "next/image";

const AdminImage = ({ img, handleDelete }) => {
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Image
          src={img.url}
          width={img.width}
          height={img.height}
          alt={img.caption}
        />
      </div>
      <p>{img.caption}</p>
      <button
        type="button"
        className={styles.deleteBtn}
        onClick={() => handleDelete(img)}
      >
        <DeleteForeverIcon />
      </button>
    </div>
  );
};

export default AdminImage;
