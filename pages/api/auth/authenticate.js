import { verify } from "jsonwebtoken";

export default async function handler(req, res) {
  const { cookies } = req;
  const token = cookies.IntrospectiveJWT;
  verify(token, `${process.env.JWT_SECRET}`, (error, user) => {
    if (error) {
      console.log("failed authentication", error);
      return res.json({ error: "invalid user" });
    } else {
      return res.status(200).json({ message: "verified" });
    }
  });
}
