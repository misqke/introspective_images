import React, { useState, useEffect, useRef } from "react";
import { AdminPageContainer, UpdateLabel, OutlineButton } from "../adminStyles";
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
} from "./adminGalleryStyles";
import { AiFillCloseCircle } from "react-icons/ai";
import { sendToCloudinary } from "../../../controllers/images";
import Image from "next/image";

const AdminGallery = ({ gallery, tags, addToGallery }) => {
  const canvasRef = useRef();
  const newImgRef = useRef();
  const [displayAddNew, setDisplayAddNew] = useState(false);
  const [newImage, setNewImage] = useState("");
  const [newTags, setNewTags] = useState("");
  const [newCaption, setNewCaption] = useState("");

  const handleChange = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onloadend = () => {
      setNewImage(reader.result);
    };
  };

  const closeOverlay = () => {
    setDisplayAddNew(false);
    setNewImage("");
    setNewTags("");
    setNewCaption("");
  };

  const handleAddImage = async (e) => {
    e.preventDefault();
    console.log("sending to cloudinary");
    try {
      const { url, id, width, height } = await sendToCloudinary(newImage);
      console.log("from cloudinary: ", url);
      addToGallery(url, id, width, height, newTags, newCaption);
    } catch (error) {
      console.log(error);
    }
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
      <AdminGalleryOverlay show={displayAddNew}>
        <CloseBox onClick={() => closeOverlay()}>
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
    </AdminPageContainer>
  );
};

export default AdminGallery;
