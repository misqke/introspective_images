import React, { useState, useEffect } from "react";
import { AdminPageContainer, UpdateLabel } from "../adminStyles";
import {
  AdminGalleryRow,
  GalleryRowBox,
  NewImageBox,
} from "./adminGalleryStyles";
import Image from "next/image";

const AdminGallery = () => {
  const [newImage, setNewImage] = useState("");

  const handleChange = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setNewImage(reader.result);
    };
  };

  return (
    <AdminPageContainer>
      <AdminGalleryRow>
        <GalleryRowBox>
          <UpdateLabel htmlFor="coverInput">
            <input
              type="file"
              id="coverInput"
              onChange={(e) => handleChange(e.target.files[0])}
              hidden
            />
            Add Image
          </UpdateLabel>
        </GalleryRowBox>
        <GalleryRowBox>
          <NewImageBox>
            {newImage.length > 0 && (
              <Image src={newImage} layout="fill" objectFit="contain" />
            )}
          </NewImageBox>
        </GalleryRowBox>
      </AdminGalleryRow>
    </AdminPageContainer>
  );
};

export default AdminGallery;
