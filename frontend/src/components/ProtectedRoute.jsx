import React, { useEffect } from 'react'
import Cookies from "js-cookie"
import { Outlet, useNavigate } from 'react-router-dom'
import Home from "./Home"
const ProtectedRoute = ({isAuthenticated}) => {

    const navigate = useNavigate();

    useEffect(()=>{
        if(!isAuthenticated){
            navigate("/signin")
        }
    },[isAuthenticated])
    

  return (
   <>
   <Home />
   </>
  )
}

export default ProtectedRoute
