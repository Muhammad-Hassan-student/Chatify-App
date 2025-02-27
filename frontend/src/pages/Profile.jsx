import React, { useState } from 'react'
import profileImg from '../assets/images/profile.jpg'
import { Camera, Mail, User } from 'lucide-react'
import { useAuthStore } from '../store/useAuthStore'

const Profile = () => {
  const {updateProfile,isUpdatingProfile, authUser} = useAuthStore();
  const [selectedImage,setSelectedImage] = useState(null);

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    if(!file) {return};
    //image file reader
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image =  reader.result;
      setSelectedImage(base64Image);
      await updateProfile({profilePhoto: base64Image});
    }
  }
  console.log(selectedImage);
  return (
    <div className='min-h-screen bg-gray-900 pt-12 '>
      <div className='max-w-2xl mx-auto p-8 py-6'>
        <div className='bg-gray-900 rounded-xl p-6 space-y-8'>
          
          <div className='text-center'>
            <h1 className='text-2xl font-semibold text-white'>Profile</h1>
            <p className='mt-2 text-white'>Your profile information</p>
          </div>
 
          {/*Avatar upload section*/}
          <div className='flex flex-col items-center gap-4'>
            <div className='relative'>
              <img src={authUser.profilePhoto || selectedImage || profileImg} alt="Profile-Image" title='Profile-Image' className='size-32 rounded-full object-cover border-4'/>
              <label htmlFor="avatar-upload" className={`absolute bottom-0 right-0 bg-base-content p-2 rounded-full cursor-pointer transition-all duration-200 ${isUpdatingProfile ? "animate-pulse pointer-events-none": ""}`} >
                <Camera className='w-5 h-5 text-teal-500' />
                <input type="file" id='avatar-upload' accept='image/*' onChange={handleUploadImage} disabled={isUpdatingProfile} className='hidden'  />
              </label>
            </div>
            <p className="text-sm text-zinc-400">
              {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{authUser?.fullName}</p>
            </div>

            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{authUser?.email}</p>
            </div>
          </div>

        <div className='bg-black'>
        <div className="mt-6 bg-base-300 rounded-xl p-6">
            <h2 className="text-lg font-medium  mb-4">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span>Member Since</span>
                <span>{authUser.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Profile