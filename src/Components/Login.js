import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { createTheme } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import BASE_URL from "../Utils/Constants";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";

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
        `${BASE_URL}/login`,
        { username: user, password: password }
        // { headers }
      )
      .then((response) => {
        localStorage.setItem(
          "jwt-token",
          `Bearer ${response.data.access_token}`
        );
        navigate("/home");
      })
      .catch((error) => {
        console.log(error.code);
        console.log(error);
        alert(error);
      });
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <div className="flex flex-col items-center w-96 h-[600px] bg-[#C4C4C4] rounded-2xl">
        <form
          className="my-auto flex flex-col items-center"
          onSubmit={(e) => {
            e.preventDefault();
            submitLogin();
          }}
        >
          <svg
            width="164"
            height="45"
            viewBox="0 0 164 45"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.976 23.584H16.816C24.16 23.584 30.256 19.936 30.256 11.872C30.256 4.048 24.736 0.399998 16.912 0.399998H0.352V34H6.976V23.584ZM23.728 11.872C23.728 16.432 20.848 17.968 16.864 18.016H6.976V6.16H16.912C20.704 6.16 23.728 7.456 23.728 11.872ZM35.4606 18.64C38.1486 15.04 45.9246 14.848 47.4606 19.888H40.2126C35.1726 19.888 30.3246 21.664 30.3246 26.896C30.3246 32.272 35.1246 34.432 39.8766 34.48C42.9966 34.48 46.3566 33.28 47.9406 30.784L48.5166 34H54.0846L53.8446 29.104V20.416C53.8446 13.936 47.7486 10.384 41.8446 10.384C37.9086 10.384 33.9726 11.44 31.5246 15.232L35.4606 18.64ZM40.6926 29.2C39.1566 29.248 36.5646 28.672 36.5166 26.896C36.4686 25.264 38.3406 24.4 40.0206 24.4H47.6046C47.0766 28.192 43.4766 29.152 40.6926 29.2ZM57.6025 11.152V44.752H63.7945V31.312C65.4265 33.76 67.7305 34.432 70.2265 34.432C77.8105 34.432 82.6585 29.2 82.6585 22.576C82.6585 16.96 79.1065 11.296 71.2825 10.768C68.3545 10.576 65.2825 11.488 63.4105 14.32L62.7865 11.152H57.6025ZM70.0345 16.192C74.3065 16.192 76.4185 19.552 76.4185 22.576C76.4185 25.744 74.3065 28.96 70.0345 28.96C65.9065 28.96 63.5065 26.08 63.5545 22.432C63.5545 18.88 66.0985 16.192 70.0345 16.192Z"
              fill="#CE4D42"
            />
            <path
              d="M85.5531 11.152V34H91.7451V21.856C91.8891 18.448 94.5291 16.24 97.6011 16.24C99.0411 16.24 100.481 16.816 101.537 17.776L104.273 13.648C102.449 11.392 99.4731 10.624 97.2171 10.624C95.3931 10.624 92.8971 11.2 91.2171 13.84L90.8331 11.152H85.5531ZM112.101 7.792V0.399998H105.957V7.792H112.101ZM112.101 34V11.152H105.957V34H112.101ZM140.098 33.856L128.674 21.472L139.474 11.392V11.152H131.65L125.218 17.104L122.098 20.848V0.399998H115.954V34H122.146V27.088L124.498 24.88L132.898 34H140.098V33.856ZM144.604 18.64C147.292 15.04 155.068 14.848 156.604 19.888H149.356C144.316 19.888 139.468 21.664 139.468 26.896C139.468 32.272 144.268 34.432 149.02 34.48C152.14 34.48 155.5 33.28 157.084 30.784L157.66 34H163.228L162.988 29.104V20.416C162.988 13.936 156.892 10.384 150.988 10.384C147.052 10.384 143.116 11.44 140.668 15.232L144.604 18.64ZM149.836 29.2C148.3 29.248 145.708 28.672 145.66 26.896C145.612 25.264 147.484 24.4 149.164 24.4H156.748C156.22 28.192 152.62 29.152 149.836 29.2Z"
              fill="white"
            />
          </svg>
          <TextField
            style={{ marginTop: "40px" }}
            type="text"
            label="Username"
            color="secondary"
            onInput={(e) => setUser(e.target.value)}
          />
          <TextField
            style={{ marginTop: "30px" }}
            className="mt-2"
            type="password"
            label="Password"
            color="secondary"
            onInput={(e) => setPassword(e.target.value)}
          />
          <Button
            style={{ marginTop: "50px", borderRadius: 20 }}
            className="mt-2"
            variant="contained"
            color="secondary"
            onClick={() => submitLogin()}
          >
            Login
          </Button>
        </form>
      </div>
    </Box>
  );
}
