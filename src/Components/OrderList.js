import { Box } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import OrderDetails from "./OrderDetails";
import Constants from "../Utils/Constants";
import Order from "./Order";
import SockJsClient from "react-stomp";

const jwtToken = localStorage.getItem("jwt-token");

const SOCKET_URL = Constants.SOCKET_URL;

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

  const [selectedOrder, setSelectedOrder] = useState(null);

  const orderListFunction = async () => {
    try {
      const result = await axios.get(`${Constants.BASE_URL}/order/all`, {
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

  const onOrderReceived = (order) => {
    setOrderList(orderList.push(order))
  }

  return (
    <>
      <SockJsClient
        url={SOCKET_URL}
        topics={["/topic/order"]}
        onConnect={console.log("Connected!!")}
        onDisconnect={console.log("Disconnected!")}
        onMessage={(order) => onOrderReceived(order)}
        debug={false}
      />
      <Box display="flex" justifyContent="left" minHeight="100vh">
        <div className="h-full w-1/5 rounded-md shadow-md">
          <ul className="flex flex-col gap-5">
            {orderList.map((order) => (
              <Order onClick={() => setSelectedOrder(order)} order={order} />
            ))}
          </ul>
        </div>
        <OrderDetails order={selectedOrder} />
      </Box>
    </>
  );
}
