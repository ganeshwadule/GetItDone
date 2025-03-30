import React, { useState } from "react";
import "./Signup.css";
import { Link } from "react-router-dom";
import { z } from "zod";
import axios from "axios";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const validateData = (data) => {
    const requiredSchema = z.object({
      email: z.string().min(6).max(100).email(),
      password: z
        .string()
        .min(8, "Password must contain capital letter")
        .max(100)
        .regex(/[A-Z]/, "Password must contain capital letter")
        .regex(/[^A-Za-z0-9]/, "password must contain a special symbol"),
      username: z.string().max(100),
    });

    const parsedData = requiredSchema.safeParse(data);

    if (!parsedData.success) {
      alert(parsedData.error.issues[0].message);
      return false;
    }

    return true;
  };

  const signupRequest = async () => {
    const data = { email, password, username };

    if (!validateData(data)) return;
    // console.log("request came")

    try {
        const response = await axios.post(`${BASE_URL}/api/v1/user/signup`, data);
      alert(response.data);
      //  console.log(response.data)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="main">
      <div className="container">
        <div className="header">
          <h2>Create a Profile</h2>
        </div>

        <div className="inputContainer">
          <div className="field">
            <label htmlFor="">Username</label>
            <input type="text" onChange={(e) => setUsername(e.target.value)} />
          </div>

          <div className="field">
            <label htmlFor="">Email</label>
            <input type="text" onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className="field">
            <label htmlFor="">Password</label>
            <input type="text" onChange={(e) => setPassword(e.target.value)} />
          </div>

          <button onClick={signupRequest}>Sign Up</button>
        </div>

        <div className="footer">
          Already joined?<Link to="/signin">Login now</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
