import { Card } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";

const Order = ({ order, onClick, style }) => {
  return (
    <Card style={style} onClick={onClick}>
      <div className="m-5">
        <Box display="flex" justifyContent="space-between">
          <h1 className="font-bold">{order.tableToServe.tableNumber}</h1>
          <p className="font-bold text-[#D03C1E]">{order.status}</p>
        </Box>
        <hr className="w-[20%] border-[#d03c1e] mb-2" />
        <Box display="flex" justifyContent="space-between">
          <p className="m-1">{`Id: ${order.id}`}</p>
          <p className="m-1">{`Price: ${order.price} €`}</p>
          <p className="m-1">{`Time: ${order.createdDateTime.split(" ")[1]}`}</p>
        </Box>
      </div>
    </Card>
  );
};
export default Order;
