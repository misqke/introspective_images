import axios from "axios";

export const sendToCloudinary = async (img) => {
  const { data } = await axios.post(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD}/auto/upload`,
    { file: img, upload_preset: "introspective" }
  );
  return {
    url: data.secure_url,
    id: data.public_id,
    width: data.width,
    height: data.height,
  };
};

export const handleCoverUpdate = async (url, id, width, height, position) => {
  const { data } = await axios.post(
    `/api/admin`,
    {
      url,
      id,
      width,
      height,
      cover: true,
      position: position,
    },
    { withCredentials: true }
  );
  return data.data;
};

export const handleGalleryAdd = async (
  url,
  id,
  width,
  height,
  tags,
  caption
) => {
  const tagsArr = tags.split(",");
  const trimmedTags = tagsArr.map((tag) => tag.toLowerCase().trim());
  const { data } = await axios.post(
    `/api/admin`,
    {
      url,
      id,
      width,
      height,
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
