import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import axios from "axios";

export const useAuthStore = create((set) => ({
  //TODO:initialize
  authUser: null,
  isSigninUp: false,
  isLogin: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const respone = await axiosInstance.get("/auth/check");
      set({ authUser: respone.data });
    } catch (error) {
      console.log("error in checkAuth " + error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  signUp: async (data) => {
    set({ isSigninUp: true });
    try {
      const response = await axiosInstance.post("/auth/signup", data);
   
    set({ authUser: response.data });
    toast.success("Sign up successfully");
   
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigninUp: false });
    }
  },

  login: async (data) => {
    try {
      set({ isLogin: true });
      const response = await axiosInstance.post("/auth/login", data);
      set({ authUser: response.data });
      toast.success("Logged in successfully");
    } catch (error) {
      toast.error(error.respone.data.message);
    } finally {
      set({ isLogin: false });
    }
  },

  logout: async () => {
    try {
      const respone = await axiosInstance.get("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
    } catch (error) {
      console.log("error in ", error);
    }

  
  },
  updateProfile: async (data) => {
    set({isUpdatingProfile: true})

    try {
      console.log(data);
      const response = await axiosInstance.put("/auth/updateProfile",data);
      set({authUser: response.data});
      toast.success("Profile update successfully");
    } catch (error) {
      console.log("Error in update profile: ", error);
      toast.error(error.respone.data.message);
    }finally{ 
      set({isUpdatingProfile: false});
    }
  }
}));
