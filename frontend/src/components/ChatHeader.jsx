import React from 'react'
import {useChatStore} from "../store/useChatStore"
import defaultImage from '../assets/images/profile.jpg'
import { X } from "lucide-react";
import { useAuthStore } from '../store/useAuthStore';



const ChatHeader = () => {
    const {selectedUser, setSelectedUser} = useChatStore();
    const {onlineUsers} = useAuthStore();
  return (
    <div className='p-2.5  border-b border-base-300'>
        <div className='flex items-center justify-between'>
            <div className=' flex items-center gap-3'>

                {/*TODO: Avatar Section*/}
                <div className='avatar'>
                  <div className='size-10 rounded-full relative '>
                    <img src={selectedUser.profilePhoto || defaultImage} alt={selectedUser.fullName} title={selectedUser.fullName} />
                  </div>
                </div>

                {/*TODO: User Info*/}
                <div>
                    <h3 className='font-medium'>{selectedUser.fullName}</h3>
                    <p className='text-sm text-base-content/70'>{onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}</p>
                </div>

            </div>

            {/*TODO: CLOSE BUTTON SECTION*/}
            <div>
                <button onClick={() => setSelectedUser(null)}>
                    <X />
                </button>
            </div>

        </div>
    </div>
  )
}

export default ChatHeader