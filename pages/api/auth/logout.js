import { serialize } from "cookie";

export default async function handler(req, res) {
  const { cookies } = req;

  const jwt = cookies.IntrospectiveJWT;

  const serialised = serialize("IntrospectiveJWT", null, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    path: "/",
    maxAge: -1,
  });

  res.setHeader("Set-Cookie", serialised);
  res.status(200).json({ message: "logout successful" });
}
