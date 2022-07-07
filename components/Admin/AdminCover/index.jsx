import React from "react";
import { CoverImgBox } from "./adminCoverStyled";
import { AdminPageContainer, UpdateLabel } from "../adminStyles";
import { sendToCloudinary } from "../../../controllers/images";
import Image from "next/image";

const AdminCover = ({ cover, updateCover }) => {
  const handleChange = async (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      const { url, id, width, height } = await sendToCloudinary(reader.result);
      updateCover(url, id, width, height);
    };
  };

  return (
    <AdminPageContainer>
      <UpdateLabel htmlFor="coverInput">
        <input
          type="file"
          id="coverInput"
          onChange={(e) => handleChange(e.target.files[0])}
          hidden
        />
        Update Cover
      </UpdateLabel>
      <CoverImgBox>
        <Image src={cover.url} width={cover.width} height={cover.height} />
      </CoverImgBox>
    </AdminPageContainer>
  );
};

export default AdminCover;
