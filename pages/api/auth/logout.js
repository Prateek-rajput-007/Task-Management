import { asyncError, errorHandler } from "../../../middlewares/error";
import { serialize } from "cookie";

const handler = asyncError(async (req, res) => {
  if (req.method !== "GET")
    return errorHandler(res, 400, "Only GET Method is allowed");

  res.setHeader(
    "Set-Cookie",
    serialize("token", "", {
      maxAge: -1,
      path: "/",
    })
  );

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});

export default handler;
