import {create} from 'zustand'
import { axiosInstance } from '../lib/axios'
import toast from 'react-hot-toast';

export const useAuthStore = create((set) => ({
    //TODO:initialize
    authUser: null,
    isSigninUp: false,
    isSigninIn: false,
    isUpdateingProfile: false,
    isCheckingAuth: true,

    checkAuth:async () => {
        try {
           const respone = await axiosInstance.get("/auth/check")
           set({authUser: respone.data}); 
        } catch (error) {
            console.log("error in checkAuth " + error);
            set({authUser: null});
        } finally{
            set({isCheckingAuth: false});
        }
    },
    signUp:async (data) => {
        set({isSigninUp: true})
        try {
            const response = await axiosInstance.post("/auth/signup",data);
            set({authUser: response.data});
            toast.success("Sign up successfully");
            
        } catch (error) {
            toast.error(error.respone.data.message);
        }finally{
            set({isSigninUp: false})
        }
    }
    

})) 