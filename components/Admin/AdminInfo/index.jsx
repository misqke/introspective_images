import React, { useState } from "react";
import {
  AdminPageContainer,
  OutlineButton,
  LoadingBanner,
} from "../adminStyles";

import {
  GalleryForm,
  GalleryFormControl,
  GalleryFormLabel,
  GalleryFormCaption,
  GalleryFormTags,
} from "../AdminGallery/adminGalleryStyles";

const AdminInfo = ({ about, email, updateInfo }) => {
  const [updatedEmail, setUpdatedEmail] = useState(email);
  const [updatedAbout, setUpdatedAbout] = useState(about);
  const [loading, setLoading] = useState("");

  const handleUpdateInfo = async (e) => {
    e.preventDefault();
    setLoading("updating Info...");
    await updateInfo(updatedAbout, updatedEmail);
    setLoading("");
  };

  return (
    <AdminPageContainer>
      {loading.length > 0 && <LoadingBanner>{loading}</LoadingBanner>}
      <GalleryForm info onSubmit={(e) => handleUpdateInfo(e)}>
        <GalleryFormControl>
          <GalleryFormLabel htmlFor="about">About: </GalleryFormLabel>
          <GalleryFormCaption
            id="about"
            value={updatedAbout}
            onChange={(e) => setUpdatedAbout(e.target.value)}
            rows={5}
          />
        </GalleryFormControl>
        <GalleryFormControl>
          <GalleryFormLabel htmlFor="email">Email: </GalleryFormLabel>
          <GalleryFormTags
            type="email"
            value={updatedEmail}
            onChange={(e) => setUpdatedEmail(e.target.value)}
            id="email"
          />
        </GalleryFormControl>
        <OutlineButton
          fs="1em"
          type="submit"
          disabled={about === updatedAbout && email === updatedEmail}
        >
          Update
        </OutlineButton>
      </GalleryForm>
    </AdminPageContainer>
  );
};

export default AdminInfo;
