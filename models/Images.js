import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },
    cloudid: {
      type: String,
      required: true,
    },
    caption: String,
    cover: {
      type: Boolean,
      default: false,
    },
    tags: [String],
    width: Number,
    height: Number,
  },
  { timestamps: true }
);

export default mongoose.models.Images || mongoose.model("Images", ImageSchema);
