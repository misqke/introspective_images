import dbConnect from "../../../libs/dbConnect";
import Images from "../../../models/Images";
import cloudinary from "../../../libs/cloudinary";
import { verify } from "jsonwebtoken";

export const checkToken = (req) => {
  const { cookies } = req;
  const token = cookies.IntrospectiveJWT;
  verify(token, `${process.env.JWT_SECRET}`, (error, user) => {
    if (error) {
      console.log("failed authentication", error);
      return res.status(403).json({ error });
    }
  });
};

const getTags = (imgList) => {
  const tags = [];
  imgList.forEach((img) => {
    img.tags.forEach((tag) => {
      if (!tags.includes(tag)) {
        tags.push(tag);
      }
    });
  });
  return tags;
};

export default async function handler(req, res) {
  // connect to mongo
  await dbConnect();

  if (req.method === "GET") {
    try {
      const cover = await Images.findOne({ cover: true });
      const gallery = await Images.find({ cover: false }).sort("-updatedAt");
      const tags = getTags(gallery);
      res.status(200).json({
        message: "images retrieved successfully",
        data: { cover, gallery, tags },
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  } else if (req.method === "POST") {
    try {
      checkToken(req);
      if (req.body.cover === true) {
        const currentCover = await Images.findOne({ cover: true });
        await cloudinary.uploader.destroy(
          currentCover.cloudid,
          { type: "upload", resource_type: "image" },
          (result, error) => console.log(error, result)
        );
        await Images.findOneAndDelete({ cover: true });
      }

      const newImageData = {
        url: req.body.url,
        cover: req.body.cover,
        caption: req.body.caption || "",
        cloudid: req.body.id,
        width: req.body.width,
        height: req.body.height,
        tags: req.body.tags || [],
      };
      const newImage = await Images.create(newImageData);
      res.status(201).json({
        message: "New image added successfully.",
        data: newImage,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  } else if (req.method === "DELETE") {
    checkToken(req);
    try {
      await Images.findByIdAndDelete(req.body._id);
      await cloudinary.uploader.destroy(
        req.body.cloudid,
        { type: "upload", resource_type: "image" },
        (result, error) => console.log(error, result)
      );
      const newGallery = await Images.find({ cover: false }).sort("-updatedAt");
      const newTags = getTags(newGallery);
      res.status(200).json({
        message: "Image deleted successfully",
        data: { newGallery, newTags },
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  } else if (req.method === "PATCH") {
    checkToken(req);
    try {
      await Images.findByIdAndUpdate(req.body.img._id, {
        caption: req.body.caption,
        tags: req.body.tags,
      });
      const newGallery = await Images.find({ cover: false }).sort("-updatedAt");
      const newTags = getTags(newGallery);
      res.status(200).json({
        message: "Image updated successfully.",
        data: { newGallery, newTags },
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  } else {
    res.json({ message: "error" });
  }
}
