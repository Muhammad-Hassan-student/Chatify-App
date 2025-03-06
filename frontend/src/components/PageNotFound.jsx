import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore';

const PageNotFound = () => {
    const {authUser} = useAuthStore();
    const navigate = useNavigate();
    useEffect(() => {
        navigate(authUser ? "/" : "/login")
    } ,[])
  return (
    <div>PageNotFound</div>
  )
}

export default PageNotFound