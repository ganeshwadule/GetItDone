import React, { useContext, useState } from "react";
import "./Signup.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { z } from "zod";
import { AuthContext } from "../hooks/AuthContextProvider";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const {setUsername} = useContext(AuthContext);

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const validateData = (data) => {
    const requiredSchema = z.object({
      email: z.string().min(6).max(100).email(),
      password: z.string(),
    });

    const parsedData = requiredSchema.safeParse(data);

    if (!parsedData.success) {
      alert(parsedData.error.issues[0].message);
      return false;
    }

    return true;
  };

  const signinRequest = async () => {
    const data = { email, password };

    if (!validateData(data)) return;

    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/user/signin`,
        data,
        { withCredentials: true }
      );

      if (response.status === 201) {
        setUsername(response.data.username);
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="main">
      <div className="container">
        <div className="header">
          <h2>Sign Into Profile</h2>
        </div>
        <div className="inputContainer">
          <div className="field">
            <label htmlFor="">Email</label>
            <input type="text" onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className="field">
            <label htmlFor="">Password</label>
            <input type="text" onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button onClick={signinRequest}>Sign In</button>
        </div>
        <div className="footer">
          Yet to Join?<Link to="/">Signup now</Link>
        </div>
      </div>
    </div>
  );
};

export default Signin;
