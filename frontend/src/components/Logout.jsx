import React, { useContext, useState } from "react";
import "./logout.css"
import { AuthContext } from "../hooks/AuthContextProvider";
import { IoExitOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const {username,setUsername} = useContext(AuthContext);
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    
    setUsername(null);

    navigate("/signin",{replace:true})
  };

  return (
    <div className="logout-container">
      <div>Hii <b>{username}!</b></div>
      <button onClick={handleLogout}>logout <IoExitOutline /></button>
    </div>
  );
};

export default Logout;
