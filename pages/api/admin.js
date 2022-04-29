import dbConnect from "../../libs/dbConnect";
import Images from "../../models/Images";
import cloudinary from "../../libs/cloudinary";

export default async function handler(req, res) {
  // connect to mongo
  await dbConnect();

  if (req.method === "GET") {
    try {
      const cover = await Images.findOne({ cover: true });
      const gallery = await Images.find({ cover: false });
      const tags = [];
      gallery.forEach((img) => {
        img.tags.forEach((tag) => {
          if (!tags.includes(tag)) {
            tags.push(tag);
          }
        });
      });
      res.status(200).json({
        message: "images retrieved successfully",
        data: { cover, gallery, tags },
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  } else if (req.method === "POST") {
    try {
      if (req.body.cover === true) {
        const currentCover = await Images.findOne({ cover: true });
        await cloudinary.uploader.destroy(
          currentCover.cloudid,
          { type: "upload", resource_type: "image" },
          (result, error) => console.log(error, result)
        );
        await Images.findOneAndDelete({ cover: true });
      }
      const cloudinaryRes = await cloudinary.uploader.upload(req.body.newImg, {
        upload_preset: "introspective",
      });

      const newImageData = {
        url: cloudinaryRes.secure_url,
        cover: req.body.cover,
        caption: req.body.caption || "",
        position: req.body.position || "center",
        cloudid: cloudinaryRes.public_id,
        width: cloudinaryRes.width,
        height: cloudinaryRes.height,
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
    try {
      await Images.findByIdAndDelete(req.body._id);
      await cloudinary.uploader.destroy(
        req.body.cloudid,
        { type: "upload", resource_type: "image" },
        (result, error) => console.log(error, result)
      );
      const newGallery = await Images.find({ cover: false });
      res
        .status(200)
        .json({ message: "Image deleted successfully", data: newGallery });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  } else if (req.method === "PATCH") {
    try {
      await Images.findByIdAndUpdate(req.body.img._id, {
        caption: req.body.caption,
        tags: req.body.tags,
      });
      const newGallery = await Images.find({ cover: false });
      res
        .status(200)
        .json({ message: "Image updated successfully.", data: newGallery });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  } else {
    res.json({ message: "error" });
  }
}
