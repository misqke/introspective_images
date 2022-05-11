import mongoose from "mongoose";

const InfoSchema = new mongoose.Schema({
  about: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

export default mongoose.models.Info || mongoose.model("Info", InfoSchema);
