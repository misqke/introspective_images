import React, { useState, useEffect, useRef } from "react";
import styles from "../../styles/AdminImage.module.scss";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CloudUploadSharpIcon from "@mui/icons-material/CloudUploadSharp";
import Image from "next/image";

const AdminImage = ({ img, handleDelete, handleUpdateImage }) => {
  const updateBtnRef = useRef();
  const [caption, setCaption] = useState(img.caption);
  const [tags, setTags] = useState(img.tags.join(", "));

  const handleUpdate = () => {
    const tagsArr = tags.split(",");
    handleUpdateImage(img, caption, tagsArr);
    updateBtnRef.current.classList.remove(styles.show);
  };

  useEffect(() => {
    if (tags !== img.tags.join(", ") || caption !== img.caption) {
      updateBtnRef.current.classList.add(styles.show);
    } else {
      updateBtnRef.current.classList.remove(styles.show);
    }
  }, [caption, tags]);

  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Image
          src={img.url}
          width={img.width}
          height={img.height}
          alt={img.caption}
        />
        <button
          type="button"
          className={styles.deleteBtn}
          onClick={() => handleDelete(img)}
        >
          <DeleteForeverIcon />
        </button>
        <button
          ref={updateBtnRef}
          type="button"
          className={styles.updateBtn}
          onClick={() => handleUpdate()}
        >
          <CloudUploadSharpIcon />
        </button>
      </div>
      <div className={styles.formBox}>
        <label htmlFor="caption">Caption</label>
        <textarea
          id="caption"
          type="text"
          value={caption}
          cols={2}
          onChange={(e) => setCaption(e.target.value)}
        />
      </div>
      <div className={styles.formBox}>
        <label htmlFor="tags">Tags</label>
        <input
          id="tags"
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </div>
    </div>
  );
};

export default AdminImage;
