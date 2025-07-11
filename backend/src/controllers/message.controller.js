import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.io.js";
import messageModel from "../models/message.model.js";
import userModel from "../models/user.model.js";

export const userGetForSideBar = async (req,res,next) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await userModel.find({_id: {$ne: loggedInUserId}}).select('-password');
        res.status(200).json(filteredUsers); 
    } catch (error) {
        console.log(error);
        next();
    }
}

export const getMessages = async (req,res,next) => {
    try {
        const {id: userToChatId} = req.params;
        const myId = req.user._id;

        const messages = await messageModel.find({
            $or:[
                {senderId: myId, receiverId: userToChatId},
                {senderId: userToChatId, receiverId: myId},
            ]
        });
        res.status(200).json(messages);
     } catch (error) {
        console.log(error);
        next();
    }
}

export const sendMessage = async (req,res,next) => {
    try {
        const {text,image} = req.body;
        const {id: receiverId }= req.params;
        const senderId = req.user._id;

        let imageUrl;
        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image);
             imageUrl =  uploadResponse.secure_url;
        }

        const newMessage = new messageModel({
            senderId,
            receiverId,
            text,
            image: imageUrl,
        });

        await newMessage.save();
        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage",newMessage);
        }

        res.status(200).json(newMessage);
        console.log(newMessage)
    } catch (error) {
        console.log(error);
        next();
    }
}