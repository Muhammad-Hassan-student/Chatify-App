import { v2 as cloudinary } from "cloudinary";
import { generateToken } from "../lib/generateToken.js";
import { errorHandler } from "../middleware/error.handler.js";
import userModel from "../models/user.model.js";
import bcryptjs from "bcryptjs";

//Sign up
export const signup = async (req, res, next) => {
  try {
    const { fullName, email, password } = req.body;
    if (
      !fullName ||
      !email ||
      !password ||
      fullName === "" ||
      email === "" ||
      password === ""
    ) {
      return next(errorHandler(400, "Please required all fields"));
    }
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters" });
    }
    const user = await userModel.findOne({ email });

    if (user) {
      return next(errorHandler(400, "User is already exists"));
    }
    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newUser = new userModel({
      fullName,
      email,
      password: hashedPassword,
    });

    //if user is new so generate token
    generateToken(newUser._id, res);
    await newUser.save();
    const { password: pass, ...rest } = newUser._doc;

    res.status(200).json(rest);
  } catch (error) {
    console.log(error);
    next();
  }
};

//login
export const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email && !password) {
      return next(errorHandler(400, "Please all fields are required"));
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return next(errorHandler(403, "Invalid credintials. Please try again"));
    }
    const passwordIsMatch =  bcryptjs.compareSync(password, user.password);

    if (!passwordIsMatch) {
      return next(errorHandler(403, "Invalid password. Please try again"));
    }

    const token = generateToken(user._id, res);
    res.status(200).json({
      success: true,
      message: "Login successfully",
      token,
    });
  } catch (error) {
    console.log(error);

    next();
  }
};

//logout
export const logout = async (req, res, next) => {
  try {
    res
    .clearCookie('token')
    .status(200)
    .json('User has been Logged out');
    
    
  } catch (error) {
    console.log(error);
    next();
  }
};

//Profile pic update
export const updateProfile = async (req, res, next) => {
  try {
    const { profilePhoto } = await req.body;
    const userId = req.user._id;

    if (!profilePhoto) {
      return next(errorHandler(400, "All field are required"));
    }

    const uploadResponse = await cloudinary.uploader.upload(profilePhoto);
    console.log("uploadResponse: ", uploadResponse);
    const updateUser = await userModel.findByIdAndUpdate(
      userId,
      { profilePhoto: uploadResponse?.secure_url },
      { new: true }
    );
    res.status(200).json(updateUser);
  } catch (error) {
    console.log(error);
    next();
  }
};

export const update = async (req, res, next) => {
  const { profilePhoto } = await req.body;
  const userId = req.user._id;
  console.log(userId);
  if (!profilePhoto) {
    return next(errorHandler(400, "All field are required"));
  }
  try {
    let uploadResponse = await cloudinary.uploader.upload(profilePhoto, {
      resource_type: "image",
    });
    let imageUrl = await uploadResponse.secure_url;
    const updateUser = await userModel.findByIdAndUpdate(
      userId,
      { profilePhoto: imageUrl },
      { new: true }
    );
    res.status(200).json(updateUser);
  } catch (error) {
    console.log(error);
    next();
  }
};

//Check user is login or not
export const checkUser = async (req, res,next) => {
  try {
  
      res.status(200).json(req.user);
  
  } catch (error) {
    console.log(error);
    next();
  }
};
