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

  const [selectedId, setSelectedId] = useState(0);

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

  const handleClick = (order) => {
    setSelectedOrder(order);
    setSelectedId(order.id);
  };

  useEffect(() => {
    orderListFunction();
  }, []);

  const onOrderReceived = (order) => {
    setOrderList((oldOrderList) => [...oldOrderList, order]);
  };

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
        <div className="h-[85vh] w-1/5 mt-4 rounded-md shadow-md overflow-y-scroll">
          <ul className="flex flex-col gap-5 ml-1">
            {orderList.map((order) =>
              selectedId === order.id ? (
                <Order onClick={() => handleClick(order)} order={order} background="rgba(	217, 55, 43, 0.2)" />
              ) : (
                <Order onClick={() => handleClick(order)} order={order} background="#f5f5f5"/>
              )
            )}
          </ul>
        </div>
        <OrderDetails order={selectedOrder} />
      </Box>
    </>
  );
}
