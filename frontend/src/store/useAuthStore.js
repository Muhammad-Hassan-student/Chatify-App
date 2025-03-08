import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const baseUrl = "http://localhost:5001";
export const useAuthStore = create((set, get) => ({
  //TODO:initialize
  authUser: null,
  isSigninUp: false,
  isLogin: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,
  isGoogleSignin: false,

  checkAuth: async () => {
    try {
      const respone = await axiosInstance.get("/auth/check");
      set({ authUser: respone.data });
      get().connectSocket();
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
      get().connectSocket();
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

      get().connectSocket();
    } catch (error) {
      toast.error(error.respone.data.message);
    } finally {
      set({ isLogin: false });
    }
  },

  //TODO: TRY YOURSELF GOOGLE AUTHENTICATION
  signinWithGoogle: async (fullName, email, profilePhoto) => {
    try {
      set({ isGoogleSignin: true });
      const res = await axiosInstance.post("/auth/google", {
        fullName,
        email,
        profilePhoto,
      });
      // await fetch(`${baseUrl}/api/auth/google`,{
      //   method: 'POST',
      //   headers: {'Content-Type': 'application/json'},
      //   body: JSON.stringify({
      //     fullName,
      //      email,
      //      profilePhoto,
      //   }),
      //   credentials: 'include', // This is important for sending cookies

      // });
      // const data = await res.json();
      set({ authUser: res.data });
    } catch (error) {
      console.error("Error in Google Sign-in:", error.message);
      set({ isGoogleSignin: false });
    } finally {
      set({ isGoogleSignin: false });
    }
  },

  logout: async () => {
    try {
      const respone = await axiosInstance.get("/auth/logout");
      set({ authUser: null });
      get().disconnectSocket();
    } catch (error) {
      console.log("error in ", error);
    }
  },
  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });

    try {
      console.log(data);
      const response = await axiosInstance.put("/auth/updateProfile", data);
      set({ authUser: response.data });
      toast.success("Profile update successfully");
    } catch (error) {
      console.log("Error in update profile: ", error);
      toast.error(error.respone.data.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  //connect socket io
  connectSocket: () => {
    const { authUser } = get();
    if (authUser === null || get().socket?.connected) return;
    const socket = io(baseUrl, {
      query: {
        userId: authUser._id,
      },
    });
    socket.connect();
    set({ socket: socket });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },

  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));
