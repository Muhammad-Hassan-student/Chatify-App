import { generateToken } from "../lib/generateToken.js";
import userModel from "../models/user.model.js";
import bcryptjs from "bcryptjs";

//Sign up
export const signup = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    console.log(req.body);
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters" });
    }
    const user = await userModel.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "User is already exists" });
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
      res.status(500).json({ message: "Internal Server Error" });

  }
};

//login
export const login = async (req, res) => {};

//logout
export const logout = async (req, res) => {};
