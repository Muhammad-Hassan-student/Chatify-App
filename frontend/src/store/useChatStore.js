import {create} from 'zustand'
import {axiosInstance} from '../lib/axios'
import toast from 'react-hot-toast'

export const useChatStore = create((set) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessageLoading: false,

    getUsers:async () => {
        set({isUsersLoading: false});
        try {
            const res = await axiosInstance.get("/message/getUsers");
            set({users: res.data});
            console.log(res.data);
        } catch (error) {
            toast.error(error.res.data.message);
        }finally{
            set({isUsersLoading: false});
        }
    },

    getMessages: async (userId) => {
        set({isMessageLoading: true});
        try {
            const res = await axiosInstance.get(`/message/${userId}`);
            set({messages: res.data});
        } catch (error) {
            toast.error(error.res.data.message);            
        }finally{
            set({isMessageLoading: false});

        }
    },
    //ma as a user another use pr click krky us se chat krna chahun
    setSelectedUser : (selectedUser) => set({selectedUser})

}))