import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
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
  position: String,
  width: Number,
  height: Number,
});

export default mongoose.models.Images || mongoose.model("Images", ImageSchema);
