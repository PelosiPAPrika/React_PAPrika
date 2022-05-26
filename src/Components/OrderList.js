import { Box } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import OrderDetails from "./OrderDetails"
import BASE_URL from "../Utils/Constants";
import Order from "./Order";

const jwtToken = localStorage.getItem("jwt-token");

console.log(jwtToken);

const headers = {
  // Authorization: jwtToken,
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
  "Access-Control-Allow-Headers":
  "Content-Type, Authorization, X-Requested-With",
};

export default function OrderList() {
  const [orderList, setOrderList] = useState([]);

  const [selectedOrder, setSelectedOrder] = useState(null)

  const orderListFunction = async () => {
    try {
      const result = await axios.get(`${BASE_URL}/order/all`, {
        headers: headers,
      });
      setOrderList(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    orderListFunction();
  }, []);

  const setOrderDetails = (order) => {
    return(
      <OrderDetails p={order}/>
    )
  }

  return (
    <Box display="flex" justifyContent="left" minHeight="100vh">
      <div className="h-full w-1/5 rounded-md shadow-md">
        <ul className="flex flex-col gap-5">
          {orderList.map((order) => (
            <Order onClick={() => setSelectedOrder(order)} order={order} />
          ))}
        </ul>
      </div>
      <OrderDetails order={selectedOrder}/>
    </Box>
  );
}
