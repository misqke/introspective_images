import axios from "axios";

export const handleCoverUpdate = async (img, position) => {
  const { data } = await axios.post(
    `/api/admin`,
    {
      newImg: img,
      cover: true,
      position: position,
    },
    { withCredentials: true }
  );
  return data.data;
};

export const handleGalleryAdd = async (img, tags, caption) => {
  const tagsArr = tags.split(",");
  const trimmedTags = tagsArr.map((tag) => tag.toLowerCase().trim());
  const { data } = await axios.post(
    `/api/admin`,
    {
      newImg: img,
      cover: false,
      position: "center",
      caption: caption,
      tags: trimmedTags,
    },
    { withCredentials: true }
  );
  return data.data;
};

export const handleDeleteImage = async (img) => {
  const { data } = await axios.delete(
    `/api/admin`,
    { data: img },
    { withCredentials: true }
  );
  return data.data;
};

export const handleUpdateImage = async (img, caption, tags) => {
  const tagsArr = tags.split(",");
  const trimmedTags = tagsArr.map((tag) => tag.toLowerCase().trim());
  const { data } = await axios.patch(
    `/api/admin`,
    {
      img,
      caption,
      tags: trimmedTags,
    },
    { withCredentials: true }
  );
  return data.data;
};
