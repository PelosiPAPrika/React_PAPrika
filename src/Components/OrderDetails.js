import { Button } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import OrderTable from "./OrderTable";
import Constants from "../Utils/Constants";

const jwtToken = localStorage.getItem("jwt-token");

console.log(jwtToken);

  const headers = {
    Authorization: jwtToken,
    //"Access-Control-Allow-Origin": "*",
    //"Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
    //"Access-Control-Allow-Headers": "*",
    //"Content-Type, Authorization, X-Requested-With": "*"
  };

export default function OrderDetails({ order, orderList, setOrderList }) {

  const concludeOrder = (id) => {
    try {
      const result = axios.put(`${Constants.BASE_URL}/order/endOrder/${id}`, {
        headers: headers,
      });
      const newOrderList = orderList.filter(order => {
        return order.id != id
      })
      setOrderList(newOrderList)
    } catch (err) {
      console.log(err)
    }

  };

  return order ? (
    <div className="flex w-full -mt-20 justify-center items-center">
      <div className="flex flex-col items-center justify-center w-[800px] h-[650px] bg-[#C4C4C4] rounded-[20px]">
        <OrderTable lineOrderList={order.lineOrderList} />
        <Button
          onClick={() => concludeOrder(order.id)}
          style={{ marginTop: "20px", background: "#BD5454" }}
        >
          Finalizar
        </Button>
      </div>
    </div>
  ) : (
    <div className="w-full"/>
  );
}
