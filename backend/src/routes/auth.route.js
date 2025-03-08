import express from "express";
import {
  checkUser,
  google,
  login,
  logout,
  signup,
  updateProfile,
} from "../controllers/auth.controller.js";
import { userProtectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/google", google); //TODO: Try this Google authentication

router.get("/logout", logout);
router.put("/updateProfile", userProtectRoute, updateProfile);
// router.put("/update-profile",userProtectRoute,update)
router.get("/check", userProtectRoute, checkUser);

export default router;
