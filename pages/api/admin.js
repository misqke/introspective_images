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
      res.status(200).json({
        message: "images retrieved successfully",
        data: { cover, gallery },
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
      };
      const newImage = await Images.create(newImageData);
      res.status(201).json({
        message: "New image added successfully.",
        data: newImage,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  } else {
    res.json({ message: "error" });
  }
}
