import { Card } from "@mui/material";
import React, { useState } from "react";

export default function ({ order, onClick }) {
  return (
    <Card style={{ background: "#f5f5f5" }} onClick={onClick}>
      <div className="m-5">
        <h1>{order.tableToServe.tableNumber}</h1>
        <p>{`${order.price} €`}</p>
      </div>
    </Card>
  );
}
