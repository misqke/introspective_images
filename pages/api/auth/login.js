import { sign } from "jsonwebtoken";
import { serialize } from "cookie";

export default async function handler(req, res) {
  const { password } = req.body;
  console.log("hello");
  if (password !== process.env.ADMIN_PASSWORD) {
    res.json({ error: { message: "invalid password" } });
  } else {
    const token = sign({ user: "admin" }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    const serialised = serialize("IntrospectiveJWT", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      path: "/",
    });

    res.setHeader("Set-Cookie", serialised);
    res.status(201).json({ message: "Login successful" });
  }
}
