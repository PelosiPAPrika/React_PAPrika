import { Box } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import OrderDetails from "./OrderDetails";
import Constants from "../Utils/Constants";
import Order from "./Order";
import SockJsClient from "react-stomp";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";

const jwtToken = localStorage.getItem("jwt-token");

const SOCKET_URL = Constants.SOCKET_URL;

console.log(jwtToken);

const headers = {
  Authorization: jwtToken,
  //"Access-Control-Allow-Origin": "*",
  //"Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
  //"Access-Control-Allow-Headers": "*",
  //"Content-Type, Authorization, X-Requested-With": "*"
};

export default function OrderList() {
  const [orderList, setOrderList] = useState([]);

  const [selectedOrder, setSelectedOrder] = useState(null);

  const [selectedId, setSelectedId] = useState(0);

  const navigate = useNavigate();

  const navigateToTable = () => {
    navigate("table")
  }

  const orderListFunction = async () => {
    try {
      const result = await axios.get(`${Constants.BASE_URL}/order/submit`, {
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
    console.log("aaaaaaaaaaaaaaaaaa");
    console.log(order);
    setOrderList((oldOrderList) => [...oldOrderList, order]);
  };

  const style = {
    // background: "rgba(	217, 55, 43, 0.2)",
    // paddingLeft: "10px",
    // paddingRight: "10px",
  };

  const style2 = {
    // background: "#f5f5f5",
    // paddingLeft: "10px",
    // paddingRight: "10px",
  };

  return (
    <>
      <Box
        marginRight="25px"
        right="0"
        top="50%"
        bottom="50%"
        position="absolute"
        bgcolor="#141414"
      >
        <div 
        onClick={() => navigateToTable()}
        className="h-12 w-12 bg-white flex justify-center items-center rounded-[50%] hover:scale-150 hover:-translate-y-1 transition ease-in-out">
          <ArrowForwardIcon fontSize="large" />
        </div>
      </Box>
      <SockJsClient
        url={SOCKET_URL}
        headers={headers}
        topics={["/topic/order"]}
        onConnect={console.log("Connected!!")}
        onDisconnect={console.log("Disconnected!")}
        onMessage={(order) => onOrderReceived(order)}
        debug={true}
      />
      <Box
        display="flex"
        justifyContent="left"
        minHeight="100vh"
        bgcolor="#141414"
      >
        <div className="h-screen w-1/5 rounded-md shadow-md overflow-y-scroll bg-[#141414] pr-1">
          <ul className="flex flex-col gap-5 ml-1">
            {orderList.map((order) =>
              selectedId === order.id ? (
                <Order
                  onClick={() => handleClick(order)}
                  order={order}
                  style={style}
                />
              ) : (
                <Order
                  onClick={() => handleClick(order)}
                  order={order}
                  style={style2}
                />
              )
            )}
          </ul>
        </div>
        <OrderDetails
          order={selectedOrder}
          orderList={orderList}
          setOrderList={setOrderList}
        />
      </Box>
    
    </>
  );
}
