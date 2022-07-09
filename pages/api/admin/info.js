import dbConnect from "../../../libs/dbConnect";
import Info from "../../../models/Info";
import { checkToken } from "./images";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    const info = await Info.find({});
    res.status(200).json({
      message: "data collected successfully",
      data: info[0],
    });
  } else if (req.method === "PATCH") {
    checkToken(req);
    const newInfo = await Info.findByIdAndUpdate(
      req.body.id,
      {
        about: req.body.about,
        email: req.body.email,
      },
      { new: true }
    );
    res.status(201).json(newInfo);
  }
}
