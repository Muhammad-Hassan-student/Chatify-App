import express from 'express'
import { checkUser, login, logout, signup, updateProfile } from '../controllers/auth.controller.js';
import { userProtectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post("/signup",signup);
router.post("/login",login);
router.get("/logout",logout);
router.put("/update-profile",userProtectRoute,updateProfile);
router.get("/check",userProtectRoute,checkUser);


export default router;
