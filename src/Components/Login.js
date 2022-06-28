import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { createTheme } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import Constants from "../Utils/Constants";
import { useNavigate } from "react-router-dom";
import BackgroundImage from "../Images/bg.jpg";

const headers = {
  "Access-Control-Allow-Origin": "*",
};

export default function LoginRectangle() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const submitLogin = () => {
    axios
      .post(
        `${Constants.BASE_URL}/login`,
        { username: user, password: password }
        // { headers }
      )
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("jwt-token", `Bearer ${response.data.jwtToken}`);
        navigate("/home");
      })
      .catch((error) => {
        console.log(error.code);
        console.log(error);
        alert(error);
      });
  };

  return (
    <div className="bg-[#141414] w-screen h-screen flex justify-center items-center">
        <div className="flex flex-col h-1/2">
          <input className="m-5 bg-transparent border-2 border-[#636363] rounded-sm" placeholder="username"/>
          <input className="m-5"/>
          <button className="m-5"> Login </button>
        </div>
    </div>
  );
}
