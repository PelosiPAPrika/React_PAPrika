import { AppBar, Button } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";
import OrderList from "./OrderList";

export default function Home() {
  return (
    <div>
      <OrderList />
    </div>
  );
}
