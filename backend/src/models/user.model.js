import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
    },
    profilePhoto: {
        type: String,
        default: "",
    }
},{timestamps: true});

export const userModel =mongoose.models.User || mongoose.model("User",userSchema);// User is used as a reference 
export default userModel;