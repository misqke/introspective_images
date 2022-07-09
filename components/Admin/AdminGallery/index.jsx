import React, { useState, useEffect, useRef } from "react";
import {
  AdminPageContainer,
  UpdateLabel,
  OutlineButton,
  LoadingBanner,
} from "../adminStyles";
import {
  AdminGalleryOverlay,
  GalleryForm,
  GalleryFormControl,
  GalleryFormLabel,
  GalleryFormTags,
  GalleryFormCaption,
  CloseBox,
  GalleryCanvas,
  GalleryNewImage,
  GallerySwitch,
  GalleryDisplayBox,
  GalleryImgBlock,
  GalleryOverlayImgBlock,
} from "./adminGalleryStyles";
import { AiFillCloseCircle } from "react-icons/ai";
import { sendToCloudinary } from "../../../controllers/images";
import Image from "next/image";

const AdminGallery = ({
  gallery,
  tags,
  addToGallery,
  updateImg,
  deleteImg,
}) => {
  const canvasRef = useRef();
  const newImgRef = useRef();
  const [loading, setLoading] = useState("");
  const [displayAddNew, setDisplayAddNew] = useState(false);
  const [newImage, setNewImage] = useState("");
  const [newTags, setNewTags] = useState("");
  const [newCaption, setNewCaption] = useState("");
  const [imgToEdit, setImgToEdit] = useState(null);
  const [updatedTags, setUpdatedTags] = useState("");
  const [updatedCaption, setUpdatedCaption] = useState("");

  const handleChange = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onloadend = () => {
      setNewImage(reader.result);
    };
  };

  const closeAddNew = () => {
    setDisplayAddNew(false);
    setNewImage("");
    setNewTags("");
    setNewCaption("");
  };

  const closeEditImg = () => {
    setImgToEdit(null);
    setUpdatedCaption("");
    setUpdatedTags("");
  };

  const openUpdateImg = (img) => {
    setImgToEdit(img);
    setUpdatedCaption(img.caption);
    setUpdatedTags(img.tags);
  };

  const handleAddImage = async (e) => {
    e.preventDefault();
    setLoading("Adding Image...");
    try {
      const { url, id, width, height } = await sendToCloudinary(newImage);
      await addToGallery(url, id, width, height, newTags, newCaption);
      setLoading("");
      closeAddNew();
    } catch (error) {
      console.log(error);
      setLoading("");
    }
  };

  const handleUpdateImg = async (e) => {
    e.preventDefault();
    setLoading("Updating image...");
    await updateImg(imgToEdit, updatedCaption, updatedTags);
    setLoading("");
    closeEditImg();
  };

  const handleDeleteImg = async () => {
    setLoading("Deleting Image...");
    await deleteImg(imgToEdit);
    setLoading("");
    closeEditImg();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    canvas.width = windowWidth < 800 ? windowWidth - 50 : windowWidth - 350;
    canvas.height = windowWidth < 800 ? windowHeight / 2.25 : windowHeight;

    const newGalleryImg = newImgRef.current;
    newGalleryImg.src = newImage;

    newGalleryImg.onload = () => {
      let ratio = 1;
      if (newGalleryImg.width > canvas.width) {
        ratio = canvas.width / newGalleryImg.width;
      } else if (newGalleryImg.height > canvas.height) {
        ratio = canvas.height / newGalleryImg.height;
      }

      const newImgWidth = Math.floor(newGalleryImg.width * ratio);
      const newImgHeight = Math.floor(newGalleryImg.height * ratio);

      ctx.drawImage(
        newGalleryImg,
        0,
        0,
        newGalleryImg.width,
        newGalleryImg.height,
        (canvas.width - newImgWidth) / 2,
        (canvas.height - newImgHeight) / 2,
        newImgWidth,
        newImgHeight
      );
    };
  }, [newImage]);

  return (
    <AdminPageContainer>
      {loading.length > 0 && <LoadingBanner>{loading}</LoadingBanner>}
      {/* edit img */}
      {imgToEdit !== null && (
        <AdminGalleryOverlay update={true} show={true}>
          <CloseBox onClick={() => closeEditImg()}>
            <AiFillCloseCircle />
          </CloseBox>
          <GalleryOverlayImgBlock>
            <Image
              src={imgToEdit.url}
              width={imgToEdit.width}
              height={imgToEdit.height}
            />
          </GalleryOverlayImgBlock>
          <GalleryForm info onSubmit={(e) => handleUpdateImg(e)}>
            <GalleryFormControl>
              <GalleryFormLabel htmlFor="updatedTags">Tags: </GalleryFormLabel>
              <GalleryFormTags
                id="updatedTags"
                value={updatedTags}
                type="text"
                onChange={(e) => setUpdatedTags(e.target.value)}
              />
            </GalleryFormControl>
            <GalleryFormControl>
              <GalleryFormLabel htmlFor="updatedCaption">
                Caption:{" "}
              </GalleryFormLabel>
              <GalleryFormCaption
                rows={2}
                value={updatedCaption}
                onChange={(e) => setUpdatedCaption(e.target.value)}
                id="updatedCaption"
              />
            </GalleryFormControl>
            <OutlineButton
              fs="1em"
              disabled={
                imgToEdit.tags === updatedTags &&
                imgToEdit.caption === updatedCaption
              }
              type="submit"
            >
              Update
            </OutlineButton>
            <OutlineButton
              fs="1em"
              type="button"
              warn
              onClick={() => handleDeleteImg()}
            >
              Delete Image
            </OutlineButton>
          </GalleryForm>
        </AdminGalleryOverlay>
      )}
      {/* add new img */}
      <AdminGalleryOverlay show={displayAddNew}>
        <CloseBox onClick={() => closeAddNew()}>
          <AiFillCloseCircle />
        </CloseBox>
        <GalleryForm onSubmit={(e) => handleAddImage(e)}>
          <GallerySwitch>
            <UpdateLabel fs="1em" htmlFor="newGalleryImage">
              <input
                onChange={(e) => handleChange(e)}
                id="newGalleryImage"
                type="file"
                hidden
              />
              Choose Image
            </UpdateLabel>
            <GalleryFormControl>
              <GalleryFormLabel htmlFor="tags">Tags: </GalleryFormLabel>
              <GalleryFormTags
                id="tags"
                type="text"
                value={newTags}
                onChange={(e) => setNewTags(e.target.value)}
              />
            </GalleryFormControl>
          </GallerySwitch>
          <GallerySwitch>
            <GalleryFormControl>
              <GalleryFormLabel htmlFor="caption">Caption: </GalleryFormLabel>
              <GalleryFormCaption
                rows={3}
                id="caption"
                value={newCaption}
                onChange={(e) => setNewCaption(e.target.value)}
              />
            </GalleryFormControl>
            <OutlineButton
              fs="1em"
              disabled={newImage.length === 0}
              type="submit"
            >
              Submit
            </OutlineButton>
          </GallerySwitch>
        </GalleryForm>
        <GalleryCanvas ref={canvasRef} />
        <GalleryNewImage ref={newImgRef} hidden />
      </AdminGalleryOverlay>
      <OutlineButton type="button" onClick={() => setDisplayAddNew(true)}>
        Add New Image
      </OutlineButton>
      <GalleryDisplayBox>
        {gallery.map((img) => (
          <GalleryImgBlock key={img._id} onClick={() => openUpdateImg(img)}>
            <Image
              src={img.url}
              width={img.width}
              height={img.height}
              alt={img.caption}
            />
          </GalleryImgBlock>
        ))}
      </GalleryDisplayBox>
    </AdminPageContainer>
  );
};

export default AdminGallery;
