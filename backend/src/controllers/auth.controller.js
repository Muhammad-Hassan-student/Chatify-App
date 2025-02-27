import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/generateToken.js";
import { errorHandler } from "../middleware/error.handler.js";
import userModel from "../models/user.model.js";
import bcryptjs from "bcryptjs";

//Sign up
export const signup = async (req, res,next) => {
  try {
    const { fullName, email, password } = req.body;
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters" });
    }
    const user = await userModel.findOne({ email });

    if (user) {
      return next(errorHandler(400,"User is already exists" ))
    }
    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newUser = new userModel({
      fullName,
      email,
      password:hashedPassword,
    });

    
      //if user is new so generate token
      generateToken(newUser._id,res);
      await newUser.save();
      const {password:pass,...rest} = newUser._doc;

      res.status(200).json(rest);
      
   
  } catch (error) {
      console.log(error);
      next()
  }
};

//login
export const login = async (req, res,next) => {
  const {email,password} = req.body;
  try {
    if(!email && !password){
      return next(errorHandler(400,"Please all fields are required"));
    }    
    const user = await userModel.findOne({email});
    if(!user){
      return next(errorHandler(403,"Invalid credintials. Please try again"));
    }
    const passwordIsMatch = await bcryptjs.compareSync(password,user.password);

    if(!passwordIsMatch){
      return next(errorHandler(403,"Invalid password. Please try again"));
    }

    const token = generateToken(user._id,res);
    res.status(200).json({
      success: true,
      message: "Login successfully",
      token,
    })
  } catch (error) {
    console.log(error);

    next()
  }
};

//logout
export const logout = async (req, res,next) => {
  try {
    res.cookie("token","",{maxAge:0})
    res.status(200).json({success: true,message: "Logged out successfully"});l
  } catch (error) {
    console.log(error);
    next();
  }
};

//Profile pic update
export const updateProfile = async (req,res,next) => {
  try {
    const {profilePhoto}= await req.body;
    const userId = req.user._id;

    if(!profilePhoto){
      return console.log("all fields are required");
    }

    const uploadResponse = await cloudinary.uploader.upload(profilePhoto);
    const updateUser = await userModel.findByIdAndUpdate(userId,{profilePhoto: uploadResponse.secure_url},{new: true});
    return res.status(200).json(updateUser);
  
  } catch (error) {
    console.log(error);
    next();
  }
}

//Check user is login or not
export const checkUser = async (req,res) => {
  try {
    const user = req.user._id
    if(!user){
      return next(errorHandler(400,"User not found"));
    }else{
      res.status(200).json(req.user);  

    }
  } catch (error) {
    console.log(error);
    next();
  }
}