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
        const {id: userToChatId} = req.params._id;
        const myId = req.user._id;

        const messages = await userModel.find({
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