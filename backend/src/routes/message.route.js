import express from 'express'
import { userProtectRoute } from '../middleware/auth.middleware.js';
import { getMessages, sendMessage, userGetForSideBar } from '../controllers/message.controller.js';

const router = express.Router();

router.get("/getUsers",userProtectRoute,userGetForSideBar);
router.get("/:id",userProtectRoute,getMessages);
router.post("/send/:id",userProtectRoute,sendMessage);

export default router;