import jwt from "jsonwebtoken";
import { errorHandler } from "./error.handler.js";
import userModel from "../models/user.model.js";

export const userProtectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return next(errorHandler(404, "Unauhorized userr"));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return next(errorHandler(400, "invalid token"));
    }
    const user = await userModel.findById(decoded.userId).select("-password");
    if (!user) {
      return next(errorHandler(403, "User not found"));
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("error in protect route" + error);
  }
};
