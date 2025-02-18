import express from 'express'
import { login, logout, signup, updateProfile } from '../controllers/auth.controller.js';
import { userProtectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post("/signup",signup);
router.post("/login",login);
router.get("/logout",logout);
router.post("/update-profile",userProtectRoute,updateProfile);



export default router;
