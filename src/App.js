import "./App.css";
import Login from "./Components/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/system";
import Home from "./Components/Home";
import OrderList from "./Components/OrderList";
import axios from "axios";
import BASE_URL from "./Utils/Constants";
import NavBar from "./Components/NavBar";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#f5f5f5",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/orders" element={<OrderList />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
