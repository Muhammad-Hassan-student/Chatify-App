import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  try {
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    //token set 
    res.cookie("token",token,{
        maxAge: 7 * 24 * 60 * 60 * 1000 ,//d*perday-total-hour*m*s*mil
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development",
    })
    return token;
  } catch (error) {
    console.log("error in generateToken " + error);
  }
};
