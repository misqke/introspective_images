import Images from "../../models/Images";

export default async function handler(req, res) {
  try {
    const { id } = req.query;
    const image = await Images.findById(id);
    res.status(200).json({ message: "success", data: image });
  } catch (error) {
    res.json({ error: error.message });
  }
}
