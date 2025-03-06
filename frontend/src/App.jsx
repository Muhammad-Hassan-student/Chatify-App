import React, { useEffect } from 'react'
import { Loader } from 'lucide-react'
import { useAuthStore } from './store/useAuthStore'
import Navbar from './components/Navbar'
import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Signup from './pages/Signup'
import Login from './pages/Login'
import SettingPage from './pages/SettingPage'
import Profile from './pages/Profile'
import {Toaster} from 'react-hot-toast'
import { useThemeStore } from './store/useTheme'
import PageNotFound from './components/PageNotFound'

const App = () => {
  const {authUser,checkAuth,isCheckingAuth} = useAuthStore()
  const {theme} = useThemeStore();
  useEffect(() => {
    checkAuth();
  },[checkAuth])
  console.log({authUser});
  if(isCheckingAuth && !authUser){
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loader className='size-10 animate-spin'/>
      </div>
    )
  }
  return (
    <div className='min-h-screen' data-theme = {theme}>
      <Navbar />
      <Routes>
        <Route path='/' element={authUser ? <HomePage/> : <Navigate to={"/login"} />} />
        <Route path='/signup' element={!authUser ? <Signup/> : <Navigate to={"/"} />} />
        <Route path='/login' element={!authUser ? <Login/> : <Navigate to={"/"}/>} />
        <Route path='/setting' element={<SettingPage/>} />
        <Route path='/profile' element={authUser ? <Profile/> : <Navigate to={"/login"} />} />
        <Route path='*' element={<PageNotFound />}/>


      </Routes>
      <Toaster />
    </div>
  )
}

export default App
