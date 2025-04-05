import React, { useEffect } from 'react'
import Cookies from "js-cookie"
import { Outlet, useNavigate } from 'react-router-dom'
import Home from "./Home"
import { useContext } from 'react'
import { AuthContext } from '../hooks/AuthContextProvider'
const ProtectedRoute = ({isAuthenticated}) => {
    const {username} = useContext(AuthContext)
    const navigate = useNavigate();

    useEffect(()=>{
        if(!isAuthenticated || !username){
            navigate("/signin",{replace:true})
        }
    },[isAuthenticated])
    

  return (
   <>
   <Home />
   </>
  )
}

export default ProtectedRoute
