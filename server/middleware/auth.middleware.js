import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";

const auth = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.header("Authorization")?.replace("Bearer ", "");
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded?._id).select("-password");
      req.user = user;
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not Authorized, Token Failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not Authorized, to Token");
  }
});

export default auth;
